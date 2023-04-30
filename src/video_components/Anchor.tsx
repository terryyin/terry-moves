import React, { CSSProperties } from "react";
import AnimationEffect from "./AnimationEffect";

export const Anchor: React.FC<{actor: string, style?: CSSProperties}> = ({actor, style}) => {
  return (
			<AnimationEffect actor={actor} style={{width: "15px", height: "15px", backgroundColor: "green", ...style}}>
        ("anchor")
      </AnimationEffect>
  );
};
