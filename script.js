// ==================== DRIVER DATA ====================
const driverData = {
    verstappen: {
        name: 'Max Verstappen',
        team: 'Red Bull Racing',
        theme: 'verstappen',
        photo: './verstappen.avif',
        position: '2nd',
        posNum: 2,
        points: 421,
        wins: 8,
        poles: 8
    },
    norris: {
        name: 'Lando Norris',
        team: 'McLaren',
        theme: 'norris',
        photo: './images/lando_norris.png',
        position: '1st',
        posNum: 1,
        points: 423,
        wins: 7,
        poles: 7
    },
    piastri: {
        name: 'Oscar Piastri',
        team: 'McLaren',
        theme: 'piastri',
        photo: './images/oscar_piastri.png',
        position: '3rd',
        posNum: 3,
        points: 410,
        wins: 7,
        poles: 6
    },
    alonso: {
        name: 'Fernando Alonso',
        team: 'Aston Martin',
        theme: 'alonso',
        photo: './images/fernando_alonso.png',
        position: '10th',
        posNum: 10,
        points: 56,
        wins: 0,
        poles: 0
    },
    hulkenberg: {
        name: 'Nico Hulkenberg',
        team: 'Sauber',
        theme: 'hulkenberg',
        photo: './nico hulenberg.jpg',
        position: '11th',
        posNum: 11,
        points: 51,
        wins: 0,
        poles: 0
    },
    bortoleto: {
        name: 'Gabriel Bortoleto',
        team: 'Sauber',
        theme: 'bortoleto',
        photo: './gabirel bortelleto.avif',
        position: '19th',
        posNum: 19,
        points: 19,
        wins: 0,
        poles: 0
    },
    hamilton: {
        name: 'Lewis Hamilton',
        team: 'Ferrari',
        theme: 'hamilton',
        photo: './lewis hamilton.jpeg',
        position: '6th',
        posNum: 6,
        points: 156,
        wins: 1,
        poles: 0
    }
};

// ==================== CREATE PLAYCARD ====================
function createPlaycard() {
    const backdrop = document.createElement('div');
    backdrop.className = 'playcard-backdrop';
    backdrop.id = 'playcardBackdrop';
    document.body.appendChild(backdrop);

    const playcard = document.createElement('div');
    playcard.className = 'driver-playcard';
    playcard.id = 'driverPlaycard';
    playcard.innerHTML = `
        <button class="playcard-close" onclick="closePlaycard()">✕</button>
        <div class="playcard-header">
            <img class="playcard-photo" id="playcardPhoto" src="" alt="Driver">
            <div class="playcard-overlay">
                <h2 class="playcard-name" id="playcardName"></h2>
                <p class="playcard-team" id="playcardTeam"></p>
            </div>
        </div>
        <div class="playcard-body">
            <div class="playcard-position">
                <span class="playcard-position-number" id="playcardPos"></span>
                <span class="playcard-position-label">Championship Position</span>
            </div>
            <div class="playcard-stats">
                <div class="stat-card">
                    <div class="stat-value" id="playcardPoints">0</div>
                    <div class="stat-label">Points</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="playcardWins">0</div>
                    <div class="stat-label">Wins</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="playcardPoles">0</div>
                    <div class="stat-label">Poles</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">24</div>
                    <div class="stat-label">Races</div>
                </div>
            </div>
            <div class="playcard-season">2025 Season Statistics</div>
        </div>
    `;
    document.body.appendChild(playcard);

    backdrop.addEventListener('click', closePlaycard);
}

// ==================== SHOW PLAYCARD ====================
function showPlaycard(driverKey) {
    const driver = driverData[driverKey];
    if (!driver) return;

    // Update theme
    document.documentElement.setAttribute('data-driver-theme', driver.theme);

    // Update playcard content
    document.getElementById('playcardPhoto').src = driver.photo;
    document.getElementById('playcardName').textContent = driver.name;
    document.getElementById('playcardTeam').textContent = driver.team;
    document.getElementById('playcardPos').textContent = driver.position;
    document.getElementById('playcardPoints').textContent = driver.points;
    document.getElementById('playcardWins').textContent = driver.wins;
    document.getElementById('playcardPoles').textContent = driver.poles;

    // Show playcard
    document.getElementById('driverPlaycard').classList.add('active');
    document.getElementById('playcardBackdrop').classList.add('active');

    // Mark selected card
    document.querySelectorAll('.driver-card').forEach(c => c.classList.remove('selected'));
    document.querySelector(`[data-driver="${driverKey}"]`)?.classList.add('selected');
}

function closePlaycard() {
    document.getElementById('driverPlaycard').classList.remove('active');
    document.getElementById('playcardBackdrop').classList.remove('active');
    document.querySelectorAll('.driver-card').forEach(c => c.classList.remove('selected'));
}

// ==================== INIT DRIVER CARDS ====================
function initDriverCards() {
    const driverCards = document.querySelectorAll('.driver-card');
    const driverKeys = ['verstappen', 'norris', 'piastri', 'alonso', 'hulkenberg', 'bortoleto', 'hamilton'];

    driverCards.forEach((card, index) => {
        if (driverKeys[index]) {
            card.setAttribute('data-driver', driverKeys[index]);
            card.addEventListener('click', () => showPlaycard(driverKeys[index]));
        }
    });
}

// ==================== DARK MODE TOGGLE ====================
function initThemeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = '🌙';
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    document.body.appendChild(toggle);

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    toggle.innerHTML = savedTheme === 'light' ? '☀️' : '🌙';

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        toggle.innerHTML = next === 'light' ? '☀️' : '🌙';
    });
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.schedule-card, .driver-card, .video-item, .quick-link-card, .partner-logo, .team-card');

    elements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.animationDelay = `${(index % 6) * 0.1}s`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));
}

// ==================== ANIMATED COUNTERS ====================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);
        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    requestAnimationFrame(update);
}

function initCounters() {
    const counters = document.querySelectorAll('.points');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = 'true';
                const text = entry.target.textContent;
                const num = parseInt(text.replace(/[^0-9]/g, ''), 10);
                if (!isNaN(num)) {
                    const suffix = text.replace(/[0-9,]/g, '').trim();
                    entry.target.textContent = '0';
                    animateCounter(entry.target, num, 1500);
                    setTimeout(() => {
                        entry.target.textContent = num.toLocaleString() + ' ' + suffix;
                    }, 1600);
                }
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}

// ==================== MOBILE MENU ====================
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.remove('active');
    });
});

// ==================== HERO CAROUSEL ====================
let currentHeroSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');

function showHeroSlide(n) {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroDots.forEach(dot => dot.classList.remove('active'));
    heroSlides[n].classList.add('active');
    heroDots[n].classList.add('active');
}

function nextHeroSlide() {
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    showHeroSlide(currentHeroSlide);
}

function prevHeroSlide() {
    currentHeroSlide = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
    showHeroSlide(currentHeroSlide);
}

function goToHeroSlide(n) {
    currentHeroSlide = n;
    showHeroSlide(n);
}

setInterval(nextHeroSlide, 6000);

// ==================== FEATURED VIDEOS CAROUSEL ====================
let currentVideoSlide = 0;
const videoItems = document.querySelectorAll('.video-item');

function showVideoSlide(n) {
    videoItems.forEach(item => item.classList.remove('active'));
    videoItems[n].classList.add('active');
}

function nextFeaturedVideo() {
    currentVideoSlide = (currentVideoSlide + 1) % videoItems.length;
    showVideoSlide(currentVideoSlide);
}

function prevFeaturedVideo() {
    currentVideoSlide = (currentVideoSlide - 1 + videoItems.length) % videoItems.length;
    showVideoSlide(currentVideoSlide);
}

// ==================== TAB SWITCH ====================
function switchTab(tab) {
    const driversTab = document.getElementById('driversTab');
    const teamsTab = document.getElementById('teamsTab');
    const tabBtns = document.querySelectorAll('.tab-btn');

    if (tab === 'drivers') {
        driversTab.classList.remove('hidden');
        teamsTab.classList.add('hidden');
        tabBtns[0].classList.add('active');
        tabBtns[1].classList.remove('active');
    } else {
        driversTab.classList.add('hidden');
        teamsTab.classList.remove('hidden');
        tabBtns[0].classList.remove('active');
        tabBtns[1].classList.add('active');
    }
}

// ==================== PARALLAX EFFECT ====================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSlides = document.querySelectorAll('.hero-slide');
        heroSlides.forEach(slide => {
            slide.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`;
        });
    });
}

// ==================== NAV SCROLL ====================
function initNavScroll() {
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });
}

// ==================== EVENT LISTENERS ====================
document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobileMenu');
    const toggle = document.querySelector('.menu-toggle');
    if (menu && toggle && !menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('active');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const menu = document.getElementById('mobileMenu');
        if (menu) menu.classList.remove('active');
        closePlaycard();
    }
    if (e.key === 'ArrowRight') nextHeroSlide();
    if (e.key === 'ArrowLeft') prevHeroSlide();
});

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    createPlaycard();
    initDriverCards();
    initThemeToggle();
    initScrollAnimations();
    initCounters();
    initParallax();
    initNavScroll();

    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
});
