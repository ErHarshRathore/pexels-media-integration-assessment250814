import AsyncStorage from '@react-native-async-storage/async-storage';

export class MediaCache {
    private static readonly PREFIX = '@media_cache:';

    static async set(key: string, data: any): Promise<void> {
        try {
            const jsonValue = JSON.stringify(data);
            await AsyncStorage.setItem(this.PREFIX + key, jsonValue);
        } catch (error) {
            console.error('Error saving to cache:', error);
        }
    }

    static async get<T>(key: string): Promise<T | null> {
        try {
            const jsonValue = await AsyncStorage.getItem(this.PREFIX + key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (error) {
            console.error('Error reading from cache:', error);
            return null;
        }
    }
}

