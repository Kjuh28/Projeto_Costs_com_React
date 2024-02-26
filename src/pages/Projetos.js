import { useLocation } from "react-router-dom"
import Message from "../Components/layout/Message"
import styles from './Projetos.module.css'

import LinkButton from '../Components/layout/LinkButton'

import Container from '../Components/layout/Container'

function Projetos(){
    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    return(
      <div className={styles.project_container}>
        <div className={styles.tittle_container}>
          <h1>Meus Projetos</h1>
          <LinkButton to="/NovoProjeto" text="Criar Projeto"/>
        </div>
        <div>
          {/* <h1>Mensagem</h1> */}
          {message && <Message type="success" msg={message} />}
          <Container customClass=".start">
            <p>Projetos...</p>
          </Container>
        </div>
      </div>
    )
}
export default Projetos