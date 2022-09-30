import sprite from '../../images/svg/sprite.svg';
import { Preloader } from './Loader.styled';

const Loader = () => {
  return (
    <Preloader>
      <use href={sprite + '#preloader'}></use>
    </Preloader>
  );
};
export default Loader;
