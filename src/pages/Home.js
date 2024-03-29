import LinkButton from '../Components/layout/LinkButton'
import savings from '../img/savings.svg'
import styles from './Home.module.css'

function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span> </h1>
            <p>Comece a genenciar os seus projetos agora mesmo!</p>
            <LinkButton to='/NovoProjeto'  text='Criar Projeto'/>
            <img src={savings} alt="Costs"></img>
        </section>
    )
}
export default Home