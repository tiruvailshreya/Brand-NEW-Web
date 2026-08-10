// Navigation Functions
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
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionName).style.display = 'block';
    window.scrollTo(0, 0);
}

function showArticle(articleId) {
    showSection('article');
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

console.log('🕷️ Spider-Man effects activated!');
console.log('🕸️ Web-slinging functionality loaded!');
