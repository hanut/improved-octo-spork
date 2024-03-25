import { DetailedHTMLProps, HTMLAttributes } from "react";

export type PageTitleProps = {} & DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

const defaultClasses = "text-xl font-bold text-white p-4";

const PageTitle: React.FC<PageTitleProps> = ({ children, className = "" }) => {
  return <h2 className={`${defaultClasses} ${className}`}>{children}</h2>;
};

export default PageTitle;
