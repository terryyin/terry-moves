export type ActionType = 'scaleToUpperRight' | 'appear' | 'disappear' | '3d rise' | '3d going up' | '3d camera up' | '3d rotate' | 'glow' | '3d animation start';

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

interface ThreeDGoingUpAction extends BaseAction {
  actionType: '3d going up';
  unit: number;
}

interface ThreeDCameraUpAction extends BaseAction {
  actionType: '3d camera up';
  unit: number;
}

export interface ThreeDRotateAction extends BaseAction {
  actionType: '3d rotate';
  totalRotation: number;
}

export type ThreeDAction = ThreeDRiseAction | ThreeDRotateAction | ThreeDGoingUpAction | ThreeDCameraUpAction;

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