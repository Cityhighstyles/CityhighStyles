import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  useGLTF, 
  Environment, 
  Float, 
  PresentationControls, 
  ContactShadows, 
  Sparkles 
} from '@react-three/drei';

// 1. Component to load and display your 3D model
function PerfumeBottle() {
  // Replace '/perfume_bottle.glb' with the path to your actual 3D model file in the public folder
  const { scene } = useGLTF('/perfume_bottle.glb'); 
  
  return (
    <primitive 
      object={scene} 
      scale={2} 
      position={[0, -1, 0]} 
      rotation={[0.2, -0.4, 0]} 
    />
  );
}

// 2. Main Hero Section Component
export default function ProductShowcase() {
  return (
    // Tailwind classes used for the dark, immersive background
    <div className="w-full h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1016] flex items-center justify-center relative overflow-hidden">
      
      {/* Overlay Text/UI */}
      <div className="absolute z-10 text-white text-center pointer-events-none top-1/4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-widest mb-4 uppercase">
          Essence
        </h1>
        <p className="text-pink-300 tracking-widest text-sm md:text-base">
          Experience the motion
        </p>
      </div>

      {/* 3D Canvas */}
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          
          {/* Lighting setup to mimic the image's pink/purple rim lighting */}
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} color="#ff007f" intensity={2} /> {/* Pink bottom light */}
          <pointLight position={[10, -10, -10]} color="#00ffff" intensity={1} />  {/* Subtle blue accent */}

          {/* PresentationControls handles the smooth dragging and rotation without letting the user flip the camera upside down */}
          <PresentationControls 
            global 
            config={{ mass: 2, tension: 500 }} 
            snap={{ mass: 4, tension: 1500 }} 
            rotation={[0, 0.3, 0]} 
            polar={[-Math.PI / 3, Math.PI / 3]} 
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            {/* Float adds that smooth, continuous hovering animation */}
            <Float
              speed={2} // Animation speed
              rotationIntensity={0.5} // XYZ rotation intensity
              floatIntensity={1} // Up/down float intensity
              floatingRange={[-0.2, 0.2]} // Range of y-axis values
            >
              <PerfumeBottle />
            </Float>
          </PresentationControls>

          {/* Sparkles simulate the floating bubbles in your image */}
          <Sparkles 
            count={40} 
            scale={6} 
            size={4} 
            speed={0.4} 
            opacity={0.3} 
            color="#ff66b2" 
          />

          {/* Environment maps realistic reflections onto the glass material of the bottle */}
          <Environment preset="city" />
          
          {/* ContactShadows grounds the floating object with a soft shadow beneath it */}
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4} 
            color="#ff007f"
          />

        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the model so it's ready instantly
useGLTF.preload('/perfume_bottle.glb');
