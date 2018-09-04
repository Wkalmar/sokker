import { spy } from "mobx";
import i18n from 'i18n';
// Utils
import defaultFilters from "utils/defaultFilters.utils";
// Models
import RootModel from "models/Root.model";


const store = RootModel.create({
	lang: i18n.lang,
	isOpenSidebar: false,
	NET: { status: "disabled", errorThresh: 0, maxErrorThresh: 0.005 },
	device: "desktop",
	users: {},
	players: {
		isHideCharts: true
	},
	transfers: {},
	filters: defaultFilters
});


// MobX spy goes here
spy((event)=> {
	switch(event.type) {
		case 'action':
			if(event.name.match('@reaction')) return console.log('%c' + event.name, 'color: gray');
			if(event.name.match('-PENDING')) return console.log('%c' + event.name, 'color: darkorange');
			if(event.name.match('-WARNING')) return console.log('%c' + event.name, 'color: orange');
			if(event.name.match('-ERROR')) return console.log('%c' + event.name, 'color: darkred');
			if(event.name.match('-SUCCESS')) return console.log('%c' + event.name, 'color: green');
			break;
		default :
			break;
	}
});


export default store;