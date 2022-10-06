import styled from 'styled-components';
import Button from './Button';

export const ButtonStyled = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${p => p.theme.radii.exlg};
  border: ${p => p.theme.borders.none};
  background-color: ${p => p.theme.colors.primary};
  transition: ${p => p.theme.transition.backgroundColor};
  min-width: 100px;
  min-height: 34px;
  font-size: ${p => p.theme.fontSizes.m};
  line-height: ${p => p.theme.lineHeights.body};
  font-weight: 400;

  &:hover,
  &:focus {
    background-color: ${p => p.theme.colors.hover};
  }

  &:disabled {
    background-color: ${p => p.theme.colors.disabled};
    color: ${p => p.theme.colors.disabledText};
  }
`;

export const SignUpButton = styled(ButtonStyled)`
  padding: 4px 22px;
  margin-left: ${p => p.theme.space[9]};
  margin-right: ${p => p.theme.space[9]};
`;

export const UsersButton = styled(ButtonStyled)`
  padding: 4px 29px;
`;

export const ShowMoreButton = styled(ButtonStyled)`
  padding: 4px 18px 4px 19px;
  margin: 50px ${p => p.theme.space[9]} ${p => p.theme.space[0]}px
    ${p => p.theme.space[9]};
`;

export const UpButtonStyled = styled(ButtonStyled)`
  position: ${p => p.theme.position.fixed};
  bottom: ${p => p.theme.space[5]}px;
  right: ${p => p.theme.space[4]}px;
  min-width: ${p => p.theme.space[5]}px;
  min-height: ${p => p.theme.space[5]}px;
  border-radius: ${p => p.theme.radii.round};
  padding: 5px;
  opacity: 0.33;
  transition: ${p => p.theme.transition.opacity};

  :hover {
    opacity: ${p => p.theme.opacities.full};
  }

  @media screen and (min-width: 768px) {
    right: 3%;
    width: 40px;
    height: 40px;
  }
`;
