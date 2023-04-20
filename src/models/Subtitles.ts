export interface Action {
  objectId: string;
  action: string;
  duration: number;
  outputRange: number[];
}
export interface Subtitle {
  id: string;
  leadingBlank: number;
  duration: number;
  text: string;
  actions?: Action[];
}