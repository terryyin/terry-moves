export interface Subtitle {
  id: string;
  leadingBlank?: number;
  duration?: number;
  startTime: number;
  endTime: number;
  text: string;
}