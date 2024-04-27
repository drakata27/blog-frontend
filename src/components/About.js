import React from 'react'
import Profile from '../assets/profile-photo.jpg'
import Projects from '../utils/projects.json'

const About = () => {
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
                                <div className="project-image">
                                    <img src={project.image} alt={project.title} />
                                </div>

                                <div className="project-content">
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <p>{project.tech}</p>
                                    {project.links.map(link => (
                                        <div key={project.id}>
                                            <a target='blank' href={link.github}>Github</a>
                                            <a target='blank' href={link.web}>See Online</a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                }

                <hr />
            </div>
        </div>
    </div>
  )
}

export default About