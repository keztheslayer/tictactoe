import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import initStore from '../utils/initStore';

Vue.use( Vuex );

export const store = new Vuex.Store( {
    state : initStore,
    getters,
    mutations,
    actions,
} );
