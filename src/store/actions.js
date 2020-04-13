export default {
    check( { commit }, payload ) {
        commit( 'checkCell', payload );
        commit('nextStep');
        commit( 'addIdToCheckedArray', payload );
    },
};
