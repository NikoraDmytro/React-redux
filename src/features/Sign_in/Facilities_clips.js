import { nanoid } from "@reduxjs/toolkit"
import CAS from "../img/Товароучетная_система.png"
import CRM from "../img/CRM.png"
import Integration from "../img/Интеграция.jpg"

export const Facilities = [
    {
        id: nanoid(),
        introImage: CAS,
        title: "Товароучетная система",
        content: ` Управление товарами и ценами. 
        Планирование закупок и контроль остатков.
        Резервы.Модификации.Инвентаризации.`,
    },
    {
        id: nanoid(),
        introImage: CRM,
        title: "CRM для торговли",
        content: `История покупок, сегментация базы клиентов, бонусные программы лояльности. Статистика.`,
    },
    {
        id: nanoid(),
        introImage: Integration,
        title: "Интеграция",
        content: ` CMS, CRM, рассылки, аналитика, банки, службы доставки. Экспорт в 1С:Бухгалтерию.
        Помощь снастройками.`,
    },
];




