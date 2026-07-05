import { moveCardInState } from './state';
import { renderBoard, createDropZone, clearDropZones } from './render';

let draggedCard = null;
let dragOffsetX = 0;
let dragOffsetY = 0;
let dropZone = null;
let dragData = null;

export function startDrag(e, card, columnIndex, cardIndex) {
    e.preventDefault();
    
    const rect = card.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    
    dragData = {
        columnIndex: columnIndex,
        cardIndex: cardIndex,
        text: card.textContent
    };
    
    card.classList.add('dragging');
    
    draggedCard = card.cloneNode(true);
    draggedCard.className = 'card dragged';
    draggedCard.style.width = rect.width + 'px';
    draggedCard.textContent = card.textContent.replace('✕', '');
    document.body.append(draggedCard);
    
    moveDraggedCard(e.clientX, e.clientY);
    
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
}

function onDragMove(e) {
    e.preventDefault();
    moveDraggedCard(e.clientX, e.clientY);
    checkDropTarget(e);
}

function moveDraggedCard(clientX, clientY) {
    if (!draggedCard) return;
    draggedCard.style.left = (clientX - dragOffsetX) + 'px';
    draggedCard.style.top = (clientY - dragOffsetY) + 'px';
}

function checkDropTarget(e) {
    if (dropZone) {
        dropZone.remove();
        dropZone = null;
    }
    
    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    let targetCard = null;
    let targetColumn = null;
    
    for (let el of elements) {
        if (el.classList.contains('card') && !el.classList.contains('dragging')) {
            targetCard = el;
            break;
        }
        if (el.classList.contains('column') || el.closest('.column')) {
            targetColumn = el.classList.contains('column') ? el : el.closest('.column');
        }
    }
    
    if (targetCard) {
        const rect = targetCard.getBoundingClientRect();
        const isAfter = e.clientY > rect.top + rect.height / 2;
        
        dropZone = createDropZone();
        
        if (isAfter) {
            targetCard.parentNode.insertBefore(dropZone, targetCard.nextSibling);
        } else {
            targetCard.parentNode.insertBefore(dropZone, targetCard);
        }
    } else if (targetColumn) {
        const cardList = targetColumn.querySelector('.card-list');
        const cards = cardList.querySelectorAll('.card:not(.dragging)');
        
        if (cards.length === 0) {
            dropZone = createDropZone();
            cardList.append(dropZone);
        } else {
            let closestCard = null;
            let closestDist = Infinity;
            
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const dist = Math.abs(e.clientY - (rect.top + rect.height / 2));
                if (dist < closestDist) {
                    closestDist = dist;
                    closestCard = card;
                }
            });
            
            if (closestCard) {
                const rect = closestCard.getBoundingClientRect();
                const isAfter = e.clientY > rect.top + rect.height / 2;
                
                dropZone = createDropZone();
                
                if (isAfter) {
                    closestCard.parentNode.insertBefore(dropZone, closestCard.nextSibling);
                } else {
                    closestCard.parentNode.insertBefore(dropZone, closestCard);
                }
            }
        }
    }
}

function onDragEnd(e) {
    if (draggedCard) {
        draggedCard.remove();
        draggedCard = null;
    }
    
    if (dropZone) {
        const targetColumn = parseInt(dropZone.closest('.column').dataset.column);
        const targetIndex = dropZone.parentNode.querySelectorAll('.card:not(.dragging)').length;
        
        const success = moveCardInState(
            dragData.columnIndex,
            dragData.cardIndex,
            targetColumn,
            targetIndex
        );
        
        if (success) {
            renderBoard();
        }
        
        dropZone.remove();
        dropZone = null;
    } else {
        renderBoard();
    }
    
    document.querySelectorAll('.card.dragging').forEach(el => {
        el.classList.remove('dragging');
    });
    
    dragData = null;
    
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup', onDragEnd);
}