import ProjectForm from '../Components/projects/ProjectForm'
import styles from './NovoProjeto.module.css'

function NovoProjeto(){
    return(
        <div className={styles.projeto_container}>
            <h1>Crie Seu Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm btnText='Criar Projeto'/>
        </div>
    )
}
export default NovoProjeto