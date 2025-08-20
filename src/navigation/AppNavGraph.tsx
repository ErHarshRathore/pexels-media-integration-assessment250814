import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import HomeFeed from '../views/screens/HomeFeed/_layout';
import VerticalPagerGallery from '../views/screens/MediaGallery/_layout';

// Import your screens (you'll need to create these)

// Define the types for our route parameters
export type RootStackParamList = {
    HomeFeed: any;
    VerticalPageGallery: any;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


export type HomeFeedNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeFeed'>;

const AppNavGraph = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomeFeed"
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right'
            }}
        >
            <Stack.Screen 
                name="HomeFeed" 
                component={HomeFeed} 
            />
            <Stack.Screen 
                name="VerticalPageGallery" 
                component={VerticalPagerGallery} 
            />
        </Stack.Navigator>
    );
};

export default AppNavGraph;
