import styles from './ProjectForm.module.css'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

function ProjectForm ({btnText}){
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
            />
            <SubmitButton text={btnText}/>

        </form>
    )
}

export default ProjectForm