import './App.css';
import { useState } from 'react';
import Login from './components/Login/Login';
import Homeview from './view/Homeview/Homeview';
import EditorView from './view/EditorView/EditorView';

function App() {
    let [State, setState] = useState(1);
    let [CurrentUser, setCurrentUser] = useState({});
    let viewableComponent = <></>;

    if (State === 0) {
        viewableComponent = <Homeview state={State} setState={setState} currentUser={CurrentUser} setCurrentUser={setCurrentUser}/>;
    } else if (State === 1) {
        viewableComponent = <Login state={State} setState={setState} currentUser={CurrentUser} setCurrentUser={setCurrentUser}/>;
    } else if (State === 2) {
        viewableComponent = <EditorView state={State} setState={setState} currentUser={CurrentUser} setCurrentUser={setCurrentUser}/>;
    }

    return ( 
        <main>
            {viewableComponent}
        </main>
     );
}

export default App;