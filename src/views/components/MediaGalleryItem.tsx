import { StyleSheet, Image, View } from 'react-native'
import { Media, MediaType } from '../../models/CollectionDTO';
import Video, { VideoRef } from 'react-native-video';
import { Text } from '@react-navigation/elements';
import { useEffect, useRef, useState } from 'react';

const MediaGalleryItem = (props: any) => {
    const media = props.params.item.item as (Media | null);
    const [mediaUri, setMediaUri] = useState<MediaUri>();
    const [retryCount, setRetryCount] = useState(0);
    const isPlaybackIndex = props.params.currentIndex === props.params.item.index

    const handleError = (error: any) => {
        console.log('player playback failed:', error);

        if (retryCount < 2) { // MAX_RETRY_COUNT is 2, todo to make it a global const.
            setMediaUri({
                imageUri: mediaUri?.imageUri || '',
                videoUri: findHighestResolutionVideo(media, (retryCount === 0) ? 'hd' : 'sd')
            });
        }
        setRetryCount(prev => prev + 1);
    };

    useEffect(() => {
        setMediaUri({
            imageUri: findHighestResolutionImage(media),
            videoUri: findHighestResolutionVideo(media),
        })
        setRetryCount(0);
    }, [media])

    return (
        <View style={ [styles.root, {height: props.params.pagerHeight}]} >
            {
                (media?.type === MediaType.Video) ? <Video 
                    source={{ uri: mediaUri?.videoUri }}
                    // poster={ media?.image || media?.video_pictures?.[0]?.picture }
                    style={[styles.mediaItem]}
                    renderLoader={true}
                    resizeMode='contain'
                    repeat={false}
                    controls={true}
                    onError={ (error) => handleError(error) }
                    paused={!isPlaybackIndex}
                /> : <Image 
                    src={ mediaUri?.imageUri } 
                    alt={ media?.alt }
                    style={[ styles.mediaItem]}
                    resizeMode='contain'
                />
            }
            <Text style={styles.debugMsg}> index: {props.params.item.index} ({media?.type}) </Text>
        </View>
    );
}

function findHighestResolutionVideo(media: Media | null, quality: string = `uhd`): string {
    console.log("player retry for quality - ", quality)
    var currentMax = 0;
    var res = '';

    media?.video_files?.forEach( element => {
        if (element.size > currentMax) {
            currentMax = element.size
            if (res) res = (element.quality === quality) ? element.link || res : res
            else res = element.link
        }
    });
    return res;
}

function findHighestResolutionImage(media: Media | null): string {
    if (!media) return ''

    var res = media.src?.large2x 
        || media.src?.large 
        || media.src?.original 
        || media.src?.small
        || media.src?.tiny 
        || media.image 
        || '';

    return res;
}

type MediaUri = {
    imageUri: string;
    videoUri: string;
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    mediaItem: {
        width: '100%',
        height: `100%`,
    },
    debugMsg: {
        position:'absolute',
        right: 10,
        bottom: 100,
        backgroundColor: '#0d0',
        padding: 2,
    }
})

export default MediaGalleryItem
