import react, {useState, useEffect} from 'react'

const Wizard = () => {

    const [naam, setNaam] = useState('jonas')

    console.log('wizardlog')


    return(
        <div>
            <h1>Dit is de wizard</h1>
            <h2>Stap 1: Kies een type airco</h2>
            
        </div>
    )
}
export default Wizard
