import { GlobalStyle } from 'components/GlobalStyle';
import Header from 'components/Header';
import Hero from 'components/Hero';

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <Hero />
      </main>
    </>
  );
};

/*padding-top: 118px;
  padding-bottom: 118px;
  height: 400px;
  max-width: 100%;

  background-color: $hero-bgcolor;
  text-align: center;

  margin-left: auto;
  margin-right: auto;
  background: linear-gradient(rgba(47, 48, 58, 0.4), rgba(47, 48, 58, 0.4)),
    url(../images/hero/mobile-bg-hero.jpg);
  background-repeat: no-repeat;
  background-size: cover;

  @media (min-device-pixel-ratio: 2),
  (min-resolution: 192dpi),
  (min-resolution: 2dppx) {
    background: linear-gradient(rgba(47, 48, 58, 0.4), rgba(47, 48, 58, 0.4)),
    url(../images/hero/mobile-bg-hero@2x.jpg);
    background-size: cover;
    background-repeat: no-repeat;
  }

    @media screen and (min-width: 768px) {
      background: linear-gradient(rgba(47, 48, 58, 0.4), rgba(47, 48, 58, 0.4)),
      url(../images/hero/tablet-bg-hero.jpg);
      padding-top: 118px;
      padding-bottom: 118px;

        @media (min-device-pixel-ratio: 2),
        (min-resolution: 192dpi),
        (min-resolution: 2dppx) {
          background: linear-gradient(rgba(47, 48, 58, 0.4), rgba(47, 48, 58, 0.4)),
            url(../images/hero/tablet-bg-hero@2x.jpg);
            background-size: cover;
            background-repeat: no-repeat;
        }
    }

    @media screen and (min-width: 1200px) {
      max-width: 1600px;
      height: 600px;
      padding-top: 200px;
      padding-bottom: 200px;
      background: linear-gradient(rgba(47, 48, 58, 0.4), rgba(47, 48, 58, 0.4)),
        url(../images/hero/desktop-bg-hero.jpg);
    
      @media (min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
        background: linear-gradient(rgba(47, 48, 58, 0.4), rgba(47, 48, 58, 0.4)),
          url(../images/hero/desktop-bg-hero@2x.jpg);
          background-size: cover;
          background-repeat: no-repeat;
      }
    } */
