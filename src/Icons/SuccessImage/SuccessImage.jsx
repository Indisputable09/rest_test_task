import { useUsers } from 'hooks/UsersContext';
import sprite from '../../images/svg/sprite.svg';
import { SuccessImageStyled, SuccessImageTitle } from './SuccessImage.styled';

const SuccessImage = () => {
  const { signUpRef } = useUsers();
  return (
    <>
      <SuccessImageTitle ref={signUpRef}>
        User successfully registered
      </SuccessImageTitle>
      <SuccessImageStyled>
        <use href={sprite + '#success-image'}></use>
      </SuccessImageStyled>
    </>
  );
};

export default SuccessImage;
