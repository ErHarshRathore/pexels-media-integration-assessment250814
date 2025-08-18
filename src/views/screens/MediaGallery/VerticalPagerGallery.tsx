import { View, Text, StyleSheet, StatusBar, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/AppNavGraph';

type GalleryNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VerticalPageGallery'>;

const VerticalPagerGallery = () => {
    const navigation = useNavigation<GalleryNavigationProp>();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="default" />
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
});

export default VerticalPagerGallery;
