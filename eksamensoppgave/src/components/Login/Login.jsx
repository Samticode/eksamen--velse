/* eslint-disable react/prop-types */
import { useEffect } from "react";

function Login(props) {

    useEffect(() => {
        fetch("http://localhost:3000/")
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
    }, []);

    async function loginHandleSubmit(event) {
        event.preventDefault();

        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: event.target.username.value,
                password: event.target.password.value,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            props.setCurrentUser(data);
            props.setState(2);
        } else {
            alert("Invalid credentials");
        }
    }

    async function signupHandleSubmit(event) {
        event.preventDefault();

        const response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: event.target.username.value,
                password: event.target.password.value,
                role: event.target.role.value,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("User created");
        } else {
            alert("User not created");
        }
    }

    return (
        <main>
            <h1>Login</h1>
            <form onSubmit={loginHandleSubmit}>
                <label htmlFor="username">Username </label>
                <input type="text" id="username" name="username" />
                <br />

                <label htmlFor="password">Password </label>
                <input type="password" id="password" name="password" />
                <br />
                
                <button>Login</button>
            </form>

            <br /> <br />

            {/* <h1>Signup</h1>
            <form onSubmit={signupHandleSubmit}>
                <label htmlFor="username">Username </label>
                <input required type="text" id="username" name="username" />
                <br />

                <label htmlFor="password">Password </label>
                <input required type="password" id="password" name="password" />
                <br />

                <label htmlFor="role">Role</label>
                <select required name="role" id="">
                    <option value="Salg">Salg</option>
                    <option value="Montering">Montering</option>
                </select> 
                <br />

                <button>Signup</button>
            </form>

            <br />
            <br /> */}

            <button onClick={() => props.setState(0)}>Back</button>
        </main>
    );
}

export default Login;