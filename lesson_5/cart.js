"use strict"; // критична к объявлению переменных

    /**
    * less_5
    *
    * hw_3: Сделать генерацию корзины динамической: верстка корзины не должна
    * находиться в HTML-структуре. Там должен быть только div, в который будет
     * вставляться корзина, сгенерированная на базе JS:
     * 3.1. Пустая корзина должна выводить строку «Корзина пуста»;
     * 3.2. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
    *
    * */

const cartItem = {
        render(styleCart) {
            return `<div class="styleCart">
                        <div><b>Наименование</b>: ${styleCart.product_names}</div>
                        <div><b>Цена за шт.</b>: ${styleCart.price}</div>
                        <div><b>Количество</b>: ${styleCart.quantity}</div>
                        <div><b>Стоимость</b>: ${styleCart.quantity * styleCart.price}</div>
                    </div>`;
        }
}

const cart = {
    cartListBlock: null,
    cartButton: null,
    cartItem,
    styleCarts: [
        {
            id_product: 10,
            product_names: 'Яблоки',
            price: 40,
            quantity: 1
        },
        {
            id_product: 20,
            product_names: 'Грушы',
            price: 50,
            quantity: 1
        },
        {
            id_product: 30,
            product_names: 'Виноград',
            price: 100,
            quantity: 1
        },
        {
            id_product: 40,
            product_names: 'Мандарины',
            price: 60,
            quantity: 1
        },
    ],
    /**
     * Document метод querySelector() возвращает первый элемент (Element) документа,
     * который соответствует указанному селектору или группе селекторов. Если совпадений
     * не найдено, возвращает значение null.
     *
     * Метод EventTarget.addEventListener() регистрирует определенный обработчик события,
     * вызванного на EventTarget.
     * EventTarget может быть Element, Document, Window, или любым другим объектом,
     * поддерживающим события (таким как XMLHttpRequest).
     */
    init() {
      this.cartListBlock = document.querySelector('.cart-list');
      this.cartButton = document.querySelector('.cart-btn');
      this.cartButton.addEventListener('click', this.clearCart.bind(this));

      this.render();
    },
    /**
     * Метод forEach() выполняет указанную функцию один раз для каждого элемента в массиве
     *
     * insertAdjacentHTML() разбирает указанный текст как HTML или XML и вставляет
     * полученные узлы (nodes) в DOM дерево в указанную позицию. Данная функция не
     * переписывает имеющиеся элементы, что предотвращает дополнительную сериализацию
     * и поэтому работает быстрее, чем манипуляции с innerHTML
     */
    render() {
        if (this.styleCarts.length) {
            this.styleCarts.forEach(styleCart => {
                this.cartListBlock.insertAdjacentHTML('beforeend', this.cartItem.render(styleCart));
            });
            this.cartListBlock.insertAdjacentHTML('beforeend', `В корзине ${this.styleCarts.length} 
            позиций(я) стоимостью ${this.getCartPrice()} рублей`);
        } else {
            this.cartListBlock.textContent = 'Корзина пуста';
        }
    },
    /**
     * Возвращает стоимость товара умноженную на количество
     * @returns {number}
     */
    getCartPrice() {
        return this.styleCarts.reduce(function (price, styleCart) {
            return price + styleCart.price * styleCart.quantity;
        }, 0);
    },

    clearCart() {
        this.styleCarts = [];
        this.render();
    },
};
    cart.init();
