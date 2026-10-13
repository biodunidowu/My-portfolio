export default function VideoPanel() {
  return (
    <div className="relative aspect-358/471 w-full overflow-hidden bg-black md:aspect-592/672 md:max-w-148 xl:aspect-auto xl:h-168">
      <video
        className="absolute inset-0 h-full w-full object-cover grayscale"
        src="https://res.cloudinary.com/dxlpx9tz/video/upload/v1790856473/Snapchat-664854793.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
}
