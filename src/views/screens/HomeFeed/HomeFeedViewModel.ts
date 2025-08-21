import { MVIViewModel } from "../../../foundation/MVI/MVIViewModel";
import { HomeFeedUiEventOptions, HomeFeedUiEventType } from "./HomeFeedUiEvent";
import { ResponseCategoryOptions } from "../../../services/sharing/ResponseCategory";
import { fetchMedia } from "../../../services/sharing/DataRepository";
import { HomeFeedUiState, HomeFeedUiStateType } from "./HomeFeedUiState";
import { Observable, Subject, share } from "rxjs";
import { Media } from "../../../models/CollectionDTO";
import { MEDIA_GALLERY_SCREEN_NAME } from "../MediaGallery/_layout";

export class HomeFeedViewModel implements MVIViewModel<
    HomeFeedUiEventType,
    HomeFeedUiStateType
> {
    private fetchingMedia: boolean = false;

    private nextPageUrl: string | null = null;

    mediaCollection: Media[]= [];

    private _sideEffectFlow = new Subject<HomeFeedUiStateType>();
    sideEffectFlow: Observable<HomeFeedUiStateType> = this._sideEffectFlow.pipe(share());

    async uiEvent(intent: HomeFeedUiEventType): Promise<void> {
        console.log("HomeFeedViewModel.uiEvent called with intent:", intent);

        switch (intent.type) {
            case HomeFeedUiEventOptions.LOAD_MORE_MEDIA:
                if(!this.fetchingMedia) this.fetchNextPage();
                break;
            case HomeFeedUiEventOptions.ON_INITIALIZE_FEED: 
                this.fetchNextPage(true);
                break;
            case HomeFeedUiEventOptions.NAVIGATE_TO_GALLERY:
                intent.navigator.navigate(
                    MEDIA_GALLERY_SCREEN_NAME, 
                    { mediaCollection: this.mediaCollection, params: intent.params }
                );
                break;
        }
    }

    private async fetchNextPage(shouldCache: boolean = false): Promise<void> {
        if (this.fetchingMedia) return;
        
        console.log('Fetching next page with URL: ', this.nextPageUrl);
        this.fetchingMedia = true;
    
        (
            (this.nextPageUrl === null)
                ? fetchMedia(shouldCache) 
                : fetchMedia(shouldCache, this.nextPageUrl)
        ).subscribe({
            next: (response) => {
                switch (response.state) {
                    case ResponseCategoryOptions.LOADING:
                        if (response.cachedData) {
                            this.mediaCollection = this.mediaCollection.concat(response.cachedData.media);
                            this._sideEffectFlow.next(HomeFeedUiState.Success(this.mediaCollection.length));
                        } else {
                            this._sideEffectFlow.next(HomeFeedUiState.Loading());
                        }
                        break;
                    case ResponseCategoryOptions.SUCCESS:
                        if ((response.data?.media?.length || 0) > 0) {
                            this.mediaCollection = this.mediaCollection.concat(response.data.media);
                            this._sideEffectFlow.next(HomeFeedUiState.Success(this.mediaCollection.length));
                        } else {
                            this._sideEffectFlow.next(HomeFeedUiState.Error("No media found"));
                        }
                        this.nextPageUrl = response.data?.next_page;
                        break;
                    case ResponseCategoryOptions.FAILURE:
                        this._sideEffectFlow.next(HomeFeedUiState.Error("Oops! Something went wrong\n" + response.errorMessage));
                        break;
                }
            },  
            error: (error) => {
                console.log('Error fetching media:', error);
            },
            complete: () => {
                this.fetchingMedia = false;
                console.log('Fetch complete');
            },
        });
    } 
}
