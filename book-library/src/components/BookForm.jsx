/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNewBook, updateBook } from "../store/library/actions";

const BookForm = ({ formTitle, bookDetails, id, offices, moveToWishAction }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [officeData, setOffices] = useState(offices);

  const [formState, setFormState] = useState({
    goodreadsSearch: "",
    coverImage: bookDetails ? bookDetails.coverPictureUrl || "" : "",
    bookTitle: bookDetails ? bookDetails.title || "" : "",
    bookAuthor: bookDetails ? bookDetails.author || "" : "",
    bookDescription: bookDetails ? bookDetails.description || "" : "",
    bookIsbn: bookDetails ? bookDetails.isbn || "" : "",
    bookFormat: bookDetails ? bookDetails.format || "Paperback" : "",
    bookPages: bookDetails ? bookDetails.pageNumber || 0 : 0,
    bookDate: bookDetails ? bookDetails.releaseDate || "" : "",
    bookPublisher: bookDetails ? bookDetails.publisher || "Not Defined" : "",
    bookLanguage: bookDetails ? bookDetails.editionLanguage || "" : "",
    bookSeries: bookDetails ? bookDetails.series || "" : "",
    bookCategory: bookDetails ? bookDetails.category || "" : "",
    bookTag: bookDetails
      ? bookDetails.tag || "tempTagPlaceholder"
      : "tempTagPlaceholder",
    errors: {
      coverImage: "",
      bookTitle: "",
      bookIsbn: "",
      bookAuthor: "",
      bookDescription: "",
      bookCategory: "",
      bookTag: "",
      bookFormat: "",
      bookPages: "",
      bookDate: "",
      bookSeries: "",
      bookPublisher: "",
      bookLanguage: "",
    }
  });

  const validate = (key, value) => {
    if (key !== "goodreadsSearch") {
      if (key === "bookFormat" || key === "bookCategory") {
        return value.length > 0 ? "" : "Please select"
      } else {
        return value.length < 1 || value.length > 1000
            ? "field must be filled and can not exceed 1000 characters"
            : ""
      }
    }
  }

  const validErrors = () => {
    const errors = {};
    Object.keys(formState.errors).forEach((key) => errors[key] = validate(key, formState[key]))
    setFormState({...formState, errors: errors})
    let valid = true;
    Object.values(formState.errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  
  const validInputs = () => {
    let valid = true;
    for (const key in formState) {
      if (formState.hasOwnProperty(key)) {
        if (
          key !== "goodreadsSearch" &&
          key !== "coverImage" &&
          formState[key].length < 1
        ) {
          valid = false;
        }
      }
    }
    return valid;
  };

  useEffect(() => {
    setOffices(offices);
  }, [offices]);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormState({...formState, [name]: value, errors: {...formState.errors, [name]: validate(name, value)}});
  };

  const handleSubmit = (event) => {
    debugger;
    event.preventDefault();
    if (validErrors() && validInputs()) {
      const book = createBookObject();
      debugger;
      if (formTitle==="Register new book") {
        dispatch(updateBook(id, book));
        history.push(`/library/${id}`)
      } else if (formTitle==="Edit") {
        dispatch(addNewBook(book));
        history.push("/library");
      }
      else if (formTitle==="Add wish to library") {
        // mano naujas
        moveToWishAction();
       // history.push("/library");}
    }
    else {
      alert("Invalid form");
    }
  }
  };

  const handleNumberOfCopiesChange = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-shadow
    const { id, value } = event.target;
    const office = officeData.find((x) => x.id === +id);
    const temp = officeData;
    const index = temp.indexOf(office);
    temp[index].count = +value;
    setOffices([...temp]);
  };

  const createBookObject = () => {
    const library = [];
    officeData.forEach((o) => library.push({ OfficeId: o.id, Count: o.count }));

    const book = {
      Title: formState.bookTitle,
      Isbn: formState.bookIsbn,
      Author: formState.bookAuthor,
      Description: formState.bookDescription,
      Category: formState.bookCategory,
      Tag: formState.bookTag,
      Format: formState.bookFormat,
      NumberOfPages: +formState.bookPages,
      Series: formState.bookSeries,
      Publisher: formState.bookPublisher,
      EditionLanguage: formState.bookLanguage,
      CoverPictureUrl: formState.coverImage,
      GoodReadsUrl: formState.goodreadsSearch,
      DateAdded: new Date(),
      ReleaseDate: formState.bookDate,
      Library: library,
    };
    return book;
  };
  return (
    <div className="form-wrapper">
      <h1 className="form-title">{formTitle}</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="input-wrapper">
          <label htmlFor="goodreadsSearch">FIND IN GOODREADS</label>
          <br />
          <input type="text" name="goodreadsSearch" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="coverImage">COVER</label>
          <br />
          {/* <input type="file" value={formInfo.coverImage} onChange={handleChange} name="coverImage" accept="image/*" /> */}
          <input
            type="text"
            value={formState.coverImage}
            onChange={handleChange}
            name="coverImage"
            accept="image/*"
          />
          {formState.errors.coverImage.length > 0 && (
            <span className="error">
              <br />
              {formState.errors.coverImage}
            </span>
          )}
        </div>

        <div className="input-wrapper">
          <label htmlFor="bookTitle">TITLE</label>
          <br />
          <input
            type="text"
            value={formState.bookTitle}
            name="bookTitle"
            onChange={handleChange}
          />
          {formState.errors.bookTitle.length > 0 && (
            <span className="error">
              <br />
              {formState.errors.bookTitle}
            </span>
          )}
        </div>

        <div className="input-wrapper">
          <label htmlFor="bookAuthor">AUTHOR(S)</label>
          <br />
          <input
            type="text"
            value={formState.bookAuthor}
            name="bookAuthor"
            onChange={handleChange}
          />
          {formState.errors.bookAuthor.length > 0 && (
            <span className="error">
              <br />
              {formState.errors.bookAuthor}
            </span>
          )}
        </div>

        <div className="input-wrapper">
          <label htmlFor="bookDescription">DESCRIPTION</label>
          <br />
          <textarea
            name="bookDescription"
            value={formState.bookDescription}
            cols="30"
            rows="10"
            onChange={handleChange}
          />
          {formState.errors.bookDescription.length > 0 && (
            <span className="error">
              <br />
              {formState.errors.bookDescription}
            </span>
          )}
        </div>

        <div className="input-wrapper">
          <label htmlFor="bookIsbn">ISBN</label>
          <br />
          <input
            type="text"
            name="bookIsbn"
            value={formState.bookIsbn}
            onChange={handleChange}
          />
          {formState.errors.bookIsbn.length > 0 && (
            <span className="error">
              <br />
              {formState.errors.bookIsbn}
            </span>
          )}
        </div>

        <div className="input-wrapper">
          <label htmlFor="bookFormat">FORMAT</label>
          <br />
          <select
            name="bookFormat"
            value={formState.bookFormat}
            onChange={handleChange}
          >
            <option value="" disabled hidden>Select format</option>
            <option value="paperback">Paperback</option>
            <option value="e-book">E-book</option>
            <option value="audiobook">Audiobook</option>
          </select>
          {formState.errors.bookFormat.length > 0 && (
            <span className="error">
              <br />
              {formState.errors.bookFormat}
            </span>
          )}
        </div>

        <div className="input-wrapper">
          <label htmlFor="bookPages">NUMBER OF PAGES</label>
          <br />
          <input
            min="0"
            type="number"
            name="bookPages"
            value={formState.bookPages}
            onChange={handleChange}
          />
          {formState.errors.bookPages.length > 0 && (
            <span className="error">
              <br />
              {formState.errors.bookPages}
            </span>
          )}
        </div>

        <div className="input-wrapper">
          <label htmlFor="bookDate">PUBLICATION DATE</label>
          <br />
          <input
            type="date"
            name="bookDate"
            value={formState.bookDate}
            onChange={handleChange}
          />
          {formState.errors.bookPages.length > 0 && (
            <span className="error">
              <br />
              {formState.errors.bookPages}
            </span>
          )}
        </div>

        <div className="input-wrapper">
          <label htmlFor="bookPublisher">PUBLISHER</label>
          <br />
          <input
            type="text"
            name="bookPublisher"
            value={formState.bookPublisher}
            onChange={handleChange}
          />
          {formState.errors.bookPublisher.length > 0 && (
            <span className="error">
              <br />
              {formState.errors.bookPublisher}
            </span>
          )}
        </div>

        <div className="input-wrapper">
          <label htmlFor="bookLanguage">EDITION LANGUAGE</label>
          <br />
          <input
            type="text"
            name="bookLanguage"
            value={formState.bookLanguage}
            onChange={handleChange}
          />
          {formState.errors.bookLanguage.length > 0 && (
            <span className="error">
              <br />
              {formState.errors.bookLanguage}
            </span>
          )}
        </div>

        <div className="input-wrapper">
          <label htmlFor="bookSeries">SERIES</label>
          <br />
          <input
            type="text"
            name="bookSeries"
            value={formState.bookSeries}
            onChange={handleChange}
          />
          {formState.errors.bookSeries.length > 0 && (
            <span className="error">
              <br />
              {formState.errors.bookSeries}
            </span>
          )}
        </div>

        <div className="input-wrapper">
          <label htmlFor="bookCategory">CATEGORY</label>
          <br />
          <select
            name="bookCategory"
            value={formState.bookCategory}
            onChange={handleChange}
          >
            <option value="" disabled hidden>Select category</option>
            <option value="drama">Drama</option>
            <option value="sci-fi">Sci-fi</option>
          </select>
          {formState.errors.bookCategory.length > 0 && (
            <span className="error">
              <br />
              {formState.errors.bookCategory}
            </span>
          )}
        </div>

        <div className="copies-wrapper">
          <h2>NUMBER OF COPIES</h2>
          {officeData.map((office) => (
            <div key={office.name}>
              <label htmlFor="kaunasCopies">{office.name}:</label>
              <input
                min="0"
                type="number"
                id={office.id}
                value={office.count}
                onChange={(e) => handleNumberOfCopiesChange(e)}
              />
            </div>
          ))}
        </div>

        <input type="submit" value={formTitle} />
      </form>
    </div>
  );
};

export default BookForm;
