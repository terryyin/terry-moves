import styled from 'styled-components'
import React from 'react';

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
  percentage?: number;
  leftSide?: boolean;
}

const HealthBar: React.FC<HealthBarProps> = ({ percentage, leftSide }) => {
  const HealthBarStyled = styled.div`
    position: absolute;
    top: 0;
    ${leftSide ? 'right': 'left'}: 0;
    height: 100%;
    background-color: #00ff00;
    border-radius: 3px;
    ${percentage === undefined ? `  background-image: repeating-linear-gradient(
      ${leftSide ? '' : '-'}45deg,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7) 10px,
      transparent 10px,
      transparent 20px
    );`: ''}
  `;

  return (
    <HealthBarContainer>
      <BackgroundBar />
      <HealthBarStyled
        style={{ width: `${Math.max(0, Math.min(100, percentage ?? 100))}%` }}
        />
    </HealthBarContainer>
  );
};

export default HealthBar;
