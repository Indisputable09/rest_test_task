import styled from 'styled-components';
import Button from './Button';

export const ButtonStyled = styled(Button)`
  border-radius: ${p => p.theme.radii.exlg};
  border: none;
`;

export const ButtonHeader = styled(ButtonStyled)`
  width: 100px;
  height: 34px;
`;
