// Класс/Функция-конструктор PageSlider
export function PageSlider(config, sliderWrapId, startIndex = 0) {
    this.config = config;
    this.sliderWrapId = sliderWrapId;
    this.slideIndex = startIndex;
    this.slideLength = this.config.slides.length;
    this.pixelsToSlide = 150;
}

//Метод create. Создает html Слайдера и event listener'ы.
PageSlider.prototype.create = function () {
    this.slider = document.createElement("div");
    this.slider.classList.add("page-slider");
    let container = document.createElement("div");
    container.classList.add("page-slider-container");
    this.slider.append(container);

    let nav = document.createElement("div");
    nav.classList.add("page-slider-nav");

    this.config.slides.forEach((slide, index) => {
        let slideNode = document.createElement("div");
        slideNode.classList.add("page-slide");
        slide.id ? slideNode.id = slide.id : null;
        slideNode.style.backgroundImage = 'url(' + slide.image + ')';
        container.append(slideNode);

        let round = document.createElement("div");
        round.classList.add("page-slider-round");
        round.addEventListener("click", (e) => {
            this.slideIndex = index;
            this.cleanRounds();
            this.translateSlider();
        });
        nav.append(round);
    });

    this.slider.append(nav);
    var curMouseY = 0;
    container.addEventListener("mousedown", (e) => {
        curMouseY = e.screenY;
        container.style.cursor = 'grab';
    });

    container.addEventListener("mouseup", (e) => {
        if ((e.screenY - curMouseY > this.pixelsToSlide) && (this.slideIndex > 0)) {
            this.cleanRounds();
            this.slideIndex--;
            this.translateSlider();
        } else if ((curMouseY - e.screenY > this.pixelsToSlide) && (this.slideIndex < this.slideLength - 1)) {
            this.cleanRounds();
            this.slideIndex++;
            this.translateSlider();
        }
    });

    container.addEventListener("touchstart", (e) => {
        curMouseY = e.touches[0].screenY;
        container.style.cursor = 'grab';
    });

    container.addEventListener("touchend", (e) => {
        if ((e.changedTouches[0].screenY - curMouseY > this.pixelsToSlide) && (this.slideIndex > 0)) {
            this.cleanRounds();
            this.slideIndex--;
            this.translateSlider();
        } else if ((curMouseY - e.changedTouches[0].screenY > this.pixelsToSlide) && (this.slideIndex < this.slideLength - 1)) {
            this.cleanRounds();
            this.slideIndex++;
            this.translateSlider();
        }
    });

    const sliderWrap = document.getElementById(this.sliderWrapId);
    sliderWrap.append(this.slider);
    this.translateSlider();
};

// Метод translateSlider. Перемещает контейнер слайдера влево/вправо.
PageSlider.prototype.translateSlider = function () {
    let container = this.slider.getElementsByClassName("page-slider-container")[0];
    const translation = 100 * this.slideIndex;
    container.style.transform = 'translate(0, -'+translation+'vh)';
    let rounds = document.getElementsByClassName("page-slider-round");
    rounds[this.slideIndex].classList.add('active');
}

PageSlider.prototype.cleanRounds = function () {
    let rounds = this.slider.getElementsByClassName("page-slider-round");
    for (let round of rounds) {
        round.classList.remove("active");
    };
}