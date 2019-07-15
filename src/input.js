class Keyboard {
    constructor() {
        this.keyState = new Map();
        this.keyAction = new Map();

        window.addEventListener("keydown", (e) => this.action(e));
        window.addEventListener("keyup", (e) => this.action(e));

        this.addKey = (k, a) => {
            this.keyAction.set(k, a);
            this.keyState.set(k, Const.RELEASED);
        };
    }

    action(e) {
        if (!this.keyState.has(e.keyCode)) return;

        e.preventDefault();

        const keyS = e.type === "keydown" ? Const.PRESSED : Const.RELEASED;

        if (this.keyState.get(e.keyCode) !== keyS) {
            this.keyState.set(e.keyCode, keyS);
            this.keyAction.get(e.keyCode)(keyS);
        }
    }

    clear() {
        this.keyState.clear();
        this.keyAction.clear();
    }
}

import * as Const from "./const.js";

export default class Input {
    constructor(func) {
        this.keyboard = new Keyboard();

        this.keyboard.addKey(Const.LEFT, (e) => {
            func(Const.LEFT, e);
        });

        this.keyboard.addKey(Const.RIGHT, (e) => {
            func(Const.RIGHT, e);
        });

        this.keyboard.addKey(Const.SWAP, (e) => {
            func(Const.SWAP, e);
        });

        this.keyboard.addKey(Const.DOWN, (e) => {
            func(Const.DOWN, e);
        });
    }
}