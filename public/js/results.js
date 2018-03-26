class Results extends React.Component {
	constructor(){
		super();
		const eventDesc = new Map();
		eventDesc.set( "1", "Chart Appearance" );
		eventDesc.set( "2", "Review" );
		eventDesc.set( "3", "News & Blog Mention" );
		eventDesc.set( "5", "Shared Link" );
		eventDesc.set( "6", "Profile Update" );
		eventDesc.set( "8", "Release" );
		eventDesc.set( "9", "TV Appearance" );
		eventDesc.set("10", "Concert" );
		eventDesc.set("12", "Custom Event" );
		eventDesc.set("13", "NBS Chart Appearance" );
		eventDesc.set("14", "NBS Alert" );
		eventDesc.set("15", "Content Change" );
		eventDesc.set("16", "Post" );
		eventDesc.set("17", "Calendar Event" );
		eventDesc.set("18", "Milestone" );
		eventDesc.set("19", "Radio Spot" );
		eventDesc.set("20", "Online Mention" );
		eventDesc.set("21", "Conference Appearance" );
		eventDesc.set("22", "TV Advertising" );
		eventDesc.set("23", "Radio Advertising" );
		eventDesc.set("24", "Print Advertising" );
		eventDesc.set("25", "Online Advertising" );
		eventDesc.set("26", "Mobile Advertising" );
		eventDesc.set("27", "Email Advertising" );
		eventDesc.set("28", "Coop" );
		eventDesc.set("29", "Other" );
		eventDesc.set("30", "Online Appearance" );
		eventDesc.set("31", "In-Person Appearance" );
		eventDesc.set("32", "Interview" );
		eventDesc.set("33", "Giveaway Promotion" );
		eventDesc.set("34", "Price Promotion" );
		eventDesc.set("35", "Mail Advertising" );
		eventDesc.set("36", "Email Send" );
		eventDesc.set("37", "Tour" );
		eventDesc.set("38", "In-house Email" );
		eventDesc.set("39", "3rd Party Email" );
		eventDesc.set("40", "Blog Tour" );
		eventDesc.set("41", "Sweepstakes/Contests" );
		eventDesc.set("42", "Social Media Ad/Promo" );
		eventDesc.set("43", "Social Media Organic" );
		this.eventDesc = eventDesc;
	}

	formatResults(results) {
		const weeks = Object.keys(results);
		let res = [];
		for (const week of weeks) {
			const events = results[week];
			const eventTypes = Object.keys(events);
			const desc = {};
			let total = 0;
			for (const et of eventTypes){
				const val = events[et];
				const eventDesc = this.eventDesc.get(et);
				desc[eventDesc || et] =  val;
				total += +val;
			}
			res = [...res, { week, desc, total }];
		}
		return res;
	}

	processEventDescs(eventDescs) {
		return Object.keys(eventDescs).map( e => `${e}: ${eventDescs[e]}`).join(', ');
	}

	render() {
		const events = this.formatResults(this.props.results);
		let eventList = [];
		for (const {week, desc} of events) {
			const el = (
				<tr key={week}>
				   <td className="event-week">{week}</td>
				   <td className="event-counts">{this.processEventDescs(desc)}</td>
				 </tr>
			);
			eventList = [...eventList, el];
		}
		return (
			<div>
				<h2>Results</h2>
				<PieChart events={events} show={this.props.show} artist={this.props.artist}/>
				<h3>Detail</h3>
				<table>
					<thead>
						<tr><th>Week #</th><th>Event Types Count</th></tr>
					</thead>
					<tbody>
						{eventList}
					</tbody>
				</table>
			</div>
		);
	}
}