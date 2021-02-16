"use strict";
const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winFoodCount: 50,
    winObstacleCount: 3, //препятствие

};

const config = {
    settings,
    init(userSettings) {
        Object.assign(this.settings, userSettings);
    },

    getRowsCount() {
        return this.settings.rowsCount;
    },

    getColsCount() {
        return this.settings.colsCount;
    },

    getSpeed() {
        return this.settings.speed;
    },

    getWinFoodCount() {
        return this.settings.winFoodCount;
    },
    // Препятствие, ссылка в настройки игры
    getWinObstacleCount() {
        return this.settings.winObstacleCount;
    },

    validate() {
        const result = {
            isValid: true,
            errors: [],
        };

        if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getColsCount() < 10 || this.getColsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getSpeed() < 1 || this.getSpeed() > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }

        if (this.getWinFoodCount() < 5 || this.getWinFoodCount() > 50) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне [5, 50].');
        }
        // Препятствие, проверка на ошибки
        if (this.getWinObstacleCount() < 1 || this.getWinObstacleCount() > 3) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение getWinObstacleCount должно быть в диапазоне [1, 3].');
        }



        return result;
    },
};

const map = {
    cells: null,
    usedCells: [],

    init(rowsCount, colsCount) {
        const table = document.getElementById('game');
        table.innerHTML = '';

        this.cells = {};
        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                const td = document.createElement('td');
                td.classList.add('cell');

                this.cells[`x${col}_y${row}`] = td;
                tr.appendChild(td);
            }
        }
    },

    render(snakePointsArray, foodPoint, obstaclePoint) {
        for (const cell of this.usedCells) {
            cell.className = 'cell';
        }

        this.usedCells = [];

        snakePointsArray.forEach((point, index) => {
            const snakeCell = this.cells[`x${point.x}_y${point.y}`];
            snakeCell.classList.add(index === 0 ? 'snakeHead' : 'snakeBody');
            this.usedCells.push(snakeCell);
        });

        const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];
        foodCell.classList.add('food');
        this.usedCells.push(foodCell);
        // Отображение препятствий
        const obstacleCell = this.cells[`x${obstaclePoint.x}_y${obstaclePoint.y}`];
        obstacleCell.classList.add('obstacle');
        this.usedCells.push(obstacleCell);
    },
};

const snake = {
    body: [],
    direction: null,
    lastStepDirection: null,


    init(startBody, direction) {
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
    },

    getBody() {
        return this.body;
    },

    getLastStepDirection() {
        return this.lastStepDirection;
    },

    isOnPoint(point) {
        return this.body.some(snakePoint => snakePoint.x === point.x && snakePoint.y === point.y);
    },

    makeStep() {
        this.lastStepDirection = this.direction;
        this.body.unshift(this.getNextStepHeadPoint()); // [3, 2, 1] => [4, 3, 2]
        this.body.pop();
    },

    growUp() {
        const lastBodyIndex = this.body.length - 1;
        const lastBodyPoint = this.body[lastBodyIndex];
        const lastBodyPointClone = Object.assign({}, lastBodyPoint);
        this.body.push(lastBodyPointClone); // [3, 2, 1] => [3, 2, 1, 1]
    },

    getNextStepHeadPoint() {
        const firstPoint = this.body[0];

        switch (this.direction) {
            case 'up':
                return {x: firstPoint.x, y: firstPoint.y - 1};
            case 'right':
                return {x: firstPoint.x + 1, y: firstPoint.y};
            case 'down':
                return {x: firstPoint.x, y: firstPoint.y + 1};
            case 'left':
                return {x: firstPoint.x - 1, y: firstPoint.y};
        }
    },

    setDirection(direction) {
        this.direction = direction;
    },
};

const food = {
    x: null,
    y: null,

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        };
    },

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    },
};
// Объявляем объект препятствие
const obstacle = {
    x: null,
    y: null,

    getCoordinates1() {
        return {
            x: this.x,
            y: this.y,
        };
    },

    setCoordinates1(point) {
        this.x = point.x;
        this.y = point.y;
    },

};

const status = {
    condition: null,

    setPlaying() {
        this.condition = 'playing';
    },

    setStopped() {
        this.condition = 'stopped';
    },

    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    },
};

/**
 * Объект счётчика. Подсчитывает очки пользователя.
 * @property {int} count Очки пользователя.
 * @property {HTMLElement} countEl DOM-элемент для вставки числа отображающего количество очков пользователя.
 */
const score = {
    //объект счётчика
    count: null,
    countEl: null,

    /**
     * Инициализация счётчика.
     * Поиск в HTML класса score-count
     */
    init(){
        // Вызывается в объекте "game" через свойство "score"
        this.countEl = document.getElementById('score-count');
        this.drop();
    },

    /**
     * Инкремент. Увеличение счётчика
     */
    increment(){
      this.count++;
      this.render();
    },

    /**
     * Сброс счётчика.
     */
    drop(){
        this.count = 0;
        this.render();
    },

    /**
     * render() - отображает количесто очков пользователя
     */
    render(){
        // обращаемся к элементу на HTML странице для бновления состояния текста
        this.countEl.textContent = this.count;
    }
};

const game = {
    config,
    map,
    snake,
    food,
    status,
    obstacle,
    score, // после создания объекта "score" включаем свойством в объект "game"
    tickInterval: null,

    init(userSettings) {
        this.config.init(userSettings);
        const validation = this.config.validate();

        if (!validation.isValid) {
            for (const err of validation.errors) {
                console.log(err);
            }
            return;
        }

        this.map.init(this.config.getRowsCount(), this.config.getColsCount());
        // Инициализируем счётчик.
        this.score.init();

        this.setEventHandlers();
        this.reset();
    },

    reset() {
        this.stop();
        // При остановке игры сбрасываем счётчик.
        this.score.drop(); // Обращаемся из объекта "game" через св-во "score" к объекту "score" и функции "drop" в нутри него
        this.snake.init(this.getStartSnakeBody(), 'up');
        this.food.setCoordinates(this.getRandomFreeCoordinates());
        this.obstacle.setCoordinates1(this.getRandomFreeCoordinates());
        this.render();
    },

    play() {
        this.status.setPlaying();
        this.tickInterval = setInterval(() => this.tickHandler(), 1000 / this.config.getSpeed());
        this.setPlayButton('Стоп');
    },

    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.setPlayButton('Старт');
    },

    finish() {
        this.status.setFinished();
        clearInterval(this.tickInterval);
        this.setPlayButton('Игра закончена', true);
    },

    setPlayButton(text, isDisabled = false) {
        const playButton = document.getElementById('playButton');

        playButton.textContent = text;
        isDisabled
            ? playButton.classList.add('disabled')
            : playButton.classList.remove('disabled');
    },

    tickHandler() {
        if (!this.canMakeStep()) return this.finish();

        if (this.food.isOnPoint(this.snake.getNextStepHeadPoint())) {
            this.snake.growUp();
            // Инкрементируем счётчик.
            this.score.increment(); // count++
            this.food.setCoordinates(this.getRandomFreeCoordinates());
            this.obstacle.setCoordinates1(this.getRandomFreeCoordinates());

            // if (this.obstacle.isOnPoint1 === this.snake.getNextStepHeadPoint){
            //     return this.finish();
            // }

            if (this.isGameWon()) return this.finish();
        }

        this.snake.makeStep();
        this.render();
    },

    getStartSnakeBody() {
        return [
            {
                x: Math.floor(this.config.getColsCount() / 2),
                y: Math.floor(this.config.getRowsCount() / 2),
            }
        ];
    },

    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => {
            this.playClickHandler();
        });

        document.getElementById('newGameButton').addEventListener('click', () => {
            this.newGameClickHandler();
        });

        document.addEventListener('keydown', (event) => this.keyDownHandler(event));
    },

    getRandomFreeCoordinates() {
        const exclude = [this.obstacle.getCoordinates1(), this.food.getCoordinates(), ...this.snake.getBody()];

        while (true) {
            const rndPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            };

            if (!exclude.some(exPoint => rndPoint.x === exPoint.x && rndPoint.y === exPoint.y)) return rndPoint;
        }
    },


    render() {
        // для отрисовки препятствий указать свойство в объекте "game" "obstacle"
        this.map.render(this.snake.getBody(), this.food.getCoordinates(), this.obstacle.getCoordinates1()); // this.obstacle.getCoordinates()
    },

    canMakeStep() {
        const nextHeadPoint = this.snake.getNextStepHeadPoint();
        const nextObstaclePoint = this.obstacle.getCoordinates1()

        // !this.snake.isOnPoint(nextObstaclePoint) - встреча с препятствием
        return !this.snake.isOnPoint(nextHeadPoint) &&
            !this.snake.isOnPoint(nextObstaclePoint) &&
            nextHeadPoint.x < this.config.getColsCount() &&
            nextHeadPoint.y < this.config.getRowsCount() &&
            nextHeadPoint.x >= 0 &&
            nextHeadPoint.y >= 0;
    },

    /**
     * Игра выиграна
     * @returns {boolean}
     */
    isGameWon() {
        return (this.snake.getBody().length > this.config.getWinFoodCount()) &&
            (this.snake.getBody().length > this.config.getWinObstacleCount());
    },

    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    newGameClickHandler() {
        this.reset();
    },

    keyDownHandler(event) {
        if (!this.status.isPlaying()) return;

        const direction = this.getDirectionByCode(event.code);

        if (this.canSetDirection(direction)) {
            this.snake.setDirection(direction);
        }
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
            default:
                return '';
        }
    },

    canSetDirection(direction) {
        const lastStepDirection = this.snake.getLastStepDirection();

        return direction === 'up' && lastStepDirection !== 'down' ||
            direction === 'right' && lastStepDirection !== 'left' ||
            direction === 'down' && lastStepDirection !== 'up' ||
            direction === 'left' && lastStepDirection !== 'right';
    },
};

game.init();
