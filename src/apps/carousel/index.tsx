/**
 * @format
 */

import React from 'react';
import {StatusBar, Image, Animated, View, Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('screen');

const data = [
  'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
];

const IMAGE_WIDTH: number = width * 0.7;
const IMAGE_HEIGTH: number = IMAGE_WIDTH * 1.54;

export default () => {
  const scrollX = React.useRef<Animated.Value>(new Animated.Value(0)).current;
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <View style={[StyleSheet.absoluteFillObject]}>
        {data.map((image, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });

          return (
            <Animated.Image
              key={`image-${index}`}
              style={[StyleSheet.absoluteFillObject, {opacity}]}
              source={{uri: image}}
              blurRadius={50}
            />
          );
        })}
      </View>
      <Animated.FlatList
        data={data}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {useNativeDriver: true})}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View style={{width, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={{uri: item}}
                style={{
                  width: IMAGE_WIDTH,
                  height: IMAGE_HEIGTH,
                  borderRadius: 16,
                  shadowColor: '#000',
                  shadowOpacity: 0.5,
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowRadius: 20,
                }}
              />
            </View>
          );
        }}
      />
      <StatusBar hidden />
    </View>
  );
};
