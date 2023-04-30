import {useRef} from 'react'
import React from 'react';
import {AbsoluteFill } from 'remotion';
import { Connector } from './Connector';

export const Connectors: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

	return (
		<AbsoluteFill  ref={ref}>
      <Connector e2="anchor-callee" e1="a3" parentRef={ref} bentLevel={0} radius1={0} radius2={0} />
    </AbsoluteFill>
	);
};