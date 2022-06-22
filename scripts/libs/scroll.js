class ScrollObserver {
  constructor(els, cb, options) {
      this.els = document.querySelectorAll(els);
      const defaultOptions = {
          root: null,
          rootMargin: "0px",
          threshold: 0,
          once: true
      };
      this.cb = cb;
      this.options = Object.assign(defaultOptions, options);
      //assign()でdefaulOptionsとoptionsをマージしている
      this.once = this.options.once;
      this._init();
  }
  _init() {
      const callback = function (entries, observer) {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  // thisの引き渡しがうまくいっていないと思ったら
                  // console.log(this);を書いて値を確認する。
                  this.cb(entry.target, true);
                  if(this.once){
                      observer.unobserve(entry.target);
                  }
              } else {
                  this.cb(entry.target, false);
              }
          });
      };

      this.io = new IntersectionObserver(callback.bind(this), this.options);
      this.io.POLL_INTERVAL = 100;
      this.els.forEach(el => this.io.observe(el));
  }
  //_initととして別メソッドにしたのは、elsに値をすべて格納してから
  //複雑な処理をした方が変数の定義漏れを防ぎやすくなりバグ混入リスクを低減できる。

  destory() {
      this.io.disconnect();
  }
}