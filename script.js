document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navMenuLinks = document.querySelectorAll('.nav-links a');
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.getElementById('stats');
    const categoryButtons = document.querySelectorAll(".category-buttons button");
    const serviceCards = document.querySelectorAll(".service-card");
    const orderButtons = document.querySelectorAll('.order-btn');
    
    // --- 1. Sticky Navbar & Active Link on Scroll ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
        
        let currentSectionId = '';
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) currentSectionId = section.getAttribute('id');
        });
        
        navMenuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) link.classList.add('active');
        });
    });
    
    // --- 2. Mobile Menu Toggle ---
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
    });
    
    navMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('overflow-hidden');
            }
        });
    });
    
    // --- 3. Category Filter ---
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute("data-filter");
            serviceCards.forEach(card => {
                const category = card.getAttribute("data-category");
                card.style.display = (filter === "all" || category === filter) ? "flex" : "none";
            });
        });
    });
    
    // --- 4. Animated Counters ---
    const speed = 200;
    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = parseInt(counter.getAttribute('data-target'));
                const currentText = counter.innerText.replace(/[^\d.]/g, '');
                const count = currentText ? parseFloat(currentText) : 0;
                let increment = target / speed;
                
                if (target >= 1000) {
                    if (target >= 1000000) {
                        let rawCount = (count || 0) * 1000000;
                        if (rawCount < target) {
                            counter.innerText = ((rawCount + increment) / 1000000).toFixed(1) + 'M+';
                            setTimeout(updateCount, 1);
                        } else counter.innerText = (target / 1000000).toFixed(1) + 'M+';
                    } else {
                        let rawCount = (count || 0) * 1000;
                        if (rawCount < target) {
                            counter.innerText = Math.ceil((rawCount + increment) / 1000) + 'k+';
                            setTimeout(updateCount, 1);
                        } else counter.innerText = (target / 1000).toFixed(0) + 'k+';
                    }
                } else {
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 1);
                    } else counter.innerText = target;
                }
            };
            updateCount();
        });
    };
    
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(statsSection);
    }
    
    // --- 5. WhatsApp Order Buttons (Clean & Fixed) ---
    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.service-card');
            const serviceName = card.querySelector('h3').innerText.trim();
            const packageSelected = card.querySelector('.package').value.trim();
            const userInput = card.querySelector('.user-input').value.trim();
            
            if (!packageSelected || !userInput) {
                alert("Please select a package and enter your link!");
                return;
            }
            
            const whatsappNumber = "919091824475"; // <- Apna WhatsApp number
            
            // ✅ Proper clean message with line breaks
            const message = `Hello ,%0A` +
                `I want to order the following service:%0A` +
                `Service: ${serviceName}%0A` +
                `Package: ${packageSelected}%0A` +
                `Link: ${userInput}`;
            
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
            window.open(whatsappURL, "_blank");
        });
    });
    
    // --- 6. Fix stuck hover on mobile ---
    document.addEventListener('touchstart', function() {}, true);
    
    console.log("SocialX Panel - Fully Optimized JS Loaded ✅");
});