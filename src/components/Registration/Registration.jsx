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
  PositionsTitle,
  PostTitle,
} from './Registration.styled';
import { SignUpButton } from 'components/Button/Button.styled';
import { useState } from 'react';
import { USER_ID_LS } from 'constants/constants';
import { postUser } from 'services/API';
import Loader from 'Icons/Loader';

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

const Registration = ({ setUserLoggedIn }) => {
  const [postingUser, setPostingUser] = useState(false);
  const [file, setFile] = useState('');
  const [notUploadImage, setNotUploadImage] = useState(true);
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    file: null,
  });

  const validateFileSize = imageFile => {
    const MAX_FILE_SIZE = 5120;

    const fileSizeKiloBytes = imageFile.size / 1024;

    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      alert('File size is greater than maximum limit');
      setNotUploadImage(true);
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(imageFile);
    reader.onload = e => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = e => {
        const height = e.target.height;
        const width = e.target.width;
        if (
          (height >= 70 || width >= 70) &&
          fileSizeKiloBytes <= MAX_FILE_SIZE
        ) {
          setNotUploadImage(false);
          return true;
        } else if (height < 70 || width < 70) {
          alert('Height and Width must not be less than 70px.');
          setNotUploadImage(true);
          return false;
        }
      };
    };
  };

  const handleFileChange = e => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setValues(prev => ({
        ...prev,
        [e.target.name]: e.target.files[0],
      }));
      validateFileSize(e.target.files[0]);
    }
  };

  const handleValuesChange = e => {
    setValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePositionValueChange = positionNumber => {
    setValues(prev => ({
      ...prev,
      position: +positionNumber,
    }));
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setPostingUser(true);
      const postResponse = await postUser(values);
      console.log('~ postResponse', postResponse);
      if (postResponse.success) {
        setUserLoggedIn();
        localStorage.setItem(USER_ID_LS, postResponse.user_id);
      }
      setPostingUser(false);
    } catch (error) {
      console.log(error);
    }
  };

  const inputValues = Object.values(values);
  const emptyValues = inputValues.some(item => item === '' || !item);

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
              onChange={handleValuesChange}
              value={values.name}
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
              onChange={handleValuesChange}
              value={values.email}
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
              onChange={handleValuesChange}
              value={values.phone}
            />
            <NumberExample>+38 (XXX) XXX - XX - XX</NumberExample>
          </InputLabel>
          <FormError name="number" />
          <PositionsFileBlock>
            <PositionsBlock>
              <PositionsTitle>Select your position</PositionsTitle>
              <Positions
                handlePositionValueChange={handlePositionValueChange}
                values={values}
              />
            </PositionsBlock>
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
          </PositionsFileBlock>
          <FormError name="file" />
          <SignUpButton disabled={emptyValues || notUploadImage} type="submit">
            {postingUser ? <Loader /> : 'Sign up'}
          </SignUpButton>
        </FormStyled>
      </Formik>
    </>
  );
};

export default Registration;
