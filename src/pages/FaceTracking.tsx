import React from 'react';
import { FaceTracking, MindAR } from 'mind-ar-react';
import { Camera, Assets, Item, GLTFModel } from 'aframe-react-component';
import { Flex } from '@chakra-ui/react';

const FaceTrackingPage = () => {
  return (
    <FaceTracking>
      <Flex zIndex={0} position={'relative'} width={'100%'} height={'100%'} overflow={'hidden'}>
        <MindAR.Scene
          mindARFace={{
            shouldFaceUser: true,
            _positionZIndex: 2,
          }}
          colorSpace="sRGB"
          embedded
          renderer="colorManagement: true, physicallyCorrectLights"
          orientationUI={false}
          vrModeUI={false}
          stats
        >
          <Assets>
            <Item id="headModel" src="assets/sparkar/headOccluder.glb" />
            <Item id="glassesModel" src="assets/glasses/scene.gltf" />
          </Assets>
          <Camera position={{ x: 0, y: 0, z: 0 }} look-controls={false} active={false} />
          <MindAR.Faces anchorIndex={168}>
            <GLTFModel
              mindar-face-occluder
              position={[0, -0.3, 0]}
              rotation={[0, 0, 0]}
              scale={[0.065, 0.065, 0.065]}
              src="#headModel"
            />
          </MindAR.Faces>
          <MindAR.Faces anchorIndex={168}>
            <GLTFModel
              rotation={[0, 0, 0]}
              position={[0, 0, 0]}
              scale={[0.008, 0.01, 0.01]}
              src="#glassesModel"
            />
          </MindAR.Faces>
        </MindAR.Scene>
      </Flex>
    </FaceTracking>
  );
};

export default FaceTrackingPage;
