import React from 'react';
import './TrackList.css';
import {Track} from '../Track/Track';

export class TrackList extends React.Component {
	render() {
		return (
			<div className="TrackList">
				{
					this.props.tracks.map(track => {
						return <Track key={track.id} track={track} type={this.props.type} addTrack={this.props.addTrack} removeTrack={this.props.removeTrack} />
					})
				}
			</div>
		);
	}
}