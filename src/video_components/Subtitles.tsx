import { useCurrentSubtitle1 } from "@/hooks/useCurrentSubtitle";
import { AnimationContext, CurrentSubtitle1 } from "@/models/AnimationContext";

interface SubtitlesProps {
  animationContext: AnimationContext;
}

export const Subtitles: React.FC<SubtitlesProps> = ({ animationContext }) => {
  const t: CurrentSubtitle1 = useCurrentSubtitle1(animationContext.allSubtitles, animationContext.globalFrame, animationContext.globalFps);
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
      {animationContext && (
        <span>{t.text}</span>
      )}
    </div>
  );
};
