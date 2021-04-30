import {useEffect, useState} from 'react'
import {decodeJWT, verifyJWT} from "../utils/JWT";
import {post} from "axios";
import Advice from "./auth/Advice";

const Wizard = () => {

    const [query, setQuery] = useState({
        install: false,
        filter: false,
        budget: false
    })
    const [step, setStep] = useState(0)
    const [message, setMessage] = useState('')

    useEffect(() => {
        console.log(query)
    }, [query])

    const updateQuery = (param, value) => {
        setQuery(prevState => ({...prevState, [param]: value}))
    }

    const finishWizard = async () => {
        console.log(query)
        if (query.budget && query.filter && query.install) {
            const advice = query
            localStorage.setItem('advice', JSON.stringify(advice))
            if(verifyJWT()){
                advice.uid = await decodeJWT().userId
                post(process.env.REACT_APP_API_BASE + '/advice', query).then(res => setStep(step+1))
            }else{
                setStep(step+1)
            }
        }
    }

    return (
        <div className="generic-wrapper">
            {step === 0 &&
            <div className="wizard-container">
                <div className="wizard-info-section">
                    <h2>Stap 1: Kies een type airco</h2>
                    <p>Om deze keuze te maken moet je weten welk soort airco's er bestaan.</p>

                    <h3>A. Mobiele airco's</h3>
                    <p>Dit soort airco heeft verschillende voor- en nadelen. Hij is mobiel, wat ervoor zorgt dat je hem
                        steeds kan verplaatsen naar waar hij het meest nodig is. Helaas leidt dit tot het feit dat zijn
                        aansluiting niet met koelleidingen kan gebeuren maar dat hij de warme lucht langs een leiding
                        door het raam blaast. Aangezien het praktisch onmogelijk is deze aansluiting volledig luchtdicht
                        te maken en dat de technologie die hij gebruikt minder efficient is, verlies je veel
                        koelkracht.</p>
                    <p>Dit toestel zuigt kamerlucht aan, splitst deze in hete en koude lucht, blaast de koude lucht
                        terug in de kamer en brengt de warme lucht naar buiten.</p>

                    <h3>B. Monosplit airco's</h3>
                    <p>Deze maakt gebruik van de meest efficiënte en meest voorkomende technologie voor airco's. Deze
                        systemen bestaan uit 2 onderdelen; Een binnenunit en een buitenunit. De binnenunit zuigt
                        kamerlucht aan, blaast deze door een gekoelde radiator en blaast de gekoelde lucht terug in de
                        kamer.</p>
                    <p>Door de lucht te koelen wordt de warmte afgegeven aan de radiator. Om ervoor te zorgen dat de
                        radiator koel blijft en dus de kamer efficiënt kan blijven koelen, wordt er continu
                        koelvloeistof doorgestuurd. Deze koelvloeistof vangt de warmte uit de radiator op en wordt door
                        de leiding naar de buitenunit gepompt.</p>
                    <p>De buitenunit voert dan de omgekeerde bewerking uit op de koelvloeistof; de warme koelvloeistof
                        loopt door de radiator van de buitenunit en warmt deze op, vervolgens wordt door de ventilator
                        van de buitenunit, de radiator verlost van zijn hitte en wordt de warmte dus in de buitenlucht
                        gebracht.</p>
                    <p>Op die manier wordt de koelvloeistof terug koud, door het afgeven van zijn warmte, en kan deze
                        terug koelte naar de binnenunit brengen.</p>

                    <h3>C. Multisplit airco's</h3>
                    <p>De naam spreekt vanzelf, maar multisplit airco's zijn simpelweg hetzelfde als monosplit airco's
                        met het verschil dat hier meerdere binnenunits op kunnen worden aangesloten.</p>
                    <p>Meestal zal de term multisplit niet worden gebruikt, maar zal je een specifieke term per aantal
                        units horen.</p>
                    <ul>
                        <li>Monosplit: 1 binnenunit</li>
                        <li>Dualsplit: 2 binnenunits</li>
                        <li>Triosplit: 3 binnenunits</li>
                        <li>Quadrosplit: 4 binnenunits</li>
                        <li>Pentasplit, hexasplit, heptasplit, octasplit, ... (maar deze zijn eerder aan de exotische
                            kant)
                        </li>
                    </ul>

                    <h3>D. Monoblock airco's</h3>
                    <p>De term "monoblock" is eigenlijk een overkoepelende term voor de technologie die gebruikt word.
                        Het komt neer op dezelfde technologie die mobiele airco's gebruiken; de binnen en buitenunit in
                        één toestel (binnenshuis) en vereist een luchtafvoer naar buiten.</p>
                    <p>Een mobiele airco valt dus eigenlijk onder de categorie "monoblock". Maar er bestaan ook vaste
                        toestellen die deze technologie gebruiken en bijvoorbeeld aan de muur kunnen bevestigd worden en
                        aangezien deze niet mobiel zijn, wordt met "monoblock" meestal verwezen naar de vaste
                        toestellen. Een ander voorbeeld van een monoblock is het type dat je vast door een raam
                        bevestigd (maar dit zie je vooral in Amerika).</p>

                    <h3>E. Warmtepomp</h3>
                    <p>Een warmtepomp is een technologie die net zoals split-airco's werkt, maar de mogelijkheid heeft
                        omgekeerd te werken en dus warmte naar binnen brengt door de koude via de buitenunit in de
                        buitenlucht te brengen.</p>
                    <p>Een gelijkaardige techniek komt oom voor bij monoblock en mobiele toestellen, maar wanneer iemand
                        een warmtepomp koopt, gaat dit doorgaans over een mono- of multisplit airco met
                        warmte-functionaliteit.</p>
                    <p><span>weetje:</span> Er is al veel onderzoek gedaan naar warmtepompen en veel resultaten bewijzen
                        dat deze een heel pak energiezuiniger zijn dan de klassieke centrale verwarming.</p>
                </div>
                <div className="wizard-form-section">
                    <div className="wizard-form-section-step-container">
                        <h3>Welk type kiest u?</h3>
                        <div
                            className={"wizard-ac-type-thumb " + (query.filter === 'mobile' || query.filter === false ? "" : "disabled")}
                            onClick={() => updateQuery('filter', 'mobile')}>Mobiele airco
                        </div>
                        <div
                            className={"wizard-ac-type-thumb " + (query.filter === 'monosplit' || query.filter === false ? "" : "disabled")}
                            onClick={() => updateQuery('filter', 'monosplit')}>Monosplit airco
                        </div>
                        <div
                            className={"wizard-ac-type-thumb " + (query.filter === 'multisplit' || query.filter === false ? "" : "disabled")}
                            onClick={() => updateQuery('filter', 'multisplit')}>Multisplit airco
                        </div>
                        <div
                            className={"wizard-ac-type-thumb " + (query.filter === 'monoblock' || query.filter === false ? "" : "disabled")}
                            onClick={() => updateQuery('filter', 'monoblock')}>Monoblock airco
                        </div>
                        <div
                            className={"wizard-ac-type-thumb " + (query.filter === 'heatpump' || query.filter === false ? "" : "disabled")}
                            onClick={() => updateQuery('filter', 'heatpump')}>Warmtepomp airco
                        </div>
                        <div className="wizard-next-step-container">
                            <button disabled={!query.filter} onClick={() => setStep(step + 1)}>Volgende stap</button>
                        </div>
                    </div>
                </div>
            </div>
            }
            {step === 1 &&
            <div className="wizard-container">
                <div className="wizard-info-section">
                    <h2>Stap 2: Hoe wil je hem plaatsen?</h2>
                    <p>Naast de verschillende toestel-types, zijn er ook verschillende mogelijkheden om hem te
                        installeren.</p>

                    <h3>A. Volledig door één onderneming</h3>
                    <p>Dit is de gemakkelijkste, maar minst flexibele oplossing. Wanneer je kiest om de aankoop,
                        plaatsing én opstart te laten verzorgen door één onderneming, heeft dit verschillende voor-en
                        nadelen;</p>

                    <div className="ul-flex-container">
                        <ul>
                            <h4>Voordelen</h4>
                            <li>De installateur regelt alles</li>
                            <li>Je hoeft geen keuzes te maken</li>
                            <li>Soms wordt hiervoor korting gegeven</li>
                            <li>Zekerheid dat het toestel geschikt is</li>
                        </ul>
                        <ul>
                            <h4>Nadelen</h4>
                            <li>Klein toestel aanbod</li>
                            <li>Deze bedrijven hebben vaak een wachtlijst</li>
                            <li>Vaak kiezen zij waar je buitenunit komt</li>
                            <li>Geen keuze welk merk airco en welke features je wil</li>
                        </ul>
                    </div>

                    <h3>B. Zelf aankopen, maar laten installeren en opstarten</h3>
                    <p>Deze optie neemt veel voordelen over van optie A, maar neemt een aantal nadelen weg;</p>

                    <div className="ul-flex-container">
                        <ul>
                            <h4>Voordelen</h4>
                            <li>De installateur kan advies geven bij de toestelkeuze</li>
                            <li>Je kan zelf kiezen welk toestel/merk je wil</li>
                            <li>Je kan specialere toestellen kiezen (bv. wifi bediening)</li>
                            <li>Je hoeft je nog steeds geen zorgen te maken over capaciteit en plaatsing</li>
                        </ul>
                        <ul>
                            <h4>Nadelen</h4>
                            <li>Sommige bedrijven willen enkel het volledige pakket verzorgen</li>
                            <li>Je dient zelf opzoekwerk te verrichten (of advies vragen)</li>
                            <li>Je moet zelf je ruimte(s) opmeten</li>
                            <li>Je verliest een eventuele korting</li>
                        </ul>
                    </div>

                    <h3>C. Zelf aankopen en installeren, maar laten opstarten</h3>
                    <p>Dit is enkel voor doe-het-zelvers, je kan je toestel en benodigdheden volledig zelf kiezen en
                        aankopen, en zo goed als zelf installeren. Het enige wat je niet zelf kan doen, is het
                        aansluiten van de koelleidingen.</p>
                    <p><span>let op! </span>Het is bij wet verplicht om de koelleidingen te laten aansluiten door een
                        technieker met het certificaat koeltechnieken (STEK). Doe je dit toch zelf, dan valt je systeem
                        niet onder garantie en eventuele schade veroorzaakt door je airco-systeem (bijvoorbeeld brand)
                        wordt door de meeste verzekeringen NIET vergoed.</p>

                    <div className="ul-flex-container">
                        <ul>
                            <h4>Voordelen</h4>
                            <li>De opstarter kan advies geven bij de toestelkeuze</li>
                            <li>Je kan zelf kiezen welk toestel/merk je wil</li>
                            <li>Je kan specialere toestellen kiezen (bv. wifi bediening)</li>
                            <li>Je kan hem plaatsen hoe en waar je wil in je huis.</li>
                        </ul>
                        <ul>
                            <h4>Nadelen</h4>
                            <li>Grotere bedrijven houden zich niet bezig met enkel opstarten</li>
                            <li>Je dient zelf opzoekwerk te verrichten (of advies vragen)</li>
                            <li>Je moet zelf je ruimte(s) opmeten</li>
                            <li>De kleine zelfstandigen die opstart van airco's doen, zijn moeiljk te vinden.</li>
                        </ul>
                    </div>
                </div>
                <div className="wizard-form-section">
                    <div className="wizard-form-section-step-container">
                        <h3>Wat laat je aan professionals over?</h3>
                        {query.filter === 'mobile' &&
                        <h6>Een mobiele airco vereist GEEN installatie en opstart, je kan wel opteren om een mobiele
                            airco vast te monteren door een op maat gemaakte opening in de muur, maar dan ben je beter
                            met een monoblock.</h6>
                        }
                        {query.filter !== 'mobile' &&
                        <div>
                            <div
                                className={"wizard-ac-type-thumb " + (query.install === 'auto' || query.install === false ? "" : "disabled")}
                                onClick={() => updateQuery('install', 'auto')}>Alles
                            </div>
                            <div
                                className={"wizard-ac-type-thumb " + (query.install === 'semi' || query.install === false ? "" : "disabled")}
                                onClick={() => updateQuery('install', 'semi')}>Enkel installatie en opstart
                            </div>
                            <div
                                className={"wizard-ac-type-thumb " + (query.install === 'manual' || query.install === false ? "" : "disabled")}
                                onClick={() => updateQuery('install', 'manual')}>Enkel opstart
                            </div>
                        </div>
                        }
                        <div className="wizard-next-step-container">
                            <button onClick={() => setStep(step - 1)}>Vorige stap</button>
                            <button disabled={!query.install} onClick={() => setStep(step + 1)}>Volgende stap</button>
                        </div>
                    </div>
                </div>
            </div>
            }
            {step > 1 &&
            <div className="wizard-container">
                <div className="wizard-info-section">
                    <h2>Stap 3: Wat is je budget?</h2>
                    <p>Nu heb je reeds het type airco gekozen alsook de installatiemethode. Als laatste stap moet je nog enkel je budget kiezen uit volgende segmenten.</p>

                    <h3>A. Lage prijsklasse</h3>
                    <p>Wij bieden geen toestellen aan van slechte kwaliteit. Wanneer je kiest voor een goedkoper toestel, zal je dit niet bekopen met koelcapaciteit, veiligheid of andere belangrijke factoren. In dit geval verlies je enkel kwaliteit in eigenschappen van de tweede graad. Deze zijn dan bijvoorbeeld het geluidsniveau, de tijd die het toestel nodig heeft om te om in te schakelen of het design.</p>

                    <h3>B. Prijs-kwaliteit</h3>
                    <p>Deze prijsklasse is nogal breed. Wanneer je hiervoor kiest kan je gerust zijn dat je betaalt voor wat je krijgt, maar je kan weinig betalen voor een basisklasse airco alsook tegen een hoge prijs voor een topkwaliteits airco betalen.</p>

                    <h3>C. Luxe toestellen</h3>
                    <p>Bij deze prijsklasse zal je meestal meer betalen voor luxueuse eigenschappen dan voor koelcapaciteit. Deze toestellen zijn dus duurder dan ze eigenlijk zouden mogen zijn, maar ze kunnen je specifieke noden vervullen. Indien je bijvoorbeeld wel een airco wil, maar deze mag absoluut geen lawaai maken, kan je zo'n toestel vinden in deze prijsklasse. Een ander voorbeeld zou een toestel met smart-home mogelijkheden kunnen zijn.</p>
                </div>
                <div className="wizard-form-section">
                    <div className="wizard-form-section-step-container">
                        <h3>Welk budget kies je?</h3>

                        <div>
                            <div
                                className={"wizard-ac-type-thumb " + (query.budget === 'low' || query.budget === false ? "" : "disabled")}
                                onClick={() => updateQuery('budget', 'low')}>Basisklasse
                            </div>
                            <div
                                className={"wizard-ac-type-thumb " + (query.budget === 'medium' || query.budget === false ? "" : "disabled")}
                                onClick={() => updateQuery('budget', 'medium')}>Prijs-kwaliteit
                            </div>
                            <div
                                className={"wizard-ac-type-thumb " + (query.budget === 'high' || query.budget === false ? "" : "disabled")}
                                onClick={() => updateQuery('budget', 'high')}>Luxe toestellen
                            </div>
                        </div>
                        <div className="wizard-next-step-container">
                            <button onClick={() => setStep(step - 1)}>Vorige stap</button>
                            <button disabled={!query.budget} onClick={finishWizard}>Indienen</button>
                        </div>
                    </div>
                </div>
            </div>
            }
            {step === 3 && <Advice/>}
        </div>
    )
};
export default Wizard
