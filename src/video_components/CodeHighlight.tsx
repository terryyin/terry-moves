import { CSSProperties } from "react";
import { useAnimationContext } from "../hooks/useAnimationContext";
import AnimationEffect from "./AnimationEffect";

export const TypingText: React.FC<{actor: string, text: string, style?: CSSProperties}> = ({actor, style, text}) => {
  const { progress, cursorShow } = useAnimationContext().getTextReveal(actor);
  const wholeTextPart = text.substring(0, Math.floor(text.length * progress));
  const escaped = progress > 1.12;
  const cursor = escaped ? text[text.length - 1] : '|';
  const textPart = escaped ? text.substring(0, text.length - 1) : wholeTextPart;
  const cursorStyle = escaped ? (cursorShow ? {filter: 'invert(1)', backgroundColor: "#888"} : {}) : {opacity: cursorShow ? 1 : 0};

  return (
			<AnimationEffect actor={actor} style={{...style}}>
        {textPart}
        <span style={{...cursorStyle}}>{cursor}</span>
      </AnimationEffect>
  );
};
