import { type HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

export const CardHeader = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`p-6 pb-0 ${className}`} {...props}>
      {children}
    </div>
  )
);

export const CardContent = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  )
);

export const CardFooter = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
);

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";
