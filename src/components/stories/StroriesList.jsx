import React, { PureComponent } from 'react';
import Spinner from '../commons/spinner/Spinner';
import Card from '../commons/card/Card';
//Redux
import { connect } from 'react-redux';
import { getStories } from '../../redux/actions/marvelActions';

import { FixedSizeList as List } from 'react-window';


class StoriesList extends PureComponent {
    state = {
        list: [],
        limit: 100,
        offset: 0
    }

    //Load Caracters
    componentDidMount = () => {
        const { limit, offset } = this.state;
        this.props.getStories(limit, offset);
    }

    // Set list with
    componentDidUpdate = (prevProps) => {
        if (prevProps !== this.props) {
            this.setState({ list: this.props.stories });
        }
    }


    render() {
        let content = <Spinner />

        const { list } = this.state;

        if (list.length > 0) {

            const Row = ({ index, style }) => (
                            <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
                                {list[index].title}
                            </div>
                        );

            content = (
                <List
                    className="stories-list container"
                    height={window.innerHeight - 100}
                    itemCount={list.length}
                    itemSize={50}
                    width={window.innerWidth}
                >
                    {Row}
                </List>
            );

        }
        return content
    }
}

const mapStateToProps = (state) => ({
    stories: state.marvel.stories,
});

export default connect(mapStateToProps, { getStories })(StoriesList);