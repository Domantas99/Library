/* eslint-disable react/prop-types */
import React from "react";

export default ({ data }) => (
    <tr key={data.Id}>
        <td>
            <img src={data.CoverPictureUrl} alt=""/>
            <span>{data.Title}</span>
            <span>{data.Author}</span>
        </td>
        <td>
            <span>{data.Office}</span>
        </td>
        <td>
            {
                data.Status === "Borrowed" ? //We'll need to tag these with different classes anyway when we're applying styles.
                    (
                        <span>Borrowed</span>
                    ) : (
                        <span>Requested</span>
                    )
            }
        </td>
        <td>{data.BookedFrom}</td>
        <td>{data.ReturnDate}</td>
        {
            data.Status === "Borrowed" ?
            (
                <td><button>Edit</button><button>Check In</button></td>
            ) : (
                <td><button>Leave waitlist</button></td>
            )
        }
    </tr>
);
