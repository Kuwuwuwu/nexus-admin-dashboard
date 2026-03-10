import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "default";
  size?: "icon" | "default";
}

const variantClasses: Record<string, string> = {
  ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
  default: "bg-blue-600 text-white hover:bg-blue-700",
};

const sizeClasses: Record<string, string> = {
  icon: "h-8 w-8 p-0 inline-flex items-center justify-center",
  default: "h-10 px-4",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={`rounded-md font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
      {...props}
    />
  )
);

Button.displayName = "Button";
