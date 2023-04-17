// CurvedArrow.tsx
import React from 'react';
import { useCurrentFrame} from 'remotion';

export const ValueArrow: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <svg
      viewBox="0 0 200 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
            <defs>
            <marker
          id="arrowhead"
          markerWidth="5"
          markerHeight="7"
          refX="4"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 5 3.5, 0 7" fill="#000" />
        </marker>
      </defs>
      <path
        d="M10 80 Q100 50 190 80"
        stroke="#000"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="10"
        strokeDashoffset={100 - frame }
        fill="transparent"
        markerEnd="url(#arrowhead)"
        style={{
          animation: 'dash 1.5s linear infinite',
        }}
      />
    </svg>
  );
};
