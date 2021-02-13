"use strict"; // критична к объявлению переменных


// const cartItem = {
//         render(good) {//styleCart
//             return `<div class="good">
//                         <div><b>Наименование</b>: ${good.product_names}</div>
//                         <div><b>Цена за шт.</b>: ${good.price}</div>
//                         <div><b>Количество</b>: ${good.quantity}</div>
//                         <div><b>Стоимость</b>: ${good.quantity * good.price}</div>
//                     </div>
//                     <div class="btn">
//                         <button type="button" class="cartButton">В корзину</button>
//                         <hr>
//                     </div>`;
//         }
// }
//
// // const
//
// //const cart = {
// const catalog = {
//     cartListBlock: null,
//     cartButton: null,
//     cart, //ссылка на текущую корзину
//     cartItem,
//     //styleCarts: [
//     goods: [ // товары хранятся без кол-ва, просто название и стоимость
//         {
//             id_product: 10,
//             product_names: 'Яблоки',
//             price: 40,
//         },
//         {
//             id_product: 20,
//             product_names: 'Грушы',
//             price: 50,
//         },
//         {
//             id_product: 30,
//             product_names: 'Виноград',
//             price: 100,
//         },
//         {
//             id_product: 40,
//             product_names: 'Мандарины',
//             price: 60,
//         },
//     ],
//     // addToCart - метод
//     addToCart(good) { //good - объект товара
//         this.cart.add(good); // передаём товар
//     },
//
//     /**
//      * Document метод querySelector() возвращает первый элемент (Element) документа,
//      * который соответствует указанному селектору или группе селекторов. Если совпадений
//      * не найдено, возвращает значение null.
//      *
//      * Метод EventTarget.addEventListener() регистрирует определенный обработчик события,
//      * вызванного на EventTarget.
//      * EventTarget может быть Element, Document, Window, или любым другим объектом,
//      * поддерживающим события (таким как XMLHttpRequest).
//      */
//     init() {
//       this.cartListBlock = document.querySelector('.cart-list');
//       this.cartButton = document.querySelector('.cart-btn');
//       this.cartButton.addEventListener('click', this.clearCart.bind(this));
//
//       this.render();
//     },
//     /**
//      * Метод forEach() выполняет указанную функцию один раз для каждого элемента в массиве
//      *
//      * insertAdjacentHTML() разбирает указанный текст как HTML или XML и вставляет
//      * полученные узлы (nodes) в DOM дерево в указанную позицию. Данная функция не
//      * переписывает имеющиеся элементы, что предотвращает дополнительную сериализацию
//      * и поэтому работает быстрее, чем манипуляции с innerHTML
//      */
//     render() {
//         if (this.styleCarts.length) {
//             this.styleCarts.forEach(styleCart => {
//                 this.cartListBlock.insertAdjacentHTML('beforeend', this.cartItem.render(styleCart));
//             });
//             this.cartListBlock.insertAdjacentHTML('beforeend', `В корзине ${this.styleCarts.length}
//             позиций(я) стоимостью ${this.getCartPrice()} рублей`);
//         } else {
//             this.cartListBlock.textContent = 'Корзина пуста';
//         }
//     },
//     /**
//      * Возвращает стоимость товара умноженную на количество
//      * @returns {number}
//      */
//     getCartPrice() {
//         return this.styleCarts.reduce(function (price, styleCart) {
//             return price + styleCart.price * styleCart.quantity;
//         }, 0);
//     },
//
//     clearCart() {
//         this.styleCarts = [];
//         this.render();
//     },
// };
//
//
// // корзина
// const cart = {
//     goods: [],
//     // add - метод и он ожидает какой-то товар good
//     add(good) {
//         // товары хранятся в новом объекте, с кол-ом и стоимостью
//         /** this.goods.push(good); - эта запись не верна, т.к. будет ссылаться на товар в каталоге, у
//          * корзины свой товар у каталога свой они не как не перекликаются
//         */
//         this.goods.push({...good, quantity: 1}); // почитать про spred оператор, осталось дописать нужные методы
//         // в каталоге, нужные рендеры и проверку товара в корзине, если его нет, то делать эту манипуляцию
//         // "this.goods.push({...good, quantity: 1});", либо изменить кол-во уже у добавленного, и здесь
//         // используем метод pain у массива.
//     }
// };
//     cart.init();

// /**
//  * Есть 2 основных варианта сохранить this, это использовать стрелочную функцию в обработчике:
//  * item.onchange = () => this.addTopping();
//  * Либо забиндить нужный контекст к этой функции:
//  * item.onchange = this.addTopping.bind(this);
//  * @type {{addToCart(*), cart: {init(): void, styleCarts: [{id_product: number, quantity: number,
//  * product_names: string, price: number}, {id_product: number, quantity: number, product_names: string, price: number},
//  * {id_product: number, quantity: number, product_names: string, price: number}, {id_product: number, quantity: number,
//  * product_names: string, price: number}], cartListBlock: null, cartButton: null, getCartPrice(): number,
//  * clearCart(): void, cartItem: {render(*): string}, render(): void}}}
//  */

/**
 * Объект каталога товара
 *
 * @type {{init(*, *): void, renderEmptyCatalog(): void,
 * renderCatalogItem(*): string, catalogList: [{id_product: number, product_names: string, price: number}, ],
 * addToBasket(*): undefined,
 * addEventHandlers(): void,
 * renderCatalogList(): void,
 * getCatalogListLength(): number,
 * render(): void,
 * catalogBlock: null, cart: null}}
 */
// каталог
const catalog = {
    catalogBlock: null, // Блок для вывода каталога
    cart: null, //ссылка на текущую корзину
    catalogList: [ // список каталога где товары хранятся без кол-ва, просто название и стоимость
        {
            id_product: 10,
            product_names: 'Яблоки',
            price: 40,
        },
        {
            id_product: 20,
            product_names: 'Грушы',
            price: 50,
        },
        {
            id_product: 30,
            product_names: 'Виноград',
            price: 100,
        },
    ],
    /**
     * Инициализация каталога.
     * @param catalogBlockClass - класс блока каталога
     * @param cart
     */
    init(catalogBlockClass, cart) {
        /**
         * Document метод querySelector() возвращает первый элемент (Element) документа,
         * который соответствует указанному селектору или группе селекторов. Если совпадений
         * не найдено, возвращает значение null.
         * Заметка: Сопоставление выполняется с использованием обхода по предварительному
         * порядку в глубину узлов документа, начиная с первого элемента в разметке документа
         * и повторяя последовательные узлы по порядку количества дочерних узлов.
         * В этом примере, нам вернется первый элемент в документе с классом "myclass"
         * @type {Element}
         */
        this.catalogBlock = document.querySelector(`.${catalogBlockClass}`);
        this.cart = cart; // Ссылка на корзину
        this.render(); // отрисовка каталога
        this.addEventHandlers(); //Функция добавления обработки событий
    },

    /**
     * Отображение каталога
     */
    render(){
        if (this.getCatalogListLength() > 0){
            this.renderCatalogList();
        } else {
            this.renderEmptyCatalog();
        }
    },

    /**
     * Добавляем обработку событий
     */
    addEventHandlers(){
        /**
         * Метод EventTarget.addEventListener() регистрирует определенный обработчик события,
         * вызванного на EventTarget.
         * EventTarget может быть Element, Document, Window, или любым другим объектом,
         * поддерживающим события (таким как XMLHttpRequest).
         * Подробнее:
         * https://developer.mozilla.org/ru/docs/Web/API/EventTarget/addEventListener
         */
        this.catalogBlock.addEventListener('click', event => this.addToBasket(event));
    },

    /**
     * Метод добавления в корзину
     */
    addToBasket(event){
      // Добавление (события) в корзину
        /**
         * Свойство target интерфейса Event является ссылкой на объект, который был инициатором события.
         * Он отличается от Event.currentTarget, если обработчик события вызывается во время всплытия
         * (bubbling) или захвата события.
         * Свойство "event.target" может быть использовано для реализации делегирования событий.
         * Пример:
         * https://developer.mozilla.org/ru/docs/Web/API/Event/target
         *
         * Метод Node.contains() возвращает Boolean значение, указывающее, является
         * ли узел потомком данного узла, т. е. сам узел, один из его прямых потомков
         * ( childNodes ), один из детей его детей и так далее.
         * Синтаксис
         * node.contains( otherNode )
         * "node" элемент который сравнивается.
         * "otherNode" элемент с которым производится сравнение.
         */
        if (!event.target.classList.contains('product__add-to-cart')) return;
        const id_product = +event.target.dataset.id_product;
        this.cart.addToBasket(id_product);
    },

    /**
     * Метод получения количества товаров в каталоге
     * @returns {number}
     */
    getCatalogListLength(){
      //получить длинну списка каталога
      return this.catalogList.length;
    },

    /**
     * Рендер списка товаров
     */
    renderCatalogList(){
      this.catalogBlock.innerHTML = '';
        /**
         * Метод forEach() выполняет указанную функцию один раз для каждого элемента в массиве.
         * Пример:
         * const array1 = ['a', 'b', 'c'];
         * array1.forEach(element => console.log(element));
         * // expected output: "a"
         * // expected output: "b"
         * // expected output: "c"
         *
         * insertAdjacentHTML() разбирает указанный текст как HTML или XML и вставляет полученные
         * узлы (nodes) в DOM дерево в указанную позицию. Данная функция не переписывает имеющиеся
         * элементы, что предотвращает дополнительную сериализацию и поэтому работает быстрее,
         * чем манипуляции с innerHTML.
         */
      this.catalogList.forEach(item => {
          this.catalogBlock.insertAdjacentHTML('beforeend', this.renderCatalogItem(item));
      });
    },

    /**
     * Рендер отдельного товара из списка
     * @param item - товар
     * @returns {string} - сформированная строка разметки
     */
    renderCatalogItem(item) {
        return `<div class="product">
                <h3>${item.product_names}</h3>
                <p>${item.price} руб.</p>
                <button class="product__add-to-cart" data-id_product="${item.id_product}">В корзину</button>
            </div>`;
    },

    /**
     * Рендер(отображение) пустого каталога
     */
    renderEmptyCatalog(){
      this.catalogBlock.innerHTML = '';
      this.catalogBlock.insertAdjacentHTML('beforeend', 'Каталог товаров пуст.');
    },

    // // addToCart - метод
    // addToCart(good) { //good - объект товара
    //     this.cart.add(good); // передаём товар
    // },
};

/**
 * Объект корзины
 *
 */
// корзина
const cart = {
    cartBlock: null,
    clrCartButton: null,
    cartList: [],
    goods: [
        {
            id_product: 10,
            product_names: 'Яблоки',
            price: 40,
            quantity: 2,
        },
    ],
    // // add - метод и он ожидает какой-то товар good
    // add(good) {
    //     // товары хранятся в новом объекте, с кол-ом и стоимостью
    //     /** this.goods.push(good); - эта запись не верна, т.к. будет ссылаться на товар в каталоге, у
    //      * корзины свой товар у каталога свой они не как не перекликаются
    //     */
    //     this.goods.push({...good, quantity: 1}); // почитать про spred оператор, осталось дописать нужные методы
    //     // в каталоге, нужные рендеры и проверку товара в корзине, если его нет, то делать эту манипуляцию
    //     // "this.goods.push({...good, quantity: 1});", либо изменить кол-во уже у добавленного, и здесь
    //     // используем метод pain у массива.
    // },

    /**
     * Метод инициальзации корзины
     * @param cartBlockClass - класс блока корзины
     * @param clrCartButton - класс кнопки очистки корзины
     * @param cartList - список товаров в каталоге
     */
    init(cartBlockClass, clrCartButton, cartList) {
        this.cartBlock = document.querySelector(`.${cartBlockClass}`);
        this.clrCartButton = document.querySelector(`.${clrCartButton}`);
        this.cartList = cartList;

        this.addEventHandlers();
        this.render();
    },

    /**
     * Метод установки обработчиков событий
     */
    addEventHandlers() {
        this.clrCartButton.addEventListener('click', this.dropCart.bind(this)); // this.dropCart.call(this, a, b, c)
    },

    /**
     * Метод очистки корзины
     */
    dropCart() {
        this.goods = [];
        this.render();
    },

    /**
     * Рендер корзины
     */
    render() {
        if (this.getCartGoodsLength() > 0) {
            this.renderCartList();
        } else {
            this.renderEmptyCart();
        }
    },

    findProductInCatalog(id_product) {
        return this.cartList.find(product => product.id_product === id_product);
    },
    /**
     * Добавить товар
     */
    addToBasket(id_product) {
        const product = this.findProductInCatalog(id_product);

        if (product) {
            const findInBasket = this.goods.find(({id_product}) => product.id_product === id_product);
            if (findInBasket) {
                findInBasket.quantity++;
            } else {
                this.goods.push({...product, quantity: 1});
            }
            this.render();
        } else {
            alert('Ошибка добавления!');
        }
    },

    /**
     * Получение количества товаров в корзине
     * @returns {number}
     */
    getCartGoodsLength() {
        return this.goods.length;
    },

    /**
     * Рендер пустой корзины
     */
    renderEmptyCart() {
        this.cartBlock.innerHTML = '';
        this.cartBlock.insertAdjacentHTML('beforeend', 'Корзина пуста.');
    },

    /**
     * Рендер списка товаров в корзине
     */
    renderCartList() {
        this.cartBlock.innerHTML = '';
        this.goods.forEach(item => {
            this.cartBlock.insertAdjacentHTML('beforeend', this.renderCartItem(item));
        });

    },

    /**
     * Рендер отдельного товара в корзине
     * @param item - товар
     * @returns {string} - сгененрированая строка разметки
     */
    renderCartItem(item) {
        // return this.countBasketPrice();
        return `<div>
                <h3>${item.product_names}</h3>
                <p>${item.price} руб.</p>
                <p>${item.quantity} шт.</p>
            </div>`;
    },

};

/**
 * Подключение каталога и корзины
 */
catalog.init('catalog', cart);
cart.init('cart', 'cart-btn', catalog.catalogList);