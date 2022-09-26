const Button = ({ type = 'button', disabled = false, children, ...props }) => {
  return (
    <button type={type} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
