import axios from 'axios';
import { APIConfig } from './APIConfig';

export const MediaAPI = {
    /**
     * Fetches a collection by ID with optional pagination
     * @param collectionId - The ID of the collection to fetch
     * @param params - Optional pagination parameters
     * @returns Promise containing the collection data
     */
    getAPI: async <T> (url: string): Promise<T> => {
        try {
            console.log('GET API fom URL - ', url);
            const response = await axios.get<T>(
                url || `${APIConfig.baseURL}/collections/vog4mjt`,
                { 
                    method: 'GET',
                    headers: APIConfig.headers,
                }
            );
            return response.data;
        } catch (error) {
            // Rethrow the original error to allow callers to inspect it,
            // for example, to check for axios-specific properties like `error.response.status`.
            throw error;
        }
    },
};
