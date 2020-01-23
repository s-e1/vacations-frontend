import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInFirstName: '',
            signInLastName: '',
            signInUserName: '',
            signInPassword: ''
        }
    }
    onFirstNameChange = (event) => {
        this.setState({ signInFirstName: event.target.value })
    }
    onLastNameChange = (event) => {
        this.setState({ signInLastName: event.target.value })
    }
    onUserNameChange = (event) => {
        this.setState({ signInUserName: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }
    onSumbitSignIn = () => {
        if (!this.state.signInFirstName || !this.state.signInLastName || !this.state.signInUserName || !this.state.signInPassword) {
            return;
        }
        fetch('http://localhost:3001/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstname: this.state.signInFirstName,
                lastname: this.state.signInLastName,
                username: this.state.signInUserName,
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
        return (
            <div className='form'>
                <div id="sign_up" >
                    <h3 className="center">Register</h3>
                    <div >
                        <label htmlFor="firstname">First Name: </label>
                        <input onChange={this.onFirstNameChange}
                            type="text" name="firstname" id="firstname" />
                    </div>
                    <div >
                        <label htmlFor="lastname">Last Name: </label>
                        <input onChange={this.onLastNameChange}
                            type="text" name="lastname" id="lastname" />
                    </div>
                    <div >
                        <label htmlFor="username">User name: </label>
                        <input onChange={this.onUserNameChange}
                            type="text" name="username" id="username" />
                    </div>
                    <div >
                        <label htmlFor="password">Password: </label>
                        <input onChange={this.onPasswordChange}
                            type="password" name="password" id="password" />
                    </div>
                </div>
                <div >
                    <input
                        type="submit"
                        value="Submit"
                        onClick={this.onSumbitSignIn} />
                </div>
            </div>
        );
    }
}
export default Register;