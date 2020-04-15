import React, { useState } from 'react';
import { addNewBook } from '../store/library/actions';
import { connect } from 'react-redux';

const validErrors = (errors) => {
	let valid = true;
	Object.values(errors).forEach(
		(val) => val.length > 0 && (valid = false)
	);
	return valid;
}

const validInputs = (inputs) => {
	let valid = true;
	for (let key in inputs) {
		if (inputs.hasOwnProperty(key)) {
			if (key !== 'goodreadsSearch' && key !== 'coverImage' && inputs[key].length < 1) {
				valid = false;
            }
		}
	}
	return valid;
}

const BookForm = ({ formTitle, bookDetails, addBook }) => {
	const [formState, setState] = useState({
		goodreadsSearch: '',
		coverImage: bookDetails.CoverPictureUrl || '',
		bookTitle: bookDetails.Title || '',
		bookAuthor: bookDetails.Author || '',
		bookDescription: bookDetails.Description || '',
		bookIsbn: bookDetails.Isbn || '',
		bookFormat: bookDetails.Format || '',
		bookPages: bookDetails.PageNumber || 0,
		bookDate: bookDetails.ReleaseDate || '',
		bookPublisher: bookDetails.Publisher || '',
		bookLanguage: bookDetails.EditionLanguage || '',
		bookSeries: bookDetails.Series || '',
		bookCategory: bookDetails.Category || '',
		bookTag: bookDetails.Tag || 'tempTagPlaceholder',
		kaunasCopies: bookDetails.KaunasCopies || 0,
		vilniusCopies: bookDetails.VilniusCopies || 0,
		londonCopies: bookDetails.LondonCopies || 0,
		chicagoCopies: bookDetails.ChicagoCopies || 0,
		torontoCopies: bookDetails.TorontoCopies || 0,
		errors: {
			coverImage: '',
			bookTitle: '',
			bookIsbn: '',
			bookAuthor: '',
			bookDescription: '',
			bookCategory: '',
			bookTag: '',
			bookFormat: '',
			bookPages: '',
			bookDate: '',
			bookSeries: '',
			bookPublisher: '',
			bookLanguage: '',
			kaunasCopies: '',
			vilniusCopies: '',
			londonCopies: '',
			chicagoCopies: '',
			torontoCopies: '',
		}
	});

	const handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		let errors = formState.errors;

		if (name !== 'goodreadsSearch') {
			errors[name] = value.length < 1 || value.length > 1000
				? 'field must be filled and can not exceed 1000 characters'
				: '';
		}
		setState({ ...formState, errors, [name]: value });
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if (validErrors(formState.errors) && validInputs(formState)) {
			const book = createBookObject();
			addBook(book);
		} else {
			alert("Invalid form")
		}
	}

	const createBookObject = () => {
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
		}
		return book;
	}

	return(
		<div className="form-wrapper">
			<h1 className="form-title">
				{formTitle} Book
				</h1>
			<form onSubmit={handleSubmit} noValidate>
				<div className="input-wrapper">
					<label htmlFor="goodreadsSearch">FIND IN GOODREADS</label><br />
					<input type="text" name="goodreadsSearch" />
				</div>

				<div className="input-wrapper">
					<label htmlFor="coverImage">COVER</label><br />
					{/*<input type="file" value={formInfo.coverImage} onChange={handleChange} name="coverImage" accept="image/*" />*/}
					<input type="text" value={formState.coverImage} onChange={handleChange} name="coverImage" accept="image/*" />
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookTitle">TITLE</label><br />
					<input type="text" value={formState.bookTitle} name="bookTitle" onChange={handleChange} />
					{formState.errors.bookTitle.length > 0 && <span className='error'><br />{formState.errors.bookTitle}</span>}
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookAuthor">AUTHOR(S)</label><br />
					<input type="text" value={formState.bookAuthor} name="bookAuthor" onChange={handleChange} />
					{formState.errors.bookAuthor.length > 0 && <span className='error'><br />{formState.errors.bookAuthor}</span>}
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookDescription">DESCRIPTION</label><br />
					<textarea name="bookDescription" value={formState.bookDescription} cols="30" rows="10" onChange={handleChange} ></textarea>
					{formState.errors.bookDescription.length > 0 && <span className='error'><br />{formState.errors.bookDescription}</span>}
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookIsbn">ISBN</label><br />
					<input type="text" name="bookIsbn" value={formState.bookIsbn} onChange={handleChange} />
					{formState.errors.bookIsbn.length > 0 && <span className='error'><br />{formState.errors.bookIsbn}</span>}
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookFormat">FORMAT</label><br />
					<select name="bookFormat" value={formState.bookFormat} onChange={handleChange} >
						<option value="paperback">Paperback</option>
						<option value="e-book">E-book</option>
						<option value="audiobook">Audiobook</option>
					</select>
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookPages">NUMBER OF PAGES</label><br />
					<input type="text" name="bookPages" value={formState.bookPages} onChange={handleChange} />
					{formState.errors.bookPages.length > 0 && <span className='error'><br />{formState.errors.bookPages}</span>}
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookDate">PUBLICATION DATE</label><br />
					<input type="date" name="bookDate" value={formState.bookDate} onChange={handleChange} />
					{formState.errors.bookPages.length > 0 && <span className='error'><br />{formState.errors.bookPages}</span>}
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookPublisher">PUBLISHER</label><br />
					<input type="text" name="bookPublisher" value={formState.bookPublisher} onChange={handleChange} />
					{formState.errors.bookPublisher.length > 0 && <span className='error'><br />{formState.errors.bookPublisher}</span>}
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookLanguage">EDITION LANGUAGE</label><br />
					<input type="text" name="bookLanguage" value={formState.bookLanguage} onChange={handleChange} />
					{formState.errors.bookLanguage.length > 0 && <span className='error'><br />{formState.errors.bookLanguage}</span>}
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookSeries">SERIES</label><br />
					<input type="text" name="bookSeries" value={formState.bookSeries} onChange={handleChange} />
					{formState.errors.bookSeries.length > 0 && <span className='error'><br />{formState.errors.bookSeries}</span>}
				</div>

				<div className="input-wrapper">
					<label htmlFor="bookCategory">CATEGORY</label><br />
					<select name="bookCategory" value={formState.bookCategory} onChange={handleChange} >
						<option value="drama">Drama</option>
						<option value="sci-fi">Sci-fi</option>
					</select>
				</div>

				<div className="copies-wrapper">
					<h2>
						NUMBER OF COPIES
						</h2>
					<label htmlFor="kaunasCopies">Kaunas:</label>
					<input type="text" name="kaunasCopies" value={formState.kaunasCopies} onChange={handleChange} /><br />
					{formState.errors.kaunasCopies.length > 0 && <span className='error'>{formState.errors.kaunasCopies}<br /></span>}

					<label htmlFor="vilniusCopies">Vilnius:</label>
					<input type="text" name="vilniusCopies" value={formState.vilniusCopies} onChange={handleChange} /><br />
					{formState.errors.vilniusCopies.length > 0 && <span className='error'>{formState.errors.vilniusCopies}<br /></span>}

					<label htmlFor="londonCopies">London:</label>
					<input type="text" name="londonCopies" value={formState.londonCopies} onChange={handleChange} /><br />
					{formState.errors.londonCopies.length > 0 && <span className='error'>{formState.errors.londonCopies}<br /></span>}

					<label htmlFor="chicagoCopies">Chicago:</label>
					<input type="text" name="chicagoCopies" value={formState.chicagoCopies} onChange={handleChange} /><br />
					{formState.errors.chicagoCopies.length > 0 && <span className='error'>{formState.errors.chicagoCopies}<br /></span>}

					<label htmlFor="torontoCopies">Toronto:</label>
					<input type="text" name="torontoCopies" value={formState.torontoCopies} onChange={handleChange} /><br />
					{formState.errors.torontoCopies.length > 0 && <span className='error'>{formState.errors.torontoCopies}<br /></span>}
				</div>

				<input type="submit" value={formTitle } />
			</form>
		</div>
	)
}
const mapStateToProps = state => ({state})
const mapDispatchToProps = dispatch => ({
	addBook: book => dispatch(addNewBook(book))
})

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
