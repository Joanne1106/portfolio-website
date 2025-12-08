// ==================== TAB SWITCHING ====================
function showContent(tabId, btn) {
    document.querySelectorAll('.tab-pane').forEach(tab => tab.classList.add('d-none'));
    document.getElementById(tabId).classList.remove('d-none');

    document.querySelectorAll('.btn-portfolio-custom').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// ==================== FILTER PROJECTS (OPTIONAL) ====================
function filterProjects(category, event) {
    const cards = document.querySelectorAll('.project-card');
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ==================== SHOW PROJECT MODAL ====================
function showProject(event, title, description, imageUrl) {
    event.preventDefault();

    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDescription").textContent = description;
    document.getElementById("modalImage").src = imageUrl;
    document.getElementById("modalLink").href = event.currentTarget.href;

    let modal = new bootstrap.Modal(document.getElementById('projectModal'));
    modal.show();
}

// ==================== SHOW CERTIFICATE MODAL ====================
function showCertificate(title, imageSrc) {
    document.getElementById('certificateModalLabel').innerText = title;
    document.getElementById('certificateImage').src = imageSrc;
}

// ==================== SHOW AWARD MODAL ====================
function showAward(title, imgSrc) {
  // Set the title
  document.getElementById('awardModalLabel').innerText = title;
  
  // Set the image
  const awardImg = document.getElementById('awardImage');
  awardImg.src = imgSrc;

  // Show the modal programmatically (Bootstrap 5)
  const awardModal = new bootstrap.Modal(document.getElementById('awardModal'));
  awardModal.show();
}


// ==================== FADE-IN ON SCROLL ====================
const faders = document.querySelectorAll('.fade-up');
const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

// ==================== JS to trigger fade-in animation on scroll for projects ====================
faders.forEach(fader => appearOnScroll.observe(fader));

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".fade-slide-up");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section.classList.add("show");
            }
        });
    });
    observer.observe(section);
});

// ==================== NAVBAR SCROLL FOR HOME.HTML====================
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".home-custom-navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// ==================== NAVBAR SCROLL FOR ABOUT, PORTFOLIO & CONTACT.HTML====================
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".custom-navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// ==================== Detect when skill cards are visible on screen ======================
document.addEventListener("DOMContentLoaded", () => {
  const navHome = document.querySelector('a[href="#home"], a[href="index.html#home"]');
  const navContact = document.querySelector('a[href="#contact"], a[href="index.html#contact"]');
  const contactSection = document.getElementById("contact");

  // Function: Update active links based on scroll position
  function updateActive() {
    const contactTop = contactSection.offsetTop - 150; // adjust for navbar height

    // If before contact section → HOME active
    if (window.scrollY < contactTop) {
      navHome.classList.add("active");
      navContact.classList.remove("active");
    }
    // If contact section visible → CONTACT active
    else {
      navHome.classList.remove("active");
      navContact.classList.add("active");
    }
  }

  updateActive();
  window.addEventListener("scroll", updateActive);

  // Smooth scroll override for homepage
  const links = document.querySelectorAll('.navbar-nav .nav-link');
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // Only intercept if we are on index.html
      if ((window.location.pathname.endsWith("index.html") || window.location.pathname === "/") &&
          href.startsWith("index.html#")) {

        e.preventDefault();
        const targetId = href.split("#")[1];
        const target = document.getElementById(targetId);

        target?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});


// ========================== TITLE ==========================================
const roles = ["Software Developer", "UI/UX Designer"];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;
const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetweenRoles = 2000;
const roleElement = document.getElementById("role");

function type() {
  const currentRole = roles[roleIndex];
  
  if (!deleting) {
    roleElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    
    if (charIndex === currentRole.length) {
      deleting = true;
      setTimeout(type, delayBetweenRoles);
    } else {
      setTimeout(type, typingSpeed);
    }
  } else {
    roleElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(type, erasingSpeed);
    }
  }
}

document.addEventListener("DOMContentLoaded", type);

// ========================= PORTFOLIO FILTER ===============================
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filterValue = button.getAttribute("data-filter");

        // Remove active state from all buttons
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        portfolioItems.forEach(item => {
            const category = item.getAttribute("data-category");

            if (filterValue === "all" || category === filterValue) {
                item.style.display = "block";
                item.classList.add("fade-in-up");
            } else {
                item.style.display = "none";
                item.classList.remove("fade-in-up");
            }
        });
    });
});

// ========================= SKILLS FILTER ===============================
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".skills-filter-btn");
  const skillCards = document.querySelectorAll(".skill-card");

  const defaultCategory = "Front-end";

  // Set default active button
  filterButtons.forEach(btn => {
    if (btn.dataset.category === defaultCategory) {
      btn.classList.add("active");
    }
  });

  // Filter function (keeps flex display!)
  function filterSkills(category) {
    skillCards.forEach(card => {
      if (card.dataset.category === category) {
        card.style.display = "flex";   // important!
      } else {
        card.style.display = "none";
      }
    });
  }

  // Initial filter
  filterSkills(defaultCategory);

  // Button click events
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.category;
      filterSkills(category);
    });
  });
});















