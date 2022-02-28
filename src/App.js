import { ACESFilmicToneMapping } from "three";
import React, { Suspense } from "react";
import { Sky, Environment, OrbitControls, Box, MeshReflectorMaterial } from "@react-three/drei";
import { VRCanvas, DefaultXRControllers } from "@react-three/xr";

function App() {
  let glLightingConfig = {
    toneMapping: ACESFilmicToneMapping,
    toneMappingExposure: 0.4,
    physicallyCorrectLights: true,
  };

  return (
    <VRCanvas
      camera={{ position: [0, 2, 10] }}
      shadows
      onCreated={({ gl }) => Object.assign(gl, glLightingConfig)}
    >
      <Suspense fallback={null}>
        <Environment preset="warehouse" />

        <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0}
          azimuth={0.25}
        />
        <pointLight
          intensity={8}
          position={[0, 2.3, 0]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.00001}
          castShadow={true}
        />
        <group position={[0,1,0]}>
        <group position={[-1, 0, 1]} rotation={[0, 0, 0]} scale={[3, 2.4, 0.1]}>
          <Box args={[1, 1, 1]} position={[-1, 0, 1]}>
            <meshStandardMaterial attach="material" color="white" />
          </Box>
        </group>
        
        <group
          position={[-1, 0, -1]}
          rotation={[0, 0, 0]}
          scale={[3, 2.4, 0.1]}
        >
          <Box args={[1, 1, 1]} position={[-1, 0, 1]}>
          <MeshReflectorMaterial
          mirror={1}
          resolution={1024}
          transparent={false}
          reflectorOffset={0.162}
        ></MeshReflectorMaterial>
          </Box>
        </group>
        <group
          position={[-1, 1.4, 0]}
          rotation={[1.6, 0, 0]}
          scale={[3, 2.4, 0.1]}
        >
          <Box args={[1, 1, 1]} position={[-1, 0, 1]}>
            <meshStandardMaterial attach="material" color="white" />
          </Box>
        </group>
        <group
          position={[-1, -1.2, 0]}
          rotation={[1.6, 0, 0]}
          scale={[3, 2.4, 0.1]}
        >
          <Box args={[1, 1, 1]} position={[-1, 0, 1]}>
            <meshStandardMaterial attach="material" color="white" />
          </Box>
        </group>
        </group>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeBufferGeometry attach="geometry" args={[10, 10]} />
          <meshLambertMaterial attach="material" color="lightblue" />
        </mesh>
        <OrbitControls />

        <DefaultXRControllers />
      </Suspense>
    </VRCanvas>
  );
}

export default App;
