/* eslint-disable react/prop-types */
import './EditorView.css';
import { useEffect, useState } from 'react';

function EditorView(props) {

    const [groups, setGroups] = useState([]);
    const [solutions, setSolutions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/groups')
        .then(response => response.json())
        .then(data => setGroups(data))
        .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/solutions')
        .then(response => response.json())
        .then(data => setSolutions(data))
        .catch(error => console.error(error));
    }, []);

    async function addGroup(event) {
        event.preventDefault();

        const response = await fetch("http://localhost:3000/groups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: event.target.type.value,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Group added");
        } else {
            alert("Group not added");
        }
    }

    async function addArticle(event) {
        event.preventDefault();

        const response = await fetch("http://localhost:3000/solutions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: event.target.title.value,
                text: event.target.text.value,
                img: event.target.img.value,
                id_group: event.target.role.value,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Article added");
        } else {
            alert("Article not added");
        }
    }

    async function editArticleSubmit(event) {
        event.preventDefault();

        const response = await fetch("http://localhost:3000/solutions", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: event.target.solutionId.value,
                title: event.target.newTitle.value,
                text: event.target.newText.value,
                img: event.target.newImg.value,
                id_group: event.target.newRole.value,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Article edited");
        } else {
            alert("Article not edited");
        }
    }

    async function deleteArticle(event, id) {
        event.preventDefault();

        const response = await fetch(`http://localhost:3000/solutions/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();

        if (response.ok) {
            alert("Article deleted");
        } else {
            alert("Article not deleted");
        }
    }

    async function editGroupSubmit(event) {
        event.preventDefault();

        const response = await fetch("http://localhost:3000/groups", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: event.target.groupId.value,
                type: event.target.newType.value,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Group edited");
        } else {
            alert("Group not edited");
        }
    }

    async function deleteGroup(event, id) {
        event.preventDefault();

        const response = await fetch(`http://localhost:3000/groups/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();

        if (response.ok) {
            alert("Group deleted");
        } else {
            alert("Group not deleted");
        }
    }


    if (props.currentUser.role === "Admin") {
        return ( 
            <>
                <h1>Hello {props.currentUser.username}. Welcome to {props.currentUser.role} controll center</h1>

                <section className='add-group-section add-section'>
                    <h2>Legg til ny gruppe for artikler</h2>
                    <form onSubmit={addGroup}>
                        <label htmlFor="type">Gruppe nvn </label>
                        <input required type="text" id="type" name="type" />
                        <br />

                        <button>Legg til gruppe</button>
                    </form>
                </section>
                <hr />
                <section className="add-article-section add-section">
                    <h2>Legg til ny artikel</h2>
                    <form onSubmit={addArticle}>
                        <label htmlFor="title">Titel </label>
                        <input required type="text" id="title" name="title" />
                        <br />

                        <label htmlFor="text">Tekst </label>
                        <textarea name="text" id="text"></textarea>
                        <br />

                        <label htmlFor="img">Bilde URL/lenke </label>
                        <input required type="text" id="img" name="img" />
                        <br />

                        <label htmlFor="role">Gruppe </label>
                        <select required name="role" id="">
                            {groups.map((group) => (
                                <option key={group.id} value={group.id}>{group.type}</option>
                            ))}
                        </select> 
                        <br />

                        <button>Legg til artikel</button>
                    </form>
                </section>
                <hr />
                <section className="edit-group-section">
                    <h2>Redigere hver gruppe</h2>
                    <section className='flex-section'>
                        {groups.map((group) => (
                            <form onSubmit={editGroupSubmit} key={group.id}>
                                <input type="hidden" value={group.id} name="groupId" />
                                <input type="text" id='newType' name='newType' defaultValue={group.type}/>
                                <button>Lagre</button>
                                <button onClick={() => deleteGroup(event, group.id)}>Slette</button>
                            </form>
                        ))}
                    </section>
                </section>
                <hr />
                <section className='edit-post-section'>
                    <h2>Redigere hver artikel</h2>
                    <section className='flex-section'>

                        {solutions.map((solution) => (
                            <form onSubmit={editArticleSubmit} key={solution.id}>
                                <input type="hidden" value={solution.id} name="solutionId" />
                                <input type="text" id='newTitle' name='newTitle' defaultValue={solution.title}/>
                                <select name="newRole" id="newRole" defaultValue={solution.id_group}>
                                    {groups.map((group) => (
                                        <option key={group.id} value={group.id}>{group.type}</option>
                                    ))}
                                </select>
                                    <textarea name="newText" id="newText" defaultValue={solution.text}></textarea>
                                    <input type="text" id="newImg" name="newImg" defaultValue={solution.img}/>
                                    <button>Lagre</button>
                                    <button onClick={() => deleteArticle(event, solution.id)}>Slette</button>
                            </form>
                        ))}
                    </section>
                </section>
                <hr />
                <button onClick={() => props.setState(0)}>Tilbake</button>
            </>
         );
    } else {
        return (
            <>
                <h1>Hello {props.currentUser.username}. Welcome to {props.currentUser.role} controll center</h1>

                <section className='add-group-section add-section'>
                    <h2>Legg til ny gruppe for artikler</h2>
                    <form onSubmit={addGroup}>
                        <label htmlFor="type">Gruppe nvn </label>
                        <input required type="text" id="type" name="type" />
                        <br />

                        <button>Legg til gruppe</button>
                    </form>
                </section>
                <hr />
                <section className="add-article-section add-section">
                    <h2>Legg til ny artikel</h2>
                    <form onSubmit={addArticle}>
                        <label htmlFor="title">Tittel </label>
                        <input required type="text" id="title" name="title" />
                        <br />

                        <label htmlFor="text">Tekst </label>
                        <textarea name="text" id="text"></textarea>
                        <br />

                        <label htmlFor="img">Bilde URL/lenke </label>
                        <input required type="text" id="img" name="img" />
                        <br />

                        <label htmlFor="role">Gruppe </label>
                        <select required name="role" id="">
                            {groups.map((group) => (
                                <option key={group.id} value={group.id}>{group.type}</option>
                            ))}
                        </select> 
                        <br />

                        <button>Legg til artikel</button>
                    </form>
                </section>
                <hr />
                <button onClick={() => props.setState(0)}>Tilbake</button>
            </>
        );
    }
}

export default EditorView;