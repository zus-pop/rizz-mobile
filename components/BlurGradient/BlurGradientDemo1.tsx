import { Canvas, ImageShader, LinearGradient, useImage, vec } from '@shopify/react-native-skia';
import { Dimensions, StyleSheet, View } from 'react-native';

import { BlurMask } from './BlurMask';
import { Title } from './Title';
import { Text } from '../ui/text';

const { width, height } = Dimensions.get('window');

export const BlurGradientDemo = () => {
  const image = useImage('https://picsum.photos/200/300');

  return (
    <>
      <Text style={styles.frontText}>Your text here</Text>
      <View style={styles.card}>
        <Canvas style={styles.canvas}>
          <ImageShader
            image={image}
            x={0}
            y={0}
            width={width * 0.9}
            height={height * 0.6}
            fit="cover"
            tx="clamp"
            ty="clamp"
          />
          <BlurMask
            mask={
              <LinearGradient
                start={vec(0, height * 0.4)}
                end={vec(0, height * 0.6)}
                colors={['transparent', 'black']}
              />
            }>
            <ImageShader
              image={image}
              x={0}
              y={0}
              width={width * 0.9}
              height={height * 0.6}
              fit="cover"
              tx="clamp"
              ty="clamp"
            />
          </BlurMask>
          <Title title="Hello" />
        </Canvas>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  frontText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  card: {
    width: width * 0.9,
    height: height * 0.6,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    alignSelf: 'center',
    marginVertical: 20,
  },
  canvas: {
    width: '100%',
    height: '100%',
  },
});
