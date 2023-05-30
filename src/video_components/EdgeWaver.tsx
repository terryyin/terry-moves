import {useCurrentFrame} from 'remotion';
import React from 'react';
import AnimationEffect from './AnimationEffect';

interface EdgeWaverProps {
	actor: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
}

const EdgeWaver: React.FC<EdgeWaverProps> = ({
	actor,
	style,
	children,
}) => {
	const frame = useCurrentFrame();

	const amplitude = 6;
  const frequency = 2;
  const data = Array.from({ length: 100 }, (_, i) => ({
    x: i,
    y: amplitude + amplitude * Math.sin((i * frequency * Math.PI + frame) / 50),
  }));

	const pathD = `${data.map((d) => `${d.x}% ${d.y}%`).join(',')}, 100% 100%, 0% 100%`;

  console.log(pathD);

  return (
    <AnimationEffect actor={actor} style={{...style, overflow: "visible", clipPath: `polygon(${pathD})`}}>
      {children}
    </AnimationEffect>
  );
};

export default EdgeWaver;