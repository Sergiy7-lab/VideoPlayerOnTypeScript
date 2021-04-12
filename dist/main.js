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
class Player {
    constructor() {
        this.playButton = document.querySelector(".btplay");
        this.playButton.addEventListener("click", this.playHandler.bind(this));
        this.stopButton = document.querySelector(".btpause");
        this.stopButton.addEventListener("click", this.pauseHandler.bind(this));
        this.closeButton = document.querySelector(".btnRmv");
        this.closeButton.addEventListener("click", this.closeHandler.bind(this));
    }
    setVastUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(url)
                .then((data) => {
                return data.text();
            })
                .then((data) => {
                this.load(data);
            })
                .then(() => {
                this.start();
            });
        });
    }
    load(data) {
        const parser = new DOMParser();
        this.parsedVastUrl = parser.parseFromString(data, "text/xml");
        console.log(typeof this.parsedVastUrl);
    }
    start() {
        const start = this.parsedVastUrl.querySelector("MediaFile").firstChild
            .nodeValue;
        const vid = document.querySelector(".video");
        vid.innerHTML = `<video height="350px" width="650px" id="playVideo">  <source  src="${start}" > </video>`;
        this.video = document.querySelector("video");
    }
    playHandler() {
        this.video.play();
    }
    pauseHandler() {
        this.video.pause();
    }
    closeHandler() {
        this.video.remove();
    }
}
const player = new Player();
player.setVastUrl("https://inv-nets.admixer.net/dsp.aspx?rct=3&item=152bea5c-5635-4455-8cae-327b429cf376&pre=1");
//# sourceMappingURL=main.js.map