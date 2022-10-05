import { SignUpButton } from 'components/Button/Button.styled';
import Container from 'components/Container';
import { useUsers } from 'hooks/UsersContext';
import { HeroSection, HeroText, HeroTitle } from './Hero.styled';

const Hero = () => {
  const { signUpRef } = useUsers();
  const handleClick = () => {
    signUpRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HeroSection>
      <Container>
        <HeroTitle>Test assignment for front-end developer</HeroTitle>
        <HeroText>
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </HeroText>
        <SignUpButton onClick={handleClick} ref={signUpRef}>
          Sign up
        </SignUpButton>
      </Container>
    </HeroSection>
  );
};

export default Hero;
