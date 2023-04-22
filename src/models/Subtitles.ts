export type ActionType = 'scaleToUpperRight' | 'appear' | 'disappear' | '3d rise' | '3d watched going up' | '3d rotate' | 'glow' | '3d animation start';

export interface BaseAction {
  actor: string;
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

interface ThreeDRiseAction extends BaseAction {
  actionType: '3d rise';
}

interface ThreeDWatchedGoingUpAction extends BaseAction {
  actionType: '3d watched going up';
  unit: number;
}

export interface ThreeDRotateAction extends BaseAction {
  actionType: '3d rotate';
  totalRotation: number;
}

export type ThreeDAction = ThreeDRiseAction | ThreeDRotateAction | ThreeDWatchedGoingUpAction;

interface ThreeDAnimationAction extends BaseAction {
  actionType: '3d animation start';
  speed: number;
}

export type Action = ScaleToUpperRightAction | AppearAction | ThreeDAction | ThreeDAnimationAction;

export interface Subtitle {
  leadingBlank: number;
  duration: number;
  text: string;
  actions?: Action[];
}