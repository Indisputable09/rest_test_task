import Tippy from '@tippyjs/react/headless';
import { useSpring } from 'framer-motion';
import { TippyBox } from './TippyTool.styled';

const TippyTool = ({ children, description }) => {
  const springConfig = { damping: 15, stiffness: 300 };
  const initialScale = 0.5;
  const opacity = useSpring(0, springConfig);
  const scale = useSpring(initialScale, springConfig);

  const onMount = () => {
    scale.set(1);
    opacity.set(1);
  };

  const onHide = ({ unmount }) => {
    const cleanup = scale.onChange(value => {
      if (value <= initialScale) {
        cleanup();
        unmount();
      }
    });

    scale.set(initialScale);
    opacity.set(0);
  };

  return (
    <Tippy
      delay={[300, 100]}
      placement="bottom"
      render={attrs => (
        <TippyBox style={{ scale, opacity }} {...attrs}>
          {description}
        </TippyBox>
      )}
      onMount={onMount}
      onHide={onHide}
    >
      {children}
    </Tippy>
  );
};

export default TippyTool;
