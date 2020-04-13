import httpClient from '../../core/httpClient'

export const addBookAPI = (bookObj) => {
    debugger;
    //return httpClient.post('books',JSON.stringify(bookObj));
    return httpClient.post('books',bookObj);
} 

export const getBookList = () => {
    return [
        {
            Id: 1,
            Title: "IT",
            Author: "Stephen King",
            CoverPictureUrl: "https://picsum.photos/200/300?random=1",
            ReleaseDate: "1986-09-15",
            DateAdded: "2020-03-28",
            Description: "textA",
            Category: "Art",
            Tag: "tagA",
            Format: "Audio",
            NumberOfPages: "255",
            Series: "batman",
            Publisher: "Alma littera",
            EditionLanguage: "English",
            GoodReadsUrl: "www.google.com",
        },
        {
            Id: 2,
            Title: "Storm Front",
            Author: "Jim Butcher",
            CoverPictureUrl: "https://picsum.photos/200/300?random=2",
            ReleaseDate: "2000-04-01",
            DateAdded: "2020-03-28",
            Description: "textC",
            Category: "Health",
            Tag: "tagA",
            Format: "E-Book",
            NumberOfPages: "255",
            Series: "batman",
            Publisher: "Alma littera",
            EditionLanguage: "English",
            GoodReadsUrl: "www.google.com"
        },
        {
            Id: 3,
            Title: "The Colour Of Magic",
            Author: "Terry Pratchett",
            CoverPictureUrl: "https://picsum.photos/200/300?random=3",
            ReleaseDate: "1983-11-24",
            DateAdded: "2020-03-29",
            Description: "textB",
            Category: "Tech",
            Tag: "tagB",
            Format: "Audio",
            NumberOfPages: "256",
            Series: "jj",
            Publisher: "Alma littera",
            EditionLanguage: "English",
            GoodReadsUrl: "www.google.com"
        }




    ];
};