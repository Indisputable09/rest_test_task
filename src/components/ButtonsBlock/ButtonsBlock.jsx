import { SignUpButton, UsersButton } from 'components/Button/Button.styled';
import { Box } from 'components/Box';
import { ButtonListItem } from './ButtonsBlock.styled';

const ButtonsBlock = () => {
  return (
    <Box as="ul" display="flex">
      <ButtonListItem>
        <UsersButton>Users</UsersButton>
      </ButtonListItem>
      <ButtonListItem>
        <SignUpButton>Sign up</SignUpButton>
      </ButtonListItem>
    </Box>
  );
};
export default ButtonsBlock;
