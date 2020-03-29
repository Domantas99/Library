import React, {Component} from "react";
import BookListItem from "./BookListItem";
import { connect } from "react-redux";
import {GET_BOOK_LIST} from '../store/library/actionTypes'

const mapStateToProps = state => {
    return {
        data: state.library.bookData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refresh: () => dispatch({type: GET_BOOK_LIST})
    }
}

const getBookSorter = (sort_field, sort_direction) => {
    return (a, b) => {
        return (a[sort_field] > b[sort_field] ? 1 : a[sort_field] < b[sort_field] ? -1: 0) * sort_direction;
    }
}

const getBookComponents = (data, sort_field, sort_direction) => {
    return [...data].sort(getBookSorter(sort_field, sort_direction)).map((element, index) => {
        return (<BookListItem key={index} data={element}/>)}
    );
}

class BookList extends Component {

    constructor(props) {
        super(props);

        this.state = {sort_field: "DateAdded", sort_direction: -1};
        this.handleChangeSortField = this.handleChangeSortField.bind(this);
        this.handleChangeSortDirection = this.handleChangeSortDirection.bind(this);
    }

    handleChangeSortField(event){
        this.setState({sort_field: event.target.value});
        this.forceUpdate();
    }

    handleChangeSortDirection(event){
        this.setState({sort_direction: parseInt(event.target.value)});
        this.forceUpdate();
    }

    componentDidMount = () => {
        this.props.refresh();
    }
    
    render = () => (
        <div className="library">
            <select id="book-list-sorting-field" defaultValue="DateAdded"onChange={this.handleChangeSortField}>
                <option value="Title">Title</option>
                <option value="ReleaseDate">Release Date</option>
                <option value="DateAdded">Date Added</option>
            </select>
            <select id="book-list-sorting-direction" defaultValue="-1" onChange={this.handleChangeSortDirection}>
                <option value="1">Ascending</option>
                <option value="-1">Descending</option>
            </select>
            <div className="book-list">
                {(this.props.data)? getBookComponents(this.props.data, this.state.sort_field, this.state.sort_direction): null} 
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);