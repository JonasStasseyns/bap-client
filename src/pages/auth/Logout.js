import Cookies from 'universal-cookie'
import {useHistory} from "react-router-dom";

const cookies = new Cookies()

const Logout = () => {
    const history = useHistory()
    cookies.remove('jwt', {path:'/'})
    history.push('/')
    return (
        <h1>logout</h1>
    )
}
export default Logout
