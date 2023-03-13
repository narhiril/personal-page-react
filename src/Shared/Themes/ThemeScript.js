export const doc = document.documentElement;

export function showPage() {
    document.head.style.visibility = "visible";
    document.head.style.opacity = 1;
    document.body.style.visibility = "visible";
    document.body.style.opacity = 1;
}

export function hidePage() {
    document.head.style.visibility = "hidden";
    document.head.style.opacity = 0;
    document.body.style.visibility = "hidden";
    document.body.style.opacity = 0;
}

export function getPreferredTheme() {
    const storedTheme = localStorage.getItem('user-theme');
    if (storedTheme) {
        return storedTheme;
    } else {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 
               window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 
               'deepblue';
    }
}

export function setTheme(choice = "light") {
    doc.setAttribute('data-bs-theme', choice);
    onThemeChange(choice);
}

export function onThemeChange(choice) {
    const theme = choice.value;
    const previous = doc.getAttribute('data-bs-theme');
    if (theme !== previous) {
        hidePage();
        console.log(`Theme loaded: ${choice}`);
        localStorage.setItem('user-theme', choice);
        showPage();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const pref = getPreferredTheme();
    setTheme(pref);
});

window.addEventListener('load', () => {
    showPage();
});
