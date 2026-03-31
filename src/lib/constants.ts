import { VideoCategory, SoundCategory, WorkSection } from "@/types/project";

export const SITE = {
  name: "Leonardo Ceballos",
  title: "Leonardo Ceballos — Multidisciplinary Creative",
  description:
    "Creative technologist. Video editing, sound design, motion, and code.",
  url: "https://leonardostroka.com",
} as const;

export const NAV_LINKS = [
  { label: "Video", href: "#video-work" },
  { label: "Sound", href: "#sound-work" },
  { label: "Autoral", href: "#autoral" },
  { label: "Dev", href: "#dev-work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const VIDEO_CATEGORIES: readonly VideoCategory[] = [
  "Horizontal",
  "Short-form",
] as const;

export const SOUND_CATEGORIES: readonly SoundCategory[] = [
  "Sound Design",
  "Soundtrack",
  "Mixing",
] as const;

export const SECTIONS: readonly { key: WorkSection; label: string; href: string }[] = [
  { key: "video-editing", label: "Video Editing", href: "/" },
  { key: "sound-design", label: "Sound Design", href: "/sound-design" },
] as const;
