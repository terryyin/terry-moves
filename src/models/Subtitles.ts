import { Vector2, Vector3 } from '@react-three/fiber';
export type ActionType = 'type' | 'highlight lines' | 'highlight token' | 'replace text' | 'insert text' | 'move' | 'appear' | 'disappear' | 'rotate and rise' | 'oscillate' | 'camera look at' | '3d rotate' | 'glow' | '3d animation start' | '3d animation reverse' | 'scale';

export interface BaseAction {
  actor: string;
  actionType: ActionType;
  duration: number;
  offset?: number;
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

export type HighlightStyle = 'wavy underline' | 'red background';

export interface HighlightLinesAction extends BaseAction {
  actionType: 'highlight lines';
  lines: number[];
  style? : HighlightStyle
}

export interface HighlightTokenAction extends BaseAction {
  actionType: 'highlight token';
  token: string;
  style? : HighlightStyle
}

export interface ReplaceTextAction extends BaseAction {
  actionType: 'replace text';
  line: number;
  match: string;
  replacement: string;
}

export interface InsertTextAction extends BaseAction {
  actionType: 'insert text';
  line: number;
  column: number;
  text: string;
}

type CodeAction = HighlightLinesAction | HighlightTokenAction | ReplaceTextAction | InsertTextAction;

export interface AbsolutePositionAction extends BaseAction {
  actionType: 'move' | 'camera look at';
  absolutePosition: number | Vector2 | Vector3;
}

export interface RelativePositionAction extends BaseAction {
  actionType: 'oscillate';
  delta: number | Vector2 | Vector3;
}

export interface OneDimensionalAction extends BaseAction {
  actionType: | 'rotate and rise';
  distance: number;
}

export interface ThreeDRotateAction extends BaseAction {
  actionType: '3d rotate';
  totalRotation: [number, number, number];
}

export type ThreeDAction = ThreeDRotateAction | AbsolutePositionAction | OneDimensionalAction;

export interface ThreeDAnimationAction extends BaseAction {
  actionType: '3d animation start' | '3d animation reverse';
  speed: number;
  percentage?: number;
  pauseAtEnd?: boolean;
  freezeBeforeStart?: boolean;
}

export type Action = TextAction | CodeAction | ScaleAction | AppearAction | ThreeDAction | ThreeDAnimationAction | RelativePositionAction;

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