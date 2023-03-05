const doc = document.documentElement;

function showPage() {
    document.head.style.visibility = "visible";
    document.head.style.opacity = 1;
    document.body.style.visibility = "visible";
    document.body.style.opacity = 1;
}

function hidePage() {
    document.head.style.visibility = "hidden";
    document.head.style.opacity = 0;
    document.body.style.visibility = "hidden";
    document.body.style.opacity = 0;
}

function getPreferredTheme() {
    const storedTheme = localStorage.getItem('user-theme');
    if (storedTheme) {
        return storedTheme;
    } else {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
}

function setTheme(choice = "light") {
    doc.setAttribute('data-bs-theme', choice);
    onThemeChange(choice);
}

function onThemeChange(choice) {
    const theme = choice.value;
    const previous = doc.getAttribute('data-bs-theme');
    if (theme !== previous) {
        hidePage();
        console.log(`Theme loaded: ${choice}`);
        location.reload(true);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setTheme();
    console.log(`Theme loaded: ${getPreferredTheme()}`);
});

window.addEventListener('load', () => {
    showPage();
});
