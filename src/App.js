import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, useGLTF, OrbitControls } from "@react-three/drei";

useGLTF.preload("/shoe-draco.glb");

function Shoe({ ...props }) {
  const ref = useRef();

  const { nodes, materials } = useGLTF("/shoe-draco.glb");
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    console.log(Math.sin(1260.8486000000228 / 4.5));
    console.log(Math.cos(1260.8486000000228 / 4.5));
    ref.current.rotation.set(
      0.1 + Math.cos(time / 4.5) / 10,
      Math.sin(time / 4) / 4,
      0.3 - (1 + Math.sin(time / 4)) / 8
    );

    ref.current.position.y = (1 + Math.sin(time / 2)) / 10;
  });
  return (
    <group {...props} dispose={null}>
      <group ref={ref}>
        <group position={[-0.1, 0, -0.22]} rotation={[0, Math.PI / 2, 0]}>
          <mesh
            castShadow
            geometry={nodes?.Object_115.geometry}
            material={materials["Material.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_119.geometry}
            material={materials["Material.001"]}
          />
        </group>
      </group>
    </group>
  );
}

function App() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 1.1], fov: 50 }}>
      <ambientLight intensity={2} />
      <spotLight
        position={[1, 6, 1.5]}
        angle={0.2}
        penumbra={1}
        intensity={2.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <spotLight
        position={[-5, 5, -1.5]}
        angle={0.03}
        penumbra={1}
        intensity={4}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        position={[5, 5, -5]}
        angle={0.3}
        penumbra={1}
        intensity={4}
        castShadow={true}
        shadow-mapSize={[256, 256]}
        color="#ffffc0"
      />
      <Suspense fallback={null}>
        <Shoe scale={0.225} position={[0, -0.09, 0]} />
        <ContactShadows
          frames={1}
          rotation-x={[Math.PI / 2]}
          position={[0, -0.33, 0]}
          far={0.4}
          width={2}
          height={2}
          blur={4}
        />
      </Suspense>
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.2}
        enablePan={false}
        enableZoom={true}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}

export default App;
