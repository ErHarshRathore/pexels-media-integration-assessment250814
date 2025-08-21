import { HomeFeedNavigationProp } from "../../../navigation/NavigationProps"

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
        navigator: HomeFeedNavigationProp,
        params?: any,
    }

export const HomeFeedUiEvent = {
    InitializeFeed: (): HomeFeedUiEventType => ({
        type: HomeFeedUiEventOptions.ON_INITIALIZE_FEED
    }),

    LoadMoreMedia: (): HomeFeedUiEventType => ({
        type: HomeFeedUiEventOptions.LOAD_MORE_MEDIA,
    }),

    NavigateToGallery: (
        navigator: HomeFeedNavigationProp, 
        params?: any,
    ): HomeFeedUiEventType => ({
        type: HomeFeedUiEventOptions.NAVIGATE_TO_GALLERY,
        navigator,
        params,
    }),
}
