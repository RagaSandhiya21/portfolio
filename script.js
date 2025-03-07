document.addEventListener('DOMContentLoaded', function() {
    // Navigation menu toggle
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    let overlay = document.querySelector('.nav-overlay');
    
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.querySelector('nav').appendChild(overlay);
    }
    
    if (menuIcon) {
        menuIcon.addEventListener('click', toggleMenu);
    }
    
    document.querySelectorAll('.nav-links li a').forEach(item => {
        item.addEventListener('click', closeMenu);
    });
    
    overlay.addEventListener('click', closeMenu);
    
    function toggleMenu() {
        menuIcon.classList.toggle('menu-open');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    }
    
    function closeMenu() {
        menuIcon.classList.remove('menu-open');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active section detection
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-links li a');
    
    function setActiveSection() {
        let scrollPosition = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                section.classList.add('active');
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            } else {
                section.classList.remove('active');
            }
        });
    }
    
    setActiveSection();
    window.addEventListener('scroll', setActiveSection);

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.8) {
                const width = bar.getAttribute('style').match(/width: (\d+)%/)[1];
                bar.style.width = width + '%';
            }
        });
    }
    
    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);

    // Projects filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            projectItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('visible'), 100);
                } else {
                    item.classList.remove('visible');
                    setTimeout(() => item.style.display = 'none', 500);
                }
            });
        });
    });
    
    setTimeout(() => {
        projectItems.forEach(item => item.classList.add('visible'));
    }, 200);

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            console.log('Form submission:', formData);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.textContent = 'Message Sent!';
            submitButton.disabled = true;
            contactForm.reset();
            setTimeout(() => {
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
            }, 3000);
        });
    }

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcons(savedTheme);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            updateThemeIcons(newTheme);
            localStorage.setItem('theme', newTheme);
            
            body.classList.add('theme-transition');
            setTimeout(() => body.classList.remove('theme-transition'), 500);
            
            projectItems.forEach((item, index) => {
                item.style.transition = 'all 0.5s ease';
                item.style.transform = 'scale(0.95)';
                setTimeout(() => item.style.transform = 'scale(1)', 100 * index);
            });
        });
    }
    
    function updateThemeIcons(theme) {
        if (theme === 'dark') {
            sunIcon.classList.remove('active');
            moonIcon.classList.add('active');
        } else {
            sunIcon.classList.add('active');
            moonIcon.classList.remove('active');
        }
    }
    
    function updateNavColors() {
        const navLinks = document.querySelectorAll('.nav-links li a');
        if (body.getAttribute('data-theme') === 'dark') {
            navLinks.forEach(link => {
                link.style.color = '#e0e0e0';
                link.addEventListener('mouseover', () => link.style.color = '#00d4ff');
                link.addEventListener('mouseout', () => link.style.color = '#e0e0e0');
            });
        } else {
            navLinks.forEach(link => {
                link.style.color = '#fff';
                link.addEventListener('mouseover', () => link.style.color = '#f382ae');
                link.addEventListener('mouseout', () => link.style.color = '#fff');
            });
        }
    }
    
    updateNavColors();
    themeToggle.addEventListener('click', updateNavColors);
});