import { UserListTitle } from 'components/Userlist/Userlist.styled';
import { Field, Form } from 'formik';
import styled from 'styled-components';

export const PostTitle = styled(UserListTitle)``;

export const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const InputBlock = styled.div`
  position: ${p => p.theme.position.relative};
`;

export const InputLabel = styled.label`
  background-color: ${p => p.theme.colors.mainBg};
  position: ${p => p.theme.position.absolute};
  top: 14px;
  left: ${p => p.theme.space[3]}px;
  color: ${p => p.theme.colors.formColor};
  transition: ${p => p.theme.transition.all};
`;

export const FormInput = styled(Field)`
  width: 328px;
  height: 54px;
  border-radius: ${p => p.theme.radii.sm};
  background-color: ${p => p.theme.colors.mainBg};
  outline: ${p => p.theme.borders.none};
  border: ${p =>
    p.error === 'true' ? p.theme.borders.inputError : p.theme.borders.input};
  padding: 14px ${p => p.theme.space[0]}px 14px ${p => p.theme.space[3]}px;
  margin-bottom: 50px;
  color: ${p => p.theme.colors.primaryTextColor};

  :nth-of-type(3) {
    margin-bottom: 43px;
  }

  :focus-within + ${InputLabel} {
    font-weight: 500;
    font-size: ${p => p.theme.fontSizes.sm};
    line-height: ${p => p.theme.lineHeights.label};
    padding: 2px 4px;
    color: ${p =>
      p.error === 'true' ? p.theme.colors.error : p.theme.colors.formColor};
    transform: translateY(-23px);
  }

  :not(:placeholder-shown) + ${InputLabel} {
    transform: translateY(-23px);
    font-weight: 500;
    font-size: ${p => p.theme.fontSizes.sm};
    line-height: ${p => p.theme.lineHeights.label};
    color: ${p =>
      p.error === 'true' ? p.theme.colors.error : p.theme.colors.formColor};
    padding: 2px 4px;
  }

  @media screen and (min-width: 768px) {
    width: 380px;
  }
`;

export const PositionsFileBlock = styled.div`
  width: 328px;

  @media screen and (min-width: 768px) {
    width: 380px;
  }
`;

export const FileUploadBlock = styled.div`
  position: ${p => p.theme.position.relative};
  display: inline-block;
  width: 100%;
  height: 54px;
  margin-bottom: 50px;
`;

export const FileUploadInput = styled.input`
  position: ${p => p.theme.position.relative};
  z-index: 2;
  width: 100%;
  height: 54px;
  margin: 0;
  opacity: 0;
  cursor: pointer;
`;

export const FileUploadLabel = styled.label`
  position: ${p => p.theme.position.absolute};
  display: flex;
  align-items: center;
  padding-left: 99px;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  height: 54px;
  font-weight: 400;
  color: ${p =>
    p.children === 'Upload your photo'
      ? 'rgba(126, 126, 126, 1)'
      : p.theme.colors.primaryTextColor};
  background-color: rgba(248, 248, 248, 1);
  border: ${p =>
    p.notFit ? p.theme.borders.inputError : p.theme.borders.input};
  border-radius: 4px;

  ::after {
    position: ${p => p.theme.position.absolute};
    box-sizing: border-box;
    top: ${p => (p.notFit ? '-2px' : '-1px')};
    left: -1px;
    z-index: 3;
    display: inline-block;
    font-size: ${p => p.theme.fontSizes.m};
    font-weight: 400;
    cursor: pointer;
    content: 'Upload';
    padding: 14px 15px;
    height: 54px;
    color: ${p => p.theme.colors.primaryTextColor};
    border: ${p => !p.notFit && p.theme.borders.boldInput};
    border-right: ${p => p.notFit && p.theme.borders.inputError};
    border-radius: ${p => p.theme.radii.sm} ${p => p.theme.radii.none}
      ${p => p.theme.radii.none} ${p => p.theme.radii.sm};
    cursor: pointer;
  }
`;

export const NumberExample = styled.p`
  position: ${p => p.theme.position.absolute};
  top: 58px;
  left: 16px;
  font-weight: 400;
  font-size: ${p => p.theme.fontSizes.sm};
`;

export const PositionsBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 400;
  font-size: ${p => p.theme.fontSizes.m};
`;

export const PositionsTitle = styled.p`
  margin-bottom: 11px;
`;

export const ErrorText = styled.p`
  position: ${p => p.theme.position.absolute};
  top: 58px;
  left: 16px;
  font-weight: 400;
  font-size: ${p => p.theme.fontSizes.sm};
  line-height: ${p => p.theme.lineHeights.label};

  color: ${p => p.theme.colors.error};
`;

export const PostErrorText = styled(ErrorText)`
  top: 150%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
`;
