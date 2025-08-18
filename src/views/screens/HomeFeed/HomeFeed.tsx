import { View, Text, StyleSheet, StatusBar, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/AppNavGraph';
import React, { useEffect, useState } from 'react';
import { fetchMedia } from '../../../services/sharing/DataRepository';

type HomeFeedNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeFeed'>;

const HomeFeed = () => {
    var [msg, setMsg] = useState("idle");
    useEffect(() => {
        fetchMedia(true).subscribe({
            next: (response) => {
                switch (response.state) {
                    case "LOADING":
                        console.log('Loading media...');
                        setMsg('Loading media...\n'+JSON.stringify(response.cachedData));
                        break;
                    case "SUCCESS":
                        console.log('Media loaded successfully');
                        setMsg('Media loaded successfully\n' + JSON.stringify(response.data));
                        break;
                    case "FAILURE":
                        console.log('Failed to load media\n' + response.errorMessage);
                        setMsg('Failed to load media');
                        break;
                }
                console.log('Fetched media: ', response);
            },
            error: (error) => {
                console.log('Error fetching media:', error);
            }
        });
        console.log('HomeFeed component mounted');
    }, []);

    const navigation = useNavigation<HomeFeedNavigationProp>();

    const handleNavigateToGallery = () => {
        navigation.navigate('VerticalPageGallery');
    };

    return (
        <ScrollView contentContainerStyle={styles.container} >
            <Text style={styles.title}>Navigate to Gallery</Text>
            <Pressable onPress={handleNavigateToGallery} style={styles.button}>
                <Text style={styles.subtitle}>open gallery</Text>
            </Pressable>
            <Text style={styles.body}>{msg}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        padding: 20,
        backgroundColor: '#00ff00',
        borderRadius: 10,
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    body: {
        fontSize: 13,
        fontWeight: '200',
        marginTop: 20,
        color: '#444',
        maxHeight: 200,
    },
});

export default HomeFeed;
