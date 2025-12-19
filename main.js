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

        const noStages = [
    {
        reaction: "awh.. lets try again..",
        nextImg: "assets/images/no1.jpg",
        sound: "assets/audio/no1.mp3",
        forceYes: false
    },
    {
        reaction: "WDYM U DONT LOVE ME, AGAIN 😭",
        nextImg: "assets/images/no2.jpg",
        sound: "assets/audio/no2.mp3",
        forceYes: false
    },
    {
        reaction: "yeah no, you HAVE to love me.",
        nextImg: "assets/images/no3.jpg",
        sound: "assets/audio/no3.mp3",
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

    sections[currentSection].classList.remove("active");
    currentSection = [...sections].findIndex(s => s.id === "section1");
    showSection(currentSection);
    });

    musicNoBtn.addEventListener("click", () => {
    musicEnabled = false;

    sections[currentSection].classList.remove("active");
    currentSection = [...sections].findIndex(s => s.id === "section1");
    showSection(currentSection);
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
        noCount = 0;
        noBtn.style.display = "inline-block";
        yesBtn.textContent = "Yes";
        loveText.textContent = "Do you love me?";
        loveImg.src = "assets/images/cat2.jpg";

        sections[currentSection].classList.remove("active");
        currentSection = 6;
        showSection(currentSection);
        });         

    noBtn.addEventListener("click", () => {
        if (noSound) {
            noSound.currentTime = 0; // restart sound if spam-clicked
            noSound.volume = 0.6;
            noSound.play().catch(() => {});
        }
        const stage = noStages[noCount];
        noText.textContent = stage.reaction;
        sections[currentSection].classList.remove("active");
        currentSection = [...sections].findIndex(s => s.id === "section-no");
        showSection(currentSection);

        // 2. Prepare next state
        setTimeout(() => {
            // Update question section
            loveImg.src = stage.nextImg;

            if (stage.forceYes) {
            noBtn.style.display = "none";
            yesBtn.textContent = "YA I LOVE U";
            }

            // Go back to question
            sections[currentSection].classList.remove("active");
            currentSection = [...sections].findIndex(s => s.id === "section5");
            showSection(currentSection);

            if (noCount < noStages.length - 1) {
            noCount++;
            }
        }, 2000); // reaction duration
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