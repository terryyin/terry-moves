import {useRef} from 'react'
import React from 'react';
import {AbsoluteFill } from 'remotion';
import { Connector } from './Connector';
import { useAnimationContext } from '../../hooks/useAnimationContext';

export const Connectors: React.FC = () => {
  const { connectors } = useAnimationContext().getConnectors();
  const ref = useRef<HTMLDivElement>(null);

	return (
		<AbsoluteFill  ref={ref}>
      {
        connectors.map((connector, index) => {
          return <Connector key={index} e1={connector.source} e2={connector.target} parentRef={ref} bentLevel={0} radius1={0} radius2={0} />
        })
      }
    </AbsoluteFill>
	);
};
