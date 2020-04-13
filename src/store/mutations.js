export default {
    checkCell( state, { id, author } ) {
        const cell = state.cells.find( cell => cell.id === id );

        cell.isChecked = true;
        cell.checkedBy = author;
    },
    nextStep( state ) {
        state.counter++;
    },
    addIdToCheckedArray( state, { id, author } ) {
        if ( author === 'player' ) {
            state.playerCheckedIDs.push( id );
        }
        else {
            state.AICheckedIDs.push( id );
        }
    },
};
