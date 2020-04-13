import Vue from 'vue';
import App from './App.vue';
import { store } from './store/store';
import './styles/styles.scss';

window.addEventListener( 'DOMContentLoaded', () => {
    const node = document.getElementById('app');
    const vm  = new Vue( {
        store,
        render : h => h( App ),
    } );

    vm.$mount( node );
} );