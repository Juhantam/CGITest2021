<template>
  <div id="mapWrapper">
    <div class="info">
      <h2>Moving the marker on the map will change the location</h2>
      <span>Current location: {{ markerLocation }}</span>
    </div>
    <l-map
        :zoom="zoom"
        :center=markerLocation
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        id="mapid"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker
          :lat-lng=markerLocation
          @update:lat-lng="markerUpdated"
          :draggable=true></l-marker>
    </l-map>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';

export default {
  name: "DisplayMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 3,
      center: [this.$store.state.coordinates.latitude, this.$store.state.coordinates.longitude],
      markerLocation: [this.$store.state.coordinates.latitude, this.$store.state.coordinates.longitude],
      draggable: true
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    markerUpdated(markerLocation) {
      let coords = {latitude: markerLocation.lat, longitude: markerLocation.lng}
      this.$store.commit("setCoords", coords)
      //console.log(this.$store.state.coordinates.longitude)
      this.markerLocation = [markerLocation.lat, markerLocation.lng]
    }
  },
  computed: mapState(['coordinates']),
  watch: {
    coordinates(newValue) {
      this.markerLocation = [newValue.latitude, newValue.longitude]
    }
  }
}
</script>

<style scoped>
#mapWrapper {
  height: 350px;
  margin-top: 50px;
  margin-bottom: 100px;
  margin-left: 50px;
}

#mapid {
  max-width: 95%;
  max-height: 100%;
  border: 5px inset red;
}

</style>