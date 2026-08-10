// Navigation Functions with Web Shooting Effect
let isTransitioning = false;
let currentHoveredLink = null;
let hoverWebInterval = null;

// Shoot web from Spider-Man's hand to target
function shootWeb(targetElement, callback) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    const spidey = document.getElementById('hangingSpidey');
    const webPaths = [
        document.getElementById('webPath'),
        document.getElementById('webPath1'),
        document.getElementById('webPath2'),
        document.getElementById('webPath3'),
        document.getElementById('webPath4')
    ];
    
    if (!spidey || !targetElement) {
        callback();
        return;
    }
    
    // Get positions - shoot from Spider-Man's hand (right side, middle)
    const spideyRect = spidey.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    
    // Position at Spider-Man's right hand
    const startX = spideyRect.right - 30;
    const startY = spideyRect.top + spideyRect.height / 2 + 20;
    const endX = targetRect.left + targetRect.width / 2;
    const endY = targetRect.top + targetRect.height / 2;
    
    // Add shooting pose
    spidey.classList.add('web-shooting');
    
    // Create multiple web strands with slight variations
    webPaths.forEach((webPath, index) => {
        if (!webPath) return;
        
        const offset = (index - 2) * 15; // Spread the strands
        const curve = 80 + (index * 20); // Varying curves
        
        const controlX = (startX + endX) / 2 + offset;
        const controlY = Math.min(startY, endY) - curve;
        
        const pathD = `M ${startX + offset * 0.5} ${startY + offset * 0.3} Q ${controlX} ${controlY} ${endX + offset * 0.5} ${endY + offset * 0.3}`;
        webPath.setAttribute('d', pathD);
        
        // Stagger the appearance of each strand
        setTimeout(() => {
            webPath.style.transition = 'opacity 0.1s';
            webPath.style.opacity = index === 0 ? '1' : (0.8 - index * 0.15);
        }, index * 30);
    });
    
    // Create web particles along the strands
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createWebParticle(startX, startY, endX, endY, i / 20);
        }, i * 25);
    }
    
    // Add web strand effects
    createWebStrands(startX, startY, endX, endY);
    
    // Web impact effect
    setTimeout(() => {
        createWebImpact(endX, endY);
        
        // Fade out all web strands
        webPaths.forEach(webPath => {
            if (webPath) {
                webPath.style.transition = 'opacity 0.4s';
                webPath.style.opacity = '0';
            }
        });
        
        // Page transition
        createPageTransition();
        
        setTimeout(() => {
            spidey.classList.remove('web-shooting');
            callback();
            isTransitioning = false;
        }, 400);
    }, 700);
}

// Create additional web strands effect
function createWebStrands(startX, startY, endX, endY) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const strand = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const svg = document.getElementById('webShooter');
            
            const offsetX = (Math.random() - 0.5) * 40;
            const offsetY = (Math.random() - 0.5) * 40;
            const controlX = (startX + endX) / 2 + offsetX;
            const controlY = (startY + endY) / 2 - 60 + offsetY;
            
            const pathD = `M ${startX + offsetX * 0.3} ${startY + offsetY * 0.3} Q ${controlX} ${controlY} ${endX + offsetX * 0.3} ${endY + offsetY * 0.3}`;
            
            strand.setAttribute('d', pathD);
            strand.setAttribute('stroke', 'rgba(255, 255, 255, 0.6)');
            strand.setAttribute('stroke-width', '1.5');
            strand.setAttribute('fill', 'none');
            strand.style.opacity = '0';
            strand.style.filter = 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))';
            
            svg.appendChild(strand);
            
            setTimeout(() => {
                strand.style.transition = 'opacity 0.2s';
                strand.style.opacity = '0.7';
            }, 50);
            
            setTimeout(() => {
                strand.style.transition = 'opacity 0.5s';
                strand.style.opacity = '0';
                setTimeout(() => strand.remove(), 500);
            }, 600);
        }, i * 40);
    }
}

// Shoot web on hover (visual only, no navigation)
function shootHoverWeb(targetElement) {
    const spidey = document.getElementById('hangingSpidey');
    const webPaths = [
        document.getElementById('webPath'),
        document.getElementById('webPath1'),
        document.getElementById('webPath2')
    ];
    
    if (!spidey || !targetElement) return;
    
    const spideyRect = spidey.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    
    // Position at Spider-Man's right hand
    const startX = spideyRect.right - 30;
    const startY = spideyRect.top + spideyRect.height / 2 + 20;
    const endX = targetRect.left + targetRect.width / 2;
    const endY = targetRect.top + targetRect.height / 2;
    
    // Add aiming pose
    spidey.classList.add('aiming');
    
    // Create multiple web strands for hover
    webPaths.forEach((webPath, index) => {
        if (!webPath) return;
        
        const offset = (index - 1) * 10;
        const controlX = (startX + endX) / 2 + offset;
        const controlY = (startY + endY) / 2 - 50;
        
        const pathD = `M ${startX + offset * 0.5} ${startY + offset * 0.3} Q ${controlX} ${controlY} ${endX + offset * 0.5} ${endY + offset * 0.3}`;
        webPath.setAttribute('d', pathD);
        
        // Show web with varying opacity
        webPath.style.transition = 'opacity 0.2s';
        webPath.style.opacity = index === 0 ? '0.5' : (0.4 - index * 0.1);
    });
}

// Clear hover web
function clearHoverWeb() {
    const spidey = document.getElementById('hangingSpidey');
    const webPaths = [
        document.getElementById('webPath'),
        document.getElementById('webPath1'),
        document.getElementById('webPath2'),
        document.getElementById('webPath3'),
        document.getElementById('webPath4')
    ];
    
    if (spidey) {
        spidey.classList.remove('aiming');
    }
    
    webPaths.forEach(webPath => {
        if (webPath) {
            webPath.style.transition = 'opacity 0.3s';
            webPath.style.opacity = '0';
        }
    });
}

function createWebParticle(startX, startY, endX, endY, progress) {
    const particle = document.createElement('div');
    particle.className = 'web-shoot-effect';
    
    const x = startX + (endX - startX) * progress;
    const y = startY + (endY - startY) * progress;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 600);
}

function createWebImpact(x, y) {
    const impact = document.createElement('div');
    impact.className = 'web-impact';
    impact.style.left = x + 'px';
    impact.style.top = y + 'px';
    
    document.body.appendChild(impact);
    
    setTimeout(() => impact.remove(), 800);
}

function createPageTransition() {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
    
    setTimeout(() => transition.classList.add('active'), 10);
    
    setTimeout(() => {
        transition.classList.remove('active');
        setTimeout(() => transition.remove(), 600);
    }, 400);
}

function goToHome() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('mainSite').style.display = 'block';
    showSection('home');
}

function goToSightings() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('mainSite').style.display = 'block';
    showSection('sightings');
}

function showSection(sectionName) {
    // Find the element that triggered this (if any)
    const targetSection = document.getElementById(sectionName);
    
    if (targetSection && !isTransitioning && document.getElementById('mainSite').style.display !== 'none') {
        shootWeb(targetSection, () => {
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(section => {
                section.style.display = 'none';
            });
            targetSection.style.display = 'block';
            window.scrollTo(0, 0);
        });
    } else {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });
        if (targetSection) {
            targetSection.style.display = 'block';
        }
        window.scrollTo(0, 0);
    }
}

function showArticle(articleId) {
    const articleSection = document.getElementById('article');
    if (articleSection) {
        shootWeb(articleSection, () => {
            showSection('article');
        });
    } else {
        showSection('article');
    }
}

// Search Functions
function toggleSearch() {
    const panel = document.getElementById('searchPanel');
    const notificationsPanel = document.getElementById('notificationsPanel');
    notificationsPanel.style.display = 'none';
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function toggleNotifications() {
    const panel = document.getElementById('notificationsPanel');
    const searchPanel = document.getElementById('searchPanel');
    searchPanel.style.display = 'none';
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

// Sighting Functions
function showSighting(id) {
    alert(`Viewing sighting details for location ${id}`);
}

function submitSighting(event) {
    event.preventDefault();
    alert('Your sighting has been submitted for verification! Thank you for helping track Spider-Man.');
    showSection('sightings');
}

// Poll Functions
let hasVoted = false;

function vote(choice) {
    if (hasVoted) {
        alert('You have already voted in this poll!');
        return;
    }
    
    hasVoted = true;
    document.getElementById('pollResults').style.display = 'block';
    
    // Simulate vote update
    let menaceVotes = 42;
    let heroVotes = 58;
    let totalVotes = 12847;
    
    if (choice === 'menace') {
        menaceVotes += 0.01;
        heroVotes -= 0.01;
    } else {
        heroVotes += 0.01;
        menaceVotes -= 0.01;
    }
    
    totalVotes += 1;
    
    document.getElementById('menacePercent').textContent = menaceVotes.toFixed(0) + '%';
    document.getElementById('heroPercent').textContent = heroVotes.toFixed(0) + '%';
    document.getElementById('menaceFill').style.width = menaceVotes + '%';
    document.getElementById('heroFill').style.width = heroVotes + '%';
    document.getElementById('totalVotes').textContent = totalVotes.toLocaleString();
    
    alert(`Thanks for voting! You chose: ${choice === 'menace' ? 'Spider-Man is a menace' : 'Spider-Man is a hero'}`);
}

// Close panels when clicking outside
document.addEventListener('click', function(event) {
    const searchPanel = document.getElementById('searchPanel');
    const notificationsPanel = document.getElementById('notificationsPanel');
    
    if (searchPanel && notificationsPanel) {
        if (!event.target.closest('.icon-btn') && 
            !event.target.closest('.search-panel') && 
            !event.target.closest('.notifications-panel')) {
            searchPanel.style.display = 'none';
            notificationsPanel.style.display = 'none';
        }
    }
});

// Simulate breaking news ticker animation
let tickerMessages = [
    'Spider-Man spotted in Midtown - 10 civilians rescued',
    'Green Goblin attacks financial district',
    'Daily Bugle exclusive: New Spider-Man photos',
    'Poll: Should vigilantes be legal in NYC?'
];

let currentTickerIndex = 0;

function updateTicker() {
    const tickerText = document.querySelector('.ticker-text');
    if (tickerText) {
        currentTickerIndex = (currentTickerIndex + 1) % tickerMessages.length;
        tickerText.textContent = tickerMessages[currentTickerIndex];
    }
}

setInterval(updateTicker, 5000);

// Initialize
console.log('Daily Bugle website loaded');
console.log('Spider-Man: Menace or Hero? You decide!');


// Spider-Man themed enhancements

// Add web trail cursor effect
let canCreateTrail = true;
document.addEventListener('mousemove', function(event) {
    if (!canCreateTrail) return;
    
    canCreateTrail = false;
    setTimeout(() => canCreateTrail = true, 50);
    
    const trail = document.createElement('div');
    trail.className = 'web-trail';
    trail.style.left = event.clientX + 'px';
    trail.style.top = event.clientY + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => trail.remove(), 1000);
});

// Add crawling spider on page
function addCrawlingSpider() {
    const spider = document.createElement('div');
    spider.className = 'scroll-spider';
    spider.textContent = '🕷️';
    document.body.appendChild(spider);
}

// Add spider after page loads
setTimeout(addCrawlingSpider, 2000);

// Spider sense alert effect on breaking news
const breakingAlerts = document.querySelectorAll('.breaking-alert');
setInterval(() => {
    breakingAlerts.forEach(alert => {
        alert.classList.add('spider-sense');
        setTimeout(() => alert.classList.remove('spider-sense'), 1000);
    });
}, 5000);

// Thwip sound effect simulation (visual feedback)
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-report').forEach(btn => {
    btn.classList.add('thwip-effect');
    btn.addEventListener('click', function() {
        this.classList.add('impact-effect');
        setTimeout(() => this.classList.remove('impact-effect'), 300);
    });
});

// Dynamic color shift for menace/hero elements
function addColorShift() {
    const menaceElements = document.querySelectorAll('.comparison-card.biased, .poll-btn.menace');
    const heroElements = document.querySelectorAll('.comparison-card.neutral, .poll-btn.hero');
    
    menaceElements.forEach(el => el.classList.add('color-shift-menace'));
    heroElements.forEach(el => el.classList.add('color-shift-hero'));
}

// Apply color shift after short delay
setTimeout(addColorShift, 1000);

// Add web shine effect to cards
document.querySelectorAll('.news-card, .featured-story, .widget').forEach(card => {
    card.classList.add('web-shine');
});

// Random spider emoji appears occasionally
function spawnRandomSpider() {
    const spider = document.createElement('div');
    spider.style.position = 'fixed';
    spider.style.fontSize = '2rem';
    spider.style.zIndex = '9999';
    spider.style.pointerEvents = 'none';
    spider.textContent = '🕷️';
    spider.style.top = Math.random() * 100 + '%';
    spider.style.left = '-50px';
    spider.style.opacity = '0.4';
    
    document.body.appendChild(spider);
    
    const duration = 5000 + Math.random() * 5000;
    spider.style.transition = `all ${duration}ms linear`;
    
    setTimeout(() => {
        spider.style.left = window.innerWidth + 'px';
        spider.style.top = (Math.random() * 100) + '%';
    }, 100);
    
    setTimeout(() => spider.remove(), duration + 100);
}

// Spawn spider occasionally
setInterval(() => {
    if (Math.random() > 0.7) {
        spawnRandomSpider();
    }
}, 8000);

// Add comic book style to article images
document.querySelectorAll('.article-image, .featured-story img').forEach(img => {
    img.classList.add('comic-panel');
});

// Animate reputation meter on load
function animateReputationMeter() {
    const meterFill = document.querySelector('.meter-fill');
    if (meterFill) {
        const targetWidth = meterFill.style.width;
        meterFill.style.width = '0%';
        setTimeout(() => {
            meterFill.style.transition = 'width 2s ease-out';
            meterFill.style.width = targetWidth;
        }, 500);
    }
}

// Call when showing home section
const originalShowSection = showSection;
showSection = function(sectionName) {
    originalShowSection(sectionName);
    if (sectionName === 'home') {
        setTimeout(animateReputationMeter, 300);
    }
};

// Add interactive nav link handlers
document.addEventListener('DOMContentLoaded', function() {
    // Make Spider-Man descend on page load
    setTimeout(() => {
        const spidey = document.getElementById('hangingSpidey');
        if (spidey) {
            spidey.classList.add('descended');
            console.log('🕷️ Spider-Man descending from above!');
        }
    }, 500);
    
    // Set up Spider-Man image with better fallback
    const spideyImg = document.querySelector('.spidey-image');
    if (spideyImg) {
        // Alternative Spider-Man swinging image sources - high quality PNGs
        const imageBackups = [
            'https://static.vecteezy.com/system/resources/previews/024/095/398/non_2x/spiderman-hanging-with-web-on-transparent-background-free-png.png',
            'https://pngimg.com/uploads/spider_man/spider_man_PNG52.png',
            'https://www.freeiconspng.com/thumbs/spiderman-png/spiderman-png-25.png',
            'https://pngimg.com/uploads/spider_man/spider_man_PNG51.png',
            'https://i.imgur.com/YqF5x8o.png', // Direct reliable backup
            // Emoji fallback as last resort
            'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="80" font-size="80">🕷️</text></svg>'
        ];
        
        let currentBackupIndex = 0;
        let attemptedUrls = new Set();
        
        spideyImg.onerror = function() {
            // Avoid infinite loops
            if (attemptedUrls.has(this.src)) {
                currentBackupIndex++;
            }
            
            attemptedUrls.add(this.src);
            
            if (currentBackupIndex < imageBackups.length) {
                console.log('🕷️ Trying backup Spider-Man image #' + (currentBackupIndex + 1));
                this.src = imageBackups[currentBackupIndex];
                currentBackupIndex++;
            } else {
                console.log('❌ All Spider-Man images failed - please check your internet connection');
                // Show a visible error message
                this.style.display = 'none';
                const errorMsg = document.createElement('div');
                errorMsg.style.cssText = 'position: fixed; top: 20px; right: 100px; background: rgba(220,20,60,0.9); color: white; padding: 10px 20px; border-radius: 8px; z-index: 1000; font-size: 14px;';
                errorMsg.textContent = '🕷️ Spider-Man image failed to load';
                document.body.appendChild(errorMsg);
                setTimeout(() => errorMsg.remove(), 3000);
            }
        };
        
        // Log when image loads successfully
        spideyImg.onload = function() {
            console.log('✅ Spider-Man swinging into action! Image loaded successfully!');
            console.log('📍 Loaded from:', this.src);
        };
        
        // Force check if image is already in error state
        if (!spideyImg.complete || spideyImg.naturalHeight === 0) {
            console.log('⚠️ Initial image appears broken, trying fallback...');
            setTimeout(() => {
                if (!spideyImg.complete || spideyImg.naturalHeight === 0) {
                    spideyImg.src = imageBackups[1];
                    currentBackupIndex = 2;
                }
            }, 1000);
        }
    }
    
    // Add click handlers to all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        // Hover - show web aiming
        link.addEventListener('mouseenter', function(e) {
            if (!isTransitioning) {
                currentHoveredLink = this;
                shootHoverWeb(this);
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (currentHoveredLink === this) {
                currentHoveredLink = null;
                clearHoverWeb();
            }
        });
        
        // Click - shoot web and navigate
        link.addEventListener('click', function(e) {
            e.preventDefault();
            clearHoverWeb(); // Clear hover web first
            
            const href = this.getAttribute('onclick');
            if (href) {
                const match = href.match(/showSection\('(.+?)'\)/);
                if (match) {
                    shootWeb(this, () => {
                        showSection(match[1]);
                    });
                }
            }
        });
    });
    
    // Handle report button
    const reportBtn = document.querySelector('.btn-report');
    if (reportBtn) {
        reportBtn.addEventListener('mouseenter', function() {
            if (!isTransitioning) {
                shootHoverWeb(this);
            }
        });
        
        reportBtn.addEventListener('mouseleave', function() {
            clearHoverWeb();
        });
        
        reportBtn.addEventListener('click', function(e) {
            e.preventDefault();
            clearHoverWeb();
            shootWeb(this, () => {
                showSection('report');
            });
        });
    }
    
    // Make Spider-Man interactive
    const hangingSpidey = document.getElementById('hangingSpidey');
    if (hangingSpidey) {
        hangingSpidey.style.cursor = 'pointer';
        hangingSpidey.style.pointerEvents = 'auto';
        
        hangingSpidey.addEventListener('click', function() {
            // Make Spidey do a flip!
            this.style.animation = 'none';
            this.style.transform = 'rotate(360deg) scale(1.2)';
            
            // Create web burst effect
            for (let i = 0; i < 8; i++) {
                const angle = (i * 45) * Math.PI / 180;
                const distance = 100;
                const x = this.offsetLeft + this.offsetWidth / 2 + Math.cos(angle) * distance;
                const y = this.offsetTop + this.offsetHeight / 2 + Math.sin(angle) * distance;
                createWebParticle(
                    this.offsetLeft + this.offsetWidth / 2,
                    this.offsetTop + this.offsetHeight / 2,
                    x,
                    y,
                    1
                );
            }
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.animation = 'spideySwing 4s ease-in-out infinite';
            }, 600);
        });
    }
});

console.log('🕷️ Spider-Man effects activated!');
console.log('🕸️ Web-slinging functionality loaded!');
console.log('🎯 Click navigation links to see Spider-Man shoot webs!');
