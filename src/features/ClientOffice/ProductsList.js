import Bazikalo from "../img/bazikalo.png"
import ZombiInTheHouse from "../img/ZombieInTheHouse.jpg"
import Catan from "../img/Catan.jpg"
import Manchkin from "../img/Manchkin.jpg"

function GenereteId() {
    return Math.floor(Math.random() * (10 ** 13));
}

function Product(vendorCode, name, description, boxSize, recommendedRetailPrice, remainder, priceWithVAT, gameImg) {
    this.barcode = GenereteId();
    this.vendorCode = vendorCode;
    this.name = name;
    this.description = description;
    this.boxSize = boxSize;
    this.recommendedRetailPrice = Number(recommendedRetailPrice);
    this.remainder = Number(remainder);
    this.priceWithVAT = Number(priceWithVAT);
    this.order = 0;
    this.orderPrice = 0;
    this.gameImg = gameImg;
}


export const ProductsList = {
    "300100": new Product(
        "300100", 'Гра дитяча настільна "Базікало"',
        'Аналог гри "Вірю - не вірю". В середині 44 гральні картки.Рекомендований вік дитини 5+.',
        "9 * 12 * 3", 29.34, 99, 39.99, Bazikalo ,
    ),
    "300101": new Product(
        "300101", 'Настільна гра "Зомбі в будинку"',
        'Зомбі в Будинку - це настільна гра для безстрашної компанії, яка спробує вибратися живими з цього небезпечного будинку. Незважаючи на зомбі тематику, гра абсолютно не жорстока і не кровожерлива, тому сміливо підключайте до процесу дітей. Правила дуже прості.',
        "26 * 8 * 26", 654.39, 30, 680, ZombiInTheHouse ,
    ),
    "300102": new Product(
        "300102", 'Настільна гра "Колонізатори"',
        "Мирна сімейна гра з величезним стратегічним потенціалом.Гра з'явилася в 1995 році, як прообраз відомої відеоігри Settlers. Отримала масу престижних нагород, розійшлася багатомільйонними тиражами і стала настільним бестселером з безліччю втілень, перевидань і доповнень.",
        "29.8 * 29.8 * 7.1", 1234.67, 10, 1290, Catan ,
    ),
    "300103": new Product(
        "300103", 'Настільна гра "Манчкін"',
        'Спуститися у темряву підземелля. Завалити там усе, що ворушиться. Ошукати друзів та поцупити їхні манатки. Схопити скарби й тікати щодуху… Зізнайся, тобі ж це до вподоби! Манчкін відтворює цю чудову атмосферу, але без занудного рольовізму. Ти маєш лише валити потвор та дерибанити їхні скарби. А які там магічні артефакти!',
        "23.5 * 15.7 * 4.4", 400, 45, 420, Manchkin ,
    ),
}