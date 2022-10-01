import styled from 'styled-components';

export const UserListGrid = styled.ul`
  display: grid;
  grid-gap: 20px;
  justify-content: center;
  grid-template-columns: repeat(1, 328px);
  @media screen and (min-width: 768px) {
    grid-gap: 16px;
    grid-template-columns: repeat(2, 344px);
  }
  @media screen and (min-width: 1024px) {
    grid-gap: 29px;
    grid-template-columns: repeat(3, 282px);
  }
  @media screen and (min-width: 2560px) {
    grid-gap: 29px;
    grid-template-columns: repeat(3, 370px);
  }
`;

export const UserListTitle = styled.h2`
  @media screen and (max-width: 767px) {
    max-width: 328px;
  }
  text-align: center;
  margin: ${p => p.theme.space[0]}px ${p => p.theme.space[9]} 50px
    ${p => p.theme.space[9]};
  font-size: ${p => p.theme.fontSizes.l};
  line-height: ${p => p.theme.lineHeights.heading};
  font-weight: 400;
`;
