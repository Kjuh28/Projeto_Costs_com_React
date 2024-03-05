import styles from './Projeto.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Container from '../Components/layout/Container'
import Loading from '../Components/layout/Loading'


function Projeto(){
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [project, setProject] = useState([])
    const { id } = useParams()
    
    useEffect(() =>{
       setTimeout(() =>{
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            }, 
        }, []).then((resp) => resp.json())
        .then((data) => {
            setProject(data)
        })
        .catch(err => console.log(err))
       }, 3000)
    })

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    return(<>
        {project.name ? (
             <div className={styles.project_details}>
                <Container customClass = 'column'>
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.projectInfo}>
                                <p><span>Category: </span> {project.category.name} </p>
                                <p><span>Orçamento total:</span> R${project.budget} </p>
                                <p><span>Orçamento utilizado: </span> R${project.cost}</p>
                            </div>
                        ) : (
                            <div className={styles.projectInfo}>
                                <p>Detalhes do Projeto</p>
                            </div>
                        )}
                    </div>
                   
                </Container>
            </div>
        ) : (
            <Loading />
        )}
    </>   
    )
}

export default Projeto