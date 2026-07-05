import './styles.css';
import { loadState } from './state';
import { renderBoard } from './render';
import { setupEventListeners } from './main';

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    renderBoard();
    setupEventListeners();
});