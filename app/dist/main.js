// Класс yearSlider
function yearSldier(config) {
    this.config = config;
    this.slideIndex = 0;
}

//Метод create. Создает html Слайдера и event listener'ы.
yearSldier.prototype.create = function () {
    const slideLength = this.config.slides.length;
    let slider = document.createElement("div");
    slider.classList.add("year-slider");
    slider.style.backgroundImage = 'url(' + this.config.backgroundImage + ')';
    let container = document.createElement("div");
    container.id = "slider-container";
    slider.append(container);
    this.config.slides.forEach((slide) => {
        let slideNode = document.createElement("div");
        slideNode.classList.add("slide");
        slideNode.style.backgroundImage = 'url(' + slide.image + ')';
        container.append(slideNode);
    });

    let nav = document.createElement("div");
    nav.classList.add("slider-nav");

    let back = document.createElement("button");
    back.classList.add("back-button");
    back.innerHTML = 'back';
    back.addEventListener("click", (event) => {
        if (this.slideIndex > 0) {
            this.slideIndex--;
            this.translateSlider();
        }
    });
    nav.append(back);

    let next = document.createElement("button");
    next.classList.add("next-button");
    next.innerHTML = 'next';
    next.addEventListener("click", (event) => {
        if (this.slideIndex < slideLength - 1) {
            this.slideIndex++;
            this.translateSlider();
        }
    });
    nav.append(next);

    slider.append(nav);
    document.body.append(slider);
};

// Метод generateSlider. Перемещает контейнер слайдера влево/вправо.
yearSldier.prototype.translateSlider = function () {
    let container = document.getElementById("slider-container");
    const translation = 100 * this.slideIndex;
    container.style.transform = 'translate(-'+translation+'vw, 0)';
}


// Конфигурация слайдера.
const config = {
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
let slider = new yearSldier(config);
slider.create();