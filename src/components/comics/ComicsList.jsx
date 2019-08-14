import React, { PureComponent } from 'react';
import Spinner from '../commons/spinner/Spinner';
import Card from '../commons/card/Card';
import { isEmpty } from '../../utils';
//Redux
import { connect } from 'react-redux';
import { getComics } from '../../redux/actions/marvelActions';

import InfiniteScroll from 'react-infinite-scroll-component';

class ComicsList extends PureComponent {
    state = {
        list: [],
        limit: 20,
        offset: 0
    }

    //Load Caracters
    componentDidMount = () => {
        const { limit, offset } = this.state;
        this.props.getComics(limit, offset);

    }

    // Set list with
    componentDidUpdate = (prevProps) => {
        if (prevProps !== this.props) {
            this.setState({ list: [...this.state.list, ...this.props.comics] });
        }
    }

    //Fetchs new items
    fetchData = () => {
        const { limit, offset } = this.state;
        this.setState({ offset: limit + offset });
        //Prevents dupliate fetch if offset is = 0 again;
        if (offset === 0) {
            this.props.getComics(limit, (offset + limit));
        } else {
            this.props.getComics(limit, offset);
        }

    }

    render() {
        let content = <Spinner />

        const { errors, history } = this.props;

        //* Check if there are gobal errors, if so redirect to Errors page 
        if (!isEmpty(errors)) {
            history.push('/error-page');
        }

        const { list } = this.state;

        if (list.length > 0) {

            //* Removing duplicates from list
            const seen = new Set();
            const filteredList = list.filter(el => {
                const duplicate = seen.has(el.id);
                seen.add(el.id);
                return !duplicate;
            });

            content = (
                <InfiniteScroll
                    className="container grid my-4"
                    dataLength={list.length}
                    next={this.fetchData}
                    hasMore={true}
                    loader={<div className="my-4"><Spinner fullHeigh={false} /></div>}
                >
                    {filteredList.map((item, i) => <Card key={i} data={item} url='comic' />)}
                </InfiniteScroll>
            );

        }
        return content
    }
}

const mapStateToProps = (state) => ({
    comics: state.marvel.comics,
    errors: state.errors
});

export default connect(mapStateToProps, { getComics })(ComicsList);