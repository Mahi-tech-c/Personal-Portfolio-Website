// Main Application
const App = {
    async init() {
        try {
            // Initialize theme
            Theme.init();

            // Initialize navigation
            Navigation.init();

            // Initialize animations
            Animations.init();

            // Setup project filters
            Sections.setupProjectFilters();

            // Setup contact form
            Sections.setupContactForm();

            // Setup modal
            Sections.setupModal();

            // Set current year
            const yearEl = document.getElementById('current-year');
            if (yearEl) yearEl.textContent = new Date().getFullYear();

            // Load data from API
            await this.loadAllData();

            // Hide loader
            this.hideLoader();

        } catch (error) {
            console.error('App initialization error:', error);
            this.hideLoader();
        }
    },

    async loadAllData() {
        // Load all data in parallel
        const results = await Promise.allSettled([
            Sections.loadProfile(),
            Sections.loadSkills(),
            Sections.loadProjects(),
            Sections.loadCertificates(),
            Sections.loadAchievements()
        ]);

        // Log any failures
        results.forEach((result, index) => {
            if (result.status === 'rejected') {
                const names = ['Profile', 'Skills', 'Projects', 'Certificates', 'Achievements'];
                console.warn(`Failed to load ${names[index]}:`, result.reason);
            }
        });
    },

    hideLoader() {
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => loader.remove(), 300);
            }, 500);
        }
    }
};

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
