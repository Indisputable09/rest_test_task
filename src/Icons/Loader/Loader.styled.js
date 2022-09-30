import styled, { keyframes } from 'styled-components';

const spinAnim = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const LoaderIcon = styled.svg`
  width: 24px;
  height: 24px;
  animation: ${spinAnim} 1.2s linear infinite;
`;

export const Preloader = styled(LoaderIcon)`
  width: 60px;
  height: 60px;
`;
