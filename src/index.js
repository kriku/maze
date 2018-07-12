import pc from 'engine';

import { BoxFactory } from './factory';
import { Maze } from './maze';
import app from './app';

// create a PlayCanvas application
var canvas = document.getElementById('application');

// create maze and walls from boxes
const maze = new Maze({n: 40, m: 40});
const walls = new BoxFactory(maze);

app.start();
