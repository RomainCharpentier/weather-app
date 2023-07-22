<script lang="ts">
  import type { Location } from "../services/Location";
  import WeatherService from "../services/weather.service";
  import LocationService from "../services/location.service";
  import Weather from "./Weather.svelte";

  let searchPlace = "Paris";
  let actualLocation: Location = {
    name: "Paris, Ile-de-France, Metropolitan France, France",
    latitude: "48.8588897",
    longitude: "2.3200410217200766",
  };
  $: weatherPromise = WeatherService.getCurrent(actualLocation);

  function changeLocation(): void {
    LocationService.getLocation(searchPlace).then(
      (foundLocation) => (actualLocation = foundLocation)
    );
  }
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Home page" />
</svelte:head>

<div class="container">
  <div class="subcontainer">
    <h1>Weather</h1>

    <form on:submit|preventDefault={changeLocation}>
      <label>
        Location
        <input bind:value={searchPlace} />
      </label>

      <button on:click>Submit</button>
    </form>

    {#await weatherPromise}
      <p>...waiting</p>
    {:then weather}
      <h4>{actualLocation.name}</h4>
      <Weather {weather} />
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  </div>
</div>

<style>
  .container {
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
  }
  .subcontainer {
    width: 50%;
    min-width: 300px;
  }
</style>
