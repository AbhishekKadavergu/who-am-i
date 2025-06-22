import React from "react";

const About = () => (
  <section id="about" className="py-12 px-4 md:px-12 text-center bg-primary-light dark:bg-primary-dark transition-colors duration-500 animate-fade-in">
    <img src="https://avatars.githubusercontent.com/u/9919?v=4" alt="Profile" className="mx-auto w-24 h-24 rounded-full shadow-lg mb-4 border-4 border-primary" />
    <h2 className="text-2xl font-bold mb-2 text-text-light dark:text-text-dark">Abhishek Kadavergu</h2>
    <p className="text-primary font-semibold mb-2">Frontend Developer | React Enthusiast</p>
    <p className="text-text-light dark:text-text-dark">Based in India. Currently working at XYZ Corp. Passionate about building beautiful, performant web apps.</p>
  </section>
);

export default About;
