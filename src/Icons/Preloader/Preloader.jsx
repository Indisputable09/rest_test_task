import { PreloaderIcon } from 'Icons/Loader/Loader.styled';
import sprite from '../../images/svg/sprite.svg';

const Preloader = () => {
  return (
    <PreloaderIcon>
      <use href={sprite + '#preloader'}></use>
    </PreloaderIcon>
  );
};
export default Preloader;
