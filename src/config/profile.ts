export interface SocialLink {
  name: string;
  url: string;
  icon?: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'infra' | 'other';
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
  featured?: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  company?: string;
  period?: string;
  technologies: string[];
  url?: string;
  featured: boolean;
}

export interface Profile {
  name: string;
  title: string;
  email: string;
  phone: string;
  summary: string;
  coreCompetencies: string[];
  technicalSkills: {
    frontend: string[];
    backend: string[];
    infra: string[];
  };
  experience: ExperienceItem[];
  projects: Project[];
  socialLinks: SocialLink[];
  languages: { name: string; proficiency: string }[];
}

export const profile: Profile = {
  name: 'Bassir Pechaz',
  title: 'Senior Full Stack Engineer',
  email: 'bpechaz@gmail.com',
  phone: '+98 939 369 9414',
  summary:
    'Senior Full Stack Engineer with over 14 years of professional experience delivering scalable, production-grade web and mobile platforms. Strong expertise across frontend and backend systems with a focus on React, Next.js, Node.js, and Python. Proven ability to design robust architectures, optimize performance, and maintain stability in high-traffic, business-critical environments. Experienced working with remote, Global teams on mission-critical products.',
  coreCompetencies: [
    'Full Stack Architecture',
    'Front-End Engineering',
    'API Design',
    'Performance Optimization',
    'Production Stability',
    'System Scalability',
  ],
  technicalSkills: {
    frontend: [
      'React.js',
      'Next.js',
      'React Native',
      'TypeScript',
      'JavaScript (ES6+)',
      'Material UI',
      'Tailwind CSS',
      'shadcn/ui',
      'Styled Components',
      'Emotion',
      'SASS',
      'Design Systems',
      'Component-driven Architecture',
      'React Query',
      'Redux Toolkit',
      'GraphQL',
      'Cypress (E2E)',
      'Jest (Unit)',
    ],
    backend: ['Node.js', 'NestJS', 'Python (Django)', 'REST & GraphQL APIs'],
    infra: [
      'PostgreSQL',
      'Redis',
      'MongoDB',
      'Docker',
      'CI/CD',
      'AWS (DynamoDB, EC2, S3, ECS, CloudWatch, AppSync)',
      'Git',
      'Agile/Scrum',
    ],
  },
  experience: [
    {
      id: 'bitpin',
      company: 'Bitpin',
      role: 'FullStack Developer',
      period: '2022–Present',
      location: 'Remote',
      description: [
        'Developed and maintained multiple admin panels and exchange platforms',
        'Built siba admin panel using React, React Query, Redux, SASS, and Python',
        'Developed chortke admin panel with same tech stack',
        'Created paymoon crypto shop platform',
        'Maintained bitpin.ir cryptocurrency exchange platform',
      ],
      technologies: ['React', 'React Query', 'Redux', 'SASS', 'Python'],
      featured: true,
    },
    {
      id: 'sinansoft',
      company: 'SinanSoft',
      role: 'Frontend Developer',
      period: '2018–Present (Part-time)',
      location: 'Remote',
      description: [
        'Developed sinansoft.com using Next.js, Node.js, MUI, and Emotion',
        'Built SJI catalog and admin systems with Next.js, Node.js, MUI, and Emotion',
        'Created loanthem PWA using React',
        'Developed Univoip PWA with React and MUI',
        'Built Know yourself mobile app using React Native and Django',
        'Developed Centralive platform with React, MUI, and ReactQuery',
        'Created AIOP platform using Next.js, Tailwind 4, React, MUI, and ReactQuery',
      ],
      technologies: [
        'Next.js',
        'Node.js',
        'Material UI',
        'Emotion',
        'React',
        'React Native',
        'Django',
        'React Query',
        'Tailwind CSS',
      ],
      featured: true,
    },
    {
      id: 'arvand-avid',
      company: 'Arvand Avid',
      role: 'FullStack Developer',
      period: '2017–2018',
      location: 'Remote',
      description: [
        'Developed lernito platform using Next.js, React Query, NestJS, and GraphQL',
        'Built Iknito Workflow system with Next.js, React Query, NestJS, GraphQL, and Redis',
        'Created troweb headless CMS using Next.js, React Query, NestJS, GraphQL, MUI, and Emotion',
      ],
      technologies: [
        'Next.js',
        'React Query',
        'NestJS',
        'GraphQL',
        'Redis',
        'Material UI',
        'Emotion',
      ],
      featured: true,
    },
    {
      id: 'greenweb',
      company: 'Greenweb',
      role: 'FullStack Developer',
      period: '2011–2017',
      location: 'Remote',
      description: [
        'Developed chapiroos platform using PHP, React, and MySQL',
        'Maintained IranServer platform using PHP',
      ],
      technologies: ['PHP', 'React', 'MySQL'],
    },
    {
      id: 'freelance',
      company: 'Freelance',
      role: 'FullStack Developer',
      period: '2016–Present',
      location: 'Remote',
      description: [
        'Built qbar React PWA with SASS',
        'Developed Trido using Next.js',
        'Created Crypto blog Next.js PWA',
        'Maintained Elemental React components repository',
        'Developed Faranama using Django, React, and Postgres',
        'Built Dealertouch with React, shadcn/ui, Redux Toolkit, and GraphQL',
        'Created KimdiShop using Next.js and Tailwind',
      ],
      technologies: [
        'React',
        'Next.js',
        'Django',
        'PostgreSQL',
        'SASS',
        'shadcn/ui',
        'Redux Toolkit',
        'GraphQL',
        'Tailwind CSS',
      ],
    },
  ],
  projects: [
    {
      id: 'bitpin-exchange',
      name: 'Bitpin Exchange',
      description: 'Cryptocurrency exchange platform with admin panels and crypto shop',
      company: 'Bitpin',
      period: '2022–Present',
      technologies: ['React', 'React Query', 'Redux', 'SASS', 'Python'],
      featured: true,
    },
    {
      id: 'aiop',
      name: 'AIOP Platform',
      description: 'Next.js platform with Tailwind 4, React, MUI, and ReactQuery',
      company: 'SinanSoft',
      period: '2018–Present',
      technologies: ['Next.js', 'Tailwind CSS', 'React', 'Material UI', 'React Query'],
      featured: true,
    },
    {
      id: 'lernito',
      name: 'Lernito',
      description: 'Educational platform built with Next.js, React Query, NestJS, and GraphQL',
      company: 'Arvand Avid',
      period: '2017–2018',
      technologies: ['Next.js', 'React Query', 'NestJS', 'GraphQL'],
      featured: true,
    },
    {
      id: 'iknito-workflow',
      name: 'Iknito Workflow',
      description: 'Workflow management system with Next.js, NestJS, GraphQL, and Redis',
      company: 'Arvand Avid',
      period: '2017–2018',
      technologies: ['Next.js', 'React Query', 'NestJS', 'GraphQL', 'Redis'],
      featured: true,
    },
    {
      id: 'troweb-cms',
      name: 'Troweb Headless CMS',
      description: 'Headless CMS built with Next.js, NestJS, GraphQL, MUI, and Emotion',
      company: 'Arvand Avid',
      period: '2017–2018',
      technologies: ['Next.js', 'NestJS', 'GraphQL', 'Material UI', 'Emotion'],
      featured: true,
    },
    {
      id: 'dealertouch',
      name: 'Dealertouch',
      description: 'React application with shadcn/ui, Redux Toolkit, and GraphQL',
      technologies: ['React', 'shadcn/ui', 'Redux Toolkit', 'GraphQL'],
      featured: false,
    },
    {
      id: 'kimdishop',
      name: 'KimdiShop',
      description: 'E-commerce platform built with Next.js and Tailwind',
      technologies: ['Next.js', 'Tailwind CSS'],
      featured: false,
    },
    {
      id: 'faranama',
      name: 'Faranama',
      description: 'Full-stack application using Django, React, and Postgres',
      technologies: ['Django', 'React', 'PostgreSQL'],
      featured: false,
    },
    {
      id: 'know-yourself',
      name: 'Know Yourself',
      description: 'Mobile application built with React Native and Django backend',
      company: 'SinanSoft',
      technologies: ['React Native', 'Django'],
      featured: false,
    },
    {
      id: 'centralive',
      name: 'Centralive',
      description: 'Platform developed with React, MUI, and ReactQuery',
      company: 'SinanSoft',
      technologies: ['React', 'Material UI', 'React Query'],
      featured: false,
    },
  ],
  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/pechaz',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/bassir-pechaz-43242952/',
    },
  ],
  languages: [
    { name: 'English', proficiency: 'Professional Working Proficiency' },
    { name: 'Persian', proficiency: 'Native' },
  ],
};

