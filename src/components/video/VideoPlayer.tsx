"use client";

interface VideoPlayerProps {
  src: string;
  poster: string;
  youtubeId?: string;
  vimeoId?: string;
  instagramId?: string;
}

export function VideoPlayer({ src, poster, youtubeId, vimeoId, instagramId }: VideoPlayerProps) {
  if (youtubeId) {
    return (
      <div className="w-full max-w-[1000px] mx-auto">
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
            title="Video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full rounded-sm"
          />
        </div>
      </div>
    );
  }

  if (vimeoId) {
    return (
      <div className="w-full max-w-[1000px] mx-auto">
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
            title="Video player"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full rounded-sm"
          />
        </div>
      </div>
    );
  }

  if (instagramId) {
    return (
      <div className="w-full max-w-[540px] mx-auto">
        <iframe
          src={`https://www.instagram.com/p/${instagramId}/embed/`}
          title="Instagram video"
          allowFullScreen
          scrolling="no"
          className="w-full rounded-sm border-0"
          style={{ minHeight: "700px" }}
        />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center mx-auto">
      <video
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        className="max-h-[85vh] w-auto rounded-sm"
      />
    </div>
  );
}
