// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'linear-gradient(rgba(20, 30, 48, 0.95), rgba(36, 59, 85, 0.95))';
            header.style.padding = '0.8rem 0';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.background = 'linear-gradient(rgba(20, 30, 48, 0.9), rgba(36, 59, 85, 0.9))';
            header.style.padding = '1.5rem 0';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
        }
    });
    
    // Form submission (prevent default for demo)
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // For a real implementation, you would send the form data to a server
            const formData = new FormData(contactForm);
            
            // Display success message (demo only)
            let formFields = contactForm.querySelectorAll('input, textarea');
            formFields.forEach(field => field.value = '');
            
            alert('Thank you! Your message has been sent.');
        });
    }
});

// Add animation to elements when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe project cards for staggered animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe skill items for staggered animation
    const skillItems = document.querySelectorAll('.skills-list li');
    skillItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(item);
    });
});
