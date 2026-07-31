// API Service
const API = {
    // Get auth token from localStorage
    getToken() {
        return localStorage.getItem('token');
    },

    // Set auth token
    setToken(token) {
        localStorage.setItem('token', token);
    },

    // Remove auth token
    removeToken() {
        localStorage.removeItem('token');
    },

    // Base fetch method
    async request(endpoint, options = {}) {
        const url = `${CONFIG.API_BASE_URL}${endpoint}`;
        const token = this.getToken();

        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            return data;
        } catch (error) {
            if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                throw new Error('Unable to connect to server. Please make sure the backend is running.');
            }
            throw error;
        }
    },

    // GET request
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    },

    // POST request
    async post(endpoint, body) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        });
    },

    // PUT request
    async put(endpoint, body) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    },

    // DELETE request
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    },

    // Auth methods
    async login(email, password) {
        const data = await this.post('/auth/login', { email, password });
        if (data.token) {
            this.setToken(data.token);
        }
        return data;
    },

    // Profile
    async getProfile() {
        return this.get('/profile');
    },

    // Projects
    async getProjects(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.get(`/projects${query ? '?' + query : ''}`);
    },

    async getProject(id) {
        return this.get(`/projects/${id}`);
    },

    // Skills
    async getSkills() {
        return this.get('/skills');
    },

    // Certificates
    async getCertificates() {
        return this.get('/certificates');
    },

    // Achievements
    async getAchievements() {
        return this.get('/achievements');
    },

    // Contact
    async submitContact(formData) {
        return this.post('/contact', formData);
    }
};
