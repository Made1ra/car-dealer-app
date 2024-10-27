import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string | undefined;
}

export default function Select({ className, ...props }: SelectProps) {
  return (
    <select
      className={`rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none ${className}`}
      {...props}
    ></select>
  );
}
