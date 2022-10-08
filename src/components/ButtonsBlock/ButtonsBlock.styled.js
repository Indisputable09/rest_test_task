import styled from 'styled-components';

export const ButtonListItem = styled.li`
  :last-child {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
`;

export const UserName = styled.p`
  border-bottom: 1px solid ${p => p.theme.colors.primary};
  padding: 4px 29px;
  border-radius: ${p => p.theme.radii.exlg};
  font-size: ${p => p.theme.fontSizes.m};
  font-weight: 400;
`;
