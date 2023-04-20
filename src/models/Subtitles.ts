type ActionType = 'scaleToUpperRight' | 'appear';

export interface Action {
  objectId: string;
  action: ActionType;
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