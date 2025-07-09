// Enhanced landing page functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Feature tabs functionality
    const featureItems = document.querySelectorAll('.feature-item');
    const featureImages = document.querySelectorAll('.feature-image');

    featureItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Remove active class from all items and images
            featureItems.forEach(fi => fi.classList.remove('active'));
            featureImages.forEach(img => img.classList.remove('active'));
            
            // Add active class to clicked item and corresponding image
            item.classList.add('active');
            const featureType = item.getAttribute('data-feature');
            const targetImage = document.getElementById(featureType + '-img');
            if (targetImage) {
                targetImage.classList.add('active');
            }
        });
    });

    // Service cards interaction
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const serviceType = this.getAttribute('data-service');
            updateHeroStats(serviceType);
        });
    });

    // Hero stats animation
    function updateHeroStats(serviceType) {
        const stats = {
            ml: {
                users: '15K+',
                accuracy: '98.5%',
                saved: '60%',
                solution: 'ML Engine'
            },
            nlp: {
                users: '8K+',
                accuracy: '99.2%',
                saved: '45%',
                solution: 'NLP Bot'
            },
            cv: {
                users: '5K+',
                accuracy: '97.8%',
                saved: '55%',
                solution: 'Vision AI'
            },
            automation: {
                users: '12K+',
                accuracy: '99.5%',
                saved: '70%',
                solution: 'Auto Flow'
            },
            analytics: {
                users: '18K+',
                accuracy: '96.8%',
                saved: '65%',
                solution: 'Analytics Pro'
            },
            chatbot: {
                users: '25K+',
                accuracy: '94.2%',
                saved: '80%',
                solution: 'ChatBot AI'
            }
        };

        const currentStats = stats[serviceType] || stats.ml;
        
        document.getElementById('users').textContent = currentStats.users;
        document.getElementById('accuracy').textContent = currentStats.accuracy;
        document.getElementById('saved').textContent = currentStats.saved;
        document.getElementById('solution').textContent = currentStats.solution;
    }

    // Pricing toggle functionality
    const pricingToggle = document.getElementById('pricing-toggle');
    const priceAmounts = document.querySelectorAll('.amount');

    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            priceAmounts.forEach(amount => {
                const monthlyPrice = amount.getAttribute('data-monthly');
                const annualPrice = amount.getAttribute('data-annual');
                
                if (monthlyPrice && annualPrice) {
                    if (this.checked) {
                        amount.textContent = annualPrice;
                    } else {
                        amount.textContent = monthlyPrice;
                    }
                }
            });
        });
    }

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message (in a real app, you'd send data to server)
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = '#10b981';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                this.reset();
            }, 3000);
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .feature-item, .pricing-card, .achievement').forEach(el => {
        observer.observe(el);
    });

    // Counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Trigger counter animations when stats come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target.querySelector('h3');
                const statText = statElement.textContent;
                const numericValue = parseInt(statText.replace(/[^\d]/g, ''));
                
                if (numericValue && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    // Only animate if it's a number
                    if (statText.includes('K+')) {
                        animateCounter(statElement, numericValue);
                        setTimeout(() => {
                            statElement.textContent = statText;
                        }, 2000);
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat').forEach(stat => {
        statsObserver.observe(stat);
    });

    // Particle effect for hero section (optional enhancement)
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
                animation-delay: ${Math.random() * 2}s;
            `;
            hero.appendChild(particle);
        }
    }

    // Add floating animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); opacity: 0.3; }
            50% { transform: translateY(-20px); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Initialize particles
    createParticles();

    // Loading animation
    window.addEventListener('load', function() {
        document.querySelectorAll('.loading').forEach(el => {
            el.classList.add('loaded');
        });
    });

    // Add loading class to elements that should animate on load
    document.querySelectorAll('.hero-text, .hero-stats').forEach(el => {
        el.classList.add('loading');
    });

    console.log('TechFlow landing page initialized successfully!');
});