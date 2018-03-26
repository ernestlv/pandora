class App extends React.Component {

	constructor() {
		super();
		this.state = { results:{}, searching:-1, show:25, artist:'' };
	}

	async getEventStats(artistID, start, end){
		try {
			const url = `/events/${artistID}/stats?startDate=${start}&endDate=${end}`;
			console.log('fetch', url);
			const response = await fetch(url);
			const data = await response.json();
			if ( data.error ) {
				throw data.error;
			}
			this.setState({results: data.counts, searching:0});
		} catch(e) {
			this.setState({results:{}, searching:-1});
			console.error(e)
			alert('Invalid Time Range for this Artist');
		}
	}

	async searchEventsByArtist(artist, start, end){
		try {
			const url = `/search/${artist}`;
			console.log('fetch', url);
			const response = await fetch(url);
			const data = await response.json();
			if ( data.error ) {
				throw data.error;
			}
			return this.getEventStats(data.id, start, end);
		} catch(e) {
			this.setState({ results:{}, searching:-1 });
			console.error(e);
			alert('Invalid Artist Name');
		}
	}

	updateCounts (artist, start, end, show) {
		this.setState({ results:{}, searching:1, show, artist });
		this.searchEventsByArtist(artist, start, end);
	}

	render() {
		let results = <div></div>;
		if (this.state.searching === 0) {
			results = <Results results={this.state.results} show={this.state.show} artist={this.state.artist}/>;
		}
		if (this.state.searching === 1) {
			results = <SearchingMessage />;
		}
		return (
			<div>
				<h1>Event Stats by Artist</h1>
				<SearchForm onSearch={this.updateCounts.bind(this)} />
				{results}
			</div>
		);
	}
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);