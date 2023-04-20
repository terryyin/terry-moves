import { useAnimationContext } from "../hooks/useAnimationContext";

export const Subtitles: React.FC = () => {
  const text = useAnimationContext().getCurrentSubtitleText();
  return (
			<div style={{
            position: 'absolute',
            bottom: '0%',
            width: '100%',
            textAlign: 'center',
            fontSize: '28px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
						minHeight: '60px',
          }}>
        <span>{text}</span>
    </div>
  );
};
