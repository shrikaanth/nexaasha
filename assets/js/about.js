// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar-custom');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
    
    // Animated counters
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Intersection Observer for counters
    const counterElements = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(el => counterObserver.observe(el));
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.3 });
    
    // Set initial state and observe timeline items
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
        timelineObserver.observe(item);
    });
    
    // Intersection Observer for animations
    const animateElements = document.querySelectorAll('.hover-lift, .service-card, .philosophy-card, .impact-card, .cta-card, .question-card, .motto-card, .vision-statement');
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Set initial state and observe
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease-out';
        animateObserver.observe(el);
    });
    
    // Staggered animation for cards
    function staggerAnimation(selector, delay = 100) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * delay);
        });
    }
    
    // Hero stats animation
    setTimeout(() => {
        staggerAnimation('.hero-stats .stat-card', 200);
    }, 1000);
    
    // Add loading animation to buttons
    document.querySelectorAll('.btn-gradient, .btn-outline-gradient').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.type !== 'submit') {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            }
        });
    });
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const speed = scrolled * 0.5;
                }
    });
    
    // Dynamic floating elements
    function createFloatingElement() {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.cssText = `
            width: ${Math.random() * 100 + 50}px;
            height: ${Math.random() * 100 + 50}px;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 6}s;
            animation-duration: ${Math.random() * 4 + 4}s;
        `;
        
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.appendChild(element);
            
            // Remove element after animation
            setTimeout(() => {
                element.remove();
            }, 10000);
        }
    }
    
    // Create floating elements periodically
    setInterval(createFloatingElement, 3000);
    
    // Add scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
    
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const features = this.querySelectorAll('.feature-item');
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(10px)';
                    feature.style.color = 'var(--electric-cyan)';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const features = this.querySelectorAll('.feature-item');
            features.forEach(feature => {
                feature.style.transform = 'translateX(0)';
                feature.style.color = '';
            });
        });
    });
    
    // Philosophy card pulse effect
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    philosophyCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'pulse 3s ease-in-out infinite';
        }, index * 1000);
    });
    
    // Impact card statistics animation
    const impactCards = document.querySelectorAll('.impact-card');
    impactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const stats = this.querySelectorAll('.stat-item, .result-metric');
            stats.forEach((stat, index) => {
                setTimeout(() => {
                    stat.style.transform = 'scale(1.1)';
                    stat.style.color = 'var(--electric-cyan)';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const stats = this.querySelectorAll('.stat-item, .result-metric');
            stats.forEach(stat => {
                stat.style.transform = 'scale(1)';
                stat.style.color = '';
            });
        });
    });
    
    // Ecosystem chart animation
    const ecosystemChart = document.querySelector('.ecosystem-chart');
    if (ecosystemChart) {
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const elements = entry.target.querySelectorAll('.element-circle');
                    elements.forEach((element, index) => {
                        setTimeout(() => {
                            element.style.opacity = '1';
                            element.style.transform = 'scale(1)';
                        }, index * 500);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        // Set initial state
        const elements = ecosystemChart.querySelectorAll('.element-circle');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'scale(0)';
            element.style.transition = 'all 0.5s ease-out';
        });
        
        chartObserver.observe(ecosystemChart);
    }
    
    // Goal items animation
    const goalItems = document.querySelectorAll('.goal-item');
    goalItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
        
        const goalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.3 });
        
        goalObserver.observe(item);
    });
    
    // CTA card hover enhancement
    const ctaCards = document.querySelectorAll('.cta-card');
    ctaCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const listItems = this.querySelectorAll('li');
            listItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateX(10px)';
                    item.style.color = 'var(--electric-cyan)';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const listItems = this.querySelectorAll('li');
            listItems.forEach(item => {
                item.style.transform = 'translateX(0)';
                item.style.color = '';
            });
        });
    });
    
    // Add typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Initialize typing effect for gradient text
    const gradientText = document.querySelector('.hero-title .gradient-text');
    if (gradientText) {
        const originalText = gradientText.textContent;
        setTimeout(() => {
            typeWriter(gradientText, originalText, 150);
        }, 1000);
    }
    
    // Add mouse follower effect
    const mouseFollower = document.createElement('div');
    mouseFollower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0,217,255,0.3) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(mouseFollower);
    
    document.addEventListener('mousemove', (e) => {
        mouseFollower.style.left = e.clientX - 10 + 'px';
        mouseFollower.style.top = e.clientY - 10 + 'px';
    });
    
    // Hide mouse follower on mobile
    if (window.innerWidth <= 768) {
        mouseFollower.style.display = 'none';
    }
    
    // Add active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Question card pulse animation
    const questionCard = document.querySelector('.question-card');
    if (questionCard) {
        setTimeout(() => {
            questionCard.style.animation = 'pulse 2s ease-in-out infinite';
        }, 2000);
    }
    
    // Certification badges animation
    const certificationBadges = document.querySelectorAll('.certification-badges .badge');
    certificationBadges.forEach((badge, index) => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.boxShadow = '0 5px 15px rgba(0, 217, 255, 0.3)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '';
        });
    });
    
    // Program types and methodology items hover
    const programTypes = document.querySelectorAll('.program-type, .method-item');
    programTypes.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.color = 'var(--electric-cyan)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = '';
        });
    });
    
    // Founder story text animation
    const founderStory = document.querySelector('.founder-story');
    if (founderStory) {
        const storyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const paragraphs = entry.target.querySelectorAll('p');
                    paragraphs.forEach((p, index) => {
                        setTimeout(() => {
                            p.style.opacity = '1';
                            p.style.transform = 'translateY(0)';
                        }, index * 500);
                    });
                }
            });
        }, { threshold: 0.3 });
        
        // Set initial state
        const paragraphs = founderStory.querySelectorAll('p');
        paragraphs.forEach(p => {
            p.style.opacity = '0';
            p.style.transform = 'translateY(30px)';
            p.style.transition = 'all 0.6s ease-out';
        });
        
        storyObserver.observe(founderStory);
    }
    
    // Ecosystem elements orbital animation enhancement
    const ecosystemElements = document.querySelectorAll('.ecosystem-element');
    ecosystemElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 3.75}s`;
    });
    
    console.log('About Us page initialized successfully! 🚀');
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handlers
const debouncedScrollHandler = debounce(() => {
    // Scroll-dependent code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Utility functions for external use
window.AboutUtils = {
    // Animate specific counter
    animateSpecificCounter: function(elementId, targetValue, duration = 2000) {
        const element = document.getElementById(elementId);
        if (element) {
            let start = 0;
            const increment = targetValue / (duration / 16);
            
            function updateCounter() {
                start += increment;
                if (start < targetValue) {
                    element.textContent = Math.floor(start);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = targetValue;
                }
            }
            
            updateCounter();
        }
    },
    
    // Highlight specific section
    highlightSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.background = 'rgba(0, 217, 255, 0.05)';
            section.style.transition = 'background 0.5s ease';
            
            setTimeout(() => {
                section.style.background = '';
            }, 2000);
        }
    },
    
    // Show achievement notification
    showAchievement: function(title, description) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification position-fixed';
        notification.style.cssText = `
            top: 100px;
            right: 20px;
            z-index: 10000;
            background: var(--gradient-primary);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 217, 255, 0.3);
            animation: slideInRight 0.5s ease-out;
            max-width: 300px;
        `;
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-trophy me-3 fs-4"></i>
                <div>
                    <h6 class="mb-1">${title}</h6>
                    <small>${description}</small>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.5s ease-out';
                setTimeout(() => notification.remove(), 500);
            }
        }, 5000);
    }
};

// Add slide animations for notifications
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);