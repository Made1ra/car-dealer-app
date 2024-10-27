import { LabelHTMLAttributes } from "react";

interface SelectProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string | undefined;
}

export default function Select({ className, ...props }: SelectProps) {
  return <label className={`text-gray-500 ${className}`} {...props}></label>;
}
