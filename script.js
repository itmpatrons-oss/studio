// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    const API_BASE = window.location.protocol + '//' + window.location.hostname + ':3000/api';
    // 0. Fetch Dynamic Data from Dashboard JSON
    fetch(API_BASE + '/data')
        .then(res => res.json())
        .then(data => {
            if(document.querySelector('.hero-content h1')) document.querySelector('.hero-content h1').innerHTML = data.hero_title || '';
            if(document.querySelector('.hero-content p')) document.querySelector('.hero-content p').innerHTML = data.hero_subtitle || '';
            if(document.querySelector('.experience-badge h2')) document.querySelector('.experience-badge h2').innerHTML = data.about_years || '';
            if(document.querySelector('.about-text .section-title')) document.querySelector('.about-text .section-title').innerHTML = data.about_title || '';
            if(document.querySelector('.about-text p:nth-of-type(1)')) document.querySelector('.about-text p:nth-of-type(1)').innerHTML = data.about_text_1 || '';
            if(document.querySelector('.about-text p:nth-of-type(2)')) document.querySelector('.about-text p:nth-of-type(2)').innerHTML = data.about_text_2 || '';
            if(document.querySelector('#services .section-title')) document.querySelector('#services .section-title').innerHTML = data.services_title || '';
            if(document.querySelector('#services .section-subtitle')) document.querySelector('#services .section-subtitle').innerHTML = data.services_subtitle || '';
            if(document.querySelector('#portfolio .section-title')) document.querySelector('#portfolio .section-title').innerHTML = data.portfolio_title || '';
            if(document.querySelector('#portfolio .section-subtitle')) document.querySelector('#portfolio .section-subtitle').innerHTML = data.portfolio_subtitle || '';
            
            // Service Cards
            const svcCards = document.querySelectorAll('.service-card');
            if(svcCards[0]) {
                if(data.service_1_title) svcCards[0].querySelector('h3').innerHTML = data.service_1_title;
                if(data.service_1_desc) svcCards[0].querySelector('p').innerHTML = data.service_1_desc;
                if(data.service_1_icon) svcCards[0].querySelector('.icon i').className = data.service_1_icon;
            }
            if(svcCards[1]) {
                if(data.service_2_title) svcCards[1].querySelector('h3').innerHTML = data.service_2_title;
                if(data.service_2_desc) svcCards[1].querySelector('p').innerHTML = data.service_2_desc;
                if(data.service_2_icon) svcCards[1].querySelector('.icon i').className = data.service_2_icon;
            }
            if(svcCards[2]) {
                if(data.service_3_title) svcCards[2].querySelector('h3').innerHTML = data.service_3_title;
                if(data.service_3_desc) svcCards[2].querySelector('p').innerHTML = data.service_3_desc;
                if(data.service_3_icon) svcCards[2].querySelector('.icon i').className = data.service_3_icon;
            }
            if(svcCards[3]) {
                if(data.service_4_title) svcCards[3].querySelector('h3').innerHTML = data.service_4_title;
                if(data.service_4_desc) svcCards[3].querySelector('p').innerHTML = data.service_4_desc;
                if(data.service_4_icon) svcCards[3].querySelector('.icon i').className = data.service_4_icon;
            }
            
            if(document.querySelector('#testimonials .section-title')) document.querySelector('#testimonials .section-title').innerHTML = data.testimonials_title || '';
            
            // Testimonials
            const tSlides = document.querySelectorAll('.testimonial-slide');
            if(tSlides[0]) {
                if(data.testimonial_1_text) tSlides[0].querySelector('.review').innerHTML = data.testimonial_1_text;
                if(data.testimonial_1_name) tSlides[0].querySelector('.client-info h4').innerHTML = data.testimonial_1_name;
                if(data.testimonial_1_title) tSlides[0].querySelector('.client-info span').innerHTML = data.testimonial_1_title;
                if(data.testimonial_1_image) tSlides[0].querySelector('.client-info img').src = data.testimonial_1_image;
            }
            if(tSlides[1]) {
                if(data.testimonial_2_text) tSlides[1].querySelector('.review').innerHTML = data.testimonial_2_text;
                if(data.testimonial_2_name) tSlides[1].querySelector('.client-info h4').innerHTML = data.testimonial_2_name;
                if(data.testimonial_2_title) tSlides[1].querySelector('.client-info span').innerHTML = data.testimonial_2_title;
                if(data.testimonial_2_image) tSlides[1].querySelector('.client-info img').src = data.testimonial_2_image;
            }
            if(tSlides[2]) {
                if(data.testimonial_3_text) tSlides[2].querySelector('.review').innerHTML = data.testimonial_3_text;
                if(data.testimonial_3_name) tSlides[2].querySelector('.client-info h4').innerHTML = data.testimonial_3_name;
                if(data.testimonial_3_title) tSlides[2].querySelector('.client-info span').innerHTML = data.testimonial_3_title;
                if(data.testimonial_3_image) tSlides[2].querySelector('.client-info img').src = data.testimonial_3_image;
            }
            
            if(document.querySelector('.form-card h2')) document.querySelector('.form-card h2').innerHTML = data.booking_title || '';
            if(document.querySelector('.form-card p')) document.querySelector('.form-card p').innerHTML = data.booking_subtitle || '';
            if(document.querySelector('.contact-info-section .section-title')) document.querySelector('.contact-info-section .section-title').innerHTML = data.contact_title || '';
            if(document.querySelector('.contact-item:nth-child(1) p')) document.querySelector('.contact-item:nth-child(1) p').innerHTML = data.contact_address || '';
            if(document.querySelector('.contact-item:nth-child(2) p')) document.querySelector('.contact-item:nth-child(2) p').innerHTML = data.contact_phone || '';
            if(document.querySelector('.contact-item:nth-child(3) p')) document.querySelector('.contact-item:nth-child(3) p').innerHTML = data.contact_email || '';
            if(document.querySelector('.whatsapp-btn') && data.whatsapp_number) {
                 document.querySelector('.whatsapp-btn').href = "https://wa.me/" + data.whatsapp_number + "?text=Hello,%20I%20want%20to%20book%20a%20photoshoot";
            }
            
            // Image mapping
            const heroSlides = document.querySelectorAll('.hero-slider .slide');
            if(heroSlides[0] && data.hero_image_1) heroSlides[0].style.backgroundImage = `url('${data.hero_image_1}')`;
            if(heroSlides[1] && data.hero_image_2) heroSlides[1].style.backgroundImage = `url('${data.hero_image_2}')`;
            if(heroSlides[2] && data.hero_image_3) heroSlides[2].style.backgroundImage = `url('${data.hero_image_3}')`;
            
            if(document.querySelector('.about-image img')) document.querySelector('.about-image img').src = data.about_image || '';
            
            const portfolioItems = document.querySelectorAll('.portfolio-item img');
            if(portfolioItems[0] && data.portfolio_image_1) portfolioItems[0].src = data.portfolio_image_1;
            if(portfolioItems[1] && data.portfolio_image_2) portfolioItems[1].src = data.portfolio_image_2;
            if(portfolioItems[2] && data.portfolio_image_3) portfolioItems[2].src = data.portfolio_image_3;
            if(portfolioItems[3] && data.portfolio_image_4) portfolioItems[3].src = data.portfolio_image_4;
            if(portfolioItems[4] && data.portfolio_image_5) portfolioItems[4].src = data.portfolio_image_5;
            if(portfolioItems[5] && data.portfolio_image_6) portfolioItems[5].src = data.portfolio_image_6;
            
            const contactBg = document.querySelector('.contact-area');
            if(contactBg && data.contact_bg_image) {
                 contactBg.style.backgroundImage = `url('${data.contact_bg_image}')`;
            }
        })
        .catch(err => {
            console.error("Dashboard backend is not running. Using fallback static HTML content.", err);
        });

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
