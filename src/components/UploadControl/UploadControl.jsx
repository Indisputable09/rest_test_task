import Positions from 'components/Positions';
import {
  ErrorText,
  FileUploadBlock,
  FileUploadInput,
  FileUploadLabel,
  PositionsBlock,
  PositionsFileBlock,
  PositionsTitle,
} from 'components/Registration/Registration.styled';

const UploadControl = ({
  handleChange,
  handleFileChange,
  fileValue,
  notFit,
  presentFile,
  fileUploadErrorText,
}) => {
  return (
    <PositionsFileBlock>
      <PositionsBlock>
        <PositionsTitle>Select your position</PositionsTitle>
        <Positions handleChange={handleChange} />
      </PositionsBlock>
      <FileUploadBlock>
        <FileUploadInput
          type="file"
          name="file"
          id="file"
          onChange={e => {
            handleChange(e);
            handleFileChange(e);
          }}
          value={fileValue}
          accept="image/jpeg"
          required
        />
        <FileUploadLabel htmlFor="file" notFit={notFit}>
          {presentFile ? presentFile.name : 'Upload your photo'}
        </FileUploadLabel>
        {fileUploadErrorText === '' ? null : (
          <ErrorText>{fileUploadErrorText}</ErrorText>
        )}
      </FileUploadBlock>
    </PositionsFileBlock>
  );
};

export default UploadControl;
