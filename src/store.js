import { spy } from "mobx";
import i18n from 'i18n';
// Utils
import defaultFilters from "utils/defaultFilters.utils";
// Models
import RootModel from "models/Root.model";

// Access to the features
const watchAllAdmins = 1;
const createNewAdmin = 2;
const updateAdminProfile = 4;
const watchAllUsers = 16;
const updateLicense = 32;
const sudosu = 64;


const admin0 = watchAllAdmins;
const admin1 = admin0 | createNewAdmin;
const admin2 = admin1 | updateAdminProfile;
const admin3 = admin2 | watchAllUsers;
const admin4 = admin3 | updateLicense;
const admin5 = admin4 | sudosu;


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