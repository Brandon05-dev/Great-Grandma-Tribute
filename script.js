// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Slideshow functionality
    let currentSlideIndex = 1;
    const slides = [
        { src: 'image-1.jpg', alt: 'Great-Grandma Memory 1' },
        { src: 'image-2.jpg', alt: 'Great-Grandma Mama Fejenia Taka' },
        { src: 'image-3.jpg', alt: 'Great-Grandma Memory 2' }
    ];
    
    function updateSlideshow() {
        const slideCards = document.querySelectorAll('.slide-card');
        const indicators = document.querySelectorAll('.indicator');
        
        slideCards.forEach((card, index) => {
            const img = card.querySelector('.slide-image');
            const slideData = slides[(currentSlideIndex + index - 1 + slides.length) % slides.length];
            
            img.src = slideData.src;
            img.alt = slideData.alt;
            
            // Remove all classes
            card.classList.remove('main-card', 'side-card', 'left-card', 'right-card');
            
            // Add appropriate classes
            if (index === 1) {
                card.classList.add('main-card');
            } else {
                card.classList.add('side-card');
                if (index === 0) {
                    card.classList.add('left-card');
                } else {
                    card.classList.add('right-card');
                }
            }
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlideIndex);
        });
    }
    
    window.nextSlide = function() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateSlideshow();
    };
    
    window.previousSlide = function() {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateSlideshow();
    };
    
    window.currentSlide = function(n) {
        currentSlideIndex = n - 1;
        updateSlideshow();
    };
    
    // Auto-advance slideshow every 5 seconds
    setInterval(() => {
        nextSlide();
    }, 5000);
    
    // Initialize slideshow
    updateSlideshow();
    
    // Theme Management
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
    // Set light mode as default
    let currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);
    
    function setTheme(theme) {
        if (theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-sun icon';
            themeToggle.title = 'Switch to light mode';
        } else {
            body.setAttribute('data-theme', 'light');
            themeIcon.className = 'fas fa-moon icon';
            themeToggle.title = 'Switch to dark mode';
        }
        localStorage.setItem('theme', theme);
        currentTheme = theme;
    }
    
    themeToggle.addEventListener('click', function() {
        // Add rotation animation
        this.classList.add('rotating');
        
        setTimeout(() => {
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
            this.classList.remove('rotating');
        }, 150);
    });
    
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
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
    
    // Close mobile menu when clicking theme toggle
    themeToggle.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const biographySection = document.getElementById('biography');
            if (biographySection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = biographySection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.bio-block, .tribute-card, .song-item, .timeline-item, .gallery-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Gallery lightbox functionality
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    galleryImages.forEach(item => {
        item.addEventListener('click', function() {
            createLightbox(this.src, this.alt);
        });
    });
    
    function createLightbox(src, alt) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
            cursor: pointer;
        `;
        
        // Create image element
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        `;
        
        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 30px;
            background: none;
            border: none;
            color: #d4af37;
            font-size: 3rem;
            cursor: pointer;
            font-weight: bold;
            transition: color 0.3s ease;
        `;
        
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.color = '#e6c55a';
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.color = '#d4af37';
        });
        
        // Add elements to lightbox
        lightbox.appendChild(img);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        
        // Animate in
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
        
        // Close functionality
        function closeLightbox() {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }, 300);
        }
        
        lightbox.addEventListener('click', closeLightbox);
        closeBtn.addEventListener('click', closeLightbox);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Close on escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }
    
    // Video placeholder click functionality
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            const iframe = this.querySelector('iframe');
            if (iframe) {
                iframe.style.display = 'block';
                this.querySelector('i').style.display = 'none';
                this.querySelector('p').style.display = 'none';
            }
        });
    }
    
    // Audio player functionality (placeholder)
    const playButtons = document.querySelectorAll('.play-btn');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const isPlaying = icon.classList.contains('fa-pause');
            
            // Reset all other buttons
            playButtons.forEach(btn => {
                btn.querySelector('i').classList.remove('fa-pause');
                btn.querySelector('i').classList.add('fa-play');
            });
            
            if (!isPlaying) {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                
                // Simulate audio playing (replace with actual audio implementation)
                setTimeout(() => {
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                }, 3000); // Stop after 3 seconds for demo
            }
        });
    });
    
    // Download PDF functionality (placeholder)
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Replace with actual PDF download logic
            alert('PDF download would be implemented here. You can link to a real PDF file or generate one dynamically.');
        });
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Progress bar animation
    function animateProgressBar() {
        const progressBar = document.querySelector('.progress-fill');
        if (progressBar) {
            const targetWidth = progressBar.style.width;
            progressBar.style.width = '0%';
            
            setTimeout(() => {
                progressBar.style.width = targetWidth;
            }, 500);
        }
    }
    
    // Animate progress bar when section comes into view
    const supportSection = document.getElementById('support');
    if (supportSection) {
        const progressObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBar();
                    progressObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        progressObserver.observe(supportSection);
    }
    
    // Copy till number functionality
    const tillValue = document.querySelector('.till-value');
    if (tillValue) {
        tillValue.addEventListener('click', function() {
            navigator.clipboard.writeText(this.textContent).then(() => {
                // Show temporary feedback
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.color = '#ffffff';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            }).catch(err => {
                console.log('Could not copy text: ', err);
            });
        });
        
        // Add hover effect
        tillValue.style.cursor = 'pointer';
        tillValue.title = 'Click to copy';
    }
    
    // Tribute cards hover effect
    const tributeCards = document.querySelectorAll('.tribute-card');
    
    tributeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Timeline items staggered animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        timelineObserver.observe(item);
    });
    
    // Gallery items hover effect
    const galleryItemsHover = document.querySelectorAll('.gallery-item');
    
    galleryItemsHover.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add typing effect to hero tribute text
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        setTimeout(type, 2000); // Start after 2 seconds
    }
    
    const heroTribute = document.querySelector('.hero-tribute');
    if (heroTribute) {
        const originalText = heroTribute.textContent;
        typeWriter(heroTribute, originalText, 80);
    }
    
    // Easter egg: Konami code for special animation
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === konamiSequence.length && 
            konamiCode.every((code, index) => code === konamiSequence[index])) {
            
            // Trigger special animation
            document.body.style.animation = 'rainbow 2s ease-in-out';
            
            setTimeout(() => {
                document.body.style.animation = '';
            }, 2000);
            
            konamiCode = [];
        }
    });
    
    // Add rainbow animation for easter egg
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                const newImg = new Image();
                newImg.onload = () => {
                    img.style.opacity = '1';
                };
                newImg.src = img.src;
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Add floating particles effect (optional)
    function createFloatingParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: #d4af37;
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.1};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
            `;
            particleContainer.appendChild(particle);
        }
        
        document.body.appendChild(particleContainer);
        
        // Add floating animation
        const floatStyle = document.createElement('style');
        floatStyle.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                33% { transform: translateY(-20px) rotate(120deg); }
                66% { transform: translateY(20px) rotate(240deg); }
            }
        `;
        document.head.appendChild(floatStyle);
    }
    
    // Uncomment the line below to enable floating particles
    // createFloatingParticles();
    
    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
        // All scroll-based animations here
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    console.log('Memorial website initialized successfully');
    console.log('All interactive features are now active');
    
    // Gallery Category Filtering
    const categoryTabs = document.querySelectorAll('.category-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Initialize gallery - show all items by default
    function initializeGallery() {
        galleryItems.forEach(item => {
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        });
    }
    
    // Call initialization
    initializeGallery();
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Memorial Form Submission
    const memorialForm = document.getElementById('memorial-form');
    if (memorialForm) {
        memorialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const relationship = formData.get('relationship');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !relationship || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for sharing your memory. Your tribute has been submitted for review.');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Submit Memory Button
    const submitMemoryBtn = document.querySelector('.submit-memory-btn');
    if (submitMemoryBtn) {
        submitMemoryBtn.addEventListener('click', function() {
            // Simulate file upload dialog
            alert('This would open a file upload dialog or redirect to a submission form. For now, please email your photos to: family.memories@email.com');
        });
    }
});

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add smooth reveal animations for sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
    
    // Add CSS for section visibility
    const sectionStyle = document.createElement('style');
    sectionStyle.textContent = `
        .section-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(sectionStyle);
});