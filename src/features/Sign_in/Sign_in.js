import React from "react"
import { Link } from "react-router-dom"

import { FacilitiesChange, SelectClip } from "./Sign_in_slice.js"
import { useDispatch, useSelector } from "react-redux"
import "./styles.css"

const ShowFacilities = (reset) => {
    const currentClip = useSelector(state => state.facilities.CurrentClip);
    const currentClipNumber = useSelector(state => state.facilities.NumberOfClip);
    const dispatch = useDispatch();

    return (
        <div className="facilities">
            <div className="PresentationImages">
                <img src={currentClip.introImage} alt={currentClip.title} />
                <span id="small-circle"></span>
                <span id="big-circle"></span>
            </div>
            <div className="PresentationText">
                <div id={"text" + currentClipNumber}>
                    <h3>{currentClip.title}</h3>
                    <h5>{currentClip.content}</h5>
                </div>
            </div>
            <div className="switcher">
                <button className="on" id="switch1" onClick={() => dispatch(SelectClip(0))} ></button>
                <button className="of" id="switch2" onClick={() => dispatch(SelectClip(1))} ></button>
                <button className="of" id="switch3" onClick={() => dispatch(SelectClip(2))} ></button>
            </div>
        </div >
    );
}


export const SignIn = () => {
    const dispatch = useDispatch();

    return (
        <main className="clearfix">
            <div className="column-right">
                <Link to="/" id="ToMainPage">На главную</Link>
                <ShowFacilities />
            </div>
            <div className="column-left">
                <h1 className="logo-corner">S2</h1>
                <form className="sign_in">
                    <h2>Войти в кабинет</h2>
                    <h4>Для входа введите логин и Email, которые вы указывали при регистрации</h4>

                    <div className="UserData">
                        <label htmlFor="user_email" style={{ padding: 0.875 + 'em' }}>Email</label>
                        <input type="email" id="user_email" placeholder="ivan.lazarev@gmail.com" />

                        <label htmlFor="User_passworld" style={{ padding: 0.4375 + 'em', }}>Пароль</label>
                        <input type="passworld" id="User_passworld" placeholder="passworld" />
                    </div>

                    <input type="checkbox" id="Remember_me" value="True" /><span>Запомнить меня</span>
                    <br />
                    <Link id="EnterTheCabinet" to="/ClientOffice">Войти в кабинет</Link>

                    <div className="LinksForHelp">
                        <h5>Нет аккаунта?</h5><Link to="">Создать</Link>
                        <Link to="" style={{ marginTop: 1 + "em", display: 'block', }}>Забыли пароль</Link>
                    </div>
                    {dispatch(FacilitiesChange())}
                </form>
            </div>
        </main >
    )
}