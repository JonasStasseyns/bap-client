import Cookies from 'universal-cookie'
import {useHistory} from "react-router-dom";

const cookies = new Cookies()

const Logout = () => {
    const history = useHistory()
    localStorage.removeItem('jwt')
    window.location = '/'
    return (
        <h1>logout</h1>
    )
}
export default Logout
