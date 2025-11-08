export default function VideoCardViewer({ videoUrl, title }) {
  return (
    <div className="video-card">
      <h2 className="video-title">{title}</h2>
      <div className="video-wrapper">
        <iframe
          src={videoUrl}
          title={title || "YouTube video"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
