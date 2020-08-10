import React from "react"
import { Link } from "react-router-dom"

import "./styles.css"

import SideMenu from "../img/SideMenu.png"
import ListOfProducts from "../img/listOfProducts.png"
import myOrders from "../img/myOrders.png"
import Icon from "../img/icon.jpg"
import Vector from "../img/Vector.png"
import MenIcon from "../img/MenIcon.png"
import Email from "../img/E-mail.png"
import Telephone from "../img/telephon.png"
import Exit from "../img/exit.png"
import FindProduct from "../img/findProduct.png"
import Filters from "../img/Filters.png"
import Info from "../img/Info.png"

import { useSelector, useDispatch } from "react-redux"
import { AddOrRemoveProduct, AddProductByAmount } from "./ProductsSlice"
import { ConfirmPanel } from "./ConfirmPanel.js"

const ShowInfo = (number) => {
    const UserInfo = document.getElementsByClassName("UserInfo")[number];
    if (UserInfo.style.visibility === "hidden")
        UserInfo.style.visibility = "visible";
    else
        UserInfo.style.visibility = "hidden";
}

const ConfirmPanelShow = () => {
    const ConfirmPanel = document.getElementsByClassName("ConfirmPanel")[0];
    if (ConfirmPanel)
        ConfirmPanel.style.visibility = "visible"
}

const ShowSideMenu = () => {
    const SideMenu = document.getElementsByClassName("SideMenu")[0];
    if (SideMenu.style.visibility === "hidden")
        SideMenu.style.visibility = "visible";
    else {
        SideMenu.style.visibility = "hidden";
    }
}

const ShowMakeOrderPanel = (ToBuyList) => {
    const MakeOrderPanel = document.getElementsByClassName("MakeOrder")[0];
    if (!MakeOrderPanel) return
    if ((ToBuyList.Ids).length > 0) {
        MakeOrderPanel.style.visibility = "visible"
    } else {
        MakeOrderPanel.style.visibility = "hidden";
    }
}

const DisplayProductsList = () => {
    const Products = useSelector(state => state.products.ProductsList)
    const dispatch = useDispatch();

    const tableTemplate = Object.values(Products).map(product => {
        return (
            <tr key={product.barcode}>
                <td style={{ width: 5.5 + "%" }}>
                    <input id={product.vendorCode + "checkbox"} type="checkbox" name="AddProduct" onClick={() => dispatch(AddOrRemoveProduct(product.vendorCode))} />
                </td>
                <td style={{ width: 9.75 + "%" }}>{product.barcode}</td>
                <td style={{ width: 13.18 + "%" }}>{product.vendorCode}</td>
                <td style={{ width: 18.51 + "%" }}>
                    <div className="tooltip">
                        {product.name}<img src={Info} alt="More info" className="HelpIcon" />
                        <div className="tooltipContent">
                            <img src={product.gameImg} alt="Game" className="GameImg" />
                            {product.description}
                        </div>
                    </div>
                </td>
                <td style={{ width: 11 + "%" }}>{product.boxSize}</td>
                <td style={{ width: 11.2 + "%" }}>{product.recommendedRetailPrice}</td>
                <td style={{ width: 7.67 + "%" }}>{product.remainder + "шт."}</td>
                <td style={{ width: 9.66 + "%" }}>{product.priceWithVAT}</td>
                <td style={{ width: 9.93 + "%" }}>
                    <input
                        type="number" name="HowMany" id={product.vendorCode + "number"} onChange={() => dispatch(AddProductByAmount(product.vendorCode))}
                        min="0" max={product.remainder + product.order}
                    />
                </td>
                <td style={{ width: 14.9 + "%" }}>{product.orderPrice}</td>
            </tr>
        )
    });

    return (
        <table id="table">
            <thead>
                <tr key="tableHead">
                    <th></th>
                    <th>Штрихкод</th>
                    <th>Артикул</th>
                    <th>Назва</th>
                    <th>Розмір коробки</th>
                    <th>Рекомендована роздрібна ціна</th>
                    <th>Залишок</th>
                    <th>Ціна з ПДВ</th>
                    <th>Замовлення</th>
                    <th>Сума замовлення</th>
                </tr>
            </thead>
            <tbody>
                {tableTemplate}
            </tbody>
        </table>
    )
}


export const ClientOffice = () => {
    const ToBuyList = useSelector(state => state.products.ProductsToBuyList);
    const ProductsList = useSelector(state => state.products.ProductsList);
    const dispatch = useDispatch();

    return (
        <main className="ClientOffice">
            {ConfirmPanel(ToBuyList, ProductsList, dispatch)}
            <div className="SideMenu">
                <img src={SideMenu} alt="SideMenu" id="ExtraButton" onClick={() => ShowSideMenu()} /><br />
                <h1>S2</h1>
                <h3 className="UserIcon">D</h3>
                <Link to="/ClientOffice" id="active">
                    <img src={ListOfProducts} alt="ListOfProducts" />
                    <h5 className="desc">Товары</h5>
                </Link>
                <Link to="">
                    <img src={myOrders} alt="MyOrders" />
                    <h5 className="desc">Мои заказы </h5>
                </Link>
            </div>

            <div className="TopPanel">
                <span className="SpecialButton">
                    <img src={Icon} alt="icon" className="ManagerIcon" />
                    <h5>Менеджер S2</h5>
                    <img src={Vector} alt="Arrow" className="vector" onClick={() => ShowInfo(0)} />

                    <div className="UserInfo">
                        <div className="Pictures">
                            <img src={MenIcon} alt="Icon" />
                            <img src={Email} alt="E-mail" />
                            <img src={Telephone} alt="telephone" />
                        </div>
                        <div className="UserInformation">
                            <h5>Новикова Алина Викторовна</h5>
                            <h5>keith.richards@example.com</h5>
                            <h5>+380999834675</h5>
                        </div>
                    </div>
                </span>
                <span className="SpecialButton">
                    <h5 className="UserIcon">D</h5>
                    <h5>Клиент DODO</h5>
                    <img src={Vector} alt="Arrow" className="vector" onClick={() => ShowInfo(1)} />
                    <div className="UserInfo">
                        <div className="Pictures">
                            <img src={MenIcon} alt="Icon" />
                            <img src={Email} alt="E-mail" />
                            <img src={Telephone} alt="telephone" />
                        </div>
                        <div className="UserInformation">
                            <h5>Киселев Сергей Иванович</h5>
                            <h5>keith.richards@example.com</h5>
                            <h5>+380999834675</h5>
                        </div>
                    </div>
                </span>
                <Link to="/SignIn"><img src={Exit} alt="Выйти из профиля" className="exit" /></Link>
            </div>

            <form>
                <div className="ButtonsAndFilters">
                    <span className="SpecialButton" id="FindProducts">
                        <img src={FindProduct} alt="Find" />
                        <h5>Найти товар</h5>
                    </span>
                    <span className="SpecialButton" id="BulkPrices">
                        <h5>Оптовые цены</h5>
                        <img src={Vector} alt="Arrow" className="vector" />
                    </span>
                    <button className="Filters"><img src={Filters} alt="Filters" /></button>
                </div>
                <DisplayProductsList />

                <div className="MakeOrder">
                    <input type="button" value="Заказать" onClick={() => ConfirmPanelShow()} />
                    <div className="StatisticValues">
                        <h5>{ToBuyList.ProductsNumber}</h5>
                        <h5>{ToBuyList.ProductsPrice.toFixed(2)}</h5>
                    </div>
                    <div className="statistic">
                        <h5>Количество</h5>
                        <h5>Сумма заказа</h5>
                    </div>
                </div>
                {ShowMakeOrderPanel(ToBuyList)}
            </form >
        </main>
    );
}
