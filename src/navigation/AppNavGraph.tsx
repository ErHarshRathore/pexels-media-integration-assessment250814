import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeFeed, { HOME_FEED_SCREEN_NAME } from '../views/screens/HomeFeed/_layout';
import VerticalPagerGallery, { MEDIA_GALLERY_SCREEN_NAME } from '../views/screens/MediaGallery/_layout';
import { Media } from '../models/CollectionDTO';

export type RootStackParamList = {
    HomeFeed: any;
    VerticalPageGallery: {
        mediaCollection: Media[],
        params: any,
    };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavGraph = () => {
    return (
        <Stack.Navigator
            initialRouteName={ HOME_FEED_SCREEN_NAME }
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right'
            }}
        >
            <Stack.Screen 
                name={ HOME_FEED_SCREEN_NAME } 
                component={HomeFeed}
                options={{
                    title: 'Home Feed',
                    headerShown: true,
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#ffffff77',
                    },
                    headerBackButtonDisplayMode: 'minimal',
                    orientation: 'portrait',
                }}
            />
            <Stack.Screen 
                name={ MEDIA_GALLERY_SCREEN_NAME } 
                component={VerticalPagerGallery} 
                options={{ 
                    title: 'Gallery',
                    headerShown: true,
                    headerTitleAlign: 'left',
                    headerStyle: {
                        backgroundColor: '#ffffff77'
                    },
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
};

export default AppNavGraph;
