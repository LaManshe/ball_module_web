<h1 align="center"><a href="https://qubite.ru/" target="_blank">Qubite Digital</a> - Модуль Three.js для Web</h1>

Подключение:
===========
### HTML:
    В проект нужно добавить 3 модуля (three.min.js GLTFLoader.js ball_module.js);
    Например:
    <script src="./modules/three.min.js"></script>
    <script src="./modules/GLTFLoader.js"></script>
    <script type="module" src="./ball_module.js"></script>
    
    
    Создать в html файле холст для отображения 3d сцены вот в таком виде. 
    <div class="canva" style="width: 100%; height: 100vh; cursor: pointer;">
        <canvas id="scene"></canvas>
    </div>
    Стили класса canva могут быть выстроены под ваш проект.
### JS:
    В главном JS файле проекта нужно импортировать модуль ball_module.js.
    Например:
    import Ball from "./ball_module.js";
    Далее инициализировать класс Ball любым удобным способом.
Взаимодействие:
===========
### Инициализация:
    new Ball(canvaSelector, ballPath, isRotate, rotateSpeed, colorBall);
    canvaSelector - укзазать селектор div канваса
    ballPath - указать путь до модели мяча
    isRotate - вращение мяча, по умолчанию false
    rotateSpeed - скорость вращения мяча, по умолчанию 0.01
    colorBall - цвет мяча.
### Функции:
    gui() - Включить панель графического пользовтельского интерфейса
    
    setBadge(name, img) - Показать бэйдж
     * {string} name Имя бэйджа (badge_1, badge_2, ..., badge_12)
     * {string} img Путь до картинки бэйджа
     
     deleteBadge(name) - Скрыть бэйдж
     * {string} name Имя бэйджа (badge_1, badge_2, ..., badge_12)
     
     setBallColor(color) - Установить цвет мяча
     * {hex} color Цвет мяча в формате 0х(hex)
     
     getBadges() - Получить список бэйджей
     * Возвращаемое значение object
     
     resize() - Вызвать когда происходит изменения размера страницы
