const projects = [
    {
        id: 'coreelec-v2-mfe',
        title: 'CoreElec V2 - Micro Frontend Architecture',
        shortDesc: 'Built MFE foundation with React, Webpack & Single SPA enabling independent deployments for 10+ teams.',
        longDesc: `Architected a scalable Micro Frontend platform using React, Webpack Module Federation, and Single SPA. Developed root-config, sidebar navigation, topbar, and reusable component templates. Onboarded 10+ business teams with comprehensive guides, tooling, and CI/CD automation. Reduced release dependencies by 40% and onboarding time from 3–4 weeks to 1 week.`,
        role: 'Senior Full-Stack Engineer',
        year: 2025,
        tags: ['React', 'Webpack', 'Single SPA', 'Micro Frontends', 'TypeScript', 'AWS'],
        repo: null,
        demo: null,
        images: ['/projects/coreelec-v2-mfe.svg'],
        featured: true,
        highlights: [
            'Reduced release dependencies by 40%',
            'Onboarding time: 3–4 weeks → 1 week',
            'Onboarded 10+ teams independently',
            'Built reusable component templates'
        ]
    },
    {
        id: 'coreelec-auth-rbac',
        title: 'CoreElec Authentication & Authorization Platform',
        shortDesc: 'Built centralized identity & RBAC governance platform enabling 10+ microservices and micro frontends.',
        longDesc: `Designed and built a comprehensive authentication microservice and approval workflows using NestJS and PostgreSQL on AWS Lambda. Developed lib-auth-nestjs, a reusable security library standardizing token validation and RBAC across the entire ecosystem. Created Angular-based admin dashboards for approvals, revocations, and governance. Eliminated inconsistencies across microservices and established centralized identity & access control.`,
        role: 'Senior Full-Stack Engineer',
        year: 2024,
        tags: ['NestJS', 'PostgreSQL', 'AWS Lambda', 'Angular', 'TypeScript', 'JWT', 'RBAC'],
        repo: null,
        demo: null,
        images: ['/projects/coreelec-auth-rbac.svg'],
        featured: true,
        highlights: [
            'Centralized JWT identity for 10+ microservices',
            'Reusable auth library (lib-auth-nestjs)',
            'RBAC governance dashboards',
            'Eliminated duplicate implementations'
        ]
    },
    {
        id: 'capital-ingestion-services',
        title: 'Capital Ingestion Services - Event-Driven Pipeline',
        shortDesc: 'Designed SNS→SQS event-driven ingestion pipeline achieving 99.9%+ reliability with zero event loss.',
        longDesc: `Architected an event-driven data ingestion pipeline using AWS SNS, SQS with Dead Letter Queues, and Lambda functions. Integrated CeLogger for standardized tracing and built CloudWatch dashboards for observability. Achieved 99.9%+ reliability, eliminated event-loss scenarios, and significantly improved MTTD (Mean Time To Detect) and MTTR (Mean Time To Resolve).`,
        role: 'Backend Engineer',
        year: 2024,
        tags: ['AWS SNS', 'AWS SQS', 'AWS Lambda', 'Node.js', 'CloudWatch', 'Event-Driven'],
        repo: null,
        demo: null,
        images: ['/projects/capital-ingestion-services.svg'],
        featured: false,
        highlights: [
            '99.9%+ reliability achieved',
            'Zero event-loss with DLQ safety',
            'Improved observability & incident response',
            'Scalable event processing'
        ]
    },
    {
        id: 'cb-data-orchestration',
        title: 'CB Data Orchestration Service',
        shortDesc: 'Automated daily data merge, validation & SFTP delivery reducing processing time from hours to minutes.',
        longDesc: `Built NestJS microservice on OpenShift to automate critical data orchestration from APS and FIN systems. Implemented scheduling, validation, SFTP delivery, and notifications. Reduced daily processing time from hours to minutes and improved data accuracy for safety inspections across the organization.`,
        role: 'Backend Engineer',
        year: 2023,
        tags: ['NestJS', 'Node.js', 'OpenShift', 'SFTP', 'RabbitMQ', 'Scheduling'],
        repo: null,
        demo: null,
        images: ['/projects/cb-data-orchestration.svg'],
        featured: false,
        highlights: [
            'Hours → Minutes processing time',
            'Automated validation & delivery',
            'Mission-critical reliability',
            'Improved data accuracy'
        ]
    },
    {
        id: 'clinical-ops-portal',
        title: 'Clinical Operations Management Portal (COMP)',
        shortDesc: 'Built hospital operations system handling patient registration, OPD, IPD, billing, nursing & scheduling.',
        longDesc: `Developed major modules of an enterprise hospital management system including patient registration, OPD check-in workflows, doctor scheduling, nursing workflows, and bed/ward management. Implemented RBAC, comprehensive audit logging, event-driven notifications, and optimized dashboards. Improved operational workflow efficiency by ~30% and reduced manual scheduling errors across hospital teams.`,
        role: 'Full-Stack Engineer',
        year: 2022,
        tags: ['Angular', 'NestJS', 'PostgreSQL', 'AWS', 'TypeScript', 'RBAC', 'Audit Logging'],
        repo: null,
        demo: null,
        images: ['/projects/clinical-ops-portal.svg'],
        featured: true,
        highlights: [
            'Improved workflow efficiency by ~30%',
            'Reduced scheduling errors significantly',
            'RBAC & audit compliance implemented',
            'Multi-module healthcare system'
        ]
    },
    {
        id: 'sprintpulse',
        title: 'SprintPulse - Project Management Tool',
        shortDesc: 'Internal project management tool adopted by 10+ teams, replacing licensed tools.',
        longDesc: `Developed dashboards, sprint planning, reporting views, and role-based access features for an internal project management system. Enhanced UI/UX, improved load performance, and strengthened workflow automation. Adopted by 10+ teams, significantly improving productivity and eliminating reliance on external licensed tools.`,
        role: 'Full-Stack Engineer',
        year: 2021,
        tags: ['Angular', 'Node.js', 'Express', 'MongoDB', 'REST API', 'UI/UX'],
        repo: null,
        demo: null,
        images: ['/projects/sprintpulse.svg'],
        featured: false,
        highlights: [
            'Adopted by 10+ teams',
            'Eliminated licensed tool dependency',
            'Improved team productivity',
            'Enhanced performance & UX'
        ]
    },
    {
        id: 'portfolio-2025',
        title: 'Personal Portfolio Website',
        shortDesc: 'Full-stack portfolio with featured project showcase, dynamic filtering, search, and responsive design.',
        longDesc: `Built a modern portfolio website showcasing 6+ professional projects with advanced filtering, full-text search, and a featured project carousel. Features a dark/light theme toggle, error boundary for safety, comprehensive test coverage, and responsive design for mobile/tablet/desktop. Extracted project metadata from Word documents using Node.js, implemented reusable React components, and deployed on Vercel with Vite for optimized builds.`,
        role: 'Full-Stack Engineer',
        year: 2025,
        tags: ['React 19', 'Vite', 'Tailwind CSS', 'Vitest', 'Node.js', 'Responsive Design', 'Dark Mode'],
        repo: 'https://github.com/AbhishekKadavergu/who-am-i',
        demo: 'https://who-am-i-zeta.vercel.app/',
        images: ['/projects/portfolio-2025.svg'],
        featured: true,
        highlights: [
            'Dynamic project filtering & full-text search',
            'Featured carousel with navigation controls',
            'Dark/light theme with localStorage persistence',
            'Error boundary for production safety',
            'Comprehensive Vitest + RTL test coverage',
            'Mobile-first responsive design'
        ]
    }
];

export default projects;