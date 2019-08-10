import React, { Component } from 'react';
import Spinner from '../commons/Spinner';
import Card from '../commons/card/Card';
//Redux
import { connect } from 'react-redux';
import { getCharacters } from '../../redux/actions/marvelActions';

class CharactersList extends Component {
    state = {
        list: [],
        limit: 20,
        offset: 0
    }

    componentDidMount = () => {
        const { limit, offset } = this.state;
        this.props.getCharacters(limit, offset);

    }

    componentDidUpdate = (prevProps) => {
        if (prevProps !== this.props) {
            this.setState({ list: this.props.characters });
        }
    }

    render() {
        let content = <Spinner />
        
        const { list } = this.state;

        if (list.length > 0) {

            content = (
                <div className="container grid">
                    {list.map(item => <Card key={item.id} data={item} />)}
                </div>
            )

        }
        return content
    }
}

const mapStateToProps = (state) => ({
    characters: state.marvel.characters
});

export default connect(mapStateToProps, { getCharacters })(CharactersList);


