import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

//For fixing the marker display issues
//Source: https://github.com/vue-leaflet/Vue2Leaflet/issues/96
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        coordinates: {
            latitude: 0,
            longitude: 0
        }
    },
    mutations: {
        setCoords: (state, coordinates) => {
            state.coordinates = coordinates;
        }
    },
    actions: {},
    getters: {}
});

Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
