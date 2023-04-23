import { useAnimationContext } from "../hooks/useAnimationContext";

export const Subtitles: React.FC<{scale?: number}> = ({scale}) => {
  const { subtitle, text} = useAnimationContext().getCurrentSubtitleText();
  const basicSize = 28;
  const size = basicSize * (scale ?? 1) * (subtitle.scale ?? 1);
  const textArray = Array.isArray(text) ? text : [text];

  return (
			<div style={{
            position: 'absolute',
            bottom: '0%',
            width: '100%',
            textAlign: 'center',
            fontSize: `${size}px`,
            fontFamily: 'Arial, sans-serif',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
						minHeight: `${size * 2}px`
          }}>
        {textArray.map((item, index) => (
        <span key={index} style={{display: 'block'}}>{item}</span>
      ))}
    </div>
  );
};
