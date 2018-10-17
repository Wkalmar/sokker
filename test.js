import { types } from "mobx-state-tree";
import { values } from "mobx";

// server DATA
const tree = [
	{
		"dirs": [

				{
					"dirs": [],
					"files": [],
					"full_path": "/test2/test1",
					"id": 73
				},
				{
					"dirs": [],
					"files": [],
					"full_path": "/test2/test2",
					"id": 74
				},
				{
					"dirs": [],
					"files": [],
					"full_path": "/test2/test3",
					"id": 75
				},
				{
					"dirs": [

							{
								"dirs": [

										{
											"dirs": [],
											"files": [],
											"full_path": "/test2/test_directory/test1/kazino777",
											"id": 777
										}

								],
								"files": [],
								"full_path": "/test2/test_directory/test1",
								"id": 77
							},
							{
								"dirs": [],
								"files": [],
								"full_path": "/test2/test_directory/test2",
								"id": 78
							},
							{
								"dirs": [],
								"files": [],
								"full_path": "/test2/test_directory/test3",
								"id": 79
							}

					],
					"files": [],
					"full_path": "/test2/test_directory",
					"id": 76
				}

		],
		"files": [
			{
				"id": 604556312,
				"name": "test.txt"
			},
			{
				"id": 343534,
				"name": "test2.txt"
			}
		],
		"full_path": "/test2",
		"id": 50
	},
	{
		"dirs": [

				{
					"dirs": [],
					"files": [{ id: 42, "name": "keks.mp3" }],
					"full_path": "/root_22/test_1",
					"id": 83
				},
				{
					"dirs": [],
					"files": [],
					"full_path": "/root_22/test_30",
					"id": 99
				}

		],
		"files": [],
		"full_path": "/root_22",
		"id": 81
	},
	{
		"dirs": [],
		"files": [],
		"full_path": "/root_10",
		"id": 86
	}
];


function parse(node) {
	if(node.name) return [{ name: node.name, id: "" + node.id }];
	return [
		{
			id: "" + node.id,
			fullPath: node.full_path,
			nodes: [
				...node.files.map(file => "" + file.id),
				...node.dirs.map(dir => "" + dir.id)
			]
		},
		...parseTree(node.dirs),
		...parseTree(node.files)
	]
}


function parseTree(tree) {
	return tree.reduce((res, node)=> [ ...res, ...parse(node)], []);
}

function format(parsedTree) {
	return parsedTree.reduce((res, node)=> ({ ...res, [node.id]: node }), {});
}

// console.log(format(parseTree(tree)), "format");

let store = null;

const File = types.model("File", {
	id: types.identifier(),
	name: types.string
}).views(self => ({
	get head() {
		return values(store.tree.nodes).find((node)=> node.nodes ? node.nodes.toJSON().includes(self.id) : false );
	}
}));

const Folder = types.model("Folder", {
	id: types.identifier(),
	fullPath: types.string,
	nodes: types.array(types.reference(types.union(types.late(() => Folder), File)))
}).views(self => ({
	get head() {
		return values(store.tree.nodes).find((node)=> node.nodes ? node.nodes.toJSON().includes(self.id) : false );
	}
}));

const Tree = types.model("Tree", {
	nodes: types.optional(types.map(types.union(Folder, File)), {})
});


const Store = types.model("Root", {
	tree: Tree
});

store = Store.create({
	tree: {
		nodes: format(parseTree(tree))
	}
});

console.log("store.tree.nodes", store.tree.nodes.toJSON());

const folder50 = store.tree.nodes.get('50');
console.log('folder50', folder50.toJSON());

const folder50_76 = folder50.nodes.find((node)=> node.id === '76');
console.log('folder50_76', folder50_76.toJSON());

const folder50_76_77 = folder50_76.nodes.find((node)=> node.id === '77');
console.log('folder50_76_77', folder50_76_77.toJSON());


const folder50_76_77_777 = folder50_76_77.nodes.find((node)=> node.id === '777');
console.log('folder50_76_77_777', folder50_76_77_777.toJSON(), store.tree.nodes.get('777').toJSON());

console.log('folder50', folder50_76_77_777.head.head.head);