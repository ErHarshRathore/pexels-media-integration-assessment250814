export type ResponseCategory<T> =
    | {
            state: 'SUCCESS';
            data: T;
            responseCode: number;
        }
    | {
            state: 'FAILURE';
            cachedData?: T | null;
            errorCode: number;
            errorMessage: string;
        }
    | {
            state: 'LOADING';
            cachedData?: T | null;
        };

// Helper functions to create response states
export const ResponseStates = {
    success: <T>(data: T, responseCode: number): ResponseCategory<T> => ({
        state: 'SUCCESS',
        data,
        responseCode,
    }),

    failure: <T>(errorCode: number, errorMessage: string, cachedData?: T | null): ResponseCategory<T> => ({
        state: 'FAILURE',
        errorCode,
        errorMessage,
        cachedData,
    }),

    loading: <T>(cachedData?: T | null): ResponseCategory<T> => ({
        state: 'LOADING',
        cachedData,
    }),
};
