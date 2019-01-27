"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = require("child_process");
/**
 * AppEvent - 個別のイベントを管理するクラス
 */
class AppEvent {
    constructor(eventName) {
        console.log('AppEvent: ', 'constructor');
        this.eventName = eventName;
        this.steps = [];
    }
    add(name, command) {
        this.steps.push({
            name,
            command,
        });
    }
    exec() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                for (let run of this.steps) {
                    console.log(run.name);
                    yield this.execCommand(run.command, reject);
                }
                resolve();
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    execCommand(sh, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            yield childProcess.exec(sh, (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
            });
        });
    }
}
exports.AppEvent = AppEvent;