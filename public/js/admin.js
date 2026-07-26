// admin.js – client‑side admin dashboard
(() => {
  const API = '/admin'; // base URL for admin routes
  const tokenKey = 'adminJwt';

  // ---------- Utilities ----------
  const qs = (s) => document.querySelector(s);
  const qsa = (s) => document.querySelectorAll(s);
  const show = (el) => el.classList.remove('hidden');
  const hide = (el) => el.classList.add('hidden');

  // ---------- Auth ----------
  const loginModal = qs('#loginModal');
  const loginForm = qs('#loginForm');
  const logoutBtn = qs('#logoutBtn');

  const requireAuth = async () => {
    const token = localStorage.getItem(tokenKey);
    if (!token) return false;
    // just check presence – server will reject if invalid
    return true;
  };

  const login = async (e) => {
    e.preventDefault();
    const data = new FormData(loginForm);
    const payload = { email: data.get('email'), password: data.get('password') };
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem(tokenKey, token);
      hide(loginModal);
      initDashboard();
    } else {
      alert('Invalid credentials');
    }
  };

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem(tokenKey);
    location.reload();
  });

  // ---------- UI Navigation ----------
  const tabs = qsa('.tab');
  const panels = qsa('.panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));
      tab.classList.add('active');
      qs(`#${tab.dataset.target}`).classList.add('active');
    });
  });

  // ---------- CRUD Helpers ----------
  const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
  });

  // ---- Projects ----
  const renderProjects = async () => {
    const list = qs('#projectsList');
    list.innerHTML = '<p>Loading…</p>';
    const res = await fetch(`${API}/projects`, { headers: authHeaders() });
    if (!res.ok) return (list.innerHTML = '<p>Failed to load projects.</p>');
    const projects = await res.json();
    if (!projects.length) return (list.innerHTML = '<p>No projects yet.</p>');
    list.innerHTML = '';
    projects.forEach((p) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <button class="btn edit" data-id="${p._id}">Edit</button>
        <button class="btn delete" data-id="${p._id}">Delete</button>
      `;
      list.appendChild(card);
    });
    list.querySelectorAll('.edit').forEach((b) =>
      b.addEventListener('click', () => openProjectModal(b.dataset.id))
    );
    list.querySelectorAll('.delete').forEach((b) =>
      b.addEventListener('click', () => deleteProject(b.dataset.id))
    );
  };

  const openProjectModal = async (id = null) => {
    const modal = qs('#crudModal');
    const content = qs('#crudContent');
    content.innerHTML = `
      <h2>${id ? 'Edit' : 'Add'} Project</h2>
      <form id="projectForm">
        <label>Title<input name="title" required /></label>
        <label>Description<textarea name="description" rows="3" required></textarea></label>
        <label>Image URL<input name="imageUrl" /></label>
        <label>Live URL<input name="liveUrl" /></label>
        <label>Repo URL<input name="repoUrl" /></label>
        <label>Tech Stack (comma‑separated)<input name="techStack" /></label>
        <button type="submit" class="btn submit">${id ? 'Update' : 'Create'}</button>
      </form>
    `;
    show(modal);
    if (id) {
      const res = await fetch(`${API}/projects/${id}`, { headers: authHeaders() });
      const proj = await res.json();
      const f = qs('#projectForm');
      Object.entries(proj).forEach(([k, v]) => {
        if (k === 'techStack' && Array.isArray(v)) v = v.join(', ');
        const el = f.querySelector(`[name="${k}"]`);
        if (el) el.value = v ?? '';
      });
    }
    qs('#projectForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const payload = {
        title: fd.get('title'),
        description: fd.get('description'),
        imageUrl: fd.get('imageUrl'),
        liveUrl: fd.get('liveUrl'),
        repoUrl: fd.get('repoUrl'),
        techStack: fd.get('techStack').split(',').map(s => s.trim()).filter(Boolean),
      };
      const method = id ? 'PUT' : 'POST';
      const url = id ? `${API}/projects/${id}` : `${API}/projects`;
      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        hide(modal);
        renderProjects();
      } else alert('Operation failed');
    });
  };

  const deleteProject = async (id) => {
    if (!confirm('Delete this project?')) return;
    const res = await fetch(`${API}/projects/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (res.ok) renderProjects(); else alert('Delete failed');
  };

  qs('#addProjectBtn').addEventListener('click', () => openProjectModal());

  // ---- Skills ----
  const renderSkills = async () => {
    const list = qs('#skillsList');
    list.innerHTML = '<p>Loading…</p>';
    const res = await fetch(`${API}/skills`, { headers: authHeaders() });
    if (!res.ok) return (list.innerHTML = '<p>Failed to load skills.</p>');
    const skills = await res.json();
    if (!skills.length) return (list.innerHTML = '<p>No skills yet.</p>');
    list.innerHTML = '';
    skills.forEach((s) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${s.name}</h3>
        <p>Proficiency: ${s.proficiency}%</p>
        <button class="btn edit" data-id="${s._id}">Edit</button>
        <button class="btn delete" data-id="${s._id}">Delete</button>
      `;
      list.appendChild(card);
    });
    list.querySelectorAll('.edit').forEach((b) =>
      b.addEventListener('click', () => openSkillModal(b.dataset.id))
    );
    list.querySelectorAll('.delete').forEach((b) =>
      b.addEventListener('click', () => deleteSkill(b.dataset.id))
    );
  };

  const openSkillModal = async (id = null) => {
    const modal = qs('#crudModal');
    const content = qs('#crudContent');
    content.innerHTML = `
      <h2>${id ? 'Edit' : 'Add'} Skill</h2>
      <form id="skillForm">
        <label>Name<input name="name" required /></label>
        <label>Proficiency (0‑100)<input name="proficiency" type="number" min="0" max="100" required /></label>
        <button type="submit" class="btn submit">${id ? 'Update' : 'Create'}</button>
      </form>
    `;
    show(modal);
    if (id) {
      const res = await fetch(`${API}/skills/${id}`, { headers: authHeaders() });
      const skill = await res.json();
      const f = qs('#skillForm');
      f.name.value = skill.name;
      f.proficiency.value = skill.proficiency;
    }
    qs('#skillForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const payload = { name: fd.get('name'), proficiency: Number(fd.get('proficiency')) };
      const method = id ? 'PUT' : 'POST';
      const url = id ? `${API}/skills/${id}` : `${API}/skills`;
      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        hide(modal);
        renderSkills();
      } else alert('Operation failed');
    });
  };

  const deleteSkill = async (id) => {
    if (!confirm('Delete this skill?')) return;
    const res = await fetch(`${API}/skills/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (res.ok) renderSkills(); else alert('Delete failed');
  };

  qs('#addSkillBtn').addEventListener('click', () => openSkillModal());

  // ---- Contacts ----
  const renderContacts = async () => {
    const list = qs('#contactsList');
    list.innerHTML = '<p>Loading…</p>';
    const res = await fetch(`${API}/contacts`, { headers: authHeaders() });
    if (!res.ok) return (list.innerHTML = '<p>Failed to load contacts.</p>');
    const contacts = await res.json();
    if (!contacts.length) return (list.innerHTML = '<p>No messages.</p>');
    list.innerHTML = '';
    contacts.forEach((c) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${c.name} – ${c.email}</h3>
        <p><strong>Subject:</strong> ${c.subject || '(no subject)'}</p>
        <p>${c.message}</p>
        <button class="btn delete" data-id="${c._id}">Delete</button>
      `;
      list.appendChild(card);
    });
    list.querySelectorAll('.delete').forEach((b) =>
      b.addEventListener('click', () => deleteContact(b.dataset.id))
    );
  };

  const deleteContact = async (id) => {
    if (!confirm('Delete this message?')) return;
    const res = await fetch(`${API}/contacts/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (res.ok) renderContacts(); else alert('Delete failed');
  };

  // ---------- Init ----------
  const initDashboard = async () => {
    hide(loginModal);
    await Promise.all([renderProjects(), renderSkills(), renderContacts()]);
  };

  (async () => {
    if (await requireAuth()) {
      initDashboard();
    } else {
      show(loginModal);
    }
    loginForm.addEventListener('submit', login);
  })();
})();
