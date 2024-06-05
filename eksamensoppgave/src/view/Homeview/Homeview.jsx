/* eslint-disable react/prop-types */
import './Homeview.css';
import Article from '../../components/Article/Article'
import { useEffect, useState } from 'react';


function Homeview(props) {
    const [homeState, setHomeState] = useState(0);
    const [solutions, setSolutions] = useState([]);
    const [groups, setGroups] = useState([]);
    const colors = ["#00bbf2", "#AFE1AF", "#ff8b8e"];

    useEffect(() => {
        fetch('http://localhost:3000/solutions')
        .then(response => response.json())
        .then(data => setSolutions(data))
        .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/groups')
        .then(response => response.json())
        .then(data => setGroups(data))
        .catch(error => console.error(error));
    }, []);

    function searchFunction(event) {
        event.preventDefault();
        // const search = event.target.searchInput.value.toLowerCase();
        // if (search === "") {
        //     // If the search is empty, reset the solutions to the original list
        //     setSolutions(originalSolutions);
        // } else {
        //     const searchResults = solutions.filter((solution) => solution.title.toLowerCase().includes(search));
        //     setSolutions(searchResults);
        // }
    }

    async function countView(id) {
        const response = await fetch(`http://localhost:3000/solutions/views`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(data);
        } else {
            console.log(data);
        }
    }


    return ( 
        <>
            <section className='section-navigation'>
                <h3 onClick={() => setHomeState(0)}>Hjem</h3>
                <h3 onClick={() => setHomeState(1)}>Våres Solceller</h3>
                <h3 onClick={() => props.setState(1)}>Til login</h3>
            </section>

            <section className='section-content'>
                {homeState === 0 ? (
                    <>
                        <h1>Velkommen til hjemmesiden</h1>
                        <div className='div-home'>
                            <h2>Om Oss</h2>
                            <p>Solcellespesialisten er Norges største solcelleleverandør. <br /> <br />
                                Vårt mål er å levere kostnadsbesparende og fornybare energiløsninger til massene.

                                Vi skal levere og utvikle nye og rimelige energieffektive løsninger av høy kvalitet basert på fornybar energiteknologi. <br /><br />

                                Vår visjon er å redde klimaet med fornybar energi. Vi vil bli en ledende bidragsyter til en verden der alt energiforbruk er basert på fornybar energi.
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <h1>Her er våres solcelle artikler</h1>

                        <h2>Søk her ⬇️</h2>
                        <form className='seach-form' onSubmit={searchFunction}>
                            <input type="search" name='searchInput'/>
                            <button type='submit'>Søk</button>
                        </form>
                        <hr />

                        <h2>Artikler ⬇️</h2>
                        <hr />

                        {groups.map((group) => (
                            <section key={group.id}>
                                <h3>{group.type}</h3>

                                {solutions
                                    .filter((solution) => solution.id_group === group.id)
                                    .map((solution) => (
                                        <section
                                            key={solution.id_group}
                                            className='div-article'
                                            style={{ backgroundColor: colors[solution.id_group % colors.length] }}
                                            onMouseEnter={() => countView(solution.id)}>
                                            <Article
                                                key={solution.id}
                                                title={solution.title}
                                                text={solution.text}
                                                img={solution.img}/>
                                        </section>
                                ))}

                                <hr />
                            </section>
                        ))}

                    </>
                )}
            </section>
        </>
     );
}

export default Homeview;