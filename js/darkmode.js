document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('dark-mode-checkbox');
    const body = document.body;

    // Check for saved preference in local storage
    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
        toggle.checked = true; // Set the checkbox state
    }

    // Toggle dark mode on click
    toggle.addEventListener('change', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'disabled');
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'enabled');
        }
    });
});