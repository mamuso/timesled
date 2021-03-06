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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tar = __importStar(require("tar"));
class Compress {
    constructor(config) {
        /**
         * Compress folder.
         */
        this.dir = (compresspath, destination) => __awaiter(this, void 0, void 0, function* () {
            yield tar.c({
                gzip: true,
                file: destination
            }, [compresspath]);
        });
        /**
         * Uncompress folder.
         */
        this.extract = (compresspath, destination) => __awaiter(this, void 0, void 0, function* () {
            yield tar.x({
                file: compresspath,
                strip: 2,
                cwd: destination
            });
        });
        this.config = Object.assign({}, config);
    }
}
exports.default = Compress;
