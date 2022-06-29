<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Films Rental App </q-toolbar-title>


      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list>
        <q-item clickable v-ripple @click.prevent="logout">
          <q-item-section avatar>
            <q-icon color="primary" name="login" />
          </q-item-section>
          <q-item-section>Logout</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click.prevent="goToFilmsToRentPage">
          <q-item-section avatar>
            <q-icon color="primary" name="list" />
          </q-item-section>
          <q-item-section>Films to be rented</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click.prevent="goToMyRentedFilmsPage">
          <q-item-section avatar>
            <q-icon color="primary" name="list" />
          </q-item-section>
          <q-item-section>My Rented Films</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";
export default defineComponent({
  name: "LoggedInMainLayout",

  setup() {
    const $store = useStore();
    const $router = useRouter();

    const leftDrawerOpen = ref(false);
    const logout = () => {
      $store.dispatch("loginModule/doLogout");
      $router.push({ name: "loginPage" });
    };
    const goToFilmsToRentPage = () => {
      $router.push({name: "protectedPage"});
    }
    const goToMyRentedFilmsPage = () => {
      $router.push({name: "myRentedFilmsPage"});
    }
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logout,
      goToFilmsToRentPage,
      goToMyRentedFilmsPage
    };
  },
});
</script>
