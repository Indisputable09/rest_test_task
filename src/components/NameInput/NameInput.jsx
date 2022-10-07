import { FormError } from 'components/Registration/Registration';
import {
  FormInput,
  InputBlock,
  InputLabel,
} from 'components/Registration/Registration.styled';

const NameInput = ({ handleChange, value, nameError, touchedError }) => {
  return (
    <InputBlock>
      <FormInput
        id="name"
        type="text"
        name="name"
        placeholder=" "
        required
        onChange={handleChange}
        value={value}
        error={nameError && touchedError ? 'true' : 'false'}
      />
      <InputLabel htmlFor="name">Your name</InputLabel>
      <FormError name="name" />
    </InputBlock>
  );
};

export default NameInput;
