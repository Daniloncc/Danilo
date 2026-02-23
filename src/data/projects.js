// src/data/projects.js
export const projects = [
  {
    id: 1,
    slug: "vino",
    type: "College Project",
    title: "Vino",
    description:
      "Application full-stack de gestion de cave à vin avec React Hooks, Tailwind CSS et base de données MySQL.",
    tech: ["React", "Node.js", "MySQL", "Tailwind CSS", "REST API", "JWT"],
    github: "https://github.com/Daniloncc/Vino",
    live: null,
    image: "/images/macbook_vino.webp",
  },
  {
    id: 2,
    slug: "vino-figma",
    type: "College Project · UI Design",
    title: "Vino — Figma",
    description:
      "Prototype interactif haute-fidélité de l'application Vino, conçu avec Figma avant l'implémentation.",
    tech: ["Figma", "UI/UX Design", "Prototypage", "Wireframing"],
    github: null,
    live: "https://www.figma.com/proto/8XfH4DnfRe7QaXz8RL2TEw/Untitled?node-id=1-1903&t=u1ojxiFYgOSVCbc0-1",
    image: "/images/macbook_vino_figma.webp",
  },
  {
    id: 3,
    slug: "faceneuve",
    type: "College Project",
    title: "FaceNeuve",
    description:
      "Fictional social network for Collège Maisonneuve students, with a full Laravel implementation.",
    tech: ["Laravel 10", "Bootstrap 5", "MySQL", "Blade"],
    github: "https://github.com/Daniloncc/FaceNeuve",
    live: null,
    image: "/images/macbook_faceneuve.webp",
  },
  {
    id: 4,
    slug: "stampee",
    type: "College Project",
    title: "Stampee",
    description:
      "Plateforme d'enchères de timbres rares avec CRUD complet en PHP, architecture MVC custom et Twig.",
    tech: ["PHP", "MVC", "Twig", "MySQL", "JavaScript"],
    github: "https://github.com/Daniloncc/Stampee",
    live: null,
    image: "/images/macbook_stampee.webp",
  },
  // {
  //   id: 5,
  //   slug: "todo-list",
  //   type: "College Project",
  //   title: "Todo List",
  //   description:
  //     "Application de gestion de tâches avec authentification et CRUD complet par utilisateur.",
  //   tech: ["Laravel", "PHP", "MySQL", "Bootstrap", "Blade"],
  //   github: "https://github.com/Daniloncc/Todo_list",
  //   live: null,
  //   image: null,
  // },
  {
    id: 6,
    slug: "plantes",
    type: "College Project",
    title: "Plant Store",
    description:
      "Vanilla JavaScript plant store with dynamic catalogue, shopping cart and order management.",
    tech: ["JavaScript", "HTML5", "CSS3"],
    github: "https://github.com/Daniloncc/Premier_Projet_JS_Magasin_Plantes",
    live: "https://plantesjs.netlify.app/index.html",
    image: "/images/macbook_plantes.webp",
  },
  {
    id: 7,
    slug: "portfolio",
    type: "Personal Project",
    title: "Portfolio — daniloncc.com",
    description:
      "Personal portfolio built with React, Vite, Tailwind CSS, and Framer Motion.",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
    github: "https://github.com/Daniloncc/Danilo",
    live: "https://daniloncc.com",
    image: "/images/macbook_portfolio.webp",
  }
];