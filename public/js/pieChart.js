class PieChart extends React.Component {
	constructor(){
		super();
		this.currentColor = -1;
	}
	drawPie(content, artist) {
		var pie = new d3pie("pieChart", {
			"header": {
				"title": {
					"text": "Weekly Events "+(artist ? "For "+artist.replace(/\+/g, ' ') : 'By Artist'),
					"fontSize": 24,
					"font": "open sans"
				},
				"subtitle": {
					"text": "Shows the first "+content.length+" busiest weeks of the time range. Read clockwise.",
					"color": "#999999",
					"fontSize": 12,
					"font": "open sans"
				},
				"titleSubtitlePadding": 9
			},
			"footer": {
				"color": "#999999",
				"fontSize": 10,
				"font": "open sans",
				"location": "bottom-left"
			},
			"size": {
				"canvasWidth": 590,
				"pieInnerRadius": "50%",
				"pieOuterRadius": "90%"
			},
			"data": {
				"sortOrder": "value-desc",
				"smallSegmentGrouping": {
					"enabled": true,
					"value": null
				},
				"content": content
			},
			"labels": {
				"outer": {
					"pieDistance": 32
				},
				"inner": {
					"hideWhenLessThanPercentage": 3
				},
				"mainLabel": {
					"fontSize": 11
				},
				"percentage": {
					"color": "#ffffff",
					"decimalPlaces": 0
				},
				"value": {
					"color": "#adadad",
					"fontSize": 11
				},
				"lines": {
					"enabled": true
				},
				"truncation": {
					"enabled": true
				}
			},
			"effects": {
				"pullOutSegmentOnClick": {
					"effect": "linear",
					"speed": 400,
					"size": 8
				}
			},
			"misc": {
				"gradient": {
					"enabled": true,
					"percentage": 100
				}
			}
		});
	}

	sortEvents(events){
		return events.slice().sort((a, b) => b.total - a.total);
	}

	pickEvents(events, pick){
		return this.sortEvents(events).slice(0, pick);
	}

	pickColor(){
		const color = ["#2484c1","#0c6197","#4daa4b","#90c469","#daca61","#e4a14b","#e98125","#cb2121","#830909","#923e99","#ae83d5","#bf273e","#ce2aeb","#bca44a","#618d1b","#1ee67b","#b0ec44","#a4a0c9","#322849","#86f71a","#d1c87f","#7d9058","#44b9b0","#7c37c0","#cc9fb1","#e65414","#8b6834","#248838"];
		this.currentColor++;
		return color[this.currentColor%color.length];
	}

	formatEvents(events){
		let res = []
		for (const {week, total} of events) {
			const color = this.pickColor();
			res = [...res, {label:week+': '+total, value:total, color}]
		}
		return res;
	}

	componentDidUpdate(prevProps, prevState) {}

    componentDidMount() {
    	const events = this.pickEvents(this.props.events, this.props.show);
    	const content = this.formatEvents(events);
		this.drawPie(content, this.props.artist);
    }


	render() {
		return (
			<div id="pieChart"></div>
		);
	}
}