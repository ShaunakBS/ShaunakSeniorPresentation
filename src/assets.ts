// Looks up optional photos in src/assets/images by filename (without extension).
// Drop "website-screenshot.jpg" into that folder and it appears automatically.
const files = import.meta.glob('./assets/images/*.{jpg,jpeg,png,webp,avif,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const byName: Record<string, string> = {};
for (const [path, url] of Object.entries(files)) {
  const base = path.split('/').pop()!.replace(/\.[^.]+$/, '');
  byName[base.toLowerCase()] = url;
}

export function getImage(name: string): string | undefined {
  const key = name.split('/').pop()!.replace(/\.[^.]+$/, '').toLowerCase();
  return byName[key];
}

/** URL for files in /public that respects the configured Vite base path. */
export function publicUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
