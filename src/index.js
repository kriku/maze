import pc from 'engine';
import App from './app';

// create a PlayCanvas application
const app = new App('application', 'debug');

window.pc = pc;
window.app = app;
