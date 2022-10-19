<template>
  <v-form v-model="isFormValid" name="LoginForm" class="login-form">
    <v-text-field
      v-model="email"
      label="Email"
      :rules="[rules.required, rules.email]"
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="Password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.pmin]"
      :type="showPassword ? 'text' : 'password'"
      @click:append="showPassword = !showPassword"
    ></v-text-field>
    <v-alert :value="showAlert" type="error" text>Invalid credentials</v-alert>
    <v-flex class="d-flex justify-space-between">
      <v-btn color="primary" text>Forgot password?</v-btn>
      <v-btn color="primary" depressed :disabled="!isFormValid" @click="login()"
        >Login</v-btn
      >
    </v-flex>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    email: "", // bound to input value
    password: "", // bound to input value
    showPassword: false, // toggle for pass visibility
    isFormValid: false, // handles button enabled/disabled state

    // validation rules
    rules: {
      required: (v) => !!v || "Required field",
      email: (v) => /.+@.+\..+/.test(v) || "Invalid email",
      pmin: (v) => (v && v.length > 4) || "Pass min length is 5",
    },
  }),

  computed: {
    ...mapGetters("auth", ["isAuthenticated", "authAttempts"]),

    // shows alert depending if the user tried to login and auth status
    showAlert() {
      return this.authAttempts > 0 && !this.isAuthenticated;
    },
  },

  methods: {
    ...mapActions("auth", ["checkAuth"]),

    login() {
      this.checkAuth({
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style lang="scss">
.login-form {
  width: 80%;
  max-width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
