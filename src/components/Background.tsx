export default function Background() {
  return (
    <div className="fixed top-0 left-0 w-full h-full light-video -z-10">
      <video autoPlay muted loop className="w-full h-full object-cover">
        <source type="video/mp4" src="./images/background/video.mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
