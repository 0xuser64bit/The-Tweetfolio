// Education Data (Write it down in reverse order i.e present to past)

export const EducationData = [
  {
    date: "July 2019 - May 2023",
    title: "Bachelor of Engineering in Computer Science",
    description:
      "Completed a Bachelor of Engineering in Computer Science, with a strong focus on software development, algorithms, \
            and system design. Graduated in May 2023 after four years of rigorous academic training and hands-on project experience.",
  },
];

// Experience Data (Write it down in reverse order i.e present to past)

export const ExperienceData = [
  {
    timeline: "April 2023 - Present",
    company_name: "Odoo Private Limited",
    description:
      "I spearheaded efforts to accelerate product development, resulting in faster releases. In addition, I conducted thorough \
            debugging and implemented key improvements, significantly enhancing the overall stability and functionality of the product. \
            By collaborating with cross-functional teams, I contributed to solving complex technical challenges, fostering a culture of \
            innovation and efficiency.",
  },
  {
    timeline: "February 2023 - April 2023",
    company_name: "Radix Private Limited",
    description:
      "During my internship, I gained valuable experience and deepened my knowledge of web development technologies, including HTML, \
            CSS, JavaScript, Bootstrap, TailwindCSS, and MS SQL. This hands-on experience allowed me to enhance my technical skills and apply \
            them effectively in real-world projects.",
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
    projectName: "Canteen (Currently building)",
    purpose: "I don't know, I just wanted to build something so doing it.",
    listItems: [
      "Canteen is a platform designed to bring students from different universities together, enabling them to connect and engage in discussions anonymously. It creates a space where students can freely share their thoughts, experiences, and questions about academics, campus life, mental health, career paths, and more, without fear of judgment or repercussions. Canteen' goal is to foster open and honest conversations, empowering students to support and learn from each other while maintaining their privacy.",
    ],
    githubLink: "#",
    liveProject: "https://canteen.arthprajapati.com",
    techStack: "NextJS, TailwindCSS, Typescript, Prisma",
  },
  {
    projectName: "The TweetFolio",
    purpose:
      "I've been using twitter(aka X) for a long time and I've always liked the idea for sharing thoughts in few words. NO BS",
    listItems: [
      "Developed an innovative, Twitter-inspired portfolio website using React.js and Tailwind CSS, showcasing professional information through a familiar social media interface",
      "Implemented a responsive design mimicking Twitte's UI/UX,including customizable coverimages and profile sections, enhancing user engagement and visual appeal.",
      "Engineered a dynamic content management system to display education, skills, experience, projects, and achievements in a tweet-like format, improving information accessibility.",
      "Integrated and highlighted multiple open-source contributions, demonstrating active participation in the developer community and showcasing collaborative coding skills.",
    ],
    githubLink: "https://github.com/user-64bit/my-tweetfolio",
    liveProject: "https://arthprajapati.com",
    techStack: "ReactJS, TailwindCSS, JavaScript, EmailJS",
  },
  {
    projectName: "Notebook",
    purpose: "Just Notion like plateform",
    listItems: [
      "Architected and developed a Notion-like collaborative note-taking platform, implementing recursive data structures for hierarchical note organization and real-time synchronization.",
      "Engineered robust CRUD operations, including publication toggle, archiving, and permanent deletion, while integrating full-text search functionality for efficient note retrieval.",
      "Implemented markdown support and rich media integration, allowing users to create dynamic content with coverimages, icons, and formatted text.",
      "Designed and implemented user experience enhancements, including customizable themes (dark/light mode) and a bookmarking system,resulting in improved user engagement and retention.",
    ],
    githubLink: "https://github.com/user-64bit/notebook",
    liveProject: "https://notebook-arthprajapati.com",
    techStack: "NextJS, Covnex, TailwindCSS, ShadcnUI, TypeScript",
  },
  {
    projectName: "FlashCards",
    purpose: "To be able memorize and understand concepts",
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
    liveProject: "https://blog.arthprajapati.com",
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
    title: "Add Wishlist feature to Ecommerce website",
    link: "https://github.com/ravi300601/EasyCart/pull/1",
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
    status: "merged",
  },
];

// Achievements
export const AchievementsData = [
  "200+ Leetcode Problems Solved",
  "5+ OpenSource Contributions",
  "Azadi ka Amrit Mahotsav Hackathon: Grand Finale",
];
