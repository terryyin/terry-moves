import EffectCalculator from "./EffectCalculator"
import { Action } from "./Subtitles";

const getActionDuration = (action: Action): number => {
	if ('duration' in action) {
		return action.duration;
	}
	if ('endingTimeAdjustment' in action) {
		return action.endingTimeAdjustment;
	}
	return action.startDuration;
}

export const createEffectCalculator = (action: Action, startTime: number, frame: number, fps: number): EffectCalculator => {
	const duration = getActionDuration(action);
	return new EffectCalculator(duration, startTime + (action.offset ?? 0), frame, fps);
}