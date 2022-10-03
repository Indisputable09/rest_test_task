import styled from 'styled-components';

export const UserListItem = styled.li`
  text-align: center;
`;

export const UserCard = styled.div`
  background-color: ${p => p.theme.colors.cardBg};
  border-radius: ${p => p.theme.radii.card};
  padding: ${p => p.theme.space[4]}px;
`;

export const UserItemImg = styled.img`
  border-radius: ${p => p.theme.radii.round};
`;

export const UserItemName = styled.p`
  margin-top: ${p => p.theme.space[4]}px;
  margin-bottom: ${p => p.theme.space[4]}px;
  font-size: ${p => p.theme.fontSizes.m};
  line-height: ${p => p.theme.lineHeights.body};
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const UserItemAddInfo = styled.p`
  font-size: ${p => p.theme.fontSizes.m};
  line-height: ${p => p.theme.lineHeights.body};
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
