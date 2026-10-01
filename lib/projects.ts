export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    link?: string;
    colSpanDesktop?: string;
}

export const ownerDetails = {
    name: "Tanmay Pondhe",
    title: "Software Engineering Student | AI Agents & Web Development",
    headline: "Building Beyond Possible.",
    bio: "Integrated M.Tech Software Engineering student at VIT Vellore who likes building and shipping, from AI coding agents to deployed web apps.",
    email: "tanmaypondhe7777@gmail.com",
    github: "https://github.com/tanp4577-web",
    linkedin: "https://linkedin.com/in/tanmay-pondhe-5b820b3a3",
    metrics: [
        { label: "Degree", value: "Integrated M.Tech" },
        { label: "University", value: "VIT Vellore" },
        { label: "Focus", value: "AI Agents & Web Dev" },
        { label: "Featured Projects", value: "2 Shipped" },
    ],
};

export const projectsData: Project[] = [
    {
        id: "refactor-guard",
        title: "Refactor Guard",
        description: "An autonomous multi-file refactoring agent built for Samsung PRISM Gen AI Hackathon 3.0.",
        image: "/images/projects/project-01.png",
        tags: ["AI Agent", "GenAI", "TypeScript", "Python"],
        link: "https://github.com/tanp4577-web",
        colSpanDesktop: "lg:col-span-7",
    },
    {
        id: "placement-prep",
        title: "PlacementPrep",
        description: "An AI placement preparation tracker featuring mock interview simulators and resume analysis.",
        image: "/images/projects/project-02.png",
        tags: ["AI / ML", "Next.js", "Tailwind CSS", "Web Speech API"],
        link: "https://aiplacement-tracker.vercel.app",
        colSpanDesktop: "lg:col-span-5",
    },
];
