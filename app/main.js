import { YearSlider } from './modules/year-slider/index.js';
import { PageSlider } from './modules/page-slider/index.js';

// Конфигурация PageSlider.
const pageSliderconfig = {
    slides: [
        {
            image: 'images/slide1.jpg'
        },
        {
            image: 'images/slide3.jpg'
        },
        {
            image: '',
            id: 'year-slider-slide'
        }
    ]
};

// Инициализация приложения.
let pageSlider = new PageSlider(pageSliderconfig, 'page-slider-item');
pageSlider.create();

// Конфигурация YearSlider.
const yearSliderconfig = {
    backgroundImage: 'images/slide2_bg.jpg',
    slides: [
        {
            image: 'images/slide2_1.png',
            year: 1998
        },
        {
            image: 'images/slide2_2.png',
            year: 2009
        },
        {
            image: 'images/slide2_3.png',
            year: 2016
        }
    ]
};

// Инициализация приложения.
let yearSlider = new YearSlider(yearSliderconfig, 'year-slider-slide');
yearSlider.create();