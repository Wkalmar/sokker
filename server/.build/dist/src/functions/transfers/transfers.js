"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphcool_lib_1 = require("graphcool-lib");
var request = require('request');
request = request.defaults({ jar: true });
var htmlToJson = require("html-to-json");
var $ = require('cheerio');
function transfers(event) {
    return __awaiter(this, void 0, void 0, function () {
        var graphcool, api, query, response, players, mutation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    graphcool = graphcool_lib_1.fromEvent(event);
                    api = graphcool.api('simple/v1');
                    query = "query User($id: ID!) {\n\t\t\tUser(id: $id) {\n\t\t\t\ttransfers\n\t\t\t\tupdatedTransfersAt\n\t\t\t}\n\t\t}";
                    return [4 /*yield*/, api.request(query, { id: 'cjkntd1p42ocw0157motav7bq' })];
                case 1:
                    response = _a.sent();
                    if (!((Date.now() - +response.User.updatedTransfersAt) / 1000 / 60 > 3)) return [3 /*break*/, 3];
                    return [4 /*yield*/, parse()];
                case 2:
                    players = _a.sent();
                    mutation = "\n\t\tmutation updateUser($id: ID!, $transfers: String, $updatedTransfersAt: String) {\n\t\t\tupdateUser(id: $id, transfers: $transfers, updatedTransfersAt: $updatedTransfersAt) {\n\t\t\t\tid\n\t\t\t\ttransfers\n\t\t\t\tupdatedTransfersAt\n\t\t\t}\n\t\t}";
                    api.request(mutation, {
                        id: 'cjkntd1p42ocw0157motav7bq',
                        transfers: JSON.stringify(players),
                        updatedTransfersAt: "" + Date.now()
                    });
                    return [2 /*return*/, {
                            data: {
                                response: JSON.stringify(players)
                            }
                        }];
                case 3: return [2 /*return*/, {
                        data: {
                            response: response.User.transfers
                        }
                    }];
            }
        });
    });
}
function parse() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (mainResolver) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, request.post({
                                    url: 'http://sokker.org/start',
                                    form: {
                                        ilogin: 'benelone',
                                        ipassword: 'password'
                                    }
                                }, function (error, response, body) {
                                    if (response.statusCode === 302 && response.headers && response.headers.location) {
                                        var promisePlayersDataArray = [];
                                        var _loop_1 = function (page) {
                                            promisePlayersDataArray.push(new Promise(function (resolve, reject) {
                                                request("http://sokker.org/transferSearch/pg/" + (page + 1), function (error, response, body) {
                                                    htmlToJson.parse(body, ['.panel-body .well',
                                                        function ($item) { return $item; },
                                                        function ($players) {
                                                            var DATA = [];
                                                            $players.forEach(function (item) {
                                                                var $player = $(item);
                                                                var $col = $($player.find('.col-md-6.col-sm-5.col-xs-12.small'));
                                                                var id = $player.find("#playerCell").find("div").first().text().trim();
                                                                var currentBid = $($col).text().trim().split('Aktualna oferta: ')[1] && $($col).text().trim().split('Aktualna oferta: ')[1].split('zł')[0].trim();
                                                                var saleFor = $($col).text().trim().split('Wystawiony za: ')[1] && $($col).text().trim().split('Wystawiony za: ')[1].split('zł')[0].trim();
                                                                var endOfTrade = $($col.find("strng").find("strong")[2]).text().trim();
                                                                var skills = $player.find('.table.table-condensed.table-skills td')
                                                                    .text().trim().split('\n');
                                                                var name = $player.find('a').text().trim();
                                                                var age = +$player.find('.h5').text().trim().split('wiek')[1] / 100;
                                                                var stamina = +skills[0].split('[')[1].split(']')[0] / 100;
                                                                var keeper = +skills[1].split('[')[1].split(']')[0] / 100;
                                                                var pace = +skills[2].split('[')[1].split(']')[0] / 100;
                                                                var defender = +skills[3].split('[')[1].split(']')[0] / 100;
                                                                var technique = +skills[4].split('[')[1].split(']')[0] / 100;
                                                                var playmaker = +skills[5].split('[')[1].split(']')[0] / 100;
                                                                var passing = +skills[6].split('[')[1].split(']')[0] / 100;
                                                                var striker = +skills[7].split('[')[1].split(']')[0] / 100;
                                                                DATA.push({
                                                                    id: id, name: name, age: age, stamina: stamina, keeper: keeper, pace: pace, defender: defender, technique: technique, playmaker: playmaker, passing: passing, striker: striker, currentBid: currentBid, saleFor: saleFor, endOfTrade: endOfTrade
                                                                });
                                                            });
                                                            return DATA;
                                                        }])
                                                        .done(function (player) {
                                                        resolve(player);
                                                    });
                                                });
                                            }));
                                        };
                                        for (var page in Array.from({ length: 7 }, function (v, k) { return k; })) {
                                            _loop_1(page);
                                        }
                                        Promise.all(promisePlayersDataArray).then(function (players) {
                                            mainResolver([].concat.apply([], players));
                                        });
                                    }
                                    else {
                                        mainResolver([]);
                                    }
                                })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.default = transfers;
