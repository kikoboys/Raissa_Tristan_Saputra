document.addEventListener("DOMContentLoaded", function () {

    const marquee = document.querySelector(".marquee-track");
    const wrapper = document.querySelector(".brand-marquee");

    let position = 0;
    let animationId;
    let isMobile = window.innerWidth <= 768;

    // Fungsi untuk mengatur marquee
    function setupMarquee() {
        // Hapus duplikasi yang ada
        const originalContent = marquee.innerHTML.split('<!-- duplicate -->')[0];
        
        if (isMobile) {
            // Mode mobile: duplikasi konten
            if (!marquee.innerHTML.includes('<!-- duplicate -->')) {
                marquee.innerHTML = originalContent + '<!-- duplicate -->' + originalContent;
            }
            // Mulai animasi
            if (!animationId) {
                animate();
            }
            marquee.style.display = 'flex';
        } else {
            // Mode desktop: hentikan animasi dan reset
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
            // Reset posisi
            position = 0;
            marquee.style.transform = "translateX(0px)";
            // Tampilkan hanya konten asli
            marquee.innerHTML = originalContent;
        }
    }

    function animate() {
        if (!isMobile) return; // Hentikan jika bukan mobile

        position -= 0.8;

        if (Math.abs(position) >= marquee.scrollWidth / 2) {
            position = 0;
        }

        marquee.style.transform = "translateX(" + position + "px)";
        animationId = requestAnimationFrame(animate);
    }

    // Event listener untuk resize window q
    window.addEventListener("resize", function () {
        const newIsMobile = window.innerWidth <= 768;
        if (newIsMobile !== isMobile) {
            isMobile = newIsMobile;
            setupMarquee();
        }
    });

    // Setup awal
    setupMarquee();

    // Event hover hanya untuk mobile
    wrapper.addEventListener("mouseenter", function () {
        if (isMobile && animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    });

    wrapper.addEventListener("mouseleave", function () {
        if (isMobile && !animationId) {
            animate();
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.et-hero-tabs');
    const navContainer = document.querySelector('.et-hero-tabs-container');
    const contentWrapper = document.querySelector('.content-wrapper') || document.body;
    
    // Buat wrapper untuk konten jika belum ada
    if (!document.querySelector('.content-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'content-wrapper';
        const sections = document.querySelectorAll('.et-slide');
        sections.forEach(section => {
            wrapper.appendChild(section.cloneNode(true));
            section.remove();
        });
        document.body.appendChild(wrapper);
        // Hapus duplikat hero section dari wrapper
        const heroInWrapper = wrapper.querySelector('.et-hero-tabs');
        if (heroInWrapper) heroInWrapper.remove();
    }
    
    const heroHeight = heroSection.offsetHeight;
    const navHeight = navContainer.offsetHeight;
    
    // Fungsi untuk mengecek scroll position
    function checkScroll() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= heroHeight - navHeight) {
            navContainer.classList.add('sticky');
            document.querySelector('.content-wrapper')?.classList.add('has-sticky-nav');
        } else {
            navContainer.classList.remove('sticky');
            document.querySelector('.content-wrapper')?.classList.remove('has-sticky-nav');
        }
    }
    
    // Event listener untuk scroll
    window.addEventListener('scroll', checkScroll);
    
    // Initial check
    checkScroll();
});