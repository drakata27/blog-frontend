import React from 'react'
import Profile from '../assets/profile-photo.jpg'
import Projects from '../utils/projects.json'
import GitHub from '../assets/github.png'
import Demo from '../assets/demo.webp'

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {

    useGSAP(()=>{
        gsap.fromTo('.about-container', {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          delay: 0.2,
          stagger: 0.1
        })
      }, [])

  return (
    <div className="about-container">
        <h1>About</h1>

        <div className="about-content horizontal-container">
            <div className='about-picture'>
                <img src={Profile} alt="Profile" />
            </div>

            <div className='about-text'>
                <p>
                    My name is Aleksandar and I am Computer Science undergraduate who excels in team-working and has 
                    strong communication and problem-solving skills demonstrated from working 
                    on online team projects as an intern at Spotify and Bright Network. 
                    I have used a range of languages, frameworks and development tools 
                    for developing personal projects outside of my studies. 
                </p>
            </div>
        </div>
        <div className="about-projects">
            <h1>Projects</h1>
            <div className="projects-container">
                {
                    Projects.map(project => (
                        <div className="horizontal-container">
                            <div key={project.id}>
                                <div>
                                    <img className="project-image" src={project.image} alt={project.title} />
                                </div>

                                <div className="project-content">
                                    <h3>{project.title}</h3>
                                    <p className='project-desc'>{project.description}</p>
                                    <p> 
                                        {project.tech.map((technology, index)=> (
                                            <span className='project-tech' key={index}>{technology}</span>
                                        ))}
                                    </p>
                                    {project.links.map(link => (
                                        <div className='project-links' key={project.id}>
                                            <a target='blank' href={link.web}>
                                                <img src={Demo} alt='demo'/>Demo</a>
                                            <a target='blank' href={link.github}>
                                                <img src={GitHub} alt='github'/>Github</a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default About