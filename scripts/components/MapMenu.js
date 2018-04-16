import React from 'react';
import { Router, hashHistory } from 'react-router';

import SearchBox from './SearchBox';
import DialektMenu from './DialektMenu';

export default class SearchMenu extends React.Component {
	constructor(props) {
		super(props);

		this.searchBoxSizeChangeHandler = this.searchBoxSizeChangeHandler.bind(this);
		this.dialektMenuChangeHandler = this.dialektMenuChangeHandler.bind(this);
		this.searchHandler = this.searchHandler.bind(this);

		this.state = {
			expanded: false
		};
	}

	searchBoxSizeChangeHandler(event) {
		this.setState({
			expanded: event.expanded
		});
	}

	dialektMenuChangeHandler(event) {
		this.setState({
			searchGender: event.gender,
			birthYears: event.birthYears
		}, function() {
			this.updateRouter();
		}.bind(this));
	}

	searchHandler(searchTerm) {
		this.setState({
			searchValue: searchTerm
		}, function() {
			this.updateRouter();
		}.bind(this));
	}

	updateRouter() {
		console.log('updateRouter');
		console.log(this.state)
		hashHistory.push('/places'+(this.state.searchValue && this.state.searchValue != '' ? '/search/'+this.state.searchValue : '')+
			(this.state.searchGender && this.state.birthYears && this.state.birthYears.min && this.state.birthYears.max ? '/person_relation/i' : '')+
			(this.state.searchGender ? '/gender/'+this.state.searchGender : '')+
			(this.state.birthYears && this.state.birthYears.min && this.state.birthYears.max ? '/birth_years/'+this.state.birthYears.min+'-'+this.state.birthYears.max : '')
		);
	}
	
	render() {
		return (
			<div className={'menu-wrapper'+(this.state.expanded ? ' menu-expanded' : '')}>

				<SearchBox onSearch={this.searchHandler} 
					onSizeChange={this.searchBoxSizeChangeHandler} />

				<DialektMenu onChange={this.dialektMenuChangeHandler} />

			</div>
		);
	}
}