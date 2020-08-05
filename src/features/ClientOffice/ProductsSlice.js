import { createSlice } from "@reduxjs/toolkit"

import { ProductsList } from "./ProductsList.js"


const ChangeState = (Id, state, UpdateProductsList, UpdateProductsToBuyList) => {
    const NewState = (Object.assign({}, state, {
        ProductsList: Object.assign({}, state.ProductsList, {
            [Id]: Object.assign({}, state.ProductsList[Id],
                UpdateProductsList
            )
        }),
        ProductsToBuyList: Object.assign({}, state.ProductsToBuyList, UpdateProductsToBuyList, {
            Products: Object.assign({}, state.ProductsToBuyList.Products, {
                [Id]: Object.assign({}, state.ProductsList[Id],
                    UpdateProductsList
                )
            })
        })
    }))

    return NewState;
}


const Products = createSlice({
    name: "products",
    initialState: {
        ProductsList: ProductsList,
        ProductsToBuyList: {
            Ids: [],
            Products: {},
            ProductsNumber: 0,
            ProductsPrice: 0,
        },
    },
    reducers: {
        AddOrRemoveProduct: (state, action) => {
            const Id = action.payload;
            const Product = state.ProductsList[Id];
            const Input = document.getElementById(`${Product.vendorCode}number`);
            if (!Product.order && Product.remainder) {
                Input.value = 1;

                const UpdatedToBuyList = {
                    ProductsNumber: state.ProductsToBuyList.ProductsNumber + (Input.value - Product.order),
                    ProductsPrice: state.ProductsToBuyList.ProductsPrice + (Input.value - Product.order) * Product.priceWithVAT,
                }
                if (Id in state.ProductsToBuyList.Ids !== true) {
                    UpdatedToBuyList.Ids = [...state.ProductsToBuyList.Ids, Id];
                    UpdatedToBuyList.Products = Object.assign({}, state.ProductsToBuyList.Products, {
                        [Product.vendorCode]: Product
                    });
                }


                const NewState = ChangeState(Id, state, {
                    remainder: Product.remainder - 1,
                    order: 1,
                    orderPrice: Product.priceWithVAT,
                }, UpdatedToBuyList)

                return (NewState);
            } else {
                Input.value = 0;

                const UpdatedToBuyList = {
                    ProductsNumber: state.ProductsToBuyList.ProductsNumber + (Input.value - Product.order),
                    ProductsPrice: state.ProductsToBuyList.ProductsPrice + (Input.value - Product.order) * Product.priceWithVAT,
                }
                if (Id in state.ProductsToBuyList.Ids !== true) {
                    UpdatedToBuyList.Ids = state.ProductsToBuyList.Ids.reduce((ToBuyList, id) => {
                        if (id !== Id)
                            ToBuyList.push(id)
                        return ToBuyList
                    }, []);
                    UpdatedToBuyList.Products = delete state.ProductsToBuyList.Id;
                }

                const NewState = ChangeState(Id, state, {
                    remainder: Number(Product.order) + Number(Product.remainder),
                    order: 0,
                    orderPrice: 0,
                }, UpdatedToBuyList)
                return (NewState);
            }
        },
        AddProductByAmount: (state, action) => {
            const Id = action.payload;
            const Product = state.ProductsList[Id];
            const Input = document.getElementById(`${Product.vendorCode}number`);
            const Checkbox = document.getElementById(`${Product.vendorCode}checkbox`);
            if (Input.value === "0") {
                Checkbox.checked = false

                const UpdatedToBuyList = {
                    ProductsNumber: state.ProductsToBuyList.ProductsNumber + (Input.value - Product.order),
                    ProductsPrice: state.ProductsToBuyList.ProductsPrice + (Input.value - Product.order) * Product.priceWithVAT,
                }
                if (Id in state.ProductsToBuyList.Ids !== true) {
                    UpdatedToBuyList.Ids = state.ProductsToBuyList.Ids.reduce((ToBuyList, id) => {
                        if (id !== Id)
                            ToBuyList.push(id)
                        return ToBuyList
                    }, []);
                    UpdatedToBuyList.Products = delete state.ProductsToBuyList.Id;
                }

                const NewState = ChangeState(Id, state, {
                    remainder: Number(Product.order) + Number(Product.remainder),
                    order: 0,
                    orderPrice: 0,
                }, UpdatedToBuyList);
                return NewState
            } else {
                if (Input.value > Number(Product.order) + Number(Product.remainder) || Input.value < 0) {
                    Input.value = Product.order;
                    return;
                }
                Checkbox.checked = true;

                const UpdatedToBuyList = {
                    ProductsNumber: state.ProductsToBuyList.ProductsNumber + (Input.value - Product.order),
                    ProductsPrice: state.ProductsToBuyList.ProductsPrice + (Input.value - Product.order) * Product.priceWithVAT,
                }
                if (Id in state.ProductsToBuyList.Ids !== true) {
                    UpdatedToBuyList.Ids = [...state.ProductsToBuyList.Ids, Id];
                    UpdatedToBuyList.Products = Object.assign({}, state.ProductsToBuyList.Products, {
                        [Product.vendorCode]: Product
                    });
                }

                console.log(UpdatedToBuyList)

                const NewState = ChangeState(Id, state, {
                    remainder: Product.remainder - (Input.value - Product.order),
                    order: Input.value,
                    orderPrice: (Product.priceWithVAT * Input.value).toFixed(2),
                }, UpdatedToBuyList)
                return NewState
            }
        }
    }
});


export const { AddOrRemoveProduct, AddProductByAmount } = Products.actions;

export default Products.reducer;