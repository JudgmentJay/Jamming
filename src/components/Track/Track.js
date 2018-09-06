import React from 'react';
import './Track.css';

export class Track extends React.Component {
	constructor(props) {
		super(props);

		this.handleAddTrackToPlaylist = this.handleAddTrackToPlaylist.bind(this);
		this.handleRemoveTrackFromPlaylist = this.handleRemoveTrackFromPlaylist.bind(this);
	}

	plusOrMinus() {
		if (this.props.type === "searchResults") {
			return <a className="Track-action" onClick={this.handleAddTrackToPlaylist}>+</a>
		} else {
			return <a className="Track-action" onClick={this.handleRemoveTrackFromPlaylist}>-</a>
		}
	}

	handleAddTrackToPlaylist() {
		this.props.addTrack(this.props.track);
	}

	handleRemoveTrackFromPlaylist() {
		this.props.removeTrack(this.props.track);
	}

	render() {
		return (
			<div className="Track">
				<div className="Track-information">
					<h3>{this.props.track.name}</h3>
					<p>{this.props.track.artist} | {this.props.track.album}</p>
				</div>
				{this.plusOrMinus()}
			</div>
		);
	}
}