
class ProgressBlock {
  constructor(container) {
    this.container = container;
    this.value = 0;
    this.animated = false;
    this.hidden = false;

    this._createMarkup();
    this._update();
  }

  _createMarkup() {
    this.container.innerHTML = `
      <svg class="progress-ring" viewBox="0 0 120 120">
        <circle class="progress-ring__bg" cx="60" cy="60" r="54"/>
        <circle class="progress-ring__progress" cx="60" cy="60" r="54"/>
      </svg>
    `;

    this.ring = this.container.querySelector('.progress-ring');
    this.progress = this.container.querySelector('.progress-ring__progress');
    this.CIRCUMFERENCE = 2 * Math.PI * 54;
    this.progress.style.strokeDasharray = this.CIRCUMFERENCE;
    this.progress.style.strokeDashoffset = this.CIRCUMFERENCE;
  }

  setValue(val) {
    this.value = Math.max(0, Math.min(100, Number(val) || 0));
    const offset = this.CIRCUMFERENCE - (this.value / 100) * this.CIRCUMFERENCE;
    this.progress.style.strokeDashoffset = offset;
  }

  setAnimated(active) {
    this.animated = !!active;
    this.ring.classList.toggle('animated', this.animated);
  }

  setHidden(hidden) {
    this.hidden = !!hidden;
    this.container.classList.toggle('hidden', this.hidden);
  }

  _update() {
    this.setValue(this.value);
    this.setAnimated(this.animated);
    this.setHidden(this.hidden);
  }
}

const progressContainer = document.getElementById('progress-container');
const progress = new ProgressBlock(progressContainer);

const valueInput = document.getElementById('value-input');
const animateToggle = document.getElementById('animate-toggle');
const hideToggle = document.getElementById('hide-toggle');

valueInput.addEventListener('input', () => {
  progress.setValue(valueInput.value);
});
animateToggle.addEventListener('change', () => {
  progress.setAnimated(animateToggle.checked);
});
hideToggle.addEventListener('change', () => {
  progress.setHidden(hideToggle.checked);
});