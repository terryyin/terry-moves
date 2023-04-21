import React, { CSSProperties } from 'react';
import { useAnimationContext } from "../hooks/useAnimationContext";

interface StageProps {
  actor: string;
  children: React.ReactNode;
}

const AnimationEffect: React.FC<StageProps> = ({ actor, children }) => {
  const animationContextWrapper = useAnimationContext();
  const effectStyle: CSSProperties = animationContextWrapper.getStyleOf(actor);
  const shadowEffectStyle: CSSProperties | undefined = animationContextWrapper.getShadowStyleOf(actor);

  return (
    <>
    <div id={actor} style={{position: 'absolute', width: '100%', height:'100%', ...effectStyle}}>
      {children}
    </div>
    { shadowEffectStyle && <div style={{position: 'absolute', width: '100%', height: '100%', ...shadowEffectStyle}} >
      {children}
      </div> }
    </>
  );
};

export default AnimationEffect;
