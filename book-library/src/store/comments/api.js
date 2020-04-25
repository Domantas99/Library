const generateMockedComment = (bookId, i) => {
    return {
        id: i,
        bookId: bookId,
        comment: "Lorem ipsum dolor sit amet...",
        createdBy : "User " + i,
        createdOn: new Date(2020, 3, 25, i).toJSON()
    }
}

export const getComments = (book) => {
    let comments = [];
    for (let i = 1; i <= 19; i++)
    {
        comments.push(generateMockedComment(book, i));
    }
    return {
        comments: comments,
        total: comments.length
    }
}