import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MediaGalleryItem from '../../components/MediaGalleryItem';
import { Media } from '../../../models/CollectionDTO';
import { FlashList } from '@shopify/flash-list';
import { useState, useRef } from 'react';

export type  MEDIA_GALLERY_SCREEN_NAME = 'VerticalPageGallery';
export const MEDIA_GALLERY_SCREEN_NAME = 'VerticalPageGallery';

const VerticalPagerGallery = () => {
    const navParams = useRoute().params as any;
    const mediaCollection = navParams.mediaCollection as Media[]
    const [currentIndex, setCurrentIndex] = useState(0);

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
        if (viewableItems.length > 0) setCurrentIndex(viewableItems[0].index);
    });

    return (
        <View style={styles.container}>
            <FlashList
                data={ mediaCollection }
                style={styles.pagerView}
                renderItem={ item => <MediaGalleryItem params={{item, currentIndex}} /> }
                keyExtractor={ (item, index) => index.toString() + item.id.toString() }
                horizontal={ false }
                initialScrollIndex={ navParams.params?.index }
                pagingEnabled={ true } 
                decelerationRate='fast'
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 70 }}
            />

            {/* <Pressable 
                onPress={() => navigator.goBack()}
                style={[styles.backButton, { top: insets.top + 10 }]}
            >
                <Text style={styles.backButtonText}>‹</Text>
            </Pressable>             */}
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
        width: 36,
        height: 36,
        left: 12,
        borderRadius: 8,
        backgroundColor: '#fff8',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50,
    },
    backButtonText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#07a',
    },
    backgroundVideo: {
        flex: 1,
        position: 'absolute',
        backgroundColor: '#000',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    pagerView: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
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
