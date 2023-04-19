import { CurrentSubtitle } from "@/models/CurrentSubtitle";

interface SubtitlesProps {
  currentSubtitle: CurrentSubtitle;
}

export const Subtitles: React.FC<SubtitlesProps> = ({ currentSubtitle }) => {
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
        <span>{currentSubtitle?.text}</span>
      )}
    </div>
  );
};
