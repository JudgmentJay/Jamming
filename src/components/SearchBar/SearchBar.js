import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			term: ''
		};

		this.handleTermChange = this.handleTermChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleTermChange(e) {
		this.setState({
			term: e.target.value
		});
	}

	handleSearch(e) {
		e.preventDefault();
		this.props.searchSpotify(this.state.term);
	}

	render() {
		return (
			<div className="SearchBar">
  				<input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
  				<a onClick={this.handleSearch}>SEARCH</a>
			</div>
		);
	}
}