import { Text, StyleSheet, View, Button } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { HomeFeedViewModel } from './HomeFeedViewModel';
import { HomeFeedUiEvent } from './HomeFeedUiEvent';
import { HomeFeedUiState, HomeFeedUiStateOptions, HomeFeedUiStateType } from './HomeFeedUiState';
import HomeFeedSuccessUi from './Ui/HomeFeedSuccessUi';
import { Media } from '../../../models/CollectionDTO';

const HomeFeed = () => {
    const homeViewModel = useRef(new HomeFeedViewModel());
    const [collectionData, setCollectionData] = useState<Media[]>(homeViewModel.current.mediaCollection)
    const [collectionState, setCollectionState] = useState<HomeFeedUiStateType>(HomeFeedUiState.Idle());

    useEffect(() => { homeViewModel.current.uiEvent(HomeFeedUiEvent.InitializeFeed()) }, [ true ]);

    useEffect(() => {
        homeViewModel.current.sideEffectFlow.subscribe({
            next: (newState) => { 
                if (newState.type === HomeFeedUiStateOptions.SUCCESS) {
                    setCollectionData(homeViewModel.current.mediaCollection)
                    setCollectionState(newState);
                    console.log("New state: ", newState, (newState as any).dataSize)
                } else if (collectionData.length === 0) setCollectionState(newState);
            },
        });
    }, [ homeViewModel.current ]);

    if (collectionData.length === 0) switch (collectionState.type) {
        case HomeFeedUiStateOptions.IDLE || HomeFeedUiStateOptions.LOADING: return (
            <View style={styles.container}>
                <Text style={styles.title}>Loading...</Text>
            </View>
        );
        case HomeFeedUiStateOptions.ERROR: return (
            <View style={styles.container}>
                <Text style={styles.error}>Error: {collectionState.error}</Text>
                <Button 
                    title='retry'
                    onPress={() => homeViewModel.current.uiEvent(HomeFeedUiEvent.InitializeFeed())} />
            </View>
        );     
    };

    return (
        <HomeFeedSuccessUi params={{ 
            data: collectionData, 
            viewModel: homeViewModel.current 
        }} />
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    error: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
        color: '#f00',
    },
});

export default HomeFeed;
