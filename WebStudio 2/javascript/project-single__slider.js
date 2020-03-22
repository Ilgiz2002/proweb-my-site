class Slider {
    constructor(obj) {
        this.slider = this.getEl(obj.slider)
        this.sliderLine = this.slider.querySelector('.project-single__slider-line')
        this.slides = this.sliderLine.children
        this.next = obj.next ? this.getEl(obj.next) : this.slider.querySelector('.project-single__btn-next')
        this.prev = obj.prev ? this.getEl(obj.prev) : this.slider.querySelector('.project-single__btn-prev')
        this.autoPlay = obj.auto
        this.next.addEventListener('click', () => { this.move(this.next) })
        this.prev.addEventListener('click', () => { this.move(this.prev) })
        this.diraction = obj.diraction.toUpperCase()
        this.sizeMove = this.diraction == 'Y' ? this.sliderLine.clientHeight : this.sliderLine.clientWidth
        this.maxHeight = 500
        this.activeSlide = 0
        this.speed = obj.speed ? obj.speed : 700
        this.sliderLine.style = `
        position:relative;
        overflow:hidden;
        display:flex;
        justify-content:center;
        align-items:center;
        height:max-content;
        `
        for (let i = 0; i < this.slides.length; i++) {
            const el = this.slides[i];
            el.style = `
            position:absolute;
            top:0;
            left: 0;
            width: 100%;
            `
            if (el.classList.contains('active') == false) {
                el.style.transform = `translate${this.diraction}(${this.sizeMove}px)`
            }
            if (i == this.slides.length - 1) {
                el.style.transform = `translate${this.diraction}(-${this.sizeMove}px)`
            }
        }

    }
    getEl(x) {
        return document.querySelector(x)
    }
    move(btn) {
        let rightOrLeft
        if (this.diraction == 'Y') {
            rightOrLeft = btn == this.next ? this.sizeMove : this.sizeMove * -1
        } else {
            rightOrLeft = btn == this.next ? this.sizeMove * -1 : this.sizeMove
        }


        for (let i = 0; i < this.slides.length; i++) {
            const el = this.slides[i];
            el.style.transform = `translate${this.diraction}(${rightOrLeft * -1}px)`
            el.style.transition = 0
        }
        this.slides[this.activeSlide].style.transform = `translate${this.diraction}(${rightOrLeft}px)`
        this.slides[this.activeSlide].style.transition = `${this.speed}ms`
        this.slides[this.activeSlide].classList.remove('active')

        if (btn == this.next) {
            this.activeSlide++
            if (this.activeSlide > this.slides.length - 1) {
                this.activeSlide = 0
            }
        } else {
            this.activeSlide--
            if (this.activeSlide < 0) {
                this.activeSlide = this.slides.length - 1
            }
        }
        this.slides[this.activeSlide].style.transform = `translate${this.diraction}(${0}px)`
        this.slides[this.activeSlide].style.transition = `${this.speed}ms`
        this.slides[this.activeSlide].classList.add('active')

        btn.disabled = true;
        setTimeout(function () { btn.disabled = false }, this.speed)
    }

}

const myFirstSlider = new Slider({
    slider: '.project-single__slider',
    auto: 3000,
    next: '.project-single__btn-next',
    prev: '.project-single__btn-prev',
    diraction: 'x',
    speed: 2000
})