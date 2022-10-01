import { Formik, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import { Notify } from 'notiflix';
import Positions from 'components/Positions';
import {
  FileUploadBlock,
  FileUploadInput,
  FileUploadLabel,
  FormInput,
  FormStyled,
  InputLabel,
  NumberExample,
  PositionsBlock,
  PositionsFileBlock,
  PostTitle,
} from './Registration.styled';
import { SignUpButton } from 'components/Button/Button.styled';
import { useState } from 'react';

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
    .min(2)
    .max(100)
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

const Registration = ({ handleSubmit, validateSelectedFile, getFile }) => {
  const [file, setFile] = useState(null);
  const handleFileChange = e => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      getFile(e.target.files[0]);
    }
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);
    reader.onload = e => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = e => {
        const height = e.target.height;
        const width = e.target.width;
        if (height > 70 || width > 70) {
          alert('Height and Width must not exceed 70px.');
          return false;
        }
        // alert('Uploaded image has valid Height and Width.');
        return true;
      };
    };
  };

  return (
    <>
      <PostTitle>Working with POST request</PostTitle>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
        }}
        validationSchema={SignupSchema}
      >
        <FormStyled onSubmit={handleSubmit}>
          <InputLabel>
            <FormInput
              id="name"
              type="text"
              name="name"
              pattern={NAME_MATCH}
              placeholder="Name"
              required
            />
          </InputLabel>
          <FormError name="name" />
          <InputLabel>
            <FormInput
              id="email"
              type="email"
              name="email"
              pattern="^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$"
              placeholder="Email"
              required
            />
          </InputLabel>
          <FormError name="email" />
          <InputLabel>
            <FormInput
              id="phone"
              type="tel"
              name="phone"
              pattern="^[+]{0,1}380([0-9]{9})$"
              placeholder="Number"
              required
            />
            <NumberExample>+38 (XXX) XXX - XX - XX</NumberExample>
          </InputLabel>
          <FormError name="number" />
          <PositionsFileBlock>
            <PositionsBlock>
              <p>Select your position</p>
              <Positions />
            </PositionsBlock>
            {/*  */}
            <FileUploadBlock>
              <FileUploadInput
                type="file"
                name="file"
                id="file"
                onChange={handleFileChange}
                accept="image/jpeg"
                required
              />
              <FileUploadLabel htmlFor="file">
                {file ? file.name : 'Upload your photo'}
              </FileUploadLabel>
            </FileUploadBlock>
            {/* <Test>
              <FileLabel>
                Upload
                <FileInput
                  id="file"
                  type="file"
                  name="file"
                  placeholder="Photo"
                  onChange={handleFileChange}
                  accept="image/jpeg"
                  required
                />
              </FileLabel>
            </Test> */}
          </PositionsFileBlock>
          <FormError name="file" />
          {/*  */}
          <SignUpButton
            // disabled={true}
            type="submit"
            onClick={validateSelectedFile}
          >
            Sign up
          </SignUpButton>
        </FormStyled>
      </Formik>
    </>
  );
};

export default Registration;
