import { forwardRef, ReactNode } from "react";

interface ConfettiLayoutProps {
  children: ReactNode;
  className?: string;
}

const ConfettiLayout = forwardRef<SVGSVGElement, ConfettiLayoutProps>(
  ({ children, className }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 1000 1000" // viewBox 크기는 실제 디자인에 맞게 조정
        className={className}
        preserveAspectRatio="xMidYMid meet"
      >
        {children}
      </svg>
    );
  }
);

export default ConfettiLayout;
