import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import { Notify } from 'notiflix';
import Positions from 'components/Positions';

const NAME_MATCH = "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";

const nameError =
  "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan";
const nameNumber =
  'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +';
const emailError = 'Invalid email address';
const requiredError = 'This field is required';
const SignupSchema = object().shape({
  name: string()
    .required(requiredError)
    .matches(NAME_MATCH, nameError)
    .min(2)
    .max(60),
  email: string()
    .required(requiredError)
    .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, emailError)
    .email(),
  number: string()
    .required(requiredError)
    .matches(/^[+]{0,1}380([0-9]{9})$/, nameNumber),
});

const FormError = ({ name }) => {
  return (
    <ErrorMessage name={name} render={message => Notify.failure(message)} />
  );
};

const Registration = ({
  onSubmit,
  getPosition,
  handleFileChange,
  validateSelectedFile,
}) => {
  return (
    <>
      <h2>Working with POST request</h2>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
        }}
        validationSchema={SignupSchema}
      >
        <Form onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <Field
            id="name"
            type="text"
            name="name"
            pattern={NAME_MATCH}
            placeholder="Name"
            required
          />
          <FormError name="name" />
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            type="email"
            name="email"
            pattern="^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$"
            placeholder="Email"
            required
          />
          <FormError name="email" />
          <label htmlFor="phone">Number</label>
          <Field
            id="phone"
            type="tel"
            name="phone"
            pattern="^[+]{0,1}380([0-9]{9})$"
            placeholder="Number"
            required
          />
          <FormError name="number" />
          <Positions getPosition={getPosition} />
          <Field
            id="file"
            type="file"
            name="file"
            placeholder="Photo"
            onChange={handleFileChange}
            accept="image/jpeg"
            required
          />
          <FormError name="file" />
          <button type="submit" onClick={validateSelectedFile}>
            Sign up
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default Registration;
