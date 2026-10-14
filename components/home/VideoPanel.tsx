import AutoplayVideo from "@/components/works/AutoplayVideo";

// Cloudinary serves the clip already in greyscale and as H.264. The original
// upload is HEVC, which many Windows and Android browsers can't decode in
// hardware, and a CSS grayscale filter on a playing video costs every frame.
const CLIP = "https://res.cloudinary.com/dxlpx9tz/video/upload";
const ID = "v1790856473/Snapchat-664854793";

export default function VideoPanel() {
  return (
    <div className="relative aspect-358/471 w-full overflow-hidden bg-black md:aspect-592/672 md:max-w-148 xl:aspect-auto xl:h-168">
      <AutoplayVideo
        src={`${CLIP}/e_grayscale/${ID}.mp4`}
        poster={`${CLIP}/e_grayscale,so_0,w_800/${ID}.jpg`}
      />
    </div>
  );
}
