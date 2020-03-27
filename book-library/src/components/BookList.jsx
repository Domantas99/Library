import React, {Component} from "react";
import BookListItem from "./BookListItem";
import { connect } from "react-redux";
import {GET_BOOK_LIST} from '../store/library/actionTypes'

const mapStateToProps = state => {
    return {data: state.library.bookData};
}

const mapDispatchToProps = dispatch => {
    return {
        refresh: () => dispatch({type: GET_BOOK_LIST})
    }
}

const getBookComponents = (data) => {
    return data.map((element, index) => {
        return (<BookListItem key={index} data={element}/>)}
    );
}

class BookList extends Component {

    componentDidMount = () => {
        this.props.refresh();
    }
    
    render = () => (
        <div className="book-list">
            {(this.props.data)? getBookComponents(this.props.data): null} 
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);