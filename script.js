let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const controlsContainer = document.querySelector('.controls-container'); 

// FUNGSI UNTUK MEMUTAR MUSIK DI MENIT TERTENTU (VERSI PERBAIKAN)
function playAudioAtSpecificTime(minutes, seconds) {
    if (!isPlaying) {
        const totalSeconds = (minutes * 60) + seconds;

        // Trik: Jalankan play() dulu agar browser mendaftarkan interaksi audio ini
        audio.play()
            .then(() => {
                // Begitu berhasil putar, langsung lompat ke menit 2:20
                audio.currentTime = totalSeconds; 
                isPlaying = true;
                if (musicBtn) musicBtn.innerText = "🔊";
            })
            .catch(e => {
                console.log("Autoplay ditolak. Kita tunggu sampai user benar-benar klik.");
                
                // ALTERNATIF CADANGAN: Jika gagal karena masalah loading, 
                // kita paksa lompat saat audio sudah siap berputar (loadeddata)
                audio.addEventListener('loadeddata', () => {
                    audio.currentTime = totalSeconds;
                }, { once: true });
            });
    }
}

function updateSlider() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlideIndex) {
            slide.classList.add('active');
        }
    });

    if (currentSlideIndex > 0) {
        controlsContainer.classList.add('show');
        
        // Diubah ke menit 2, detik 20
        playAudioAtSpecificTime(2, 22); 
    } else {
        controlsContainer.classList.remove('show');
    }
}

function nextSlide() {
    if (currentSlideIndex < slides.length - 1) {
        currentSlideIndex++;
    } else {
        currentSlideIndex = 0; 
    }
    updateSlider();
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
    } else {
        currentSlideIndex = slides.length - 1; 
    }
    updateSlider();
}

function openGift() {
    const giftContainer = document.getElementById('giftContainer');
    const hintText = document.querySelector('.tap-hint');
    
    giftContainer.classList.add('open');
    
    if(hintText) {
        hintText.innerText = "Surpriseee! 🎉";
    }
    
    // Diubah ke menit 2, detik 20
    playAudioAtSpecificTime(2, 22);
}

// Fitur Musik Latar
const musicBtn = document.getElementById('musicBtn');
let isPlaying = false;
const audio = new Audio('westlife.mp3'); 
audio.loop = true;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        musicBtn.innerText = "🔇";
    } else {
        audio.play().catch(e => console.log("Gagal memutar audio."));
        musicBtn.innerText = "🔊";
    }
    isPlaying = !isPlaying;
});