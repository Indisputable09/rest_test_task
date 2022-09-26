import styled from 'styled-components';
import Button from './Button';

export const ButtonStyled = styled(Button)`
  border-radius: ${p => p.theme.radii.exlg};
  border: ${p => p.theme.borders.none};
  background-color: ${p => p.theme.colors.primary};
  transition: ${p => p.theme.transition.backgroundColor};

  :hover,
  :focus {
    background-color: ${p => p.theme.colors.hover};
  }
`;

export const ButtonHeader = styled(ButtonStyled)`
  width: 100px;
  height: 34px;
`;
