document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const nextBtns = document.querySelectorAll('.next-btn:not(#music-yes-btn):not(#music-no-btn)');
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
    const loveImg = document.getElementById("love-image");
    const loveText = document.getElementById("love-text");
    const noText = document.getElementById("no-text");
    const noSound = document.getElementById("no-sound");
    const musicYesBtn = document.getElementById("music-yes-btn");
    const musicNoBtn = document.getElementById("music-no-btn");
    const bgMusic = document.getElementById("bg-music");


    let noCount = 0;
    let currentSection = 0;

    let musicEnabled = false;

    function startBgMusic() {
    if (bgMusic && musicEnabled) {
        bgMusic.volume = 0.4;
        bgMusic.play().catch(() => {});
    }
    }

    function goToSection(id) {
        sections[currentSection].classList.remove("active");
        currentSection = [...sections].findIndex(s => s.id === id);
        showSection(currentSection);
    }

        const noStages = [
    {
        reaction: "awh.. lets try again..",
        nextImg: "assets/images/no1.jpg",
        sound: "assets/audio/bass1.mp3",
        forceYes: false
    },
    {
        reaction: "WDYM U DONT LOVE ME, AGAIN 😭",
        nextImg: "assets/images/no2.gif",
        sound: "assets/audio/bass2.mp3",
        forceYes: false
    },
    {
        reaction: "yeah no, you HAVE to love me.",
        nextImg: "assets/images/no3.gif",
        sound: "assets/audio/bass3.mp3",
        forceYes: true
    }
    ];

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

    musicYesBtn.addEventListener("click", () => {
        musicEnabled = true;
        startBgMusic();
        goToSection("section1");
        });

    musicNoBtn.addEventListener("click", () => {
        musicEnabled = false;
        goToSection("section1");
        });

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

    yesBtn.addEventListener("click", () => {
        // If forced-yes stage reached → go to letter
        if (noStages[noCount - 1]?.forceYes) {
            goToSection("section6"); // letter section
            return;
        }

        // Normal yes behavior
        noCount = 0;
        noBtn.style.display = "inline-block";
        yesBtn.textContent = "Yes";
        loveText.textContent = "Do you love me?";
        loveImg.src = "assets/images/cat2.jpg";

        goToSection("section6");
        });
         

    noBtn.addEventListener("click", () => {
        const stage = noStages[noCount];

        // 🔊 play NO sound (does NOT stop bg music)
        if (noSound && stage.sound) {
            noSound.src = stage.sound;
            noSound.currentTime = 0;
            noSound.volume = 0.7;
            noSound.play().catch(() => {});
        }

        noText.textContent = stage.reaction;

        goToSection("section-no");

        setTimeout(() => {
            loveImg.src = stage.nextImg;

            if (stage.forceYes) {
            noBtn.style.display = "none";
            yesBtn.textContent = "YA I LOVE U";
            }

            goToSection("section5");

            if (noCount < noStages.length - 1) {
            noCount++;
            }
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