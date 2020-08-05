import React from "react"
import { Link } from "react-router-dom"

import logo from "../img/image.png"
import "./styles.css"


export const LandingPage = () => {
    return (
        <main className="LandingPage">
            <header>
                <h1 class='logo-center'>S2</h1>
                <Link to="/SignIn">
                    <p>Войти</p>
                </Link>
            </header>
            <div className="logo">
                <img src={logo} alt="logo.img" />
                <p>S2</p>
            </div>
            <div>
                <h2 className="description">
                    <span>S2</span> - сервис автоматизации <br /> процесса взаимодействия между оптовыми клиентами и торговым
              предприятием
            </h2>
                <Link to="/SignIn"><button>Начать &rarr;</button></Link>
            </div>
            <div class="facillities">
                <div className="column">
                    <h3>Товароучетная система</h3>
                    <h5>
                        Управление товарами и ценами.
                        Планирование закупок и контроль остатков.
                        Резервы. Модификации.Инвентаризации.
                    </h5>
                </div>
                <div className="column">
                    <h3>CRM для торговли</h3>
                    <h5>
                        История покупок, сегментация базы клиентов,
                        бонусные программы лояльности. Статистика.
                    </h5>
                </div>
                <div className="column">
                    <h3>Интеграция</h3>
                    <h5>
                        CMS, CRM, рассылки, аналитика, банки, службы доставки.
                        Экспорт в 1С:Бухгалтерию.
                        Помощь с настройками.
                    </h5>
                </div>
            </div>
        </main>
    );
}
