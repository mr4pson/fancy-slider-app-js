// Класс/Функция-конструктор YearSlider
export function YearSlider(config, sliderWrapId, startIndex = 0) {
    this.config = config;
    this.sliderWrapId = sliderWrapId;
    this.slideIndex = startIndex;
    this.slideLength = this.config.slides.length;
}

//Метод create. Создает html Слайдера и event listener'ы.
YearSlider.prototype.create = function () {
    let slider = document.createElement("div");
    slider.classList.add("year-slider");
    slider.style.backgroundImage = 'url(' + this.config.backgroundImage + ')';
    let container = document.createElement("div");
    container.classList.add("slider-container");
    slider.append(container);
    this.config.slides.forEach((slide) => {
        let slideNode = document.createElement("div");
        slideNode.classList.add("slide");
        slideNode.style.backgroundImage = 'url(' + slide.image + ')';
        container.append(slideNode);
    });

    let navWrapper = document.createElement("div");
    navWrapper.classList.add("slider-nav-wrapper");

    let nav = document.createElement("div");
    nav.classList.add("slider-nav");
    let rangeSlider = document.createElement("input");
    rangeSlider.setAttribute("type", "range");
    rangeSlider.setAttribute("min", 0);
    rangeSlider.setAttribute("max", 100);
    rangeSlider.setAttribute("value", this.getNavSliderPosition());
    rangeSlider.classList.add("slider-range");
    rangeSlider.addEventListener("change", (e) => {
        this.onNavSliderChange(rangeSlider);
    });
    rangeSlider.addEventListener("input", (e) => {
        const curSlidePosition = e.target.value;
        rangeSlider.style.background = 'linear-gradient(to right, #d1eaff 0%, #d1eaff ' + curSlidePosition + '%, rgba(255, 255, 255, 0.25) ' + curSlidePosition + '%, rgba(255, 255, 255, 0.25) 100%)'
    });
    nav.append(rangeSlider);

    let yearWrapper = document.createElement("div");
    yearWrapper.classList.add("year-wrapper");
    this.config.slides.forEach(slide => {
        let year = document.createElement("span");
        year.classList.add("year-item");
        year.innerHTML = slide.year;
        yearWrapper.append(year);
    });
    nav.append(yearWrapper);

    navWrapper.append(nav);


    slider.append(navWrapper);
    const sliderWrap = document.getElementById(this.sliderWrapId);
    sliderWrap.append(slider);
    this.onNavSliderChange(rangeSlider);
};

// Метод translateSlider. Перемещает контейнер слайдера влево/вправо.
YearSlider.prototype.translateSlider = function () {
    const slider = document.getElementById(this.sliderWrapId);
    let container = slider.getElementsByClassName("slider-container")[0];
    const translation = 100 * this.slideIndex;
    container.style.transform = 'translate(-'+translation+'vw, 0)';
}

// Метод onNavSliderChange. Отрисовывает слайдер при изменении его положения
YearSlider.prototype.onNavSliderChange = function(rangeSlider) {
    this.slideIndex = Math.round(rangeSlider.value * (this.slideLength - 1) / 100);
    const curSlidePosition = this.getNavSliderPosition();
    rangeSlider.value = curSlidePosition;
    rangeSlider.style.background = 'linear-gradient(to right, #d1eaff 0%, #d1eaff ' + curSlidePosition + '%, rgba(255, 255, 255, 0.25) ' + curSlidePosition + '%, rgba(255, 255, 255, 0.25) 100%)';
    this.translateSlider();
}

//Метод getNavSliderPosition. Получает текущую позицию ползунка в % из 100.
YearSlider.prototype.getNavSliderPosition = function() {
    const coef = this.slideLength / (this.slideLength - 1)
    return (this.slideIndex * 100) * coef / this.slideLength;
}