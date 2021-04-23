import Cookies from 'universal-cookie'
import {useHistory} from "react-router-dom";

const cookies = new Cookies()

const Logout = () => {
    const history = useHistory()
    cookies.remove('jwt')
    history.push('/')
    return true
}
export default Logout
