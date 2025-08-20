export enum HomeFeedUiStateOptions {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export type HomeFeedUiStateType = 
    { type: HomeFeedUiStateOptions.IDLE } | 
    { type: HomeFeedUiStateOptions.LOADING } | 
    { type: HomeFeedUiStateOptions.SUCCESS, dataSize: number } | 
    { 
        type: HomeFeedUiStateOptions.ERROR,
        error: string,
    };

export const HomeFeedUiState = {
    Idle: (): HomeFeedUiStateType => ({
        type: HomeFeedUiStateOptions.IDLE,
    }),
    Loading: (): HomeFeedUiStateType => ({
        type: HomeFeedUiStateOptions.LOADING,
    }),
    Success: (dataSize: number): HomeFeedUiStateType => ({
        type: HomeFeedUiStateOptions.SUCCESS,
        dataSize,
    }),
    Error: (error: string): HomeFeedUiStateType => ({
        type: HomeFeedUiStateOptions.ERROR,
        error,
    }),
}
