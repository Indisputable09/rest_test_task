import styled from 'styled-components';
import Button from './Button';

export const ButtonStyled = styled(Button)`
  border-radius: ${p => p.theme.radii.exlg};
  border: ${p => p.theme.borders.none};
  background-color: ${p => p.theme.colors.primary};
  transition: ${p => p.theme.transition.backgroundColor};
  min-width: 100px;
  min-height: 34px;
  font-size: ${p => p.theme.fontSizes.m};
  line-height: ${p => p.theme.lineHeights.body};
  font-weight: 400;

  :hover,
  :focus {
    background-color: ${p => p.theme.colors.hover};
  }
`;

export const SignUpButton = styled(ButtonStyled)`
  padding: 4px 22px;
`;

export const UsersButton = styled(ButtonStyled)`
  padding: 4px 29px;
`;

export const ShowMoreButton = styled(ButtonStyled)`
  padding: 4px 18px 4px 19px;
  margin-top: 50px;
`;
