class SearchForm extends React.Component {
	handleClickSearch () {
		const start = this.startInput.value;
		const end = this.endInput.value;
		let artist = this.artistInput.value;
		if ( !artist || !start || !end ) {
			alert('Artist, Start Date and End Date are Required');
			return;
		}
		let show = this.showInput.value;
		if (show.replace(/\s/g, '') === '' || +show < 0){
			show = 25;
		}
		artist = artist.toLowerCase();
		artist = artist.replace(/^\s+/g, "");
		artist = artist.replace(/\s+$/g, "");
		artist = artist.replace(/\s+/g, "+");
		this.props.onSearch(artist, start, end, show)
	}

    render() {
        return (
	        <div className="search-form">
	        	<label className="req">Artist Name:</label><input type="text" placeholder="Kanye West" ref={ input => this.artistInput = input }/><br />
	        	<label className="req">Start Date:</label><input type="text" placeholder="yyyy-mm-dd" ref={ input => this.startInput = input }/><br />
	        	<label className="req">End Date:</label><input type="text" placeholder="yyyy-mm-dd" ref={ input => this.endInput = input }/><br />
	        	<label>Show:</label><input type="text" placeholder="# of weeks to show in chart" ref={ input => this.showInput = input }/><br />
	        	<button onClick={this.handleClickSearch.bind(this)}>Search Artist Stats</button>
	        </div>
        );
    }
}