import { HomeFeedNavigationProp } from "../../../navigation/AppNavGraph";

export enum HomeFeedUiEventOptions {
    ON_INITIALIZE_FEED = 'ON_INITIALIZE_FEED',
    NAVIGATE_TO_GALLERY = 'NAVIGATE_TO_GALLERY',
    LOAD_MORE_MEDIA = 'LOAD_MORE_MEDIA'
}

export type HomeFeedUiEventType = 
    { type: HomeFeedUiEventOptions.ON_INITIALIZE_FEED } | 
    { type: HomeFeedUiEventOptions.LOAD_MORE_MEDIA} |
    { 
        type: HomeFeedUiEventOptions.NAVIGATE_TO_GALLERY 
        navigator: HomeFeedNavigationProp
    }

export const HomeFeedUiEvent = {
    InitializeFeed: (): HomeFeedUiEventType => ({
        type: HomeFeedUiEventOptions.ON_INITIALIZE_FEED
    }),

    NavigateToGallery: (navigator: HomeFeedNavigationProp): HomeFeedUiEventType => ({
        type: HomeFeedUiEventOptions.NAVIGATE_TO_GALLERY,
        navigator,
    }),

    LoadMoreMedia: (): HomeFeedUiEventType => ({
        type: HomeFeedUiEventOptions.LOAD_MORE_MEDIA,
    }),
}
