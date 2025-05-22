// Custom JavaScript for Café DOJO

// Example: Smooth scroll for anchor links (Bootstrap already supports this, but adding for enhancement)
document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetID = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetID);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const animateElements = document.querySelectorAll('.card, #gallery .col-sm-6');

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(animateElements).indexOf(entry.target);
            entry.target.style.animationDelay = (index * 0.2) + 's';
            entry.target.classList.add('animate-zoom-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animateElements.forEach(el => {
    observer.observe(el);
});
document.addEventListener('DOMContentLoaded', () => {
    // Add reveal class to elements we want to animate
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        // Add reveal class to section headers
        const header = section.querySelector('h2');
        if (header) {
            header.classList.add('reveal');
        }

        // Add reveal class and delays to cards
        const cards = section.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.classList.add('reveal');
            card.classList.add(`delay-${(index + 1) * 100}`);
        });

        // Add reveal class and delays to gallery images
        const galleryImages = section.querySelectorAll('#gallery .col-sm-6');
        galleryImages.forEach((img, index) => {
            img.classList.add('reveal');
            img.classList.add(`delay-${(index + 1) * 100}`);
        });

        // Add reveal to contact form elements
        const formElements = section.querySelectorAll('#contact .form-control');
        formElements.forEach((element, index) => {
            element.classList.add('reveal');
            element.classList.add(`delay-${(index + 1) * 100}`);
        });
    });

    // Function to check if an element is in the viewport
    function checkScroll() {
        const elements = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const revealPoint = 150; // how many pixels from the bottom to start the animation

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    // Check elements on a load
    checkScroll();

    // Check elements on the scroll
    window.addEventListener('scroll', checkScroll);
});
