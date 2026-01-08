export type Skill = { name: string; icon: string; category?: string };

export const SKILLS: Skill[] = [
  { name: "JavaScript", icon: "/icons/javascript.svg", category: "language" },
  { name: "TypeScript", icon: "/icons/typescript.svg", category: "language" },
  { name: "React", icon: "/icons/react.svg", category: "framework" },
  { name: "Node.js", icon: "/icons/node.svg", category: "platform" },
  { name: "Angular", icon: "/icons/angular.svg", category: "framework" },
  { name: "AWS", icon: "/icons/aws.svg", category: "platform" },
  { name: "PostgreSQL", icon: "/icons/postgresql.svg", category: "database" },
  { name: "Docker", icon: "/icons/docker.svg", category: "tool" },
  { name: "Git", icon: "/icons/git.svg", category: "tool" },
  { name: "GitHub", icon: "/icons/github.svg", category: "tool" },
  { name: "HTML", icon: "/icons/html5.svg", category: "language" },
  { name: "CSS", icon: "/icons/css.svg", category: "language" },
  { name: "Jenkins", icon: "/icons/jenkins.svg", category: "tool" },
  { name: "SonarQube", icon: "/icons/sonarqube.svg", category: "tool" },
];

export default SKILLS;
