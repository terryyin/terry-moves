import { useCurrentSubtitle1 } from "@/hooks/useCurrentSubtitle";
import { CurrentSubtitle, CurrentSubtitle1 } from "@/models/CurrentSubtitle";

interface SubtitlesProps {
  currentSubtitle: CurrentSubtitle;
}

export const Subtitles: React.FC<SubtitlesProps> = ({ currentSubtitle }) => {
  const t: CurrentSubtitle1 = useCurrentSubtitle1(currentSubtitle.allSubtitles, currentSubtitle.globalFrame, currentSubtitle.globalFps);
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
      {currentSubtitle && (
        <span>{t.text}</span>
      )}
    </div>
  );
};
