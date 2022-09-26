import { LogoIcon } from './Logo.styled';
import sprite from '../../images/svg/sprite.svg';

const Logo = () => {
  return (
    <LogoIcon>
      <use href={sprite + '#logo'}></use>
    </LogoIcon>
  );
};
export default Logo;
