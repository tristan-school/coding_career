document.addEventListener('DOMContentLoaded', () => {
    // State Management
    let currentSlide = 1;
    const totalSlides = 5;

    // DOM Elements
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSlideNum = document.getElementById('currentSlideNum');
    const totalSlideNum = document.getElementById('totalSlideNum');
    const progressBar = document.getElementById('progressBar');
    const dots = document.querySelectorAll('.slide-dots .dot');
    const themeToggle = document.getElementById('themeToggle');
    const fullscreenToggle = document.getElementById('fullscreenToggle');

    // Tab Elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    // Initialize View
    totalSlideNum.textContent = totalSlides;
    updateSlideView();

    // Slide Navigation Functions
    function updateSlideView() {
        slides.forEach(slide => slide.classList.remove('active'));
        
        const activeSlide = document.getElementById(`slide-${currentSlide}`);
        if (activeSlide) {
            activeSlide.classList.add('active');
        }

        // Update UI Indicators
        currentSlideNum.textContent = currentSlide;
        progressBar.style.width = `${(currentSlide / totalSlides) * 100}%`;

        // Update Dots
        dots.forEach((dot, index) => {
            if (index + 1 === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update Button Disabled States
        prevBtn.disabled = (currentSlide === 1);
        nextBtn.disabled = (currentSlide === totalSlides);
    }

    function goToSlide(slideNum) {
        if (slideNum >= 1 && slideNum <= totalSlides) {
            currentSlide = slideNum;
            updateSlideView();
        }
    }

    function nextSlide() {
        if (currentSlide < totalSlides) {
            currentSlide++;
            updateSlideView();
        }
    }

    function prevSlide() {
        if (currentSlide > 1) {
            currentSlide--;
            updateSlideView();
        }
    }

    // Button Event Listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const jumpTarget = parseInt(e.target.getAttribute('data-jump'), 10);
            if (jumpTarget) goToSlide(jumpTarget);
        });
    });

    // Keyboard Controls
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Tab Switching System (Slide 2)
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetPanel = document.getElementById(`panel-${targetTab}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // Theme Toggle Functionality
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
    });

    // Fullscreen Toggle
    fullscreenToggle.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Fullscreen request error: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });
});
