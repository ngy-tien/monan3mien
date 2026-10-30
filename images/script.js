/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ===== HIỆU ỨNG XUẤT HIỆN KHI CUỘN ===== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .region-card, .step, .day, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

/* ===== NÚT SCROLL TO TOP ===== */
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.setAttribute('aria-label', 'Lên đầu trang');
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ===== ACTIVE MENU ===== */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
        link.style.color = '#e63946';
        link.style.fontWeight = '700';
    }
});

/* ===== FORM LIÊN HỆ (nếu có) ===== */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong 24h.');
        this.reset();
    });
}

/* ===== LAZY LOAD ẢNH ===== */
if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy';
    });
} else {
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                lazyObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        lazyObserver.observe(img);
    });
}

/* ===== HIỆU ỨNG HEADER KHI CUỘN ===== */
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
    }
    
    lastScroll = currentScroll;
});

/* ===== PRELOAD ẢNH BANNER ===== */
const banner = document.querySelector('.banner');
if (banner) {
    const bg = getComputedStyle(banner).backgroundImage;
    if (bg && bg !== 'none') {
        const url = bg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
        const img = new Image();
        img.src = url;
    }
}

/* ===== CONSOLE LOG ===== */
console.log('%c🍜 Ẩm Thực Việt', 'color: #e63946; font-size: 20px; font-weight: bold;');
console.log('%cWebsite đã sẵn sàng!', 'color: #1d3557; font-size: 14px;');