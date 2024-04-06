// menu.js

function toggleMenu() {
    const moreMenu = document.getElementById('more-menu-content');
    if (moreMenu.style.display === 'block') {
        moreMenu.style.display = 'none';
    } else {
        moreMenu.style.display = 'block';
    }
}
