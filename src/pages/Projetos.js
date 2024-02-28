import { useLocation } from "react-router-dom"
import { useState, useEffect } from 'react'
import Message from "../Components/layout/Message"
import styles from './Projetos.module.css'


import LinkButton from '../Components/layout/LinkButton'
import Container from '../Components/layout/Container'
import ProjectCard from "../Components/projects/ProjectCard"
import Loading from "../Components/layout/Loading"

function Projetos(){
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)

    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    useEffect(() => {
      setTimeout(() =>{
        fetch('http://localhost:5000/projects', {
        method:'GET',
        headers: {
          'Content-Type':'application/json'
        },
      }).then((resp) => resp.json())
        .then((data) => {
        setProjects(data)
        setRemoveLoading(true)
        console.log(data)
      }).catch((err) => console.log(err))
      }, 300)
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
            {!removeLoading && <Loading />}
            {removeLoading && projects.length === 0 && (
              <p>Não há projetos cadastrados!</p>
            )}
          </Container>
        </div>
      </div>
    )
}
export default Projetos