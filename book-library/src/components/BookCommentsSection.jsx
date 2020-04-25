import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../store/comments/actions"; 
import BookCommentComponent from "./BookCommentComponent";
import { getFieldSorter} from "../utilities";

export default ({id, initPage = 1, commentsPerPage = 5}) => {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments.comments);
    const total = useSelector((state) => state.comments.total);
    const [ page, setPage ] = useState(initPage);
    const [ sortField, setSortField ] = useState("createdOn");
    const [ sortDirection, setSortDirection ] = useState(-1);
    const [ commentComponents, setCommentComponents ] = useState([]);
    const [ navButtons, setNavButtons ] = useState([]);

    const generateCommentComponents = (comments, page, commentsPerPage, sortField, sortDirection) => {
        let start = commentsPerPage * (page - 1);
        let end  = start + commentsPerPage;
        return [...comments].sort(getFieldSorter(sortField, sortDirection)).slice(start, end).map((comment) => {
            return <BookCommentComponent key={comment.id} data={comment}/>
        });
    }
    
    const generateNavButtons = (page, commentsPerPage, total) => {
        let buttons = [];
        let maximum = Math.ceil(total/commentsPerPage);
        buttons.push(<button key="prev" className="comments__button-step" disabled={!(page > 1)} onClick={()=> {setPage(page - 1)}}>&lt; Prev</button>)
        if ( page > 1) {
            if ( page > 2 && page === maximum) {
                buttons.push(<button key={page - 2} className="comments__button-number" onClick={()=> {setPage(page - 2)}}>{page - 2}</button>);
            }
            buttons.push(<button key={page - 1} className="comments__button-number" onClick={()=> {setPage(page - 1)}}>{page - 1}</button>);
        }
        buttons.push(<button key={page} className="comments__button-current">{page}</button>)
        if ( page < maximum) {
            buttons.push(<button key={page + 1} className="comments__button-number" onClick={()=> {setPage(page + 1)}}>{page + 1}</button>);
            if ( page === 1 && maximum > 2 ) {
                buttons.push(<button key={3} className="comments__button-number" onClick={()=> {setPage(3)}}>{3}</button>);
            }
        }
        buttons.push(<button key="next" className="comments__button-step" disabled={!(page < maximum)} onClick={()=> {setPage(page + 1)}}>Next &gt;</button>);
        return buttons;
    }

    const handleChangeSortField = (event) => {
        setSortField(event.target.value);
    };
    
    const handleChangeSortDirection = (event) => {
        setSortDirection(event.target.value);
    };

    useEffect(() => {
        dispatch(getComments(id));
    }, [dispatch, id]);

    useEffect(() => {
        setCommentComponents(generateCommentComponents(comments, page, commentsPerPage, sortField, sortDirection));
    }, [comments, page, commentsPerPage, sortField, sortDirection]);

    useEffect(() => {
        setNavButtons(generateNavButtons(page, commentsPerPage, total))
    }, [page, commentsPerPage, total]);

    return (
        <div>
            <span>Comments &bull; {total}</span>
            <select id="comments__sort-field" defaultValue={ sortField } onChange={ handleChangeSortField }>
                <option value="createdOn">Date</option>
            </select>
            <select id="comments__sort-direction" defaultValue={ sortDirection } onChange={ handleChangeSortDirection }>
                <option value="1">Ascending</option>
                <option value="-1">Descending</option>
            </select>
            { commentComponents }
            <hr/>
            <div>
                <span>{ total } comments</span>
                <div>{ navButtons }</div>
            </div>
        </div>
        );
}