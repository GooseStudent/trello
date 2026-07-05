const initialState = {
    columns: [
        { id: 0, title: 'To Do', cards: [] },
        { id: 1, title: 'In Progress', cards: [] },
        { id: 2, title: 'Done', cards: [] }
    ]
};

let state = { ...initialState };

export function saveState() {
    localStorage.setItem('trelloState', JSON.stringify(state));
}

export function loadState() {
    const saved = localStorage.getItem('trelloState');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (parsed.columns && parsed.columns.length === 3) {
                state = parsed;
                return true;
            }
        } catch (e) {
            console.error('Error loading state:', e);
        }
    }
    return false;
}

export function resetState() {
    state = { ...initialState };
    saveState();
}

export function getState() {
    return state;
}

export function addCardToState(columnIndex, text) {
    if (!text.trim()) return false;
    state.columns[columnIndex].cards.push(text.trim());
    saveState();
    return true;
}

export function deleteCardFromState(columnIndex, cardIndex) {
    if (cardIndex < 0 || cardIndex >= state.columns[columnIndex].cards.length) return false;
    state.columns[columnIndex].cards.splice(cardIndex, 1);
    saveState();
    return true;
}

export function moveCardInState(sourceColumn, sourceCard, targetColumn, targetIndex) {
    if (sourceColumn === undefined || sourceCard === undefined) return false;
    if (sourceColumn < 0 || sourceColumn >= state.columns.length) return false;
    if (sourceCard < 0 || sourceCard >= state.columns[sourceColumn].cards.length) return false;
    
    const text = state.columns[sourceColumn].cards[sourceCard];
    state.columns[sourceColumn].cards.splice(sourceCard, 1);
    
    const targetCol = targetColumn !== undefined ? targetColumn : sourceColumn;
    const targetIdx = targetIndex !== undefined ? targetIndex : state.columns[targetCol].cards.length;
    
    state.columns[targetCol].cards.splice(targetIdx, 0, text);
    saveState();
    return true;
}

export function getColumnCards(columnIndex) {
    return state.columns[columnIndex]?.cards || [];
}