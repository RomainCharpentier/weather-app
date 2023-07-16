<script lang="ts">
  import axios from "axios";
  import type { Location } from "../services/Location";
  import WeatherService from "../services/weather.service";
  import Weather from "./Weather.svelte";

  let place = "Paris";
  let location: Location = { latitude: "53.1", longitude: "-0.13" };
  $: weatherPromise = WeatherService.getCurrent(location);

  function changeLocation(): void {
    getLocation();
  }

  interface LocationResponse {
    lat: string;
    lon: string;
  }

  function getLocation() {
    axios
      .get<LocationResponse[]>("https://geocode.maps.co/search", {
        params: { q: place },
      })
      .then((response) => {
        const firstElement = response.data[0];
        location = {
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

<div class="text-column">
  <h1>Weather</h1>

  Location :
  <input type="text" bind:value={place} /><button on:click={changeLocation}
    >Submit</button
  >
  {#await weatherPromise}
    <p>...waiting</p>
  {:then weather}
    <Weather {weather} />
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>
