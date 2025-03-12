import { useState, useCallback } from "react";

interface DraggableSVGElementProps {
  children: React.ReactNode;
  rotation?: number; // 회전 각도
  className?: string;
}

const DraggableSVGElement = ({
  children,
  rotation = 0,
  className,
}: DraggableSVGElementProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      setStartPos({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    },
    [position]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;

      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y,
      });
    },
    [isDragging, startPos]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    // 원래 위치로 돌아가는 애니메이션
    setPosition({ x: 0, y: 0 });
  }, []);

  const transform = `translate(${position.x} ${position.y}) rotate(${rotation})`;

  return (
    <g
      className={className}
      transform={transform}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        cursor: isDragging ? "grabbing" : "grab",
        transition: isDragging
          ? "none"
          : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      {children}
    </g>
  );
};

export default DraggableSVGElement;
