class CompareSlider {
  constructor(options = {}) {
    this.$wrapper = document.querySelector(options.sliderSelector || '.compare-slider');

    if (!this.$wrapper) {
      return 0;
    }

    this.$range = this.$wrapper.querySelector(options.inputRangeSelector || '.compare-slider__range');

    if (!this.$range) {
      return 0;
    }

    this.currentPx = this.rescale(50, this.$range.min, this.$range.max, 0, this.maxVal);
    this.mediaQuery = window.matchMedia('(min-width: 768px)');

    this.init();
  }

  changeRangeWidth() {
    this.setMaxRangeValue();
    this.slide(this.$range.value);
  }

  setMaxRangeValue() {
    this.maxVal = this.$wrapper.getBoundingClientRect().width;
  }

  rescale(currentValue, oldMin, oldMax, newMin, newMax) {
    return (currentValue - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
  }

  slide(value) {
    this.currentPx = this.rescale(value, this.$range.min, this.$range.max, 0, this.maxVal);
    this.$wrapper.style.setProperty('--dynamic-column-width', `${this.$range.max - value}%`);
    this.$wrapper.style.setProperty('--separator-position', `${this.currentPx - this.maxVal / 2}px`);
  }

  init() {
    this.setMaxRangeValue();

    this.$range.addEventListener('input', () => this.slide(this.$range.value));

    this.mediaQuery.addEventListener('change', (event) => this.changeRangeWidth(event.matches));
  }
}

new CompareSlider();

const navToggle = document.querySelector('.toggle-nav');
const nav = document.querySelector('.nav');

nav?.classList.remove('_nojs');

navToggle?.addEventListener('click', function() {
  this.classList.toggle('active');
  nav.classList.toggle('active');
});
