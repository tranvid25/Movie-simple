import React from 'react';

const Button = ({
  onClick,
  className = "",
  children,
  type = "button",
  bgColor = "primary"
}) => {
  let bgClassName = "";

  switch (bgColor) {
    case "primary":
      bgClassName = "bg-primary";
      break;
    case "secondary":
      bgClassName = "bg-secondary";
      break;
    default:
      bgClassName = "bg-primary"; // fallback
      break;
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full px-6 py-3 mt-auto capitalize rounded-lg text-white ${bgClassName} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
