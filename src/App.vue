<template>
  <div id="app">
    <img alt="App logo" src="./assets/logo.gif" id="logo"><br/>
    <ChooseTimeAndLocation/><br/>
    <DisplayMap/><br/>
    <DrawGraphs/><br/>
  </div>
</template>

<script>
import ChooseTimeAndLocation from "@/components/ChooseTimeAndLocation";
import DisplayMap from "@/components/DisplayMap";
import DrawGraphs from "@/components/DrawGraphs";

export default {
  name: 'App',
  components: {
    DrawGraphs,
    ChooseTimeAndLocation,
    DisplayMap
  }
}
</script>

<style>

:not(.vue2leaflet-map *) {
  font-family: "Courier New", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: #e5fcfc;
}

#app {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #e5fcfc;
}

#logo {
  max-width: 20%;
  max-height: 20%;
  border-radius: 100%;
  border: 25px double #433d53;
}

#logo:hover {
  border-color: red;
}

button {
  color: blanchedalmond;
  background-color: #433d53;
  border: 5px inset #991e09;
  min-height: 50px;
  min-width: 150px;
  font-size: inherit;
  margin-top: 10px;
}

button:hover {
  background-color: #472a77;
  border-color: red;
}

input {
  color: blanchedalmond;
  background-color: #433d53;
  border: 5px inset #991e09;
  width: 100%;
  max-width: 300px;
  min-height: 30px;
  min-width: 30px;
  font-size: inherit;
}

input:hover {
  background-color: #472a77;
  border-color: red;
}

.input-div {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

</style>
