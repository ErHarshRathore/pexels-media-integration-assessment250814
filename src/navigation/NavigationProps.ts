import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./AppNavGraph";
import { HOME_FEED_SCREEN_NAME } from "../views/screens/HomeFeed/_layout";
import { MEDIA_GALLERY_SCREEN_NAME } from "../views/screens/MediaGallery/_layout";

export type HomeFeedNavigationProp = NativeStackNavigationProp<
    RootStackParamList, 
    HOME_FEED_SCREEN_NAME
>;

export type GalleryNavigationProp = NativeStackNavigationProp<
    RootStackParamList, 
    MEDIA_GALLERY_SCREEN_NAME
>;
