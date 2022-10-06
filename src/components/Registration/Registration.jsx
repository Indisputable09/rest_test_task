import { Formik, ErrorMessage } from 'formik';
import Positions from 'components/Positions';
import {
  ErrorText,
  FileUploadBlock,
  FileUploadInput,
  FileUploadLabel,
  FormInput,
  FormStyled,
  InputBlock,
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

export const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <ErrorText>{message}</ErrorText>}
    />
  );
};

const Registration = () => {
  const [file, setFile] = useState('');
  const [notUploadImage, setNotUploadImage] = useState(true);
  const [fileUploadErrorText, setFileUploadErrorText] = useState('');
  const { signUpRef, handleSubmitClick } = useUsers();

  const validateFileSize = imageFile => {
    const MAX_FILE_SIZE = 5120;

    const fileSizeKiloBytes = imageFile.size / 1024;

    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      setFileUploadErrorText('File size is must not exceed 5Mb');
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
          setFileUploadErrorText('');
          setNotUploadImage(false);
          return true;
        } else if (height < 70 || width < 70) {
          setFileUploadErrorText('Height and Width must not be less than 70px');
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
        handleSubmitClick();
        // setUserLoggedIn();
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
        {({ handleChange, isSubmitting, values, errors, touched }) => {
          const inputValues = Object.values(values);
          const emptyValues = inputValues.some(item => item === '' || !item);
          return (
            <FormStyled>
              <InputBlock>
                <FormInput
                  id="name"
                  type="text"
                  name="name"
                  placeholder=" "
                  required
                  onChange={handleChange}
                  value={values.name}
                  error={errors.name && touched.name ? 'true' : 'false'}
                />
                <InputLabel htmlFor="name">Your name</InputLabel>
                <FormError name="name" />
              </InputBlock>
              <InputBlock>
                <FormInput
                  id="email"
                  type="email"
                  name="email"
                  placeholder=" "
                  required
                  onChange={handleChange}
                  value={values.email}
                  error={errors.email && touched.email ? 'true' : 'false'}
                />
                <InputLabel htmlFor="email">Email</InputLabel>
                <FormError name="email" />
              </InputBlock>
              <InputBlock>
                <FormInput
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder=" "
                  required
                  onChange={handleChange}
                  value={values.phone}
                  error={errors.phone && touched.phone ? 'true' : 'false'}
                />
                <InputLabel htmlFor="phone">Phone</InputLabel>
                {errors.phone && touched.phone ? (
                  <FormError name="phone" />
                ) : (
                  <NumberExample>+38 (XXX) XXX - XX - XX</NumberExample>
                )}
              </InputBlock>
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
                  <FileUploadLabel
                    htmlFor="file"
                    notFit={fileUploadErrorText === '' ? false : true}
                  >
                    {file ? file.name : 'Upload your photo'}
                  </FileUploadLabel>
                  {fileUploadErrorText === '' ? null : (
                    <ErrorText>{fileUploadErrorText}</ErrorText>
                  )}
                </FileUploadBlock>
              </PositionsFileBlock>
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
