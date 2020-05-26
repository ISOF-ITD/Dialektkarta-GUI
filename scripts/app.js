import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Redirect } from 'react-router-dom'

import Application from './components/Application';
import RecordListWrapper from './../ISOF-React-modules/components/views/RecordListWrapper';

console.log('Dialektkartan running React.js version '+React.version);

/*
Object.assign polyfill
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
*/
if (typeof Object.assign != 'function') {
	// Must be writable: true, enumerable: false, configurable: true
	Object.defineProperty(Object, "assign", {
		value: function assign(target, varArgs) { // .length of function is 2
			'use strict';
			if (target == null) { // TypeError if undefined or null
				throw new TypeError('Cannot convert undefined or null to object');
			}

			var to = Object(target);

			for (var index = 1; index < arguments.length; index++) {
				var nextSource = arguments[index];

				if (nextSource != null) { // Skip over if undefined or null
					for (var nextKey in nextSource) {
						// Avoid bugs when hasOwnProperty is shadowed
						if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
							to[nextKey] = nextSource[nextKey];
						}
					}
				}
			}
			return to;
		},
		writable: true,
		configurable: true
	});
}

// IE 11 backwards compatibility, Promise och Fetch
import 'whatwg-fetch';
import Promise from 'promise-polyfill';

if (!window.Promise) {
	window.Promise = Promise;
}

// Initalisera stöd för flerspråkighet
import Lang from './../ISOF-React-modules/lang/Lang';
window.Lang = Lang;
window.l = Lang.get;

// Initalisera React.js Router som bestämmer vilken "sida" användaren ser baserad på url:et
ReactDOM.render(

	<HashRouter>
		<Route exact path="/">
			<Redirect to="/places" />
		</Route>
		<Route exact path="/record/:record_id" render={({ match }) => (
			<Redirect to={`/records/${match.params.record_id}`} />
		)} />
		<Route exact path="/place/:place_id([0-9]+)" render={({ match }) => (
			<Redirect to={`/places/${match.params.place_id}`} />
		)} />
		<Route 
			path={[
				//"/places/text_ids/:text_ids",
				// Saved records by user
				"/places/record_ids/:record_ids",

				"/places/:place_id([0-9]+)/record_ids/:record_ids",
				"/places/search/:search/person_relation/:person_relation/gender/:gender/(birth_years)?/:birth_years?",
				"/places/search/:search/person_relation/:person_relation/(birth_years)?/:birth_years?",
				"/places/search/:search/person_relation/:person_relation/(gender)?/:gender?",
				"/places/person_relation/:person_relation/gender/:gender/(birth_years)?/:birth_years?",
				"/places/person_relation/:person_relation/(birth_years)?/:birth_years?",
				"/places/person_relation/:person_relation/(gender)?/:gender?",
				"/places/search/:search",
				
				"/places/:place_id([0-9]+)/search/:search/person_relation/:person_relation/gender/:gender/(birth_years)?/:birth_years?",
				"/places/:place_id([0-9]+)/search/:search/person_relation/:person_relation/(birth_years)?/:birth_years?",
				"/places/:place_id([0-9]+)/search/:search/person_relation/:person_relation/(gender)?/:gender?",
				"/places/:place_id([0-9]+)/search/:search",
				//"/places/:place_id([0-9]+)/person_relation/:person_relation/gender/:gender/(birth_years)?/:birth_years?",
				//"/places/:place_id([0-9]+)/person_relation/:person_relation/(birth_years)?/:birth_years?",
				//"/places/:place_id([0-9]+)/person_relation/:person_relation/(gender)?/:gender?",
				"/places/:place_id([0-9]+)",

				"/places", // this has to be the last item in order to match the other routes, 
				//"/places/(has_metadata)?/:has_metadata?", // this has to be the last item in order to match the other routes, 
				// otherwise it will match longer paths as well
				"/records/:record_id/search/:search/person_relation/:person_relation/gender/:gender/(birth_years)?/:birth_years?",
				"/records/:record_id/search/:search/person_relation/:person_relation/(birth_years)?/:birth_years?",
				"/records/:record_id/search/:search/person_relation/:person_relation/(gender)?/:gender?",
				"/records/:record_id/search/:search?",
				"/records/:record_id",

				"/person/:person_id",
			]}
			render={(props) =>
				<Application
					popup={<RecordListWrapper 
						{...props} 
						manuallyOpenPopup={true}
						//highlightRecordsWithMetadataField="sitevision_url" 
						openButtonLabel="Visa sökträffar som lista"
						disableRouterPagination={true}
						/>}
					{...props}	
				/>
			}
		/>
		
	</HashRouter>,

	document.getElementById('app')


// Old:
//			<Route path="/places(/record_ids/:record_ids)(/search/:search)(/year_from/:year_from)(/year_to/:year_to)(/person_relation/:person_relation)(/gender/:gender)(/birth_years/:birth_years)(/person_landskap/:person_landskap)(/person_county/:person_county)(/person_harad/:person_harad)(/person_socken/:person_socken)(/page/:page)" 
//				manuallyOpenPopup="true" openButtonLabel="Visa sökträffar som lista" components={{popup: RecordListWrapper}}/>
//
//			<Route path="/place/:place_id(/record_ids/:record_ids)(/search/:search)(/year_from/:year_from)(/year_to/:year_to)(/person_relation/:person_relation)(/gender/:gender)(/birth_years/:birth_years)(/person_landskap/:person_landskap)(/person_county/:person_county)(/person_harad/:person_harad)(/person_socken/:person_socken)" 
//				components={{popup: PlaceView}}/>
//
//			<Route path="/person/:person_id" 
//				components={{popup: PersonView}}/>
//
//			<Route path="/record/:record_id(/record_ids/:record_ids)(/search/:search)(/year_from/:year_from)(/year_to/:year_to)(/person_relation/:person_relation)(/gender/:gender)(/birth_years/:birth_years)(/person_landskap/:person_landskap)(/person_county/:person_county)(/person_harad/:person_harad)(/person_socken/:person_socken)" 
//				components={{popup: RecordView}}/>
//

);
