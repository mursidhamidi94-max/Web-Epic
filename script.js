/* =========================
   MOBILE HAMBURGER MENU & HEADER
========================= */
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("mainNav");
    const header = document.getElementById("mainHeader") || document.querySelector(".header");

    // Header scroll background effect
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 30) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const isActive = menuToggle.classList.toggle("active");
            nav.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", isActive ? "true" : "false");
        });

        // Tutup menu saat klik di luar area nav & menu-toggle
        document.addEventListener("click", (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove("active");
                nav.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });

        // Tutup menu saat link diklik
        const navLinks = nav.querySelectorAll("a");
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                nav.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }
});

/* =========================
   HERO SLIDER (INDEX PAGE)
========================= */
const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

if (slider && slides.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length;

    /* GO TO SLIDE */
    function goToSlide(index) {
        currentSlide = index;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
        });
    }

    /* AUTO SLIDE */
    let autoSlide = setInterval(() => {
        currentSlide++;
        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }
        goToSlide(currentSlide);
    }, 4000);

    /* SWIPE GESTURES */
    let startX = 0;
    let endX = 0;

    slider.addEventListener("touchstart", (event) => {
        startX = event.touches[0].clientX;
    });

    slider.addEventListener("touchend", (event) => {
        endX = event.changedTouches[0].clientX;
        const difference = startX - endX;

        /* SWIPE KIRI */
        if (difference > 50) {
            currentSlide++;
            if (currentSlide >= totalSlides) {
                currentSlide = 0;
            }
            goToSlide(currentSlide);
        }

        /* SWIPE KANAN */
        if (difference < -50) {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = totalSlides - 1;
            }
            goToSlide(currentSlide);
        }
    });

    /* PAUSE & RESUME DESKTOP */
    slider.addEventListener("mouseenter", () => {
        clearInterval(autoSlide);
    });

    slider.addEventListener("mouseleave", () => {
        autoSlide = setInterval(() => {
            currentSlide++;
            if (currentSlide >= totalSlides) {
                currentSlide = 0;
            }
            goToSlide(currentSlide);
        }, 4000);
    });
}

/* =========================
   SMOOTH ANCHOR SCROLL ONLY
========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;
        
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            const headerOffset = 75;
            const elementPosition = targetEl.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

