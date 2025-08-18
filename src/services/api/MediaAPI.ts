import axios from 'axios';
import { APIConfig } from './APIConfig';
import { CollectionDTO } from '../../models/CollectionDTO';

interface PaginationParams {
    page?: number;
    per_page?: number;
}

export const MediaAPI = {
    /**
     * Fetches a collection by ID with optional pagination
     * @param collectionId - The ID of the collection to fetch
     * @param params - Optional pagination parameters
     * @returns Promise containing the collection data
     */
    getCollection: async (
        collectionId: string,
        params?: PaginationParams
    ): Promise<CollectionDTO> => {
        try {
            const response = await axios.get<CollectionDTO>(
                `${APIConfig.baseURL}/collections/${collectionId}`,
                {
                    headers: APIConfig.headers,
                    params: {
                        page: params?.page || 1,
                        per_page: params?.per_page || 15,
                    },
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
