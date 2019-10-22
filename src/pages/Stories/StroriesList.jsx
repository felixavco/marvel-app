import React, { PureComponent } from 'react';
import Spinner from '../../components/commons/spinner/Spinner';
import StoryItem from './StoryItem';
import { isEmpty } from '../../utils';

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
        document.title = "Stories"
    }

    // Set list with
    componentDidUpdate = (prevProps) => {
        if (prevProps !== this.props) {
            this.setState({ list: this.props.stories });
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

            const Row = ({ index, style }) => (
                <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
                    <StoryItem item={list[index]} />
                </div>
            );

            content = (
                <List
                    className="stories-list container my-4"
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
    errors: state.errors
});

export default connect(mapStateToProps, { getStories })(StoriesList);