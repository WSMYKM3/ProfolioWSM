'use client';

import { Post } from '@/app/lib/posts';
import SoftwareIcon from './SoftwareIcon';
import Image from 'next/image';

interface PostDetailViewProps {
    post: Post;
}

// Helper function to add basePath for GitHub Pages
function getImageSrc(src: string): string {
    if (src.startsWith('http://') || src.startsWith('https://')) {
        return src;
    }
    const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
    return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

export default function PostDetailView({ post }: PostDetailViewProps) {
    // Use the first video if available, otherwise the main videoUrl
    const videoUrl = (post.videoUrls && post.videoUrls.length > 0) ? post.videoUrls[0] : post.videoUrl;

    return (
        <div className="post-detail-view" style={{ color: '#e8e8e8', paddingBottom: '80px' }}>
            {/* 1. Hero Video/Image */}
            <div className="detail-video-container" style={{
                width: '100%',
                aspectRatio: '16/9',
                backgroundColor: '#000',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '40px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
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
                            loop
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    )
                ) : (
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <Image
                            src={getImageSrc(post.thumbnail)}
                            alt={post.title}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                )}
            </div>

            {/* 2. Header & Quick Info */}
            <div className="detail-header" style={{ marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '32px' }}>
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: 800,
                    marginBottom: '32px',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: '#fff'
                }}>
                    {post.title}
                </h1>

                {/* 3. Metadata Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '24px',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    padding: '24px',
                    borderRadius: '12px'
                }}>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Role</div>
                        <div style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 500 }}>{post.role || 'Creative Technologist'}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Timeline</div>
                        <div style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 500 }}>{post.date}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tools</div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {post.softwareTools?.map(tool => (
                                <span key={tool} style={{
                                    fontSize: '0.9rem',
                                    color: '#ccc',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    padding: '4px 10px',
                                    borderRadius: '4px'
                                }}>
                                    {tool.split('-')[0].trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Description */}
            <div className="detail-content" style={{
                fontSize: '1.15rem',
                lineHeight: 1.8,
                color: '#d0d0d0',
                maxWidth: '100%',
                marginBottom: '60px'
            }}>
                <p style={{ marginBottom: '24px', maxWidth: '800px' }}>
                    {post.description || "Project description placeholder."}
                </p>
                {post.features && post.features.length > 0 && (
                    <div style={{ marginTop: '24px' }}>
                        <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '16px' }}>Key Features</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {post.features.map(f => (
                                <li key={f} style={{
                                    marginBottom: '8px',
                                    color: '#aaa',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#fff' }}></span>
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* 5. Gallery / Process */}
            {post.galleryImages && post.galleryImages.length > 0 && (
                <div className="detail-gallery">
                    <h3 style={{
                        fontSize: '1.5rem',
                        color: '#fff',
                        marginBottom: '24px',
                        borderLeft: '4px solid #fff',
                        paddingLeft: '16px'
                    }}>
                        Process & Gallery
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '24px'
                    }}>
                        {post.galleryImages.map((imgSrc, idx) => (
                            <div key={idx} style={{
                                position: 'relative',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                aspectRatio: idx % 3 === 0 ? '16/9' : '4/5', // Varied aspect ratios for masonry feel
                                backgroundColor: '#1a1a1a'
                            }}>
                                <Image
                                    src={getImageSrc(imgSrc)}
                                    alt={`Gallery image ${idx + 1}`}
                                    fill
                                    style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                    className="gallery-image"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <style jsx global>{`
                .gallery-image:hover {
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    );
}
