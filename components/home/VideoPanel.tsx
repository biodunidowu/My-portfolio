export default function VideoPanel() {
  return (
    <div className="relative h-117.75 w-148 overflow-hidden bg-[#111]">
      <video
        className="h-full w-full object-cover grayscale"
        src="/video/intro.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
}
