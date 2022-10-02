import styled from 'styled-components';

export const SuccessImageTitle = styled.h2`
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

export const SuccessImageStyled = styled.svg`
  width: 328px;
  height: 290px;
`;
