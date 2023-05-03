import { Vector2, Vector3 } from '@react-three/fiber';
export type ActionType = 'connect to' | 'additive value change to' | 'type' | 'highlight lines' | 'delete lines' | 'highlight token' | 'replace text' | 'insert text' | 'move' | 'appear' | 'disappear' | 'rotate and rise' | 'oscillate' | 'camera look at' | '3d rotate' | 'glow' | '3d animation start' | '3d animation reverse' | 'scale';

export interface BaseAction {
  actor: string;
  actionType: ActionType;
  offset?: number;
}

export interface InterimAction extends BaseAction {
  startDuration: number;
}

export interface UntilAction extends BaseAction {
  startDuration: number;
}

export interface StartAndEndAction extends UntilAction {
  startDuration: number;
}

export interface ScaleAction extends InterimAction {
  actionType: 'scale';
  outputRange: [number, number];
}

export interface GlowAction extends InterimAction {
  actionType: 'glow';
}

export interface AppearAction extends StartAndEndAction {
  actionType: 'appear' | 'disappear';
}

export interface TextAction extends StartAndEndAction {
  actionType: 'type';
}

export type HighlightStyle = 'wavy underline' | 'red background';

export interface HighlightLinesAction extends StartAndEndAction {
  actionType: 'highlight lines';
  lines: number[];
  style? : HighlightStyle
}

export interface DeleteLinesAction extends StartAndEndAction {
  actionType: 'delete lines';
  fromLine: number;
  count: number;
}

export interface HighlightTokenAction extends StartAndEndAction {
  actionType: 'highlight token';
  token: string;
  style? : HighlightStyle
}

export interface ReplaceTextAction extends StartAndEndAction {
  actionType: 'replace text';
  line: number;
  match?: string;
  replacement: string;
}

export interface InsertTextAction extends StartAndEndAction {
  actionType: 'insert text';
  line: number;
  column: number;
  text: string;
}

type CodeAction = DeleteLinesAction | HighlightLinesAction | HighlightTokenAction | ReplaceTextAction | InsertTextAction;

export interface AbsolutePositionAction extends InterimAction {
  actionType: 'move' | 'camera look at';
  absolutePosition: number | Vector2 | Vector3;
}

export interface RelativePositionAction extends UntilAction {
  actionType: 'oscillate';
  delta: number | Vector2 | Vector3;
}

export interface OneDimensionalAction extends InterimAction {
  actionType: 'additive value change to' | 'rotate and rise';
  value: number;
}

export interface ThreeDRotateAction extends UntilAction {
  actionType: '3d rotate';
  totalRotation: [number, number, number];
}

export type ThreeDAction = ThreeDRotateAction | AbsolutePositionAction | OneDimensionalAction;

export interface ThreeDAnimationAction extends InterimAction {
  actionType: '3d animation start' | '3d animation reverse';
  speed: number;
  percentage?: number;
  pauseAtEnd?: boolean;
  freezeBeforeStart?: boolean;
}

export interface ConnectAction extends UntilAction {
  actionType: 'connect to';
  target: string;
  bentLevel: number;
  radiusSource?: number;
  radiusTarget?: number;
}

export type Action = ConnectAction | TextAction | CodeAction | ScaleAction | GlowAction | AppearAction | ThreeDAction | ThreeDAnimationAction | RelativePositionAction;

export type FlashBack = {
  duration: number;
  from: number;
  speed: number;
};

interface SubtitleBasic {
  id?: string;
  leadingBlank: number;
  duration: number;
  text: string | string[];
  translations?: Record<string, string | string[]>;
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