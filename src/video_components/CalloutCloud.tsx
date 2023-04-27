import React from 'react';
import styled from 'styled-components';
import AnimationEffect from "./AnimationEffect";

const Cloud = styled.div`
  display: inline-flex;
  padding: 16px;
  background-color: white;
  border-radius: 24px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  z-index: 1000;
`;

const CalloutCloudWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
`;

interface CalloutCloudProps {
  actor: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  tailShift: number;
  tailHeightPx?: number;
}

export const CalloutCloud: React.FC<CalloutCloudProps> = ({ actor, style, tailShift, tailHeightPx, children }) => {
  const Tail = styled.div`
    position: relative;
    width: 16px;
    height: ${tailHeightPx ?? 16}px;
    background-color: white;
    clip-path: polygon(0% 0%, ${ tailShift < 0 ? "0% 100%, 100% 0%" : "100% 0%, 100% 100%"});
    margin-left: ${tailShift}%;
    box-shadow: 3px -3px 6px rgba(0, 0, 0, 0.16), 3px -3px 6px rgba(0, 0, 0, 0.23);
    z-index: 1000;
  `;

  return (
    <AnimationEffect actor={actor} style={style}>
      <CalloutCloudWrapper>
        <Cloud>{children}</Cloud>
        <Tail />
      </CalloutCloudWrapper>
    </AnimationEffect>
  );
};
