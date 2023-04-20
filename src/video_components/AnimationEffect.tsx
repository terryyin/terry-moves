import React from 'react';
import { useAnimationContext } from "../hooks/useAnimationContext";

interface StageProps {
  id: string;
  children: React.ReactNode;
}

const AnimationEffect: React.FC<StageProps> = ({ id, children }) => {
  const animationContextWrapper = useAnimationContext();
  const viewPosition = animationContextWrapper.getScaleOf(id);
  return (
    <div id={id} style={{position: 'absolute', left: `${100 - viewPosition}%`, top:'0%', width: `${viewPosition}%`, height: `${viewPosition}%`}}>
      {children}
    </div>
  );
};

export default AnimationEffect;
