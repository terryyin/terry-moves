export type ActionType = 'scaleToUpperRight' | 'appear' | 'disappear' | '3d rise' | '3d rotate';

export interface BaseAction {
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

export interface ThreeDAction extends BaseAction {
  action: '3d rise' | '3d rotate';
}

export type Action = ScaleToUpperRightAction | AppearAction | ThreeDAction;

export interface Subtitle {
  id: string;
  leadingBlank: number;
  duration: number;
  text: string;
  actions?: Action[];
}