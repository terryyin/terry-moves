import { CSSProperties } from "react";
import { useAnimationContext } from "../hooks/useAnimationContext";
import AnimationEffect from "./AnimationEffect";

export const TypingText: React.FC<{actor: string, style?: CSSProperties}> = ({actor, style}) => {
  const { progress } = useAnimationContext().getTextReveal(actor);

  return (
			<AnimationEffect actor={actor} style={{...style}}>
        {progress}
      </AnimationEffect>
  );
};
