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
    add(name, command, sync) {
        this.steps.push({
            name,
            command,
            sync,
        });
    }
    exec() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                for (let run of this.steps) {
                    console.log(run.name);
                    if (run.sync) {
                        yield this.execCommandSync(run.command);
                    }
                    else {
                        yield this.execCommand(run.command);
                    }
                }
                resolve();
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    execCommand(sh) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const args = this.commandArgs2Array(sh);
                    const c = args.shift() || '';
                    let p = childProcess.spawn(c, [...args], {
                        detached: true,
                        stdio: ['ignore', 'ignore', 'ignore'],
                    });
                    p.unref();
                    setTimeout(() => {
                        resolve();
                    }, 5000);
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
    execCommandSync(sh) {
        return new Promise((resolve, reject) => {
            childProcess.exec(sh, (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                console.log(stdout);
                resolve();
            });
        });
    }
    // https://stackoverflow.com/questions/13796594/how-to-split-string-into-arguments-and-options-in-javascript
    commandArgs2Array(text) {
        const re = /^"[^"]*"$/; // Check if argument is surrounded with double-quotes
        const re2 = /^([^"]|[^"].*?[^"])$/; // Check if argument is NOT surrounded with double-quotes
        let arr = [];
        let argPart = null;
        text &&
            text.split(' ').forEach(function (arg) {
                if ((re.test(arg) || re2.test(arg)) && !argPart) {
                    arr.push(arg);
                }
                else {
                    argPart = argPart ? argPart + ' ' + arg : arg;
                    // If part is complete (ends with a double quote), we can add it to the array
                    if (/"$/.test(argPart)) {
                        arr.push(argPart);
                        argPart = null;
                    }
                }
            });
        return arr;
    }
}
exports.AppEvent = AppEvent;
