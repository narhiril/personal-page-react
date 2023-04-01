import { EffectComposer, GodRays } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import { useRef, forwardRef } from 'react';
import FlashSource from "./FlashSource";

const FlashEffect = forwardRef(function FlashEffect(props, forwardRef) {

    return (
        <>
            <FlashSource ref={forwardRef} reset={props.reset} scalar={props.scalar} zCoord={props.zCoord}/>
            {forwardRef.current && (
                <EffectComposer multisampling={0}>
                    <GodRays
                        sun={forwardRef.current}
                        blendFunction={BlendFunction.ADD}
                        samples={20}
                        density={0.67}
                        decay={0.997}
                        weight={0.3}
                        exposure={0.2}
                        clampMax={1}
                        width={props.canvasDim.x}
                        height={props.canvasDim.y}
                        kernelSize={KernelSize.SMALL}
                        blur={true}
                    />
                </EffectComposer>
            )}
        </>
    );

});

export default FlashEffect;
