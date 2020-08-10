import React from "react"
import CloseButton from "../img/Close.png"
import { Restart } from "./ProductsSlice.js"

const ClosePanel = () => {
    const ConfirmPanel = document.getElementsByClassName("ConfirmPanel")[0];
    if (ConfirmPanel)
        ConfirmPanel.style.visibility = "hidden";
}

const RestartAndClose = (dispatch) => {
    ClosePanel();
    dispatch(Restart());
}

const ShowToBuyList = (ToBuyList, ProductsList) => {
    const ProductsNumber = ToBuyList.ProductsNumber;
    const ProductsPrice = ToBuyList.ProductsPrice;
    const Products = [];
    ToBuyList.Ids.map(Id => Products.push(ProductsList[Id]));

    const tableTemplate = Products.map((product) => {
        return (
            <tr key={product.vendoraCode}>
                <td>{product.name}</td>
                <td>{product.order}</td>
                <td>{product.orderPrice}</td>
            </tr>
        )
    })


    return (
        <table>
            <thead>
                <tr key="head">
                    <th style={{ width: 29 + "%" }}>Название</th>
                    <th style={{ width: 14.83 + "%" }}>Количество</th>
                    <th style={{ width: 17.03 + "%" }}>Сумма заказа</th>
                </tr>
            </thead>
            <tbody>
                {tableTemplate}
                <tr className="Conclusion">
                    <td>Всего</td>
                    <td>{ProductsNumber}</td>
                    <td>{ProductsPrice.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
    )
}

export const ConfirmPanel = (ToBuyList, ProductsList, dispatch) => {
    return (
        <div className="ConfirmPanel" style={{ visibility: "hidden" }}>
            <div className="ConfirmBox">
                <img src={CloseButton} className="Close" alt="Close" onClick={() => ClosePanel()} />
                <h5 className="Legend">Вы уверены, что хотите отправить ваш заказ?</h5>
                {ShowToBuyList(ToBuyList, ProductsList)}
                <button className="ConfirmButton" onClick={() => RestartAndClose(dispatch)}><h5>Отменить</h5></button>
                <button className="ConfirmButton" onClick={() => ClosePanel()}><h5>Заказать</h5></button>
            </div>
        </div>
    )
}
