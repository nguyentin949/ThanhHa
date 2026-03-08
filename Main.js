// --- Audio Control Logic ---
const audio = document.getElementById('backgroundMusic');
const playMusicBtn = document.getElementById('playMusicBtn');
const musicControl = document.getElementById('musicControl');

let isPlaying = false;

// Auto-play audio khi trang load
function playAudio() {
  if (audio && audio.play) {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isPlaying = true;
          console.log('Nhạc đang phát');
        })
        .catch((error) => {
          console.log('Autoplay bị chặn:', error);
          // Nút sẽ hiển thị để user bấm
        });
    }
  }
}

// Gọi hàm play khi trang sẵn sàng
window.addEventListener('load', () => {
  setTimeout(playAudio, 500);
});

// Nút bấm để phát nhạc
if (playMusicBtn && audio) {
  playMusicBtn.addEventListener('click', () => {
    if (!isPlaying) {
      audio.play().then(() => {
        isPlaying = true;
        playMusicBtn.textContent = '⏸ Tạm dừng';
      }).catch(err => console.log('Lỗi phát nhạc:', err));
    } else {
      audio.pause();
      isPlaying = false;
      playMusicBtn.textContent = '🎵 Phát nhạc';
    }
  });
}

// Ẩn nút nếu audio phát thành công
audio.addEventListener('play', () => {
  musicControl.style.display = 'none';
});

audio.addEventListener('pause', () => {
  musicControl.style.display = 'flex';
});

// --- Background Animation Logic ---
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class BackgroundParticle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 20;
    this.size = Math.random() * 15 + 10;
    this.speedY = Math.random() * 1 + 0.5;
    this.speedX = Math.random() * 2 - 1;
    this.type = Math.random() > 0.5 ? '❤️' : '🌸';
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    if (this.y < -20) this.reset();
  }
  draw() {
    ctx.font = `${this.size}px Arial`;
    ctx.globalAlpha = this.opacity;
    ctx.fillText(this.type, this.x, this.y);
  }
}

for (let i = 0; i < 20; i++) {
  particles.push(new BackgroundParticle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

// --- Surprise Interaction Logic ---
const surpriseBtn = document.getElementById('surpriseBtn');

if (surpriseBtn) {
  surpriseBtn.addEventListener('click', (e) => {
    // Create confetti effect
    createConfetti(e.clientX, e.clientY);
    
    // Create heart bursts
    for (let i = 0; i < 30; i++) {
      createParticle(e.clientX, e.clientY);
    }
    
    setTimeout(() => {
      alert("Chúc Hà một ngày 8/3 thật nhiều quà, nhiều hoa và ngập tràn niềm vui nhé!!! 🌸💖");
    }, 500);
  });
}

// Enhanced confetti function
function createConfetti(x, y) {
  const confettiPieces = 40;
  for (let i = 0; i < confettiPieces; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti confetti-falling';
    confetti.innerText = ['🎉', '✨', '💖', '🌸', '🌷', '🎊'][Math.floor(Math.random() * 6)];
    confetti.style.left = x + 'px';
    confetti.style.top = y + 'px';
    confetti.style.fontSize = Math.random() * 20 + 15 + 'px';
    confetti.style.transform = `rotate(${Math.random() * 360}deg) translateX(${Math.random() * 100 - 50}px)`;
    confetti.style.animation = `confetti-fall ${2.5 + Math.random() * 1}s ease-in forwards`;
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 3500);
  }
}

function createParticle(x, y) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 20 + 10;
  p.style.fontSize = `${size}px`;
  p.innerText = ['❤️', '💖', '✨', '🌸', '🌷'][Math.floor(Math.random() * 5)];
  p.style.left = `${x}px`;
  p.style.top = `${y}px`;
  
  const angle = Math.random() * Math.PI * 2;
  const velocity = Math.random() * 10 + 5;
  const vx = Math.cos(angle) * velocity;
  const vy = Math.sin(angle) * velocity;
  
  document.body.appendChild(p);
  
  let posX = x;
  let posY = y;
  let opacity = 1;
  
  function move() {
    posX += vx;
    posY += vy;
    opacity -= 0.02;
    p.style.transform = `translate(${posX - x}px, ${posY - y}px) scale(${opacity})`;
    p.style.opacity = opacity;
    
    if (opacity > 0) {
      requestAnimationFrame(move);
    } else {
      p.remove();
    }
  }
  move();
}

// Floating hearts on page click
document.addEventListener('click', (e) => {
  // Don't create hearts when clicking on interactive elements
  if (e.target.closest('button') || e.target.closest('img') || e.target.closest('a')) {
    return;
  }
  
  createFloatingHeart(e.clientX, e.clientY);
});

function createFloatingHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'floating-heart floating';
  heart.innerText = ['💖', '❤️', '💕', '💗'][Math.floor(Math.random() * 4)];
  heart.style.left = x + 'px';
  heart.style.top = y + 'px';
  heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
  
  document.body.appendChild(heart);
  
  setTimeout(() => {
    heart.remove();
  }, 1500);
}

// --- Image Zoom Functionality ---
const zoomableImages = document.querySelectorAll('.zoomable-image');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

// Open modal when clicking image
zoomableImages.forEach(img => {
  img.addEventListener('click', () => {
    modalImage.src = img.src;
    imageModal.classList.remove('hidden');
  });
});

// Close modal when clicking close button
closeModal.addEventListener('click', () => {
  imageModal.classList.add('hidden');
});

// Close modal when clicking outside the image
imageModal.addEventListener('click', (e) => {
  if (e.target === imageModal) {
    imageModal.classList.add('hidden');
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    imageModal.classList.add('hidden');
  }
});