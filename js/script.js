// ========== STICKY NAVIGATION ==========
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
        const heroInWrapper = wrapper.querySelector('.et-hero-tabs');
        if (heroInWrapper) heroInWrapper.remove();
    }
    
    const heroHeight = heroSection.offsetHeight;
    const navHeight = navContainer.offsetHeight;
    
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
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();
});

// ========== INISIALISASI MDB CAROUSEL (CARA 1: Menggunakan CDN) ==========
// Tunggu hingga MDB siap
if (typeof mdb !== 'undefined') {
    // Inisialisasi semua carousel
    document.querySelectorAll('[data-mdb-carousel-init]').forEach(element => {
        new mdb.Carousel(element);
    });
    console.log('MDB Carousel initialized via CDN');
} else {
    console.warn('MDB not loaded yet, waiting...');
    // Load MDB dari CDN jika belum ada
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.4.2/mdb.min.js';
    script.onload = function() {
        document.querySelectorAll('[data-mdb-carousel-init]').forEach(element => {
            new mdb.Carousel(element);
        });
        console.log('MDB Carousel initialized after loading CDN');
    };
    document.head.appendChild(script);
}