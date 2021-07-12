/**
 * @format
 */

import React from 'react';
import {StatusBar, FlatList, Image, Text, View, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {PexelsSearch, Photo} from './types';

const {width, height} = Dimensions.get('screen');

const API_KEY = '563492ad6f917000010000014547460c4596481394522db6603cb880';
const API_URL = 'https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20';
const IMAGE_SIZE: number = 80;
const SPACING: number = 10;

const fetchImagesFromPexels = async (): Promise<Array<Photo>> => {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: API_KEY,
    },
  });

  const {photos}: PexelsSearch = await res.json();
  return photos;
};

export default () => {
  const [images, setImages] = React.useState<Array<Photo> | null>(null);

  React.useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchImagesFromPexels();
      setImages(images);
    };

    fetchImages();
  }, []);

  const topRef = React.useRef<FlatList<Photo>>(null);
  const thumbRef = React.useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const scrollActiveIndex = (index: number) => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });

    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  if (!images) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        ref={topRef}
        data={images}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          scrollActiveIndex(Math.floor(e.nativeEvent.contentOffset.x / width));
        }}
        renderItem={({item}) => {
          return (
            <View style={{width, height}}>
              <Image source={{uri: item.src.portrait}} style={[StyleSheet.absoluteFillObject]} />
            </View>
          );
        }}
      />

      <FlatList
        ref={thumbRef}
        data={images}
        style={{position: 'absolute', bottom: IMAGE_SIZE}}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        contentContainerStyle={{paddingHorizontal: SPACING}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => scrollActiveIndex(index)}>
              <Image
                source={{uri: item.src.tiny}}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: 12,
                  marginStart: SPACING,
                  borderWidth: 2,
                  borderColor: activeIndex === index ? '#FFF' : 'transparent',
                }}
              />
            </TouchableOpacity>
          );
        }}
      />

      <StatusBar hidden />
    </View>
  );
};
