import React from 'react';

const initialState = {
    description: '',
    location: '',
    img: '',
    begin: '',
    end: '',
    price: ''
}
class AddTrip extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }
    onSumbitSend = () => {
        const { description, location, img, begin, end, price } = this.state;
        if (!description || !location || !img || !begin || !end || !price) {
            return
        }
        this.setState(initialState);
        fetch('http://localhost:3001/trip', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description, location, img, begin, end, price
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
        const { description, location, img, begin, end, price } = this.state;
        return <div>
            <div className='form tripForm'>
                <div >
                    <h3 className="center">Add Trip</h3>
                    <div >
                        <label htmlFor="description">Description: </label>
                        <input
                            type="text" name="description" id="description" onChange={this.handleInputChange}
                            value={description} />
                    </div>
                    <div >
                        <label htmlFor="location">Location: </label>
                        <input
                            type="text" name="location" id="location" onChange={this.handleInputChange}
                            value={location} />
                    </div>
                    <div >
                        <label htmlFor="img">Image Url: </label>
                        <input
                            type="text" name="img" id="img" onChange={this.handleInputChange} value={img} />
                    </div>
                    <div >
                        <label htmlFor="begin">Begin Date: </label>
                        <input
                            type="text" name="begin" id="begin" onChange={this.handleInputChange} value={begin} />
                    </div>
                    <div >
                        <label htmlFor="end">End Date: </label>
                        <input
                            type="text" name="end" id="end" onChange={this.handleInputChange} value={end} />
                    </div>
                    <div >
                        <label htmlFor="price">Price: </label>
                        <input
                            type="text" name="price" id="price" onChange={this.handleInputChange} value={price} />
                    </div>
                </div>

                <div className='flex'>
                    <input
                        type="submit"
                        value="Submit"
                        onClick={this.onSumbitSend}
                    />
                </div>
            </div >
        </div>
    }
}

export default AddTrip;