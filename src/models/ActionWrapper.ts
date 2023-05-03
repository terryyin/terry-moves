import EffectCalculator from "./EffectCalculator"
import { Action } from "./Subtitles";

export const createEffectCalculator = (action: Action, startTime: number, frame: number, fps: number): EffectCalculator => {
	const duration = 'duration' in action ? action.duration : action.startDuration;
	return new EffectCalculator(duration, startTime + (action.offset ?? 0), frame, fps);
}