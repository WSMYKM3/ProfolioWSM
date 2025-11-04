// Load and render posts
let postsData = [];

async function loadPosts() {
    try {
        const response = await fetch('posts.json');
        const data = await response.json();
        postsData = data.posts || [];
        renderPosts();
    } catch (error) {
        console.error('Error loading posts:', error);
        document.getElementById('posts-grid').innerHTML = 
            '<div class="loading">Error loading posts. Please check posts.json file.</div>';
    }
}

function renderPosts() {
    const grid = document.getElementById('posts-grid');
    grid.innerHTML = '';
    
    postsData.forEach(post => {
        const postCard = createPostCard(post);
        grid.appendChild(postCard);
    });
}

function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.dataset.postId = post.id;
    
    const img = document.createElement('img');
    img.src = post.thumbnail;
    img.alt = post.title;
    img.loading = 'lazy';
    
    const content = document.createElement('div');
    content.className = 'post-card-content';
    
    const title = document.createElement('div');
    title.className = 'post-card-title';
    title.textContent = post.title;
    
    const meta = document.createElement('div');
    meta.className = 'post-card-meta';
    if (post.date) {
        meta.textContent = new Date(post.date).toLocaleDateString();
    }
    
    content.appendChild(title);
    content.appendChild(meta);
    
    card.appendChild(img);
    card.appendChild(content);
    
    card.addEventListener('click', () => openModal(post));
    
    return card;
}

// Modal functionality
async function openModal(post) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = '<div class="loading">Loading...</div>';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    try {
        const response = await fetch(post.file);
        const html = await response.text();
        
        // Extract content from the fetched HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const postContent = doc.querySelector('.post-content') || doc.body;
        
        modalBody.innerHTML = postContent.innerHTML;
    } catch (error) {
        console.error('Error loading post content:', error);
        modalBody.innerHTML = '<div class="loading">Error loading post content.</div>';
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Stop any playing videos
    const iframes = modal.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        const src = iframe.src;
        iframe.src = '';
        iframe.src = src;
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');
    const modalBackdrop = document.getElementById('modal-backdrop');
    
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    
    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

