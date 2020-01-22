import React from 'react';

class Login extends React.Component {

    render () {
        return (
            <div>
                <h1>Login</h1>
                <div>
                    <label htmlFor="username">Username</label><br></br>
                    <input type="text" name="username" placeholder="Username" />
                </div>
                <div>
                    <label htmlFor="password">Password</label><br></br>
                    <input type="password" name="password" placeholder="Password" />
                </div>
                    <input type="submit" value="Login" />
                    <input type="submit" value="Signup" />
            </div>
        )
    }

}

export default Login