import { Canvas, Fill, Group, Shader, Skia, useClock } from '@shopify/react-native-skia';
import React from 'react';
import { useDerivedValue } from 'react-native-reanimated';

interface LiquidGlassProps {
  width: number;
  height: number;
  borderRadius?: number;
  children?: React.ReactNode;
}

const fragmentShader = Skia.RuntimeEffect.Make(`
uniform float2 resolution;
uniform float time;

float edge(float2 uv, float blur) {
  float2 d = abs(uv - 0.5);
  float dist = max(d.x, d.y);
  return smoothstep(0.5, 0.5 - blur, dist);
}

float circle(float2 uv, float2 center, float radius, float blur) {
  float dist = length(uv - center);
  return smoothstep(radius, radius - blur, dist);
}

half4 main(float2 fragCoord) {
  float2 uv = fragCoord / resolution;

  // Centered UV
  float2 centered = uv - 0.5;

  // Elliptical Glass shape
  float shape = smoothstep(0.45, 0.4, length(centered * float2(1.5, 1.0)));

  // Edge shine
  float edgeLight = pow(1.0 - length(centered), 2.0);

  // Add subtle glow
  float glow = 0.05 * sin(time * 2.0 + uv.y * 10.0);

  // Base light bluish color
  half3 baseColor = half3(0.9, 0.95, 1.0);

  // Compose final color
  half3 finalColor = baseColor + edgeLight * 0.2 + glow;

  return half4(finalColor, shape * 0.4); // transparency controlled by shape
}
`);

const LiquidGlass: React.FC<LiquidGlassProps> = ({ width, height, borderRadius = 20 }) => {
  const clock = useClock();
  const uniforms = useDerivedValue(() => {
    return {
      resolution: [width, height],
      time: clock.value / 1000,
    };
  }, [clock]);

  if (!fragmentShader) {
    throw new Error("Couldn't compile the shader");
  }

  return (
    <Canvas style={{ width, height, borderRadius, overflow: 'hidden' }}>
      <Group>
        <Fill>
          <Shader source={fragmentShader} uniforms={uniforms} />
        </Fill>
      </Group>
    </Canvas>
  );
};

export default LiquidGlass;
