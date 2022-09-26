import { ButtonHeader } from 'Button/Button.styled';
import { Box } from 'components/Box';
import { ButtonListItem } from './ButtonsBlock.styled';

const ButtonsBlock = () => {
  return (
    <Box as="ul" display="flex">
      <ButtonListItem>
        <ButtonHeader>Users</ButtonHeader>
      </ButtonListItem>
      <ButtonListItem>
        <ButtonHeader>Sign up</ButtonHeader>
      </ButtonListItem>
    </Box>
  );
};
export default ButtonsBlock;
