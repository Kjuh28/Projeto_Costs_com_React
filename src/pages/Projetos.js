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
    const [projectMessage, setProjectMessage] = useState('')

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

    function removeProject(id){
      
      fetch(`http://localhost:5000/projects/${id}`, {
        method:'DELETE',
        headers:{
          'Content-Type':'application/json'
        },
      }).then((resp) => resp.json())
      .then((data) => {
        setProjects(projects.filter((project) => project.id !== id))
        //message
        setProjectMessage('Projeto removido com sucesso!')
      })
      .catch( err => console.log(err))

    }

    return(
      <div className={styles.project_container}>
        <div className={styles.tittle_container}>
          <h1>Meus Projetos</h1>
          <LinkButton to="/NovoProjeto" text="Criar Projeto"/>
        </div>
        <div>
          {message && <Message type="success" msg={message} />}
          {projectMessage && <Message type="success" msg={projectMessage} />}
          <Container customClass=".start">
            {projects.length > 0 &&
              projects.map((project) => 
              <ProjectCard 
                id={project.id} 
                name={project.name}
                budget={project.budget}
                category={project.category.name}
                key={project.id}
                handleRemove={removeProject} 
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