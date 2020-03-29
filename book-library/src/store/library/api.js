//import httpClient from '../../core/httpClient'

export const getBookList = () => {
    return [
        {
            Id: 0,
            Title: "IT",
            Author: "Stephen King",
            CoverPictureUrl: "https://picsum.photos/200/300?random=1",
            ReleaseDate: "1986-09-15",
            DateAdded: "2020-03-28"
        },
        {
            Id: 1,
            Title: "Storm Front",
            Author: "Jim Butcher",
            CoverPictureUrl: "https://picsum.photos/200/300?random=2",
            ReleaseDate: "2000-04-01",
            DateAdded: "2020-03-28"
        },
        {
            Id: 2,
            Title: "The Colour Of Magic",
            Author: "Terry Pratchett",
            CoverPictureUrl: "https://picsum.photos/200/300?random=3",
            ReleaseDate: "1983-11-24",
            DateAdded: "2020-03-29"
        }
    ];
};