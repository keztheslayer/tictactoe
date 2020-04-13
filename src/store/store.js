import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import cells from '../utils/initCells';

Vue.use( Vuex );

export const store = new Vuex.Store( {
    state : {
        cells,
        counter          : 1,
        gameOver         : false,
        playerCheckedIDs : [],
        AICheckedIDs     : [],
    },
    getters,
    mutations,
    actions,
} );
