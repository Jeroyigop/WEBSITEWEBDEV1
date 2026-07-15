let portfolio = null;

async function loadPortfolioData() {
    const response = await fetch("data.json");
    portfolio = await response.json();
    renderPortfolio();
}

function renderPortfolio() {
    renderNavigation();
    renderHero();
    renderAbout();
    renderSkills();
    renderProjects();
    renderEducation();
    renderContact();
    renderFooter();
}

function renderNavigation() {
    const navLinks = document.getElementById("navLinks");
    navLinks.innerHTML = "";

    portfolio.navigation.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${item.href}">${item.label}</a>`;
        navLinks.appendChild(li);
    });
}

function renderHero() {
    const hero = document.querySelector("#home.hero");
    hero.innerHTML = `
        <img src="${portfolio.hero.image}" alt="Profile Picture" class="profile-img">
        <h1>${portfolio.hero.name}</h1>
        <h3>${portfolio.hero.subtitle}</h3>
        <p>${portfolio.hero.description}</p>
        <a href="${portfolio.hero.buttonHref}" class="btn">${portfolio.hero.buttonText}</a>
    `;
}

function renderAbout() {
    const aboutSection = document.getElementById("about");
    const title = aboutSection.querySelector("h2");
    const paragraph = aboutSection.querySelector("p");

    title.textContent = portfolio.about.title;
    paragraph.textContent = portfolio.about.text;
}

function renderSkills() {
    const skillsContainer = document.getElementById("skillsContainer");
    skillsContainer.innerHTML = "";

    portfolio.skills.forEach(skill => {
        const card = document.createElement("div");
        card.className = "skill-card";

        card.innerHTML = `
            <h3>${skill.name}</h3>
            <div class="progress">
                <div class="progress-bar" style="width:${skill.level}%;"></div>
            </div>
            <p>${skill.level}%</p>
        `;

        skillsContainer.appendChild(card);
    });
}

function renderProjects() {
    const projectsContainer = document.getElementById("projectsContainer");
    projectsContainer.innerHTML = "";

    portfolio.projects.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" class="btn">View Project</a>
        `;

        projectsContainer.appendChild(card);
    });
}

function renderEducation() {
    const educationContainer = document.getElementById("educationContainer");
    educationContainer.innerHTML = "";

    portfolio.education.forEach(item => {
        const card = document.createElement("div");
        card.className = "education-card";

        card.innerHTML = `
            <h3>${item.year}</h3>
            <p>${item.school}</p>
        `;

        educationContainer.appendChild(card);
    });
}

function renderContact() {
    const contactSection = document.getElementById("contact");
    const title = contactSection.querySelector("h2");
    const infoContainer = contactSection.querySelector(".contact-info");
    const form = contactSection.querySelector("form");

    title.textContent = portfolio.contact.title;
    infoContainer.innerHTML = portfolio.contact.info.map(item => `
        <p><i class="${item.icon}"></i> ${item.value}</p>
    `).join("");

    form.innerHTML = `
        <input type="text" placeholder="${portfolio.contact.form.namePlaceholder}" required>
        <input type="email" placeholder="${portfolio.contact.form.emailPlaceholder}" required>
        <textarea rows="6" placeholder="${portfolio.contact.form.messagePlaceholder}"></textarea>
        <button type="submit" class="btn">${portfolio.contact.form.buttonText}</button>
    `;
}

function renderFooter() {
    const footer = document.querySelector("footer p");
    footer.innerHTML = portfolio.footer.replace("{{year}}", new Date().getFullYear());
}
 

 
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
 
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});
 

 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
 
    anchor.addEventListener("click", function(e) {
 
        e.preventDefault();
 
        document.querySelector(this.getAttribute("href")).scrollIntoView({
 
            behavior: "smooth"
 
        });
 
        navLinks.classList.remove("show");
 
    });
 
});


loadPortfolioData();