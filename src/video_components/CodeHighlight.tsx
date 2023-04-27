import { CSSProperties } from "react";
import {Highlight, themes} from 'prism-react-renderer';
import AnimationEffect from "./AnimationEffect";
import { useAnimationContext } from "../hooks/useAnimationContext";

export const CodeHighlight: React.FC<{actor: string, codeString: string, style?: CSSProperties}> = ({actor, style, codeString}) => {
  const { highlightLines } = useAnimationContext().getCodeTransfomation(actor);
  const lineNumberSet = new Set(highlightLines);



  return (
			<AnimationEffect actor={actor} style={{...style}}>
        <Highlight code={codeString} language="javascript" theme={themes.vsDark}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={{fontSize: "1.25rem", ...style}}>
                {tokens.map((line, i) => {
                  const lineProps = getLineProps({ line, key: i });

                  if (lineNumberSet.has(i + 1)) {
                    lineProps.style = {
                      ...lineProps.style,
                      backgroundColor: 'red',
                    };
                  }
                  return <div {...lineProps}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>;
                })}
              </pre>
            )}
          </Highlight>
      
      </AnimationEffect>
  );
};
