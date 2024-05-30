import type { ImageMetadata } from "astro";

export const PHOTOS = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/img/photos/*.{webp,jpeg,jpg,png,gif,JPEG,JPG}"
);

export const PATHS = Object.keys(PHOTOS);