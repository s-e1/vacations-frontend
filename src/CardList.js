import React from 'react';
import Card from './Card';
import './CardList.css';

const CardList = ({ userId, trips, following, onRouteChange, loadUser }) => {
    return (
        <div className='row'>
            {trips.map((_, i) => {
                return (
                    <Card
                        key={i}
                        id={trips[i].id}
                        description={trips[i].description}
                        location={trips[i].location}
                        img={trips[i].img}
                        begin={trips[i].begin}
                        end={trips[i].end}
                        price={trips[i].price}
                        userId={userId}
                        following={following.includes(trips[i].id) ?
                            true :
                            false}
                        onRouteChange={onRouteChange}
                        loadUser={loadUser}
                    />
                )
            })}
        </div>
    );
}

export default CardList;
