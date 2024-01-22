import ProjectForm from '../Components/projetcts/ProjectForm'
import styles from './Projetos.module.css'

function Projetos(){
    return(
        <div className={styles.projeto_container}>
            <h1>Crie Seu Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm />
        </div>
    )
}
export default Projetos