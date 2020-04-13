export default {
    cells( state ) {
        return state.cells;
    },
    availableCells( state, getters ) {
        return getters.cells.filter( cell => cell.isChecked === false );
    },
    playerCheckedIDs( state ) {
        return state.playerCheckedIDs;
    },
    AICheckedIDs( state ) {
        return state.AICheckedIDs;
    },
    currentStep( state ) {
        return state.counter;
    },
    gameOver( state ) {
        return state.gameOver;
    },
};
