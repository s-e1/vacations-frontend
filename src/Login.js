import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInName: '',
            signInPassword: ''
        }
    }
    onNameChange = (event) => {
        this.setState({ signInName: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }
    onSumbitSignIn = () => {
        if (!this.state.signInName || !this.state.signInPassword) {
            return;
        }
        fetch('http://localhost:3001/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.signInName,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.length === 4) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                } else {
                    console.log(user);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    render() {
        const { onRouteChange } = this.props;
        return (
            <div className='form'>
                <div id="sign_up" >
                    <h3 className="center">Sign In</h3>
                    <div >
                        <label htmlFor="username">User name: </label>
                        <input onChange={this.onNameChange}
                            type="text" name="username" id="username" />
                    </div>
                    <div >
                        <label htmlFor="password">Password: </label>
                        <input onChange={this.onPasswordChange}
                            type="password" name="password" id="password" />
                    </div>
                </div>
                <div className='flex'>
                    <input
                        type="submit"
                        value="Submit"
                        onClick={this.onSumbitSignIn} />
                    <button onClick={() => onRouteChange('register')} >Register</button>
                </div>
            </div >
        );
    }
}

export default Login;