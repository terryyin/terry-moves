import { CSSProperties } from "react";
import AnimationEffect from "./AnimationEffect";
import MarkdownIt from 'markdown-it';

export const Markdown: React.FC<{actor: string, md: string, style?: CSSProperties}> = ({actor, md, style}) => {
  return (
			<AnimationEffect actor={actor} style={{...style}}>
        <span style={{
          display: 'block',
        fontSize: '30px',
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Roboto, sans-serif',
      }}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{__html: new MarkdownIt().render(md)}}
      />
	
      </AnimationEffect>
  );
};
