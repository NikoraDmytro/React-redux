import { createSlice } from "@reduxjs/toolkit"

import { ProductsList } from "./ProductsList.js"


const ChangeState = (Id, state, UpdatedProductsToBuyList, UpdatedProductsList) => {
    const NewState = (Object.assign({}, state, {
        ProductsList: Object.assign({}, state.ProductsList, {
            [Id]: Object.assign({}, state.ProductsList[Id],
                UpdatedProductsList
            )
        }),
        ProductsToBuyList: Object.assign({}, UpdatedProductsToBuyList)
    }));
    return NewState;
}


const Products = createSlice({
    name: "products",
    initialState: {
        ProductsList: ProductsList,
        ProductsToBuyList: {
            Ids: [],
            ProductsNumber: 0,
            ProductsPrice: 0,
        },
    },
    reducers: {
        AddOrRemoveProduct: (state, action) => {
            const Id = action.payload;
            const Product = state.ProductsList[Id];
            const ProductsToBuyList = state.ProductsToBuyList;
            const Input = document.getElementById(`${Product.vendorCode}number`);

            const Ids = new Set(state.ProductsToBuyList.Ids);

            if (!+Product.order && +Product.remainder) {
                Input.value = 1;
                Ids.add(Id);
            } else {
                Input.value = "";
                Ids.delete(Id);
            }

            const UpdatedToBuyList = {
                Ids: [...Ids],
                ProductsNumber: ProductsToBuyList.ProductsNumber + (Input.value - Product.order),
                ProductsPrice: ProductsToBuyList.ProductsPrice + (Input.value - Product.order) * Product.priceWithVAT,
            }

            const NewState = ChangeState(Id, state, UpdatedToBuyList, {
                remainder: Number(Product.order) + Number(Product.remainder) - Input.value,
                order: Input.value,
                orderPrice: Input.value * Product.priceWithVAT,
            })

            return NewState;
        },
        AddProductByAmount: (state, action) => {
            const Id = action.payload;
            const Product = state.ProductsList[Id];
            const ProductsToBuyList = state.ProductsToBuyList;
            const Input = document.getElementById(`${Product.vendorCode}number`);
            const Checkbox = document.getElementById(`${Product.vendorCode}checkbox`);
            let Value = Input.value;

            if (Value > Number(Product.order) + Number(Product.remainder) || Value < 0) {
                Value = Product.order;
                Input.value = Product.order;
                return;
            }

            const Ids = new Set(state.ProductsToBuyList.Ids);

            if (!Number(Value)) {
                Value = 0
                Input.value = "";
                Checkbox.checked = false;

                Ids.delete(Id);
            } else {
                Checkbox.checked = true;

                Ids.add(Id);
            }

            const UpdatedToBuyList = {
                Ids: [...Ids],
                ProductsNumber: ProductsToBuyList.ProductsNumber + (Value - Product.order),
                ProductsPrice: ProductsToBuyList.ProductsPrice + (Value - Product.order) * Product.priceWithVAT,
            }


            const NewState = ChangeState(Id, state, UpdatedToBuyList, {
                remainder: Product.remainder - (Value - Product.order),
                order: Value,
                orderPrice: (Product.priceWithVAT * Value).toFixed(2),
            })

            return NewState
        },
        Restart: state => {
            const Products = state.ProductsList;
            const ProductsToBuyList = state.ProductsToBuyList;
            const UpdatedToBuyList = {
                Ids: [],
                ProductsNumber: 0,
                ProductsPrice: 0,
            }

            const NewState = ProductsToBuyList.Ids.map((Id) => {
                const Product = Products[Id];
                const Input = document.getElementById(`${Product.vendorCode}number`);
                const Checkbox = document.getElementById(`${Product.vendorCode}checkbox`);

                Input.value = "";
                Checkbox.checked = false;

                return (ChangeState(Id, state, UpdatedToBuyList, {
                    remainder: Number(Product.remainder) + Number(Product.order),
                    order: 0,
                    orderPrice: 0,
                }))
            })
            return NewState[0];
        },
    }
});


export const { AddOrRemoveProduct, AddProductByAmount, Restart } = Products.actions;

export default Products.reducer;
