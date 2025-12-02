# Archived Components

This document lists components that have been replaced or archived but kept for reference.

## PostGrid.tsx (Slot Machine Layout)

**Status**: Archived  
**Location**: `app/components/PostGrid.tsx`  
**Replaced By**: `app/components/PostScrollContainer.tsx` and `app/components/PostSection.tsx`

**Reason**: The slot machine layout has been replaced with a scroll-snapping single-postcard layout as per the redesign requirements.

**What It Did**:
- Displayed 2 cards at center with preview cards above/below
- Intercepted scroll events to switch cards
- Used 3D flip animations
- Prevented page scrolling

**If You Need to Restore**:
1. Update `app/page.tsx` to import `PostGrid` instead of `PostScrollContainer`
2. Restore scroll prevention CSS in `app/globals.css`:
   - Set `html, body { overflow: hidden; }`
   - Set `.main-content { overflow: hidden; }`
3. Remove scroll-snapping CSS
4. The component is still in the codebase but not used

**Note**: The old slot machine code is preserved in case you need to reference it, but the new scroll-snapping layout is the active implementation.

