document.addEventListener("DOMContentLoaded", function() {
    // Tạo hiệu ứng hạt lấp lánh (sparkles) rơi nhẹ
    createSparkles();
});

function createSparkles() {
    const body = document.body;
    const sparkleCount = 30; // Số lượng hạt
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // Vị trí ngẫu nhiên theo chiều ngang
        sparkle.style.left = Math.random() * 100 + 'vw';
        
        // Thời gian delay ngẫu nhiên
        sparkle.style.animationDelay = Math.random() * 5 + 's';
        
        // Tốc độ rơi ngẫu nhiên (từ 3s đến 8s) để trông tự nhiên hơn
        sparkle.style.animationDuration = Math.random() * 5 + 3 + 's';
        
        // Kích thước ngẫu nhiên (Từ 2px đến 7px)
        const size = Math.random() * 5 + 2; 
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        
        body.appendChild(sparkle);
    }
}