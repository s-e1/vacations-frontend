import React from 'react';
import './Card.css';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            following: this.props.following
        }
    }
    onFollow = (id, userId) => {
        fetch('http://localhost:3001/follow', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userId,
                tripId: id
            })
        })
            .then(response => response.json())
            .then(res => {
                console.log(res);
                this.setState({ following: true })
            })
    }
    onUnFollow = (id, userId) => {
        fetch('http://localhost:3001/follow', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userId,
                tripId: id
            })
        })
            .then(response => response.json())
            .then(res => {
                console.log(res);
                this.setState({ following: false })
            })
    }
    onDelete = (id) => {
        console.log('delete', id);
        fetch(`http://localhost:3001/trip/${id}`, { method: 'DELETE' })
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
        const { following } = this.state;
        const { id, description, location, img, begin, end, price, userId, onRouteChange } = this.props;
        return (
            <div className={"column " + (following ? 'following' : undefined)}>
                <div>
                    {/* checks if user is admin, true shows edit and delete, false shows follow button */}
                    {userId === 1 ?
                        <div className='icons'>
                            <span onClick={() => onRouteChange('edit trip form', id, description, location, img, begin, end, price)} role="img" aria-label="pen" >🖊</span>
                            <span onClick={() => { this.onDelete(id) }} role="img" aria-label="cross mark">❌</span>
                        </div>
                        : (following ?
                            <button onClick={() => { this.onUnFollow(id, userId) }}>Unfollow</button> :
                            <button onClick={() => { this.onFollow(id, userId) }}>Follow</button>
                        )
                    }
                    <h3 className='textCenter'> {location}</h3>
                    <p> {description}</p>
                    <img src={img} alt='trips' />
                </div>
                <div>
                    <div>From: {begin}</div>
                    <div>Till: {end}</div>
                    <div>Price: ${price}.</div>
                </div>
            </div>
        )
    }
}

export default Card;