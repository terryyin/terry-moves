import { CSSProperties } from "react";
import { useAnimationContext } from "../hooks/useAnimationContext";
import AnimationEffect from "./AnimationEffect";

export const TypingText: React.FC<{actor: string, text: string, style?: CSSProperties}> = ({actor, style, text}) => {
  const { progress } = useAnimationContext().getTextReveal(actor);
  const textPart = text.substring(0, Math.floor(text.length * progress));

  return (
			<AnimationEffect actor={actor} style={{...style}}>
        {textPart}
      </AnimationEffect>
  );
};
