import React  from 'react';

import { Subtitle } from './models/Subtitles';
import { AbsoluteFill } from 'remotion';
import AnimationEffect from './video_components/AnimationEffect';
import { ThreeDFrame } from './video_components/ThreeDFrame';
import { ThreeAnimationEffect } from './video_components/ThreeAnimationEffect';
import { Story } from './video_components/Story';
import { Blaster } from './parts/Blaster';
import { GroupInitialState } from './video_components/GroupInitialState';
import { RocketPlume } from './parts/RocketPlume';
import { Helmet } from './parts/Helmet';

export const booleanReturnsSutitles: Subtitle[] = [
		{ leadingBlank: 0, duration: 3, text: "Welcome back to the Oh My Bad Boolean Series!", actions: []}

];

export const StoryLeSSComplete: React.FC = () => {
  return (
		<Story id="StoryLeSSComplete" width={720} height={720} subtitles={booleanReturnsSutitles}  >
    <AbsoluteFill style={{ backgroundColor: '#000', fontFamily: 'Roboto, sans-serif', }}>
      <AnimationEffect actor="stage">
				<AbsoluteFill style={{position: 'absolute', left: '0%', top: '0%', width: '100%', height: '100%', zIndex:2000}}>
          <ThreeDFrame cameraDistance={8} lookAtY={0} cameraY={0}>
						<directionalLight castShadow position={[10, 20, 15]} intensity={15} color={0xffffff} />	
						<GroupInitialState rotation={[0.7, Math.PI * 1.3, 0]} position={[1, 2.5, 0]} scale={1}>
							<ThreeAnimationEffect actor="blaster assembly" >
									<Blaster actor="blaster"/>
									<GroupInitialState rotation={[0, 0, Math.PI * 3 / 2]} position={[0, 0, 0]} scale={1}>
										<RocketPlume actor="blaster fire" position={[-0.6, -3, 0.3]} scale={1.8}/>
									</GroupInitialState>
							</ThreeAnimationEffect>
						</GroupInitialState>
						<ThreeAnimationEffect actor="helmet position">
							<GroupInitialState rotation={[0, 0, 0]} position={[-1, 1, 4]} scale={0.03}>
								<ThreeAnimationEffect actor="helmet">
									<Helmet />
								</ThreeAnimationEffect>
							</GroupInitialState>
						</ThreeAnimationEffect>
          </ThreeDFrame>
				</AbsoluteFill>
			</AnimationEffect>

		</AbsoluteFill>
		</Story>
  );
};