/* eslint-disable compat/compat */
const numOfCells = 9;

let cells = [];

for ( let i = 1; i <= numOfCells; i++ ) {
    cells.push( {
        id        : i,
        isChecked : false,
        checkedBy : '',
    } );
}

export default cells;