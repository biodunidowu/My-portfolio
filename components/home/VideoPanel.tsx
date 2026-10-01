export default function VideoPanel() {
  return (
    <div className="relative min-h-full w-full overflow-hidden bg-black h-117.75">
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
