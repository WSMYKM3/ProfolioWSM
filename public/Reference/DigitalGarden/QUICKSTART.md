# 🚀 Quick Start Guide

## Open Your Digital Garden

**Simply double-click `index.html` to open it in your browser!**

No installation, no build process, no server needed. Just open and enjoy! 🌱

---

## What You'll See

### 🏷️ **Filter Tags** (Top)
- All | Design | Photo | Article | Video | Note
- Click to filter content by category

### 🃏 **Garden Canvas** (Main area)
- 10 sample cards scattered organically
- Different card types (images, text, quotes, links, videos)
- Each card has a subtle rotation for natural look

---

## Try These Interactions

### **Basic Interactions:**
1. **Hover over cards** → Water ripple effect + scale up + rotate to center ✨
2. **Click image cards** → Opens lightbox modal to view full image 🖼️
3. **Click filter tags** → Shows only cards from that category 🏷️
4. **Press ESC** → Close the modal

### **Advanced Features:**
5. **Drag any card** → Click and hold, then drag to reposition 🎯
6. **Release card** → Position is automatically saved! 💾
7. **Refresh page** → Cards stay in your custom positions ♻️
8. **Drag on mobile** → Touch and drag with your finger 📱

---

## Make It Your Own

### Step 1: Design Your Layout (Visual Method)
1. Open `index.html` in your browser
2. **Drag cards** to create your perfect layout
3. Positions are **automatically saved**!
4. No coding needed for layout! 🎨

### Step 2: Replace Content

**For Images:**
```html
<img src="your-image.jpg" alt="Your Description">
```

**For Text:**
```html
<h3 class="card-title">Your Project Title</h3>
<p class="card-description">Your description here</p>
<p class="card-date">planted on Jan 11, 2026</p>
```

### Step 3: Adjust Initial Positions (Optional)

If you want to set positions in code:
```html
style="top: 30%; left: 50%; rotate: 3deg;"
```

- **top**: Vertical position (0-100%)
- **left**: Horizontal position (0-100%)
- **rotate**: Tilt angle (-5deg to 5deg recommended)

### Step 4: Change Colors

Edit CSS variables in `style.css` (line 5-20):

```css
:root {
    --bg-primary: #fafafa;      /* Page background */
    --bg-card: #ffffff;         /* Card background */
    --text-primary: #2d2d2d;    /* Main text */
    --accent-blue: #4a90e2;     /* Links and accents */
}
```

### Step 5: Reset Positions (If Needed)

If you want to start over with positions:
1. Open browser console (F12)
2. Type: `localStorage.removeItem('cardPositions')`
3. Refresh page

---

## Card Templates

### Image Card
```html
<div class="card card-image" data-category="photo" style="top: 20%; left: 10%; rotate: -2deg;">
    <div class="card-content">
        <img src="your-image.jpg" alt="Description" class="card-img">
        <div class="card-info">
            <span class="card-tag">Photo</span>
            <h3 class="card-title">Image Title</h3>
            <p class="card-date">planted on Jan 11, 2026</p>
        </div>
    </div>
</div>
```

### Text/Note Card
```html
<div class="card card-text" data-category="note" style="top: 30%; left: 40%; rotate: 1deg;">
    <div class="card-content">
        <span class="card-tag">Note</span>
        <h3 class="card-title">Your Thought</h3>
        <p class="card-description">Your note or idea here...</p>
        <p class="card-date">planted on Jan 11, 2026</p>
    </div>
</div>
```

### Link Card
```html
<div class="card card-link" data-category="article" style="top: 50%; left: 60%; rotate: 2deg;">
    <div class="card-content">
        <span class="card-tag">Article</span>
        <h3 class="card-title">Article Title</h3>
        <a href="https://yourlink.com" class="card-link-url" target="_blank">Read More →</a>
        <p class="card-date">planted on Jan 11, 2026</p>
    </div>
</div>
```

---

## Tips for Best Results

### 🎨 **Visual Balance**
- Distribute cards evenly across the canvas
- Mix large and small cards
- Vary rotation angles (-5° to 5°)

### 🖼️ **Images**
- Use high quality images (at least 400px wide)
- Consistent style looks professional
- Free images: [Unsplash](https://unsplash.com), [Pexels](https://pexels.com)

### 📝 **Content**
- Keep titles short and descriptive
- Write engaging descriptions
- Use consistent date format

### 🎯 **Categories**
- Keep 4-6 categories max
- Make them clear and distinct
- Ensure every card has a category

---

## 📱 Mobile & Touch Support

### **On Mobile Devices:**
- **Touch and drag** cards to reposition
- Swipe to scroll through cards
- Tap cards to view in lightbox
- All features work perfectly!

### **Responsive Behavior:**
- **Desktop** (> 1200px): Full scattered layout
- **Tablet** (768-1200px): Adjusted spacing
- **Mobile** (< 768px): Vertical stacking with drag support

---

## ⌨️ Keyboard Shortcuts

- **Tab** - Navigate between cards
- **Enter/Space** - Open card (images in modal)
- **Escape** - Close modal
- **Arrow Keys** - Navigate when modal is open

---

## 🎯 Use Cases

### **For Your Website:**
1. **Portfolio Gallery** - Showcase design/photo work
2. **Blog Posts** - Display articles as cards
3. **Product Showcase** - Feature products/services
4. **About Page** - Show team members or milestones
5. **Link Collection** - Curate useful resources

### **Integration Tips:**
- Works great in a `<section>` on any page
- Can be combined with other page content
- Filter tags can match your site's categories
- Customize colors to match your brand

---

## 🚀 Next Steps

### **For Quick Testing:**
1. ✅ Open `index.html` in your browser
2. ✅ Drag cards around to create your layout
3. ✅ Try hovering, clicking, and filtering
4. ✅ Test on your phone (touch support)

### **For Your Website:**
1. ✅ Copy the 3 files to your project
2. ✅ Replace sample content with yours
3. ✅ Customize colors to match your brand
4. ✅ Adjust card positions by dragging
5. ✅ Test and deploy!

### **Optional Enhancements:**
- Add more card types (customize CSS)
- Create new categories for your content
- Adjust animation speeds
- Customize wave colors
- Add your own fonts

---

## Deploy Online (Free)

### **Option 1: GitHub Pages**
1. Create GitHub repository
2. Upload files
3. Settings → Pages → Enable
4. Done! 🎉

### **Option 2: Netlify**
1. Go to [netlify.com](https://netlify.com)
2. Drag the DigitalGarden folder
3. Instant deployment! ⚡

### **Option 3: Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Import project
3. One-click deploy! 🚀

---

## Need Help?

Check `README.md` for detailed documentation!

**Have fun building your garden! 🌱✨**

