export type ActionType = 'scaleToUpperRight' | 'appear' | 'disappear' | '3d rise' | '3d rotate' | 'glow';

export interface BaseAction {
  objectId: string;
  actionType: ActionType;
  duration: number;
}

export interface ScaleToUpperRightAction extends BaseAction {
  actionType: 'scaleToUpperRight';
  outputRange: number[];
}

export interface AppearAction extends BaseAction {
  actionType: 'appear' | 'disappear' | 'glow';
}

export interface ThreeDAction extends BaseAction {
  actionType: '3d rise' | '3d rotate';
}

export type Action = ScaleToUpperRightAction | AppearAction | ThreeDAction;

export interface Subtitle {
  leadingBlank: number;
  duration: number;
  text: string;
  actions?: Action[];
}