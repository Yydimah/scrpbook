let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const controlsContainer = document.querySelector('.controls-container'); 
const sliderContainer = document.querySelector('.slider-container');

// FUNGSI UNTUK MEMUTAR MUSIK DI MENIT TERTENTU
function playAudioAtSpecificTime(minutes, seconds) {
    if (!isPlaying) {
        const totalSeconds = (minutes * 60) + seconds;

        // Trik: Jalankan play() dulu agar browser mendaftarkan interaksi audio ini
        audio.play()
            .then(() => {
                // Begitu berhasil putar, langsung lompat ke menit yang ditentukan
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

// FUNGSI UTAMA PERGANTIAN SLIDE DENGAN ANIMASI REMUK KERTAS & KUPU-KUPU
function changeSlideWithAnimation(nextIndex) {
    const currentSlide = slides[currentSlideIndex];
    const nextSlide = slides[nextIndex];
    
    // 1. Trigger animasi meremuk pada slide yang sedang aktif saat ini
    currentSlide.classList.remove('active');
    currentSlide.classList.add('crumple-leaving');
    
    // 2. Munculkan efek semburan/ledakan kupu-kupu dari tengah
    createButterflyExplosion();

    // 3. Tunggu 600ms (saat kertas mengecil habis), lalu munculkan slide baru
    setTimeout(() => {
        currentSlide.classList.remove('crumple-leaving');
        
        // Set indeks slide sekarang ke yang baru
        currentSlideIndex = nextIndex;
        
        // 4. Masukkan slide baru dengan efek mekar kembali
        nextSlide.classList.add('butterfly-entering', 'active');
        
        // Atur visibilitas tombol navigasi di bawah
        if (currentSlideIndex > 0) {
            controlsContainer.classList.add('show');
            playAudioAtSpecificTime(2, 22); // Jalankan musik jika pindah dari halaman depan
        } else {
            controlsContainer.classList.remove('show');
        }
        
        // Bersihkan kelas animasi masuk setelah selesai
        setTimeout(() => {
            nextSlide.classList.remove('butterfly-entering');
        }, 600);
        
    }, 600);
}

function nextSlide() {
    let nextIndex = currentSlideIndex;
    if (currentSlideIndex < slides.length - 1) {
        nextIndex++;
    } else {
        nextIndex = 0; 
    }
    changeSlideWithAnimation(nextIndex);
}

function prevSlide() {
    let nextIndex = currentSlideIndex;
    if (currentSlideIndex > 0) {
        nextIndex--;
    } else {
        nextIndex = slides.length - 1; 
    }
    changeSlideWithAnimation(nextIndex);
}

// FUNGSI EFEK LEDAKAN KUPU-KUPU 🦋
function createButterflyExplosion() {
    const emojis = ['🦋', '✨', '🌸'];
    const particleCount = 14; // Jumlah semburan partikel
    
    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'butterfly-particle';
        p.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Mengarahkan titik ledakan tepat di tengah container scrapbook
        p.style.left = '50%';
        p.style.top = '50%';
        
        // Hitung arah terbang acak keluar area layar (Samsung A32 fit)
        const randomX = (Math.random() - 0.5) * 320 + 'px';
        const randomY = (Math.random() - 0.6) * 380 + 'px'; 
        const randomRot = (Math.random() - 0.5) * 120 + 'deg';
        const randomScale = Math.random() * 0.6 + 0.7;
        
        p.style.setProperty('--x', randomX);
        p.style.setProperty('--y', randomY);
        p.style.setProperty('--r', randomRot);
        p.style.setProperty('--s', randomScale);
        
        sliderContainer.appendChild(p);
        
        // Hapus elemen setelah animasi menyebar beres
        setTimeout(() => { p.remove(); }, 800);
    }
}

// FITUR INTERAKTIF BUKA KADO
function openGift() {
    const giftContainer = document.getElementById('giftContainer');
    const hintText = document.querySelector('.tap-hint');
    
    giftContainer.classList.add('open');
    
    if(hintText) {
        hintText.innerText = "Surpriseee! 🎉";
    }
    
    // Diubah ke menit 2, detik 22
    playAudioAtSpecificTime(2, 22);
}

// FITUR MUSIK LATAR
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