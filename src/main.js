import { addCardToState } from './state';
import { renderBoard } from './render';

export function setupEventListeners() {
    setupAddCardButtons();
    setupFormControls();
}

function setupAddCardButtons() {
    document.querySelectorAll('.add-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const column = btn.closest('.column');
            const form = column.querySelector('.add-form');
            const textarea = form.querySelector('textarea');
            
            btn.style.display = 'none';
            form.classList.add('active');
            textarea.focus();
        });
    });
}

function setupFormControls() {
    document.querySelectorAll('.cancel-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const form = btn.closest('.add-form');
            const column = form.closest('.column');
            const addBtn = column.querySelector('.add-btn');
            const textarea = form.querySelector('textarea');
            
            form.classList.remove('active');
            addBtn.style.display = 'block';
            textarea.value = '';
        });
    });
    
    document.querySelectorAll('.submit-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const form = btn.closest('.add-form');
            const column = form.closest('.column');
            const columnIndex = parseInt(column.dataset.column);
            const textarea = form.querySelector('textarea');
            
            const success = addCardToState(columnIndex, textarea.value);
            if (success) {
                renderBoard();
                textarea.value = '';
                form.classList.remove('active');
                column.querySelector('.add-btn').style.display = 'block';
            }
        });
    });
    
    document.querySelectorAll('.add-form textarea').forEach((textarea) => {
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const form = textarea.closest('.add-form');
                const submitBtn = form.querySelector('.submit-btn');
                submitBtn.click();
            }
        });
    });
}