import { SignUpButton, UsersButton } from 'components/Button/Button.styled';
import { Box } from 'components/Box';
import { ButtonListItem } from './ButtonsBlock.styled';
import { useUsers } from 'hooks/UsersContext';

const ButtonsBlock = () => {
  const { userName } = useUsers();
  return (
    <Box as="ul" display="flex">
      <ButtonListItem>
        <UsersButton>Users</UsersButton>
      </ButtonListItem>
      <ButtonListItem>
        {userName ? <p>{userName}</p> : <SignUpButton>Sign up</SignUpButton>}
      </ButtonListItem>
    </Box>
  );
};
export default ButtonsBlock;
