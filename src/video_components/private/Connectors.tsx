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
          return <Connector key={index} e1={connector.action.actor} e2={connector.action.target} parentRef={ref} bentLevel={connector.action.bentLevel} radius1={connector.action.radiusSource ?? 0} radius2={connector.action.radiusTarget ?? 0} />
        })
      }
    </AbsoluteFill>
	);
};
