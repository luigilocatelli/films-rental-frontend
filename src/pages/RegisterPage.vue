<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <h1>Register Page</h1>
      <q-form
        @submit="submitNewRegister"
        @reset="resetForm"
        class="q-gutter-md"
      >
        <q-input
          outlined
          v-model="username"
          label="Your username *"
          hint="Username"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please write your username',
          ]"
        />

        <q-input
            outlined
            type="password"
            v-model="password"
            label="Your password *"
            hint="Password"
            lazy-rules
            :rules="[
            (val) => (val && val.length > 0) || 'Please write your password',
          ]"
        />

        <q-input
            outlined
            v-model="email"
            label="Your Email *"
            hint="Email"
            lazy-rules
            :rules="[
                    (val) => (val && val.length > 0) || 'Please write your email',
                  ]"
        />

        <q-input
            outlined
            v-model="name"
            label="Your Name *"
            hint="Name"
            lazy-rules
            :rules="[
                    (val) => (val && val.length > 0) || 'Please write your name',
                  ]"
        />

        <q-input
            outlined
            v-model="surname"
            label="Your Surname *"
            hint="Surname"
            lazy-rules
            :rules="[
                    (val) => (val && val.length > 0) || 'Please write your surname',
                  ]"
        />

        <q-input
            outlined
            v-model="address"
            label="Your Address *"
            hint="Address"
            lazy-rules
            :rules="[
                    (val) => (val && val.length > 0) || 'Please write your address',
                  ]"
        />

        <div>
          <q-btn
            label="Register"
            type="submit"
            color="primary"
            :loading="isLoading"
            :disable="isLoading"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="negative"
            flat
            class="q-ml-sm"
            :loading="isLoading"
            :disable="isLoading"
          />
        </div>
      </q-form>
      <q-ajax-bar
        ref="ajaxBar"
        position="bottom"
        color="accent"
        size="10px"
        skip-hijack
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { ref, computed } from "vue";
import { RegisterService, RegisterRequest } from "src/services/RegisterService";

export default defineComponent({
  name: "RegisterPage",

  setup() {
    const $q = useQuasar();
    const $store = useStore();

    const registerService = new RegisterService();
    const username = ref(null);
    const password = ref(null);
    const email = ref(null);
    const name = ref(null);
    const surname = ref(null);
    const address = ref(null);
    const ajaxBar = ref(null);

    const isLoading = computed(() => {
      return $store.getters["isLoadingModule/getIsLoadingStatus"];
    });

    const resetForm = () => {
      name.value = null;
      password.value = null;
      email.value = null;
      name.value = null;
      surname.value = null;
      address.value = null;
    };

    const notifySuccessRegister = () => {
      $q.notify({
        message: "You successfully registered..",
        color: "positive",
      });
    };

    const notifyFailedRegister = () => {
      $q.notify({
        message: "There is an user for that username",
        color: "negative",
      });
    };

    const submitNewRegister = async () => {
      try {
        ajaxBar.value.start();
        $store.dispatch("isLoadingModule/setIsLoadingToTrue");
        const registerRequest = new RegisterRequest(
            username.value,
            password.value,
            email.value,
            name.value,
            surname.value,
            address.value
        );
        await registerService.doRegister(registerRequest);
        notifySuccessRegister();
      } catch (error) {
        notifyFailedRegister();
        console.log(error);
      } finally {
        $store.dispatch("isLoadingModule/setIsLoadingToFalse");
        ajaxBar.value.stop();
      }
    };

    return {
      username,
      password,
      email,
      name,
      surname,
      address,
      resetForm,
      submitNewRegister,
      ajaxBar,
      isLoading,
    };
  },
});
</script>
