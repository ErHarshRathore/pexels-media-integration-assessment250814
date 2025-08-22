import { Text, StyleSheet, Pressable, View } from 'react-native'
import { Media } from '../../models/CollectionDTO';
import { HomeFeedViewModel } from '../screens/HomeFeed/HomeFeedViewModel';
import { HomeFeedUiEvent } from '../screens/HomeFeed/HomeFeedUiEvent';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import { useEffect, useState } from 'react';
import { HomeFeedNavigationProp } from '../../navigation/NavigationProps';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { IS_ANDROID } from '../../constants/DeviceInfo';

const thumbnailDisapearingDelay = IS_ANDROID? 200 : 100;
const commonAnimationDuration = 400;

const MediaCard = (props: any) => {
    const navigator = useNavigation<HomeFeedNavigationProp>();
    const isMediaFocused = useIsFocused();
    const media = props.params.item.item as (Media | null);
    const homeViewModel = props.params.homeViewModel as HomeFeedViewModel;
    const [playbackState, setPlaybackState] = useState(0);
    const [mediaUri, setMediaUri] = useState<string[]>([]);
    const isPlaybackIndex = props.params.playingIndex === props.params.item.index

    useEffect(() => {
        // On MediaItem changed, reset the states
        setPlaybackState(0)
        setMediaUri([
            media?.src?.medium || media?.image || media?.video_pictures?.[0]?.picture || '',
            getVideoPreviewUrl(media as Media),
        ])
     }, [media, props.params.playingIndex])

    return (
        <Pressable onPress={ () => {
            homeViewModel.uiEvent(
                HomeFeedUiEvent.NavigateToGallery(navigator, props.params.item)
            );
        }}>
            <View style={[
                styles.cardRoot, 
                { aspectRatio: (media?.width ?? 16) / (media?.height ?? 9)}
            ]} >
                {
                    isPlaybackIndex && <Animated.View 
                        style={[styles.mediaItem, styles.mediaVideo]}
                        exiting={ FadeOut.duration(commonAnimationDuration) }
                        entering={ FadeIn.delay(50).duration(0) }
                        pointerEvents='none'
                    >
                        <Video 
                            style={styles.mediaVideo}
                            source={{ uri: mediaUri[1] }}
                            resizeMode='cover'
                            repeat={true}
                            controls={false}
                            paused={!(isPlaybackIndex && isMediaFocused)}
                            onLoadStart={ () => setPlaybackState(1) }
                            onLoad={ () => setPlaybackState(IS_ANDROID? 4 : 2) }
                            onReadyForDisplay={ () => setPlaybackState(3) }
                            onPlaybackStateChanged={ (state) => setPlaybackState(state.isPlaying? 4 : 5) }
                        />
                    </Animated.View>
                }
                {
                    (!isPlaybackIndex || playbackState < 3) && <Animated.Image 
                        src={ mediaUri[0] } 
                        style={[ styles.mediaItem, styles.mediaImage]}
                        resizeMode='cover'
                        exiting={ FadeOut.delay(thumbnailDisapearingDelay).duration(commonAnimationDuration) }
                        entering={ FadeIn.duration(commonAnimationDuration) }
                    />
                }
            </View>
            <Text style={styles.authorName}>{ (props.params.item.index) + ' - ' + (media?.photographer || media?.user?.name) + ' (' + media?.type +')'}</Text>
        </Pressable>
    );
}

const getVideoPreviewUrl = (media: Media): string => {
    var minSize = Infinity
    var res = ''

    media.video_files?.forEach( element => {
        if (element.size < minSize) {
            minSize = element.size
            res = element.link || res
        }
    });
    return res;
}

const styles = StyleSheet.create({
    cardRoot: {
        alignSelf: 'center',
        width: '100%',
        marginTop: 12,
        backgroundColor: 'transparent',
        borderRadius: 12,
    },
    mediaItem: {
        backgroundColor: '#d0d0d0',
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
    },
    mediaImage: {
        zIndex: 100,
    },
    mediaVideo: {
        zIndex: 90,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    authorName: {
        marginVertical: 6,
        color: '#333'
    },
})

export default MediaCard
