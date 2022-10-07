import { FormError } from 'components/Registration/Registration';
import {
  FormInput,
  InputBlock,
  InputLabel,
} from 'components/Registration/Registration.styled';

const EmailInput = ({ handleChange, value, emailError, touchedError }) => {
  return (
    <InputBlock>
      <FormInput
        id="email"
        type="email"
        name="email"
        placeholder=" "
        required
        onChange={handleChange}
        value={value}
        error={emailError && touchedError ? 'true' : 'false'}
      />
      <InputLabel htmlFor="email">Email</InputLabel>
      <FormError name="email" />
    </InputBlock>
  );
};

export default EmailInput;
