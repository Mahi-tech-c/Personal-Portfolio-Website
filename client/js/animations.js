// Animations
const Animations = {
    typingInterval: null,

    init() {
        this.setupScrollAnimations();
        this.setupCounterAnimations();
    },

    // Typing animation for hero section
    startTyping(titles) {
        const typingElement = document.getElementById('typing-text');
        if (!typingElement || !titles.length) return;

        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentTitle = titles[titleIndex];

            if (isDeleting) {
                typingElement.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentTitle.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                typeSpeed = 500; // Pause before new word
            }

            this.typingInterval = setTimeout(type, typeSpeed);
        };

        type();
    },

    // Stop typing animation
    stopTyping() {
        if (this.typingInterval) {
            clearTimeout(this.typingInterval);
        }
    },

    // Scroll reveal animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Animate skill bars if in skills section
                    if (entry.target.closest('#skills')) {
                        this.animateSkillBars();
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.fade-in, .stat-item, .project-card, .certificate-card, .achievement-card, .skill-category, .timeline-card').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    },

    // Animate skill progress bars
    animateSkillBars() {
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const target = bar.getAttribute('data-width');
            if (target) {
                setTimeout(() => {
                    bar.style.width = target + '%';
                }, 200);
            }
        });
    },

    // Counter animation for statistics
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    },

    animateCounter(element) {
        const target = parseFloat(element.textContent);
        const isDecimal = target % 1 !== 0;
        const duration = 2000;
        const start = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic

            const current = target * eased;
            element.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = isDecimal ? target.toFixed(2) : target;
            }
        };

        requestAnimationFrame(update);
    }
};
