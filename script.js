// --- Project Data ---

const projectsData = {
  'omnifood': {
    title: 'Omnifood webapp',
    description: 'A web app that helps users discover and eat healthy food.',
    features: ['Browse a catalog of healthy meals', 'Personalized meal recommendations', 'Responsive design'],
    technologies: 'HTML, CSS, JavaScript',
    githubLink: 'https://github.com/your-username/omnifood',
    demoLink: 'https://omi-food.netlify.app/',
    screenshot: 'images/project-1.png'
  },
  'budget-ti': {
    title: 'Budget-ti',
    description: 'A budgeting app that helps track expenses and savings.',
    features: ['Track income and expenses', 'Set saving goals', 'Generate reports'],
    technologies: 'HTNL, CSS, Node.js, MongoDB',
    githubLink: 'https://github.com/your-username/budget-ti',
    demoLink: 'https://budget-ti.netlify.app/',
    screenshot: 'images/project-2.png'
  },
  'dice-game': {
    title: 'Dice Game',
    description: 'A browser-based two-player dice rolling game.',
    features: ['Two-player mode', 'Automatic scoring', 'First to 100 wins'],
    technologies: 'HTML, CSS, JavaScript',
    githubLink: 'https://github.com/your-username/dice-game',
    demoLink: '#',
    screenshot: 'images/project-3.png'
  },
  'exclusive': {
    title: 'Exclusive',
    description: 'An e-commerce website with modern design and functionality.',
    features: ['User accounts and authentication', 'Shopping cart', 'Checkout with payment'],
    technologies: 'React, Node.js, MongoDB, Typescript,',
    githubLink: 'https://github.com/your-username/exclusive',
    demoLink: 'https://exclusiveng.netlify.app/',
    screenshot: 'images/excluzive.ng.png'
  }
};

// --- Load Project Details ---
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  const project = projectsData[projectId];

  if (project) {
    document.getElementById('project-title-tag').textContent = `${project.title} - Project Details`;
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-description').textContent = project.description;
    document.getElementById('technologies-used').textContent = project.technologies;
    document.getElementById('live-demo-link').href = project.demoLink;
    document.getElementById('github-link').href = project.githubLink;
    document.getElementById('project-screenshot').src = project.screenshot;

    const featuresList = document.getElementById('key-features-list');
    featuresList.innerHTML = '';
    project.features.forEach(f => {
      const li = document.createElement('li');
      li.textContent = f;
      featuresList.appendChild(li);
    });
  } else {
    document.getElementById('project-title').textContent = 'Project Not Found';
    document.getElementById('project-description').textContent = 'The requested project could not be found.';
  }
});

// JavaScript for mobile menu toggle
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");

// Toggle mobile menu visibility
mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Get all navigation links
const navLinks = document.querySelectorAll(".nav-link");

// Add click listeners to navigation links for smooth scrolling
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default anchor link behavior
    const targetId = link.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile menu if open after clicking a link
    if (!mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
    }
  });
});

// --- Typing Animation JavaScript ---
const animatedTextElement = document.getElementById("animated-text");

const phrasesToAnimate = [
  "Web Developer",
  "Backend Dev",
  "Full Stack Dev",
  "Gamer",  
].map(phrase => phrase.replace(/\s/g, '\u00A0'))

const typingSpeed = 100; // milliseconds per character
const pauseAfterTyping = 1000; // milliseconds to pause after typing a phrase
const deleteSpeed = 50; // milliseconds per character for deleting
const delayBeforeNextPhrase = 500; // milliseconds before typing the next phrase
const constantPrefix = "I Am A "; // The constant text prefix

/**
 * Simulates typing text into an HTML element with a constant prefix.
 * @param {HTMLElement} element - The element to type into.
 * @param {string} text - The text to type (after the prefix).
 * @param {number} speed - Typing speed in milliseconds per character.
 * @param {string} prefix - The constant text that should remain.
 * @returns {Promise<void>} A promise that resolves when typing is complete.
 */
function typeWriter(element, text, speed, prefix) {
  return new Promise((resolve) => {
    let i = 0;
    element.textContent = prefix; // Start with the constant prefix
    element.classList.add("typing-cursor"); // Add cursor class

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        // Keep cursor for a moment before starting next animation or removing
        setTimeout(() => {
          element.classList.remove("typing-cursor");
          resolve(); // Resolve the promise
        }, pauseAfterTyping);
      }
    }
    type();
  });
}

/**
 * Simulates deleting text from an HTML element, preserving a constant prefix.
 * @param {HTMLElement} element - The element to delete from.
 * @param {number} speed - Deleting speed in milliseconds per character.
 * @param {string} prefix - The constant text that should remain.
 * @returns {Promise<void>} A promise that resolves when deleting is complete.
 */
function deleteWriter(element, speed, prefix) {
  return new Promise((resolve) => {
    let currentText = element.textContent;
    // Only delete the part after the prefix
    let deletableText = currentText.substring(prefix.length);
    let i = deletableText.length - 1;
    element.classList.add("typing-cursor");

    function del() {
      if (i >= 0) {
        element.textContent = prefix + deletableText.substring(0, i);
        i--;
        setTimeout(del, speed);
      } else {
        element.classList.remove("typing-cursor");
        resolve();
      }
    }
    del();
  });
}

// Function to animate multiple phrases sequentially (type and delete)
async function animateMultiplePhrases() {
  // Check if the animated text element exists and is visible
  if (!animatedTextElement) {
    return;
  }

  let phraseIndex = 0;
  // This loop will run indefinitely
  while (true) {
    const currentPhrase = phrasesToAnimate[phraseIndex];

    // Type the current phrase after the prefix
    await typeWriter(
      animatedTextElement,
      currentPhrase,
      typingSpeed,
      constantPrefix
    );
    await new Promise((resolve) => setTimeout(resolve, pauseAfterTyping)); // Pause after typing

    // Delete the current phrase (leaving the prefix)
    await deleteWriter(animatedTextElement, deleteSpeed, constantPrefix);
    await new Promise((resolve) => setTimeout(resolve, delayBeforeNextPhrase)); // Pause after deleting

    phraseIndex = (phraseIndex + 1) % phrasesToAnimate.length; // Move to the next phrase, loop back to start if at end
  }
}

// On page load, handle initial hash and start animations
window.onload = () => {
  const initialHash = window.location.hash;
  if (initialHash) {
    const targetElement = document.querySelector(initialHash);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }
  // Start typing animation
  animateMultiplePhrases();

  // Initialize ScrollReveal for all page sections
  ScrollReveal().reveal(".page-section", {
    distance: "50px",
    duration: 1000,
    easing: "ease-in-out",
    origin: "bottom",
    reset: false, // Only animate once as they come into view
  });

  // Intersection Observer for skill bars to animate their width
  const skillBars = document.querySelectorAll(".skill-bar");

  const observerOptions = {
    root: null, // viewport
    rootMargin: "0px",
    threshold: 0.5, // Trigger when 50% of the item is visible
  };

  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillBar = entry.target;
        const percentage = skillBar.getAttribute("data-percentage");
        skillBar.style.width = percentage + "%";
        observer.unobserve(skillBar); // Stop observing once animated
      }
    });
  }, observerOptions);

  skillBars.forEach((bar) => {
    skillObserver.observe(bar);
  });
};

// // --- Contact Form JavaScript ---
// const contactForm = document.getElementById("contactForm");
// const contactName = document.getElementById("contactName");
// const contactEmail = document.getElementById("contactEmail");
// const contactMessage = document.getElementById("contactMessage");
// const formMessage = document.getElementById("formMessage");

// // Function to display messages to the user
// function displayMessage(message, isError = false) {
//   formMessage.textContent = message;
//   formMessage.style.backgroundColor = isError
//     ? "#dc2626"
//     : "#10b981"; /* red-600 or green-500 */
//   formMessage.style.borderColor = isError
//     ? "#b91c1c"
//     : "#047857"; /* red-700 or green-700 */
//   formMessage.classList.add("show");
//   setTimeout(() => {
//     formMessage.classList.remove("show");
//   }, 5000); // Hide message after 5 seconds
// }

// contactForm.addEventListener("submit", function (event) {
//   event.preventDefault(); // Prevent the default form submission

//   const name = contactName.value.trim();
//   const email = contactEmail.value.trim();
//   const message = contactMessage.value.trim();

//   // Basic validation
//   if (!name || !email || !message) {
//     displayMessage("Please fill in all fields.", true);
//     return;
//   }

//   // Simple email format validation (more robust validation requires regex)
//   if (!email.includes("@") || !email.includes(".")) {
//     displayMessage("Please enter a valid email address.", true);
//     return;
//   }

//   // Construct the mailto link
//   const recipientEmail = "soldevacs@gmail.com"; // IMPORTANT: Replace with your actual Gmail address
//   const subject = encodeURIComponent(`Message from Portfolio: ${name}`);
//   const body = encodeURIComponent(
//     `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
//   );

//   const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

//   // Attempt to open the email client
//   try {
//     window.location.href = mailtoLink;
//     displayMessage("Opening your email client...");
//     // Clear the form after a short delay, assuming email client opened successfully
//     setTimeout(() => {
//       contactName.value = "";
//       contactEmail.value = "";
//       contactMessage.value = "";
//     }, 1000);
//   } catch (error) {
//     console.error("Failed to open email client:", error);
//     displayMessage(
//       "Could not open email client. Please copy my email address: " +
//         recipientEmail,
//       true
//     );
//   }
// });


  // This is your complete script.js file.
// It contains both the data and the logic.


