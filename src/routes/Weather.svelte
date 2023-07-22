<script lang="ts">
  import type { Weather } from "../services/Weather";

  export let weather: Weather;
</script>

<div class="container">
  <p class="title">{weather.temperature}°C</p>
  <div>
    <p>{weather.text}</p>
    <img class="img" src={weather.icon} alt="Icon" />
  </div>
  <div>
    Wind
    <p>{weather.wind} km/h</p>
  </div>
</div>

<style lang="scss">
  $blue: #005ea1;
  $lightblue: #167caa;
  $white: #ffffff;
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    text-align: center;
    color: $white;
    font-family: "Quicksand", sans-serif;
    background: linear-gradient(
      180deg,
      rgba($blue, 1) 0%,
      rgba($lightblue, 1) 100%
    );
  }
  .title {
    font-size: xx-large;
  }
  .img {
    width: fit-content;
  }
</style>
