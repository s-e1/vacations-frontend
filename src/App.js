import React, { Component } from 'react';
import Navigation from './Navigation';
import Login from './Login';
import Register from './Register';
import CardList from './CardList';
import AddTrip from './AddTrip';
import EditTrip from './EditTrip';
import Graph from "./Graph";
import './App.css';

const initialState = {
    isSignedIn: false,
    route: 'signin',
    userId: '',
    username: '',
    trips: []
}
class App extends Component {
    constructor() {
        super()
        this.state = initialState;
    }
    //sets users state with data received from server 
    loadUser = data => {
        this.setState({
            userId: data[0],
            username: data[1],
            trips: data[2],
            following: data[3]
        })
    }
    //changes route
    onRouteChange = (route, editId = undefined, editDescription = undefined, editLocation = undefined, editImg = undefined, editBegin = undefined, editEnd = undefined, editPrice = undefined) => {
        if (route === 'signout') {
            this.setState(initialState)
        } else if (route === 'home') {
            this.setState({ isSignedIn: true })
        } else if (route === 'edit trip form') {
            this.setState({ editId, editDescription, editLocation, editImg, editBegin, editEnd, editPrice })
        }
        this.setState({ route: route })
    }
    render() {
        const { isSignedIn, route, trips, userId, username, following, editId, editDescription, editLocation,
            editImg, editBegin, editEnd, editPrice } = this.state;
        return (
            <div  >
                <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} username={username} />
                {(() => {
                    switch (route) {
                        case 'home':
                            return <div>
                                <h1 className='textCenter'>Trips</h1>
                                <CardList trips={trips} userId={userId} following={following} onRouteChange={this.onRouteChange}
                                    loadUser={this.loadUser} />
                            </div>;
                        case 'register':
                            return <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />;
                        case 'add trip form':
                            return <AddTrip loadUser={this.loadUser} onRouteChange={this.onRouteChange} />;
                        case 'edit trip form':
                            return <EditTrip editId={editId} editDescription={editDescription} editLocation={editLocation}
                                editImg={editImg} editBegin={editBegin} editEnd={editEnd} editPrice={editPrice}
                                loadUser={this.loadUser} onRouteChange={this.onRouteChange} />;
                        case 'graph':
                            return <Graph />;
                        default:
                            return <Login onRouteChange={this.onRouteChange} loadUser={this.loadUser} />;
                    }
                })()}
            </div>
        );
    }
}
export default App;