import React, { useEffect, useRef } from 'react';
import { AScene } from 'aframe';
import { Camera, GLTFModel, Plane, Assets, Item } from 'aframe-react-component';
import { ImageTracking, MindAR } from 'mind-ar-react';
import { Flex } from '@chakra-ui/react';
import { rotationSettings, scaleSettings } from '../utils/constant';

const ImageTrackingPage = () => {
  const sceneRef = useRef<typeof AScene>(null);

  useEffect(() => {
    if (!sceneRef.current) return;
    const arSystem = sceneRef.current.systems['mindar-image-system'];

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      arSystem?.stop();
    };
  }, [sceneRef.current]);

  return (
    <ImageTracking>
      <Flex zIndex={1} position={'relative'} width={'100%'} overflow={'hidden'}>
        <MindAR.Scene
          mindARImage={{
            imageTargetSrc:
              'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/card.mind',
            autoStart: true,
          }}
          color-space="sRGB"
          mouse-detector
          gesture-detector
          embedded
          renderer="colorManagement: true, physicallyCorrectLights"
          orientationUI
          stats
          ref={sceneRef}
        >
          <Assets>
            <img
              id="card"
              src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/examples/image-tracking/assets/card-example/card.png"
              alt=""
            />
            <Item
              id="avatarModel"
              src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/examples/image-tracking/assets/card-example/softmind/scene.gltf"
            />
          </Assets>
          <Camera position={{ x: 0, y: 0, z: 0 }} look-controls={false} />
          <MindAR.Marker targetIndex={0}>
            <MindAR.Entity
              mouse-rotation={rotationSettings}
              mouse-scale={scaleSettings}
              gesture-rotation={rotationSettings}
              gesture-scale={scaleSettings}
            >
              <Plane
                src="#card"
                position={[0, 0, 0]}
                height={0.552}
                width={1}
                rotation={[0, 0, 0]}
              />
              <GLTFModel
                rotation={[0, 0, 0]}
                position={[0, 0, 0.1]}
                scale={[0.005, 0.005, 0.005]}
                animation={{
                  property: 'position',
                  to: '0 0.1 0.1',
                  dur: 1000,
                  easing: 'easeInOutQuad',
                  loop: true,
                  dir: 'alternate',
                }}
                src="#avatarModel"
              />
            </MindAR.Entity>
          </MindAR.Marker>
        </MindAR.Scene>
      </Flex>
    </ImageTracking>
  );
};

export default ImageTrackingPage;
