import {useEffect} from 'react'
import {useRef} from 'react'
import React from 'react';
import {AbsoluteFill } from 'remotion';
import { Connector } from './Connector';
import { useAnimationContext } from '../../hooks/useAnimationContext';

export const Connectors: React.FC = () => {
  const { connectors } = useAnimationContext().getConnectors();
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const updateLine = () => {
      const parent = ref.current;
      const svgElm = svgRef.current;
      if (!parent || !svgElm) return;

      const parentRect = parent.getBoundingClientRect();

      svgElm.setAttribute("viewBox", `${parentRect.left} ${parentRect.top} ${parentRect.width} ${parentRect.height}`)

    };

    updateLine();

    window.addEventListener("resize", updateLine);
    return () => {
      window.removeEventListener("resize", updateLine);
    };
  }, [ref, svgRef]);


	return (
		<AbsoluteFill  ref={ref}>
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
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
            <polygon points="0 0, 5 3.5, 0 7" fill="#88a"/>
          </marker>
        </defs>
        {
          connectors.map((connector, index) => {
            return <Connector key={index} connector={connector} />
          })
        }
      </svg>
    </AbsoluteFill>
	);
};
