document.addEventListener("DOMContentLoaded", function() {   
    window.onscroll = function() {
        // header shrink
        const header = document.querySelector('header');
        if (window.innerWidth > 1350) {
            const headerLogo = document.querySelector('.header__logo-img');
            const home = document.querySelector('.home');
            if (document.documentElement.scrollTop > 50) {
                header.style.padding = '20px 0';
                headerLogo.style.height = '80px';
                home.style.marginTop = '120px';
            };
            if (document.documentElement.scrollTop < 50) {
                header.style.padding = '50px 0 35px 0';
                headerLogo.style.height = '148px';
                home.style.marginTop = '230px';
            };
        };

        // hightlight current scrolled section in nav
        const scrollSections = document.querySelectorAll('.scroll-section');
        var scrollValue = document.documentElement.scrollTop;
        var activeSection;
        const navBtns = document.querySelectorAll('.nav-element');
        var headerHeight = header.offsetHeight;
        
        scrollSections.forEach(sect => {
            if (sect.offsetTop - headerHeight <= scrollValue) {
                activeSection = '#' + sect.id;
            }
        });

        navBtns.forEach(btn => {
            btn.classList.remove('nav-active')
            if (btn.getAttribute('href') == activeSection) {
                btn.classList.add('nav-active');
            }
        })
    };

    // home slider
    $('.home__slides-container').slick({
        dots: true,
        arrows: true,
        appendDots: '.home__slider-dots',
        prevArrow: '.slick-prev',
        nextArrow: '.slick-next'
    });

    // mobile nav 
    const mobileNavBtn = document.querySelector('.header__nav-btn');
    const nav = document.querySelector('.header__nav');
    const overlay = document.querySelector('.overlay');
    mobileNavBtn.onclick = () => {
        if (mobileNavBtn.classList.contains('open')) {
            mobileNavBtn.classList.remove('open');
            nav.classList.remove('open');
            overlay.classList.remove('open');
        }
        else {
            mobileNavBtn.classList.add('open');
            nav.classList.add('open');
            overlay.classList.add('open');
        }
    };
    overlay.onclick = () => {
        mobileNavBtn.classList.remove('open');
        nav.classList.remove('open');
        overlay.classList.remove('open');
    }
});