export interface CollectionDTO {
  page: number;
  per_page: number;
  media: Media[];
  total_results: number;
  next_page: string;
  prev_page: string;
  id: string;
}

export interface Media {
  type: MediaType;
  id: number;
  width: number;
  height: number;
  url: string;
  photographer?: string;
  photographer_url?: string;
  photographer_id?: number;
  avg_color: null | string;
  src?: Src;
  liked?: boolean;
  alt?: string;
  duration?: number;
  full_res?: null;
  tags?: any[];
  image?: string;
  user?: User;
  video_files?: VideoFile[];
  video_pictures?: VideoPicture[];
} 

export enum MediaType {
  Photo = "Photo",
  Video = "Video",
}

interface VideoPicture {
  id: number;
  nr: number;
  picture: string;
}

interface VideoFile {
  id: number;
  quality: string;
  file_type: string;
  width: number;
  height: number;
  fps: number;
  link: string;
  size: number;
}

interface User {
  id: number;
  name: string;
  url: string;
}

interface Src {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}
