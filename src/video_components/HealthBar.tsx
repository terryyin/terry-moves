import styled from 'styled-components'
import React from 'react';
import AnimationEffect from "./AnimationEffect";
import { useAnimationContext } from '../hooks/useAnimationContext';

const HealthBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 2px solid #000;
  border-radius: 5px;
`;

const BackgroundBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #8b0000;
  border-radius: 3px;
`;

interface HealthBarProps {
  actor: string;
  leftSide?: boolean;
  style?: React.CSSProperties;
}

const HealthBar: React.FC<HealthBarProps> = ({ actor, leftSide, style }) => {
  const {position} = useAnimationContext().get3DGroupAttributes(actor);
  const hackedProgress = position.z;

  const HealthBarStyled = styled.div`
    position: absolute;
    top: 0;
    ${leftSide ? 'right': 'left'}: 0;
    height: 100%;
    background-color: #00ff00;
    border-radius: 3px;
    ${hackedProgress === 0 ? `  background-image: repeating-linear-gradient(
      ${leftSide ? '' : '-'}45deg,
      rgba(255, 0, 0, 0.7),
      rgba(255, 255, 255, 0.7) 10px,
      transparent 10px,
      transparent 20px
    );`: ''}
  `;

  return (
    <AnimationEffect actor={actor} style={style}>
      <HealthBarContainer>
        <BackgroundBar />
        <HealthBarStyled
          style={{ width: `${Math.max(0, Math.min(100, hackedProgress ===0 ? 100 : hackedProgress))}%` }}
          />
      </HealthBarContainer>
    </AnimationEffect>
  );
};

export default HealthBar;
