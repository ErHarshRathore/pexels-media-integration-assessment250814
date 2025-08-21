import { StyleSheet, Image, View, Dimensions } from 'react-native'
import { Media, MediaType } from '../../models/CollectionDTO';
import Video from 'react-native-video';
import { Text } from '@react-navigation/elements';

const MediaGalleryItem = (props: any) => {
    const windowSize = Dimensions.get('window');
    const media = props.params.item.item as (Media | null);
    const isPlaybackIndex = props.params.currentIndex === props.params.item.index

    return (
        <View style={ [styles.root, { height: windowSize.height}] } >
            {
                (media?.type === MediaType.Video) ? <Video 
                    source={{ uri: findHighestResolutionVideo(media) }}
                    poster={ media?.image || media?.video_pictures?.[0]?.picture }
                    style={[styles.mediaItem]}
                    resizeMode='contain'
                    repeat={false}
                    controls={true}
                    onError={ (error) => console.log(error) }
                    paused={!isPlaybackIndex}
                /> : <Image 
                    src={ findHighestResolutionImage(media) } 
                    alt={ media?.alt }
                    style={[ styles.mediaItem]}
                    resizeMode='contain'
                />
            }
            <Text style={styles.debugMsg}> index: {props.params.item.index} ({media?.type}) </Text>
        </View>
    );
}

function findHighestResolutionVideo(media: Media): string {
    var currentMax = 0;
    var res = '';

    media.video_files?.forEach( element => {
        if (element.size > currentMax) {
            currentMax = element.size
            res = element.link || res
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

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
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
        backgroundColor: '#0f0',
        padding: 2,
    }
})

export default MediaGalleryItem
