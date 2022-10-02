import sprite from '../../images/svg/sprite.svg';
import { SuccessImageStyled, SuccessImageTitle } from './SuccessImage.styled';

const SuccessImage = () => {
  return (
    <>
      <SuccessImageTitle>User successfully registered</SuccessImageTitle>
      <SuccessImageStyled>
        <use href={sprite + '#success-image'}></use>
      </SuccessImageStyled>
    </>
  );
};

export default SuccessImage;
