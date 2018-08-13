import { types } from "mobx-state-tree";
import { keys } from "mobx";


const Filters = {
	age: types.map(types.frozen),
	skills: types.map(types.frozen),
	search: types.string
};


const actions = (self)=> {
	return {
		
		change(filter={}) {
			const names = Object.keys(filter);

			names.forEach((name)=> {
				switch(name) {
					case "skills":
						keys(self.skills).forEach((name)=> self.skills.set(name, { ...self.skills.get(name), order: "✘" }));

						const skillName = Object.keys(filter[name])[0];
						self.skills.set(skillName, { ...self.skills.get(skillName), order: filter[name][skillName] });
						break;
					case "search":
						self.search = filter["search"];
						break;
					default:
						Object.keys(filter[name]).forEach((prop)=> {
							self[name].set(prop, filter[name][prop]);
						});
						break;
				}
			});
		}
	};
};


const views = (self)=> {

	return {
		get sortBySkillName() { return Object.keys(self.skills).find((name)=> self.skills[name] !== "✘"); },
	};
};


export default types.model('Filters', Filters).actions(actions).views(views);