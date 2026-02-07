export interface AboutBlock {
  title: string;
  content: string[];
}

export const ABOUT_BLOCKS: AboutBlock[] = [
  {
    title: "The long term view",
    content: [
      "I have always been more interested in how things last than how they start. In engineering, the real challenge is not building a feature today, but understanding how it will behave in two years. I focus on building things that are quiet, reliable, and easy to live with.",
    ],
  },
  {
    title: "Life outside the code editor",
    content: [
      "I find a lot of value in being a student of the game, whether I am playing badminton or table tennis. These sports are a simple reminder that progress is about the basics—learning how to move, how to stay patient, and how to show up. I try to carry that same mindset into my work, focusing on steady, honest improvement rather than rushing for a result.",
    ],
  },
  {
    title: "Balance from the wild",
    content: [
      "I also enjoy watching wildlife and nature documentaries. It is something I find calming. Over time, it has shaped how I think about patience, balance, and long term impact in a very quiet way. Nature is the perfect example of a system that works through cycles and steady adaptation rather than force.",
    ],
  },
  {
    title: "Environment over willpower",
    content: [
      "I have learned that willpower is a limited resource, so I try not to rely on it. Instead, I focus on my environment. Whether it is laying out gym gear the night before or organizing a project, I build systems that make the right choices feel automatic. If the friction is low, consistency follows.",
    ],
  },
  {
    title: "Building for humans",
    content: [
      "I bring this same mindset to my code. The goal is not just to ship fast, but to create a setup where doing the right thing is the easiest path for the team. Engineering is about building a sustainable environment where good work can happen every day without a struggle.",
    ],
  },
];

export const INTRO_HTML = `
<p class="text-lg leading-relaxed mb-6 text-[var(--brand-text)]">
  Hi, I’m <strong>Abhishek Kadavergu</strong>. I’m a software engineer who enjoys looking beyond features. I like
  spending time understanding how things behave, evolve, and hold up once they’re out in the real world.
</p>

<p class="text-lg leading-relaxed mb-6 text-[var(--brand-muted)]">
  I currently work at <strong>Airbus</strong> and previously at <strong>TCS</strong>, building backend micro-services and micro-frontends using Node.js, Angular, React, TypeScript, AWS, and PostgreSQL. What I enjoy most is the balance between building something useful today and making sure it still makes sense tomorrow.
</p>

<blockquote class="border-l-2 border-[var(--brand-orange)] pl-5 italic text-[var(--brand-muted)]">
  I’m interested in building things that quietly last.
</blockquote>
`;
