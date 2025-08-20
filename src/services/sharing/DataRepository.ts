import { CollectionDTO } from "../../models/CollectionDTO";
import { APIConfig } from "../api/APIConfig";
import { MediaAPI } from "../api/MediaAPI";
import { MediaCache } from "../cache/MediaCache";
import { ResponseCategory, ResponseStates } from "./ResponseCategory";
import { Observable, Subscriber } from 'rxjs';

export function fetchMedia(
    shouldCache: boolean = false,
    url: string = `${APIConfig.baseURL}/collections/vog4mjt`,
): Observable<ResponseCategory<CollectionDTO>> {
    return new Observable<ResponseCategory<CollectionDTO>>( subscriber => {
        dataProducer(shouldCache, url, subscriber);
    });
}

async function dataProducer(
    shouldCache: boolean,
    url: string,
    subscriber: Subscriber<ResponseCategory<CollectionDTO>>,
) {
    let cachedData: CollectionDTO | null = null;
    if (shouldCache) {
        cachedData = await MediaCache.get<CollectionDTO>(url);
    }
    subscriber.next(ResponseStates.loading(cachedData));
    console.log('MediaAPI.getCollection loading');

    await MediaAPI.getAPI<CollectionDTO>(url)
        .then(data => {
            console.log('MediaAPI.getCollection', data);
            const response = ResponseStates.success(data, 200);
            if (shouldCache) {
                MediaCache.set(url, data);
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
