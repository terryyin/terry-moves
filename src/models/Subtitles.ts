export type ActionType = 'scaleToUpperRight' | 'appear' | 'disappear' | '3d rise' | '3d ocillating' | '3d going up' | '3d camera up' | '3d camera closer' | '3d rotate' | 'glow' | '3d animation start' | '3d animation reverse';

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

export interface ThreeDUnitAction extends BaseAction {
  actionType: '3d going up' | '3d camera up' | '3d camera closer' | '3d ocillating';
  unit: number;
}

export interface ThreeDRotateAction extends BaseAction {
  actionType: '3d rotate';
  totalRotation: number;
}

export type ThreeDAction = ThreeDRiseAction | ThreeDRotateAction | ThreeDUnitAction;

export interface ThreeDAnimationAction extends BaseAction {
  actionType: '3d animation start' | '3d animation reverse';
  speed: number;
  percentage?: number;
  pauseAtEnd?: boolean;
}

export type Action = ScaleToUpperRightAction | AppearAction | ThreeDAction | ThreeDAnimationAction;

export interface Subtitle {
  leadingBlank: number;
  duration: number;
  text: string;
  actions?: Action[];
}