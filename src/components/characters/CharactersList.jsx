import React, { PureComponent } from 'react';
import Spinner from '../commons/spinner/Spinner';
import Card from '../commons/card/Card';
//Redux
import { connect } from 'react-redux';
import { getCharacters } from '../../redux/actions/marvelActions';

import { FixedSizeList as List } from "react-window";


class CharactersList extends PureComponent {
    state = {
        list: [],
        limit: 100,
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

            const Row = ({ index, style }) => (
                <div style={style}>
                    {<Card data={list[index]} />}
                </div>
            );

            content = (
                <List
                    className="container mt-3"
                    height={window.innerWidth}
                    itemCount={list.length}
                    itemSize={260}
                    width={window.innerWidth}
                >
                    {Row}
                </List>

            )

        }
        return content
    }
}

const mapStateToProps = (state) => ({
    characters: state.marvel.characters
});

export default connect(mapStateToProps, { getCharacters })(CharactersList);


