import React from 'react';
import { Img, staticFile} from 'remotion';
import autonomousComponent, { AutonomousComponentProps } from '../video_components/hoc/autonomousComponent';

const MoneyArrowInner: React.FC<AutonomousComponentProps> = ({frame}) => {

  return (
    <div style={{position: 'relative', left: '0%', top: '0%', width: '100%', height: '100%'}}>
    <Img src={staticFile("assets/Money.svg")} style={{position: 'absolute', left: '45%', top: '63%', width: '10%'}} />
    <Img src={staticFile("assets/Money.svg")} style={{position: 'absolute', left: '60%', top: '60%', width: '10%'}} />
    <Img src={staticFile("assets/Money.svg")} style={{position: 'absolute', left: '70%', top: '56%', width: '10%'}} />
    <svg
      style={{position: 'absolute', left: '0%', top: '0%', width: '100%'}}
      viewBox="0 0 300 130"
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
        d="M310 60 Q220 120 10 100"
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

export const MoneyArrow: React.FC = autonomousComponent(MoneyArrowInner);