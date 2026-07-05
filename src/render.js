import { getColumnCards, deleteCardFromState } from './state';
import { startDrag } from './drag';

export function renderBoard() {
    const columns = document.querySelectorAll('.column');
    columns.forEach((columnEl, index) => {
        const cardList = columnEl.querySelector('.card-list');
        cardList.innerHTML = '';
        
        const cards = getColumnCards(index);
        cards.forEach((cardText, cardIndex) => {
            const card = createCardElement(cardText, index, cardIndex);
            cardList.append(card);
        });
    });
}

export function createCardElement(text, columnIndex, cardIndex) {
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = text;
    card.dataset.column = columnIndex;
    card.dataset.card = cardIndex;
    card.draggable = false;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '✕';
    deleteBtn.title = 'Delete card';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const column = parseInt(card.dataset.column);
        const cardIdx = parseInt(card.dataset.card);
        deleteCardFromState(column, cardIdx);
        renderBoard();
    });
    card.append(deleteBtn);
    
    card.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('delete-btn')) return;
        const column = parseInt(card.dataset.column);
        const cardIdx = parseInt(card.dataset.card);
        startDrag(e, card, column, cardIdx);
    });
    
    return card;
}

export function createDropZone() {
    const zone = document.createElement('div');
    zone.className = 'drop-zone';
    return zone;
}

export function renderColumn(columnIndex) {
    const columns = document.querySelectorAll('.column');
    const columnEl = columns[columnIndex];
    if (!columnEl) return;
    
    const cardList = columnEl.querySelector('.card-list');
    cardList.innerHTML = '';
    
    const cards = getColumnCards(columnIndex);
    cards.forEach((cardText, cardIndex) => {
        const card = createCardElement(cardText, columnIndex, cardIndex);
        cardList.append(card);
    });
}

export function clearDropZones() {
    document.querySelectorAll('.drop-zone').forEach(el => el.remove());
}