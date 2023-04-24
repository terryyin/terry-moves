import { Script } from '@/models/AnimationContextWrapper';
import { Subtitle } from '@/models/Subtitles';
import { AnimationContext } from '@/models/AnimationContext';
import AnimationContextWrapper from '@/models/AnimationContextWrapper';

class ScriptBuilder {
  private allSubtitles: Subtitle[] = [];

  withSubtitle(subtitle: Subtitle) {
    this.allSubtitles.push(subtitle);
    return this;
  }

  please() {
    return new Script(this.allSubtitles, 30);
  }
}
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
    return new AnimationContextWrapper(this.animationContext);
  }
}
class MakeMe {
  get animationContext() {
    return new AnimationContextBuilder();
  }

  get script() {
    return new ScriptBuilder();
  }
}

export const makeMe = new MakeMe();