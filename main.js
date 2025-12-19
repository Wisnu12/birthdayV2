document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const nextBtns = document.querySelectorAll('.next-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const rewatchBtn = document.getElementById('rewatch-btn');
    const background = document.getElementById('background');
    const lightbox = document.getElementById("imageLightbox");
    const lightboxImg = document.getElementById("lightboxImage");
    const closeBtn = document.getElementById("closeLightbox");
    const emojiContainer = document.getElementById("emoji-background");
    const EMOJIS = ["🎂", "🎉", "💖", "✨", "🎈"];
    const EMOJI_COUNT = 15;
    let currentSection = 0;

    for (let i = 0; i < EMOJI_COUNT; i++) {
    const emoji = document.createElement("div");
    emoji.classList.add("floating-emoji");
    emoji.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

    // Random properties (same idea as Framer Motion)
    const size = Math.random() * 1.5 + 1.5; // 1.5rem – 3rem
    const duration = Math.random() * 10 + 10; // 10–20s
    const delay = Math.random() * 5;

    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.fontSize = size + "rem";
    emoji.style.animationDuration = duration + "s";
    emoji.style.animationDelay = delay + "s";

    emojiContainer.appendChild(emoji);
}
    function showSection(index) {
    sections.forEach((section, i) => {
        if (i === index) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}


    function createEmoji() {
        const emoji = document.createElement('div');
        emoji.classList.add('emoji');
        emoji.innerHTML = '&#x1F382;'; // Birthday cake emoji
        emoji.style.left = Math.random() * 100 + 'vw';
        emoji.style.animationDuration = Math.random() * 2 + 3 + 's';
        background.appendChild(emoji);

        setTimeout(() => {
            emoji.remove();
        }, 5000);
    }

    setInterval(createEmoji, 300);

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentSection++;
            showSection(currentSection);
            if (currentSection >= sections.length) {
                currentSection = 0;
            }
            showSection(currentSection);
        });
    });

    yesBtn.addEventListener('click', () => {
        sections[currentSection].classList.remove('active');
        currentSection = 6; // Go to the letter section
        showSection(currentSection);
    });

    noBtn.addEventListener('click', () => {
        sections[currentSection].classList.remove('active');
        currentSection = 5; // Go to the "awh.." section
        showSection(currentSection);

        setTimeout(() => {
            sections[currentSection].classList.remove('active');
            currentSection = 4; // Go back to the "Do you love me?" section
            showSection(currentSection);
        }, 2000);
    });

    rewatchBtn.addEventListener('click', () => {
        sections[currentSection].classList.remove('active');
        currentSection = 0;
        showSection(currentSection);
    });

        document.querySelectorAll(".image-grid img").forEach(img => {
        img.addEventListener("click", () => {
            lightboxImg.src = img.src;
            lightbox.classList.add("active");
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.classList.remove("active");
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove("active");
        }
    });    

    showSection(currentSection);
});