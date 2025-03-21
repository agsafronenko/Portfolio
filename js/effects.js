// // Mouse movement effect for about square
// const aboutSquare = document.getElementById("aboutSquare");
// if (aboutSquare) {
//   document.addEventListener("mousemove", (e) => {
//     const { clientX, clientY } = e;
//     const windowWidth = window.innerWidth;
//     const windowHeight = window.innerHeight;

//     const moveX = (clientX - windowWidth / 2) / 50;
//     const moveY = (clientY - windowHeight / 2) / 50;

//     gsap.to("#aboutSquare", {
//       x: moveX,
//       y: moveY,
//       duration: 0.8,
//       ease: "power1.out",
//     });

//     // gsap.to("#aboutSquare::before", {
//     //   x: moveX * 1.5,
//     //   y: moveY * 1.5,
//     //   duration: 0.5,
//     //   ease: "power1.out",
//     // });
//     gsap.to("#aboutSquare", {
//       "--pseudo-x": `${moveX * 1.5}px`,
//       "--pseudo-y": `${moveY * 1.5}px`,
//       duration: 0.5,
//       ease: "power1.out",
//     });
//   });
// }

// // Add particle background effect
// const createParticle = () => {
//   const particle = document.createElement("div");
//   particle.style.position = "absolute";
//   particle.style.width = "3px";
//   particle.style.height = "3px";
//   particle.style.background = "rgba(94, 129, 172, 0.5)";
//   particle.style.borderRadius = "50%";
//   particle.style.pointerEvents = "none";

//   // Random position
//   const x = Math.random() * window.innerWidth;
//   const y = Math.random() * window.innerHeight;
//   particle.style.left = `${x}px`;
//   particle.style.top = `${y}px`;

//   // Random size
//   const size = Math.random() * 2 + 1;
//   particle.style.width = `${size}px`;
//   particle.style.height = `${size}px`;

//   // Add to body
//   document.body.appendChild(particle);

//   // Animate
//   gsap.to(particle, {
//     y: y + 100,
//     x: x + (Math.random() * 100 - 50),
//     opacity: 0,
//     duration: Math.random() * 5 + 3,
//     ease: "power1.out",
//     onComplete: () => {
//       document.body.removeChild(particle);
//       createParticle();
//     },
//   });
// };

// // Create initial particles
// for (let i = 0; i < 20; i++) {
//   setTimeout(() => {
//     createParticle();
//   }, i * 200);
// }
