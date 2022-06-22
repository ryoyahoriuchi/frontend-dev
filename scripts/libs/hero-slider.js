class HeroSlider {
  constructor(el) {
    this.el = el;
    this.swiper = this._initSwiper();
  }

  _initSwiper() {
    return new Swiper (this.el, {
      // Optional perameters
      // direction: 'vertical', //この記述をなくせば横スライドによる画像切替となる
      loop: true,
      effect: 'coverflow',
      // effect: 'fade', effect: 'coverflow'
      grabCursor: true,
      
      centeredSlides: true, //スライダーが中央ぞろえになる？
      slidesPerView: 1, //何枚の画像を映すか設定できる
      speed: 1000,
      breakpoints: {
        1024: {
          slidesPerView: 2,
        }
      }, //画面サイズが1024以上の時にスライドが2枚表示される(メイン1枚、左右0.5枚×2)
      // autoplay: {
      //   delay: 4000, //4秒ごとに自動でスライドが切り替わる
      //   disableOnInteraction: false
      //   //手動でスライド切替した後も4秒後にスライドが自動切り替わる設定
      //   //つけなければ手動切替後は自動スライド機能は行わなくなる。
      // }
    });
  }

  start(options = {}) {
    options = Object.assign({
      delay: 4000, //4秒ごとに自動でスライドが切り替わる
      disableOnInteraction: false //手動でスライドの自動化をするか変更できるようにする
    }, options);
    this.swiper.params.autoplay = options;
    this.swiper.autoplay.start();
  }
  stop() {
    this.swiper.autoplay.stop();
  }
}