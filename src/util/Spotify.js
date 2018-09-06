const clientId = '242563e74b214d7287b88b053c78e26f';
const redirectUri = 'http://localhost:3000/';

let accessToken;
let expiresIn;

export const Spotify = {
	getAccessToken() {
		if (accessToken) {
			return accessToken;
		} else if (!accessToken && window.location.href.match(/access_token/)) {
			const accessTokenString = window.location.href.match(/access_token=([^&]*)/)
			accessToken = accessTokenString[1];

			const expiresInString = window.location.href.match(/expires_in=([^&]*)/)
			expiresIn = expiresInString[1];

			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');

			return accessToken;
		} else if (!accessToken && !window.location.href.match(/access_token/)) {
			window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
		}
	},

	search(term) {
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			headers: {
				Authorization: `Bearer ${this.getAccessToken()}`
			}
		}).then(response => {
			return response.json();
		}).then(jsonResponse => {
			return jsonResponse.tracks.items.map(track => ({
				id: track.id,
				name: track.name,
				artist: track.artists[0].name,
				album: track.album.name,
				uri: track.uri
			}));
		})
	},

	createPlaylist(playlistName, tracks) {
		if (playlistName && tracks) {
			let userId;
			let playlistId;

			return fetch(`https://api.spotify.com/v1/me`, {
				headers: {
					Authorization: `Bearer ${this.getAccessToken()}`
				}
			}).then(response => {
				return response.json();
			}).then(jsonResponse => {
				userId = jsonResponse.id

				return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
					headers: {
						Authorization: `Bearer ${this.getAccessToken()}`,
						'Content-Type': 'application/json'
					},
					method: 'POST',
					body: JSON.stringify({
						name: playlistName
					})
				}).then(response => {
					return response.json();
				}).then(jsonResponse => {
					playlistId = jsonResponse.id;

					return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
						headers: {
							Authorization: `Bearer ${this.getAccessToken()}`,
							'Content-Type': 'application/json'
						},
						method: 'POST',
						body: JSON.stringify({
							uris: tracks
						})
					});
				});
			});
		} else {
			return;
		}
	}
}