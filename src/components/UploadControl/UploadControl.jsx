const UploadControl = ({
  children,
  value,
  onChange,
  disabled,
  accept,
  ...props
}) => {
  return (
    <label htmlFor="file">
      <input
        value={value}
        accept={accept}
        disabled={disabled}
        style={{ display: 'none' }}
        id="file"
        type="file"
        name="file"
        onChange={disabled ? () => {} : onChange}
        {...props}
      />
      {children}
    </label>
  );
};

export default UploadControl;
