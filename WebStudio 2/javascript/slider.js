class Slider {
    constructor(obj) {
        this.sliderName = document.querySelector('.slider')
        this.sliderControls = document.querySelector('.slider__controls')
        this.sliderControlsItem = document.querySelectorAll('.slider__controls-item')
        this.sliderItems = document.querySelectorAll('.slider__item')
        this.sliderWrapper = document.querySelector('.slider__wrapper')

        this.activeSlide = 0
        this.speed = obj.sliderSpeed == undefined ? this.speed = 1000 : this.speed = obj.sliderSpeed
        this.speedAuto = obj.sliderSpeedAuto == undefined ? this.speedAuto = 3000 : this.speedAuto = obj.sliderSpeedAuto

        for (let i = 0; i < this.sliderControlsItem.length; i++) {
            const sliderControlsItemElement = this.sliderControlsItem[i];
            const sliderItemElement = this.sliderItems[i];

            sliderItemElement.style = `transition:${this.speed}ms`
            sliderControlsItemElement.addEventListener('click', () => { this.sliderMove(sliderControlsItemElement, sliderItemElement) })
        }

        let sliderMoveAutoInterval;
        this.sliderWrapper.addEventListener('mouseout', () => {
            sliderMoveAutoInterval = setInterval(() => {
                this.sliderMoveAuto()
            }, this.speedAuto)
        })
        this.sliderWrapper.addEventListener('mouseover', () => { clearInterval(sliderMoveAutoInterval) })
    }
    sliderMove(sliderControlsItemElement, sliderItemElement) {
        for (let i = 0; i < this.sliderItems.length; i++) {
            this.sliderItems[i].classList.remove('slider__item-active')
            this.sliderControlsItem[i].classList.remove('slider__controls-item_active')
        }
        sliderControlsItemElement.classList.add('slider__controls-item_active')
        sliderItemElement.classList.add('slider__item-active')

        this.activeSlide = sliderControlsItemElement.getAttribute('data-number')
    }
    sliderMoveAuto() {
        this.sliderItems[this.activeSlide].classList.remove('slider__item-active')
        this.sliderControlsItem[this.activeSlide].classList.remove('slider__controls-item_active')
        if (this.activeSlide == this.sliderItems.length - 1) {
            this.activeSlide = 0
        } else {
            this.activeSlide++
        }
        this.sliderControlsItem[this.activeSlide].classList.add('slider__controls-item_active')
        this.sliderItems[this.activeSlide].classList.add('slider__item-active')
    }
}

const slider = new Slider({
    sliderSpeed: 2000,
    sliderSpeedAuto: 3000
})

