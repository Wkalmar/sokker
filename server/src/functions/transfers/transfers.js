import { fromEvent } from 'graphcool-lib';
let request = require('request');
request = request.defaults({ jar: true });

const htmlToJson = require("html-to-json");
const $ = require('cheerio');


async function transfers(event) {
	const graphcool = fromEvent(event);
	const api = graphcool.api('simple/v1');

	const query = `query Cache($id: ID!) {
			Cache(id: $id) {
				transfers,
				updatedAt
			}
		}`;

	const response = await api.request(query, { id: 'cjlz7ojk810tg0166fxs0kgpc' });

	// Cache for 3 min
	const diffInMinutes = (Date.now() - new Date(response.Cache.updatedAt).valueOf()) / 1000 / 60;
	if(diffInMinutes > 4) {
		const players = await parse();

		const mutation = `
		mutation updateCache($id: ID!, $transfers: String) {
			updateCache(id: $id, transfers: $transfers) {
				id
				transfers
			}
		}`;

		api.request(mutation, {
			id: "cjlz7ojk810tg0166fxs0kgpc",
			transfers: JSON.stringify(players)
		});

		return {
			data: {
				response: JSON.stringify(players)
			}
		}
	} else {
		return {
			data: {
				response: response.Cache.transfers
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

				for(let page in Array.from({ length: 10 }, (v, k) => k)) {
					promisePlayersDataArray.push(new Promise((resolve, reject)=> {

						request(`http://sokker.org/transferSearch/pg/${page+1}`, (error, response, body)=> {

							htmlToJson.parse(body, ['.panel-body .well',
								function ($item) { return $item; },
								function ($players) {
									const DATA = [];
									$players.forEach((item)=> {
										const $player = $(item);
										const $col = $($player.find('.col-md-6.col-sm-5.col-xs-12.small'));

										const id = $player.find("#playerCell").find("div").first().text().trim();

										const currentBid = $($col).text().trim().split('Aktualna oferta: ')[1] && $($col).text().trim().split('Aktualna oferta: ')[1].split('zł')[0].trim();
										const saleFor = $($col).text().trim().split('Wystawiony za: ')[1] && $($col).text().trim().split('Wystawiony za: ')[1].split('zł')[0].trim();
										const endOfTrade = $($col.find("strng").find("strong")[2]).text().trim();

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
											id, name, age, stamina, keeper, pace, defender, technique, playmaker, passing, striker, currentBid, saleFor, endOfTrade
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