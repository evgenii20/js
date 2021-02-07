/**
 * lesson 5 hw1
 * Создать функцию, генерирующую шахматную доску. При этом можно использовать любые
 * html-теги по своему желанию. Доска должна быть разлинована соответствующим образом,
 * т.е. чередовать черные и белые ячейки. Строки должны нумероваться числами от 1 до 8,
 * столбцы – латинскими буквами A, B, C, D, E, F, G, H.
 */

"use strict";

const chess = {
    // Объявляем свойство "gameContainerEl" для поиска "getElementById" в объекте элемента "chess"
    gameContainerEl: document.getElementById('chess'),

    /**
     * Метод отображения карты (игрового поля).
     * render - предоставлять, оказывать
     */
    renderMap(){
        /**
         * rows - строки
         * @type {number[]}
         */
        const rows = [0, 8, 7, 6, 5, 4, 3, 2, 1, 0];
        /**
         * cols - колонки
         * @type {(number|string)[]}
         */
        const cols = [0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 0];

        // Пробегаемся по каждой строке.
        for (let row = 0; row < rows.length; row++){
            /**
             * Создаём элемент строки
             * @type {HTMLTableRowElement}
             */
            const tr = document.createElement('tr');
            /**
             * Добавляем строку в контейнер объекта (игры) 'chess'
             * на данном этапе формируется структура HTML-страницы из строк
             * без применения стилей (видна при использовании вывода в консоль:
             * 'console.log(this.gameContainerEl.appendChild(tr));').
             */
            this.gameContainerEl.appendChild(tr);
            //console.log(this.gameContainerEl.appendChild(tr));

            // Пробегаемся по каждой колонке
            for (let col = 0; col < cols.length; col++){
                /**
                 * Создаём элемент ячейки 'td'
                 * @type {HTMLTableDataCellElement}
                 */
                const td = document.createElement('td');
                /**
                 * Добавляем ячейку в строку и на выходе ("chess.renderMap();") получаем таблицу 10х10
                 * в HTML-документе
                 */
                tr.appendChild(td);

                // Проверка строк и столбцов с выводом подписи для каждой из сторон
                // Если строка или колонка равны 0, значит это не игровое поле.
                if (rows[row] === 0 && cols[col] !== 0) {
                    // Если это верхняя или нижняя строка, отоброжаем какие колонки есть, 0 - не выводим
                    td.innerHTML = cols[col];
                } else if (cols[col] === 0 && rows[row] !== 0) {
                    // Если это левая или правая колонка, отображаем цифры, 0 - не выводим.
                    td.innerHTML = rows[row].toString();
                }

                // Если ячейка черная - крассим её.
                if (this.isCellIsBlack(row, col)) {
                    td.style.backgroundColor = 'grey';
                }

            }

        }

    },
    /**
     * Функция определяет является ли ячейка чёрной.
     * @param rowNum    Номер в строке.
     * @param colNum    Номер в колонке.
     * @returns {boolean}   true, если ячейка должна быть чёрной, иначе false
     */
    isCellIsBlack(rowNum, colNum) {
        // Если ячейка боковая (не игровое поле), их красить не нужно
        if (rowNum === 0 || colNum === 0 || rowNum === 9 || colNum === 9) {
            return false;
        }

        // Определим по чётности и нечётности строки и колонки.
        return (rowNum % 2 === 1 && colNum % 2 === 0) || (rowNum % 2 === 0 && colNum % 2 === 1);
    },
};

// Запускаем метод отображения карты.
chess.renderMap();