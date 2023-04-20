export type ActionType = 'scaleToUpperRight' | 'appear' | 'disappear';

interface BaseAction {
  objectId: string;
  action: ActionType;
  duration: number;
}

export interface ScaleToUpperRightAction extends BaseAction {
  action: 'scaleToUpperRight';
  outputRange: number[];
}

export interface AppearAction extends BaseAction {
  action: 'appear' | 'disappear';
}

export type Action = ScaleToUpperRightAction | AppearAction;

export interface Subtitle {
  id: string;
  leadingBlank: number;
  duration: number;
  text: string;
  actions?: Action[];
}