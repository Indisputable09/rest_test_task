import styled, { keyframes } from 'styled-components';

const bounceLogo = keyframes`
0% {
        transform: translateY(-30px)
    }

    20% {
        transform: translateY(0)
    }

    40% {
        transform: translateY(-15px)
    }

    60% {
        transform: translateY(0)
    }

    80% {
        transform: translateY(-7px)
    }

    100% {
        transform: translateY(0)
    }`;

export const LogoIcon = styled.svg`
  width: 104px;
  height: 26px;
  animation: ${bounceLogo} 500ms both ease-in;
`;
