<script lang="ts">
  import axios from "axios";
  import type { Location } from "../services/Location";
  import WeatherService from "../services/weather.service";
  import Weather from "./Weather.svelte";

  let place = "Paris";
  let location: Location = {
    name: "Paris, Ile-de-France, Metropolitan France, France",
    latitude: "48.8588897",
    longitude: "2.3200410217200766",
  };
  $: weatherPromise = WeatherService.getCurrent(location);

  function changeLocation(): void {
    getLocation();
  }

  interface LocationResponse {
    lat: string;
    lon: string;
    display_name: string;
  }

  function getLocation() {
    axios
      .get<LocationResponse[]>("https://geocode.maps.co/search", {
        params: { q: place },
      })
      .then((response) => {
        const firstElement = response.data[0];
        location = {
          name: firstElement?.display_name,
          latitude: firstElement?.lat,
          longitude: firstElement?.lon,
        };
      })
      .catch((error) => {
        console.log(error);
      });
  }
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Home page" />
</svelte:head>

<div class="container">
  <h1>Weather</h1>

  <form on:submit|preventDefault={changeLocation}>
    <label>
      Location
      <input bind:value={place} />
    </label>

    <button on:click>Submit</button>
  </form>

  {#await weatherPromise}
    <p>...waiting</p>
  {:then weather}
    <h4>{location.name}</h4>
    <Weather {weather} />
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>

<style>
  .container {
    text-align: center;
  }
</style>
