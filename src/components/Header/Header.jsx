import { Box } from 'components/Box';
import ButtonsBlock from 'components/ButtonsBlock';
import { HeaderContainer } from 'components/Container/Container.styled';
import Logo from 'Icons/Logo';

const Header = () => {
  return (
    <Box as="header" py="2">
      <HeaderContainer>
        <Logo />
        <ButtonsBlock />
      </HeaderContainer>
    </Box>
  );
};
export default Header;
