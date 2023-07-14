<script lang="ts">
  import WeatherService from "../services/weather.service";

  const weatherPromise = WeatherService.getCurrent();
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Home page" />
</svelte:head>

<div class="text-column">
  <h1>Weather</h1>

  {#await weatherPromise}
    <p>...waiting</p>
  {:then weather}
    <p>{weather.text}</p>
    <img src={weather.icon} alt="Icon" />
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>
