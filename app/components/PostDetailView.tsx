'use client';

import { Post } from '@/app/lib/posts';

interface PostDetailViewProps {
    post: Post;
}

export default function PostDetailView({ post }: PostDetailViewProps) {
    // Use the first video if available, otherwise the main videoUrl
    const videoUrl = (post.videoUrls && post.videoUrls.length > 0) ? post.videoUrls[0] : post.videoUrl;

    return (
        <div className="post-detail-view" style={{ color: '#e8e8e8' }}>
            {/* Video Section */}
            <div className="detail-video-container" style={{
                width: '100%',
                aspectRatio: '16/9',
                backgroundColor: '#000',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '32px'
            }}>
                {videoUrl ? (
                    videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                        <iframe
                            src={videoUrl}
                            title={post.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ width: '100%', height: '100%' }}
                        />
                    ) : (
                        <video
                            src={videoUrl}
                            controls
                            autoPlay
                            muted
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    )
                ) : (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)'
                    }}>
                        <span style={{ color: '#666' }}>Video Placeholder</span>
                    </div>
                )}
            </div>

            {/* Title & Meta */}
            <div className="detail-header" style={{ marginBottom: '24px' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    marginBottom: '16px',
                    lineHeight: 1.2
                }}>
                    {post.title}
                </h1>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {post.tags.map(tag => (
                        <span key={tag} style={{
                            padding: '4px 12px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderRadius: '100px',
                            fontSize: '0.85rem',
                            color: '#ccc'
                        }}>
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Description / Text Content */}
            <div className="detail-content" style={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: '#ccc',
                maxWidth: '800px'
            }}>
                <p style={{ marginBottom: '24px' }}>
                    {post.description || "This is a placeholder for the project description. Here you can add detailed information about the project, the creative process, the technologies used, and the final outcome."}
                </p>

                {/* Placeholder for more text blocks */}
                <div style={{
                    padding: '24px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    marginTop: '32px'
                }}>
                    <h3 style={{ color: '#fff', marginBottom: '12px' }}>Project Details</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
            </div>
        </div>
    );
}
