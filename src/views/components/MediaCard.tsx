import { Text, StyleSheet, Image, Pressable, View } from 'react-native'
import { Media, MediaType } from '../../models/CollectionDTO';
import { HomeFeedViewModel } from '../screens/HomeFeed/HomeFeedViewModel';
import { HomeFeedUiEvent } from '../screens/HomeFeed/HomeFeedUiEvent';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { HomeFeedNavigationProp } from '../../navigation/AppNavGraph';
import Video from 'react-native-video';
import { useEffect, useState } from 'react';

const MediaCard = (props: any) => {
    const navigator = useNavigation<HomeFeedNavigationProp>();
    const isMediaFocused = useIsFocused();
    const media = props.params.item.item as (Media | null);
    const homeViewModel = props.params.homeViewModel as HomeFeedViewModel;
    const [playbackState, setPlaybackState] = useState(0);

    const isPlaybackIndex = props.params.playingIndex === props.params.item.index

    useEffect(() => { 
        if (media?.type === MediaType.Video) console.log(
            "Loading state: ", playbackState, 
            " for ", props.params.item.index, 
            " isPlaybackIndex? ", isPlaybackIndex,
        );
    }, [playbackState, isPlaybackIndex])

    // useEffect(() => { 
    //     if (!isPlaybackIndex) setPlaybackState(0);
    // }, [isPlaybackIndex])

    return (
        <Pressable onPress={ () => {
            homeViewModel.uiEvent(HomeFeedUiEvent.NavigateToGallery(navigator));
        }}>
            <View style={ [styles.cardRoot, { aspectRatio: (media?.width ?? 16) / (media?.height ?? 9)}] }>
            {
                isPlaybackIndex ? <Video 
                    source={{ uri: (media?.video_files?.find((it) => it.quality === 'sd'))?.link || '' }}
                    style={[styles.mediaItem, styles.mediaVideo]}
                    resizeMode='cover'
                    repeat={true}
                    controls={false}
                    paused={!isMediaFocused}
                    onLoadStart={ () => setPlaybackState(1) }
                    onReadyForDisplay={ () => setPlaybackState(2) }
                    onLoad={ () => setPlaybackState(3) }
                    onPlaybackStateChanged={ (state) => {
                        setPlaybackState(state.isPlaying? 4 : 5) 
                    }}
                /> : <View></View>
            }
            {
                (!(isPlaybackIndex && playbackState > 2)) ? <Image 
                    src={ media?.src?.medium || media?.image } 
                    style={[ styles.mediaItem, styles.mediaImage]}
                    resizeMode='cover'
                />: <View></View>
            }
            </View>
            <Text style={styles.authorName}>{ (props.params.item.index) + ' - ' + (media?.photographer || media?.user?.name) + ' (' + media?.type +')'}</Text>
        </Pressable>
    );
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
        backgroundColor: '#e0e0e0',
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
