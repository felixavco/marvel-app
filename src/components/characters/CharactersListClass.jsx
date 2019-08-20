import React, { Component, Fragment } from 'react';
import Spinner from '../commons/spinner/Spinner';
import Card from '../commons/card/Card';
import { isEmpty } from '../../utils';
import Breadcrumbs from '../commons/breadcrumbs/Breadcrumbs';

//Redux
import { connect } from 'react-redux';
import { getCharacters } from '../../redux/actions/marvelActions';
import { setCharFilter } from '../../redux/actions/layoutActions';

import InfiniteScroll from 'react-infinite-scroll-component';

class CharactersListClass extends Component {
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
        const { errors, history } = this.props;

        //* Check if there are gobal errors, if so redirect to Errors page 
        if (!isEmpty(errors)) {
            history.push('/error-page');
        }

        if (list.length > 0) {

            //* Removing duplicate objects from list
            const seen = new Set();
            const filteredList = list.filter(el => {
                const duplicate = seen.has(el.id);
                seen.add(el.id);
                return !duplicate;
            });


            content = (
                <Fragment>
                    <div className="container">
                        <Breadcrumbs elements={[{ path: '/', name: 'home' }]} current={'characters'} />
                    </div>
                    <InfiniteScroll
                        className="container grid mt-4 mb-5"
                        dataLength={list.length}
                        next={this.fetchData}
                        hasMore={true}
                        loader={<div className="my-"><Spinner fullHeigh={false} /></div>}
                    >
                        {filteredList.map(item => <Card key={item.id} data={item} />)}
                    </InfiniteScroll>
                </Fragment>

            );

        }
        return content
    }
}

const mapStateToProps = (state) => ({
    characters: state.marvel.characters,
    errors: state.errors
});

export default connect(mapStateToProps, { getCharacters, setCharFilter })(CharactersListClass);


