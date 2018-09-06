import React from 'react';
import './Playlist.css';
import {TrackList} from '../TrackList/TrackList';

export class Playlist extends React.Component {
	constructor(props) {
		super(props);

		this.handleTitleChange = this.handleTitleChange.bind(this);
	}

	handleTitleChange(e) {
		this.props.titleChange(e.target.value);
	}

	render() {
		return (
			<div className="Playlist">
				<input onChange={this.handleTitleChange} value={this.props.title} />
				<TrackList tracks={this.props.tracks} type="playlist" removeTrack={this.props.removeTrack} />
				<a onClick={this.props.onPublish} className="Playlist-save">SAVE TO SPOTIFY</a>
			</div>
		);
	}
}