import { forwardRef } from 'react';

const Button = forwardRef(
  ({ type = 'button', disabled = false, children, ...props }, ref) => {
    return (
      <button type={type} disabled={disabled} {...props} ref={ref}>
        {children}
      </button>
    );
  }
);

export default Button;
