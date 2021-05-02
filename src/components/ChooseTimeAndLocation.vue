<template>
  <div>
    <div id="coordinates">
      <div class="input-div">
        <label>
          Latitude in degrees<br/>
          <input type="number" v-model="latitude" min=-180 max=180 step="any">
        </label>
      </div>
      <div class="input-div">
        <label>
          Longitude in degrees<br/>
          <input type="number" v-model="longitude" min=-180 max=180 step="any">
        </label>
      </div>
    </div>
    <div class="input-div">
      <label>
        Date<br/>
        <input type="date" v-model="date" step="any">
      </label>
    </div>
    <div id="calculate">
      <button type="button" @click="calculate">Calculate</button>
    </div>
    <div id="result">
      <h1>Sun rises at: {{ sunRiseResult }} UTC in this location.</h1>
      <h1>Sun sets at: {{ sunSetResult }} UTC in this location</h1>
      <h1>Daytime length is: {{ dayLengthResult }} in this location</h1>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

const SunCalc = require("suncalc");
export default {
  name: "ChooseTimeAndLocation",
  data: function () {
    return {
      latitude: this.$store.state.coordinates.latitude,
      longitude: this.$store.state.coordinates.longitude,
      date: null,
      sunRiseResult: "",
      sunSetResult: "",
      dayLengthResult: "",
    }
  },
  methods: {
    calculate() {

      if (!this.date) {
        alert("please choose a date!")
        return
      }

      let lat = this.latitude
      let lng = this.longitude

      //Deal with faulty coordinates
      if (lat > 90) lat = 90
      else if (lat < -90) lat = -90
      if (lng > 180) lng = 180
      else if (lat < -180) lat = -180

      //Update state info
      let coords = {latitude: lat, longitude: lng}
      this.$store.commit("setCoords", coords)
      console.log("Latitude was set to: " + this.$store.state.coordinates.latitude)
      console.log("Longitude was set to: " + this.$store.state.coordinates.longitude)

      //For finding the needed information I used the SunCalc library
      let times = SunCalc.getTimes(new Date(this.date), lat, lng)
      let sunset = times.sunset

      //Alert the user in case of polar night/day
      if (sunset instanceof Date && isNaN(sunset.getTime())) {
        alert("Either polar night or polar day here!")
        return
      }

      let sunrise = times.sunrise
      let sunriseHours = sunrise.getUTCHours().toString()
      let sunriseMinutes = sunrise.getUTCMinutes().toString()
      let sunsetHours = sunset.getUTCHours()
      let sunsetMinutes = sunset.getUTCMinutes()

      //String formatting for aesthetic purposes
      if (sunriseHours.length === 1) sunriseHours = "0" + sunriseHours
      if (sunriseMinutes.length === 1) sunriseMinutes = "0" + sunriseMinutes
      if (sunsetHours.length === 1) sunsetHours = "0" + sunsetHours
      if (sunsetMinutes.length === 1) sunsetMinutes = "0" + sunsetMinutes

      let sunRise = (sunriseHours + ":" + sunriseMinutes)
      let sunSet = (sunsetHours + ":" + sunsetMinutes)
      let dayLengthMS = times.sunset - times.sunrise

      //Converting to suitable format from milliseconds
      let dayLength = Math.floor((dayLengthMS / (1000 * 60 * 60)) % 24) +
          " hours and " +
          Math.floor((dayLengthMS / (1000 * 60)) % 60) +
          " minutes"

      this.sunRiseResult = sunRise
      this.sunSetResult = sunSet
      this.dayLengthResult = dayLength
    }
  },
  computed: mapState(['coordinates']),
  watch: {
    coordinates(newValue) {
      this.latitude = newValue.latitude
      this.longitude = newValue.longitude
    }
  }
}
</script>

<style scoped>
#coordinates {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>