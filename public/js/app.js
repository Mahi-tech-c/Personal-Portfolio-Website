// public/js/app.js
/*
  Frontend logic:
  - Fetch portfolio data (projects + skills) and render cards.
  - Hamburger menu toggle for mobile.
  - Contact form submission with client‑side validation and status feedback.
*/

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const skillsContainer = document.getElementById('skills-container');
  const projectsContainer = document.getElementById('projects-container');
  const navLinks = document.getElementById('nav-links');
  const hamburger = document.getElementById('hamburger');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  // Helper to create a card element
  const createCard = (title, description, imageUrl, linkUrl) => {
    const card = document.createElement('div');
    card.className = 'card';
    if (imageUrl) {
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = title;
      card.appendChild(img);
    }
    const h3 = document.createElement('h3');
    h3.textContent = title;
    card.appendChild(h3);
    if (description) {
      const p = document.createElement('p');
      p.textContent = description;
      card.appendChild(p);
    }
    if (linkUrl) {
      const a = document.createElement('a');
      a.href = linkUrl;
      a.textContent = 'Live Demo';
      a.target = '_blank';
      a.style.color = '#fff';
      a.style.textDecoration = 'underline';
      card.appendChild(a);
    }
    return card;
  };

  // Fetch and render portfolio data
  const loadPortfolio = async () => {
    try {
      const res = await fetch('/api/portfolio');
      if (!res.ok) throw new Error('Failed to load portfolio');
      const data = await res.json();
      const { projects, skills } = data;

      // Render skills
      skills.forEach((skill) => {
        const card = createCard(skill.name, `Proficiency: ${skill.proficiency || 'N/A'}%`);
        skillsContainer.appendChild(card);
      });

      // Render projects
      projects.forEach((proj) => {
        const card = createCard(
          proj.title,
          proj.description,
          proj.imageUrl,
          proj.liveUrl || proj.repoUrl
        );
        projectsContainer.appendChild(card);
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Hamburger menu toggle
  const toggleMenu = () => {
    navLinks.classList.toggle('show');
  };

  hamburger.addEventListener('click', toggleMenu);

  // Contact form handling
  const submitContact = async (e) => {
    e.preventDefault();
    formStatus.textContent = '';
    const formData = new FormData(contactForm);
    const payload = {
      name: formData.get('name').trim(),
      email: formData.get('email').trim(),
      subject: formData.get('subject').trim(),
      message: formData.get('message').trim(),
    };

    // Simple client‑side validation
    if (!payload.name || !payload.email || !payload.message) {
      formStatus.textContent = 'Please fill in all required fields.';
      formStatus.style.color = '#ff8080';
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        formStatus.textContent = result.message || 'Message sent!';
        formStatus.style.color = '#80ff80';
        contactForm.reset();
      } else {
        const errMsg = result.message || result.errors?.map(e => e.msg).join(', ') || 'Error submitting form';
        formStatus.textContent = errMsg;
        formStatus.style.color = '#ff8080';
      }
    } catch (err) {
      console.error(err);
      formStatus.textContent = 'Network error. Please try again later.';
      formStatus.style.color = '#ff8080';
    }
  };

  contactForm.addEventListener('submit', submitContact);

  // Initial load
  loadPortfolio();
});
