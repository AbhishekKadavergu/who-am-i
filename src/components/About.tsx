import React from "react";

const skills = [
  { name: "JavaScript", icon: "/icons/javascript.png" },
  { name: "TypeScript", icon: "/icons/typescript.png" },
  { name: "React", icon: "/icons/react.png" },
  { name: "Node.js", icon: "/icons/node.png" },
  { name: "Angular", icon: "/icons/angular.png" },
  { name: "AWS", icon: "/icons/aws.png" },
  { name: "PostgreSQL", icon: "/icons/postgresql.png" },
  { name: "Docker", icon: "/icons/docker.png" },
  { name: "Git", icon: "/icons/git.png" },
  { name: "GitHub", icon: "/icons/github.png" },
  { name: "HTML", icon: "/icons/html5.png" },
  { name: "CSS", icon: "/icons/css.png" },
  { name: "Jenkins", icon: "/icons/jenkins.png" },
  { name: "SonarQube", icon: "/icons/sonarqube.png" },
];

const About: React.FC = () => (
  <section
    id="about"
    className="py-12 px-4 md:px-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-500 animate-fade-in"
  >
    {/* Hero Section */}
    <div className="flex flex-col items-center mb-12">
      <img
        src="https://avatars.githubusercontent.com/u/59202659?v=4"
        alt="Abhishek Kadavergu"
        className="w-32 h-32 rounded-full shadow-xl border-4 border-primary mb-4"
      />
      <h1 className="text-4xl font-extrabold text-primary mb-2">
        Abhishek Kadavergu
      </h1>
      <p className="text-lg text-gray-800 dark:text-yellow-200 font-medium mb-2">
        Full-Stack Developer | JavaScript • TypeScript • React • Node • AWS
      </p>
      <span className="inline-block bg-primary text-black dark:bg-yellow-400 dark:text-gray-900 px-4 py-1 rounded-full font-semibold shadow-md">
        Bangalore, India
      </span>
    </div>

    {/* Who Am I? */}
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-10 text-left">
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-primary dark:text-yellow-400">
        👋 Who Am I?
      </h2>
      <p className="mb-3 text-lg text-gray-700 dark:text-yellow-100">
        Hi — I’m <span className="font-bold">Abhishek Kadavergu</span>. I build
        practical software that helps teams move faster and reduces everyday
        friction. After completing my MCA I worked with Angular at{" "}
        <span className="font-bold">TCS</span> and later moved into full-stack
        roles where I design and ship reliable, maintainable systems.
      </p>

      <p className="mb-3 text-lg text-gray-700 dark:text-yellow-100">
        Today I work at <span className="font-bold">Airbus</span>, contributing
        to microservices, micro frontends, and cloud-first solutions using
        Node.js, Angular, React, TypeScript, AWS and PostgreSQL. I focus on
        clear architecture and reusable tooling — small investments that pay off
        across teams.
      </p>

      <blockquote className="border-l-4 border-primary dark:border-yellow-400 pl-4 italic text-primary dark:text-yellow-400 mb-2">
        “I like building things that are simple, reliable, and useful.”
      </blockquote>
    </div>

    {/* What I Do */}
    <div className="max-w-2xl mx-auto bg-yellow-50 dark:bg-gray-700 rounded-xl shadow-lg p-8 mb-10 text-left">
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
        💻 What I Do
      </h2>
      <ul className="list-disc list-inside mb-3 space-y-1 text-gray-800 dark:text-yellow-100">
        <li>
          Build <span className="font-semibold">full-stack applications</span>{" "}
          with clear, maintainable architecture.
        </li>
        <li>Create workflows and automation that improve team efficiency.</li>
        <li>
          Design and deploy cloud solutions on{" "}
          <span className="font-semibold">AWS</span>.
        </li>
        <li>
          Build reusable libraries, shared components, and standards for large
          teams.
        </li>
        <li>
          Tools I use: <span className="font-bold">Node.js</span>,{" "}
          <span className="font-bold">React</span>,{" "}
          <span className="font-bold">Angular</span>,{" "}
          <span className="font-bold">TypeScript</span>.
        </li>
        <li>Currently improving on system design, cloud patterns, and DSA.</li>
      </ul>
    </div>

    {/* Beyond the Resume */}
    <div className="max-w-2xl mx-auto bg-blue-50 dark:bg-blue-900 rounded-xl shadow-lg p-8 mb-10 text-left">
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-300">
        🌱 Beyond the Resume
      </h2>
      <p className="mb-2 text-gray-800 dark:text-blue-100">
        I focus on routines that keep me effective and curious:
      </p>
      <ul className="list-disc list-inside mb-3 space-y-1 text-gray-800 dark:text-blue-100">
        <li>Mentoring new developers and sharing practical learnings.</li>
        <li>Staying active — gym, badminton, and cricket.</li>
        <li>
          Exploring architecture, cloud patterns, and algorithms in my free
          time.
        </li>
      </ul>
      <blockquote className="border-l-4 border-blue-400 dark:border-blue-300 pl-4 italic text-blue-700 dark:text-blue-300">
        “Consistency outside work helps me stay consistent inside work.”
      </blockquote>
    </div>

    {/* Why This Site? */}
    <div className="max-w-2xl mx-auto bg-green-50 dark:bg-green-900 rounded-xl shadow-lg p-8 text-left mb-12">
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-green-700 dark:text-green-300">
        🚀 Why This Site?
      </h2>
      <ul className="list-disc list-inside mb-3 space-y-1 text-gray-800 dark:text-green-100">
        <li>Show practical project work and the thinking behind it.</li>
        <li>Share skills and patterns I use to build reliable systems.</li>
        <li>Offer a straightforward view of who I am and how I work.</li>
      </ul>
      <p className="text-green-700 dark:text-green-300 font-semibold">
        If my approach resonates, I’d be glad to connect and collaborate.
      </p>
    </div>

    {/* Skills Marquee */}
    {/* Skills — premium marquee */}
    <div className="w-full py-8 px-6 bg-gradient-to-r from-white to-yellow-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl relative overflow-hidden">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary dark:text-yellow-400">
        Skills
      </h2>

      <div
        className="relative"
        aria-hidden={false}
        role="region"
        aria-label="Skills marquee"
      >
        {/* marquee track (duplicated list for seamless loop) */}
        <div className="marquee-track" aria-hidden="true">
          <div className="marquee-group">
            {skills.map((skill) => (
              <div key={skill.name} role="listitem" className="skill-chip">
                <div className="skill-icon">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="skill-label">{skill.name}</div>
              </div>
            ))}
          </div>

          {/* duplicate for seamless loop */}
          <div className="marquee-group" aria-hidden="true">
            {skills.map((skill) => (
              <div key={`${skill.name}-dup`} className="skill-chip">
                <div className="skill-icon">
                  <img
                    src={skill.icon}
                    alt=""
                    aria-hidden="true"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="skill-label">{skill.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* subtle shimmer overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-0 lg:opacity-30 shimmer" />
      </div>
    </div>
  </section>
);

export default About;
