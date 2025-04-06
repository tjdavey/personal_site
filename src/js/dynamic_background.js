import {addParticlesToCanvas} from './modules/background_animation.js';

const particlesCount = 12;

document.addEventListener('DOMContentLoaded', () => {
  addParticlesToCanvas(document.querySelector('#particle-canvas'), particlesCount);
})
