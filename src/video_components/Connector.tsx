import React, { useEffect, useRef } from "react";
import { useCurrentFrame, spring } from "remotion";

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
  const svgRef = useRef<SVGSVGElement>(null);
  const frame = useCurrentFrame();

  useEffect(() => {
    const updateLine = () => {
      const parent = parentRef.current;
      const svgElm = svgRef.current;
      const e1 = document.getElementById(e1Id) as HTMLDivElement;
      const e2 = document.getElementById(e2Id) as HTMLDivElement;
      const path = svgPath.current;
      if (!e1 || !e2 || !path || !parent || !svgElm) return;

      const parentRect = parent.getBoundingClientRect();
      const e1Rect = e1.getBoundingClientRect();
      const e2Rect = e2.getBoundingClientRect();

      const e1Pos = {
        x: e1Rect.left + e1Rect.width / 2 - parentRect.left,
        y: e1Rect.top + e1Rect.height / 2 - parentRect.top,
      };

      const e2Pos = {
        x: e2Rect.left + e2Rect.width / 2 - parentRect.left,
        y: e2Rect.top + e2Rect.height / 2 - parentRect.top,
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
    
      svgElm.setAttribute("viewBox", `0 0 ${parentRect.width} ${parentRect.height}`)
      path.setAttribute(
        "d",
        `M${e1Pos.x},${e1Pos.y} Q${controlPoint.x},${controlPoint.y} ${e2Pos.x},${e2Pos.y}`
      );

      const pathLength = path.getTotalLength();
      const revealPercentage = spring({
        frame,
        durationInFrames: 300,
        fps: 30,
        config: {
          damping: 200,
          stiffness: 150,
          mass: 0.5,
        },
      });

      const trimStart = radius1;
      const trimEnd = pathLength - radius2;

      const startOffset = trimStart + (trimEnd - trimStart) * (1 - revealPercentage);

      path.style.strokeDasharray = `${trimEnd - startOffset} ${pathLength}`;
      path.style.strokeDashoffset = startOffset.toString();
    };

    updateLine();

    window.addEventListener("resize", updateLine);
    return () => {
      window.removeEventListener("resize", updateLine);
    };
  }, [e1Id, e2Id, bentLevel, radius1, radius2, frame, parentRef]);

  return (
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >


      <path
        ref={svgPath}
        fill="none"
        stroke="red"
        strokeWidth="2"
        strokeLinecap="round"
      />
      </svg>
  );
};
