/**
 * @format
 */

import React from 'react';
import {StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('screen');

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const DATA = [
  {
    key: '3571572',
    title: 'Multi-lateral intermediate moratorium',
    description: "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: 'https://image.flaticon.com/icons/png/256/3571/3571572.png',
  },
  {
    key: '3571747',
    title: 'Automated radical data-warehouse',
    description: 'Use the optical SAS system, then you can navigate the auxiliary alarm!',
    image: 'https://image.flaticon.com/icons/png/256/3571/3571747.png',
  },
  {
    key: '3571680',
    title: 'Inverse attitude-oriented system engine',
    description: 'The ADP array is down, compress the online sensor so we can input the HTTP panel!',
    image: 'https://image.flaticon.com/icons/png/256/3571/3571680.png',
  },
  {
    key: '3571603',
    title: 'Monitored global data-warehouse',
    description: 'We need to program the open-source IB interface!',
    image: 'https://image.flaticon.com/icons/png/256/3571/3571603.png',
  },
];

interface AnimatedProps {
  scrollX: Animated.Value;
}

const Indicator = ({scrollX}: AnimatedProps) => {
  return (
    <View style={{position: 'absolute', bottom: 100, flexDirection: 'row'}}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: '#333',
              marginHorizontal: 10,
              opacity,
              transform: [{scale}],
            }}
          />
        );
      })}
    </View>
  );
};

const BackDrop = ({scrollX}: AnimatedProps) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs,
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor,
        },
      ]}
    />
  );
};

const Square = ({scrollX}: AnimatedProps) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs,
  });

  const YOLO = Animated.modulo(Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)), 1);

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '0deg', '35deg'],
  });

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });
  return (
    <Animated.View
      style={[
        {
          width: height,
          height: height,
          borderRadius: 86,
          backgroundColor: 'white',
          position: 'absolute',
          top: -height * 0.6,
          left: -height * 0.3,
          transform: [{rotate}, {translateX}],
        },
      ]}
    />
  );
};

export default () => {
  const scrollX = React.useRef<Animated.Value>(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {/* <Text style={{fontSize: 42}}>❤️</Text> */}

      <BackDrop scrollX={scrollX} />
      <Square scrollX={scrollX} />

      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        scrollEventThrottle={32}
        pagingEnabled
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {useNativeDriver: false})}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
        renderItem={({item, index}) => {
          return (
            <View style={{width, alignItems: 'center', padding: 20}}>
              <View style={{flex: 0.7}}>
                <Image
                  source={{uri: item.image}}
                  style={{
                    width: width / 2,
                    height: height / 2,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={{flex: 0.3}}>
                <Text style={{fontWeight: '800', fontSize: 24, marginBottom: 10, color: 'white'}}>{item.title}</Text>
                <Text style={{fontWeight: '300', color: 'white'}}>{item.description}</Text>
              </View>
            </View>
          );
        }}
      />
      {/* Indicator */}
      <Indicator scrollX={scrollX} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
