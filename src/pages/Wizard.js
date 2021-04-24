import react, {useState, useEffect} from 'react'

const Wizard = () => {

    const [naam, setNaam] = useState('jonas')
    const [query, setQuery] = useState({
        search: false,
        filter: false,
        sort: false
    })
    const [step, setStep] = useState(0)

    useEffect(() => {
        console.log(query)
    }, [query])

    const updateQuery = (param, value) => {
        setQuery(prevState => ({...prevState, [param]: value}))
    }

    return(
        <div className="generic-wrapper wizard-container">
            <div className="wizard-info-section">
                {/*<h1>Dit is de wizard</h1>*/}
                <h2>Stap 1: Kies een type airco</h2>
                <p>Om deze keuze te maken moet je weten welk soort airco's er bestaan.</p>

                <h3>A. Mobiele airco's</h3>
                <p>Dit soort airco heeft verschillende voor- en nadelen. Hij is mobiel, wat ervoor zorgt dat je hem steeds kan verplaatsen naar waar hij het meest nodig is. Helaas leidt dit tot het feit dat zijn aansluiting niet met koelleidingen kan gebeuren maar dat hij de warme lucht langs een leiding door het raam blaast. Aangezien het praktisch onmogelijk is deze aansluiting volledig luchtdicht te maken en dat de technologie die hij gebruikt minder efficient is, verlies je veel koelkracht.</p>
                <p>Dit toestel zuigt kamerlucht aan, splitst deze in hete en koude lucht, blaast de koude lucht terug in de kamer en brengt de warme lucht naar buiten.</p>

                <h3>B. Monosplit airco's</h3>
                <p>Deze maakt gebruik van de meest efficiënte en meest voorkomende technologie voor airco's. Deze systemen bestaan uit 2 onderdelen; Een binnenunit en een buitenunit. De binnenunit zuigt kamerlucht aan, blaast deze door een gekoelde radiator en blaast de gekoelde lucht terug in de kamer.</p>
                <p>Door de lucht te koelen wordt de warmte afgegeven aan de radiator. Om ervoor te zorgen dat de radiator koel blijft en dus de kamer efficiënt kan blijven koelen, wordt er continu koelvloeistof doorgestuurd. Deze koelvloeistof vangt de warmte uit de radiator op en wordt door de leiding naar de buitenunit gepompt.</p>
                <p>De buitenunit voert dan de omgekeerde bewerking uit op de koelvloeistof; de warme koelvloeistof loopt door de radiator van de buitenunit en warmt deze op, vervolgens wordt door de ventilator van de buitenunit, de radiator verlost van zijn hitte en wordt de warmte dus in de buitenlucht gebracht.</p>
                <p>Op die manier wordt de koelvloeistof terug koud, door het afgeven van zijn warmte, en kan deze terug koelte naar de binnenunit brengen.</p>

                <h3>C. Multisplit airco's</h3>
                <p>De naam spreekt vanzelf, maar multisplit airco's zijn simpelweg hetzelfde als monosplit airco's met het verschil dat hier meerdere binnenunits op kunnen worden aangesloten.</p>
                <p>Meestal zal de term multisplit niet worden gebruikt, maar zal je een specifieke term per aantal units horen.</p>
                <ul>
                    <li>Monosplit: 1 binnenunit</li>
                    <li>Dualsplit: 2 binnenunits</li>
                    <li>Triosplit: 3 binnenunits</li>
                    <li>Quadrosplit: 4 binnenunits</li>
                    <li>Pentasplit, hexasplit, heptasplit, octasplit, ... (maar deze zijn eerder aan de exotische kant)</li>
                </ul>

                <h3>D. Monoblock airco's</h3>
                <p>De term "monoblock" is eigenlijk een overkoepelende term voor de technologie die gebruikt word. Het komt neer op dezelfde technologie die mobiele airco's gebruiken; de binnen en buitenunit in één toestel (binnenshuis) en vereist een luchtafvoer naar buiten.</p>
                <p>Een mobiele airco valt dus eigenlijk onder de categorie "monoblock". Maar er bestaan ook vaste toestellen die deze technologie gebruiken en bijvoorbeeld aan de muur kunnen bevestigd worden en aangezien deze niet mobiel zijn, wordt met "monoblock" meestal verwezen naar de vaste toestellen. Een ander voorbeeld van een monoblock is het type dat je vast door een raam bevestigd (maar dit zie je vooral in Amerika).</p>

                <h3>E. Warmtepomp</h3>
                <p>Een warmtepomp is een technologie die net zoals split-airco's werkt, maar de mogelijkheid heeft omgekeerd te werken en dus warmte naar binnen brengt door de koude via de buitenunit in de buitenlucht te brengen.</p>
                <p>Een gelijkaardige techniek komt oom voor bij monoblock en mobiele toestellen, maar wanneer iemand een warmtepomp koopt, gaat dit doorgaans over een mono- of multisplit airco met warmte-functionaliteit.</p>
                <p><span>weetje:</span> Er is al veel onderzoek gedaan naar warmtepompen en veel resultaten bewijzen dat deze een heel pak energiezuiniger zijn dan de klassieke centrale verwarming.</p>
            </div>
            <div className="wizard-form-section">
                <div className="wizard-form-section-step-container">
                    <h3>Welk type kiest u?</h3>
                    <div className={"wizard-ac-type-thumb "+(query.filter === 'mobile'||query.filter===false?"":"disabled")} onClick={() => updateQuery('filter', 'mobile')}>Mobiele airco</div>
                    <div className={"wizard-ac-type-thumb "+(query.filter === 'monosplit'||query.filter===false?"":"disabled")} onClick={() => updateQuery('filter', 'monosplit')}>Monosplit airco</div>
                    <div className={"wizard-ac-type-thumb "+(query.filter === 'multisplit'||query.filter===false?"":"disabled")} onClick={() => updateQuery('filter', 'multisplit')}>Multisplit airco</div>
                    <div className={"wizard-ac-type-thumb "+(query.filter === 'monoblock'||query.filter===false?"":"disabled")} onClick={() => updateQuery('filter', 'monoblock')}>Monoblock airco</div>
                    <div className={"wizard-ac-type-thumb "+(query.filter === 'heatpump'||query.filter===false?"":"disabled")} onClick={() => updateQuery('filter', 'heatpump')}>Warmtepomp airco</div>
                    <div className="wizard-next-step-container">
                        <button disabled={!query.filter}>Volgende stap</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Wizard
