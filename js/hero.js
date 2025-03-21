document.addEventListener("DOMContentLoaded", () => {
  // Animation timing variables in milliseconds
  const TIMING = {
    imageRevealDuration: 500,
    heroTitleDuration: 2000,
    heroButtonsDelay: 9000,
    profileImageDelay: 150,
    shuffleDuration: 500,
    revealDuration: 3500,
    cursorBlinkRate: 500,
    titleCharRevealRate: 50,
    subtitleStartDelay: 1000,
    typingSpeed: 30,
    pauseBeforeShuffle: 750,
    pauseBeforeNextTech: 750,
    pauseBeforeNextCategory: 1000,
    deletingSpeed: 30,
    shuffleFrameRate: 50,
  };

  // Hero Section Animations
  gsap.to("#heroTitle", {
    opacity: 1,
    y: 0,
    duration: TIMING.heroTitleDuration / 1000,
    ease: "power3.out",
  });

  gsap.to("#heroButtons", {
    opacity: 1,
    y: 0,
    duration: TIMING.heroTitleDuration / 1000,
    delay: TIMING.heroButtonsDelay / 1000,
    ease: "power3.out",
  });

  const profileTimeline = gsap.timeline({ delay: TIMING.profileImageDelay / 1000 });
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
        duration: TIMING.imageRevealDuration / 1000,
        ease: "power2.out",
      }
    )
    .to("#profileImage", {
      boxShadow: "0 0 30px rgba(94, 129, 172, 0.8)",
      duration: TIMING.imageRevealDuration / 1000,
      ease: "power1.out",
    });

  // Text shuffling effect for hero title with left-to-right reveal
  const heroTitle = document.getElementById("heroTitle");
  const heroSubtitle = document.getElementById("heroSubtitle");
  const finalText = "Hi, I'm Alexander Safronenko";
  const characters = ".-"; // Using dots and dashes for shuffling

  // Initialize heroTitle with random characters
  let currentText = "";
  for (let i = 0; i < finalText.length; i++) {
    if (finalText[i] === " ") {
      currentText += " ";
    } else {
      currentText += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  }
  heroTitle.innerHTML = currentText;

  // Initialize heroSubtitle with just a blinking cursor
  heroSubtitle.innerHTML = "<span class='cursor'>_</span>";

  // Setup cursor blinking
  let cursorVisible = true;
  const cursorBlinkInterval = setInterval(() => {
    cursorVisible = !cursorVisible;
    const cursor = document.querySelector(".cursor");
    if (cursor) {
      cursor.style.opacity = cursorVisible ? "1" : "0";
    }
  }, TIMING.cursorBlinkRate);

  // Function to get a random character for title shuffling
  const getRandomChar = () => characters.charAt(Math.floor(Math.random() * characters.length));

  // Split text into individual characters
  const textArray = finalText.split("");

  // Create an array to track which positions have been revealed
  let revealedPositions = new Array(textArray.length).fill(false);

  // For spaces, mark them as already revealed
  textArray.forEach((char, index) => {
    if (char === " ") {
      revealedPositions[index] = true;
    }
  });

  // Function to update the displayed text for hero title
  const updateTitleText = () => {
    let result = textArray
      .map((char, index) => {
        // If this position has been revealed, show the actual character
        if (revealedPositions[index]) {
          return char;
        }
        // Otherwise show a random character
        return getRandomChar();
      })
      .join("");

    heroTitle.innerHTML = result;
  };

  // Update the title text with random characters on a fast interval
  const shuffleInterval = setInterval(updateTitleText, TIMING.titleCharRevealRate);

  // After the initial shuffling period, start revealing characters from left to right
  setTimeout(() => {
    let currentPosition = 0;

    // Calculate time between revealing each character
    const timePerChar = TIMING.revealDuration / textArray.filter((char) => char !== " ").length;

    // Function to reveal the next character
    const revealNextChar = () => {
      // Find the next unrevealed position
      while (currentPosition < textArray.length && revealedPositions[currentPosition]) {
        currentPosition++;
      }

      // If all characters are revealed, clear the interval
      if (currentPosition >= textArray.length) {
        clearInterval(revealInterval);
        heroTitle.innerHTML = finalText; // Ensure the final text is displayed correctly

        // Start typing the subtitle once the title is fully revealed
        setTimeout(startSubtitleAnimation, TIMING.subtitleStartDelay);
        return;
      }

      // Reveal the character at the current position
      revealedPositions[currentPosition] = true;

      // Update the display
      updateTitleText();

      // Move to the next position
      currentPosition++;
    };

    // Start revealing characters at regular intervals
    const revealInterval = setInterval(revealNextChar, timePerChar);
  }, TIMING.shuffleDuration);

  // Define the technology categories
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
      technologies: ["PostgreSQL", "MongoDB", "MySQL"],
    },
    {
      prefix: "I version control through ",
      technologies: ["GitHub & GitLab"],
    },
    // {
    //   prefix: "I optimize and deploy with ",
    //   technologies: ["Docker", "CI/CD (Jenkins)"],
    // },
  ];

  // Subtitle animation function
  const startSubtitleAnimation = () => {
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

    // Initialize
    heroSubtitle.innerHTML = "<span class='cursor'>_</span>";

    // Function to render fullText based on current state
    const renderFullText = (visibleCharCount = null) => {
      let prefixContent = fullText.prefix;
      let techContent = `<span class="currentTech">${fullText.tech}</span>`;

      if (visibleCharCount !== null) {
        // Calculate how much of the prefix to show
        const prefixLength = fullText.prefix.length;

        if (visibleCharCount <= prefixLength) {
          // still typing the prefix
          prefixContent = fullText.prefix.substring(0, visibleCharCount);
          techContent = "";
        } else {
          // typing the tech part
          const techCharsToShow = visibleCharCount - prefixLength;
          const techLength = fullText.tech.length;

          if (techCharsToShow < techLength) {
            // Only show part of the tech
            techContent = `<span class="currentTech">${fullText.tech.substring(0, techCharsToShow)}</span>`;
          }
        }
      }

      return prefixContent + techContent;
    };

    // Main animation loop
    const animate = () => {
      if (isTyping) {
        if (!isShuffling) {
          // Regular typing animation
          charIndex++;
          const totalLength = fullText.prefix.length + fullText.tech.length;

          if (charIndex <= totalLength) {
            // Still typing the full sentence
            heroSubtitle.innerHTML = renderFullText(charIndex) + "<span class='cursor'>_</span>";
            setTimeout(animate, TIMING.typingSpeed); // Typing speed
          } else {
            // Finished typing current technology
            setTimeout(() => {
              // Start shuffling out current tech
              isShuffling = true;
              animate();
            }, TIMING.pauseBeforeShuffle); // Pause before starting to shuffle
          }
        } else {
          // Handle technology transition with shuffling
          // Check if this is the last tech in the category
          const isLastTechInCategory = techIndex === techCategories[categoryIndex].technologies.length - 1;

          // If it's the last tech in category, prepare to move to next category
          if (isLastTechInCategory) {
            // Set up for next category
            isShuffling = false;
            isTyping = false;
            animate(); // Start deletion process immediately
            return;
          }

          // Move to next tech in the same category
          techIndex++;
          const nextTech = techCategories[categoryIndex].technologies[techIndex];

          // Animation for shuffling between techs
          let shuffleFrame = 0;
          const totalShuffleFrames = 24; // Increased frames for smoother transition

          const performShuffleAnimation = () => {
            if (shuffleFrame < totalShuffleFrames) {
              // During first half, shuffle current tech away
              if (shuffleFrame < totalShuffleFrames / 2) {
                // Gradually replace characters with random ones
                const charsToKeep = currentTech.length - Math.floor((shuffleFrame / (totalShuffleFrames / 2)) * currentTech.length);

                let tempTech = "";
                for (let i = 0; i < currentTech.length; i++) {
                  if (i < charsToKeep) {
                    tempTech += currentTech[i];
                  } else {
                    tempTech += getRandomChar();
                  }
                }

                heroSubtitle.innerHTML = fullText.prefix + `<span class="currentTech">${tempTech}</span>` + "<span class='cursor'>_</span>";
              }
              // During second half, shuffle in the next tech
              else {
                // Gradually reveal characters of the next tech
                const charsToReveal = Math.floor(((shuffleFrame - totalShuffleFrames / 2) / (totalShuffleFrames / 2)) * nextTech.length);

                let tempTech = "";
                for (let i = 0; i < nextTech.length; i++) {
                  if (i < charsToReveal) {
                    tempTech += nextTech[i];
                  } else {
                    tempTech += getRandomChar();
                  }
                }

                heroSubtitle.innerHTML = fullText.prefix + `<span class="currentTech">${tempTech}</span>` + "<span class='cursor'>_</span>";
              }

              shuffleFrame++;
              setTimeout(performShuffleAnimation, TIMING.shuffleFrameRate);
            } else {
              // Shuffling complete, make sure the next tech is fully visible
              currentTech = nextTech;
              fullText = {
                prefix: currentPrefix,
                tech: currentTech,
              };

              heroSubtitle.innerHTML = fullText.prefix + `<span class="currentTech">${fullText.tech}</span>` + "<span class='cursor'>_</span>";

              // Continue with next tech in same category
              isShuffling = false;
              setTimeout(animate, TIMING.pauseBeforeNextTech); // Pause before next tech shuffle
            }
          };

          performShuffleAnimation();
        }
      } else {
        // Deleting animation
        charIndex--;
        const totalLength = fullText.prefix.length + fullText.tech.length;

        if (charIndex >= 1) {
          // Only delete until the first character
          heroSubtitle.innerHTML = renderFullText(charIndex) + "<span class='cursor'>_</span>";
          setTimeout(animate, TIMING.deletingSpeed); // Deleting speed (slightly faster than typing)
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
          charIndex = 0; // Reset character index for typing
          isTyping = true;

          // Pause before starting next category
          setTimeout(animate, TIMING.pauseBeforeNextCategory);
        }
      }
    };

    // Start the animation
    animate();
  };

  // Add CSS for cursor blinking
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
});
