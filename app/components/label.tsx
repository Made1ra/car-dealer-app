import { LabelHTMLAttributes } from "react";

function Select({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={`text-gray-500 ${className}`} {...props}></label>;
}

export default Select;
