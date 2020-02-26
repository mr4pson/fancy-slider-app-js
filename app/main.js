import { YearSlider } from './modules/year-slider/index.js';

// Конфигурация YearSlider.
const yearSliderconfig = {
    backgroundImage: 'images/slide2_bg.jpg',
    slides: [
        {
            image: 'images/slide2_1.png',
            year: 2001
        },
        {
            image: 'images/slide2_2.png',
            year: 2002
        },
        {
            image: 'images/slide2_3.png',
            year: 2003
        }
    ]
};

// Инициализация приложения.
let slider = new YearSlider(yearSliderconfig, 'year-slider-slide');
slider.create();