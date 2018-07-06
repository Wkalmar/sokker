import { types } from "mobx-state-tree";


const Filters = {
	age: types.frozen,
	skills: types.frozen,
	search: types.string
};


const actions = (self)=> {
	return {
		
		change(filter={}) {
			const names = Object.keys(filter);

			names.forEach((name)=> {
				switch(name) {
					case "skills":
						const resetSkills = {};
						Object.keys(self.skills).forEach((skillName)=> resetSkills[skillName] = "✘");

						const skillName = Object.keys(filter[name])[0];
						self.skills = { ...resetSkills, [skillName]: filter[name][skillName] };
						break;
					case "search":
						self.search = filter["search"];
						break;
					default:
						Object.keys(filter[name]).forEach((prop)=> {
							self[name] = { ...self[name], [prop]: filter[name][prop] };
						});
						break;
				}
			});
		},


		filter(players = []) :Array {
			players = players.filter((player)=> {
				return player.age * 100 >= self.age.range[0] && player.age * 100 <= self.age.range[1]
			});
			console.log("Time to filter!", players, self);

			return players;
		}
	};
};


const views = (self)=> {

	return {
		get sortBySkillName() { return Object.keys(self.skills).find((name)=> self.skills[name] !== "✘"); },
	};
};


export default types.model('Filters', Filters).actions(actions).views(views);