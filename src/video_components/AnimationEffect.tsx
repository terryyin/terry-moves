import React, { CSSProperties } from 'react';
import { useAnimationContext } from "../hooks/useAnimationContext";

interface StageProps {
  actor: string;
  children: React.ReactNode;
  style?: CSSProperties;
}

const AnimationEffect: React.FC<StageProps> = ({ actor, style, children }) => {
  const animationContextWrapper = useAnimationContext();
  const threeDObjectState = animationContextWrapper.get3DObjectStateOf(actor);
  const effectStyle: CSSProperties = threeDObjectState.toStyle();
  const shadowEffectStyle: CSSProperties | undefined = threeDObjectState.toShadowStyle();

  return (
    <>
    <div id={actor} style={{position: 'absolute', width: '100%', height:'100%',  ...(style || {}), ...effectStyle}}>
      {children}
    </div>
    { shadowEffectStyle && <div style={{ position: 'absolute', width: '100%', height: '100%', ...(style || {}),  ...shadowEffectStyle}} >
      {children}
      </div> }
    </>
  );
};

export default AnimationEffect;
