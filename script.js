/* STATE MANAGEMENT */
let currentPage = 1;
const totalPages = 10;

/* PAGE NAVIGATION */
function nextPage(pageNumber) {
    if (pageNumber > totalPages) return;
    
    // Hide current page
    document.getElementById(`page-${currentPage}`).classList.remove('active');
    
    // Show next page
    currentPage = pageNumber;
    document.getElementById(`page-${currentPage}`).classList.add('active');
}

function prevPage(pageNumber) {
    if (pageNumber < 1) return;
    
    // Hide current page
    document.getElementById(`page-${currentPage}`).classList.remove('active');
    
    // Show prev page
    currentPage = pageNumber;
    document.getElementById(`page-${currentPage}`).classList.add('active');
}

/* BACKGROUND HEART RAIN */
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤'; // You can change this to emojis like 🌸, ✨, 🧸
    
    // Random Position
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Random Size
    const size = Math.random() * 20 + 10; // between 10px and 30px
    heart.style.fontSize = size + 'px';
    
    // Random Animation Duration
    const duration = Math.random() * 3 + 2; // between 2s and 5s
    heart.style.animationDuration = duration + 's';
    
    document.getElementById('heart-rain').appendChild(heart);
    
    // Remove heart after animation ends to keep browser happy
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Create a heart every 300ms
setInterval(createHeart, 300);

function explodeHearts() {
    // 1. Change Button Text
    const btn = document.querySelector('.btn-heart');
    btn.innerText = "OMG I LOVE YOU!!! 💖😭";
    btn.disabled = true; // Stop double clicking

    // 2. Screen Shake & Flash Effect
    document.body.classList.add('shake-screen');
    document.body.classList.add('flash-effect');
    
    // Remove classes after animation so we can do it again if we wanted
    setTimeout(() => {
        document.body.classList.remove('shake-screen', 'flash-effect');
    }, 1000);

    // 3. The Cute Emojis Mix
    const emojis = ['💖', '💕', '😻', '🌸', '✨', '🦋', '🧸', '🎀', '🍭', '🍓', '🥺'];

    // 4. Create 100 Particles
    for (let i = 0; i < 150; i++) {
        createBombParticle(emojis);
    }
    
    // 5. Keep raining extra hard for 5 seconds
    let intenseRain = setInterval(createHeart, 50);
    setTimeout(() => {
        clearInterval(intenseRain);
    }, 5000);
}

function createBombParticle(emojis) {
    const el = document.createElement('div');
    el.classList.add('bomb-particle');
    
    // Pick random cute emoji
    el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Random Size (Some huge, some small)
    const size = Math.random() * 3 + 1; // 1rem to 4rem
    el.style.fontSize = `${size}rem`;
    
    document.body.appendChild(el);

    // PHYSICS MATH (Explode outward in a circle)
    const angle = Math.random() * Math.PI * 2; // Random direction
    const velocity = 200 + Math.random() * 400; // How far it flies
    
    // Calculate X and Y destination
    const x = Math.cos(angle) * velocity;
    const y = Math.sin(angle) * velocity;

    // Animate using Web Animations API
    const animation = el.animate([
        { 
            transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', 
            opacity: 1 
        },
        { 
            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1) rotate(${Math.random() * 360}deg)`, 
            opacity: 1, 
            offset: 0.8 
        },
        { 
            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y + 100}px)) scale(0)`, /* Fall down a bit at end */
            opacity: 0 
        }
    ], {
        duration: 1500 + Math.random() * 1000, // 1.5s to 2.5s duration
        easing: 'cubic-bezier(0, .9, .57, 1)', // Fast start, slow end (Explosion feel)
        fill: 'forwards'
    });

    // Clean up DOM after animation
    animation.onfinish = () => el.remove();
}