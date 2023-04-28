import { InterpolateRanges } from './InterpolateRanges';
import { InterpolatesOfField } from './InterpolatesOfField';
import { InterpolateFields } from './LazyThreeDObjectState';

export class LazyState {
protected interpolateRanges: Map<InterpolateFields, InterpolatesOfField>;

constructor(allFields: { name: InterpolateFields; type: 'additive' | 'multiplitive'; }[]) {
this.interpolateRanges = new Map();
allFields.forEach(({ name, type }) => {
this.interpolateRanges.set(name, new InterpolatesOfField(type));
});
}

private sureGetField(key: InterpolateFields): InterpolatesOfField {
const field = this.interpolateRanges.get(key);
if (!field) {
throw new Error(`Unknown interpolation field ${key}`);
}
return field;
}

setInterpolation1(
key: InterpolateFields,
interpolateRange: InterpolateRanges
): void {
const field = this.sureGetField(key);
field.add(interpolateRange);
}


combineInto(prev: LazyState, output: LazyState): void {
this.interpolateRanges.forEach((interpolateRange, key) => {
const combined = interpolateRange.combine(prev.sureGetField(key));
output.interpolateRanges.set(key, combined);
});

}

reduceInterpolate(
frame: number,
fps: number,
field: InterpolateFields
): number | undefined {
return this.sureGetField(field).reduceInterpolate(frame, fps);
}
}
