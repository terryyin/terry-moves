import React, { CSSProperties } from 'react';
import { useAnimationContext } from "../hooks/useAnimationContext";

interface StageProps {
  id: string;
  children: React.ReactNode;
}

const AnimationEffect: React.FC<StageProps> = ({ id, children }) => {
  const animationContextWrapper = useAnimationContext();
  const effectStyle: CSSProperties = animationContextWrapper.getStyleOf(id);
  const shadowEffectStyle: CSSProperties | undefined = animationContextWrapper.getShadowStyleOf(id);

  return (
    <>
    <div id={id} style={{position: 'absolute', width: '100%', height:'100%', ...effectStyle}}>
      {children}
    </div>
    { shadowEffectStyle && <div style={{position: 'absolute', width: '100%', height: '100%', ...shadowEffectStyle}} >
      {children}
      </div> }
    </>
  );
};

export default AnimationEffect;
