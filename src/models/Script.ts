import {Action, ActionType, Subtitle, SubtitleWithAction} from '../models/Subtitles';
import EffectCalculator, { EffectCalculatorAndAction } from './EffectCalculator';

export class Script {
	private subtitles: Subtitle[];
	fps = 30;

	constructor(subtitles: Subtitle[], fps: number) {
		this.subtitles = subtitles;
		this.fps = fps;
	}

	getTotalFrame() {
		return Math.floor(
			this.subtitles.reduce(
				(prev, curr) => prev + curr.leadingBlank + curr.duration,
				0
			) * this.fps
		);
	}

	getActions(actor: string, frame: number): EffectCalculatorAndAction[] {
		return this.getActionsBy(frame, (action) => action.actor === actor)
	}

	getActionsByType(actionType: ActionType, frame: number): EffectCalculatorAndAction[] {
		return this.getActionsBy(frame, (action) => action.actionType === actionType)
	}

	private getActionsBy(frame: number, matcher: (action: Action)=>boolean): EffectCalculatorAndAction[] {
		return this.subtitles
			.map((subtitle, index) => {
				if (!this.isSubtitleWithAction(subtitle)) return [];
				return subtitle.actions
					.filter(matcher)
					.map((action) => {
						const startTime = subtitle ? this.getStartTimeOfSubtitle(index) : 0;
						return {
							action,
							effectCalculator: new EffectCalculator(action.startDuration, startTime + (action.offset ?? 0), frame, this.fps),
						};
					});
			})
			.flat();
	}

	getSubtitleAndItsEndTimeAt(frame: number) {
		let endTime = 0;
		let subtitle: Subtitle = this.subtitles[0];

		for (let i = 0; i < this.subtitles.length; i++) {
			subtitle = this.subtitles[i];
			endTime += subtitle.leadingBlank + subtitle.duration;
			if (endTime * this.fps > frame) break;
		}

		return {subtitle, endTime};
	}

	private isSubtitleWithAction(
		subtitle: Subtitle
	): subtitle is SubtitleWithAction {
		return subtitle && (subtitle as SubtitleWithAction).actions !== undefined;
	}

	private getStartTimeOfSubtitle(subtitleIndex: number): number {
		let endTime = 0;
		let targetSubtitle: Subtitle = this.subtitles[0];
		for (let i = 0; i < this.subtitles.length; i++) {
			targetSubtitle = this.subtitles[i];
			endTime += targetSubtitle.leadingBlank + targetSubtitle.duration;
			if (subtitleIndex === i) break;
		}
		return endTime - targetSubtitle.duration;
	}
}
