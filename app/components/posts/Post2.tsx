export default function Post2() {
  return (
    <div className="post-content">
      <div className="text-content">
        <h2>Video Showcase</h2>
        <p>This post demonstrates embedded video content from YouTube or similar platforms.</p>
      </div>
      <iframe 
        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      />
      <div className="text-content">
        <p>Add your video description and additional information here. You can include multiple paragraphs, lists, or other HTML content.</p>
      </div>
    </div>
  );
}

