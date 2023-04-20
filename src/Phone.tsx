import {useLoader } from '@react-three/fiber';
import React, {useMemo} from 'react';
import {staticFile, useVideoConfig} from 'remotion';
import {
	getPhoneLayout,
	PHONE_COLOR,
	PHONE_CURVE_SEGMENTS,
	PHONE_SHININESS,
} from './helpers/layout';
import {roundedRect} from './helpers/rounded-rectangle';
import {RoundedBox} from './RoundedBox';
import { TextureLoader } from 'three';
import { ThreeAnimationEffect } from './video_components/ThreeAnimationEffect';

export const Phone: React.FC<{
	aspectRatio: number;
	baseScale: number;
}> = ({aspectRatio, baseScale}) => {
	useVideoConfig();

	const layout = useMemo(
		() => getPhoneLayout(aspectRatio, baseScale),
		[aspectRatio, baseScale]
	);

	// Calculate a rounded rectangle for the phone screen
	const screenGeometry = useMemo(() => {
		return roundedRect({
			width: layout.screen.width,
			height: layout.screen.height,
			radius: layout.screen.radius,
		});
	}, [layout.screen.height, layout.screen.radius, layout.screen.width]);

	const servicePersonTexture = useLoader(TextureLoader, staticFile('assets/ServicePerson.svg'));

	return (
		<ThreeAnimationEffect >
			<RoundedBox
				radius={layout.phone.radius}
				depth={layout.phone.thickness}
				curveSegments={PHONE_CURVE_SEGMENTS}
				position={layout.phone.position}
				width={layout.phone.width}
				height={layout.phone.height}
			>
				<meshPhongMaterial color={PHONE_COLOR} shininess={PHONE_SHININESS} />
			</RoundedBox>
			<mesh position={layout.screen.position}>
				<shapeGeometry args={[screenGeometry]}/>
					<meshBasicMaterial
						toneMapped={false}
						map={servicePersonTexture}
					/>
			</mesh>
		</ThreeAnimationEffect>
	);
};
