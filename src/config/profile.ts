export interface SocialLink {
  name: string;
  url: string;
  icon?: string;
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
  current?: boolean;
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
  location: string;
  summary: string;
  coreCompetencies: string[];
  technicalSkills: {
    frontend: string[];
    stateAndApis: string[];
    backend: string[];
    data: string[];
    infra: string[];
  };
  experience: ExperienceItem[];
  projects: Project[];
  socialLinks: SocialLink[];
  languages: { name: string; proficiency: string }[];
}

export const profile: Profile = {
  name: 'Bassir Pechaz',
  title: 'Senior Full-Stack Engineer',
  email: 'bpechaz@gmail.com',
  phone: '+98 939 369 9414',
  location: 'Remote — available worldwide',
  summary:
    'Full-stack engineer with 14+ years shipping and operating production web, mobile and platform systems. Recent work spans the whole path: React and React Native clients, Python, Go and Node services, Kafka pipelines on Kubernetes, and the CI/CD and observability that keep them running. Used to being the person who follows a failure from the UI down to the broker, in remote and distributed teams.',
  coreCompetencies: [
    'Production Systems / SRE',
    'Full-Stack Architecture',
    'React + React Native',
    'Event-Driven Delivery',
    'CI/CD & Observability',
    'Incident Response',
  ],
  technicalSkills: {
    frontend: [
      'React',
      'React Native',
      'Next.js',
      'TypeScript',
      'JavaScript (ES6+)',
      'Material UI',
      'MUI X',
      'Tailwind CSS',
      'shadcn/ui',
      'Design Systems',
      'Storybook',
      'PWA',
    ],
    stateAndApis: [
      'Redux Toolkit',
      'TanStack Query',
      'SWR',
      'GraphQL',
      'REST',
      'WebSockets',
      'Offline-first caching',
    ],
    backend: [
      'Python',
      'Django',
      'Node.js',
      'NestJS',
      'Go',
      'Laravel',
      'Keycloak / OAuth',
      'Event-driven workers',
    ],
    data: [
      'PostgreSQL',
      'Elasticsearch',
      'Redis',
      'Apache Kafka',
      'MySQL',
      'MongoDB',
    ],
    infra: [
      'Docker',
      'Kubernetes',
      'Traefik',
      'GitLab CI/CD',
      'GitHub Actions',
      'AWS',
      'Prometheus',
      'Grafana',
      'Loki',
      'Sentry',
    ],
  },
  experience: [
    {
      id: 'netbina',
      company: 'Netbina',
      role: 'Senior Full-Stack / Site Reliability Engineer',
      period: '2026 – Present',
      location: 'Remote',
      current: true,
      featured: true,
      description: [
        'Operate Telescope end to end: social and marketplace ingest, Kafka enrichment workers for category, sentiment, topic and near-duplicate detection, PostgreSQL and Elasticsearch storage, a Laravel API and a React panel — a production microservice platform on Kubernetes.',
        'Replaced tag-based manual releases with branch-driven GitLab CI/CD: a push to master builds a commit-SHA image, pushes it to the private registry and rolls the live Kubernetes Deployment.',
        'Hardened the ingest and enrichment path against stalls with explicit HTTP timeouts, bounded retries, batched Kafka-to-service writes and raised worker replicas.',
        'Built a Go reverse proxy for Google Gemini that fronts every AI call: shared-token authentication, sticky API-key rotation on HTTP 429, and IP/domain allowlists, deployed with Docker Compose behind Traefik.',
        'Built the operator-facing health and superadmin surfaces in React so ingest gaps and content-kind problems are visible before a customer reports them.',
        'Led the response to a priority-1 outage where self-hosted Git returned 404 on every route after a host Docker upgrade broke the reverse-proxy provider: restored routing with a file-based configuration, brought CI runners back online, and wrote the incident report.',
        'Automated SeePlayShow delivery with GitHub Actions: Django releases to AWS Elastic Beanstalk and Node WebSocket releases to EC2 over rsync and PM2 behind a shared load balancer.',
      ],
      technologies: [
        'React',
        'Laravel',
        'Kafka',
        'Kubernetes',
        'PostgreSQL',
        'Elasticsearch',
        'Go',
        'GitLab CI',
        'Django',
        'AWS',
        'Prometheus',
        'Grafana',
      ],
    },
    {
      id: 'faradars',
      company: 'FaraDars',
      role: 'React Native / Full-Stack Engineer',
      period: '2024 – 2026',
      location: 'Remote',
      featured: true,
      description: [
        'Shipped the FaraDars learning app through release 2.1.20 on React Native 0.86 and React 19 with TypeScript: course discovery and search, video lessons, downloads and progress tracking.',
        'Worked against a shared design system delivered as a versioned private npm package, keeping every screen on one component, theming and typography contract.',
        'Built the offline and caching layer with SWR and MMKV so catalogue data and lesson progress survive dropped connections, backgrounding and app restarts.',
        'Integrated video playback with progress analytics, in-app purchases, push messaging and Google Sign-In, and tuned list virtualisation for long study sessions.',
        'Delivered urgent fixes without waiting for store review using CodePush over-the-air updates, with Sentry for crash and regression monitoring.',
      ],
      technologies: [
        'React Native',
        'React 19',
        'TypeScript',
        'SWR',
        'MMKV',
        'CodePush',
        'Firebase',
        'Sentry',
      ],
    },
    {
      id: 'bitpin',
      company: 'Bitpin',
      role: 'Full-Stack Engineer',
      period: '2022 – 2024',
      location: 'Remote',
      featured: true,
      description: [
        'Built and maintained the React interfaces and Python services used to run trading, payments and back-office operations across four products: bitpin.ir, Paymoon, Siba and Chortke.',
        'Kept high-churn market, order and balance screens correct under constant updates using React Query and Redux, where a stale render has a financial cost.',
        'Delivered Python services and APIs behind trading and administrative workflows, covering authentication, business rules and operational reporting.',
        'Diagnosed and fixed production incidents on a money-moving platform, following faults across the API and UI boundary rather than patching the symptom.',
      ],
      technologies: ['React', 'React Query', 'Redux', 'Python', 'SASS'],
    },
    {
      id: 'sinansoft',
      company: 'SinanSoft',
      role: 'Full-Stack Engineer (contract)',
      period: '2018 – Present',
      location: 'Remote, part-time',
      current: true,
      featured: true,
      description: [
        'Build and maintain the CIP / UniVoIP telecom operator portal, now at release v5.53: React with Material UI and MUI X Premium data grids, Keycloak single sign-on, embedded Cube.js and Superset analytics, live updates over STOMP, and Sentry release tracking.',
        'Deliver the subscription side of the same platform as event-driven Kafka workflows: phone-number provisioning and porting, Microsoft Teams onboarding, billing reconciliation and fax services.',
        'Delivered a portfolio of Next.js and React products: sinansoft.com, the SJI catalogue and admin console, LoanThem loan-management PWA, Centralive admin, and AIOP site and admin on Next.js with Tailwind CSS 4, Material UI and React Query.',
        'Built Know Yourself as a Django backend with a React Native client, owning both sides of the API contract.',
      ],
      technologies: [
        'React',
        'Material UI',
        'Keycloak',
        'Kafka',
        'Cube.js',
        'Next.js',
        'Django',
        'React Native',
        'Tailwind CSS',
      ],
    },
    {
      id: 'arvand-avid',
      company: 'Arvand Avid',
      role: 'Full-Stack Engineer',
      period: '2017 – 2018',
      location: 'Remote',
      description: [
        'Built NestJS and GraphQL (Apollo) APIs with Redis caching behind three products: Lernito, the Iknito scientific-journal workflow manager and the Troweb headless CMS.',
        'Built the Next.js frontends for the same products with React Query, Material UI and Emotion, all querying one GraphQL surface.',
      ],
      technologies: [
        'Next.js',
        'NestJS',
        'GraphQL',
        'Redis',
        'React Query',
        'Material UI',
      ],
    },
    {
      id: 'greenweb',
      company: 'Greenweb',
      role: 'Full-Stack Engineer',
      period: '2011 – 2017',
      location: 'Remote',
      description: [
        'Built and ran Chapiroos, a print-production, staffing and order-management system used daily by operations staff (PHP and MySQL, later React), and web systems for the hosting provider IranServer.',
      ],
      technologies: ['PHP', 'MySQL', 'React'],
    },
  ],
  projects: [
    {
      id: 'telescope',
      name: 'Telescope',
      description:
        'Social-listening platform: ingest → Kafka enrichment → Elasticsearch → React operator panel on Kubernetes.',
      company: 'Netbina',
      period: '2026 – Present',
      technologies: [
        'React',
        'Kafka',
        'Kubernetes',
        'Elasticsearch',
        'PostgreSQL',
        'Laravel',
      ],
      featured: true,
    },
    {
      id: 'seeplayshow',
      name: 'SeePlayShow',
      description:
        'Live show-control product: Django API, Node WebSockets, web live panel and AWS delivery across staging and production.',
      company: 'Netbina',
      period: '2026 – Present',
      technologies: ['Django', 'Node.js', 'WebSockets', 'AWS', 'GitHub Actions'],
      url: 'https://seeplayshow.com',
      featured: true,
    },
    {
      id: 'faradars',
      name: 'FaraDars',
      description:
        'React Native learning app (release 2.1.20): catalogue, video lessons, offline progress, IAP and OTA updates.',
      company: 'FaraDars',
      period: '2024 – 2026',
      technologies: [
        'React Native',
        'TypeScript',
        'SWR',
        'CodePush',
        'Firebase',
      ],
      featured: true,
    },
    {
      id: 'cip-univoip',
      name: 'CIP / UniVoIP',
      description:
        'Telecom operator portal and Kafka subscription workflows: numbering, Teams onboarding, billing sync and analytics.',
      company: 'SinanSoft',
      period: '2018 – Present',
      technologies: [
        'React',
        'Material UI',
        'Keycloak',
        'Kafka',
        'Cube.js',
        'Superset',
      ],
      featured: false,
    },
    {
      id: 'bitpin-exchange',
      name: 'Bitpin Exchange',
      description:
        'Cryptocurrency exchange, crypto shop and operations panels for trading and back-office workflows.',
      company: 'Bitpin',
      period: '2022 – 2024',
      technologies: ['React', 'React Query', 'Redux', 'Python'],
      url: 'https://bitpin.ir',
      featured: false,
    },
    {
      id: 'faranama',
      name: 'Faranama',
      description: 'Django, PostgreSQL and React admin — full-stack build.',
      technologies: ['Django', 'PostgreSQL', 'React'],
      featured: false,
    },
    {
      id: 'dealertouch',
      name: 'Dealertouch',
      description:
        'React and shadcn/ui admin plus a React Native app on GraphQL and Redux Toolkit.',
      technologies: [
        'React',
        'shadcn/ui',
        'React Native',
        'GraphQL',
        'Redux Toolkit',
      ],
      featured: false,
    },
    {
      id: 'kimdishop',
      name: 'KimdiShop',
      description:
        'Next.js and Tailwind CSS storefront with a PrimeReact admin console.',
      technologies: ['Next.js', 'Tailwind CSS', 'PrimeReact'],
      featured: false,
    },
    {
      id: 'neowshop',
      name: 'Neowshop',
      description: 'React Native client on Google Cloud services.',
      technologies: ['React Native', 'Google Cloud'],
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
