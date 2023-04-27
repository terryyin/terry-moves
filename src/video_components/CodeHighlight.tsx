import { CSSProperties } from "react";
import {Highlight, themes} from 'prism-react-renderer';
import AnimationEffect from "./AnimationEffect";
import { useAnimationContext } from "../hooks/useAnimationContext";
import { HighlightStyle } from "@/models/Subtitles";

export const CodeHighlight: React.FC<{actor: string, codeString: string, style?: CSSProperties}> = ({actor, style, codeString}) => {
  const { highlights, textEdits, showCursor } = useAnimationContext().getCodeTransfomation(actor);

  const edit = (currentText: string): string => {
    const lines = currentText.split('\n');

  textEdits.forEach((edit) => {
    const { line, progress, text } = edit;
    const currentLine = lines[line - 1];

    if (!currentLine) return;

    const partialLength = Math.ceil(text.length * progress);
    const partialText = text.slice(0, partialLength) + (showCursor && partialLength < text.length ? '|' : '');

    if ('match' in edit) {
      const { match } = edit;
      lines[line - 1] = currentLine.replace(match, partialText);
    } else if ('column' in edit) {
      const { column } = edit;
      lines[line - 1] =
        currentLine.slice(0, column) +
        partialText +
        currentLine.slice(column);
    }
  });

  return lines.join('\n');
}

  const lineHighlightStyle = (line: number): HighlightStyle[] => {
    const result: HighlightStyle[] = [];

    highlights.forEach((highlight) => {
      if ('lines' in highlight && highlight.lines.includes(line)) {
        result.push(highlight.style);
      }
    });

    return result;
}

  const tokenHighlightStyle = (token: string): HighlightStyle[] => {
    const result: HighlightStyle[] = [];

    highlights.forEach((highlight) => {
      if ('tokens' in highlight && highlight.tokens.includes(token)) {
        result.push(highlight.style);
      }
    });

    return result;
  }

  const highLightStylesToCSS = (styles: HighlightStyle[]): CSSProperties => {
    return styles.reduce((acc, style) => {
      switch (style) {
        case 'red background':
          return {...acc, background: 'red'};
        case 'wavy underline':
          return {...acc, textDecoration: 'underline wavy red'};
        default:
          return acc;
      }
    }, {} as CSSProperties);
  }

  const currentCode = edit(codeString);
  const lineStyle = (line: number): CSSProperties => highLightStylesToCSS(lineHighlightStyle(line));
  const tokenStyle = (token: string): CSSProperties => highLightStylesToCSS(tokenHighlightStyle(token));
    

  return (
			<AnimationEffect actor={actor} style={{...style}}>
        <Highlight code={currentCode} language="javascript" theme={themes.vsDark}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={{fontSize: "1.25rem", marginTop: 0, ...style}}>
                {tokens.map((line, i) => {
                  const lineProps = getLineProps({ line, key: i });

                  lineProps.style = {
                      ...lineProps.style,
                      ...lineStyle(i + 1),
                    };
                  return <div {...lineProps}>
                    {line.map((token, key) => {
                      const tokenProps = getTokenProps({ token, key });

                      tokenProps.style = {
                        ...tokenProps.style,
                        ...tokenStyle(token.content),
                      };
                      return <span {...tokenProps} />
                    })}
                  </div>;
                })}
              </pre>
            )}
          </Highlight>
      
      </AnimationEffect>
  );
};
