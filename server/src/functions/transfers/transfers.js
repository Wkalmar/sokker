import { fromEvent } from 'graphcool-lib';
let request = require('request');
request = request.defaults({ jar: true });

const htmlToJson = require("html-to-json");
const $ = require('cheerio');


async function transfers(event) {
	const graphcool = fromEvent(event);
	const api = graphcool.api('simple/v1');

	const query = `query User($id: ID!) {
			User(id: $id) {
				transfers
				updatedTransfersAt
			}
		}`;

	const response = await api.request(query, { id: 'cjkntd1p42ocw0157motav7bq' });

	if((Date.now() - +response.User.updatedTransfersAt) / 1000 / 60 > 3) {
		const players = await parse();

		const mutation = `
		mutation updateUser($id: ID!, $transfers: String, $updatedTransfersAt: String) {
			updateUser(id: $id, transfers: $transfers, updatedTransfersAt: $updatedTransfersAt) {
				id
				transfers
				updatedTransfersAt
			}
		}`;

		api.request(mutation, {
			id: 'cjkntd1p42ocw0157motav7bq',
			transfers: JSON.stringify(players),
			updatedTransfersAt: "" + Date.now()
		});

		return {
			data: {
				response: JSON.stringify(players)
			}
		}
	} else {
		return {
			data: {
				response: response.User.transfers
			}
		}
	}
}


async function parse() {

	return new Promise(async (mainResolver) => {
		await request.post({
			url: 'http://sokker.org/start',
			form: {
				ilogin: 'benelone',
				ipassword: 'password'
			}
		}, function (error, response, body) {
			if(response.statusCode === 302 && response.headers && response.headers.location) {
				let promisePlayersDataArray = [];

				for(let page in Array.from({ length: 7 }, (v, k) => k)) {
					promisePlayersDataArray.push(new Promise((resolve, reject)=> {

						request(`http://sokker.org/transferSearch/pg/${page+1}`, (error, response, body)=> {

							htmlToJson.parse(body, ['.panel-body .well',
								function ($item) { return $item; },
								function ($players) {
									const DATA = [];
									$players.forEach((item)=> {
										const $player = $(item);

										const id = $player.find("#playerCell").find("div").first().text().trim();

										const details = $($player.find('.col-md-6.col-sm-5.col-xs-12.small').find("strng").html().split("<br>")[0]).text().trim();
										const endOfTrade = $($player.find('.col-md-6.col-sm-5.col-xs-12.small').find("strng").find("strong")[2]).text().trim();

										const skills = $player.find('.table.table-condensed.table-skills td')
											.text().trim().split('\n');

										const name = $player.find('a').text().trim();
										const age = +$player.find('.h5').text().trim().split('wiek')[1] / 100;
										const stamina = +skills[0].split('[')[1].split(']')[0] / 100;
										const keeper = +skills[1].split('[')[1].split(']')[0] / 100;
										const pace = +skills[2].split('[')[1].split(']')[0] / 100;
										const defender = +skills[3].split('[')[1].split(']')[0] / 100;
										const technique = +skills[4].split('[')[1].split(']')[0] / 100;
										const playmaker = +skills[5].split('[')[1].split(']')[0] / 100;
										const passing = +skills[6].split('[')[1].split(']')[0] / 100;
										const striker = +skills[7].split('[')[1].split(']')[0] / 100;

										DATA.push({
											id, name, age, stamina, keeper, pace, defender, technique, playmaker, passing, striker, details, endOfTrade
										});
									});
									return DATA;
								}])
								.done(function(player) {
									resolve(player);
								});
						});
					}));
				}

				Promise.all(promisePlayersDataArray).then((players)=> {
					mainResolver([].concat.apply([], players));
				});
			} else {
				mainResolver([]);
			}
		})
	});
}


export default transfers;