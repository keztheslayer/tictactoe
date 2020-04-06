import Vue from 'vue';
import App from './App.vue';

window.addEventListener( 'DOMContentLoaded', () => {
    const node = document.getElementById('app');
    const vm  = new Vue( {
        render : h => h( App ),
    } );

    vm.$mount( node );
} );