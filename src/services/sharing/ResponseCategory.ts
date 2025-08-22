export enum ResponseCategoryOptions {
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
    LOADING = 'LOADING',
}

export type ResponseCategory<T> =
    {
        state: ResponseCategoryOptions.SUCCESS;
        data: T;
        responseCode: number;
    } | {
        state: ResponseCategoryOptions.FAILURE;
        cachedData?: T | null;
        errorCode: number;
        errorMessage: string;
    } | {
        state: ResponseCategoryOptions.LOADING;
        cachedData?: T | null;
    };

// Helper functions to create response states
export const ResponseStates = {
    success: <T>(data: T, responseCode: number): ResponseCategory<T> => ({
        state: ResponseCategoryOptions.SUCCESS,
        data,
        responseCode,
    }),

    failure: <T>(errorCode: number, errorMessage: string, cachedData?: T | null): ResponseCategory<T> => ({
        state: ResponseCategoryOptions.FAILURE,
        errorCode,
        errorMessage,
        cachedData,
    }),

    loading: <T>(cachedData?: T | null): ResponseCategory<T> => ({
        state: ResponseCategoryOptions.LOADING,
        cachedData,
    }),
};
