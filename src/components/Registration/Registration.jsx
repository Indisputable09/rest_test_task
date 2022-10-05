import { Formik, ErrorMessage } from 'formik';
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
import { SignupSchema } from 'constants/formValidationConstants';
import { useUsers } from 'hooks/UsersContext';

const FormError = ({ name }) => {
  return (
    <ErrorMessage name={name} render={message => Notify.failure(message)} />
  );
};

const Registration = ({ setUserLoggedIn }) => {
  const [file, setFile] = useState('');
  const [notUploadImage, setNotUploadImage] = useState(true);
  const { signUpRef } = useUsers();

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
      validateFileSize(e.target.files[0]);
    }
  };

  const handleSubmit = async valuesToPost => {
    try {
      const postResponse = await postUser(valuesToPost);
      console.log('~ postResponse', postResponse);
      if (postResponse.success) {
        setUserLoggedIn();
        localStorage.setItem(USER_ID_LS, postResponse.user_id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PostTitle ref={signUpRef}>Working with POST request</PostTitle>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          position: '',
          file: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          const validValues = {
            ...values,
            position: +values.position,
            file,
          };
          handleSubmit(validValues);
        }}
      >
        {({ handleChange, isSubmitting, values }) => {
          const inputValues = Object.values(values);
          const emptyValues = inputValues.some(item => item === '' || !item);
          return (
            <FormStyled>
              <InputLabel>
                <FormInput
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  onChange={handleChange}
                  value={values.name}
                />
              </InputLabel>
              <FormError name="name" />
              <InputLabel>
                <FormInput
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={handleChange}
                  value={values.email}
                />
              </InputLabel>
              <FormError name="email" />
              <InputLabel>
                <FormInput
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Number"
                  required
                  onChange={handleChange}
                  value={values.phone}
                />
                <NumberExample>+38 (XXX) XXX - XX - XX</NumberExample>
              </InputLabel>
              <FormError name="phone" />
              <PositionsFileBlock>
                <PositionsBlock>
                  <PositionsTitle>Select your position</PositionsTitle>
                  <Positions handleChange={handleChange} values={values} />
                </PositionsBlock>
                <FileUploadBlock>
                  <FileUploadInput
                    type="file"
                    name="file"
                    id="file"
                    onChange={e => {
                      handleChange(e);
                      handleFileChange(e);
                    }}
                    value={values.file}
                    accept="image/jpeg"
                    required
                  />
                  <FileUploadLabel htmlFor="file">
                    {file ? file.name : 'Upload your photo'}
                  </FileUploadLabel>
                </FileUploadBlock>
              </PositionsFileBlock>
              <FormError name="file" />
              <SignUpButton
                disabled={emptyValues || notUploadImage}
                type="submit"
              >
                {isSubmitting ? <Loader /> : 'Sign up'}
              </SignUpButton>
            </FormStyled>
          );
        }}
      </Formik>
    </>
  );
};

export default Registration;
