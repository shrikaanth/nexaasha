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
    
    // Intersection Observer for animations
    const animateElements = document.querySelectorAll('.hover-lift, .contact-method-card, .location-card, .contact-form-card, .consultation-card, .social-card');
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
    
    // Form validation and submission
    function setupFormValidation(formSelector, successMessage) {
        const form = document.querySelector(formSelector);
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add validation classes
            form.classList.add('was-validated');
            
            // Check if form is valid
            if (form.checkValidity()) {
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                // Show loading state
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // Remove loading state
                    submitBtn.classList.remove('loading');
                    
                    // Show success message
                    showFormSuccess(form, successMessage);
                    
                    // Reset form after delay
                    setTimeout(() => {
                        form.reset();
                        form.classList.remove('was-validated');
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        hideFormMessage(form);
                    }, 3000);
                    
                }, 2000);
            } else {
                // Show error message for invalid form
                showFormError(form, 'Please fill in all required fields correctly.');
            }
        });
    }
    
    // Show success message
    function showFormSuccess(form, message) {
        hideFormMessage(form);
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h5>Success!</h5>
            <p>${message}</p>
        `;
        form.appendChild(successDiv);
    }
    
    // Show error message
    function showFormError(form, message) {
        hideFormMessage(form);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <h5>Error</h5>
            <p>${message}</p>
        `;
        form.appendChild(errorDiv);
    }
    
    // Hide form messages
    function hideFormMessage(form) {
        const existingMessage = form.querySelector('.form-success, .form-error');
        if (existingMessage) {
            existingMessage.remove();
        }
    }
    
    // Setup form validations
    setupFormValidation('.general-contact-form', 'Thank you for your message! We\'ll respond within 24 hours.');
    setupFormValidation('.speaking-form', 'Your speaking engagement request has been submitted! We\'ll contact you within 24 hours to discuss details.');
    setupFormValidation('.consultation-form', 'Your consultation has been scheduled! You\'ll receive a confirmation email with meeting details shortly.');
    
    // Live chat functionality
    window.openLiveChat = function() {
        // Simulate opening live chat
        alert('Live chat would open here. This is a demo - in a real implementation, this would connect to your chat service.');
    };
    
    // Add loading animation to buttons
    document.querySelectorAll('.btn-gradient, .btn-outline-gradient').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.type !== 'submit' && !this.onclick) {
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
    
    // Contact method card hover effects
    const contactCards = document.querySelectorAll('.contact-method-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--electric-cyan)';
            this.style.boxShadow = '0 20px 40px rgba(0, 217, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    });
    
    // Location card hover effects
    const locationCards = document.querySelectorAll('.location-card');
    locationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const services = this.querySelectorAll('.location-services .badge');
            services.forEach((service, index) => {
                setTimeout(() => {
                    service.style.transform = 'scale(1.1)';
                    service.style.backgroundColor = 'var(--electric-cyan)';
                    service.style.color = 'white';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const services = this.querySelectorAll('.location-services .badge');
            services.forEach(service => {
                service.style.transform = 'scale(1)';
                service.style.backgroundColor = '';
                service.style.color = '';
            });
        });
    });
    
    // Form field focus effects
    const formFields = document.querySelectorAll('.form-control, .form-select');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
    
    // Consultation goals checkbox animation
    const consultationGoals = document.querySelectorAll('.consultation-goals .form-check-input');
    consultationGoals.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                label.style.color = 'var(--electric-cyan)';
                label.style.fontWeight = '600';
                label.style.transform = 'translateX(5px)';
            } else {
                label.style.color = '';
                label.style.fontWeight = '';
                label.style.transform = 'translateX(0)';
            }
        });
    });
    
    // FAQ accordion enhancement
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add pulse effect to clicked accordion
            this.style.animation = 'pulse 0.3s ease-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
    
    // Social media card hover effects
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.social-icon');
            icon.style.background = 'var(--gradient-secondary)';
            icon.style.transform = 'scale(1.2) rotate(360deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.social-icon');
            icon.style.background = '';
            icon.style.transform = '';
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
    
    // Form field validation enhancement
    const requiredFields = document.querySelectorAll('input[required], select[required], textarea[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = 'var(--bs-danger)';
                this.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.2)';
            } else {
                this.style.borderColor = 'var(--bs-success)';
                this.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.2)';
            }
        });
        
        field.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = 'var(--bs-success)';
                this.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.2)';
            }
        });
    });
    
    // Email validation
    const emailFields = document.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        field.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = 'var(--bs-danger)';
                this.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.2)';
            }
        });
    });
    
    // Phone number formatting
    const phoneFields = document.querySelectorAll('input[type="tel"]');
    phoneFields.forEach(field => {
        field.addEventListener('input', function() {
            // Simple phone number formatting (US format)
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            }
            this.value = value;
        });
    });
    
    // Date field minimum date (today)
    const dateFields = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateFields.forEach(field => {
        field.setAttribute('min', today);
    });
    
    // Auto-resize textareas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
    
    console.log('Contact page initialized successfully! 📞');
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
window.ContactUtils = {
    // Show custom notification
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} position-fixed`;
        notification.style.cssText = `
            top: 100px;
            right: 20px;
            z-index: 10000;
            min-width: 300px;
            animation: slideInRight 0.3s ease-out;
        `;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'danger' ? 'exclamation' : 'info'}-circle me-2"></i>
            ${message}
            <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    },
    
    // Validate form data
    validateForm: function(formData) {
        const errors = [];
        
        // Check required fields
        for (let [key, value] of formData.entries()) {
            const field = document.querySelector(`[name="${key}"]`);
            if (field && field.hasAttribute('required') && !value.trim()) {
                errors.push(`${key} is required`);
            }
        }
        
        // Validate email format
        const email = formData.get('email') || formData.get('contactEmail') || formData.get('consultEmail');
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errors.push('Please enter a valid email address');
            }
        }
        
        return errors;
    },
    
    // Format phone number
    formatPhone: function(phone) {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 10) {
            return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        }
        return phone;
    }
};