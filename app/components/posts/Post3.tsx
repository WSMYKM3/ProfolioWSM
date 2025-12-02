export default function Post3() {
  return (
    <div className="post-content">
      <div className="text-content">
        <h2>Mixed Media Project</h2>
        <p>This post combines images, videos, and text content to showcase a comprehensive project.</p>
      </div>
      <img src="https://via.placeholder.com/800x500/cccccc/666666?text=Image+1" alt="Project Image 1" />
      <p className="image-caption">First image description or caption goes here.</p>
      
      <iframe 
        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      />
      
      <img src="https://via.placeholder.com/800x400/cccccc/666666?text=Image+2" alt="Project Image 2" />
      <p className="image-caption">Second image description or caption goes here.</p>
      
      <div className="text-content">
        <h3>Project Details</h3>
        <ul>
          <li>Feature one description</li>
          <li>Feature two description</li>
          <li>Feature three description</li>
        </ul>
        <p>Final thoughts and conclusion about this project can be added here.</p>
      </div>
    </div>
  );
}

