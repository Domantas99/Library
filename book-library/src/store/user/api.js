/* eslint-disable import/prefer-default-export */
import httpClient from "../../core/httpClient";

export const getUserApi = () => {
  return {
    error: false,
    returnResult: {
      id: 1,
      userName: "Nathan123",
      firstName: "Nathan",
      secondName: "Roberts",
      email: "nathan.roberts@gmail.com",
      profilePicture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqU9vOT5KpsmRjJMa7rj_NYuWWhJcB3qWAL21QtcH9ZNXuhQZO&usqp=CAU",
      office: {
        name: "Kaunas",
      },
    },
  };
};
