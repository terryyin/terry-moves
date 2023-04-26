import { Vector2, Vector3 } from '@react-three/fiber';
export type ActionType = 'type' | 'move' | 'appear' | 'disappear' | 'rotate and rise' | 'ocillate' | 'camera look at' | 'camera zoom in' | '3d rotate' | 'glow' | '3d animation start' | '3d animation reverse' | 'scale';

export interface BaseAction {
  actor: string;
  actionType: ActionType;
  duration: number;
}

export interface ScaleAction extends BaseAction {
  actionType: 'scale';
  outputRange: [number, number];
}

export interface AppearAction extends BaseAction {
  actionType: 'appear' | 'disappear' | 'glow';
}

export interface TextAction extends BaseAction {
  actionType: 'type';
  text: string;
}

export interface AbsolutePositionAction extends BaseAction {
  actionType: 'move' | 'camera look at';
  absolutePosition: number | Vector2 | Vector3;
}

export interface RelativePositionAction extends BaseAction {
  actionType: 'ocillate';
  delta: number | Vector2 | Vector3;
}

export interface OneDimensionalAction extends BaseAction {
  actionType: 'camera zoom in' | 'rotate and rise';
  distance: number;
}

export interface ThreeDRotateAction extends BaseAction {
  actionType: '3d rotate';
  totalRotation: [number, number, number];
}

export type ThreeDAction = TextAction | ThreeDRotateAction | AbsolutePositionAction | OneDimensionalAction;

export interface ThreeDAnimationAction extends BaseAction {
  actionType: '3d animation start' | '3d animation reverse';
  speed: number;
  percentage?: number;
  pauseAtEnd?: boolean;
  freezeBeforeStart?: boolean;
}

export type Action = ScaleAction | AppearAction | ThreeDAction | ThreeDAnimationAction | RelativePositionAction;

export type FlashBack = {
  duration: number;
  from: number;
  speed: number;
};

interface SubtitleBasic {
  leadingBlank: number;
  duration: number;
  text: string | string[];
  scale?: number;
  position?: 'center';
}

export interface SubtitleWithAction extends SubtitleBasic {
  actions: Action[];
}

export interface SubtitleWithFlashBack extends SubtitleBasic {
  flashBack: FlashBack;
}

export type Subtitle = SubtitleBasic | SubtitleWithAction | SubtitleWithFlashBack;