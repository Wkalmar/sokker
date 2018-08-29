import { types, applySnapshot } from "mobx-state-tree";
import { keys, runInAction } from "mobx";
// Utils
import defaultFilters from "utils/defaultFilters.utils";


const Filters = {
	att: types.map(types.frozen),
	mid: types.map(types.frozen),
	def: types.map(types.frozen),
	gk: types.map(types.frozen),
	age: types.map(types.frozen),
	skills: types.map(types.frozen),
	search: types.string
};


let timeout = null;
const actions = (self)=> {
	return {

		change(filter={}) {
			clearTimeout(timeout);
			timeout = setTimeout(()=> self.realChange(filter), 100);
		},


		realChange(filter={}) {
			runInAction(`FILTERS-CHANGE-FILTER ${ JSON.stringify(filter) }-SUCCESS`, ()=> {
				const names = Object.keys(filter);

				names.forEach((name)=> {
					switch(name) {
						case "skills":
							const skillName = Object.keys(filter[name])[0];
							filter[name][skillName].order && keys(self.skills).forEach((name)=> self.skills.set(name, { ...self.skills.get(name), order: "✘" }));

							self.skills.set(skillName, { ...self.skills.get(skillName), ...filter[name][skillName] });
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
			});
		},


		resetFilters() {
			applySnapshot(self, defaultFilters);
		}
	};
};


const views = (self)=> {

	return {
		get sortBySkillName() { return Object.keys(self.skills).find((name)=> self.skills[name] !== "✘"); },
	};
};


export default types.model('Filters', Filters).actions(actions).views(views);