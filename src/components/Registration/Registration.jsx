import { Formik, ErrorMessage } from 'formik';
import {
  ErrorText,
  FormStyled,
  PostErrorText,
  PostTitle,
} from './Registration.styled';
import { SignUpButton } from 'components/Button/Button.styled';
import { useState } from 'react';
import { USER_ID_LS } from 'constants/constants';
import { postUser } from 'services/API';
import Loader from 'Icons/Loader';
import { SignupSchema } from 'constants/formValidationConstants';
import { useUsers } from 'hooks/UsersContext';
import NameInput from 'components/NameInput';
import EmailInput from 'components/EmailInput';
import PhoneInput from 'components/PhoneInput';
import UploadControl from 'components/UploadControl';

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
  const [postError, setPostError] = useState('');
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
      const response = await postUser(valuesToPost);
      if (response.status === 201 && response.data?.success) {
        setPostError('');
        handleSubmitClick();
        localStorage.setItem(USER_ID_LS, response.data.user_id);
      } else if (response.status !== 201) {
        setPostError(response.data.message);
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
        onSubmit={async (values, actions) => {
          const validValues = {
            ...values,
            position: +values.position,
            file,
          };
          await handleSubmit(validValues);
          if (postError !== '') {
            actions.setSubmitting(false);
          }
        }}
      >
        {({ handleChange, isSubmitting, values, errors, touched }) => {
          const inputValues = Object.values(values);
          const emptyValues = inputValues.some(item => item === '' || !item);
          return (
            <FormStyled>
              <NameInput
                handleChange={handleChange}
                value={values.name}
                nameError={errors.name}
                touchedError={touched.name}
              />
              <EmailInput
                handleChange={handleChange}
                value={values.email}
                emailError={errors.email}
                touchedError={touched.email}
              />
              <PhoneInput
                handleChange={handleChange}
                value={values.phone}
                phoneError={errors.phone}
                touchedError={touched.phone}
              />
              <UploadControl
                handleChange={handleChange}
                handleFileChange={handleFileChange}
                fileValue={values.file}
                notFit={fileUploadErrorText === '' ? false : true}
                presentFile={file}
                fileUploadErrorText={fileUploadErrorText}
              />
              <SignUpButton
                disabled={emptyValues || notUploadImage}
                type="submit"
              >
                {isSubmitting ? <Loader /> : 'Sign up'}
                {postError !== '' && <PostErrorText>{postError}</PostErrorText>}
              </SignUpButton>
            </FormStyled>
          );
        }}
      </Formik>
    </>
  );
};

export default Registration;
