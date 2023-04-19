import autonomousComponent, { AutonomousComponentProps } from '@/video_components/autonomousComponent';
import React from 'react';
import { Img, staticFile} from 'remotion';

type ValueArrowProps = AutonomousComponentProps
const ValueArrowInner: React.FC<ValueArrowProps> = ({frame}) => {

  return (
    <div style={{position: 'relative', left: '0%', top: '0%', width: '100%', height: '100%'}}>
    <Img src={staticFile("assets/Music.svg")} style={{position: 'absolute', left: '30%', top: '30%', width: '15%'}} />
    <Img src={staticFile("assets/Clawn.svg")} style={{position: 'absolute', left: '50%', top: '30%', width: '15%'}} />
    <svg
      viewBox="0 0 200 100"
      style={{position: 'absolute', left: '0%', top: '0%', width: '100%'}}
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
    </div>
  );
};

export const ValueArrow: React.FC = autonomousComponent(ValueArrowInner);