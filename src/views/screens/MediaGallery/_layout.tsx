import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/AppNavGraph';
import { Video } from 'react-native-video';

type GalleryNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VerticalPageGallery'>;

const VerticalPagerGallery = () => {
    const navigation = useNavigation<GalleryNavigationProp>();

    return (
        <View style={styles.container}>
            <Video 
                source={{ uri: 'https://videos.pexels.com/video-files/2324274/2324274-sd_640_360_25fps.mp4' }}
                style={styles.backgroundVideo}
                resizeMode="cover"
                repeat={true}
                paused={false} // Starts playing automatically
            />
            <Text style={styles.title}>Gallery Screen</Text>
            <Pressable 
                onPress={() => navigation.goBack()}
                style={styles.backButton}
            >
                <Text style={styles.buttonText}>Go Back</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    backButton: {
        padding: 15,
        backgroundColor: 'silver',
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'gold',
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
});

export default VerticalPagerGallery;
