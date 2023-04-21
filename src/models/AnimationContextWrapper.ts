import { Euler, Vector3 } from '@react-three/fiber';
import { CSSProperties } from 'react';
import {spring} from 'remotion'
import { Action, Subtitle } from '@/models/Subtitles';
import { AnimationContext } from "./AnimationContext";
import DivActioner from './DivActioner';
import EffectCalculator from './EffectCalculator';

type ThreeGroupAttributes = {
  scale: number;
  position: Vector3;
  rotation: Euler;
}

export default class AnimationContextWrapper {

  animationContext: AnimationContext;

  constructor(animationContext: AnimationContext) {
    this.animationContext = animationContext;
  }

  private getActioner(objectId: string): DivActioner | undefined {
    const subtitle = this.animationContext.allSubtitles.find(subtitle => subtitle.actions?.find(action => action.objectId === objectId));
    let action: Action | undefined;
    if(subtitle?.actions) {
      action = subtitle.actions.find(action => action.objectId === objectId);
    }
    const startTime = subtitle ? this.getStartTimeOfSubtitle(subtitle.id) : 0; 
    if(action) {
      const effectCalculator = new EffectCalculator(action, startTime, this.animationContext.globalFrame, this.animationContext.globalFps);
      return new DivActioner(action, effectCalculator);
    }
  }

  getStyleOf(objectId: string): CSSProperties {
    const actioner = this.getActioner(objectId);
    if(!actioner) return {};
    return actioner.getStyle();
  }

  get3DGroupAttributes(objectId: string): ThreeGroupAttributes {
    const actioner = this.getActioner(objectId);
    if(!actioner) return {
      position: [0, 0, 0],
      scale: 1,
      rotation: [0, 0, 0],
    };
    const translateY = actioner.getThreeTranslateY();
    const rotateY = actioner.getThreeRotateY();
    const scale = actioner.getThreeScale();

    return {
      position: [0, translateY, 0],
      scale,
      rotation: [0, rotateY, 0],
    }
  }

  getStartTimeOfSubtitle(subtitleId: string): number {
    let endTime = 0;
    let targetSubtitle: Subtitle = this.animationContext.allSubtitles[0];
    for (let i = 0; i < this.animationContext.allSubtitles.length; i++) {
      targetSubtitle = this.animationContext.allSubtitles[i];
      endTime += targetSubtitle.leadingBlank + targetSubtitle.duration;
      if (subtitleId === targetSubtitle.id)
        break;
    }
    return endTime - targetSubtitle.duration;
  }

  getSpring(startSubtitleId: string) {
    return spring({
      frame: this.animationContext.globalFrame - this.getStartTimeOfSubtitle(startSubtitleId) * this.animationContext.globalFps,
      durationInFrames: 60,
      fps: 30,
      config: {
        damping: 50,
        mass: 0.5,
        stiffness: 200,
        overshootClamping: true,
      },
    });
  }

  sinceSubtitle(subtitleId: string): boolean {
    const startTime = this.getStartTimeOfSubtitle(subtitleId);
    return this.animationContext.globalFrame >= startTime * this.animationContext.globalFps;
  }

  getCurrentSubtitleText(): string {
    let endTime = 0;
    let subtitle: Subtitle = this.animationContext.allSubtitles[0];

    for (let i = 0; i < this.animationContext.allSubtitles.length; i++) {
      subtitle = this.animationContext.allSubtitles[i];
      endTime += subtitle.leadingBlank + subtitle.duration;
      if (endTime * this.animationContext.globalFps > this.animationContext.globalFrame)
        break;
    }

    return this.animationContext.globalFrame > (endTime) * this.animationContext.globalFps || this.animationContext.globalFrame < (endTime - subtitle.duration) * this.animationContext.globalFps ? '' : subtitle.text;
  }
};

