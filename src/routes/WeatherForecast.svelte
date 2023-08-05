<script lang="ts">
  import type { Weather } from "../services/Weather";

  export let weather: Weather;
</script>

<div class="container">
  <p class="title">{weather.date}</p>
  <div class="weather">
    <img class="img" src={weather.icon} alt="Icon" />
    <span>{weather.temperature}°C</span>
  </div>
  <div>
    <p>Wind : {weather.wind} km/h</p>
  </div>
</div>

<style lang="scss">
  $blue: #005ea1;
  $lightblue: #167caa;
  $white: #ffffff;
  .container {
    font-size: small;
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
    font-size: medium;
  }
  .weather {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img {
    max-width: 40px;
  }
</style>
