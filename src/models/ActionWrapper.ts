import EffectCalculator from "./EffectCalculator"
import { Script } from "./Script";
import { Action } from "./Subtitles";

const getActionDuration = (action: Action, startTime: number, script: Script): number => {
	if ('duration' in action) {
		return action.duration;
	}
	if ('startDuration' in action) {
	  return action.startDuration;
	}

	let result = 0;
	if(action.persistUntilSubtitleId) {
	  result = script.getStartTimeOfSubtitleById(action.persistUntilSubtitleId) - startTime;
	}

	if(action.endingTimeAdjustment !== undefined) {
		result += action.endingTimeAdjustment;
	}
	return result;
}

export const createEffectCalculator = (action: Action, startTime: number, frame: number, script: Script): EffectCalculator => {
	const duration = getActionDuration(action, startTime, script);
	return new EffectCalculator(duration, startTime + (action.offset ?? 0), frame, script.fps);
}