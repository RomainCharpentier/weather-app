<script lang="ts">
  import type { Weather } from "../services/Weather";

  export let weather: Weather;
</script>

<div class="container">
  <p>{weather.text}</p>
  <img src={weather.icon} alt="Icon" />
</div>

<style>
  .container {
    width: fit-content;
    text-align: center;
    box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, 0.2);
    border-radius: 25px;
    border: 2px solid rgba(0, 0, 255, 0.2);
  }
</style>
