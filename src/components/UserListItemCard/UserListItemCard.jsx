import TippyTool from 'components/TippyTool';
import {
  UserCard,
  UserItemAddInfo,
  UserItemImg,
  UserItemName,
} from './UserListItemCard.styled';
import sprite from '../../images/svg/sprite.svg';

const UserListItemCard = ({
  photoSrc,
  userName,
  userPosition,
  userEmail,
  userPhone,
  ...props
}) => {
  return (
    <UserCard {...props}>
      {photoSrc.includes('users') ? (
        <UserItemImg src={photoSrc} alt={userName} />
      ) : (
        <svg width="70" height="70">
          <use href={sprite + '#user-plug'}></use>
        </svg>
      )}
      <UserItemName>{userName}</UserItemName>
      <UserItemAddInfo>
        {userPosition} <br />
        <TippyTool description={userEmail}>
          <a href={`mailto:${userEmail}`}>{userEmail}</a>
        </TippyTool>
        <br />
        <TippyTool description={userPhone}>
          <a href={`tel:${userPhone}`}>{userPhone}</a>
        </TippyTool>
      </UserItemAddInfo>
    </UserCard>
  );
};

export default UserListItemCard;
