// Utility Functions
const Utils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Show notification
    showNotification(message, type = 'success', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: '9999',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transform: 'translateX(120%)',
            transition: 'transform 0.3s ease',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.9rem'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.style.transform = 'translateX(0)', 10);

        // Animate out
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    },

    // Format date
    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    },

    // Sanitize HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // Get icon for category
    getCategoryIcon(category) {
        const icons = {
            'Web Development': 'fa-globe',
            'Desktop App': 'fa-desktop',
            'IoT': 'fa-microchip',
            'Mobile App': 'fa-mobile-alt',
            'Machine Learning': 'fa-brain',
            'Other': 'fa-code',
            'Programming Languages': 'fa-code',
            'Database': 'fa-database',
            'Tools & Technologies': 'fa-tools',
            'Soft Skills': 'fa-users'
        };
        return icons[category] || 'fa-folder';
    },

    // Get achievement icon
    getAchievementIcon(iconName) {
        const icons = {
            'trophy': 'fa-trophy',
            'star': 'fa-star',
            'code': 'fa-code',
            'medal': 'fa-medal',
            'award': 'fa-award',
            'certificate': 'fa-certificate'
        };
        return icons[iconName] || 'fa-trophy';
    }
};
