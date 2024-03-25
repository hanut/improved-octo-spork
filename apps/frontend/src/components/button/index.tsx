import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export type ButtonProps = {} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const defaultClasses =
  "bg-green-600 my-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...rest
}) => {
  const combinedClasses = `${defaultClasses} ${className}`;
  return (
    <button type="submit" className={combinedClasses} {...rest}>
      {children || "Not Set"}
    </button>
  );
};

export default Button;
