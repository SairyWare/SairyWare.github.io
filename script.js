// ===== DOM ELEMENTS =====
const themeToggleBtn = document.getElementById('themeToggle');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

// ===== THEME TOGGLE =====
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    // Update button icon
    const icon = themeToggleBtn.querySelector('i');
    icon.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    // Save preference to localStorage
    localStorage.setItem('sairyware-theme', newTheme);
}

themeToggleBtn.addEventListener('click', toggleTheme);

// Load saved theme on page load
(function loadSavedTheme() {
    const savedTheme = localStorage.getItem('sairyware-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const icon = themeToggleBtn.querySelector('i');
    icon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
})();

// ===== PAGE NAVIGATION SYSTEM =====
// This creates a smooth page switching system similar to Roblox UIs[citation:5]
function switchPage(event) {
    event.preventDefault();
    const targetPageName = this.getAttribute('data-page');

    // Update active nav link
    navLinks.forEach(link => link.classList.remove('active'));
    this.classList.add('active');

    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(`${targetPageName}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
        // Smooth scroll to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Attach event listeners to nav links
navLinks.forEach(link => {
    link.addEventListener('click', switchPage);
});

// ===== POPULATE PROJECTS PAGE =====
// Sample project data - you can replace this with your own!
const sampleProjects = [
    {
        title: "Advanced Admin System",
        description: "A feature-rich admin panel with Discord webhook logging, role management, and in-game moderation tools.",
        tags: ["Backend", "UI", "HTTP Service"],
        icon: "fas fa-user-shield"
    },
    {
        title: "Procedural Map Generator",
        description: "Dynamically generates unique terrain and dungeons using Perlin noise and custom algorithms.",
        tags: ["Algorithm", "Terrain", "Procedural"],
        icon: "fas fa-mountain"
    },
    {
        title: "Real-Time Data Sync",
        description: "A module for synchronizing player data across servers with conflict resolution and caching.",
        tags: ["DataStore", "Module", "Optimization"],
        icon: "fas fa-database"
    },
    {
        title: "Custom TweenService Library",
        description: "An expanded TweenService library allowing per-axis easing and custom bezier curves[citation:8].",
        tags: ["UI", "Animation", "Library"],
        icon: "fas fa-wave-square"
    }
];

function populateProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';
    sampleProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <i class="${project.icon}"></i>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// ===== POPULATE SCRIPTS PAGE =====
const sampleScripts = [
    {
        name: "Clean Module Template",
        description: "A well-structured module template with sections for services, variables, and methods[citation:2].",
        downloadLink: "#"
    },
    {
        name: "Simple Page Switcher",
        description: "A lightweight script for smooth page transitions in GUIs, similar to UIPageLayout[citation:5].",
        downloadLink: "#"
    },
    {
        name: "HTTP Request Wrapper",
        description: "A utility for handling HTTP requests to external APIs with error handling and retry logic.",
        downloadLink: "#"
    }
];

function populateScripts() {
    const scriptsList = document.querySelector('.scripts-list');
    if (!scriptsList) return;

    scriptsList.innerHTML = '';
    sampleScripts.forEach(script => {
        const scriptItem = document.createElement('div');
        scriptItem.className = 'script-item';
        scriptItem.innerHTML = `
            <div class="script-info">
                <h3>${script.name}</h3>
                <p>${script.description}</p>
            </div>
            <a href="${script.downloadLink}" class="script-download" download>
                <i class="fas fa-download"></i> Download
            </a>
        `;
        scriptsList.appendChild(scriptItem);
    });
}

// ===== UTILITY FUNCTIONS =====
function copySnippet() {
    const snippetText = document.querySelector('code.language-lua').innerText;
    navigator.clipboard.writeText(snippetText).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.style.background = 'var(--success)';
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
        }, 2000);
    });
}

function setCurrentYear() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// ===== INITIALIZE EVERYTHING WHEN PAGE LOADS =====
document.addEventListener('DOMContentLoaded', function() {
    setCurrentYear();
    populateProjects();
    populateScripts();
    console.log('SairyWare Portfolio loaded successfully! 🚀');
});