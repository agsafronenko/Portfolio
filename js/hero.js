document.addEventListener("DOMContentLoaded", () => {
  // Animation timing constants (ms)
  const TIMING = {
    imageReveal: 500,
    heroTitle: 1500,
    heroButtons: 9000,
    profileImage: 150,
    shuffle: 500,
    reveal: 3500,
    cursorBlink: 500,
    titleCharReveal: 50,
    subtitleStart: 300,
    typing: 30,
    pauseShuffle: 750,
    pauseNextTech: 750,
    pauseNextCategory: 1000,
    deleting: 30,
    shuffleFrame: 50,
  };

  // Initialize GSAP animations
  initHeroAnimations();

  // Setup title animation with shuffling effect
  const heroTitle = document.getElementById("heroTitle");
  const heroSubtitle = document.getElementById("heroSubtitle");
  setupTitleAnimation(heroTitle);

  // Setup cursor style
  setupCursorStyle();
});

// Initialize main hero animations with GSAP
function initHeroAnimations() {
  // Title animation
  gsap.to("#heroTitle", {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power3.out",
  });

  // Buttons animation
  gsap.to("#heroButtons", {
    opacity: 1,
    y: 0,
    duration: 1.5,
    delay: 9,
    ease: "power3.out",
  });

  // Profile image animation
  const profileTimeline = gsap.timeline({ delay: 0.15 });
  profileTimeline
    .fromTo(
      "#profileImage",
      {
        opacity: 0,
        x: 80,
        boxShadow: "0 0 0 rgba(94, 129, 172, 0)",
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power2.out",
      }
    )
    .to("#profileImage", {
      boxShadow: "0 0 30px rgba(94, 129, 172, 0.8)",
      duration: 0.5,
      ease: "power1.out",
    });
}

// Setup title animation with shuffling effect
function setupTitleAnimation(heroTitle) {
  const finalText = "Hi, I'm Alexander Safronenko";
  const characters = ".-"; // Dot and dash for shuffling
  const textArray = finalText.split("");

  // Initialize with random characters
  let currentText = "";
  for (let i = 0; i < finalText.length; i++) {
    currentText += finalText[i] === " " ? " " : characters.charAt(Math.floor(Math.random() * characters.length));
  }
  heroTitle.innerHTML = currentText;

  // Initialize subtitle with blinking cursor
  heroSubtitle.innerHTML = "<span class='cursor'>_</span>";

  // Setup cursor blinking
  setupCursorBlinking();

  // Track revealed positions
  let revealedPositions = new Array(textArray.length).fill(false);
  textArray.forEach((char, index) => {
    if (char === " ") revealedPositions[index] = true;
  });

  // Update title with random characters
  const updateTitleText = () => {
    heroTitle.innerHTML = textArray
      .map((char, index) => {
        return revealedPositions[index] ? char : characters.charAt(Math.floor(Math.random() * characters.length));
      })
      .join("");
  };

  // Start shuffling effect
  const shuffleInterval = setInterval(updateTitleText, 50);

  // Start revealing characters after initial shuffle
  setTimeout(() => {
    let currentPosition = 0;
    const timePerChar = 3500 / textArray.filter((char) => char !== " ").length;

    const revealNextChar = () => {
      // Find next unrevealed position
      while (currentPosition < textArray.length && revealedPositions[currentPosition]) {
        currentPosition++;
      }

      // Check if all characters are revealed
      if (currentPosition >= textArray.length) {
        clearInterval(revealInterval);
        heroTitle.innerHTML = finalText;

        // Start subtitle animation after title is revealed
        setTimeout(startSubtitleAnimation, 300);
        return;
      }

      // Reveal next character
      revealedPositions[currentPosition] = true;
      updateTitleText();
      currentPosition++;
    };

    const revealInterval = setInterval(revealNextChar, timePerChar);
  }, 500);
}

// Setup cursor blinking animation
function setupCursorBlinking() {
  let cursorVisible = true;
  setInterval(() => {
    cursorVisible = !cursorVisible;
    const cursor = document.querySelector(".cursor");
    if (cursor) {
      cursor.style.opacity = cursorVisible ? "1" : "0";
    }
  }, 500);
}

// Setup CSS for cursor
function setupCursorStyle() {
  const style = document.createElement("style");
  style.textContent = `
    .cursor {
      display: inline-block;
      font-weight: bold;
      animation: blink 1s infinite;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .currentTech {
      display: inline;
    }
  `;
  document.head.appendChild(style);
}

// Technology categories for subtitle animation
const techCategories = [
  {
    prefix: "I code in ",
    technologies: ["JavaScript", "TypeScript", "Python", "C#"],
  },
  {
    prefix: "I craft interfaces with ",
    technologies: ["Next.js", "React", "Redux", "Tailwind CSS", "Bootstrap", "jQuery", "Sass"],
  },
  {
    prefix: "I build back-end solutions with ",
    technologies: ["Node.js", "Express.js", "FastAPI"],
  },
  {
    prefix: "I leverage databases like ",
    technologies: ["PostgreSQL", "MongoDB", "MySQL", "SQLite"],
  },
  {
    prefix: "I version control through ",
    technologies: ["GitHub & GitLab"],
  },
];

// Subtitle animation with technology showcase
function startSubtitleAnimation() {
  let categoryIndex = 0;
  let techIndex = 0;
  let isTyping = true;
  let isShuffling = false;
  let charIndex = 0;
  let currentPrefix = techCategories[categoryIndex].prefix;
  let currentTech = techCategories[categoryIndex].technologies[techIndex];
  let fullText = {
    prefix: currentPrefix,
    tech: currentTech,
  };

  // Initialize subtitle
  heroSubtitle.innerHTML = "<span class='cursor'>_</span>";

  // Render text based on current state
  const renderFullText = (visibleCharCount = null) => {
    let prefixContent = fullText.prefix;
    let techContent = `<span class="currentTech">${fullText.tech}</span>`;

    if (visibleCharCount !== null) {
      const prefixLength = fullText.prefix.length;

      if (visibleCharCount <= prefixLength) {
        // Still typing prefix
        prefixContent = fullText.prefix.substring(0, visibleCharCount);
        techContent = "";
      } else {
        // Typing tech part
        const techCharsToShow = visibleCharCount - prefixLength;
        const techLength = fullText.tech.length;

        if (techCharsToShow < techLength) {
          techContent = `<span class="currentTech">${fullText.tech.substring(0, techCharsToShow)}</span>`;
        }
      }
    }

    return prefixContent + techContent;
  };

  // Get random character for shuffling
  const getRandomChar = () => ".-".charAt(Math.floor(Math.random() * 2));

  // Main animation loop
  const animate = () => {
    if (isTyping) {
      if (!isShuffling) {
        // Regular typing animation
        charIndex++;
        const totalLength = fullText.prefix.length + fullText.tech.length;

        if (charIndex <= totalLength) {
          // Still typing
          heroSubtitle.innerHTML = renderFullText(charIndex) + "<span class='cursor'>_</span>";
          setTimeout(animate, 30);
        } else {
          // Finished typing current tech
          setTimeout(() => {
            isShuffling = true;
            animate();
          }, 750);
        }
      } else {
        // Handle technology transition with shuffling
        const isLastTechInCategory = techIndex === techCategories[categoryIndex].technologies.length - 1;

        if (isLastTechInCategory) {
          // Move to next category
          isShuffling = false;
          isTyping = false;
          animate();
          return;
        }

        // Move to next tech in the same category
        techIndex++;
        const nextTech = techCategories[categoryIndex].technologies[techIndex];

        // Animation for shuffling between techs
        let shuffleFrame = 0;
        const totalShuffleFrames = 24;

        const performShuffleAnimation = () => {
          if (shuffleFrame < totalShuffleFrames) {
            // First half: shuffle current tech away
            if (shuffleFrame < totalShuffleFrames / 2) {
              const charsToKeep = currentTech.length - Math.floor((shuffleFrame / (totalShuffleFrames / 2)) * currentTech.length);

              let tempTech = "";
              for (let i = 0; i < currentTech.length; i++) {
                tempTech += i < charsToKeep ? currentTech[i] : getRandomChar();
              }

              heroSubtitle.innerHTML = fullText.prefix + `<span class="currentTech">${tempTech}</span>` + "<span class='cursor'>_</span>";
            }
            // Second half: shuffle in the next tech
            else {
              const charsToReveal = Math.floor(((shuffleFrame - totalShuffleFrames / 2) / (totalShuffleFrames / 2)) * nextTech.length);

              let tempTech = "";
              for (let i = 0; i < nextTech.length; i++) {
                tempTech += i < charsToReveal ? nextTech[i] : getRandomChar();
              }

              heroSubtitle.innerHTML = fullText.prefix + `<span class="currentTech">${tempTech}</span>` + "<span class='cursor'>_</span>";
            }

            shuffleFrame++;
            setTimeout(performShuffleAnimation, 50);
          } else {
            // Shuffling complete
            currentTech = nextTech;
            fullText = {
              prefix: currentPrefix,
              tech: currentTech,
            };

            heroSubtitle.innerHTML = fullText.prefix + `<span class="currentTech">${fullText.tech}</span>` + "<span class='cursor'>_</span>";

            // Continue with next tech
            isShuffling = false;
            setTimeout(animate, 750);
          }
        };

        performShuffleAnimation();
      }
    } else {
      // Deleting animation
      charIndex--;

      if (charIndex >= 1) {
        // Still deleting
        heroSubtitle.innerHTML = renderFullText(charIndex) + "<span class='cursor'>_</span>";
        setTimeout(animate, 30);
      } else {
        // Move to next category
        categoryIndex = (categoryIndex + 1) % techCategories.length;
        techIndex = 0;
        currentPrefix = techCategories[categoryIndex].prefix;
        currentTech = techCategories[categoryIndex].technologies[techIndex];
        fullText = {
          prefix: currentPrefix,
          tech: currentTech,
        };
        charIndex = 0;
        isTyping = true;

        // Pause before starting next category
        setTimeout(animate, 1000);
      }
    }
  };

  // Start the animation
  animate();
}
