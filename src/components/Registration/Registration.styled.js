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

export const FormInput = styled(Field)`
  width: 328px;
  height: 54px;
  border-radius: ${p => p.theme.radii.sm};
  outline: ${p => p.theme.borders.none};
  border: ${p => p.theme.borders.none};
  padding: 14px 0 14px ${p => p.theme.space[3]}px;

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

export const InputLabel = styled.label`
  position: ${p => p.theme.position.relative};
  margin-bottom: 50px;
  :nth-of-type(3) {
    margin-bottom: 43px;
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
  color: rgba(126, 126, 126, 1);
  background-color: rgba(248, 248, 248, 1);
  border: 1px solid rgba(208, 207, 207, 1);
  border-radius: 4px;

  ::after {
    position: ${p => p.theme.position.absolute};
    box-sizing: border-box;
    top: -1px;
    left: 0;
    z-index: 3;
    display: inline-block;
    font-size: ${p => p.theme.fontSizes.m};
    font-weight: 400;
    cursor: pointer;
    content: 'Upload';
    padding: 14px 15px;
    height: 54px;
    border: 1px solid ${p => p.theme.colors.borderColor};
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
