// ── 1. NAVBAR: Add scrolled class on scroll ──────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ── 2. BACK TO TOP BUTTON ────────────────────────────────────
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── 3. SCROLL REVEAL ANIMATIONS ─────────────────────────────
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ── 4. SMOOTH SCROLL for nav links ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
            // Close mobile nav if open
            const navMenu = document.getElementById('navMenu');
            if (navMenu.classList.contains('show')) {
                const toggler = document.querySelector('.navbar-toggler');
                toggler.click();
            }
        }
    });
});

// ── 5. COUNTER ANIMATION for hero stats ─────────────────────
function animateCounter(el, target, suffix = '') {
    let start = 0;
    const duration = 1800;
    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const nums = entry.target.querySelectorAll('.hero-stat-num');
            nums.forEach(num => {
                const text = num.textContent;
                if (text.includes('+')) {
                    animateCounter(num, parseInt(text), '+');
                } else if (text.includes('%')) {
                    animateCounter(num, parseInt(text), '%');
                } else if (text.includes('+')) {
                    animateCounter(num, parseInt(text), '+');
                }
            });
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ── 6. CONTACT FORM SUBMISSION ──────────────────────────────
function submitForm() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const serviceInput = document.getElementById('service');
    const messageInput = document.getElementById('message');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const service = serviceInput.value;
    const message = messageInput.value.trim();

    let isValid = true;

    // Reset states
    [nameInput, emailInput, phoneInput, messageInput].forEach(el => {
        el.classList.remove('is-invalid');
    });

    // Name validation (Min 3 chars)
    if (name.length < 3) {
        nameInput.classList.add('is-invalid');
        isValid = false;
    }

    // Email validation (Basic regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        emailInput.classList.add('is-invalid');
        isValid = false;
    }

    // Phone validation (Min 10 chars)
    if (phone.length < 10) {
        phoneInput.classList.add('is-invalid');
        isValid = false;
    }

    // Verify service selection
    if (!service) {
        serviceInput.classList.add('is-invalid');
        isValid = false;
    }

    // Message validation (Min 10 chars)
    if (message.length < 10) {
        messageInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!isValid) return;

    // Simulate submission with loading state
    const btn = document.getElementById('submitBtn');
    const originalBtnContent = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i> جارٍ الإرسال...';
    btn.disabled = true;

    setTimeout(() => {
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
    }, 1500);
}

// Real-time validation removal
['name', 'email', 'phone', 'message'].forEach(id => {
    document.getElementById(id).addEventListener('input', function () {
        this.classList.remove('is-invalid');
    });
});

// Allow re-submitting
document.getElementById('formSuccess')?.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        document.getElementById('contactForm').style.display = '';
        document.getElementById('formSuccess').style.display = 'none';
        document.getElementById('submitBtn').innerHTML = '<i class="bi bi-send-fill me-2"></i>إرسال الرسالة';
        document.getElementById('submitBtn').disabled = false;
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('service').selectedIndex = 0;
        document.getElementById('message').value = '';
    }
});

// ── 7. ACTIVE NAV LINK on scroll ─────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) {
            current = sec.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--gold-light)';
        }
    });
});