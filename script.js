// script.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu & Sticky Navbar
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });


    // 2. Reveal Animations on Scroll
    const reveals = document.querySelectorAll('.reveal');

    function reveal() {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    }
    
    // Initial check
    reveal();
    window.addEventListener('scroll', reveal);


    // 3. Hero Background Slider
    const slides = document.querySelectorAll('.hero-slider .slide');
    let currentSlide = 0;
    const slideInterval = 3000; // 3 seconds

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }


    // 4. Portfolio Filtering (Masonry Style via CSS, Filtering via JS)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                    // Slight animation trigger 
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });


    // 5. Lightbox for Portfolio
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').getAttribute('src');
            lightboxImg.setAttribute('src', imgSrc);
            lightbox.classList.add('active');
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
        }
    });


    // 6. Testimonials Auto-sliding Carousel
    const testSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let currentTestSlide = 0;
    let testSlideInterval;

    function showTestimonial(index) {
        testSlides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        currentTestSlide = index;
        if(currentTestSlide >= testSlides.length) currentTestSlide = 0;
        if(currentTestSlide < 0) currentTestSlide = testSlides.length - 1;

        testSlides[currentTestSlide].classList.add('active');
        if(dots[currentTestSlide]) dots[currentTestSlide].classList.add('active');
    }

    function startTestimonialSlider() {
        testSlideInterval = setInterval(() => {
            showTestimonial(currentTestSlide + 1);
        }, 4000); // 4 seconds between testimonials
    }

    // Initialize Testimonials
    if (testSlides.length > 0) {
        startTestimonialSlider();

        // Allow manual dot click
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                clearInterval(testSlideInterval);
                const slideIndex = parseInt(e.target.getAttribute('data-index'));
                showTestimonial(slideIndex);
                startTestimonialSlider(); // restart auto-slide
            });
        });
    }


    // 7. Booking Form Validation
    const bookingForm = document.getElementById('bookingForm');
    const formMessage = document.getElementById('formMessage');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic validation
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const evtType = document.getElementById('eventType').value;
            const date = document.getElementById('date').value;
            const message = document.getElementById('message').value.trim();

            if (!name || !phone || !evtType || !date || !message) {
                formMessage.textContent = 'Please fill out all fields.';
                formMessage.className = 'form-message error';
                return;
            }

            // Simple phone validation (min 10 digits)
            const phoneRegex = /^[0-9\-\+\s\(\)]{10,15}$/;
            if (!phoneRegex.test(phone)) {
                formMessage.textContent = 'Please enter a valid phone number.';
                formMessage.className = 'form-message error';
                return;
            }

            // Success scenario (Mock API call)
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                formMessage.textContent = `Thank you, ${name}! Your booking request for ${evtType} on ${date} has been sent successfully. We will contact you soon.`;
                formMessage.className = 'form-message success';
                
                // Reset form
                bookingForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                    formMessage.className = 'form-message';
                }, 5000);

            }, 1000);
        });
    }
});
