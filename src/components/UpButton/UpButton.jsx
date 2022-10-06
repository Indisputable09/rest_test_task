import { UpButtonStyled } from 'components/Button/Button.styled';
import sprite from '../../images/svg/sprite.svg';

const UpButton = ({ handleUpButtonClick }) => {
  return (
    <UpButtonStyled onClick={handleUpButtonClick}>
      <svg width="24" height="24">
        <use href={sprite + '#icon-angel-up'}></use>
      </svg>
    </UpButtonStyled>
  );
};

export default UpButton;
