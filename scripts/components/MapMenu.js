import React from 'react';
import { Router } from 'react-router-dom';

import SearchBox from './SearchBox';
import DialektMenu from './DialektMenu';

export default class MapMenu extends React.Component {
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
		this.props.history.push('/places'+(this.state.searchValue && this.state.searchValue != '' ? '/search/'+this.state.searchValue : '')+
			(this.state.searchGender || (this.state.birthYears && this.state.birthYears.min && this.state.birthYears.max) ? '/person_relation/i' : '')+
			(this.state.searchGender ? '/gender/'+this.state.searchGender : '')+
			(this.state.birthYears && this.state.birthYears.min && this.state.birthYears.max ? '/birth_years/'+this.state.birthYears.min+'-'+this.state.birthYears.max : '')
		);
	}

	componentDidMount() {
		this.setState({
			searchValue: this.props.match.params.search || '',
			searchGender: this.props.match.params.gender || '',
			birthYears: this.props.match.params.birth_years || '',
		});
	}	

	UNSAFE_componentWillReceiveProps(props) {
		this.setState({
			searchValue: props.match.params.search || '',
			searchGender: props.match.params.gender || '',
			birthYears: props.match.params.birth_years || '',
		});
	}

	render() {
		let _props = this.props
		return (
			<div className={'menu-wrapper'+(this.state.expanded ? ' menu-expanded' : '')}>

				<SearchBox onSearch={this.searchHandler} 
					onSizeChange={this.searchBoxSizeChangeHandler} 
					{..._props}	
				/>

				<DialektMenu onChange={this.dialektMenuChangeHandler} {..._props} />

			</div>
		);
	}
}