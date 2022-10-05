/* eslint-disable no-control-regex */
import { object, string, number } from 'yup';
export const NAME_MATCH =
  /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
export const EMAIL_MATCH =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
export const PHONE_MATCH = /^[+]{0,1}380([0-9]{9})$/;

export const nameError =
  'Name may contain only letters, apostrophe, dash and spaces';
export const phoneError =
  'Phone number must start with the code +380 followed by nine digits';
export const emailError = 'Invalid email address';
export const requiredError = 'This field is required';
export const SignupSchema = object().shape({
  name: string()
    .matches(NAME_MATCH, nameError)
    .min(2, 'Name is too short')
    .max(60, 'Name is too long')
    .required(requiredError),
  email: string()
    .matches(EMAIL_MATCH, emailError)
    .min(2, 'Email is too short')
    .max(100, 'Email is too long')
    .email()
    .required(requiredError),
  phone: string().matches(PHONE_MATCH, phoneError).required(requiredError),
  position: number().required(requiredError),
  file: string().required(requiredError),
});
