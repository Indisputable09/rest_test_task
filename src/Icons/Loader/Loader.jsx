import sprite from '../../images/svg/sprite.svg';
import { LoaderIcon } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderIcon>
      <use href={sprite + '#preloader'}></use>
    </LoaderIcon>
  );
};
export default Loader;
