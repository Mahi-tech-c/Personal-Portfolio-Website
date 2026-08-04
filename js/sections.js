// Section Renderers
const Sections = {
    currentProjectPage: 1,
    currentFilter: 'all',
    currentSearch: '',

    // Load and render profile section
    async loadProfile() {
        try {
            const { data } = await API.getProfile();
            if (!data) return;

            // Hero section
            const nameEl = document.getElementById('profile-name');
            const bioEl = document.getElementById('profile-bio');
            const imgEl = document.getElementById('profile-image');

            if (nameEl) nameEl.textContent = data.name;
            if (bioEl) bioEl.textContent = data.bio;
            if (imgEl && data.profileImage) imgEl.src = data.profileImage;

            // Social links
            if (data.socialLinks) {
                const ghLink = document.querySelector('.social-link[href*="github"]');
                const liLink = document.querySelector('.social-link[href*="linkedin"]');
                if (ghLink && data.socialLinks.github) ghLink.href = data.socialLinks.github;
                if (liLink && data.socialLinks.linkedin) liLink.href = data.socialLinks.linkedin;
            }

            // About section
            const aboutText = document.getElementById('about-text');
            if (aboutText) aboutText.textContent = data.bio;

            const aboutBirthday = document.getElementById('about-birthday');
            const aboutLocation = document.getElementById('about-location');
            const aboutEmail = document.getElementById('about-email');
            const aboutPhone = document.getElementById('about-phone');

            if (aboutBirthday && data.birthday) aboutBirthday.textContent = data.birthday;
            if (aboutLocation && data.location) aboutLocation.textContent = data.location;
            if (aboutEmail && data.email) aboutEmail.textContent = data.email;
            if (aboutPhone && data.phone) aboutPhone.textContent = data.phone;

            // Typing animation
            if (data.typingTitles && data.typingTitles.length) {
                Animations.startTyping(data.typingTitles);
            }

            // Timeline (education & experience)
            this.renderTimeline(data);
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    },

    // Render timeline
    renderTimeline(profile) {
        const timeline = document.getElementById('timeline');
        if (!timeline) return;

        let items = [];

        if (profile.education) {
            profile.education.forEach(edu => {
                items.push({
                    title: edu.degree,
                    subtitle: edu.institution,
                    year: edu.year,
                    description: edu.description,
                    type: 'education'
                });
            });
        }

        if (profile.experience) {
            profile.experience.forEach(exp => {
                items.push({
                    title: exp.title,
                    subtitle: exp.company,
                    year: exp.year,
                    description: exp.description,
                    type: 'experience'
                });
            });
        }

        if (items.length === 0) {
            timeline.innerHTML = '<div class="empty-state"><i class="fas fa-graduation-cap"></i><p>No education or experience data yet.</p></div>';
            return;
        }

        timeline.innerHTML = items.map((item, index) => `
            <div class="timeline-item fade-in" style="animation-delay: ${index * 0.1}s">
                <div class="timeline-card">
                    <h4>${Utils.escapeHtml(item.title)}</h4>
                    <p class="timeline-year">${Utils.escapeHtml(item.subtitle || '')} ${item.year ? '| ' + Utils.escapeHtml(item.year) : ''}</p>
                    ${item.description ? `<p>${Utils.escapeHtml(item.description)}</p>` : ''}
                </div>
            </div>
        `).join('');
    },

    // Load and render skills
    async loadSkills() {
        try {
            const { data, grouped } = await API.getSkills();
            const container = document.getElementById('skills-container');
            if (!container) return;

            if (!data || data.length === 0) {
                container.innerHTML = '<div class="empty-state"><i class="fas fa-code"></i><p>No skills added yet.</p></div>';
                return;
            }

            const categories = grouped || {};
            let html = '';

            Object.keys(categories).forEach(category => {
                const skills = categories[category];
                html += `
                    <div class="skill-category fade-in">
                        <h3><i class="fas ${Utils.getCategoryIcon(category)}"></i> ${Utils.escapeHtml(category)}</h3>
                        ${skills.map(skill => `
                            <div class="skill-item">
                                <div class="skill-header">
                                    <span class="skill-name">${Utils.escapeHtml(skill.name)}</span>
                                    <span class="skill-percent">${skill.proficiency}%</span>
                                </div>
                                <div class="skill-bar">
                                    <div class="skill-progress" data-width="${skill.proficiency}"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            });

            container.innerHTML = html;

            // Trigger skill bar animations after a delay
            setTimeout(() => Animations.animateSkillBars(), 500);
        } catch (error) {
            console.error('Error loading skills:', error);
        }
    },

    // Load and render projects
    async loadProjects(page = 1) {
        try {
            const params = { page, limit: 6 };

            if (this.currentFilter !== 'all') {
                params.category = this.currentFilter;
            }

            if (this.currentSearch) {
                params.search = this.currentSearch;
            }

            const { data, pagination } = await API.getProjects(params);
            const grid = document.getElementById('projects-grid');
            const paginationEl = document.getElementById('projects-pagination');

            if (!grid) return;

            if (!data || data.length === 0) {
                grid.innerHTML = '<div class="empty-state"><i class="fas fa-project-diagram"></i><p>No projects found.</p></div>';
                if (paginationEl) paginationEl.innerHTML = '';
                return;
            }

            grid.innerHTML = data.map(project => `
                <div class="project-card fade-in" data-id="${project._id}">
                    <div class="project-image">
                        ${project.imageUrl
                            ? `<img src="${Utils.escapeHtml(project.imageUrl)}" alt="${Utils.escapeHtml(project.title)}">`
                            : `<i class="fas ${Utils.getCategoryIcon(project.category)}"></i>`
                        }
                        ${project.featured ? '<span class="project-badge">Featured</span>' : ''}
                    </div>
                    <div class="project-content">
                        <h3>${Utils.escapeHtml(project.title)}</h3>
                        <p>${Utils.escapeHtml(project.shortDescription || project.description)}</p>
                        <div class="project-tech">
                            ${(project.technologies || []).slice(0, 4).map(tech =>
                                `<span class="tech-tag">${Utils.escapeHtml(tech)}</span>`
                            ).join('')}
                        </div>
                        <div class="project-links">
                            ${project.githubUrl ? `<a href="${Utils.escapeHtml(project.githubUrl)}" class="project-link" target="_blank"><i class="fab fa-github"></i> Code</a>` : ''}
                            ${project.liveUrl ? `<a href="${Utils.escapeHtml(project.liveUrl)}" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i> Live</a>` : ''}
                        </div>
                    </div>
                </div>
            `).join('');

            // Add click listeners for modal
            grid.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    if (e.target.closest('a')) return;
                    this.openProjectModal(card.dataset.id);
                });
            });

            // Render pagination
            if (paginationEl && pagination.pages > 1) {
                let paginationHtml = '';
                for (let i = 1; i <= pagination.pages; i++) {
                    paginationHtml += `<button class="page-btn ${i === pagination.page ? 'active' : ''}" data-page="${i}">${i}</button>`;
                }
                paginationEl.innerHTML = paginationHtml;

                paginationEl.querySelectorAll('.page-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        this.currentProjectPage = parseInt(btn.dataset.page);
                        this.loadProjects(this.currentProjectPage);
                        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
                    });
                });
            } else if (paginationEl) {
                paginationEl.innerHTML = '';
            }
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    },

    // Open project modal
    async openProjectModal(id) {
        try {
            const { data } = await API.getProject(id);
            const modal = document.getElementById('project-modal');
            const modalBody = document.getElementById('modal-body');

            if (!modal || !modalBody) return;

            modalBody.innerHTML = `
                <h2>${Utils.escapeHtml(data.title)}</h2>
                <p class="modal-category"><i class="fas ${Utils.getCategoryIcon(data.category)}"></i> ${Utils.escapeHtml(data.category)}</p>
                <p class="modal-description">${Utils.escapeHtml(data.description)}</p>
                <div class="modal-tech">
                    ${(data.technologies || []).map(tech => `<span class="tech-tag">${Utils.escapeHtml(tech)}</span>`).join('')}
                </div>
                <div class="modal-links">
                    ${data.githubUrl ? `<a href="${Utils.escapeHtml(data.githubUrl)}" class="btn btn-secondary" target="_blank"><i class="fab fa-github"></i> View Code</a>` : ''}
                    ${data.liveUrl ? `<a href="${Utils.escapeHtml(data.liveUrl)}" class="btn btn-primary" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                </div>
            `;

            modal.classList.add('active');
        } catch (error) {
            console.error('Error loading project:', error);
        }
    },

    // Setup project filters
    setupProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const searchInput = document.getElementById('project-search');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.dataset.filter;
                this.currentProjectPage = 1;
                this.loadProjects(1);
            });
        });

        if (searchInput) {
            searchInput.addEventListener('input', Utils.debounce((e) => {
                this.currentSearch = e.target.value;
                this.currentProjectPage = 1;
                this.loadProjects(1);
            }, 300));
        }
    },

    // Load and render certificates
    async loadCertificates() {
        try {
            const { data } = await API.getCertificates();
            const grid = document.getElementById('certificates-grid');
            if (!grid) return;

            if (!data || data.length === 0) {
                grid.innerHTML = '<div class="empty-state"><i class="fas fa-certificate"></i><p>No certificates added yet.</p></div>';
                return;
            }

            grid.innerHTML = data.map(cert => `
                <div class="certificate-card fade-in">
                    <div class="cert-icon">
                        <i class="fas fa-certificate"></i>
                    </div>
                    <h3>${Utils.escapeHtml(cert.title)}</h3>
                    <p class="cert-issuer">${Utils.escapeHtml(cert.issuer)}</p>
                    <p class="cert-date"><i class="fas fa-calendar-alt"></i> ${Utils.escapeHtml(cert.date)}</p>
                    ${cert.description ? `<p>${Utils.escapeHtml(cert.description)}</p>` : ''}
                    ${cert.credentialUrl ? `<a href="${Utils.escapeHtml(cert.credentialUrl)}" class="cert-link" target="_blank"><i class="fas fa-external-link-alt"></i> View Credential</a>` : ''}
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading certificates:', error);
        }
    },

    // Load and render achievements
    async loadAchievements() {
        try {
            const { data } = await API.getAchievements();
            const grid = document.getElementById('achievements-grid');
            if (!grid) return;

            if (!data || data.length === 0) {
                grid.innerHTML = '<div class="empty-state"><i class="fas fa-trophy"></i><p>No achievements added yet.</p></div>';
                return;
            }

            grid.innerHTML = data.map(achievement => `
                <div class="achievement-card fade-in">
                    <div class="achievement-icon">
                        <i class="fas ${Utils.getAchievementIcon(achievement.icon)}"></i>
                    </div>
                    <h3>${Utils.escapeHtml(achievement.title)}</h3>
                    ${achievement.date ? `<p class="achievement-date">${Utils.escapeHtml(achievement.date)}</p>` : ''}
                    <p>${Utils.escapeHtml(achievement.description)}</p>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading achievements:', error);
        }
    },

    // Setup contact form
    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            const formMessage = document.getElementById('form-message');

            // Clear previous errors
            form.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            formMessage.className = 'form-message';
            formMessage.style.display = 'none';

            const formData = {
                name: form.name.value.trim(),
                email: form.email.value.trim(),
                subject: form.subject.value.trim(),
                message: form.message.value.trim()
            };

            // Client-side validation
            let hasError = false;
            if (formData.name.length < 2) {
                document.getElementById('name-error').textContent = 'Name must be at least 2 characters';
                hasError = true;
            }
            if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email';
                hasError = true;
            }
            if (formData.subject.length < 2) {
                document.getElementById('subject-error').textContent = 'Subject must be at least 2 characters';
                hasError = true;
            }
            if (formData.message.length < 10) {
                document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
                hasError = true;
            }

            if (hasError) return;

            // Show loading
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-flex';
            submitBtn.disabled = true;

            try {
                const response = await API.submitContact(formData);

                formMessage.textContent = response.message || 'Message sent successfully!';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                form.reset();

                Utils.showNotification('Message sent successfully!', 'success');
            } catch (error) {
                formMessage.textContent = error.message || 'Failed to send message. Please try again.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';

                Utils.showNotification('Failed to send message', 'error');
            } finally {
                btnText.style.display = 'inline-flex';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
    },

    // Setup modal close
    setupModal() {
        const modal = document.getElementById('project-modal');
        const closeBtn = document.querySelector('.modal-close');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    }
};
