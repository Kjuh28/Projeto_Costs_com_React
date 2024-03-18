import styles from './Projeto.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import ProjectForm from '../Components/projects/ProjectForm'

import Container from '../Components/layout/Container'
import Loading from '../Components/layout/Loading'
import Message from '../Components/layout/Message'

//testegitpushdopc


function Projeto(){
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [project, setProject] = useState([])
    const [message, setMessage] = useState()
    const [type, setType] = useState()
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

    function editForm(project){
        //Budget Validation
        if(project.budget < project.cost){
            //message
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return(false) 
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json())
        .then((data) =>{

            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto alterado com sucesso!')
            setType('success')            

        })
        .catch(err => console.log(err))
    }  

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }
    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    return(<>
        {project.name ? (
             <div className={styles.project_details}>
                <Container customClass = 'column'>
                    {message && <Message type={type} msg={message} />}
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
                                <ProjectForm 
                                    handleSubmit={editForm}
                                    btnText={'Concluir Edição'}
                                    projectData={project}
                                />
                            </div>
                        )}
                    </div>

                    <div className={styles.services_form_container}>
                        <h2>Adicione um Serviço:</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                        </button>
                        <div className={styles.projectInfo}>
                            {
                                showServiceForm && <div> Projeto vem aqui</div>
                            }
                        </div>                       
                    </div>

                    <h2>Serviços</h2>
                    <Container className='start'>
                        <p>Itens de Serviços</p>
                    </Container>
                </Container>
            </div>
        ) : (
            <Loading />
        )}
    </>   
    )
}

export default Projeto