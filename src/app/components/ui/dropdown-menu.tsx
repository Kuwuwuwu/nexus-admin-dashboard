import { type ReactNode } from "react";

type DropdownMenuProps = { children: ReactNode; asChild?: boolean };

type DropdownMenuItemProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  asChild?: boolean;
};

export function DropdownMenu({ children }: DropdownMenuProps) {
  return <div className="relative">{children}</div>;
}

type DropdownMenuTriggerProps = { children: ReactNode; asChild?: boolean };

export function DropdownMenuTrigger({ children }: DropdownMenuTriggerProps) {
  return <>{children}</>;
}

export function DropdownMenuContent({ children, align }: { children: ReactNode; align?: "end" | "start" }) {
  const alignClass = align === "end" ? "right-0" : "left-0";
  return (
    <div className={`absolute z-10 mt-2 rounded-md border bg-white p-1 shadow-lg dark:bg-gray-900 ${alignClass}`}>
      {children}
    </div>
  );
}

export function DropdownMenuItem({ children, onClick, className, asChild }: DropdownMenuItemProps) {
  if (asChild) {
    return <>{children}</>;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full truncate rounded px-2 py-1 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${className || ''}`}
    >
      {children}
    </button>
  );
}

export function DropdownMenuLabel({ children }: DropdownMenuProps) {
  return <div className="px-2 py-1 text-xs uppercase text-gray-500 dark:text-gray-400">{children}</div>;
}

export function DropdownMenuSeparator() {
  return <div className="mx-1 my-1 h-px bg-gray-200 dark:bg-gray-700" />;
}
