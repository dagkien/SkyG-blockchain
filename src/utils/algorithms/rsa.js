export const rsa = function (p, q) {
  (this.p = p), (this.q = q);

  // calculate x^y%m
  function modpow(x, y, m) {
    if (y == 0) return 1;
    let t = x;
    let r = 1;
    while (y != 0) {
      const k = y & 1;
      if (k == 1) r = (r * t) % m;
      y = y >> 1;
      t = (t * t) % m;
    }
    return r;
  }

  function gcd(a, b) {
    if (b == 0) return a;
    return gcd(b, a % b);
  }

  this.computeKeys = function () {
    const n = this.p * this.q;
    const lambda = ((this.p - 1) * (this.q - 1)) / gcd(this.p - 1, this.q - 1);
    const e = 31; // co-prime with lambda
    let d = 1;
    while ((d * e) % lambda != 1) {
      d++;
    }

    this.sk = [n, d];
    this.pk = [n, e];
  };

  this.encrypt = function (msg) {
    let enc = "";
    const n = this.pk[0];
    const e = this.pk[1];

    for (let i = 0; i < msg.length; i++) {
      const m = msg.charCodeAt(i);
      enc += String.fromCharCode(modpow(m, e, n));
    }
    return enc;
  };

  this.decrypt = function (msg) {
    let dec = "";
    const n = this.sk[0];
    const d = this.sk[1];

    for (let i = 0; i < msg.length; i++) {
      const m = msg.charCodeAt(i);
      dec += String.fromCharCode(modpow(m, d, n));
    }
    return dec;
  };

  this.signature = function (msg) {
    return this.decrypt(msg);
  };

  this.verify = function (msg, signature) {
    return this.decrypt(msg) == signature;
  };
};
