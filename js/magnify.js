document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.home-hero');
    const h1Element = document.querySelector('.home-hero h1');
    const magnifyingGlass = document.getElementById('magnifying-glass');

    if (heroSection && h1Element && magnifyingGlass) {
        // Hide default cursor
        h1Element.style.cursor = 'none';

        // Set magnification level
        const zoomLevel = 2; // How much to magnify (e.g., 2x, 3x)
        const glassSize = 150; // Should match CSS width/height

        // Clone the h1 and apply it as background to the magnifier
        const h1Clone = h1Element.cloneNode(true);
        // Position the clone absolutely within the magnify-text, and hide overflow
        h1Clone.style.position = 'absolute';
        h1Clone.style.left = '0';
        h1Clone.style.top = '0';
        h1Clone.style.width = '100%';
        h1Clone.style.height = '100%';
        h1Clone.style.margin = '0'; // Reset margin from h1
        h1Clone.style.padding = '0'; // Reset padding from h1
        h1Clone.style.textAlign = 'center'; // Maintain text alignment

        // Set the color for the cloned text (will be the "magnified" color)
        h1Clone.style.color = 'var(--text)'; // Use --text color for magnified view

        // Clear any previous text-fill-color from the original h1
        h1Element.style.webkitTextFillColor = 'var(--text)';
        h1Element.style.background = 'none'; // Remove previous gradient background

        magnifyingGlass.appendChild(h1Clone);
        magnifyingGlass.style.display = 'none'; // Ensure it's hidden initially

        heroSection.addEventListener('mousemove', (e) => {
            const heroRect = heroSection.getBoundingClientRect();
            const h1Rect = h1Element.getBoundingClientRect();

            // Calculate mouse position relative to the hero section
            let mouseX = e.clientX - heroRect.left;
            let mouseY = e.clientY - heroRect.top;

            // Position the magnifying glass center
            magnifyingGlass.style.left = `${mouseX - glassSize / 2}px`;
            magnifyingGlass.style.top = `${mouseY - glassSize / 2}px`;

            // Calculate position of the clone within the magnifying glass
            // This is the tricky part: we need to move the clone inside the glass
            // inversely to the mouse movement, scaled by the zoom level.
            const h1RelativeX = e.clientX - h1Rect.left;
            const h1RelativeY = e.clientY - h1Rect.top;

            h1Clone.style.transform = `
                scale(${zoomLevel}) 
                translate(${-h1RelativeX + glassSize / (2 * zoomLevel)}px, ${-h1RelativeY + glassSize / (2 * zoomLevel)}px)
            `;

        });

        heroSection.addEventListener('mouseenter', () => {
            magnifyingGlass.style.display = 'block';
        });

        heroSection.addEventListener('mouseleave', () => {
            magnifyingGlass.style.display = 'none';
        });
    }
});