# 🔌 Integration Guide

## How to Add Digital Garden to Your Website

This guide shows you how to integrate the Digital Garden component into your existing website project.

---

## 📦 What You Need

Copy these 3 files to your project:
- `index.html` (for structure reference)
- `style.css` (complete styling)
- `script.js` (all functionality)

---

## 🚀 Integration Methods

### Method 1: Standalone Section (Recommended)

Add as a complete section on any page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    
    <!-- Your existing styles -->
    <link rel="stylesheet" href="your-styles.css">
    
    <!-- Add Digital Garden CSS -->
    <link rel="stylesheet" href="digital-garden.css">
</head>
<body>
    <!-- Your existing header/nav -->
    <header>
        <nav>Your Navigation</nav>
    </header>
    
    <!-- Digital Garden Section -->
    <section class="portfolio-section">
        <!-- Filter Tags -->
        <div class="filter-container">
            <button class="filter-tag active" data-filter="all">All</button>
            <button class="filter-tag" data-filter="design">Design</button>
            <button class="filter-tag" data-filter="photo">Photo</button>
            <button class="filter-tag" data-filter="article">Article</button>
        </div>
        
        <!-- Garden Canvas -->
        <main class="garden">
            <div class="garden-container">
                <!-- Your cards here -->
                <div class="card card-image" data-category="design" style="top: 10%; left: 5%; rotate: -3deg;">
                    <div class="card-content">
                        <img src="your-image.jpg" alt="Project" class="card-img">
                        <div class="card-info">
                            <span class="card-tag">Design</span>
                            <h3 class="card-title">Your Project</h3>
                            <p class="card-date">Created Jan 2026</p>
                        </div>
                    </div>
                </div>
                <!-- More cards... -->
            </div>
        </main>
    </section>
    
    <!-- Image Modal -->
    <div class="modal" id="imageModal">
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <img src="" alt="" class="modal-image">
            <div class="modal-info">
                <h3 class="modal-title"></h3>
                <p class="modal-date"></p>
            </div>
        </div>
    </div>
    
    <!-- Your existing footer -->
    <footer>Your Footer</footer>
    
    <!-- Add Digital Garden JS at the end -->
    <script src="digital-garden.js"></script>
</body>
</html>
```

---

### Method 2: Inline Styles (For Single Page)

If you prefer not to use an external CSS file:

```html
<head>
    <style>
        /* Copy the CSS from style.css here */
        :root {
            --bg-primary: #fafafa;
            --bg-card: #ffffff;
            /* ... other variables ... */
        }
        /* ... rest of the CSS ... */
    </style>
</head>
```

---

### Method 3: Module Import (For Modern Projects)

If using ES6 modules:

**garden.js:**
```javascript
export function initDigitalGarden() {
    loadCardPositions();
    initFilterSystem();
    initModal();
    initCardInteractions();
    initDraggableCards();
}

// Export individual functions if needed
export { loadCardPositions, initDraggableCards, saveCardPosition };
```

**Your main.js:**
```javascript
import { initDigitalGarden } from './garden.js';

document.addEventListener('DOMContentLoaded', () => {
    initDigitalGarden();
});
```

---

## 🎨 Customization for Your Brand

### 1. Match Your Color Scheme

```css
:root {
    --bg-primary: #your-bg-color;
    --bg-card: #your-card-color;
    --text-primary: #your-text-color;
    --accent-blue: #your-brand-color;
}
```

### 2. Match Your Typography

```css
:root {
    --font-main: 'Your Font', sans-serif;
    --font-display: 'Your Heading Font', serif;
}
```

Add your font in `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

### 3. Adjust Container Size

```css
.garden-container {
    height: 1200px; /* Adjust based on your card count */
    max-width: 1400px; /* Adjust to fit your layout */
}
```

### 4. Modify Filter Position

```css
.filter-container {
    top: 30px; /* Adjust based on your header height */
    position: fixed; /* Or 'absolute' to scroll with page */
}
```

---

## 🔧 Configuration Options

### Disable Specific Features

**Disable Dragging:**
```javascript
// In script.js, comment out:
// initDraggableCards();
```

**Disable Position Saving:**
```javascript
// Remove or comment out in dragEnd():
// saveCardPosition(card, leftPercent, topPercent);
```

**Disable Water Ripple:**
```css
/* In style.css, remove or comment out: */
/* .card:before, .card:after { ... } */
```

### Custom LocalStorage Key

If you want to avoid conflicts:
```javascript
// Change in script.js:
localStorage.getItem('mysite-cardPositions')
localStorage.setItem('mysite-cardPositions', JSON.stringify(positions))
```

---

## 📱 Responsive Considerations

### Mobile Menu Integration

If you have a mobile menu, adjust the filter position:

```css
@media (max-width: 768px) {
    .filter-container {
        top: 80px; /* Account for your mobile header */
    }
}
```

### Scroll Behavior

If your site has sticky headers:

```css
.garden {
    margin-top: 150px; /* Height of your header + filter */
}
```

---

## ⚡ Performance Tips

### 1. Lazy Load Images

```html
<img src="placeholder.jpg" data-src="actual-image.jpg" alt="Description" loading="lazy">
```

### 2. Reduce Initial Cards

Start with 5-8 cards visible, load more on scroll:

```javascript
// Add to script.js
function loadMoreCards() {
    // Your logic to append more cards
}

window.addEventListener('scroll', () => {
    if (/* near bottom */) {
        loadMoreCards();
    }
});
```

### 3. Optimize Images

- Use WebP format for better compression
- Resize images to ~800px wide max
- Use appropriate compression (80-85% quality)

---

## 🔗 Integration with Popular Frameworks

### WordPress

1. Create a new page template
2. Add CSS to your theme's `style.css`
3. Add HTML to template file
4. Enqueue JS in `functions.php`:

```php
function enqueue_digital_garden() {
    wp_enqueue_script('digital-garden', get_template_directory_uri() . '/js/digital-garden.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'enqueue_digital_garden');
```

### React

Create a component:

```jsx
import './digital-garden.css';
import { useEffect } from 'react';

function DigitalGarden() {
    useEffect(() => {
        // Initialize after component mounts
        initDigitalGarden();
    }, []);
    
    return (
        <section className="portfolio-section">
            {/* Your cards */}
        </section>
    );
}
```

### Vue

```vue
<template>
  <section class="portfolio-section">
    <!-- Your cards -->
  </section>
</template>

<script>
import './digital-garden.css';

export default {
  mounted() {
    this.initGarden();
  },
  methods: {
    initGarden() {
      // Initialize Digital Garden
    }
  }
}
</script>
```

---

## 🐛 Common Integration Issues

### Issue: CSS Conflicts

**Solution:** Namespace your classes:
```css
.dg-card { /* Instead of .card */ }
.dg-filter-container { /* Instead of .filter-container */ }
```

### Issue: JavaScript Conflicts

**Solution:** Wrap in IIFE:
```javascript
(function() {
    'use strict';
    // Your Digital Garden code
})();
```

### Issue: Modal Behind Content

**Solution:** Increase z-index:
```css
.modal {
    z-index: 9999; /* Higher than your site's highest z-index */
}
```

---

## ✅ Testing Checklist

After integration, test:
- [ ] All cards appear correctly
- [ ] Hover effects work
- [ ] Drag and drop works
- [ ] Filtering works
- [ ] Modal opens/closes
- [ ] Positions save and load
- [ ] Mobile touch works
- [ ] Responsive on all sizes
- [ ] No JavaScript errors in console
- [ ] No CSS conflicts with existing styles

---

## 📞 Need Help?

Check:
1. Browser console for errors (F12)
2. README.md for detailed documentation
3. QUICKSTART.md for basic setup

Common fixes:
- Clear browser cache
- Check file paths are correct
- Ensure scripts load after DOM is ready
- Verify no CSS conflicts

---

**Good luck with your integration! 🌱✨**

