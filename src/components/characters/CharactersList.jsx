import React, { Component, Fragment } from 'react';
import Spinner from '../commons/spinner/Spinner';
import Card from '../commons/card/Card';
//Redux
import { connect } from 'react-redux';
import { getCharacters } from '../../redux/actions/marvelActions';
import { setCharFilter } from '../../redux/actions/layoutActions';

import InfiniteScroll from 'react-infinite-scroll-component';

class CharactersList extends Component {
    state = {
        list: [],
        limit: 20,
        offset: 0
    }

    //Load Caracters on initial render
    componentDidMount = () => {
        const { limit, offset } = this.state;
        const { characterFilter } = this.props;
        this.props.getCharacters(limit, offset, characterFilter);

    }

    // Set list with
    componentDidUpdate = (prevProps) => {
        if (prevProps.characters !== this.props.characters) {
            this.setState({ list: [...this.state.list, ...this.props.characters] });
        }

        // if (prevProps.characterFilter !== this.props.characterFilter) {
        //     const { limit, offset } = this.state;
        //     const { characterFilter } = this.props;
        //     this.props.getCharacters(limit, offset, characterFilter);
        //     this.setState({ list: this.props.characters });
        // }
    }

    //Fetchs new items
    fetchData = () => {
        const { limit, offset } = this.state;
        const { characterFilter } = this.props;
        this.setState({ offset: limit + offset });
        //Prevents dupliate fetch if offset is = 0 again;
        if (offset === 0) {
            this.props.getCharacters(limit, (offset + limit), characterFilter);
        } else {
            this.props.getCharacters(limit, offset, characterFilter);
        }

    }

    render() {
        let content = <Spinner />

        const { list } = this.state;
        const { setCharFilter, characterFilter } = this.props;

        if (list.length > 0) {

            //* Removing duplicate objects from list
            const seen = new Set();
            const filteredList = list.filter(el => {
                const duplicate = seen.has(el.id);
                seen.add(el.id);
                return !duplicate;
            });

            let finterIcon = characterFilter ?
                            (<i className="fas fa-sort-alpha-down"></i>) :
                            (<i className="fas fa-sort-alpha-down-alt"></i>); 

            content = (
                <Fragment>
                    {/* <div className="container">
                        <h3 onClick={() => setCharFilter(characterFilter)} style={{ cursor: 'pointer' }} className="text-center my-2">
                            Filter&nbsp;&nbsp; {finterIcon}
                        </h3>
                    </div> */}
                    <InfiniteScroll
                        className="container grid mt-4 mb-5"
                        dataLength={list.length}
                        next={this.fetchData}
                        hasMore={true}
                        loader={<div className="my-"><Spinner fullHeigh={false} /></div>}
                    >
                        {filteredList.map((item, i) => <Card key={i} data={item} />)}
                    </InfiniteScroll>
                </Fragment>
            );

        }
        return content
    }
}

const mapStateToProps = (state) => ({
    characters: state.marvel.characters,
    characterFilter: state.layout.characterFilter
});

export default connect(mapStateToProps, { getCharacters, setCharFilter })(CharactersList);


