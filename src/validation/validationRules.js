import {
  required,
  email,
  minLength,
  helpers,
  minValue,
} from "@vuelidate/validators";
// import { required, email as emailValidator } from "@vuelidate/validators";

export function getEmailValidationRules() {
  return {
    required: helpers.withMessage("Пожалуйста, введите ваш Email", required),
    email: helpers.withMessage("Пожалуйста, введите корректный Email", email),
  };
}

export function getPasswordValidationRules() {
  return {
    required: helpers.withMessage("Пожалуйста, введите ваш пароль", required),
    minLength: helpers.withMessage(
      ({ $params, $model }) =>
        `Пароль должен содержать как минимум ${$params.min} символов. Сейчас ${$model.length}`,
      minLength(6)
    ),
  };
}
export function getNameValidationRules() {
  return {
    required: helpers.withMessage("Пожалуйста, введите ваше имя", required),
    minLength: helpers.withMessage(
      ({ $params, $model }) =>
        `Имя должно содержать как минимум ${$params.min} символов. Сейчас ${$model.length}`,
      minLength(3)
    ),
  };
}
export function getLimitValidationRules() {
  return {
    required: helpers.withMessage("Пожалуйста, введите число", required),
    minValue: helpers.withMessage(
      ({ $params, $model }) =>
        `Минимальное число должно быть больше или равно ${$params.min} . Сейчас ${$model}`,
      minValue(100)
    ),
  };
}
