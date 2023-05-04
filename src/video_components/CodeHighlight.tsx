import styled from 'styled-components'
import React, { CSSProperties } from "react";
import {Highlight, themes} from 'prism-react-renderer';
import AnimationEffect from "./AnimationEffect";
import { useAnimationContext } from "../hooks/useAnimationContext";
import { HighlightStyle } from "../models/Subtitles";
import { TextEdit } from "../models/CodeActioner";

const InsertCursor = styled.span`
  display: inline-block;
  width: 0;
  height: 0.9em;
  background-color: blue; /* Set cursor color */
  border: none;
  border-right: 2px solid white; /* Set cursor width and color */
`;

const BlockedCursor = styled.span`
display: inline-block;
filter: invert(1);
width: 1ch; /* Set the width to one character */
height: 1em;
background-color: black; /* This will be overridden by the inline style */
border-right: none; /* Remove the border */
`;

type CurrentEdit = { text: string, cursorLine: number, cursorColumn: number, cursor?: boolean, insertCursor?: boolean };

export const CodeHighlight: React.FC<{actor: string, codeString: string, language?: string, style?: CSSProperties, children?: React.ReactNode}> = ({actor, language, style, codeString, children}) => {
  const { highlights, textEdits } = useAnimationContext().getCodeTransfomation(actor);

  const singleEdit =(edit: TextEdit, original: string): CurrentEdit => {
    const lines = original === '' ? [] : original.split('\n');
    const { line, progress, cursor, insertCursor } = edit;
    let cursorLine = line;
    let cursorColumn = 0;

   if ('count' in edit) {
      const { count, } = edit;
      lines.splice(line - 1, Math.ceil(count * progress));
    }
    else {
      const { text } = edit;
      const partialLength = Math.ceil(text.length * progress);
      const partialText = text.slice(0, partialLength);
      cursorLine += partialText.split('\n').length - 1;
      cursorColumn = partialText.length - partialText.lastIndexOf('\n') - 1;

      if (line >= lines.length) {
        lines.push(partialText);
      }
      else {
        const currentLine = lines[line - 1];

        if ('match' in edit) {
          const { match } = edit;
          lines[line - 1] = currentLine.replace(match ?? /.*/, partialText);
        } else if ('column' in edit) {
          const { column } = edit;
          lines[line - 1] =
            currentLine.slice(0, column) +
            partialText +
            currentLine.slice(column);
          if(partialText.indexOf("\n") === -1) {
            cursorColumn += column;
          }
        }  
      }
    }
    return { text: lines.join('\n'), cursorLine, cursorColumn, cursor, insertCursor};
  };

  const edit = (currentText: string): CurrentEdit => {
    return textEdits.reduce((prev, e) => singleEdit(e, prev.text), {text: currentText, cursorLine: 1, cursorColumn: 0});
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
          return {...acc, background: 'rgba(0, 0, 0, 0.8)', filter: 'invert(1)'};
        case 'wavy underline':
          return {...acc, textDecoration: 'underline wavy red'};
        default:
          return acc;
      }
    }, {} as CSSProperties);
  }

  const { text: currentCode, cursorLine, cursorColumn, cursor, insertCursor } = edit(codeString);
  const lineStyle = (line: number): CSSProperties => highLightStylesToCSS(lineHighlightStyle(line));
  const tokenStyle = (token: string): CSSProperties => highLightStylesToCSS(tokenHighlightStyle(token));
    

  return (
			<AnimationEffect actor={actor} style={{...style}}>
        {children}
        <Highlight code={currentCode} language={language || "javascript"} theme={themes.vsDark}>
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


                      if (cursor && i === cursorLine - 1) {
                        const contentBeforeCursor = line.slice(0, key).map((t) => t.content).join('');
                        const contentWithCursor = contentBeforeCursor + token.content;

                        if (
                          (contentBeforeCursor.length <= cursorColumn && contentWithCursor.length >= cursorColumn) || cursorColumn === 0
                        ) {
                          const beforeCursor = token.content.slice(0, cursorColumn - contentBeforeCursor.length);
                          const afterCursor = token.content.slice(cursorColumn - contentBeforeCursor.length);
      
                          return (
                            <>
                              <span {...tokenProps} style={{ ...tokenProps.style }}>{insertCursor ? beforeCursor : beforeCursor.slice(0, beforeCursor.length - 1)}</span>
                              {insertCursor ? (<InsertCursor />) : (
                              <BlockedCursor style={{ color: tokenProps.style.backgroundColor, backgroundColor: tokenProps.style.color }} >{beforeCursor.at(beforeCursor.length -1) || ' '}</BlockedCursor>
                              )}
                              <span {...tokenProps} style={{ ...tokenProps.style }}>{afterCursor}</span>
                            </>
                          );
                        }
                      }

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
