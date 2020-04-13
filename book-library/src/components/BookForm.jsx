import React, { Component } from 'react';
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

class BookForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			bookTitle: '',
			bookIsbn: '',
			bookAuthor: '',
			bookDescription: '',
			bookCategory: '',
			bookTag: 'tempTagPlaceholder',
			bookFormat: '',
			bookPages: '',
			bookSeries: '',
			bookPublisher: '',
			bookLanguage: '',

			coverImage: '',
			goodreadsSearch: '',
			// missing date added
			bookDate: '', // created
					
			kaunasCopies: 0,
			vilniusCopies: 0,
			londonCopies: 0,
			chicagoCopies: 0,
			torontoCopies: 0,
			errors: {
				goodreadsSearch: '',
				coverImage: '',
				bookTitle: '',
				bookAuthor: '',
				bookDescription: '',
				bookIsbn: '',
				bookFormat: '',
				bookPages: '',
				bookDate: '',
				bookPublisher: '',
				bookLanguage: '',
				bookSeries: '',
				bookCategory: '',
				kaunasCopies: '',
				vilniusCopies: '',
				londonCopies: '',
				chicagoCopies: '',
				torontoCopies: '',
            }
		}
	}

	handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		let errors = this.state.errors;

		errors[name] = value.length < 1 || value.length > 1000
			? 'field must be filled and can not exceed 1000 characters'
			: '';

		this.setState({ errors, [name]: value });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		if (validErrors(this.state.errors) && validInputs(this.state)) {
			console.info('Valid Form')
			
			
			const book = this.createBookObject();
			debugger;
			console.log(book);

			this.props.addBook(book);
		} else {
			console.error('Invalid Form')
		}
	}

	createBookObject() {
		const date = new Date()
		const book = {
			Title: this.state.bookTitle,
			Isbn: this.state.bookIsbn,
			Author: this.state.bookAuthor,
			Description: this.state.bookDescription,
			Category: this.state.bookCategory,
			Tag: this.state.bookTag,
			Format: this.state.bookFormat,
			NumberOfPages: this.state.bookPages,
			Series: this.state.bookSeries,
			Publisher: this.state.bookPublisher,
			EditionLanguage: this.state.bookLanguage,
			CoverPictureUrl: this.state.coverImage,
			GoodReadsUrl: this.state.goodreadsSearch,
			DateAdded: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
			ReleaseDate: this.state.bookDate,
		}
		return book;
	}

	render() {
		const { errors } = this.state;
		return (
			<div className="form-wrapper">
				<h1 className="form-title">
					Register Book
					</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="input-wrapper">
						<label htmlFor="goodreadsSearch">FIND IN GOODREADS</label><br />
						<input onChange={this.handleChange} type="text" name="goodreadsSearch" />
					</div>

					<div className="input-wrapper">
						<label htmlFor="coverImage">COVER IMAGE URL</label><br />
						{/* <input type="file" name="coverImage" accept="image/*" /> */}
						<input type="text" onChange={this.handleChange} name="coverImage" accept="image/*" />
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookTitle">TITLE</label><br />
						<input type="text" name="bookTitle" onChange={this.handleChange} formNoValidate/>
						{errors.bookTitle.length > 0 && <span className='error'><br />{errors.bookTitle}</span>}
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookAuthor">AUTHOR(S)</label><br />
						<input type="text" name="bookAuthor" onChange={this.handleChange} formNoValidate />
						{errors.bookAuthor.length > 0 && <span className='error'><br />{errors.bookAuthor}</span>}
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookDescription">DESCRIPTION</label><br />
						<textarea name="bookDescription" cols="30" rows="10" onChange={this.handleChange} formNoValidate></textarea>
						{errors.bookDescription.length > 0 && <span className='error'><br />{errors.bookDescription}</span>}
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookIsbn">ISBN</label><br />
						<input type="text" name="bookIsbn" onChange={this.handleChange} formNoValidate />
						{errors.bookIsbn.length > 0 && <span className='error'><br />{errors.bookIsbn}</span>}
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookFormat">FORMAT</label><br />
						<select name="bookFormat" onChange={this.handleChange} formNoValidate>
							<option selected="selected" value="">Not Selected</option>
							<option value="paperback">Paperback</option>
							<option value="e-book">E-book</option>
							<option value="audiobook">Audiobook</option>
						</select>
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookPages">NUMBER OF PAGES</label><br />
						<input type="text" name="bookPages" onChange={this.handleChange} formNoValidate />
						{errors.bookPages.length > 0 && <span className='error'><br />{errors.bookPages}</span>}
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookDate">PUBLICATION DATE</label><br />
						<input type="date" name="bookDate" onChange={this.handleChange} formNoValidate />
						{errors.bookPages.length > 0 && <span className='error'><br />{errors.bookPages}</span>}
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookPublisher">PUBLISHER</label><br />
						<input type="text" name="bookPublisher" onChange={this.handleChange} formNoValidate />
						{errors.bookPublisher.length > 0 && <span className='error'><br />{errors.bookPublisher}</span>}
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookLanguage">EDITION LANGUAGE</label><br />
						<input type="text" name="bookLanguage" onChange={this.handleChange} formNoValidate />
						{errors.bookLanguage.length > 0 && <span className='error'><br />{errors.bookLanguage}</span>}
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookSeries">SERIES</label><br />
						<input type="text" name="bookSeries" onChange={this.handleChange} formNoValidate />
						{errors.bookSeries.length > 0 && <span className='error'><br />{errors.bookSeries}</span>}
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookCategory">CATEGORY</label><br />
						<select name="bookCategory" onChange={this.handleChange} formNoValidate>
							<option selected="selected" value="">Not Selected</option>
							<option value="drama">Drama</option>
							<option value="sci-fi">Sci-fi</option>
						</select>
					</div>

					<div className="copies-wrapper">
						<h2>
							NUMBER OF COPIES
							</h2>
						<label htmlFor="kaunasCopies">Kaunas:</label>
						<input type="number" min="0" name="kaunasCopies" onChange={this.handleChange} formNoValidate /><br />
						{errors.kaunasCopies.length > 0 && <span className='error'>{errors.kaunasCopies}<br /></span>}

						<label htmlFor="vilniusCopies">Vilnius:</label>
						<input type="number" min="0" name="vilniusCopies" onChange={this.handleChange} formNoValidate /><br />
						{errors.vilniusCopies.length > 0 && <span className='error'>{errors.vilniusCopies}<br /></span>}

						<label htmlFor="londonCopies">London:</label>
						<input type="number" min="0" name="londonCopies" onChange={this.handleChange} formNoValidate /><br />
						{errors.londonCopies.length > 0 && <span className='error'>{errors.londonCopies}<br /></span>}

						<label htmlFor="chicagoCopies">Chicago:</label>
						<input type="number" min="0" name="chicagoCopies" onChange={this.handleChange} formNoValidate /><br />
						{errors.chicagoCopies.length > 0 && <span className='error'>{errors.chicagoCopies}<br /></span>}

						<label htmlFor="torontoCopies">Toronto:</label>
						<input type="number" min="0" name="torontoCopies" onChange={this.handleChange} formNoValidate /><br />
						{errors.torontoCopies.length > 0 && <span className='error'>{errors.torontoCopies}<br /></span>}
					</div>

					<input type="submit" value="Register" />
				</form>
			</div>
		);
	}
}
const mapStateToProps = state => ({state})
const mapDispatchToProps = dispatch => ({
	addBook: book => dispatch(addNewBook(book))
})

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
