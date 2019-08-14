import React from 'react';
import { Link } from 'react-router-dom'

const StoryItem = ({ item }) => (
    <div className="history-item">
        <Link to={`story/${item.id}`}><h5>{item.title}</h5></Link>
        <small>{item.type}</small>
        <p className="lead">{item.description}</p>
    </div>
)


export default StoryItem
