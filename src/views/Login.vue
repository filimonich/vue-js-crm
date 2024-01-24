<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="form.email"
          :class="{
            invalid:
              v$.form.email.$dirty &&
              !v$.form.email.$pending &&
              v$.form.email.$error,
          }"
          v-model="v$.form.email.$model"
        />
        <label for="email">Email</label>
        <small
          class="helper-text"
          v-for="(error, index) of v$.form.email.$errors"
          :key="index"
          :class="{
            invalid:
              v$.form.email.$dirty &&
              !v$.form.email.$pending &&
              v$.form.email.$error,
          }"
          >{{ error.$message }}</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="form.password"
          :class="{
            invalid:
              v$.form.password.$dirty &&
              !v$.form.password.$pending &&
              v$.form.password.$error,
          }"
          v-model="v$.form.password.$model"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text"
          v-for="(error, index) of v$.form.password.$errors"
          :key="index"
          :class="{
            invalid:
              v$.form.password.$dirty &&
              !v$.form.password.$pending &&
              v$.form.password.$error,
          }"
          >{{ error.$message }}</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {
  getEmailValidationRules,
  getPasswordValidationRules,
} from "@/validation/validationRules";
import messages from "@/plugins/messages";

export default {
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },

  validations() {
    return {
      form: {
        email: getEmailValidationRules(),
        password: getPasswordValidationRules(),
      },
    };
  },
  mounted() {
    const message = this.$route.query.message;
    if (messages[message]) {
      this.$message(messages[message]);
    }
  },
  methods: {
    async onSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      try {
        await this.$store.dispatch("auth/login", {
          email: this.form.email,
          password: this.form.password,
        });
        this.$router.push("/");
      } catch (e) {}
    },
  },
};
</script>
