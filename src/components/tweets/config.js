// Education Data (Write it down in reverse order i.e present to past)

export const EducationData = [
    {
        date: "July 2019 - May 2023",
        title: "Bachelor of Engineering In Computer Science",
        description:
            "I have completed my Bachelor of Engineering in Computer Science degree in 2019 to 2023.",
    },
    {
        date: "June 2017 - May 2019",
        title: "11th and 12th Science",
        description: "Completed my 11th and 12th Science",
    },
];

// Experience Data (Write it down in reverse order i.e present to past)

export const ExperienceData = [
    {
        timeline: "April 2023 - Present",
        company_name: "Odoo Private Limited",
        description:
            "First 6 Months was internship period where in first 2 month we learnt about Odoo then after that we started working on Live Project. and Very soon got assign to dedicated project with 2 more colleuges.",
    },
    {
        timeline: "February 2023 - April 2023",
        company_name: "Radix Private Limited",
        description:
            "It was Internship and I learnt a lot about HTML, CSS, JavaScript, Bootstrap, TailwindCSS and MS SQL",
    },
];

// Skills Data (Add more Key value pairs id needed)
export const SkillsData = {
    "Programming Languages": ["Python", "C/C++", "JavaScript/TypeScript", "Rust"],
    Tools: ["React", "Node.js", "Next.js", "Redux ToolKit", "Git", "Docker"],
    OS: ["Ubuntu", "Kali Linux", "Windows"],
    Databases: ["MongoDB", "PostgreSQL", "MySQL"],
};

//  Projects

export const ProjectsData = [
    {
        projectName: "The TweetFolio",
        purpose:
            "I've been using twitter(aka X) for a long time and I've always liked the idea for sharing thoughts in few words. NO BS",
        listItems: [
            "Developed an innovative, Twitter-inspired portfolio website using React.js and Tailwind CSS, showcasing professional information through a familiar social media interface",
            "Implemented a responsive design mimicking Twitte's UI/UX,including customizable coverimages and profile sections, enhancing user engagement and visual appeal.",
            "Engineered a dynamic content management system to display education, skills, experience, projects, and achievements in a tweet-like format, improving information accessibility.",
            "Integrated and highlighted multiple open-source contributions, demonstrating active participation in the developer community and showcasing collaborative coding skills."
        ],
        githubLink: "https://github.com/user-64bit/my-tweetfolio",
        liveProject: "https://arthprajapati.netlify.app/",
        techStack: "ReactJS, TailwindCSS, JavaScript, EmailJS",
    },
    {
        projectName: "Notebook",
        purpose:
            "Just Notion like plateform",
        listItems: [
            "Architected and developed a Notion-like collaborative note-taking platform, implementing recursive data structures for hierarchical note organization and real-time synchronization.",
            "Engineered robust CRUD operations, including publication toggle, archiving, and permanent deletion, while integrating full-text search functionality for efficient note retrieval.",
            "Implemented markdown support and rich media integration, allowing users to create dynamic content with coverimages, icons, and formatted text.",
            "Designed and implemented user experience enhancements, including customizable themes (dark/light mode) and a bookmarking system,resulting in improved user engagement and retention."
        ],
        githubLink: "https://github.com/user-64bit/notebook",
        liveProject: "https://notebook-self-phi.vercel.app/",
        techStack: "NextJS, Covnex, TailwindCSS, ShadcnUI, TypeScript",
    },
    {
        projectName: "FlashCards",
        purpose:
            "To be able memorize and understand concepts",
        listItems: [
            "Engineered a note organization system facilitating efficient memorization",
            "Helps Practice Memorization.",
            "Implemented features to structure and maintain notes effectively.",
        ],
        githubLink: "https://github.com/user-64bit/flashcards",
        liveProject: "#",
        techStack: "Python(Django), Bootstrap, JavaScript, HTML, CSS ",
    },
    {
        projectName: "The Terminal Tourist (Blog)",
        listItems: [
            "Created A Blog Website From writing Personal Blogs",
            "Simple Minimilistic Website for sharing knowledge",
        ],
        githubLink: "https://github.com/user-64bit/the-terminal-tourist",
        liveProject: "https://theterminaltourist.vercel.app",
        techStack: "NextJS, TailwindCSS",
    },
    {
        projectName: "Shinobi Styles (E commerce Website)",
        listItems: [
            "Created an E-commerce Website inspired by comicsense",
            "Integrated RazorPay as Payment Gateway",
            "Integrated CloudFlare, MongoDB and Wrote backend Using Node",
        ],
        githubLink: "https://github.com/user-64bit/ShinobiStyles-frontend",
        liveProject: "https://shinobi-styles.vercel.app",
        techStack: "ReactJS, Node.js, CloudFlare, MongoDB",
    },
    {
        projectName: "Website Clone using Pure TailwindCSS",
        listItems: [
            "Created an website using pure tailwind",
            "Made website totally responsive",
        ],
        githubLink: "https://github.com/user-64bit/Website-Clone-Tailwind",
        liveProject: "https://tailwind-clone-website.netlify.app",
        techStack: "HTML, TailwindCSS, CSS, JavaScript",
    },
    {
        projectName: "Tweet It (Twitter Bot)",
        listItems: [
            "Integrate an API which will give quotes to Twitter Bot",
            "Tweet a quote at certain time set by user",
        ],
        githubLink: "https://github.com/user-64bit/tweet-it",
        liveProject: "#",
        techStack: "Python, TwitterAPI",
    },
];

//  Contributions

export const ContributionData = [
    {
        title: "Fix Multi Processing Issue in Deauthentication Script",
        link: "https://github.com/iamEzmuth/DeAuthImposter/pull/4",
        status: "merged",
    },
    {
        title: "handled case where Reporsitory name can have dot in name",
        link: "https://github.com/open-sauced/open-sauced/pull/1453",
        status: "merged",
    },
    {
        title: "Improve Documentation of Appwrite",
        link: "https://github.com/appwrite/docs/pull/230",
        status: "merged",
    },
    {
        title: "Improve Documentatation for coding-interview-university",
        link: "https://github.com/jwasham/coding-interview-university/pull/1150",
        status: "merged",
    },
    {
        title: "Enable debug mode by default exclusively for only localhost",
        link: "https://github.com/Droggol/OdooDebug/pull/18",
        status: "open",
    },
    {
        title: "Implement Feature of Import/Export Bookmarks",
        link: "https://github.com/medyo/hackertab.dev/issues/156",
        status: "issued",
    },
    {
        title: "Implemented Feature of Import/Export Bookmarks",
        link: "https://github.com/medyo/hackertab.dev/issues/156",
        status: "open",
    },
];

// Achievements
export const AchievementsData = [
    "200+ Leetcode Problems Solved",
    "5+ OpenSource Contributions",
    "Azadi ka Amrit Mahotsav Hackathon: Grand Finale",
];
