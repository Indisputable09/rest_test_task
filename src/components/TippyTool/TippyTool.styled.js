import styled from 'styled-components';
import { motion } from 'framer-motion';

export const TippyBox = styled(motion.div)`
  background-color: ${p => p.theme.colors.borderColor};
  color: ${p => p.theme.colors.secondaryTextColor};
  border-radius: ${p => p.theme.radii.sm};
  padding: ${p => p.theme.space[1]}px ${p => p.theme.space[3]}px;
  font-size: ${p => p.theme.fontSizes.m};
  line-height: ${p => p.theme.lineHeights.body};
  font-weight: 400;

  pointer-events: none;
`;
