import { Vector2, Vector3 } from '@react-three/fiber';
export type ActionType = 'move' | 'appear' | 'disappear' | '3d rise' | '3d ocillating' | '3d move' | '3d camera move' | '3d camera closer' | '3d rotate' | 'glow' | '3d animation start' | '3d animation reverse' | 'scale';

export interface BaseAction {
  actor: string;
  actionType: ActionType;
  duration: number;
}

export interface ScaleAction extends BaseAction {
  actionType: 'scale';
  outputRange: number[];
}

export interface AppearAction extends BaseAction {
  actionType: 'appear' | 'disappear' | 'glow';
}

interface ThreeDRiseAction extends BaseAction {
  actionType: '3d rise';
}

export interface ThreeDUnitAction extends BaseAction {
  actionType: 'move' | '3d move' | '3d camera move' | '3d ocillating';
  distances: number | Vector2 | Vector3;
}

export interface OneDimensionalAction extends BaseAction {
  actionType: '3d camera closer';
  distance: number;
}

export interface ThreeDRotateAction extends BaseAction {
  actionType: '3d rotate';
  totalRotation: number;
}

export type ThreeDAction = ThreeDRiseAction | ThreeDRotateAction | ThreeDUnitAction | OneDimensionalAction;

export interface ThreeDAnimationAction extends BaseAction {
  actionType: '3d animation start' | '3d animation reverse';
  speed: number;
  percentage?: number;
  pauseAtEnd?: boolean;
}

export type Action = ScaleAction | AppearAction | ThreeDAction | ThreeDAnimationAction;

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