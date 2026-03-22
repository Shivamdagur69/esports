// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const registrationForm = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');

// Event Date for Countdown (1st April 2026)
const eventDate = new Date('April 1, 2026 00:00:00').getTime();

// Smooth Scrolling
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        smoothScroll(target);
        // Close mobile menu
        navMenu.classList.remove('active');
    });
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<h3>Event Started!</h3>';
    }
}

// Form Validation
function validateForm() {
    let isValid = true;
    const errors = {};

    // Full Name
    const name = document.getElementById('fullName').value.trim();
    if (name.length < 2) {
        errors.name = 'Name must be at least 2 characters';
        isValid = false;
    }

    // Phone Number (10 digits)
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        errors.phone = 'Enter valid 10-digit phone number';
        isValid = false;
    }

    // Email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.email = 'Enter valid email address';
        isValid = false;
    }

    // College
    const college = document.getElementById('college').value.trim();
    if (college.length < 2) {
        errors.college = 'College/Department name required';
        isValid = false;
    }

    // Game Selection
    const game = document.getElementById('game').value;
    if (!game) {
        errors.game = 'Please select a game';
        isValid = false;
    }

    // Mode Selection
    const mode = document.getElementById('mode').value;
    if (!mode) {
        errors.mode = 'Please select game mode';
        isValid = false;
    }

    // Player ID
    const playerId = document.getElementById('playerId').value.trim();
    if (playerId.length < 5) {
        errors.playerId = 'Player ID must be at least 5 characters';
        isValid = false;
    }

    // Show/Hide Error Messages
    Object.keys(errors).forEach(key => {
        const errorEl = document.getElementById(key + 'Error');
        if (errorEl) {
            errorEl.textContent = errors[key];
            errorEl.style.display = 'block';
        }
    });

    return isValid;
}

// Form Submission
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });

    if (validateForm()) {
        // Collect form data
        const formData = new FormData(registrationForm);
        const registrationData = Object.fromEntries(formData);

        // Store in localStorage
        const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
        registrations.push({
            ...registrationData,
            timestamp: new Date().toISOString(),
            id: 'REG' + Date.now()
        });
        localStorage.setItem('registrations', JSON.stringify(registrations));

        // Log to console (for admin view)
        console.log('🎮 NEW REGISTRATION:', registrationData);
        console.table(registrations);

        // Show success message
        registrationForm.style.display = 'none';
        successMessage.style.display = 'block';

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }
});

// Close Success Message
function closeSuccess() {
    successMessage.style.display = 'none';
    registrationForm.style.display = 'block';
    registrationForm.reset();
    registrationForm.scrollIntoView({ behavior: 'smooth' });
}

// Dynamic Team Name Field
document.getElementById('mode').addEventListener('change', (e) => {
    const teamNameField = document.getElementById('teamName');
    if (e.target.value === 'Squad') {
        teamNameField.required = true;
        teamNameField.placeholder = 'Team Name *';
    } else {
        teamNameField.required = false;
        teamNameField.placeholder = 'Team Name (optional)';
        teamNameField.value = '';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Animate on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
});

// View Registrations (Admin Function - Open Console)
function viewRegistrations() {
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    console.log('📋 ALL REGISTRATIONS:', registrations);
    console.table(registrations);
}

// Export for global use
window.viewRegistrations = viewRegistrations;
window.closeSuccess = closeSuccess;