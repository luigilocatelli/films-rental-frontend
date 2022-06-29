<template>
  <q-page class="flex flex-center">
    <div id="filmsList">
      <h3>List of films available for renting</h3>
      <select id="categorySelection" @change="getFilmsByCategory($event)">
        <option value="0" selected>All</option>
        <option v-for="category in categories" :value="category.id" v-bind:key="category.id">
          {{category.name}}
        </option>
      </select>
      <h5 id="filmCount">Count : {{count}}</h5>
      <div class="container">
        <table class="table">
          <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Rental rate</th>
            <th>Replacement cost</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="film in films" v-bind:key="film.id">
            <td>{{film.title}}</td>
            <td>{{film.description}}</td>
            <td>{{film.rental_rate}}$</td>
            <td>{{film.replacement_cost}}$</td>
            <td><button class="btn btn-success" v-on:click="rentFilm(film.id)">Rent</button></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import FilmsDataService from "../services/FilmsDataService";
import {getItem} from "src/utils/LocalStorageUtils";

export default defineComponent({
  name: "HomePage",
  data() {
    return {
      films: [],
      categories: [],
      count: 0,
    };
  },
  methods: {
    refreshFilms() {
      FilmsDataService.retriveAllNotRentedFilms(getItem("customerId"), getItem("j_token"))
          .then(response => {
            this.films = response.data;
            this.count = response.data.length;
          });
      FilmsDataService.retriveAllFilmCategories()
          .then(response => {
            this.categories = response.data;
          });
    },
    getFilmsByCategory(event) {
      if(event.target.value == 0)
        return this.refreshFilms();

      FilmsDataService.retriveNotRentedFilmsByCustomerAndCategory(event.target.value, getItem("customerId"), getItem("j_token"))
          .then(response => {
            this.films = response.data;
            this.count = response.data.length;
          });
    },
    rentFilm(filmId) {
      FilmsDataService.insertNewFilmRentalForCustomer(filmId, getItem("customerId"), getItem("j_token"));
      this.$router.go(0);
    }
  },
  created() {
    this.refreshFilms();
  },
});
</script>

<style scoped>
#filmsList {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
