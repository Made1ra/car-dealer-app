import { SelectHTMLAttributes } from "react";

function Select({
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none ${className}`}
      {...props}
    ></select>
  );
}

export default Select;
