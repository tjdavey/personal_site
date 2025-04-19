import {addParticlesToCanvas} from './modules/background_animation.js';
import jQuery from '../../node_modules/jquery/dist/jquery.slim.min';
import '../../node_modules/bootstrap/js/collapse';

const particlesCount = 12;

document.addEventListener('DOMContentLoaded', () => {
  addParticlesToCanvas(document.querySelector('#particle-canvas'), particlesCount);
})
