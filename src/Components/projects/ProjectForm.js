import { useEffect, useState } from 'react'

import styles from './ProjectForm.module.css'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

function ProjectForm ({btnText}){

    const [categories, setCategories] = useState([])

    useEffect(() =>{
        fetch('http://localhost:5000/categories', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
        }).then((resp) => resp.json()
            ).then((data) => { setCategories(data) }
            ).catch((err) => console.log(err))
        }, [])

    return(
        <form className={styles.form}>
            <Input 
                name='name'
                type='text'
                placeholder='Insira o nome do projeto'
                text='Nome do Projeto:'
            />
            <Input
                name='budget'
                type='number'
                placeholder='Adicione o valor total do orçamento'
                text='Orçamento do projeto:'
            />
            <Select 
                name='category_id'
                text='Categoria'
                options={categories}
            />
            <SubmitButton text={btnText}/>

        </form>
    )
}

export default ProjectForm