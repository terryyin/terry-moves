import LazyTransitions from './LazyTransitions';
import DivBaseActioner from './DivBaseActioner';

export default class GeneralValueActioner extends DivBaseActioner {
	static defaultValue: LazyTransitions = new LazyTransitions();

	protected getStyle(): LazyTransitions {
		switch (this.action.actionType) {
			case 'additive value change to':
				return this.additiveValueChange([0, this.action.value]);
			default:
				return new LazyTransitions();
		}
	}

	private additiveValueChange(outputRange: [number, number]): LazyTransitions {
			const result = new LazyTransitions();
		result.setInterpolation('translateZ', {
			interpolateType: 'linear',
			inputRange: this.effectCalculator.frameRange,
			outputRange,
		});
		return result;
	}

}

