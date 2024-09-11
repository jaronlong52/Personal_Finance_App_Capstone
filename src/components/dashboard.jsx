import { useState } from 'react'
import './App.jsx'

function Tabs()  {
const [toggleState , setToggleState] = useState(1);

const toggleTab = () => {
    setToggleState(index);
}
    return (
        <div className="container">
            <div className="bloc-tabs">
                <div className={toogleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}
                >Dashboard</div>
                <div className={toogleState === 2 ? "tabs active-tabs" : "tabs"} 
                onClick={() => toggleTab(2)}
                >Income</div>
                <div className={toogleState === 3 ? "tabs active-tabs" : "tabs"} 
                onClick={() => toggleTab(3)}
                >Planning</div>
            </div>

            <div className="content-tabs">

                <div className={toogleState === 1 ? "tabs active-tabs" : "tabs"}>
                    <h2>Dashboard</h2>
                    <hr />
                    <p>
                        placeholder for dashboard info
                    </p>
                </div>

                <div className={toogleState === 2 ? "tabs active-tabs" : "tabs"}>
                    <h2>Income</h2>
                    <hr />
                    <p>
                        placeholder for income info page
                    </p>
                </div>

                <div className={toogleState === 3 ? "tabs active-tabs" : "tabs"}>
                    <h2>Planning</h2>
                    <hr />
                    <p>
                        placeholder for planning tab
                    </p>
                </div>

            </div>
        </div>
    )
}