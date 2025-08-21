import { StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Media, MediaType } from '../../../../models/CollectionDTO';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MediaCard from '../../../components/MediaCard';
import { HomeFeedViewModel } from '../HomeFeedViewModel';
import { HomeFeedUiEvent } from '../HomeFeedUiEvent';
import { useHeaderHeight } from '@react-navigation/elements';

const HomeFeedSuccessUi = (props: any) => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  var homeViewModel = props.params.viewModel as HomeFeedViewModel; 

  const [playingIndex, setPlayingIndex] = useState<number>(-1);
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 100 }; 
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    onChangedViewableItems(
      viewableItems, 
      playingIndex, 
      homeViewModel,
      (i) => { 
        console.log("Setting playing index to: ", i);
        setPlayingIndex(i) 
      }, 
      (i) => { return i >= ((props.params.data as Media[]).length - 3) }
    );
  })
  useEffect(() => {
    console.log("Playing index changed to: ", playingIndex);
  }, [playingIndex]);

  return (
    <View style={styles.container}> 
      <FlashList style={styles.mList}
          horizontal={false}
          data={(props.params.data as Media[]) || []}
          keyExtractor={(item, index) => index.toString() + item.id.toString() }
          contentContainerStyle={{ paddingTop: headerHeight, paddingBottom: insets.bottom }}
          renderItem = { item => 
            <MediaCard params={{ item, homeViewModel, playingIndex }}/>
          }
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged.current}
          viewabilityConfig={viewabilityConfig}
          onScroll={() => {}}
        />
    </View>
  )
}

const onChangedViewableItems = (
  viewableItems: any[],
  playingIndex: number,
  homeViewModel: HomeFeedViewModel,
  setPlayingIndex: (index: number) => void,
  reachedLoadMoreThreshold: (index: number) => boolean,
) => {
  if (viewableItems.length > 0) {
    if (reachedLoadMoreThreshold(
      (viewableItems[viewableItems.length - 1].index as number)
    )) homeViewModel.uiEvent(HomeFeedUiEvent.LoadMoreMedia());

    let firstItem = viewableItems.find(item => item.item.type === MediaType.Video);
    firstItem = firstItem || null;
    console.log("first video: - ", firstItem, " visible items - ", viewableItems);
  
    switch (true) {
        case firstItem !== null:
          setPlayingIndex(firstItem.index as number);
          break;
        case (viewableItems[0].index as number) > playingIndex:
          setPlayingIndex(-1);
          break;
        case (viewableItems[viewableItems.length - 1].index as number) < playingIndex:
          setPlayingIndex(-1);
          break;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mList: {
    paddingHorizontal: 18,
    position: 'absolute', 
    top: 0, 
    bottom: 0, 
    left: 0, 
    right: 0,
  }
});

export default HomeFeedSuccessUi
