import { FormError } from 'components/Registration/Registration';
import {
  FormInput,
  InputBlock,
  InputLabel,
  NumberExample,
} from 'components/Registration/Registration.styled';

const PhoneInput = ({ handleChange, value, phoneError, touchedError }) => {
  return (
    <InputBlock>
      <FormInput
        id="phone"
        type="tel"
        name="phone"
        placeholder=" "
        required
        onChange={handleChange}
        value={value}
        error={phoneError && touchedError ? 'true' : 'false'}
      />
      <InputLabel htmlFor="phone">Phone</InputLabel>
      {phoneError && touchedError ? (
        <FormError name="phone" />
      ) : (
        <NumberExample>+38 (XXX) XXX - XX - XX</NumberExample>
      )}
    </InputBlock>
  );
};

export default PhoneInput;
