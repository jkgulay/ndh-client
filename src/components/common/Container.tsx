import { forwardRef, type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { children, className = "" },
  ref
) {
  return (
    <div ref={ref} className={`mx-auto w-full max-w-[1280px] px-4 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
});
