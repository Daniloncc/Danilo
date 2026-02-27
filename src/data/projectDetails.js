export const projectDetails = [
    {
        id: 1,
        slug: "vino",
        title: "Vino",
        meta: {
            year: "2025",
            github: "https://github.com/Daniloncc/Vino",
            live: "https://e2495746.webdevmaisonneuve.ca/",
            figma: null,
        },
        tech: ["React", "Node.js", "Express", "MySQL", "Tailwind CSS", "REST API", "JWT"],
        methodologies: ["Decoupled Architecture", "REST API", "Agile / Git Flow"],
        coverImage: "/images/vino_cover.webp",
        screenshots: ["/images/macbook_vino.webp"],
    },
    {
        id: 2,
        slug: "vino-figma",
        title: "Vino — Figma",
        meta: {
            year: "2025",
            github: null,
            live: "https://www.figma.com/proto/8XfH4DnfRe7QaXz8RL2TEw/Untitled?node-id=1-1903&t=u1ojxiFYgOSVCbc0-1",
            figma: "https://www.figma.com/design/8XfH4DnfRe7QaXz8RL2TEw/Untitled?node-id=1-1903",
        },
        tech: ["Figma", "UI/UX Design", "Interactive Prototyping", "Wireframing"],
        methodologies: ["User Flow", "Wireframing", "High-fidelity Design", "Prototyping"],
        coverImage: "/images/figma_cover.webp",
        screenshots: ["/images/macbook_vino_figma.webp"],
    },
    {
        id: 3,
        slug: "faceneuve",
        title: "FaceNeuve",
        meta: {
            year: "2025",
            github: "https://github.com/Daniloncc/FaceNeuve",
            live: null,
            figma: null,
        },
        tech: ["Laravel 10", "PHP 8.1", "Bootstrap 5", "MySQL", "Blade", "Twig", "CSS3"],
        methodologies: ["Design-to-code", "Template Customization", "Laravel MVC Architecture", "Role-Based Access Control"],
        coverImage: "/images/faceneuve_cover.webp",
        screenshots: ["/images/macbook_faceneuve.webp"],
    },
    // {
    //     id: 4,
    //     slug: "stampee",
    //     title: "Stampee",
    //     meta: {
    //         year: "2025",
    //         github: "https://github.com/Daniloncc/Stampee",
    //         live: null,
    //         figma: null,
    //     },
    //     tech: ["PHP", "MVC", "Twig", "MySQL", "JavaScript", "CSS3", "Composer"],
    //     methodologies: ["MVC Architecture", "CRUD", "Session Management"],
    //     coverImage: "/images/stampee_cover.webp",
    //     screenshots: ["/images/macbook_stampee.webp"],
    // },
    // {
    //     id: 6,
    //     slug: "plantes",
    //     title: "Plant Store",
    //     meta: {
    //         year: "2023",
    //         github: "https://github.com/Daniloncc/Premier_Projet_JS_Magasin_Plantes",
    //         live: "https://plantesjs.netlify.app/index.html",
    //         figma: null,
    //     },
    //     tech: ["JavaScript", "HTML5", "CSS3"],
    //     methodologies: ["Vanilla JS", "DOM Manipulation", "Local Storage"],
    //     coverImage: "/images/plantes_cover.webp",
    //     screenshots: ["/images/macbook_plantes.webp"],
    // },
    {
        id: 5,
        slug: "portfolio",
        title: "Portfolio — daniloncc.com",
        meta: {
            year: "2025",
            github: "https://github.com/Daniloncc/Danilo",
            live: "https://daniloncc.com",
            figma: null,
        },
        tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "shadcn/ui", "React Router DOM"],
        methodologies: ["Component-Based Architecture", "Mobile-First Design", "Animation-Driven UI"],
        coverImage: "/images/portfolio_cover.webp",
        screenshots: ["/images/macbook_portfolio.webp"],
    },
];

// Helper — find by slug or id
export function getProjectDetail(slugOrId) {
    return projectDetails.find(
        (p) => p.slug === slugOrId || String(p.id) === String(slugOrId)
    );
}

// Helper — prev / next
export function getAdjacentProjects(currentId) {
    const idx = projectDetails.findIndex((p) => String(p.id) === String(currentId));
    return {
        prev: idx > 0 ? projectDetails[idx - 1] : null,
        next: idx < projectDetails.length - 1 ? projectDetails[idx + 1] : null,
    };
}