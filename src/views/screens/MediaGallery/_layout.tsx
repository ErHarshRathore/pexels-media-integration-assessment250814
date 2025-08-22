import { View, StyleSheet, Pressable, Text, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MediaGalleryItem from '../../components/MediaGalleryItem';
import { Media } from '../../../models/CollectionDTO';
import { useState, useRef, useEffect } from 'react';
import { GalleryNavigationProp } from '../../../navigation/NavigationProps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList, FlashListRef } from '@shopify/flash-list';
import { delay } from 'rxjs';

export type  MEDIA_GALLERY_SCREEN_NAME = 'VerticalPageGallery';
export const MEDIA_GALLERY_SCREEN_NAME = 'VerticalPageGallery';

const VerticalPagerGallery = () => {
    const windowSize = Dimensions.get('window')
    const isLandscape = windowSize.width > windowSize.height;
    const navParams = useRoute().params as any;
    const navigator = useNavigation<GalleryNavigationProp>()
    const insets = useSafeAreaInsets();

    const pagerRef = useRef<FlashListRef<Media>>(null);

    const mediaCollection = navParams.mediaCollection as Media[]
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pagerHeight, setPagerHeight] = useState(0);

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    });

    useEffect(() => {
        const requestLayout = async () => {
            await delay(100);
            pagerRef.current?.clearLayoutCacheOnUpdate();
            pagerRef.current?.scrollToIndex({ animated: false, index: currentIndex });
        }
        requestLayout();
    }, [isLandscape])

    return (
        <View style={[styles.container]}>
            <FlashList
                ref={pagerRef}
                data={ mediaCollection }
                style={ styles.pagerView }
                renderItem={ item => <MediaGalleryItem params={{item, currentIndex, pagerHeight}} /> }
                contentInsetAdjustmentBehavior='scrollableAxes'
                keyExtractor={ (item, index) => index.toString() + item.id.toString() }
                horizontal={ false }
                initialScrollIndex={ navParams.params?.index }
                pagingEnabled={ true } 
                decelerationRate='fast'
                showsVerticalScrollIndicator={false}
                getItemType={ (item) => item.type }
                onLayout={(event) => setPagerHeight(event.nativeEvent.layout.height) }
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 70 }}
            />
            <Pressable 
                onPress={() => navigator.goBack()}
                style={[styles.backButton, { top: insets.top + 16 }]}
            >
                <Text style={styles.backButtonText}>✕</Text>
            </Pressable>          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    backButton: {
        position: 'absolute',
        width: 32,
        height: 32,
        right: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50,
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlignVertical: 'center'
    },
    pagerView: {
        position: 'absolute',
        top: 0, left: 0, bottom: 0, right: 0,
    },
    backgroundVideo: {
        flex: 1,
        position: 'absolute',
        backgroundColor: '#000',
        top: 0, bottom: 0, left: 0, right: 0,
    },
    pagerViewItem: {
        width: '100%', 
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#0005',
    }
});

export default VerticalPagerGallery;
