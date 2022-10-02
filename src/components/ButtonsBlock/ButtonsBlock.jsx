import { SignUpButton, UsersButton } from 'components/Button/Button.styled';
import { Box } from 'components/Box';
import { ButtonListItem, UserName } from './ButtonsBlock.styled';
import { useUsers } from 'hooks/UsersContext';

const ButtonsBlock = () => {
  const { userName } = useUsers();
  return (
    <Box as="ul" display="flex" alignItems="center">
      <ButtonListItem>
        <UsersButton>Users</UsersButton>
      </ButtonListItem>
      <ButtonListItem>
        {userName ? (
          <UserName>{userName}</UserName>
        ) : (
          <SignUpButton>Sign up</SignUpButton>
        )}
      </ButtonListItem>
    </Box>
  );
};
export default ButtonsBlock;
