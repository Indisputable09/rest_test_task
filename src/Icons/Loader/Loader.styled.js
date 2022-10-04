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

export const CenteredLoader = styled.div`
  position: ${p => p.theme.position.fixed};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const PreloaderIcon = styled(LoaderIcon)`
  width: 55px;
  height: 55px;
`;
