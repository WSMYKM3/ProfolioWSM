// ==========================================
// DIGITAL GARDEN - INTERACTIVE FEATURES
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    loadCardPositions();
    initFilterSystem();
    initModal();
    initCardInteractions();
    initDraggableCards();
});

// ==========================================
// FILTER SYSTEM
// ==========================================

function initFilterSystem() {
    const filterButtons = document.querySelectorAll('.filter-tag');
    const cards = document.querySelectorAll('.card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Get filter category
            const filterCategory = button.getAttribute('data-filter');

            // Filter cards with animation
            cards.forEach((card, index) => {
                const cardCategory = card.getAttribute('data-category');
                
                // Add filtering class to prevent grow animation
                card.classList.add('filtering');
                
                if (filterCategory === 'all' || cardCategory === filterCategory) {
                    // Show card
                    setTimeout(() => {
                        card.classList.remove('hidden');
                    }, index * 30);
                } else {
                    // Hide card
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ==========================================
// MODAL / LIGHTBOX
// ==========================================

function initModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDate = modal.querySelector('.modal-date');
    const modalClose = modal.querySelector('.modal-close');
    const modalBackdrop = modal.querySelector('.modal-backdrop');

    // Open modal when clicking image cards
    const imageCards = document.querySelectorAll('.card-image, .card-video');
    
    imageCards.forEach(card => {
        card.addEventListener('click', () => {
            // Don't open modal if card was just dragged
            if (card.hasAttribute('data-just-dragged')) {
                return;
            }
            
            const img = card.querySelector('img');
            const title = card.querySelector('.card-title');
            const date = card.querySelector('.card-date');

            if (img && title && date) {
                modalImage.src = img.src;
                modalTitle.textContent = title.textContent;
                modalDate.textContent = date.textContent;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal functions
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ==========================================
// CARD INTERACTIONS
// ==========================================

function initCardInteractions() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        // Hover effects now handled by CSS for better performance

        // Add ripple effect on click (for non-image cards)
        if (!card.classList.contains('card-image') && !card.classList.contains('card-video')) {
            card.addEventListener('click', function(e) {
                // Don't trigger click actions if card was just dragged
                if (this.hasAttribute('data-just-dragged')) {
                    return;
                }
                
                // Handle link cards
                if (this.classList.contains('card-link')) {
                    const link = this.querySelector('.card-link-url');
                    if (link) {
                        window.open(link.href, '_blank');
                    }
                }

                // Create ripple effect
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(74, 144, 226, 0.3)';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.pointerEvents = 'none';
                ripple.style.animation = 'rippleEffect 0.6s ease-out';
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.transform = 'translate(-50%, -50%)';
                
                card.style.position = 'relative';
                card.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        }
    });

    // Add ripple animation to CSS dynamically
    if (!document.querySelector('#rippleAnimation')) {
        const style = document.createElement('style');
        style.id = 'rippleAnimation';
        style.textContent = `
            @keyframes rippleEffect {
                from {
                    width: 20px;
                    height: 20px;
                    opacity: 1;
                }
                to {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==========================================
// DRAGGABLE CARDS
// ==========================================

function initDraggableCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        let isDragging = false;
        let hasMoved = false;
        let currentX, currentY, initialX, initialY;
        let xOffset = 0, yOffset = 0;
        
        function dragStart(e) {
            // Don't drag if clicking on a link
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            // Prevent text selection
            e.preventDefault();
            
            const touch = e.type === 'touchstart' ? e.touches[0] : e;
            
            isDragging = true;
            hasMoved = false;
            card.classList.add('dragging');
            
            // Get initial mouse/touch position
            initialX = touch.clientX;
            initialY = touch.clientY;
            
            // Get current card position
            const rect = card.getBoundingClientRect();
            const container = card.parentElement.getBoundingClientRect();
            
            xOffset = rect.left - container.left;
            yOffset = rect.top - container.top;
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            e.preventDefault();
            
            const touch = e.type === 'touchmove' ? e.touches[0] : e;
            
            currentX = touch.clientX - initialX;
            currentY = touch.clientY - initialY;
            
            // Check if moved more than threshold (5px)
            if (Math.abs(currentX) > 5 || Math.abs(currentY) > 5) {
                hasMoved = true;
            }
            
            const newX = xOffset + currentX;
            const newY = yOffset + currentY;
            
            // Get container bounds
            const container = card.parentElement.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            
            // Constrain to bounds
            const constrainedX = Math.max(0, Math.min(newX, container.width - cardRect.width));
            const constrainedY = Math.max(0, Math.min(newY, container.height - cardRect.height));
            
            // Update position using pixels for smooth dragging
            card.style.left = constrainedX + 'px';
            card.style.top = constrainedY + 'px';
        }
        
        function dragEnd(e) {
            if (!isDragging) return;
            
            isDragging = false;
            card.classList.remove('dragging');
            
            // If card was moved, prevent click events
            if (hasMoved) {
                // Prevent click event from firing after drag
                card.setAttribute('data-just-dragged', 'true');
                setTimeout(() => {
                    card.removeAttribute('data-just-dragged');
                }, 100);
                
                // Convert to percentage for responsiveness
                const container = card.parentElement.getBoundingClientRect();
                const rect = card.getBoundingClientRect();
                
                const leftPercent = ((rect.left - container.left) / container.width * 100);
                const topPercent = ((rect.top - container.top) / container.height * 100);
                
                card.style.left = leftPercent + '%';
                card.style.top = topPercent + '%';
                
                // Save position
                saveCardPosition(card, leftPercent, topPercent);
            }
            
            hasMoved = false;
        }
        
        // Mouse events
        card.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
        
        // Touch events for mobile
        card.addEventListener('touchstart', dragStart, { passive: false });
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('touchend', dragEnd);
    });
}

// Save card positions to localStorage
function saveCardPosition(card, left, top) {
    const cardIndex = Array.from(card.parentElement.children).indexOf(card);
    const positions = JSON.parse(localStorage.getItem('cardPositions') || '{}');
    positions[cardIndex] = { left, top };
    localStorage.setItem('cardPositions', JSON.stringify(positions));
}

// Load card positions from localStorage
function loadCardPositions() {
    const positions = JSON.parse(localStorage.getItem('cardPositions') || '{}');
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        if (positions[index]) {
            card.style.left = positions[index].left + '%';
            card.style.top = positions[index].top + '%';
        }
    });
}

// ==========================================
// PARALLAX EFFECT (OPTIONAL)
// ==========================================

function initParallax() {
    const cards = document.querySelectorAll('.card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        cards.forEach((card, index) => {
            const speed = (index % 3 + 1) * 0.1;
            const yPos = -(scrolled * speed);
            card.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Uncomment to enable parallax effect
// initParallax();

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Add loading animation when images load
document.querySelectorAll('.card-img, .modal-image').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Console easter egg
console.log('%c🌱 Welcome to the Digital Garden!', 'font-size: 20px; color: #6fbf73; font-weight: bold;');
console.log('%cBuilt with care and creativity', 'font-size: 12px; color: #757575;');

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Lazy load images (if you have many cards)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================

// Add keyboard navigation for cards
document.querySelectorAll('.card').forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
});

// Add ARIA labels
document.querySelectorAll('.filter-tag').forEach(tag => {
    tag.setAttribute('role', 'button');
    tag.setAttribute('aria-pressed', tag.classList.contains('active'));
});

// ==========================================
// EXPORT FUNCTIONS (for external use)
// ==========================================

window.digitalGarden = {
    filterCards: (category) => {
        const button = document.querySelector(`.filter-tag[data-filter="${category}"]`);
        if (button) button.click();
    },
    resetFilters: () => {
        const allButton = document.querySelector('.filter-tag[data-filter="all"]');
        if (allButton) allButton.click();
    }
};

