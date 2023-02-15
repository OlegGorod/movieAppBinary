"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
exports.__esModule = true;
exports.render = void 0;
function render() {
    return __awaiter(this, void 0, void 0, function () {
        function showApi() {
            return __awaiter(this, void 0, void 0, function () {
                var response, responseData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch(APIURL)];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            responseData = _a.sent();
                            console.log(responseData);
                            showMovie(responseData);
                            return [2 /*return*/];
                    }
                });
            });
        }
        var APIURL, IMGPATH, SEARCHAPI, GENREAPI, APIKEY, btnTrigger, movie, showMovie;
        return __generator(this, function (_a) {
            APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
            IMGPATH = 'https://image.tmdb.org/t/p/w500';
            SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
            GENREAPI = 'https://api.themoviedb.org/3/genre/movie/list?api_key=04c35731a5ee918f014970082a0088b1&query=';
            APIKEY = 'api_key=04c35731a5ee918f014970082a0088b1&query=';
            btnTrigger = document.querySelector('#button-wrapper');
            movie = document.querySelector('.card');
            btnTrigger === null || btnTrigger === void 0 ? void 0 : btnTrigger.addEventListener('click', function (e) {
                var target = e.target;
                console.log(target);
            });
            showApi();
            showMovie = function (data) {
                data.results.forEach(function (element) {
                    var poster_path = element.poster_path, title = element.title, vote_average = element.vote_average, release_date = element.release_date, overview = element.overview, id = element.id;
                    // movie?.firstElementChild.src = `${IMGPATH} + ${poster_path}`
                    console.log(element);
                });
                // movie.forEach(item => {
                //     console.log(item.firstElementChild.src = `${IMGPATH} + ${poster_path}`)
                // });
                // poster_path
            };
            return [2 /*return*/];
        });
    });
}
exports.render = render;
