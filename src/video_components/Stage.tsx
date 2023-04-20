import React from 'react';

interface StageProps {
  id?: string;
  children: React.ReactNode;
  viewPosition: number;
}

const Stage: React.FC<StageProps> = ({ id, children, viewPosition }) => {
  return (
    <div id={id} style={{position: 'absolute', left: `${100 - viewPosition}%`, top:'0%', width: `${viewPosition}%`, height: `${viewPosition}%`}}>
      {children}
    </div>
  );
};

export default Stage;
