import { type ReactNode } from "react";
import Image from 'next/image';

type AvatarProps = {
  children: ReactNode;
  className?: string;
};

export function Avatar({ children, className = "" }: AvatarProps) {
  return <div className={`inline-flex items-center justify-center overflow-hidden rounded-full ${className}`.trim()}>{children}</div>;
}

export function AvatarImage({ src, alt }: { src: string; alt?: string }) {
  return <Image className="h-full w-full object-cover" src={src} alt={alt ?? "Avatar"} width={100} height={100} />;
}

export function AvatarFallback({ children }: { children: ReactNode }) {
  return <span className="flex h-full w-full items-center justify-center bg-gray-200 text-xs text-gray-700 dark:bg-gray-700 dark:text-white">{children}</span>;
}
