import { getImage } from '../assets';

export interface SlotProps {
  /** File name in src/assets/images (extension optional), e.g. "about-personal" or "about-personal.jpg". */
  name: string;
  alt: string;
  /** Short label shown on the placeholder (and as a caption on the photo if showCaption is set). */
  label?: string;
  /** 'cover' fills and crops; 'contain' shows the whole image. */
  fit?: 'cover' | 'contain';
  /** CSS object-position, e.g. "center top" to keep faces in portrait crops. */
  position?: string;
  /** For logos and seals: show the real image on a white matte with padding so it is never cropped and stays legible. */
  matte?: boolean;
  /** Small caption on the bottom edge of a real photo (not shown on placeholders, which already show the label). */
  caption?: string;
  className?: string;
}

/** A photo slot. Shows the photo when the file exists, otherwise a clean dark placeholder with a white label. */
export function ImageSlot({ name, alt, label, fit = 'cover', position = 'center', matte = false, caption, className = '' }: SlotProps) {
  const src = getImage(name);
  return (
    <figure className={`relative m-0 overflow-hidden rounded-[4px] ${src ? (matte ? 'bg-white p-[12px]' : '') : 'border border-line bg-accent-light'} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`h-full w-full ${fit === 'cover' ? 'object-cover' : 'object-contain'}`}
          style={{ objectPosition: position }}
        />
      ) : (
        <div role="img" aria-label={`${alt} (photo placeholder)`} className="flex h-full w-full flex-col items-center justify-center gap-4 px-4 text-center">
          <span className="text-[24px] leading-tight text-muted">{label ?? alt}</span>
        </div>
      )}
      {src && caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-black/70 px-4 py-2 text-[21px] text-white">{caption}</figcaption>
      )}
    </figure>
  );
}

export function ImageGallery({ items, className = '' }: { items: SlotProps[]; className?: string }) {
  return (
    <div className={`grid gap-4 ${className}`} style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
      {items.map((i) => (
        <ImageSlot key={i.name} {...i} className={`h-full ${i.className ?? ''}`} />
      ))}
    </div>
  );
}
