import { UserCard } from 'components/UserListItemCard/UserListItemCard.styled';
import styled from 'styled-components';

export const Overlay = styled.div`
  position: ${p => p.theme.position.fixed};
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${p => p.theme.colors.modalBg};
  z-index: 1200;
  opacity: ${p => (p.showModal ? 1 : 0)};
  pointer-events: ${p => !p.showModal && 'none'};
  transition: ${p => p.theme.transition.opacity};
`;

export const ModalWindow = styled.div`
  text-align: center;
  position: ${p => p.theme.position.relative};
  top: ${p => (p.showModal ? '50%' : p.coordinates.y + 'px')};
  left: ${p => (p.showModal ? '50%' : p.coordinates.x + 'px')};

  transform: translate(-50%, -50%)
    ${p => (p.showModal ? 'scale(1)' : 'scale(0)')};
  background-color: ${p => p.theme.colors.cardBg};
  border-radius: ${p => p.theme.radii.card};
  transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
  width: 328px;

  @media screen and (min-width: 768px) {
    width: 344px;
  }
  @media screen and (min-width: 1024px) {
    width: 282px;
  }
  @media screen and (min-width: 2560px) {
    width: 370px;
  }

  & > ${UserCard} {
    cursor: unset;
  }
`;
