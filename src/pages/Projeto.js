import styles from './Projeto.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'


function Projeto(){
    const [project, setProject] = useState([])
    const { id } = useParams()
    
    useEffect(() =>{
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
    })
    return(
        <div>
            <p>{project.name}</p>
        </div>
    )
}

export default Projeto