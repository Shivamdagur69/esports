// ===== NAVIGATION =====
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Smooth Scroll
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth'
        });

        // Close mobile menu
        navMenu.classList.remove('active');
    });
});

// Hamburger Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});


// ===== COUNTDOWN TIMER =====
const eventDate = new Date("April 1, 2026 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / 1000 / 60) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "Event Started!";
    }
}

setInterval(updateCountdown, 1000);


// ===== FORM =====
const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");

// Validate Form
function validateForm(data) {
    if (data.name.length < 2) {
        alert("Enter valid name");
        return false;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(data.phone)) {
        alert("Enter valid phone number");
        return false;
    }

    if (!data.email.includes("@")) {
        alert("Enter valid email");
        return false;
    }

    if (!data.game) {
        alert("Select a game");
        return false;
    }

    if (!data.mode) {
        alert("Select mode");
        return false;
    }

    if (data.playerId.length < 3) {
        alert("Enter valid Player ID");
        return false;
    }

    return true;
}


// ===== FORM SUBMIT =====
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
        name: document.getElementById("fullName").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        email: document.getElementById("email").value.trim(),
        college: document.getElementById("college").value.trim(),
        game: document.getElementById("game").value,
        mode: document.getElementById("mode").value,
        team: document.getElementById("teamName").value,
        playerId: document.getElementById("playerId").value.trim()
    };

    if (!validateForm(data)) return;

    // Save in local storage
    let registrations = JSON.parse(localStorage.getItem("registrations")) || [];
    registrations.push(data);
    localStorage.setItem("registrations", JSON.stringify(registrations));

    console.log("New Registration:", data);

    // Show success message
    form.style.display = "none";
    successMessage.style.display = "block";
});


// ===== CLOSE SUCCESS =====
function closeSuccess() {
    successMessage.style.display = "none";
    form.style.display = "block";
    form.reset();
}


// ===== TEAM NAME CONDITION =====
document.getElementById("mode").addEventListener("change", function () {
    const teamField = document.getElementById("teamName");

    if (this.value === "Squad") {
        teamField.required = true;
        teamField.placeholder = "Team Name *";
    } else {
        teamField.required = false;
        teamField.placeholder = "Team Name (optional)";
        teamField.value = "";
    }
});


// ===== AUTO SCROLL BUTTON =====
document.querySelector(".cta-button").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector("#register").scrollIntoView({
        behavior: "smooth"
    });
});
