import { ButtonHTMLAttributes } from "react";

function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`mx-auto flex justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white shadow transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 max-sm:px-2 max-sm:py-1 ${className}`}
      {...props}
    />
  );
}

export default Button;
