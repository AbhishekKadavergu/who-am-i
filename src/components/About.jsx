import React from "react";

const About = () => (
  <section id="about" className="py-12 px-4 md:px-12 bg-primary-light dark:bg-primary-dark transition-colors duration-500 animate-fade-in">
    {/* Hero Section */}
    <div className="flex flex-col items-center mb-12">
      <img src="https://avatars.githubusercontent.com/u/9919?v=4" alt="Abhishek Kadavergu" className="w-32 h-32 rounded-full shadow-xl border-4 border-primary mb-4" />
      <h1 className="text-4xl font-extrabold text-primary mb-2">Abhishek Kadavergu</h1>
      <p className="text-lg text-text-light dark:text-text-dark font-medium mb-2">Full-Stack Developer | Cloud Enthusiast | Mentor</p>
      <span className="inline-block bg-primary text-black dark:text-yellow-300 px-4 py-1 rounded-full font-semibold shadow-md">Bangalore, India</span>
    </div>

    {/* Who Am I? */}
    <div className="max-w-2xl mx-auto bg-white/80 dark:bg-black/60 rounded-xl shadow-lg p-8 mb-10 text-left">
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">👋 Who Am I?</h2>
      <p className="mb-3 text-lg">Hi! I’m <span className="font-bold">Abhishek Kadavergu</span>, passionate about building things that matter and always eager to learn something new. My journey began after my MCA, and since then, I’ve grown from an Angular developer at TCS to a full-stack engineer at <span className="font-bold">Airbus</span>, working on microservices, micro frontends, and cloud-native solutions with AWS and PostgreSQL.</p>
      <blockquote className="border-l-4 border-primary pl-4 italic text-primary mb-2">“I love solving real-world problems and making tech accessible.”</blockquote>
    </div>

    {/* What I Do */}
    <div className="max-w-2xl mx-auto bg-white/80 dark:bg-black/60 rounded-xl shadow-lg p-8 mb-10 text-left">
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">💻 What I Do</h2>
      <ul className="list-disc list-inside mb-3 space-y-1">
        <li>Build <span className="font-semibold">full-stack apps</span> with clean user experiences.</li>
        <li>Automate workflows and pipelines for speed and reliability.</li>
        <li>Design cloud solutions with <span className="font-semibold">AWS</span> (Serverless, Lambda, S3, DynamoDB).</li>
      </ul>
      <p className="mb-1">My favorite tools: <span className="font-bold">Node.js</span>, <span className="font-bold">React</span>, <span className="font-bold">Angular</span>, <span className="font-bold">NestJS</span>, <span className="font-bold">TypeScript</span>.</p>
      <p className="mb-1">Currently geeking out on <span className="font-bold">DSA in Java</span> and diving deeper into AWS.</p>
    </div>

    {/* Beyond the Resume */}
    <div className="max-w-2xl mx-auto bg-white/80 dark:bg-black/60 rounded-xl shadow-lg p-8 mb-10 text-left">
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">🌱 Beyond the Resume</h2>
      <p className="mb-2">This site is more than a portfolio—it's a peek into what drives me outside of work:</p>
      <ul className="list-disc list-inside mb-3 space-y-1">
        <li>💡 <span className="font-semibold">Mentoring</span> new developers and sharing what I’ve learned.</li>
        <li>🏋️‍♂️ Hitting the <span className="font-semibold">gym</span> to stay sharp.</li>
        <li>🏸 Playing <span className="font-semibold">badminton</span> and <span className="font-semibold">cricket</span> to recharge.</li>
      </ul>
      <blockquote className="border-l-4 border-primary pl-4 italic text-primary">“Balance outside work sparks creativity in my code.”</blockquote>
    </div>

    {/* Why This Site? */}
    <div className="max-w-2xl mx-auto bg-white/80 dark:bg-black/60 rounded-xl shadow-lg p-8 text-left">
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">🚀 Why This Site?</h2>
      <ul className="list-disc list-inside mb-3 space-y-1">
        <li>Share my projects and growth journey.</li>
        <li>Highlight interests and skills beyond a job profile.</li>
        <li>Give a quick glimpse into who I am—not just as a developer, but as a person.</li>
      </ul>
      <p className="text-primary font-semibold">Let’s connect and build something awesome together!</p>
    </div>
  </section>
);

export default About;
