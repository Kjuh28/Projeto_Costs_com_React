import {parse, v4 as uuidv4} from 'uuid'

import styles from './Projeto.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import ProjectForm from '../Components/projects/ProjectForm'
import ProjectService from '../Components/service/ProjectService'

import Container from '../Components/layout/Container'
import Loading from '../Components/layout/Loading'
import Message from '../Components/layout/Message'
import ServiceCard from '../Components/service/ServiceCard'


function Projeto(){
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
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
            setServices(data.services)
        })
        .catch(err => console.log(err))
       }, 300)
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
    
    function createService(project){
        setMessage('')
        //last service
        const lastService = project.services[project.services.length -1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        // maximum value validation

        if(newCost > parseFloat(project.budget)){
            setMessage('Valor do projeto ultrapassado, verifique o custo do serviço!')
            setType('error')
            project.services.pop()
            return(false)
        }

        //update project
        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            }, body: JSON.stringify(project),
        }).then((resp) => resp.json())
        .then((data) =>{
            setShowServiceForm(false)
        })
        .catch(err => console.log(err))

    }

    function removeService(id, cost){
        setMessage('')

        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )
        
        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            }, body: JSON.stringify(projectUpdated)
        }).then((resp) => resp.json())
        .then((data) =>{
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço removido com sucesso!')
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
                                showServiceForm && (
                                    <ProjectService 
                                        handleSubmit={createService}
                                        btnText={'Adicione o Serviço'}
                                        projectData={project}
                                />
                                )
                                
                            }
                        </div>                       
                    </div>

                    <h2>Serviços</h2>
                    <Container className='start'>
                        {
                            services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ))

                        }
                        {
                            services.length === 0 && <p>Não há serviços Cadastrados!</p>
                        }
                        
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