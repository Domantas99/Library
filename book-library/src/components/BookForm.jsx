import React, { Component } from 'react';

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
			errors: {
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

	componentDidMount() {
		if (this.props.formTitle !== 'Register') {
			const { data } = this.props;
			this.setState({
				goodreadsSearch: data.goodreadsSearch || '',
				coverImage: data.coverImage || '',
				bookTitle: data.bookTitle || '',
				bookAuthor: data.bookAuthor || '',
				bookDescription: data.bookDescription || '',
				bookIsbn: data.bookIsbn || '',
				bookFormat: data.bookFormat || '',
				bookPages: data.bookPages || '',
				bookDate: data.bookDate || '',
				bookPublisher: data.bookPublisher || '',
				bookLanguage: data.bookLanguage || '',
				bookSeries: data.bookSeries || '',
				bookCategory: data.bookCategory || '',
				kaunasCopies: data.kaunasCopies || '',
				vilniusCopies: data.vilniusCopies || '',
				londonCopies: data.londonCopies || '',
				chicagoCopies: data.chicagoCopies || '',
				torontoCopies: data.torontoCopies || ''
			});
		}
	}

	handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		let errors = this.state.errors;

		if (name !== 'goodreadsSearch') {
			errors[name] = value.length < 1 || value.length > 1000
				? 'field must be filled and can not exceed 1000 characters'
				: '';
		}
		this.setState({ errors, [name]: value });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		if (validErrors(this.state.errors) && validInputs(this.state)) {
			console.info('Valid Form')
		} else {
			console.error('Invalid Form')
		}
	}

	render() {
		const { errors } = this.state;
		return (
			<div className="form-wrapper">
				<h1 className="form-title">
					{this.props.formTitle} Book
					</h1>
				<form onSubmit={this.handleSubmit} noValidate>
					<div className="input-wrapper">
						<label htmlFor="goodreadsSearch">FIND IN GOODREADS</label><br />
						<input type="text" name="goodreadsSearch" />
					</div>

					<div className="input-wrapper">
						<label htmlFor="coverImage">COVER</label><br />
						<input type="file" value={this.state.coverImage} onChange={this.handleChange} name="coverImage" accept="image/*" />
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookTitle">TITLE</label><br />
						<input type="text" value={this.state.bookTitle} name="bookTitle" onChange={this.handleChange} />
						{errors.bookTitle.length > 0 && <span className='error'><br />{errors.bookTitle}</span>}
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookAuthor">AUTHOR(S)</label><br />
						<input type="text" value={this.state.bookAuthor} name="bookAuthor" onChange={this.handleChange} />
						{errors.bookAuthor.length > 0 && <span className='error'><br />{errors.bookAuthor}</span>}
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookDescription">DESCRIPTION</label><br />
						<textarea name="bookDescription" value={this.state.bookDescription} cols="30" rows="10" onChange={this.handleChange} ></textarea>
						{errors.bookDescription.length > 0 && <span className='error'><br />{errors.bookDescription}</span>}
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookIsbn">ISBN</label><br />
						<input type="text" name="bookIsbn" value={this.state.bookIsbn} onChange={this.handleChange} />
						{errors.bookIsbn.length > 0 && <span className='error'><br />{errors.bookIsbn}</span>}
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookFormat">FORMAT</label><br />
						<select name="bookFormat" value={this.state.bookFormat} onChange={this.handleChange} >
							<option value="paperback">Paperback</option>
							<option value="e-book">E-book</option>
							<option value="audiobook">Audiobook</option>
						</select>
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookPages">NUMBER OF PAGES</label><br />
						<input type="text" name="bookPages" value={this.state.bookPages} onChange={this.handleChange} />
						{errors.bookPages.length > 0 && <span className='error'><br />{errors.bookPages}</span>}
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookDate">PUBLICATION DATE</label><br />
						<input type="date" name="bookDate" value={this.state.bookDate} onChange={this.handleChange} />
						{errors.bookPages.length > 0 && <span className='error'><br />{errors.bookPages}</span>}
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookPublisher">PUBLISHER</label><br />
						<input type="text" name="bookPublisher" value={this.state.bookPublisher} onChange={this.handleChange} />
						{errors.bookPublisher.length > 0 && <span className='error'><br />{errors.bookPublisher}</span>}
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookLanguage">EDITION LANGUAGE</label><br />
						<input type="text" name="bookLanguage" value={this.state.bookLanguage} onChange={this.handleChange} />
						{errors.bookLanguage.length > 0 && <span className='error'><br />{errors.bookLanguage}</span>}
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookSeries">SERIES</label><br />
						<input type="text" name="bookSeries" value={this.state.bookSeries} onChange={this.handleChange} />
						{errors.bookSeries.length > 0 && <span className='error'><br />{errors.bookSeries}</span>}
					</div>

					<div className="input-wrapper">
						<label htmlFor="bookCategory">CATEGORY</label><br />
						<select name="bookCategory" value={this.state.bookCategory} onChange={this.handleChange} >
							<option value="drama">Drama</option>
							<option value="sci-fi">Sci-fi</option>
						</select>
					</div>

					<div className="copies-wrapper">
						<h2>
							NUMBER OF COPIES
							</h2>
						<label htmlFor="kaunasCopies">Kaunas:</label>
						<input type="text" name="kaunasCopies" value={this.state.kaunasCopies} onChange={this.handleChange} /><br />
						{errors.kaunasCopies.length > 0 && <span className='error'>{errors.kaunasCopies}<br /></span>}

						<label htmlFor="vilniusCopies">Vilnius:</label>
						<input type="text" name="vilniusCopies" value={this.state.vilniusCopies} onChange={this.handleChange} /><br />
						{errors.vilniusCopies.length > 0 && <span className='error'>{errors.vilniusCopies}<br /></span>}

						<label htmlFor="londonCopies">London:</label>
						<input type="text" name="londonCopies" value={this.state.londonCopies} onChange={this.handleChange} /><br />
						{errors.londonCopies.length > 0 && <span className='error'>{errors.londonCopies}<br /></span>}

						<label htmlFor="chicagoCopies">Chicago:</label>
						<input type="text" name="chicagoCopies" value={this.state.chicagoCopies} onChange={this.handleChange} /><br />
						{errors.chicagoCopies.length > 0 && <span className='error'>{errors.chicagoCopies}<br /></span>}

						<label htmlFor="torontoCopies">Toronto:</label>
						<input type="text" name="torontoCopies" value={this.state.torontoCopies} onChange={this.handleChange} /><br />
						{errors.torontoCopies.length > 0 && <span className='error'>{errors.torontoCopies}<br /></span>}
					</div>

					<input type="submit" value={ this.props.formTitle } />
				</form>
			</div>
		);
	}
}

export default BookForm;
