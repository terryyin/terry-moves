import React from 'react';

interface StageProps {
  children: React.ReactNode;
  viewPosition: number;
}

const Stage: React.FC<StageProps> = ({ children, viewPosition }) => {
  return (
    <div style={{position: 'relative', left: `${100 - viewPosition}%`, top:'0%', width: `${viewPosition}%`, height: `${viewPosition}%`}}>
      {children}
    </div>
  );
};

export default Stage;
