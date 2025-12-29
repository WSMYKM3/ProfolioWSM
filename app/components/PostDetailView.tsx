'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/app/lib/posts';
import SoftwareIcon from './SoftwareIcon';
import Image from 'next/image';
import Post1 from './posts/Post1';
import Post2 from './posts/Post2';
import Post3 from './posts/Post3';
import Post4 from './posts/Post4';
import PostSidebar from './PostSidebar';

const postComponents: Record<string, React.ComponentType> = {
  'post-1': Post1,
  'post-2': Post2,
  'post-3': Post3,
  'post-4': Post4,
};

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

// Helper function to convert YouTube watch URL to embed URL
function convertToEmbedUrl(url: string): string {
    if (!url) return url;

    // If already an embed URL, return as is
    if (url.includes('/embed/')) {
        return url;
    }

    // Convert watch URL (https://www.youtube.com/watch?v=VIDEO_ID) to embed URL
    if (url.includes('youtube.com/watch')) {
        const videoId = url.split('v=')[1]?.split('&')[0];
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
    }

    // Convert short URL (https://youtu.be/VIDEO_ID) to embed URL
    if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split('?')[0];
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
    }

    // Return original URL if no conversion needed
    return url;
}

export default function PostDetailView({ post }: PostDetailViewProps) {
    // Use the first video if available, otherwise the main videoUrl
    const rawVideoUrl = (post.videoUrls && post.videoUrls.length > 0) ? post.videoUrls[0] : post.videoUrl;
    const videoUrl = rawVideoUrl ? convertToEmbedUrl(rawVideoUrl) : null;
    
    // Get the Post component for detailed content
    const PostContent = postComponents[post.id] || null;

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Define sections for sidebar based on post
    const getSections = () => {
        const baseSections = [
            { id: 'project-title', label: post.title },
            { id: 'intro', label: 'Intro' }
        ];
        
        if (post.id === 'post-1') {
            return [
                ...baseSections,
                { id: 'ideation', label: 'Ideation' },
                { id: 'ux-design', label: 'UX Design' },
                {
                    id: 'prototype',
                    label: 'Prototype',
                    subsections: [
                        { id: 'prototype-stage1', label: 'Stage1: Animation Trailer(UE) production' },
                        { id: 'prototype-stage2', label: 'Stage2: Unity Development' }
                    ]
                }
            ];
        }
        
        if (post.id === 'post-3') {
            return [
                ...baseSections,
                { id: 'achievement', label: 'Achievement' },
                { id: 'tools', label: 'Tools' },
                { id: 'contributions', label: 'My Contributions' },
                {
                    id: 'process',
                    label: 'Process',
                    subsections: [
                        { id: 'process-stage1', label: 'Stage1: Touchdesigner-Unreal Engine Communication Prototype' },
                        { id: 'process-stage2', label: 'Stage2: State machine Prototype' },
                        { id: 'process-stage3', label: 'Stage3: Metahuman realtime Speech/Lipsync' },
                        { id: 'process-stage4', label: 'Stage4: Wake Words & localhost interactive interface' }
                    ]
                }
            ];
        }
        
        if (post.id === 'post-4') {
            return [
                { id: 'project-title', label: post.title },
                { id: 'videos', label: 'Videos' },
                { id: 'intro', label: 'Intro' },
                { id: 'tools', label: 'Tools' },
                { id: 'motion-capture', label: 'Motion Capture + Motion Data Cleaning' },
                { id: 'metahuman', label: 'Metahuman' }
            ];
        }
        
        return baseSections;
    };

    return (
        <div className="post-detail-view" style={{ color: '#e8e8e8', paddingBottom: '80px' }}>
            {/* 1. Hero Video/Image - Hide for post-4 as videos are in Post4 component */}
            {post.id !== 'post-4' && (
            <div className="detail-video-container" style={{
                width: '80%',
                maxWidth: '1000px',
                aspectRatio: '16/9',
                backgroundColor: '#000',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '40px',
                marginLeft: 'auto',
                marginRight: 'auto',
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
            )}

            {/* 2. Header & Quick Info */}
            <div className="detail-header" id="project-title" style={{ marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '32px', scrollMarginTop: '100px' }}>
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: 800,
                    marginBottom: '32px',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: '#fff',
                    textAlign: 'center'
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
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                            {post.softwareTools?.map(tool => (
                                <SoftwareIcon key={tool} name={tool} size={24} />
                            ))}
                        </div>
                    </div>
                    {post.features && post.features.length > 0 && (
                        <div>
                            <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Features</div>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {post.features.map(feature => (
                                    <span key={feature} style={{
                                        fontSize: '0.9rem',
                                        color: '#ccc',
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        padding: '4px 10px',
                                        borderRadius: '4px'
                                    }}>
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 4. Videos Section (for post-4 only) */}
            {post.id === 'post-4' && (
                <div id="videos" style={{ 
                    marginBottom: '60px', 
                    scrollMarginTop: '100px',
                    maxWidth: '1400px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    padding: isMobile ? '0 16px' : '0 40px'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        gap: isMobile ? '24px' : '40px',
                        marginBottom: '24px'
                    }}>
                        {/* Left Video: Behind the scenes */}
                        <div>
                            <iframe
                                src={convertToEmbedUrl('https://www.youtube.com/watch?v=J0UV4jHnues')}
                                title="Behind the scenes"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{
                                    width: '100%',
                                    aspectRatio: '16/9',
                                    borderRadius: '12px',
                                    marginBottom: '12px'
                                }}
                            />
                            <p style={{
                                fontSize: '0.95rem',
                                color: '#d0d0d0',
                                textAlign: 'center',
                                margin: 0
                            }}>
                                Behind the scenes
                            </p>
                        </div>
                        {/* Right Video: Full length video */}
                        <div>
                            <iframe
                                src={convertToEmbedUrl('https://www.youtube.com/watch?v=f7mk4TVj1jA')}
                                title="Full length video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{
                                    width: '100%',
                                    aspectRatio: '16/9',
                                    borderRadius: '12px',
                                    marginBottom: '12px'
                                }}
                            />
                            <p style={{
                                fontSize: '0.95rem',
                                color: '#d0d0d0',
                                textAlign: 'center',
                                margin: 0
                            }}>
                                Full length video
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* 5. Description with Sidebar Layout */}
            <div style={{
                display: 'flex',
                gap: '40px',
                maxWidth: '1400px',
                margin: '0 auto',
                padding: isMobile ? '0 16px' : '0 40px'
            }}>
                {/* Sidebar Navigation */}
                {!isMobile && (
                    <PostSidebar
                        sections={getSections()}
                    />
                )}
                
                {/* Main Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div id="intro" className="detail-content" style={{
                        fontSize: '1.15rem',
                        lineHeight: 1.8,
                        color: '#d0d0d0',
                        maxWidth: '100%',
                        marginBottom: '60px',
                        textAlign: 'center',
                        scrollMarginTop: '100px'
                    }}>
                        <h2 style={{
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            color: '#fff',
                            marginBottom: '40px',
                            textAlign: 'center'
                        }}>
                            Intro
                        </h2>
                        <p style={{ 
                            fontSize: '20px',
                            marginBottom: '53px', 
                            maxWidth: '800px', 
                            marginLeft: 'auto', 
                            marginRight: 'auto' 
                        }}>
                            {post.description || "Project description placeholder."}
                        </p>
                    </div>

                    {/* 6. Detailed Post Content (for projects with Post components) */}
                    {PostContent && (
                        <div style={{
                            marginTop: '60px',
                            paddingTop: '40px',
                            borderTop: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <PostContent />
                        </div>
                    )}
                </div>
            </div>

            {/* 6. Gallery / Process (fallback if no Post component) */}
            {!PostContent && post.galleryImages && post.galleryImages.length > 0 && (
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
