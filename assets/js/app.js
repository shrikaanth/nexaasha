// Wait for DOM to be fully loaded
if (!window.__nexaashaInitDone) {
    window.__nexaashaInitDone = true;

    document.addEventListener('DOMContentLoaded', function () {
        const navbar = document.querySelector('.navbar-custom');
        const heroSection = document.querySelector('.hero-section');

        function handleScrollEvents() {
            // Navbar scroll class
            if (window.scrollY > 50) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }

            // Scroll progress
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            scrollProgress.style.width = (winScroll / height) * 100 + '%';

            // Parallax
            if (heroSection) {
                heroSection.style.backgroundPositionY = `${winScroll * 0.5}px`;
            }
        }

        window.addEventListener('scroll', debounce(handleScrollEvents, 10));

        // Smooth scrolling for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse?.classList.contains('show')) {
                        bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
                    }
                }
            });
        });

        // Counter animation
        function animateCounter(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            function updateCounter() {
                start += increment;
                if (start < target) {
                    element.textContent = Math.floor(start).toLocaleString() + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target.toLocaleString() + '+';
                }
            }
            updateCounter();
        }

        const counterObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    animateCounter(entry.target, target);
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

        // Appear on scroll animation
        const animateObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.hover-lift, .program-card, .testimonial-card, .impact-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'all 0.6s ease-out';
            animateObserver.observe(el);
        });

        // Staggered card animation
        setTimeout(() => {
            document.querySelectorAll('.hero-stats .stat-card').forEach((el, i) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, i * 200);
            });
        }, 1000);

        // Contact form simulation
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
                submitBtn.disabled = true;
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
                    submitBtn.classList.replace('btn-gradient', 'btn-success');
                    setTimeout(() => {
                        this.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.classList.replace('btn-success', 'btn-gradient');
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1500);
            });
        }

        // Button ripple effect
        document.querySelectorAll('.btn-gradient, .btn-outline-gradient').forEach(btn => {
            btn.addEventListener('click', function (e) {
                if (this.type !== 'submit') {
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    ripple.style.cssText = `
                        width: ${size}px; height: ${size}px; left: ${x}px; top: ${y}px;
                        position: absolute; border-radius: 50%; background: rgba(255,255,255,0.3);
                        transform: scale(0); animation: ripple 0.6s linear; pointer-events: none;`;
                    this.style.position = 'relative';
                    this.style.overflow = 'hidden';
                    this.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 600);
                }
            });
        });

        // Ripple keyframes
        const style = document.createElement('style');
        style.textContent = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
        document.head.appendChild(style);

        // Scroll progress bar
        const scrollProgress = document.createElement('div');
        scrollProgress.style.cssText = `
            position: fixed; top: 0; left: 0; width: 0%; height: 3px;
            background: var(--gradient-primary); z-index: 9999; transition: width 0.1s ease;`;
        document.body.appendChild(scrollProgress);

        // Lazy loading images
        const imageObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));

        // Typing animation
        const heroTitle = document.querySelector('.hero-title .gradient-text');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.innerHTML = '';
            setTimeout(() => {
                let i = 0;
                function type() {
                    if (i < text.length) {
                        heroTitle.innerHTML += text.charAt(i);
                        i++;
                        setTimeout(type, 150);
                    }
                }
                type();
            }, 1000);
        }

        // Mouse follower
        const mouseFollower = document.createElement('div');
        mouseFollower.style.cssText = `
            position: fixed; width: 20px; height: 20px; border-radius: 50%;
            background: radial-gradient(circle, rgba(0,217,255,0.3) 0%, transparent 70%);
            pointer-events: none; z-index: 9999; transition: transform 0.1s ease;`;
        document.body.appendChild(mouseFollower);

        function updateMouseFollowerVisibility() {
            mouseFollower.style.display = window.innerWidth <= 768 ? 'none' : 'block';
        }
        window.addEventListener('resize', updateMouseFollowerVisibility);
        updateMouseFollowerVisibility();

        document.addEventListener('mousemove', (e) => {
            mouseFollower.style.left = e.clientX - 10 + 'px';
            mouseFollower.style.top = e.clientY - 10 + 'px';
        });

        // Floating elements
        function createFloatingElement() {
            const element = document.createElement('div');
            element.className = 'floating-element';
            const size = Math.random() * 80 + 20;
            element.style.cssText = `
                width: ${size}px; height: ${size}px;
                top: ${Math.random() * 100}%;
                left: ${Math.min(95, Math.random() * 90)}%;
                animation-delay: ${Math.random() * 6}s;
                animation-duration: ${Math.random() * 4 + 4}s;`;
            heroSection?.appendChild(element);
            setTimeout(() => element.remove(), 10000);
        }
        setInterval(createFloatingElement, 3000);

        console.log('NexAasha website initialized successfully! 🚀');
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
