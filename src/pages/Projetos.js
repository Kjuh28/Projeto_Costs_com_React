import { useLocation } from "react-router-dom"
import { useState, useEffect } from 'react'
import Message from "../Components/layout/Message"
import styles from './Projetos.module.css'


import LinkButton from '../Components/layout/LinkButton'
import Container from '../Components/layout/Container'
import ProjectCard from "../Components/projects/ProjectCard"

function Projetos(){
    const [projects, setProjects] = useState([])

    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    useEffect(() => {
      fetch('http://localhost:5000/projects', {
        method:'GET',
        headers: {
          'Content-Type':'application/json'
        },
      }).then((resp) => resp.json())
        .then((data) => {
        setProjects(data)
        console.log(data)
      }).catch((err) => console.log(err))
    }, [])

    return(
      <div className={styles.project_container}>
        <div className={styles.tittle_container}>
          <h1>Meus Projetos</h1>
          <LinkButton to="/NovoProjeto" text="Criar Projeto"/>
        </div>
        <div>
          {/* <h1>Mensagem</h1> */}
          {message && <Message type="success" msg={message} />}
          <Container customClass=".start">
            {projects.length > 0 &&
              projects.map((project) => 
              <ProjectCard 
                id={project.id} 
                name={project.name}
                budget={project.budget}
                category={project.category.name}
                key={project.id} 
                />
            )}
          </Container>
        </div>
      </div>
    )
}
export default Projetos