import LazyThreeDObjectState from './LazyThreeDObjectState';
import BaseActioner from './BaseActioner';
import { InterpolateRangesLinear } from './InterpolateRanges';

export default class GeneralValueActioner extends BaseActioner {
	static defaultValue: LazyThreeDObjectState = new LazyThreeDObjectState();

	protected getStyle(): LazyThreeDObjectState {
		switch (this.action.actionType) {
			case 'additive value change to':
				return this.additiveValueChange([0, this.action.value]);
			default:
				return new LazyThreeDObjectState();
		}
	}

	private additiveValueChange(outputRange: [number, number]): LazyThreeDObjectState {
			const result = new LazyThreeDObjectState();
		result.setInterpolation('translateZ', 
    new InterpolateRangesLinear(this.frameRange, outputRange));
		return result;
	}

}

