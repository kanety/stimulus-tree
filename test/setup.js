global.$ = document.querySelector.bind(document);
global.$$ = document.querySelectorAll.bind(document);

import { Application } from '@hotwired/stimulus';
import TreeController from 'index';

global.application = Application.start();
global.application.register('tree', TreeController);

require('jest-fetch-mock').enableMocks();
