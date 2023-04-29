import { booleanParametersSutitles } from './StoryBooleanParameters';
import { Subtitle } from "./models/Subtitles";

function formatSubtitlesToSRT(subtitles: Subtitle[]): string {
  let output = "";
  let currentTime = 0;

  subtitles.forEach((subtitle, index) => {
    currentTime += subtitle.leadingBlank; // Add leading blank to current time

    const startTime = formatTime(currentTime);
    currentTime += subtitle.duration; // Add duration to current time
    const endTime = formatTime(currentTime);

    const text = Array.isArray(subtitle.text) ? subtitle.text.join('\n') : subtitle.text;

    output += `${index + 1}\n${startTime} --> ${endTime}\n${text}\n\n`;
  });

  return output;
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;
  const millis = Math.floor((seconds % 1) * 1000);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${Math.floor(seconds).toString().padStart(2, '0')},${millis.toString().padStart(3, '0')}`;
}


const srtContent = formatSubtitlesToSRT(booleanParametersSutitles)
process.stdout.write(srtContent);



