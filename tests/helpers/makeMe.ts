import { Script } from "@/models/Script";
import { Subtitle } from '@/models/Subtitles';
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
  scriptBuilder: ScriptBuilder = new ScriptBuilder();
  second = 2;
  language = 'en';

  withSubtitle(subtitle: Subtitle) {
    this.scriptBuilder.withSubtitle(subtitle);
    return this;
  }

  seconds(sec: number) {
    this.second = sec;
    return this;
  }

  lang(language: string) {
    this.language = language;
    return this;
  }

  please() {
    const script = this.scriptBuilder.please();
    return new AnimationContextWrapper(this.second * script.fps, script, this.language);
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