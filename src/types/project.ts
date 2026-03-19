export type WorkSection = "video-editing" | "sound-design";

export type VideoCategory = "Short-form" | "Horizontal";

export type SoundCategory =
  | "Sound Design"
  | "Soundtrack"
  | "Mixing";

export type Category = VideoCategory | SoundCategory;

export interface Project {
  slug: string;
  title: string;
  section: WorkSection;
  category: Category;
  description: string;
  videoSrc: string;
  youtubeId?: string;
  vimeoId?: string;
  instagramId?: string;
  thumbnailSrc: string;
  aspectRatio: number;
  date: string;
  client?: string;
  featured: boolean;
}
