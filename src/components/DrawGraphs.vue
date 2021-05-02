<template>
  <div>
    <div class="input-div">
      <label>
        Start Date<br/>
        <input type="date" v-model="startDate" step="any">
      </label>
    </div>
    <div class="input-div">
      <label>
        End Date<br/>
        <input type="date" v-model="endDate" step="any">
      </label>
    </div>
    <div id="draw">
      <button type="button" @click="calculateAndDraw">Draw graph</button>
    </div>
    <img alt="App logo" src="../assets/arrow.png" id="arrow">
    <div id="chart">
      <GChart
          type="LineChart"
          :data="chartData"
          :options="chartOptions"
      />
      <GChart
          type="ColumnChart"
          :data="chartData"
          :options="chartOptions"
      />
    </div>
  </div>
</template>

<script>
import {GChart} from 'vue-google-charts';

const SunCalc = require("suncalc");
export default {
  name: "DrawGraphs",
  components: {
    GChart
  },
  data: function () {
    return {
      startDate: null,
      endDate: null,
      chartData: null,
      chartOptions: {
        title: "Day length visualization in the chosen location",
        vAxis: {title: "Day length in hours"}
      }
    }
  },
  methods: {
    calculateAndDraw() {
      if (!this.startDate || !this.endDate) {
        alert("Please choose dates!")
        return
      }

      let location = this.$store.state.coordinates
      let endDateValue = new Date(this.endDate)
      let date = new Date(this.startDate)

      //If the end date is earlier than the start date, notify the user
      if (endDateValue < date) {
        alert("Please choose a proper time period!")
        return
      }

      let timePeriodInDays = (endDateValue.getTime() - date.getTime()) / (1000 * 3600 * 24)
      let data = [["Date ", "Day length "]]

      //Calculate day lengths and add them to the data
      for (let i = 0; i <= timePeriodInDays; i++) {
        let times = SunCalc.getTimes(date, location.latitude, location.longitude)
        let dayLengthHours = (times.sunset - times.sunrise) / 3600000

        data.push([date.toDateString(), dayLengthHours])
        date.setDate(date.getDate() + 1)
      }
      this.chartData = data
    }
  }
}
</script>

<style scoped>
#chart {
  max-width: 95%;
  max-height: 100%;
  border: 5px inset red;
  margin-top: 50px;
  margin-bottom: 100px;
  margin-left: 50px;
}

#arrow {
  width: 15%;
  height: 15%;
}

</style>