import { spy } from "mobx";
// import { onPatch } from "mobx-state-tree";
// Models
import RootModel from "models/Root.model";


const store = RootModel.create({
	isRenderInterface: false,
	lang: "en",
	isOpenSidebar: false,
	NET: { status: "initial", errorThresh: 0, maxErrorThresh: 0.005 },
	device: "desktop",
	users: {},
	players: {
		isHideCharts: true
	},
	transfers: {},
	filters: {
		age: {
			range: [16, 35],
			order: "✘"
		},
		skills: {
			stamina: {
				order: "✘",
				range: [0, 17]
			},
			keeper: {
				order: "✘",
				range: [0, 17]
			},
			pace: {
				order: "✘",
				range: [0, 17]
			},
			defender: {
				order: "✘",
				range: [0, 17]
			},
			technique: {
				order: "✘",
				range: [0, 17]
			},
			playmaker: {
				order: "✘",
				range: [0, 17]
			},
			passing: {
				order: "✘",
				range: [0, 17]
			},
			striker: {
				order: "✘",
				range: [0, 17]
			},
			ATT: {
				order: "✘",
				range: [0, 17]
			},
			DEF: {
				order: "✘",
				range: [0, 17]
			},
			MID: {
				order: "✘",
				range: [0, 17]
			},
			GK: {
				order: "✘",
				range: [0, 17]
			}
		},
		search: ""
	}
});


// MobX spy goes here
spy((event)=> {
	switch(event.type) {
		case 'action':
			if(event.name.match('@reaction')) return console.log('%c' + event.name, 'color: gray');
			if(event.name.match('-PENDING')) return console.log('%c' + event.name, 'color: darkorange');
			if(event.name.match('-ERROR')) return console.log('%c' + event.name, 'color: darkred');
			if(event.name.match('-SUCCESS')) return console.log('%c' + event.name, 'color: green');
			break;
		default :
			break;
	}
});


// @SOURCE: https://github.com/mobxjs/mobx-state-tree/blob/master/API.md#onpatch
// onPatch(store, (patch)=> {
// 	let color = 'color: gray;';
// 	switch(patch.op) {
// 		case "add":
// 			color = 'color: green;';
// 			break;
// 		case "replace":
// 			color = 'color: darkorange;';
// 			break;
// 		case "remove":
// 			color = 'color: darkred;';
// 			break;
// 		default:
// 			color = 'color: black';
// 			break;
// 	}
// 	console.groupCollapsed(`%c🦄🌈 [@action: ${patch.op} ${patch.path}]`, color);
// 	console.log(patch);
// 	console.groupEnd(`%c🦄🌈 [@action: ${patch.op} ${patch.path}]`, color);
// });


export default store;