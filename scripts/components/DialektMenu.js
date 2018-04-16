import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import { hashHistory } from 'react-router';
import Slider from './../../ISOF-React-modules/components/controls/Slider';

export default class DialektMenu extends React.Component {
	constructor(props) {
		super(props);

		this.menuButtonClick = this.menuButtonClick.bind(this);
		this.toggleMinimize = this.toggleMinimize.bind(this);
		this.searchGenderChangeHandler = this.searchGenderChangeHandler.bind(this);
		this.birthYearsSliderChangeHandler = this.birthYearsSliderChangeHandler.bind(this);

		if (window.eventBus) {
			window.eventBus.addEventListener('application.searchParams', this.receivedSearchParams.bind(this))
		}

		this.sliderStartYear = 1850;
		this.sliderEndYear = 1960;

		window.dialektMenu = this;

		this.state = {
			menuOpen: false,
			searchGender: '',
			birthYearsMin: this.sliderStartYear,
			birthYearsMax: this.sliderEndYear,
			minimized: document.documentElement.clientWidth < 500 || false
		};
	}

	searchGenderChangeHandler(event) {
		this.setState({
			searchGender: event.target.value
		}, function() {
			this.searchControlUpdate();
		}.bind(this));
	}

	birthYearsSliderChangeHandler(event) {
		this.setState({
			birthYearsMin: event.target.value[0],
			birthYearsMax: event.target.value[1]
		}, function() {
			this.searchControlUpdate();
		}.bind(this));
	}

	searchControlUpdate() {
		if (this.props.onChange) {
			this.props.onChange({
				gender: this.state.searchGender,
				birthYears: {
					min: this.state.birthYearsMin,
					max: this.state.birthYearsMax
				}
			});
		}
	}

	menuButtonClick() {
		this.setState({
			menuOpen: !this.state.menuOpen
		});
	}

	toggleMinimize() {
		this.setState({
			minimized: !this.state.minimized
		});
	}

	receivedSearchParams(event) {
		console.log('receivedSearchParams');
		console.log(event);
/*
		this.setState({
			selectedCategory: event.target.selectedCategory,
			includeNordic: event.target.includeNordic
		});
*/
	}

	render() {
		return (
			<div ref="container" className={'dialektkarta-menu heading-list-wrapper'+(this.state.minimized ? ' minimized' : '')}>

				<div className={'menu-content list-container minimal-scrollbar'}>
					<div className="menu-section">
						<h4>Kön</h4>
						<div className="radio-group">
						
							<label className={this.state.searchGender == '' ? 'selected' : ''}>
								<input type="radio" value="" onClick={this.searchGenderChangeHandler} onChange={this.searchGenderChangeHandler} name="search-gender" checked={this.state.searchGender === ''} />
								Båda
							</label>

							<label className={this.state.searchGender == 'female' ? 'selected' : ''}>
								<input type="radio" value="female" onClick={this.searchGenderChangeHandler} onChange={this.searchGenderChangeHandler} name="search-gender" checked={this.state.searchGender === 'female'} />
								Kvinnor
							</label>

							<label className={this.state.searchGender == 'male' ? 'selected' : ''}>
								<input type="radio" value="male" onClick={this.searchGenderChangeHandler} onChange={this.searchGenderChangeHandler} name="search-gender" checked={this.state.searchGender === 'male'} />
								Män
							</label>

						</div>
					</div>

					<div className="menu-section">
						<h4>Födelseår</h4>
						<Slider inputName="birthYears"
							start={[this.state.birthYearsMin, this.state.birthYearsMax]}
							rangeMin={this.sliderStartYear}
							rangeMax={this.sliderEndYear} 
							onChange={this.birthYearsSliderChangeHandler} />
					</div>

				</div>

			</div>
		);
	}
}