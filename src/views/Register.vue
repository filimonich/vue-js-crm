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
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="form.name"
          :class="{
            invalid:
              v$.form.name.$dirty &&
              !v$.form.name.$pending &&
              v$.form.name.$error,
          }"
          v-model="v$.form.name.$model"
        />
        <label for="name">Имя</label>
        <small
          class="helper-text"
          v-for="(error, index) of v$.form.name.$errors"
          :key="index"
          :class="{
            invalid:
              v$.form.name.$dirty &&
              !v$.form.name.$pending &&
              v$.form.name.$error,
          }"
          >{{ error.$message }}</small
        >
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="form.agreeWithRules" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {
  getEmailValidationRules,
  getPasswordValidationRules,
  getNameValidationRules,
} from "@/validation/validationRules";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        name: "",
        agreeWithRules: false,
      },
    };
  },
  validations() {
    return {
      form: {
        email: getEmailValidationRules(),
        password: getPasswordValidationRules(),
        name: getNameValidationRules(),
      },
    };
  },
  methods: {
    async onSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      try {
        await this.$store.dispatch("auth/register", {
          email: this.form.email,
          password: this.form.password,
          name: this.form.name,
        });
        this.$router.push("/");
      } catch (e) {}
    },
  },
};
</script>
