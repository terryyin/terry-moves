import React, { useEffect, useRef } from "react";

function approximateQuadraticCurveLength(p0: {x: number, y: number}, p1: {x: number, y: number}, p2: {x: number, y: number}, segments = 10) {
  let length = 0;
  let prevX = p0.x;
  let prevY = p0.y;

  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    const x = (1 - t)**2 * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
    const y = (1 - t)**2 * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;

    const dx = x - prevX;
    const dy = y - prevY;

    length += Math.sqrt(dx * dx + dy * dy);

    prevX = x;
    prevY = y;
  }

  return length;
}

interface ConnectorProps {
  parentRef: React.RefObject<HTMLDivElement>;
  e1: string;
  e2: string;
  bentLevel: number;
  radius1: number;
  radius2: number;
}

export const Connector: React.FC<ConnectorProps> = ({
  parentRef,
  e1: e1Id,
  e2: e2Id,
  bentLevel,
  radius1,
  radius2,
}) => {

  const svgPath = useRef<SVGPathElement>(null);

  useEffect(() => {
    const updateLine = () => {
      const parent = parentRef.current;
      const e1 = document.getElementById(e1Id) as HTMLDivElement;
      const e2 = document.getElementById(e2Id) as HTMLDivElement;
      const path = svgPath.current;
      if (!e1 || !e2 || !path || !parent) return;

      const parentRect = parent.getBoundingClientRect();
      const e1Rect = e1.getBoundingClientRect();
      const e2Rect = e2.getBoundingClientRect();

      const e1Pos = {
        x: e1Rect.left + e1Rect.width / 2,
        y: e1Rect.top + e1Rect.height / 2,
      };

      const e2Pos = {
        x: e2Rect.left + e2Rect.width / 2,
        y: e2Rect.top + e2Rect.height / 2,
      };

      const dx = e2Pos.x - e1Pos.x;
      const dy = e2Pos.y - e1Pos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
    
      const middlePoint = {
        x: (e1Pos.x + e2Pos.x) / 2,
        y: (e1Pos.y + e2Pos.y) / 2,
      };
    
      // Calculate the normalized direction vector
      const dirX = dx / distance;
      const dirY = dy / distance;
    
      // Calculate the perpendicular vector
      const perpX = -dirY;
      const perpY = dirX;
    
      // Calculate the control point using the perpendicular vector and bentLevel
      const controlPoint = {
        x: middlePoint.x + perpX * bentLevel,
        y: middlePoint.y + perpY * bentLevel,
      };
    
      path.setAttribute(
        "d",
        `M${e1Pos.x},${e1Pos.y} Q${controlPoint.x},${controlPoint.y} ${e2Pos.x},${e2Pos.y}`
      );

      const p0 = { x: e1Pos.x, y: e1Pos.y };
      const p1 = { x: controlPoint.x, y: controlPoint.y };
      const p2 = { x: e2Pos.x, y: e2Pos.y };
    
      // Approximate the path length
      const pathLength = approximateQuadraticCurveLength(p0, p1, p2);


      const trimStart = radius1;
      const trimEnd = pathLength - radius2;

      const startOffset = trimStart + (trimEnd - trimStart) * (1 - 1);

      // Path.style.strokeDasharray = `${trimEnd - startOffset} ${pathLength}`;
      path.style.strokeDashoffset = startOffset.toString();
    };

    updateLine();

    window.addEventListener("resize", updateLine);
    return () => {
      window.removeEventListener("resize", updateLine);
    };
  }, [e1Id, e2Id, bentLevel, radius1, radius2, parentRef]);

  return (

      <path
        ref={svgPath}
        fill="none"
        stroke="#88a"
        strokeWidth="2"
        strokeDasharray="5"
        strokeLinecap="round"
        markerEnd="url(#arrowhead)"
        style={{
          animation: 'dash 1.5s linear infinite',
        }}
      />

  );
};
