export const projectDetails = [
    {
        id: 1,
        slug: "vino",
        title: "Vino",
        subtitle:
            "Full-stack wine cellar management app with authentication, advanced filters, and a dynamic interface.",
        meta: {
            context: "Academic Project — Collège Maisonneuve",
            role: "Full-Stack Developer",
            year: "2025",
            duration: "8 weeks",
            team: "5 developers",
            github: "https://github.com/Daniloncc/Vino",
            live: "https://e2495746.webdevmaisonneuve.ca/",
            figma: null,
        },
        tech: ["React", "Node.js", "Express", "MySQL", "Tailwind CSS", "REST API", "JWT"],
        methodologies: ["Decoupled Architecture", "REST API", "Agile / Git Flow"],
        coverImage: "/images/vino_cover.webp",
        challenge:
            "Design a wine cellar management application usable by multiple simultaneous users, with an intuitive interface and a decoupled architecture between the React frontend and the Node.js backend. The main challenge was synchronizing React state with API mutations while maintaining a smooth user experience.",
        approach:
            "As a team of five, we worked in weekly Agile sprints, and all of us contributed as full-stack developers using Node.js and React. I worked on both the backend and the frontend, just like the rest of the team. We coordinated our work using the Git Flow branching strategy to manage parallel development.",
        solution:
            "We delivered a full-stack application with JWT authentication, complete wine management (CRUD), an advanced filtering and search system, and a responsive Tailwind CSS interface. The decoupled architecture allows independent maintenance of the frontend and backend.",
        outcome:
            "Application deployed on Render with all planned features. The project demonstrated our ability to work as a team on a modern stack and deliver a complete product under real-world conditions.",
        outcomes: [
            "Decoupled frontend / backend architecture",
            "Secure JWT authentication",
            "Deployed to production on Render",
            "Built as a team of 5 using Git Flow",
        ],
        screenshots: ["/images/macbook_vino.webp"],
    },

    {
        id: 2,
        slug: "vino-figma",
        title: "Vino — Figma",
        subtitle:
            "High-fidelity interactive prototype for the Vino app, designed in Figma before implementation — from wireframe to final design.",
        meta: {
            context: "Academic Project — Collège Maisonneuve",
            role: "UI/UX Designer",
            year: "2025",
            duration: "2 weeks",
            team: "solo",
            github: null,
            live: "https://www.figma.com/proto/8XfH4DnfRe7QaXz8RL2TEw/Untitled?node-id=1-1903&t=u1ojxiFYgOSVCbc0-1",
            figma: "https://www.figma.com/design/8XfH4DnfRe7QaXz8RL2TEw/Untitled?node-id=1-1903",
        },
        tech: ["Figma", "UI/UX Design", "Interactive Prototyping", "Wireframing"],
        methodologies: ["User Flow", "Wireframing", "High-fidelity Design", "Prototyping"],
        coverImage: "/images/figma_cover.webp",
        challenge:
            "Before writing a single line of code, the team needed a shared vision for the application. The challenge was designing a coherent interface for a wine cellar app — with intuitive navigation, a strong visual identity, and a clickable prototype that developers could follow closely.",
        approach:
            "I started by defining the main user flows (sign up, add a wine, filtering, profile), then produced low-fidelity wireframes to validate the structure with the team. Once navigation was approved, I moved to high-fidelity with the color palette, typography, and reusable components.",
        solution:
            "A complete interactive Figma prototype covering all application screens: onboarding, login, dashboard, wine list, detail view, filters, and user profile. Each component was designed to be reusable and easily translatable into code.",
        outcome:
            "The prototype served as a reference throughout development, reducing back-and-forth between design and code. The team could implement interfaces with a clear vision, which accelerated development and ensured visual consistency in the final product.",
        outcomes: [
            "End-to-end clickable interactive prototype",
            "Reusable Figma components",
            "Complete user flows defined upfront",
            "Design reference for the dev team",
        ],
        screenshots: ["/images/macbook_vino_figma.webp"],
    },

    {
        id: 3,
        slug: "faceneuve",
        title: "FaceNeuve",
        subtitle:
            "Fictional bilingual social network for Collège Maisonneuve students, built with a full Laravel implementation including role-based access control, email notifications, and PDF document management.",
        meta: {
            context: "Academic Project — Collège Maisonneuve",
            role: "Full-Stack Developer & UI Designer",
            year: "2025",
            duration: "3 weeks",
            team: "Solo",
            github: "https://github.com/Daniloncc/FaceNeuve",
            live: null,
        },
        tech: ["Laravel 10", "PHP 8.1", "Bootstrap 5", "MySQL", "Blade", "Twig", "CSS3"],
        methodologies: ["Design-to-code", "Template Customization", "Laravel MVC Architecture", "Role-Based Access Control"],
        coverImage: "/images/faceneuve_cover.webp",
        challenge:
            "Lead a project end-to-end covering both design and development: craft a unique and cohesive interface by combining multiple Bootstrap templates and personal design touches, then implement it faithfully in Laravel without losing its visual identity. The platform also needed to support two languages, dynamic role-based UI rendering, and document management features.",
        approach:
            "Rather than designing from scratch in a design tool, I referenced three different Bootstrap templates and blended them together, adding my own personal customizations to achieve a distinctive and coherent look. Once the visual direction was established, I set up the Laravel framework with migrations, models, and Blade views, using Twig to manage template variables. I then layered in bilingual support, role-based display logic, and email and PDF functionalities.",
        solution:
            "A responsive bilingual web platform built with Laravel and Bootstrap, with a unique UI crafted by merging and personalizing multiple Bootstrap templates. Powered by Twig for dynamic variable management, the application supports email notifications, PDF document uploads and downloads, and adapts its interface based on the authenticated user's role.",
        outcome:
            "The project showcased my ability to manage the full workflow — from visual design decisions to full-stack implementation. It strengthened my skills in building reliable Laravel applications with advanced features such as multilingual support, document handling, and role-driven UI logic, while developing a personal design sensibility without relying on dedicated design software.",
        outcomes: [
            "Unique UI built by combining and personally customizing three Bootstrap templates",
            "Bilingual platform (French & English) with full language switching support",
            "Role-based display management — UI adapts dynamically based on the authenticated user's role",
            "Email notification system integrated within the Laravel backend",
            "PDF document upload, management, and download functionality",
            "Twig used for flexible and maintainable template variable handling",
            "Complete Laravel 10 MVC architecture",
            "Responsive interface built with Bootstrap 5",
            "End-to-end development: needs analysis → UI integration → backend implementation"
        ],
        screenshots: ["/images/macbook_faceneuve.webp"],
    },

    {
        id: 4,
        slug: "stampee",
        title: "Stampee",
        subtitle:
            "Rare stamp auction platform with user authentication, favorites management, and automatic winner messaging.",
        meta: {
            context: "Academic Project — Collège Maisonneuve",
            role: "Full-Stack Developer",
            year: "2025",
            duration: "4 weeks",
            team: "Solo",
            github: "https://github.com/Daniloncc/Stampee",
            live: null,
            figma: null,
        },
        tech: ["PHP", "MVC", "Twig", "MySQL", "JavaScript", "CSS3", "Composer"],
        methodologies: ["MVC Architecture", "CRUD", "Session Management"],
        coverImage: "/images/stampee_cover.webp",
        challenge:
            "Design an MVC architecture from scratch in PHP without a framework, manually handling routing, model/view/controller layer separation, and form security. The goal was to deeply understand the foundations of a framework before using one.",
        approach:
            "I started by modeling the database and defining routes, then built the PHP controllers and models before integrating Twig for the views. Each feature was manually tested with Postman to validate the backend logic.",
        solution:
            "A complete auction platform allowing visitors to browse stamps, and registered users to create auctions, place bids, manage their favorites, and automatically receive a message when they win an auction.",
        outcome:
            "Project delivered with complete CRUD, secure authentication, and functional auction logic. This experience solidified my understanding of MVC patterns that I now use daily with Laravel.",
        outcomes: [
            "Custom PHP MVC architecture, no framework",
            "Auction system with timer",
            "Automatic winner messaging",
            "Full CRUD on stamps and profiles",
        ],
        screenshots: ["/images/macbook_stampee.webp"],
    },

    // {
    //     id: 5,
    //     slug: "todo-list",
    //     title: "Todo List",
    //     subtitle:
    //         "Personal task management application with authentication, due dates, and a responsive interface.",
    //     meta: {
    //         context: "Academic Project — Collège Maisonneuve",
    //         role: "Full-Stack Developer",
    //         year: "2024",
    //         duration: "2 weeks",
    //         team: "Solo",
    //         github: "https://github.com/Daniloncc/Todo_list",
    //         live: null,
    //         figma: null,
    //     },
    //     tech: ["Laravel", "PHP", "MySQL", "Bootstrap 5", "Blade", "Artisan"],
    //     methodologies: ["Authentication", "CRUD", "Eloquent ORM"],
    //     coverImage: "/images/todo-cover.jpg",
    //     challenge:
    //         "Implement a system where each user can only see and modify their own tasks, correctly managing Laravel policies and the Eloquent relationships between User and Task.",
    //     approach:
    //         "Used Laravel's built-in features: Auth scaffolding for authentication, Eloquent for hasMany relationships, and policies to protect resources. Bootstrap for a clean interface without over-engineering.",
    //     solution:
    //         "Complete CRUD application with email/password authentication, per-user task management (add, edit, delete, mark as complete), due dates, and a responsive interface.",
    //     outcome:
    //         "Functional project that clearly demonstrates mastery of Laravel fundamentals: routing, middleware, Eloquent, Blade, and secure form handling.",
    //     outcomes: [
    //         "Laravel authentication and authorization",
    //         "Full per-user CRUD",
    //         "Due date management",
    //         "Eloquent hasMany relationships",
    //     ],
    //     screenshots: [],
    // },

    {
        id: 6,
        slug: "plantes",
        title: "Plant Store",
        subtitle:
            "First vanilla JavaScript project — a plant shop with dynamic catalogue, interactive cart and order page.",
        meta: {
            context: "Academic Project — Collège Maisonneuve",
            role: "Frontend Developer",
            year: "2023",
            duration: "5 weeks - starting the program",
            team: null,
            github: "https://github.com/Daniloncc/Premier_Projet_JS_Magasin_Plantes",
            live: "https://plantesjs.netlify.app/index.html",
            figma: null,
        },
        tech: ["JavaScript", "HTML5", "CSS3"],
        methodologies: ["Vanilla JS", "DOM Manipulation", "Local Storage"],
        coverImage: "/images/plantes_cover.webp",
        challenge:
            "Build a fully functional online store without any framework — using only native JavaScript to handle the catalogue, shopping cart and all user interactions.",
        approach:
            "Direct DOM manipulation with ES6 JavaScript, organizing the code into functional modules, and persisting the cart state using localStorage.",
        solution:
            "A multi-page application with a filterable plant catalogue, a dynamic cart updated in real time, and an order completion page.",
        outcome:
            "Project deployed on Netlify. First complete vanilla JavaScript experience, laying the groundwork for frontend logic before learning modern frameworks.",
        outcomes: [
            "Dynamic plant catalogue",
            "Interactive cart with localStorage",
            "Multi-page HTML/CSS/JS",
            "Deployed on Netlify",
        ],
        screenshots: [],
    },
    {
        id: 7,
        slug: "portfolio",
        title: "Portfolio — daniloncc.com",
        subtitle:
            "Personal portfolio designed and built from scratch with React and Framer Motion — featuring animated SVG illustrations.",
        meta: {
            context: "Personal Project",
            role: "Full-Stack Developer & UI Designer",
            year: "2025",
            duration: "Ongoing",
            team: "Solo",
            github: "https://github.com/Daniloncc/Danilo",
            live: "https://daniloncc.com",
            figma: null,
        },
        tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "shadcn/ui", "React Router DOM"],
        methodologies: ["Component-Based Architecture", "Mobile-First Design", "Animation-Driven UI"],
        coverImage: "/images/portfolio_cover.webp",
        challenge:
            "In a market saturated with developer portfolios, blending in is the real risk. The challenge was to build something that stops the scroll — not through excess, but through restraint. A design so considered and precise that its simplicity becomes the statement.",
        approach:
            "Built with a mobile-first approach using React and Vite. Animations were handled with Framer Motion, triggering on scroll and load events. Custom SVG components were designed to animate independently, adding personality without compromising performance.",
        solution:
            "A fully responsive single-page portfolio with a custom animated cursor, scroll-triggered Framer Motion animations, an interactive project carousel, and a unique visual identity built around a cream and sage green palette.",
        outcome:
            "Deployed on Vercel with a custom domain. The portfolio showcases both technical skills and design sensibility, serving as a live demonstration of the stack and approach used to build it.",
        outcomes: [
            "Custom animated cursor component",
            "Scroll-triggered Framer Motion animations",
            "Responsive carousel with state synchronization",
            "Animated SVG illustrations",
            "Deployed on Vercel with custom domain daniloncc.com",
            "Mobile-first responsive design",
        ],
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