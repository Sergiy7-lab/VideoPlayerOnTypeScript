class Player {
  parsedVastUrl: any;
  video: any;
  playButton: HTMLButtonElement;
  stopButton: HTMLButtonElement;
  closeButton: HTMLButtonElement;
  constructor() {
    this.playButton = document.querySelector(".btplay")! as HTMLButtonElement;
    this.playButton.addEventListener("click", this.playHandler.bind(this));
    this.stopButton = document.querySelector(".btpause")! as HTMLButtonElement;
    this.stopButton.addEventListener("click", this.pauseHandler.bind(this));
    this.closeButton = document.querySelector(".btnRmv")! as HTMLButtonElement;
    this.closeButton.addEventListener("click", this.closeHandler.bind(this));
  }

  async setVastUrl(url: string) {
    await fetch(url)
      .then((data) => {
        return data.text();
      })
      .then((data) => {
        this.load(data);
      })
      .then(() => {
        this.start();
      });
  }

  load(data: any) {
    const parser = new DOMParser();
    this.parsedVastUrl = parser.parseFromString(data, "text/xml");
    console.log(typeof this.parsedVastUrl);
  }

  start() {
    const start = this.parsedVastUrl.querySelector("MediaFile").firstChild
      .nodeValue;

    const vid = document.querySelector(".video") as HTMLVideoElement;

    vid.innerHTML = `<video height="350px" width="650px" id="playVideo">  <source  src="${start}" > </video>`;
    this.video = document.querySelector("video") as HTMLVideoElement;
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
player.setVastUrl(
  "https://inv-nets.admixer.net/dsp.aspx?rct=3&item=152bea5c-5635-4455-8cae-327b429cf376&pre=1"
);
