document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const nextBtns = document.querySelectorAll('.next-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const rewatchBtn = document.getElementById('rewatch-btn');
    const background = document.getElementById('background');

    let currentSection = 0;

    function showSection(index) {
        sections.forEach((section, i) => {
            if (i === index) {
                setTimeout(() => {
                    section.classList.add('active');
                }, 500);
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
            sections[currentSection].classList.remove('active');
            currentSection++;
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

    showSection(currentSection);
});