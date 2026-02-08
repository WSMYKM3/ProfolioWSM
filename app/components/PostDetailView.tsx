'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post, posts } from '@/app/lib/posts';
import SoftwareIcon from './SoftwareIcon';
import Image from 'next/image';
import Post1 from './posts/Post1';
import Post2 from './posts/Post2';
import Post3 from './posts/Post3';
import Post4 from './posts/Post4';
import Post5 from './posts/Post5';
import Post6 from './posts/Post6';
import PostSidebar from './PostSidebar';

const postComponents: Record<string, React.ComponentType> = {
  'post-1': Post1,
  'post-2': Post2,
  'post-3': Post3,
  'post-4': Post4,
  'post-5': Post5,
  'post-6': Post6,
};

interface PostDetailViewProps {
    post: Post;
    isPageView?: boolean; // Indicates if this is used in a page route vs modal
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

export default function PostDetailView({ post, isPageView = false }: PostDetailViewProps) {
    // Use videoUrl for hero video if available, otherwise use first videoUrls, otherwise null
    const rawVideoUrl = post.videoUrl || (post.videoUrls && post.videoUrls.length > 0 ? post.videoUrls[0] : null);
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
                        { id: 'animation-trailer', label: 'Animation Trailer - (Video)' },
                        { id: 'prototype-stage1', label: 'Stage1: Animation Trailer(UE) production' },
                        { id: 'prototype-stage2', label: 'Stage2: Unity Development' }
                    ]
                }
            ];
        }
        
        if (post.id === 'post-2') {
            return [
                ...baseSections,
                { id: 'ideation', label: 'Ideation' },
                { id: 'contributions', label: 'My Contributions' },
                {
                    id: 'process',
                    label: 'Process',
                    subsections: [
                        { id: 'process-stage1', label: 'Stage1. Prototype - Solve animation of tutors(hand & full body)' },
                        { id: 'process-stage2', label: 'Stage2. Develop learning and testing function' },
                        { id: 'process-stage3', label: 'Stage3. AI Glasses: Live ASL Translation' }
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
        
        if (post.id === 'post-5') {
            return [
                ...baseSections,
                { id: 'video', label: 'Video' },
                { id: 'ideation', label: 'Ideation' },
                { id: 'stage1', label: 'Stage1: XR Development' },
                { id: 'stage2', label: 'Stage2: AI Assistant' }
            ];
        }
        
        if (post.id === 'post-6') {
            return [
                ...baseSections,
                { id: 'video', label: 'Video' },
                { id: 'introduction', label: 'Introduction' },
                {
                    id: 'game-design',
                    label: 'Game Design',
                    subsections: [
                        { id: 'technical-solution', label: '1.1 Technical solution' },
                        { id: 'enemies-weapons', label: '1.2 Our three types of enemies and weapons' }
                    ]
                },
                {
                    id: 'my-prototype',
                    label: 'My Prototype',
                    subsections: [
                        { id: 'ragdoll-scripts', label: '1.1 Ragdoll by scripts' },
                        { id: 'double-damage', label: '1.2 Double damage by detecting the tag and Projectile.cs' },
                        { id: 'shield-parts', label: '1.3 Four parts of the shield' },
                        { id: 'gamemanager', label: '1.4 GameManager' }
                    ]
                }
            ];
        }
        
        return baseSections;
    };

    // Adjust sizing based on page vs modal context
    const videoMaxWidth = isPageView ? '800px' : '1000px';
    const videoWidth = isPageView ? '65%' : '80%';
    const contentMaxWidth = isPageView ? '1600px' : '1400px';
    const contentPadding = isPageView ? (isMobile ? '0 20px' : '0 60px') : (isMobile ? '0 16px' : '0 40px');

    return (
        <div className={`post-detail-view ${isPageView ? 'post-detail-view-page' : ''}`} style={{ color: '#e8e8e8', paddingBottom: '80px' }}>
            {/* 1. Hero Video/Image - Hide for post-4, post-5, and post-6 as videos/content are in Post components */}
            {post.id !== 'post-4' && post.id !== 'post-5' && post.id !== 'post-6' && (
            <div className="detail-video-container" style={{
                width: videoWidth,
                maxWidth: videoMaxWidth,
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
                    maxWidth: contentMaxWidth,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    padding: contentPadding
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr',
                        gap: isMobile ? '24px' : '40px',
                        marginBottom: '24px',
                        alignItems: 'center'
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
                maxWidth: contentMaxWidth,
                margin: '0 auto',
                padding: post.id === 'post-6' ? '0' : contentPadding
            }}>
                {/* Sidebar Navigation */}
                {!isMobile && (
                    <PostSidebar
                        sections={getSections()}
                        isPageView={isPageView}
                    />
                )}
                
                {/* Main Content */}
                <div style={{ flex: 1, minWidth: 0, padding: post.id === 'post-6' ? contentPadding : '0' }}>
                    {/* Two YouTube Videos above Intro for post-2 */}
                    {post.id === 'post-2' && post.videoUrls && post.videoUrls.length >= 2 && (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            gap: '24px',
                            marginBottom: '48px',
                            width: '100%'
                        }}>
                            {post.videoUrls.slice(0, 2).map((videoUrl, idx) => {
                                const embedUrl = convertToEmbedUrl(videoUrl);
                                const videoTitle = post.videoTitles?.[idx] || `${post.title} Video ${idx + 1}`;
                                
                                return (
                                    <div key={idx} style={{ width: '100%' }}>
                                        <div style={{
                                            position: 'relative',
                                            width: '100%',
                                            paddingBottom: '56.25%', // 16:9 aspect ratio
                                            height: 0,
                                            overflow: 'hidden',
                                            borderRadius: '12px',
                                            backgroundColor: '#000',
                                            marginBottom: '12px'
                                        }}>
                                            {embedUrl ? (
                                                <iframe
                                                    src={embedUrl}
                                                    title={videoTitle}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        border: 'none'
                                                    }}
                                                />
                                            ) : (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                                    border: '1px dashed rgba(255,255,255,0.2)'
                                                }}>
                                                    <p style={{
                                                        fontSize: '0.95rem',
                                                        color: '#888',
                                                        textAlign: 'center',
                                                        margin: 0,
                                                        padding: '20px'
                                                    }}>
                                                        YouTube video placeholder
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <p style={{
                                            fontSize: '0.875rem',
                                            color: 'rgba(255,255,255,0.7)',
                                            textAlign: 'center',
                                            margin: 0
                                        }}>
                                            {videoTitle}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    
                    {/* Hide intro section for post-6 as it has its own Introduction section */}
                    {post.id !== 'post-6' && (
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
                                {post.id === 'post-1' && post.description ? (
                                    post.description.split('no more repeated conversation').map((part, index, array) => 
                                        index === array.length - 1 ? part : (
                                            <span key={index}>
                                                {part}
                                                <span style={{
                                                    background: 'linear-gradient(120deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)',
                                                    padding: '2px 6px',
                                                    borderRadius: '4px',
                                                    fontWeight: 600,
                                                    color: '#fff'
                                                }}>
                                                    no more repeated conversation
                                                </span>
                                            </span>
                                        )
                                    )
                                ) : (
                                    post.description || "Project description placeholder."
                                )}
                            </p>
                        </div>
                    )}

                    {/* 6. Detailed Post Content (for projects with Post components) */}
                    {PostContent && (
                        <div style={{
                            marginTop: post.id === 'post-6' ? '0' : '60px',
                            paddingTop: post.id === 'post-6' ? '0' : '40px',
                            borderTop: post.id === 'post-6' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                            marginLeft: post.id === 'post-6' ? (isMobile ? '-16px' : '-40px') : '0',
                            marginRight: post.id === 'post-6' ? (isMobile ? '-16px' : '-40px') : '0',
                            paddingLeft: '0',
                            paddingRight: '0'
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

            {/* Explore more projects section */}
            {isPageView && (() => {
                // Get 3 other projects (excluding current one)
                // Use current post index to rotate through all projects
                const currentIndex = posts.findIndex(p => p.id === post.id);
                const otherPosts = posts
                    .filter(p => p.id !== post.id)
                    .slice(currentIndex) // Start from current index
                    .concat(posts.filter(p => p.id !== post.id).slice(0, currentIndex)) // Wrap around
                    .slice(0, 3);
                
                if (otherPosts.length === 0) return null;
                
                return (
                    <section style={{
                        marginTop: '80px',
                        paddingTop: '60px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        <h2 style={{
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            color: '#fff',
                            marginBottom: '40px',
                            textAlign: 'center'
                        }}>
                            Explore more projects
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                            gap: isMobile ? '24px' : '32px',
                            maxWidth: '1200px',
                            margin: '0 auto'
                        }}>
                            {otherPosts.map((otherPost) => (
                                <Link
                                    key={otherPost.id}
                                    href={`/projects/${otherPost.id}`}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        display: 'block',
                                        transition: 'transform 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <div style={{
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                    }}
                                    >
                                        <div style={{
                                            position: 'relative',
                                            width: '100%',
                                            aspectRatio: '16/9',
                                            overflow: 'hidden',
                                            backgroundColor: '#1a1a1a'
                                        }}>
                                            <Image
                                                src={getImageSrc(otherPost.thumbnail)}
                                                alt={otherPost.title}
                                                fill
                                                style={{
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'scale(1.05)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'scale(1)';
                                                }}
                                            />
                                        </div>
                                        <div style={{
                                            padding: '20px'
                                        }}>
                                            <h3 style={{
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                color: '#fff',
                                                marginBottom: '8px',
                                                marginTop: 0
                                            }}>
                                                {otherPost.title}
                                            </h3>
                                            {otherPost.description && (
                                                <p style={{
                                                    fontSize: '0.875rem',
                                                    color: '#d0d0d0',
                                                    lineHeight: '1.5',
                                                    margin: 0,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}>
                                                    {otherPost.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                );
            })()}

            <style jsx global>{`
                .gallery-image:hover {
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    );
}
