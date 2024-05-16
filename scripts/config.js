export default {
	// Namn på localStorage som lagrar sparade sägner
	localLibraryName: 'dialektkarta_library',

	// Parametrar som alltid skulle skickas till API:et, här passar vi på att sägenkartan alltid hämtar textar av typ arkiv eller tryckt och som finns i en kategori
	requiredParams: {
		type: 'dialektkartan',
	},

	// Speciella inställningar för projektet, används nu mest för Matkarta-GUI, siteOptions som property av config måste dock finnas
	siteOptions: {
		recordView: {
			// Vilka metadata fälts skulle visas i RecordView, används för folkmusiken
			/*
			visible_metadata_fields: [
				'folkmusik_instrument',
				'folkmusik_recorded_by',
				'folkmusik_musician_name',
				'folkmusik_genre',
				'folkmusik_proveniens'
			],
			*/

			// Placering av ljudspelare ('under'|'right' (standard 'right'))
			audioPlayerPosition: 'under',

			// Placering av bilder ('under'|'right' (standard 'right'))
			imagePosition: 'right',

			// Placering av pdf filer ('under'|'right' (standard 'right'))
			pdfIconsPosition: 'under',

			// Döljd materialtyp i RecordView, används för matkartan
			hideMaterialType: true,

		},
		recordList: {
			// Visa playbutton i RecordList, används för ?
			displayPlayButton: false,

			// Döljd materialtyp i RecordList, används för matkartan
			hideMaterialType: true,

			// Döljd accession:page i RecordList, används för dialektkartan
			hideAccessionpage: true,

			// Dölj kategorier kolumn i RecordList, används för folkmusiken
			hideCategories: true,

			// Dölj TranscriptionStatus kolumn i RecordList, används bara för crowdsource?
			hideTranscriptionStatus: true,

			// Vilka kategorier vi vill visa i listan, här vill vi bara visa matkarta kategorier men dölja frågolista-kategorier
			//visibleCategories: ['sägner']
		},

		// Namn på metadata labels, används i koppling med visible_metadata_fields
		/*
		metadataLabels: {
			folkmusik_instrument: 'Sång/instrument',
			folkmusik_recorded_by: 'Inspelat eller inlämnat av',
			folkmusik_musician_name: 'Sångare/instrumentalist',
			folkmusik_genre: 'Låttyp eller visgenre',
			folkmusik_proveniens: 'Proveniens'
		},
		*/

		// Inaktivera länker till personer, visa bara namnet
		disableInformantLinks: true,
	},

	// Vilket land vi hämtar data från
	country: 'sweden',

	// Webbsida som ska visas i OverlayWindow när användaren först kommer till kartan
	startPageUrl: 'https://www.isof.se/om-oss/kartor/sagenkartan/om-sagenkartan---kort.html',

	imageUrl: 'https://www4.isof.se/Folkminnen/Svenska_sagor_filer/',
	audioUrl: 'https://www4.isof.se/Folkminnen/Svenska_sagor_filer/dialekter/',

	appUrl: 'https://dialektkartan.isof.se/',
	//appUrl: 'https://frigg.isof.se/static/js-apps/dialektkartan/',
	// For share links to users and MAYBE some image links (is last slash needed?):
	siteUrl: 'https://www.isof.se/dialektkartan/',

	// Url till Django/Elasticsearch API
	apiUrl: 'https://garm.isof.se/folkeservice/api/es/',

	// Url till Django Rest API
	restApiUrl: 'https://garm.isof.se/folkeservice/api/'
};