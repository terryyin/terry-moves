import { CSSProperties } from "react";
import AnimationEffect from "./AnimationEffect";
import MarkdownIt from 'markdown-it';

export const Markdown: React.FC<{actor: string, md: string, style?: CSSProperties}> = ({actor, md, style}) => {
  return (
			<AnimationEffect actor={actor} style={{color: "white", ...style}}>
        <span style={{
          display: 'block',
      }}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{__html: new MarkdownIt().render(md)}}
      />
	
      </AnimationEffect>
  );
};
