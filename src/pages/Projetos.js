import { useLocation } from "react-router-dom"
import Message from "../Components/layout/Message"

function Projetos(){
    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    return(
      <div>
        <h1>Mensagem</h1>
        {message && <Message type="success" msg={message} />}
      </div>
    )
}
export default Projetos