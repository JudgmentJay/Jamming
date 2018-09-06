import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import {Spotify} from '../../util/Spotify.js';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchResults: [],
			playlistTitle: 'New Playlist',
			playlistTracks: []
		};

		this.searchSpotify = this.searchSpotify.bind(this);
		this.addTrackToPlaylist = this.addTrackToPlaylist.bind(this);
		this.removeTrackFromPlaylist = this.removeTrackFromPlaylist.bind(this);
		this.titleChange = this.titleChange.bind(this);
		this.publishPlaylist = this.publishPlaylist.bind(this);
	}

	searchSpotify(term) {
		Spotify.search(term).then(searchResults => {
			this.setState({
				searchResults: searchResults
			});
		});
	}

	addTrackToPlaylist(track) {
		let newPlaylist = this.state.playlistTracks;

		if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
			return;
		} else {
			newPlaylist.push(track);

			this.setState({
				playlistTracks: newPlaylist
			});
		}
	}

	removeTrackFromPlaylist(track) {
		const newPlaylist = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);

		this.setState({
			playlistTracks: newPlaylist
		});
	}

	titleChange(title) {
		this.setState({
			playlistTitle: title
		});
	}

	publishPlaylist() {
		let trackUris = this.state.playlistTracks.map(track => {
			return track.uri
		});

		Spotify.createPlaylist(this.state.playlistTitle, trackUris);
		
		this.setState({
			playlistTitle: 'New Playlist',
			playlistTracks: []
		});
	}

	render() {
		return (
			<div>
				<h1>Ja<span className="highlight">mmm</span>ing</h1>
				<div className="App">
					<SearchBar searchSpotify={this.searchSpotify} />
					<div className="App-playlist">
						<SearchResults searchResults={this.state.searchResults} addTrack={this.addTrackToPlaylist} />
						<Playlist tracks={this.state.playlistTracks} title={this.state.playlistTitle} titleChange={this.titleChange} removeTrack={this.removeTrackFromPlaylist} onPublish={this.publishPlaylist} />
					</div>
				</div>
			</div>
		);
	}
}

export default App;