import React from "react"
import CloseButton from "../img/Close.png"

const ClosePanel = () => {
    const ConfirmPanel = document.getElementsByClassName("ConfirmPanel")[0];
    console.log(ConfirmPanel)
    if (ConfirmPanel)
        ConfirmPanel.style.visibility = "hidden";
}

const ShowToBuyList = (ToBuyList) => {
    console.log(ToBuyList)
    const ProductsNumber = ToBuyList.ProductsNumber;
    const ProductsPrice = ToBuyList.ProductsPrice;

    const tableTemplate = Object.values(ToBuyList.Products).map((product) => {
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
                    <td>{ProductsPrice}</td>
                </tr>
            </tbody>
        </table>
    )
}

export const ConfirmPanel = (ToBuyList) => {
    console.log(ToBuyList);
    return (
        <div className="ConfirmPanel" style={{ visibility: "hidden" }}>
            <div className="ConfirmBox">
                <img src={CloseButton} className="Close" alt="Close" onClick={() => ClosePanel()} />
                <h5 className="Legend">Вы уверены, что хотите отправить ваш заказ?</h5>
                {ShowToBuyList(ToBuyList)}
                <button className="ConfirmButton" onClick={() => ClosePanel()}><h5>Отменить</h5></button>
                <button className="ConfirmButton" onClick={() => ClosePanel()}><h5>Заказать</h5></button>
            </div>
        </div>
    )
}