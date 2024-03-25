import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type InputProps = {
  label: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const defaultClasses =
  "block flex-1 border-0 bg-transparent p-2 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6";

const Input: React.FC<InputProps> = ({ label, className = "", ...rest }) => {
  const combinedClasses = `${defaultClasses} ${className}`;

  return (
    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full ">
      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm border-2 border-gray-200 pr-8 font-bold">
        {label}
      </span>
      <input className={combinedClasses} {...rest} />
    </div>
  );
};

export default Input;
