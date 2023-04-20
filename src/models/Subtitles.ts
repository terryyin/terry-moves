export type ActionType = 'scaleToUpperRight' | 'appear' | 'disappear' | '3d rise' | '3d rotate';

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

export interface OtherAction extends BaseAction {
  action: '3d rise' | '3d rotate';
}

export type Action = ScaleToUpperRightAction | AppearAction | OtherAction;

export interface Subtitle {
  id: string;
  leadingBlank: number;
  duration: number;
  text: string;
  actions?: Action[];
}