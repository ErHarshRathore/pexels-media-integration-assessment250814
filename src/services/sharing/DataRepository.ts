import { CollectionDTO } from "../../models/CollectionDTO";
import { MediaAPI } from "../api/MediaAPI";
import { MediaCache } from "../cache/MediaCache";
import { ResponseCategory, ResponseStates } from "./ResponseCategory";
import { Observable, Subscriber } from 'rxjs';

export function fetchMedia(
    shouldCache: boolean = false,
    mediaId: string = 'vog4mjt',
    queryParams: Record<string, any> = {}
): Observable<ResponseCategory<CollectionDTO>> {
    return new Observable<ResponseCategory<CollectionDTO>>( subscriber => {
        dataProducer(shouldCache, mediaId, queryParams, subscriber);
    });
}

async function dataProducer(
    shouldCache: boolean = false,
    mediaId: string = 'vog4mjt',
    queryParams: Record<string, any> = {},
    subscriber: Subscriber<ResponseCategory<CollectionDTO>>,
) {
    const cacheKey = mediaId + (queryParams?.page ? `_page_${queryParams.page}` : '');
    let cachedData: CollectionDTO | null = null;
    if (shouldCache) {
        cachedData = await MediaCache.get<CollectionDTO>(cacheKey);
    }
    subscriber.next(ResponseStates.loading(cachedData));
    console.log('MediaAPI.getCollection loading');

    await MediaAPI.getCollection(mediaId, queryParams)
        .then(data => {
            console.log('MediaAPI.getCollection', data);
            const response = ResponseStates.success(data, 200);
            if (shouldCache) {
                MediaCache.set(cacheKey, data);
            }
            subscriber.next(response);
            subscriber.complete();
        })
        .catch(error => {
            console.log('MediaAPI.getCollection', error);
            const response = ResponseStates.failure(error.status || 500, error.code || "Unknown Error", cachedData);
            subscriber.next(response);
            subscriber.complete();
        });
}
