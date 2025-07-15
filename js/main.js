document.addEventListener('DOMContentLoaded', function() {
    // ====================================================
    // Navbar
    // ====================================================

    const navLinks = document.querySelectorAll('.navbar nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = 'none';
        }
        
    });

    // ====================================================
    // intro Section Animations
    // ====================================================
    
    // Animate planes on scroll
    const planes = document.querySelectorAll('.plane');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        planes.forEach((plane, index) => {
            const speed = (index + 1) * 0.3;
            plane.style.transform = `translateX(${rate * speed}px) rotate(-10deg)`;
        });
    });

    // ====================================================
    // Testimonials Section
    // ====================================================
    
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const arrowUp = document.querySelector('.arrow.up');
    const arrowDown = document.querySelector('.arrow.down');
    
    let currentTestimonial = 0;
    const totalTestimonials = testimonialCards.length;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => {
            card.classList.remove('active');
            card.classList.add('inactive');
        });
        
        // Show selected testimonial
        if (testimonialCards[index]) {
            testimonialCards[index].classList.remove('inactive');
            testimonialCards[index].classList.add('active');
        }
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentTestimonial = index;
    }
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Arrow click handlers
    if (arrowUp) {
        arrowUp.addEventListener('click', () => {
            const nextIndex = (currentTestimonial + 1) % totalTestimonials;
            showTestimonial(nextIndex);
        });
    }
    
    if (arrowDown) {
        arrowDown.addEventListener('click', () => {
            const prevIndex = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
            showTestimonial(prevIndex);
        });
    }

    // ====================================================
    // Trip Booking Section
    // ====================================================
    
    // Floating card animation
    const floatingCard = document.querySelector('.floating-card');
    
    if (floatingCard) {
        // Animate progress bar
        const progressBar = floatingCard.querySelector('.progress-bar-fill');
        
        function animateProgress() {
            let width = 0;
            const interval = setInterval(() => {
                if (width >= 40) {
                    clearInterval(interval);
                } else {
                    width++;
                    progressBar.style.width = width + '%';
                }
            }, 50);
        }
        
        // Start animation when card comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgress();
                }
            });
        });
    }

    // Heart like button
    const heartButton = document.querySelector('.heart');
    if (heartButton) {
        heartButton.addEventListener('click', function() {
            this.style.background = this.style.background === 'rgb(223, 105, 81)' ? '#f0f0f0' : '#DF6951';
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // ====================================================
    // Subscribe Section
    // ====================================================
    
    const subscribeForm = document.querySelector('.subscribe form');
    const emailInput = document.querySelector('.subscribe input[type="email"]');
    const subscribeButton = document.querySelector('.subscribe button');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (!email) {
                showNotification('Please enter your email address', 'error');
                return;
            }            
            // Simulate subscription
            subscribeButton.textContent = 'Subscribing...';
            subscribeButton.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you for subscribing!', 'success');
                emailInput.value = '';
                subscribeButton.textContent = 'Subscribe';
                subscribeButton.disabled = false;
            }, 2000);
        });
    }
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            background: #5E6282;}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // ====================================================
    // Footer
    // ====================================================
    
    // Footer links hover effect
    const footerLinks = document.querySelectorAll('.footer-links ul li');
    
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = '#F1A501';
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = '#5e6282';
            this.style.transform = 'translateX(0)';
        });
    });

    // ====================================================
    // General Animations and Effects
    // ====================================================
    
    // Scroll-triggered animations
    const animateOnScroll = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    };
    
    const scrollObserver = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1
    });
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.title-section, .subtitle-section, .card, .item, .step');
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .title-section, .subtitle-section, .card, .item, .step {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .title-section.animate, .subtitle-section.animate, .card.animate, .item.animate, .step.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .notification {
            font-family: 'Poppins', sans-serif;
        }
        
        .footer-links ul li {
            transition: color 0.3s ease, transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // ====================================================
    // Mobile Menu
    // ====================================================
    function createMobileMenu() {
        const navbar = document.querySelector('.navbar');
        const nav = document.querySelector('.navbar nav');

        if (!document.querySelector('.hamburger')) {
            const hamburger = document.createElement('div');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = '☰';
            hamburger.style.cssText = `
                display: none;
                font-size: 24px;
                cursor: pointer;
                color: #212832;
            `;
            navbar.insertBefore(hamburger, nav);

            hamburger.addEventListener('click', () => {
                nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            });
        }

        const hamburger = document.querySelector('.hamburger');

        if (window.innerWidth <= 768) {
            nav.style.display = 'none';
            hamburger.style.display = 'block';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.background = 'white';
            nav.style.padding = '20px';
            nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            nav.style.display = 'flex';
            hamburger.style.display = 'none';
            nav.style.position = '';
            nav.style.top = '';
            nav.style.left = '';
            nav.style.width = '';
            nav.style.padding = '';
            nav.style.boxShadow = '';
        }
    }

    
    // Initialize mobile menu
    createMobileMenu();
    
    // Reinitialize on resize
    window.addEventListener('resize', createMobileMenu);

    // ====================================================
    // Performance Optimizations
    // ====================================================
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Debounced scroll handler
    let scrollTimeout;
    function debounce(func, wait) {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(scrollTimeout);
                func(...args);
            };
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(later, wait);
        };
    }

    console.log('Jadoo Travel Website JavaScript loaded successfully!');
});

// ====================================================

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.JadooUtils = {
    scrollToTop
};
