import './css/index.scss';
import 'swiper/css/swiper.css'
import Swiper from 'swiper';

let slide;
const mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    followFinger: false,
    speed: 800,
    mousewheel: true,
    pagination: {
        el: '.swiper-pagination',
    },
    on: {
        init: function (swiper) {
            slide = this.slides.eq(0);
            slide.addClass('ani-slide');
        },
        transitionStart: function () {
            for (let i = 0; i < this.slides.length; i++) {
                slide = this.slides.eq(i);
                slide.removeClass('ani-slide');
            }
        },
        transitionEnd: function () {
            slide = this.slides.eq(this.activeIndex);
            slide.addClass('ani-slide');

        },
    }
});






function setRem() {
    const scale = document.documentElement.clientWidth / 320
    document.documentElement.style.fontSize = (32 * Math.min(scale, 2)) + 'px'
}
window.onload = setRem;
window.onresize = setRem;

