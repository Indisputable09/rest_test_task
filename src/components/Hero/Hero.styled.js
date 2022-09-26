import styled from 'styled-components';
import {
  desktopBg,
  desktopBg2X,
  largeDesktopBg,
  largeDesktopBg2X,
  mobileBg,
  mobileBg2X,
  tabletBg,
  tabletBg2X,
} from 'images/bg';

export const HeroSection = styled.section`
  background-color: lightgrey;
  padding-top: 40px;
  padding-bottom: 70px;
  height: 500px;
  max-width: 100%;
  text-align: center;

  margin-left: auto;
  margin-right: auto;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${mobileBg});
  background-repeat: no-repeat;
  background-size: cover;

  @media (min-device-pixel-ratio: 2),
    (min-resolution: 192dpi),
    (min-resolution: 2dppx) {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(${mobileBg2X});
    background-size: cover;
    background-repeat: no-repeat;
  }

  @media screen and (min-width: 768px) {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(${tabletBg});
    background-size: cover;
    background-repeat: no-repeat;
    padding-top: 90px;
    padding-bottom: 90px;

    @media (min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url(${tabletBg2X});
      background-size: cover;
      background-repeat: no-repeat;
    }
  }

  @media screen and (min-width: 1024px) {
    height: 650px;
    padding-top: 164px;
    padding-bottom: 164px;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(${desktopBg});
    background-size: cover;
    background-repeat: no-repeat;

    @media (min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url(${desktopBg2X});
      background-size: cover;
      background-repeat: no-repeat;
    }
  }

  @media screen and (min-width: 2560px) {
    max-width: 1170px;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(${largeDesktopBg});
    background-size: cover;
    background-repeat: no-repeat;

    @media (min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url(${largeDesktopBg2X});
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
`;

export const HeroTitle = styled.h1`
  max-width: 328px;
  margin: ${p => p.theme.space[0]}px ${p => p.theme.space[9]} 21px
    ${p => p.theme.space[9]};
  color: ${p => p.theme.colors.white};
  font-size: ${p => p.theme.fontSizes.l};
  line-height: ${p => p.theme.lineHeights.heading};
  font-weight: 400;

  @media screen and (min-width: 768px) {
    max-width: 380px;
  }
`;

export const HeroText = styled.p`
  max-width: 328px;
  margin: ${p => p.theme.space[0]}px ${p => p.theme.space[9]}
    ${p => p.theme.space[5]}px ${p => p.theme.space[9]};
  color: ${p => p.theme.colors.white};
  font-size: ${p => p.theme.fontSizes.m};
  line-height: ${p => p.theme.lineHeights.body};
  font-weight: 400;

  @media screen and (min-width: 768px) {
    max-width: 380px;
  }
`;
