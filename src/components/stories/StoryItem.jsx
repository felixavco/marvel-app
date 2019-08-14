import React from 'react';
import { Link } from 'react-router-dom'

const StoryItem = ({ item }) => (
    <div className="history-item">
        <Link to={`story/${item.id}`}>{item.title}</Link>
    </div>
)


export default StoryItem
