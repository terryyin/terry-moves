import { Subtitle } from '@/models/Subtitles';
import { AnimationContext } from '@/models/AnimationContext';

class AnimationContextBuilder {

  animationContext: AnimationContext = {
    allSubtitles: [],
    globalFps: 30,
    globalFrame: 60,
  };

  withSubtitle(subtitle: Subtitle) {
    this.animationContext.allSubtitles.push(subtitle);
    return this;
  }

  seconds(sec: number) {
    this.animationContext.globalFrame = sec * this.animationContext.globalFps;
    return this;
  }

  please() {
    return this.animationContext;
  }
}
class MakeMe {
  get animationContext() {
    return new AnimationContextBuilder();
  }
}

export const makeMe = new MakeMe();