import { Field } from 'formik';
import styled from 'styled-components';

export const PositionsItem = styled.label`
  margin-bottom: 7px;
  display: flex;
  align-items: center;
  position: relative;

  cursor: pointer;
  font-weight: 400;
  font-size: ${p => p.theme.fontSizes.m};
  user-select: none;

  :last-of-type {
    margin-bottom: 47px;
  }
`;

export const RadioButton = styled(Field)`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const CustomRadioButton = styled.span`
  position: relative;
  height: 20px;
  width: 20px;
  border: 1px solid ${p => p.theme.colors.radioButtonIdleColor};
  border-radius: ${p => p.theme.radii.round};
  transition: ${p => p.theme.transition.backgroundColor};

  ::after {
    content: '';
    position: absolute;
    display: none;

    ${RadioButton}:checked ~ & {
      display: block;
    }

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: ${p => p.theme.radii.round};
    background: ${p => p.theme.colors.radioButtonColor};
  }

  ${PositionsItem}:hover > & {
    background-color: ${p => p.theme.colors.radioButtonIdleColor};
  }

  ${RadioButton}:checked ~ & {
    border: 1px solid ${p => p.theme.colors.radioButtonColor};
  }
`;

export const LabelText = styled.p`
  margin-left: 12px;
`;
