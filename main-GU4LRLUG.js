import { a as C, b as G, c as xt } from "./chunk-2VMXMS7J.js";
var Tc;
function ji() {
  return Tc;
}
function pt(e) {
  let t = Tc;
  return (Tc = e), t;
}
var Nf = Symbol("NotFound");
function ir(e) {
  return e === Nf || e?.name === "\u0275NotFound";
}
var ye = null,
  $i = !1,
  bc = 1,
  Oy = null,
  Se = Symbol("SIGNAL");
function L(e) {
  let t = ye;
  return (ye = e), t;
}
function Ui() {
  return ye;
}
var sr = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producers: void 0,
  producersTail: void 0,
  consumers: void 0,
  consumersTail: void 0,
  recomputing: !1,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  kind: "unknown",
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {},
  consumerMarkedDirty: () => {},
  consumerOnSignalRead: () => {},
};
function ar(e) {
  if ($i) throw new Error("");
  if (ye === null) return;
  ye.consumerOnSignalRead(e);
  let t = ye.producersTail;
  if (t !== void 0 && t.producer === e) return;
  let n,
    r = ye.recomputing;
  if (
    r &&
    ((n = t !== void 0 ? t.nextProducer : ye.producers),
    n !== void 0 && n.producer === e)
  ) {
    (ye.producersTail = n), (n.lastReadVersion = e.version);
    return;
  }
  let o = e.consumersTail;
  if (o !== void 0 && o.consumer === ye && (!r || Fy(o, ye))) return;
  let i = ur(ye),
    s = {
      producer: e,
      consumer: ye,
      nextProducer: n,
      prevConsumer: o,
      lastReadVersion: e.version,
      nextConsumer: void 0,
    };
  (ye.producersTail = s),
    t !== void 0 ? (t.nextProducer = s) : (ye.producers = s),
    i && Of(e, s);
}
function Rf() {
  bc++;
}
function Gi(e) {
  if (!(ur(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === bc)) {
    if (!e.producerMustRecompute(e) && !po(e)) {
      Hi(e);
      return;
    }
    e.producerRecomputeValue(e), Hi(e);
  }
}
function Mc(e) {
  if (e.consumers === void 0) return;
  let t = $i;
  $i = !0;
  try {
    for (let n = e.consumers; n !== void 0; n = n.nextConsumer) {
      let r = n.consumer;
      r.dirty || Py(r);
    }
  } finally {
    $i = t;
  }
}
function Nc() {
  return ye?.consumerAllowSignalWrites !== !1;
}
function Py(e) {
  (e.dirty = !0), Mc(e), e.consumerMarkedDirty?.(e);
}
function Hi(e) {
  (e.dirty = !1), (e.lastCleanEpoch = bc);
}
function cr(e) {
  return e && Af(e), L(e);
}
function Af(e) {
  (e.producersTail = void 0), (e.recomputing = !0);
}
function fo(e, t) {
  L(t), e && xf(e);
}
function xf(e) {
  e.recomputing = !1;
  let t = e.producersTail,
    n = t !== void 0 ? t.nextProducer : e.producers;
  if (n !== void 0) {
    if (ur(e))
      do n = Rc(n);
      while (n !== void 0);
    t !== void 0 ? (t.nextProducer = void 0) : (e.producers = void 0);
  }
}
function po(e) {
  for (let t = e.producers; t !== void 0; t = t.nextProducer) {
    let n = t.producer,
      r = t.lastReadVersion;
    if (r !== n.version || (Gi(n), r !== n.version)) return !0;
  }
  return !1;
}
function ho(e) {
  if (ur(e)) {
    let t = e.producers;
    for (; t !== void 0; ) t = Rc(t);
  }
  (e.producers = void 0),
    (e.producersTail = void 0),
    (e.consumers = void 0),
    (e.consumersTail = void 0);
}
function Of(e, t) {
  let n = e.consumersTail,
    r = ur(e);
  if (
    (n !== void 0
      ? ((t.nextConsumer = n.nextConsumer), (n.nextConsumer = t))
      : ((t.nextConsumer = void 0), (e.consumers = t)),
    (t.prevConsumer = n),
    (e.consumersTail = t),
    !r)
  )
    for (let o = e.producers; o !== void 0; o = o.nextProducer)
      Of(o.producer, o);
}
function Rc(e) {
  let t = e.producer,
    n = e.nextProducer,
    r = e.nextConsumer,
    o = e.prevConsumer;
  if (
    ((e.nextConsumer = void 0),
    (e.prevConsumer = void 0),
    r !== void 0 ? (r.prevConsumer = o) : (t.consumersTail = o),
    o !== void 0)
  )
    o.nextConsumer = r;
  else if (((t.consumers = r), !ur(t))) {
    let i = t.producers;
    for (; i !== void 0; ) i = Rc(i);
  }
  return n;
}
function ur(e) {
  return e.consumerIsAlwaysLive || e.consumers !== void 0;
}
function zi(e) {
  Oy?.(e);
}
function Fy(e, t) {
  let n = t.producersTail;
  if (n !== void 0) {
    let r = t.producers;
    do {
      if (r === e) return !0;
      if (r === n) break;
      r = r.nextProducer;
    } while (r !== void 0);
  }
  return !1;
}
function Wi(e, t) {
  return Object.is(e, t);
}
function qi(e, t) {
  let n = Object.create(ky);
  (n.computation = e), t !== void 0 && (n.equal = t);
  let r = () => {
    if ((Gi(n), ar(n), n.value === lo)) throw n.error;
    return n.value;
  };
  return (r[Se] = n), zi(n), r;
}
var Vi = Symbol("UNSET"),
  Bi = Symbol("COMPUTING"),
  lo = Symbol("ERRORED"),
  ky = G(C({}, sr), {
    value: Vi,
    dirty: !0,
    error: null,
    equal: Wi,
    kind: "computed",
    producerMustRecompute(e) {
      return e.value === Vi || e.value === Bi;
    },
    producerRecomputeValue(e) {
      if (e.value === Bi) throw new Error("");
      let t = e.value;
      e.value = Bi;
      let n = cr(e),
        r,
        o = !1;
      try {
        (r = e.computation()),
          L(null),
          (o = t !== Vi && t !== lo && r !== lo && e.equal(t, r));
      } catch (i) {
        (r = lo), (e.error = i);
      } finally {
        fo(e, n);
      }
      if (o) {
        e.value = t;
        return;
      }
      (e.value = r), e.version++;
    },
  });
function Ly() {
  throw new Error();
}
var Pf = Ly;
function Ff(e) {
  Pf(e);
}
function Ac(e) {
  Pf = e;
}
var jy = null;
function xc(e, t) {
  let n = Object.create(Zi);
  (n.value = e), t !== void 0 && (n.equal = t);
  let r = () => kf(n);
  return (r[Se] = n), zi(n), [r, (s) => lr(n, s), (s) => Oc(n, s)];
}
function kf(e) {
  return ar(e), e.value;
}
function lr(e, t) {
  Nc() || Ff(e), e.equal(e.value, t) || ((e.value = t), $y(e));
}
function Oc(e, t) {
  Nc() || Ff(e), lr(e, t(e.value));
}
var Zi = G(C({}, sr), { equal: Wi, value: void 0, kind: "signal" });
function $y(e) {
  e.version++, Rf(), Mc(e), jy?.(e);
}
function F(e) {
  return typeof e == "function";
}
function dr(e) {
  let n = e((r) => {
    Error.call(r), (r.stack = new Error().stack);
  });
  return (
    (n.prototype = Object.create(Error.prototype)),
    (n.prototype.constructor = n),
    n
  );
}
var Yi = dr(
  (e) =>
    function (n) {
      e(this),
        (this.message = n
          ? `${n.length} errors occurred during unsubscription:
${n.map((r, o) => `${o + 1}) ${r.toString()}`).join(`
  `)}`
          : ""),
        (this.name = "UnsubscriptionError"),
        (this.errors = n);
    }
);
function go(e, t) {
  if (e) {
    let n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
var ae = class e {
  constructor(t) {
    (this.initialTeardown = t),
      (this.closed = !1),
      (this._parentage = null),
      (this._finalizers = null);
  }
  unsubscribe() {
    let t;
    if (!this.closed) {
      this.closed = !0;
      let { _parentage: n } = this;
      if (n)
        if (((this._parentage = null), Array.isArray(n)))
          for (let i of n) i.remove(this);
        else n.remove(this);
      let { initialTeardown: r } = this;
      if (F(r))
        try {
          r();
        } catch (i) {
          t = i instanceof Yi ? i.errors : [i];
        }
      let { _finalizers: o } = this;
      if (o) {
        this._finalizers = null;
        for (let i of o)
          try {
            Lf(i);
          } catch (s) {
            (t = t ?? []),
              s instanceof Yi ? (t = [...t, ...s.errors]) : t.push(s);
          }
      }
      if (t) throw new Yi(t);
    }
  }
  add(t) {
    var n;
    if (t && t !== this)
      if (this.closed) Lf(t);
      else {
        if (t instanceof e) {
          if (t.closed || t._hasParent(this)) return;
          t._addParent(this);
        }
        (this._finalizers =
          (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
      }
  }
  _hasParent(t) {
    let { _parentage: n } = this;
    return n === t || (Array.isArray(n) && n.includes(t));
  }
  _addParent(t) {
    let { _parentage: n } = this;
    this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
  }
  _removeParent(t) {
    let { _parentage: n } = this;
    n === t ? (this._parentage = null) : Array.isArray(n) && go(n, t);
  }
  remove(t) {
    let { _finalizers: n } = this;
    n && go(n, t), t instanceof e && t._removeParent(this);
  }
};
ae.EMPTY = (() => {
  let e = new ae();
  return (e.closed = !0), e;
})();
var Pc = ae.EMPTY;
function Xi(e) {
  return (
    e instanceof ae ||
    (e && "closed" in e && F(e.remove) && F(e.add) && F(e.unsubscribe))
  );
}
function Lf(e) {
  F(e) ? e() : e.unsubscribe();
}
var tt = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1,
};
var fr = {
  setTimeout(e, t, ...n) {
    let { delegate: r } = fr;
    return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n);
  },
  clearTimeout(e) {
    let { delegate: t } = fr;
    return (t?.clearTimeout || clearTimeout)(e);
  },
  delegate: void 0,
};
function Qi(e) {
  fr.setTimeout(() => {
    let { onUnhandledError: t } = tt;
    if (t) t(e);
    else throw e;
  });
}
function mo() {}
var jf = Fc("C", void 0, void 0);
function $f(e) {
  return Fc("E", void 0, e);
}
function Vf(e) {
  return Fc("N", e, void 0);
}
function Fc(e, t, n) {
  return { kind: e, value: t, error: n };
}
var Mn = null;
function pr(e) {
  if (tt.useDeprecatedSynchronousErrorHandling) {
    let t = !Mn;
    if ((t && (Mn = { errorThrown: !1, error: null }), e(), t)) {
      let { errorThrown: n, error: r } = Mn;
      if (((Mn = null), n)) throw r;
    }
  } else e();
}
function Bf(e) {
  tt.useDeprecatedSynchronousErrorHandling &&
    Mn &&
    ((Mn.errorThrown = !0), (Mn.error = e));
}
var Nn = class extends ae {
    constructor(t) {
      super(),
        (this.isStopped = !1),
        t
          ? ((this.destination = t), Xi(t) && t.add(this))
          : (this.destination = Hy);
    }
    static create(t, n, r) {
      return new Ot(t, n, r);
    }
    next(t) {
      this.isStopped ? Lc(Vf(t), this) : this._next(t);
    }
    error(t) {
      this.isStopped
        ? Lc($f(t), this)
        : ((this.isStopped = !0), this._error(t));
    }
    complete() {
      this.isStopped ? Lc(jf, this) : ((this.isStopped = !0), this._complete());
    }
    unsubscribe() {
      this.closed ||
        ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
    }
    _next(t) {
      this.destination.next(t);
    }
    _error(t) {
      try {
        this.destination.error(t);
      } finally {
        this.unsubscribe();
      }
    }
    _complete() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    }
  },
  Vy = Function.prototype.bind;
function kc(e, t) {
  return Vy.call(e, t);
}
var jc = class {
    constructor(t) {
      this.partialObserver = t;
    }
    next(t) {
      let { partialObserver: n } = this;
      if (n.next)
        try {
          n.next(t);
        } catch (r) {
          Ki(r);
        }
    }
    error(t) {
      let { partialObserver: n } = this;
      if (n.error)
        try {
          n.error(t);
        } catch (r) {
          Ki(r);
        }
      else Ki(t);
    }
    complete() {
      let { partialObserver: t } = this;
      if (t.complete)
        try {
          t.complete();
        } catch (n) {
          Ki(n);
        }
    }
  },
  Ot = class extends Nn {
    constructor(t, n, r) {
      super();
      let o;
      if (F(t) || !t)
        o = { next: t ?? void 0, error: n ?? void 0, complete: r ?? void 0 };
      else {
        let i;
        this && tt.useDeprecatedNextContext
          ? ((i = Object.create(t)),
            (i.unsubscribe = () => this.unsubscribe()),
            (o = {
              next: t.next && kc(t.next, i),
              error: t.error && kc(t.error, i),
              complete: t.complete && kc(t.complete, i),
            }))
          : (o = t);
      }
      this.destination = new jc(o);
    }
  };
function Ki(e) {
  tt.useDeprecatedSynchronousErrorHandling ? Bf(e) : Qi(e);
}
function By(e) {
  throw e;
}
function Lc(e, t) {
  let { onStoppedNotification: n } = tt;
  n && fr.setTimeout(() => n(e, t));
}
var Hy = { closed: !0, next: mo, error: By, complete: mo };
var hr = (typeof Symbol == "function" && Symbol.observable) || "@@observable";
function He(e) {
  return e;
}
function $c(...e) {
  return Vc(e);
}
function Vc(e) {
  return e.length === 0
    ? He
    : e.length === 1
    ? e[0]
    : function (n) {
        return e.reduce((r, o) => o(r), n);
      };
}
var $ = (() => {
  class e {
    constructor(n) {
      n && (this._subscribe = n);
    }
    lift(n) {
      let r = new e();
      return (r.source = this), (r.operator = n), r;
    }
    subscribe(n, r, o) {
      let i = Gy(n) ? n : new Ot(n, r, o);
      return (
        pr(() => {
          let { operator: s, source: a } = this;
          i.add(
            s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i)
          );
        }),
        i
      );
    }
    _trySubscribe(n) {
      try {
        return this._subscribe(n);
      } catch (r) {
        n.error(r);
      }
    }
    forEach(n, r) {
      return (
        (r = Hf(r)),
        new r((o, i) => {
          let s = new Ot({
            next: (a) => {
              try {
                n(a);
              } catch (c) {
                i(c), s.unsubscribe();
              }
            },
            error: i,
            complete: o,
          });
          this.subscribe(s);
        })
      );
    }
    _subscribe(n) {
      var r;
      return (r = this.source) === null || r === void 0
        ? void 0
        : r.subscribe(n);
    }
    [hr]() {
      return this;
    }
    pipe(...n) {
      return Vc(n)(this);
    }
    toPromise(n) {
      return (
        (n = Hf(n)),
        new n((r, o) => {
          let i;
          this.subscribe(
            (s) => (i = s),
            (s) => o(s),
            () => r(i)
          );
        })
      );
    }
  }
  return (e.create = (t) => new e(t)), e;
})();
function Hf(e) {
  var t;
  return (t = e ?? tt.Promise) !== null && t !== void 0 ? t : Promise;
}
function Uy(e) {
  return e && F(e.next) && F(e.error) && F(e.complete);
}
function Gy(e) {
  return (e && e instanceof Nn) || (Uy(e) && Xi(e));
}
function Bc(e) {
  return F(e?.lift);
}
function V(e) {
  return (t) => {
    if (Bc(t))
      return t.lift(function (n) {
        try {
          return e(n, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function H(e, t, n, r, o) {
  return new Hc(e, t, n, r, o);
}
var Hc = class extends Nn {
  constructor(t, n, r, o, i, s) {
    super(t),
      (this.onFinalize = i),
      (this.shouldUnsubscribe = s),
      (this._next = n
        ? function (a) {
            try {
              n(a);
            } catch (c) {
              t.error(c);
            }
          }
        : super._next),
      (this._error = o
        ? function (a) {
            try {
              o(a);
            } catch (c) {
              t.error(c);
            } finally {
              this.unsubscribe();
            }
          }
        : super._error),
      (this._complete = r
        ? function () {
            try {
              r();
            } catch (a) {
              t.error(a);
            } finally {
              this.unsubscribe();
            }
          }
        : super._complete);
  }
  unsubscribe() {
    var t;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      let { closed: n } = this;
      super.unsubscribe(),
        !n && ((t = this.onFinalize) === null || t === void 0 || t.call(this));
    }
  }
};
function gr() {
  return V((e, t) => {
    let n = null;
    e._refCount++;
    let r = H(t, void 0, void 0, void 0, () => {
      if (!e || e._refCount <= 0 || 0 < --e._refCount) {
        n = null;
        return;
      }
      let o = e._connection,
        i = n;
      (n = null), o && (!i || o === i) && o.unsubscribe(), t.unsubscribe();
    });
    e.subscribe(r), r.closed || (n = e.connect());
  });
}
var mr = class extends $ {
  constructor(t, n) {
    super(),
      (this.source = t),
      (this.subjectFactory = n),
      (this._subject = null),
      (this._refCount = 0),
      (this._connection = null),
      Bc(t) && (this.lift = t.lift);
  }
  _subscribe(t) {
    return this.getSubject().subscribe(t);
  }
  getSubject() {
    let t = this._subject;
    return (
      (!t || t.isStopped) && (this._subject = this.subjectFactory()),
      this._subject
    );
  }
  _teardown() {
    this._refCount = 0;
    let { _connection: t } = this;
    (this._subject = this._connection = null), t?.unsubscribe();
  }
  connect() {
    let t = this._connection;
    if (!t) {
      t = this._connection = new ae();
      let n = this.getSubject();
      t.add(
        this.source.subscribe(
          H(
            n,
            void 0,
            () => {
              this._teardown(), n.complete();
            },
            (r) => {
              this._teardown(), n.error(r);
            },
            () => this._teardown()
          )
        )
      ),
        t.closed && ((this._connection = null), (t = ae.EMPTY));
    }
    return t;
  }
  refCount() {
    return gr()(this);
  }
};
var Uf = dr(
  (e) =>
    function () {
      e(this),
        (this.name = "ObjectUnsubscribedError"),
        (this.message = "object unsubscribed");
    }
);
var K = (() => {
    class e extends $ {
      constructor() {
        super(),
          (this.closed = !1),
          (this.currentObservers = null),
          (this.observers = []),
          (this.isStopped = !1),
          (this.hasError = !1),
          (this.thrownError = null);
      }
      lift(n) {
        let r = new Ji(this, this);
        return (r.operator = n), r;
      }
      _throwIfClosed() {
        if (this.closed) throw new Uf();
      }
      next(n) {
        pr(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers ||
              (this.currentObservers = Array.from(this.observers));
            for (let r of this.currentObservers) r.next(n);
          }
        });
      }
      error(n) {
        pr(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            (this.hasError = this.isStopped = !0), (this.thrownError = n);
            let { observers: r } = this;
            for (; r.length; ) r.shift().error(n);
          }
        });
      }
      complete() {
        pr(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.isStopped = !0;
            let { observers: n } = this;
            for (; n.length; ) n.shift().complete();
          }
        });
      }
      unsubscribe() {
        (this.isStopped = this.closed = !0),
          (this.observers = this.currentObservers = null);
      }
      get observed() {
        var n;
        return (
          ((n = this.observers) === null || n === void 0 ? void 0 : n.length) >
          0
        );
      }
      _trySubscribe(n) {
        return this._throwIfClosed(), super._trySubscribe(n);
      }
      _subscribe(n) {
        return (
          this._throwIfClosed(),
          this._checkFinalizedStatuses(n),
          this._innerSubscribe(n)
        );
      }
      _innerSubscribe(n) {
        let { hasError: r, isStopped: o, observers: i } = this;
        return r || o
          ? Pc
          : ((this.currentObservers = null),
            i.push(n),
            new ae(() => {
              (this.currentObservers = null), go(i, n);
            }));
      }
      _checkFinalizedStatuses(n) {
        let { hasError: r, thrownError: o, isStopped: i } = this;
        r ? n.error(o) : i && n.complete();
      }
      asObservable() {
        let n = new $();
        return (n.source = this), n;
      }
    }
    return (e.create = (t, n) => new Ji(t, n)), e;
  })(),
  Ji = class extends K {
    constructor(t, n) {
      super(), (this.destination = t), (this.source = n);
    }
    next(t) {
      var n, r;
      (r =
        (n = this.destination) === null || n === void 0 ? void 0 : n.next) ===
        null ||
        r === void 0 ||
        r.call(n, t);
    }
    error(t) {
      var n, r;
      (r =
        (n = this.destination) === null || n === void 0 ? void 0 : n.error) ===
        null ||
        r === void 0 ||
        r.call(n, t);
    }
    complete() {
      var t, n;
      (n =
        (t = this.destination) === null || t === void 0
          ? void 0
          : t.complete) === null ||
        n === void 0 ||
        n.call(t);
    }
    _subscribe(t) {
      var n, r;
      return (r =
        (n = this.source) === null || n === void 0
          ? void 0
          : n.subscribe(t)) !== null && r !== void 0
        ? r
        : Pc;
    }
  };
var pe = class extends K {
  constructor(t) {
    super(), (this._value = t);
  }
  get value() {
    return this.getValue();
  }
  _subscribe(t) {
    let n = super._subscribe(t);
    return !n.closed && t.next(this._value), n;
  }
  getValue() {
    let { hasError: t, thrownError: n, _value: r } = this;
    if (t) throw n;
    return this._throwIfClosed(), r;
  }
  next(t) {
    super.next((this._value = t));
  }
};
var Uc = {
  now() {
    return (Uc.delegate || Date).now();
  },
  delegate: void 0,
};
var es = class extends K {
  constructor(t = 1 / 0, n = 1 / 0, r = Uc) {
    super(),
      (this._bufferSize = t),
      (this._windowTime = n),
      (this._timestampProvider = r),
      (this._buffer = []),
      (this._infiniteTimeWindow = !0),
      (this._infiniteTimeWindow = n === 1 / 0),
      (this._bufferSize = Math.max(1, t)),
      (this._windowTime = Math.max(1, n));
  }
  next(t) {
    let {
      isStopped: n,
      _buffer: r,
      _infiniteTimeWindow: o,
      _timestampProvider: i,
      _windowTime: s,
    } = this;
    n || (r.push(t), !o && r.push(i.now() + s)),
      this._trimBuffer(),
      super.next(t);
  }
  _subscribe(t) {
    this._throwIfClosed(), this._trimBuffer();
    let n = this._innerSubscribe(t),
      { _infiniteTimeWindow: r, _buffer: o } = this,
      i = o.slice();
    for (let s = 0; s < i.length && !t.closed; s += r ? 1 : 2) t.next(i[s]);
    return this._checkFinalizedStatuses(t), n;
  }
  _trimBuffer() {
    let {
        _bufferSize: t,
        _timestampProvider: n,
        _buffer: r,
        _infiniteTimeWindow: o,
      } = this,
      i = (o ? 1 : 2) * t;
    if ((t < 1 / 0 && i < r.length && r.splice(0, r.length - i), !o)) {
      let s = n.now(),
        a = 0;
      for (let c = 1; c < r.length && r[c] <= s; c += 2) a = c;
      a && r.splice(0, a + 1);
    }
  }
};
var Oe = new $((e) => e.complete());
function Gf(e) {
  return e && F(e.schedule);
}
function zf(e) {
  return e[e.length - 1];
}
function Wf(e) {
  return F(zf(e)) ? e.pop() : void 0;
}
function on(e) {
  return Gf(zf(e)) ? e.pop() : void 0;
}
function Zf(e, t, n, r) {
  function o(i) {
    return i instanceof n
      ? i
      : new n(function (s) {
          s(i);
        });
  }
  return new (n || (n = Promise))(function (i, s) {
    function a(l) {
      try {
        u(r.next(l));
      } catch (d) {
        s(d);
      }
    }
    function c(l) {
      try {
        u(r.throw(l));
      } catch (d) {
        s(d);
      }
    }
    function u(l) {
      l.done ? i(l.value) : o(l.value).then(a, c);
    }
    u((r = r.apply(e, t || [])).next());
  });
}
function qf(e) {
  var t = typeof Symbol == "function" && Symbol.iterator,
    n = t && e[t],
    r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function () {
        return (
          e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }
        );
      },
    };
  throw new TypeError(
    t ? "Object is not iterable." : "Symbol.iterator is not defined."
  );
}
function Rn(e) {
  return this instanceof Rn ? ((this.v = e), this) : new Rn(e);
}
function Yf(e, t, n) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = n.apply(e, t || []),
    o,
    i = [];
  return (
    (o = Object.create(
      (typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype
    )),
    a("next"),
    a("throw"),
    a("return", s),
    (o[Symbol.asyncIterator] = function () {
      return this;
    }),
    o
  );
  function s(f) {
    return function (v) {
      return Promise.resolve(v).then(f, d);
    };
  }
  function a(f, v) {
    r[f] &&
      ((o[f] = function (E) {
        return new Promise(function (_, y) {
          i.push([f, E, _, y]) > 1 || c(f, E);
        });
      }),
      v && (o[f] = v(o[f])));
  }
  function c(f, v) {
    try {
      u(r[f](v));
    } catch (E) {
      p(i[0][3], E);
    }
  }
  function u(f) {
    f.value instanceof Rn
      ? Promise.resolve(f.value.v).then(l, d)
      : p(i[0][2], f);
  }
  function l(f) {
    c("next", f);
  }
  function d(f) {
    c("throw", f);
  }
  function p(f, v) {
    f(v), i.shift(), i.length && c(i[0][0], i[0][1]);
  }
}
function Xf(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator],
    n;
  return t
    ? t.call(e)
    : ((e = typeof qf == "function" ? qf(e) : e[Symbol.iterator]()),
      (n = {}),
      r("next"),
      r("throw"),
      r("return"),
      (n[Symbol.asyncIterator] = function () {
        return this;
      }),
      n);
  function r(i) {
    n[i] =
      e[i] &&
      function (s) {
        return new Promise(function (a, c) {
          (s = e[i](s)), o(a, c, s.done, s.value);
        });
      };
  }
  function o(i, s, a, c) {
    Promise.resolve(c).then(function (u) {
      i({ value: u, done: a });
    }, s);
  }
}
var ts = (e) => e && typeof e.length == "number" && typeof e != "function";
function ns(e) {
  return F(e?.then);
}
function rs(e) {
  return F(e[hr]);
}
function os(e) {
  return Symbol.asyncIterator && F(e?.[Symbol.asyncIterator]);
}
function is(e) {
  return new TypeError(
    `You provided ${
      e !== null && typeof e == "object" ? "an invalid object" : `'${e}'`
    } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}
function zy() {
  return typeof Symbol != "function" || !Symbol.iterator
    ? "@@iterator"
    : Symbol.iterator;
}
var ss = zy();
function as(e) {
  return F(e?.[ss]);
}
function cs(e) {
  return Yf(this, arguments, function* () {
    let n = e.getReader();
    try {
      for (;;) {
        let { value: r, done: o } = yield Rn(n.read());
        if (o) return yield Rn(void 0);
        yield yield Rn(r);
      }
    } finally {
      n.releaseLock();
    }
  });
}
function us(e) {
  return F(e?.getReader);
}
function te(e) {
  if (e instanceof $) return e;
  if (e != null) {
    if (rs(e)) return Wy(e);
    if (ts(e)) return qy(e);
    if (ns(e)) return Zy(e);
    if (os(e)) return Qf(e);
    if (as(e)) return Yy(e);
    if (us(e)) return Xy(e);
  }
  throw is(e);
}
function Wy(e) {
  return new $((t) => {
    let n = e[hr]();
    if (F(n.subscribe)) return n.subscribe(t);
    throw new TypeError(
      "Provided object does not correctly implement Symbol.observable"
    );
  });
}
function qy(e) {
  return new $((t) => {
    for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
    t.complete();
  });
}
function Zy(e) {
  return new $((t) => {
    e.then(
      (n) => {
        t.closed || (t.next(n), t.complete());
      },
      (n) => t.error(n)
    ).then(null, Qi);
  });
}
function Yy(e) {
  return new $((t) => {
    for (let n of e) if ((t.next(n), t.closed)) return;
    t.complete();
  });
}
function Qf(e) {
  return new $((t) => {
    Qy(e, t).catch((n) => t.error(n));
  });
}
function Xy(e) {
  return Qf(cs(e));
}
function Qy(e, t) {
  var n, r, o, i;
  return Zf(this, void 0, void 0, function* () {
    try {
      for (n = Xf(e); (r = yield n.next()), !r.done; ) {
        let s = r.value;
        if ((t.next(s), t.closed)) return;
      }
    } catch (s) {
      o = { error: s };
    } finally {
      try {
        r && !r.done && (i = n.return) && (yield i.call(n));
      } finally {
        if (o) throw o.error;
      }
    }
    t.complete();
  });
}
function Pe(e, t, n, r = 0, o = !1) {
  let i = t.schedule(function () {
    n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
  }, r);
  if ((e.add(i), !o)) return i;
}
function ls(e, t = 0) {
  return V((n, r) => {
    n.subscribe(
      H(
        r,
        (o) => Pe(r, e, () => r.next(o), t),
        () => Pe(r, e, () => r.complete(), t),
        (o) => Pe(r, e, () => r.error(o), t)
      )
    );
  });
}
function ds(e, t = 0) {
  return V((n, r) => {
    r.add(e.schedule(() => n.subscribe(r), t));
  });
}
function Kf(e, t) {
  return te(e).pipe(ds(t), ls(t));
}
function Jf(e, t) {
  return te(e).pipe(ds(t), ls(t));
}
function ep(e, t) {
  return new $((n) => {
    let r = 0;
    return t.schedule(function () {
      r === e.length
        ? n.complete()
        : (n.next(e[r++]), n.closed || this.schedule());
    });
  });
}
function tp(e, t) {
  return new $((n) => {
    let r;
    return (
      Pe(n, t, () => {
        (r = e[ss]()),
          Pe(
            n,
            t,
            () => {
              let o, i;
              try {
                ({ value: o, done: i } = r.next());
              } catch (s) {
                n.error(s);
                return;
              }
              i ? n.complete() : n.next(o);
            },
            0,
            !0
          );
      }),
      () => F(r?.return) && r.return()
    );
  });
}
function fs(e, t) {
  if (!e) throw new Error("Iterable cannot be null");
  return new $((n) => {
    Pe(n, t, () => {
      let r = e[Symbol.asyncIterator]();
      Pe(
        n,
        t,
        () => {
          r.next().then((o) => {
            o.done ? n.complete() : n.next(o.value);
          });
        },
        0,
        !0
      );
    });
  });
}
function np(e, t) {
  return fs(cs(e), t);
}
function rp(e, t) {
  if (e != null) {
    if (rs(e)) return Kf(e, t);
    if (ts(e)) return ep(e, t);
    if (ns(e)) return Jf(e, t);
    if (os(e)) return fs(e, t);
    if (as(e)) return tp(e, t);
    if (us(e)) return np(e, t);
  }
  throw is(e);
}
function ne(e, t) {
  return t ? rp(e, t) : te(e);
}
function b(...e) {
  let t = on(e);
  return ne(e, t);
}
function sn(e, t) {
  let n = F(e) ? e : () => e,
    r = (o) => o.error(n());
  return new $(t ? (o) => t.schedule(r, 0, o) : r);
}
function Gc(e) {
  return !!e && (e instanceof $ || (F(e.lift) && F(e.subscribe)));
}
var Pt = dr(
  (e) =>
    function () {
      e(this),
        (this.name = "EmptyError"),
        (this.message = "no elements in sequence");
    }
);
function A(e, t) {
  return V((n, r) => {
    let o = 0;
    n.subscribe(
      H(r, (i) => {
        r.next(e.call(t, i, o++));
      })
    );
  });
}
var { isArray: Ky } = Array;
function Jy(e, t) {
  return Ky(t) ? e(...t) : e(t);
}
function op(e) {
  return A((t) => Jy(e, t));
}
var { isArray: eE } = Array,
  { getPrototypeOf: tE, prototype: nE, keys: rE } = Object;
function ip(e) {
  if (e.length === 1) {
    let t = e[0];
    if (eE(t)) return { args: t, keys: null };
    if (oE(t)) {
      let n = rE(t);
      return { args: n.map((r) => t[r]), keys: n };
    }
  }
  return { args: e, keys: null };
}
function oE(e) {
  return e && typeof e == "object" && tE(e) === nE;
}
function sp(e, t) {
  return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
}
function ps(...e) {
  let t = on(e),
    n = Wf(e),
    { args: r, keys: o } = ip(e);
  if (r.length === 0) return ne([], t);
  let i = new $(iE(r, t, o ? (s) => sp(o, s) : He));
  return n ? i.pipe(op(n)) : i;
}
function iE(e, t, n = He) {
  return (r) => {
    ap(
      t,
      () => {
        let { length: o } = e,
          i = new Array(o),
          s = o,
          a = o;
        for (let c = 0; c < o; c++)
          ap(
            t,
            () => {
              let u = ne(e[c], t),
                l = !1;
              u.subscribe(
                H(
                  r,
                  (d) => {
                    (i[c] = d), l || ((l = !0), a--), a || r.next(n(i.slice()));
                  },
                  () => {
                    --s || r.complete();
                  }
                )
              );
            },
            r
          );
      },
      r
    );
  };
}
function ap(e, t, n) {
  e ? Pe(n, e, t) : t();
}
function cp(e, t, n, r, o, i, s, a) {
  let c = [],
    u = 0,
    l = 0,
    d = !1,
    p = () => {
      d && !c.length && !u && t.complete();
    },
    f = (E) => (u < r ? v(E) : c.push(E)),
    v = (E) => {
      i && t.next(E), u++;
      let _ = !1;
      te(n(E, l++)).subscribe(
        H(
          t,
          (y) => {
            o?.(y), i ? f(y) : t.next(y);
          },
          () => {
            _ = !0;
          },
          void 0,
          () => {
            if (_)
              try {
                for (u--; c.length && u < r; ) {
                  let y = c.shift();
                  s ? Pe(t, s, () => v(y)) : v(y);
                }
                p();
              } catch (y) {
                t.error(y);
              }
          }
        )
      );
    };
  return (
    e.subscribe(
      H(t, f, () => {
        (d = !0), p();
      })
    ),
    () => {
      a?.();
    }
  );
}
function ce(e, t, n = 1 / 0) {
  return F(t)
    ? ce((r, o) => A((i, s) => t(r, i, o, s))(te(e(r, o))), n)
    : (typeof t == "number" && (n = t), V((r, o) => cp(r, o, e, n)));
}
function vr(e = 1 / 0) {
  return ce(He, e);
}
function up() {
  return vr(1);
}
function yr(...e) {
  return up()(ne(e, on(e)));
}
function vo(e) {
  return new $((t) => {
    te(e()).subscribe(t);
  });
}
function we(e, t) {
  return V((n, r) => {
    let o = 0;
    n.subscribe(H(r, (i) => e.call(t, i, o++) && r.next(i)));
  });
}
function Ye(e) {
  return V((t, n) => {
    let r = null,
      o = !1,
      i;
    (r = t.subscribe(
      H(n, void 0, void 0, (s) => {
        (i = te(e(s, Ye(e)(t)))),
          r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
      })
    )),
      o && (r.unsubscribe(), (r = null), i.subscribe(n));
  });
}
function lp(e, t, n, r, o) {
  return (i, s) => {
    let a = n,
      c = t,
      u = 0;
    i.subscribe(
      H(
        s,
        (l) => {
          let d = u++;
          (c = a ? e(c, l, d) : ((a = !0), l)), r && s.next(c);
        },
        o &&
          (() => {
            a && s.next(c), s.complete();
          })
      )
    );
  };
}
function Ft(e, t) {
  return F(t) ? ce(e, t, 1) : ce(e, 1);
}
function an(e) {
  return V((t, n) => {
    let r = !1;
    t.subscribe(
      H(
        n,
        (o) => {
          (r = !0), n.next(o);
        },
        () => {
          r || n.next(e), n.complete();
        }
      )
    );
  });
}
function kt(e) {
  return e <= 0
    ? () => Oe
    : V((t, n) => {
        let r = 0;
        t.subscribe(
          H(n, (o) => {
            ++r <= e && (n.next(o), e <= r && n.complete());
          })
        );
      });
}
function hs(e = sE) {
  return V((t, n) => {
    let r = !1;
    t.subscribe(
      H(
        n,
        (o) => {
          (r = !0), n.next(o);
        },
        () => (r ? n.complete() : n.error(e()))
      )
    );
  });
}
function sE() {
  return new Pt();
}
function An(e) {
  return V((t, n) => {
    try {
      t.subscribe(n);
    } finally {
      n.add(e);
    }
  });
}
function Lt(e, t) {
  let n = arguments.length >= 2;
  return (r) =>
    r.pipe(
      e ? we((o, i) => e(o, i, r)) : He,
      kt(1),
      n ? an(t) : hs(() => new Pt())
    );
}
function Er(e) {
  return e <= 0
    ? () => Oe
    : V((t, n) => {
        let r = [];
        t.subscribe(
          H(
            n,
            (o) => {
              r.push(o), e < r.length && r.shift();
            },
            () => {
              for (let o of r) n.next(o);
              n.complete();
            },
            void 0,
            () => {
              r = null;
            }
          )
        );
      });
}
function zc(e, t) {
  let n = arguments.length >= 2;
  return (r) =>
    r.pipe(
      e ? we((o, i) => e(o, i, r)) : He,
      Er(1),
      n ? an(t) : hs(() => new Pt())
    );
}
function Wc(e, t) {
  return V(lp(e, t, arguments.length >= 2, !0));
}
function dp(e = {}) {
  let {
    connector: t = () => new K(),
    resetOnError: n = !0,
    resetOnComplete: r = !0,
    resetOnRefCountZero: o = !0,
  } = e;
  return (i) => {
    let s,
      a,
      c,
      u = 0,
      l = !1,
      d = !1,
      p = () => {
        a?.unsubscribe(), (a = void 0);
      },
      f = () => {
        p(), (s = c = void 0), (l = d = !1);
      },
      v = () => {
        let E = s;
        f(), E?.unsubscribe();
      };
    return V((E, _) => {
      u++, !d && !l && p();
      let y = (c = c ?? t());
      _.add(() => {
        u--, u === 0 && !d && !l && (a = qc(v, o));
      }),
        y.subscribe(_),
        !s &&
          u > 0 &&
          ((s = new Ot({
            next: (U) => y.next(U),
            error: (U) => {
              (d = !0), p(), (a = qc(f, n, U)), y.error(U);
            },
            complete: () => {
              (l = !0), p(), (a = qc(f, r)), y.complete();
            },
          })),
          te(E).subscribe(s));
    })(i);
  };
}
function qc(e, t, ...n) {
  if (t === !0) {
    e();
    return;
  }
  if (t === !1) return;
  let r = new Ot({
    next: () => {
      r.unsubscribe(), e();
    },
  });
  return te(t(...n)).subscribe(r);
}
function yo(e, t, n) {
  let r,
    o = !1;
  return (
    e && typeof e == "object"
      ? ({
          bufferSize: r = 1 / 0,
          windowTime: t = 1 / 0,
          refCount: o = !1,
          scheduler: n,
        } = e)
      : (r = e ?? 1 / 0),
    dp({
      connector: () => new es(r, t, n),
      resetOnError: !0,
      resetOnComplete: !1,
      resetOnRefCountZero: o,
    })
  );
}
function Zc(...e) {
  let t = on(e);
  return V((n, r) => {
    (t ? yr(e, n, t) : yr(e, n)).subscribe(r);
  });
}
function J(e, t) {
  return V((n, r) => {
    let o = null,
      i = 0,
      s = !1,
      a = () => s && !o && r.complete();
    n.subscribe(
      H(
        r,
        (c) => {
          o?.unsubscribe();
          let u = 0,
            l = i++;
          te(e(c, l)).subscribe(
            (o = H(
              r,
              (d) => r.next(t ? t(c, d, l, u++) : d),
              () => {
                (o = null), a();
              }
            ))
          );
        },
        () => {
          (s = !0), a();
        }
      )
    );
  });
}
function gs(e) {
  return V((t, n) => {
    te(e).subscribe(H(n, () => n.complete(), mo)), !n.closed && t.subscribe(n);
  });
}
function re(e, t, n) {
  let r = F(e) || t || n ? { next: e, error: t, complete: n } : e;
  return r
    ? V((o, i) => {
        var s;
        (s = r.subscribe) === null || s === void 0 || s.call(r);
        let a = !0;
        o.subscribe(
          H(
            i,
            (c) => {
              var u;
              (u = r.next) === null || u === void 0 || u.call(r, c), i.next(c);
            },
            () => {
              var c;
              (a = !1),
                (c = r.complete) === null || c === void 0 || c.call(r),
                i.complete();
            },
            (c) => {
              var u;
              (a = !1),
                (u = r.error) === null || u === void 0 || u.call(r, c),
                i.error(c);
            },
            () => {
              var c, u;
              a && ((c = r.unsubscribe) === null || c === void 0 || c.call(r)),
                (u = r.finalize) === null || u === void 0 || u.call(r);
            }
          )
        );
      })
    : He;
}
function fp(e) {
  let t = L(null);
  try {
    return e();
  } finally {
    L(t);
  }
}
var _s =
    "https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",
  I = class extends Error {
    code;
    constructor(t, n) {
      super(dn(t, n)), (this.code = t);
    }
  };
function aE(e) {
  return `NG0${Math.abs(e)}`;
}
function dn(e, t) {
  return `${aE(e)}${t ? ": " + t : ""}`;
}
var nt = globalThis;
function W(e) {
  for (let t in e) if (e[t] === W) return t;
  throw Error("");
}
function $t(e) {
  if (typeof e == "string") return e;
  if (Array.isArray(e)) return `[${e.map($t).join(", ")}]`;
  if (e == null) return "" + e;
  let t = e.overriddenName || e.name;
  if (t) return `${t}`;
  let n = e.toString();
  if (n == null) return "" + n;
  let r = n.indexOf(`
`);
  return r >= 0 ? n.slice(0, r) : n;
}
function su(e, t) {
  return e ? (t ? `${e} ${t}` : e) : t || "";
}
var cE = W({ __forward_ref__: W });
function Ds(e) {
  return (
    (e.__forward_ref__ = Ds),
    (e.toString = function () {
      return $t(this());
    }),
    e
  );
}
function Fe(e) {
  return au(e) ? e() : e;
}
function au(e) {
  return (
    typeof e == "function" && e.hasOwnProperty(cE) && e.__forward_ref__ === Ds
  );
}
function gp(e, t, n) {
  e != t && mp(n, e, t, "==");
}
function mp(e, t, n, r) {
  throw new Error(
    `ASSERTION ERROR: ${e}` +
      (r == null ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
  );
}
function S(e) {
  return {
    token: e.token,
    providedIn: e.providedIn || null,
    factory: e.factory,
    value: void 0,
  };
}
function Co(e) {
  return uE(e, Cs);
}
function cu(e) {
  return Co(e) !== null;
}
function uE(e, t) {
  return (e.hasOwnProperty(t) && e[t]) || null;
}
function lE(e) {
  let t = e?.[Cs] ?? null;
  return t || null;
}
function Xc(e) {
  return e && e.hasOwnProperty(vs) ? e[vs] : null;
}
var Cs = W({ ɵprov: W }),
  vs = W({ ɵinj: W }),
  w = class {
    _desc;
    ngMetadataName = "InjectionToken";
    ɵprov;
    constructor(t, n) {
      (this._desc = t),
        (this.ɵprov = void 0),
        typeof n == "number"
          ? (this.__NG_ELEMENT_ID__ = n)
          : n !== void 0 &&
            (this.ɵprov = S({
              token: this,
              providedIn: n.providedIn || "root",
              factory: n.factory,
            }));
    }
    get multi() {
      return this;
    }
    toString() {
      return `InjectionToken ${this._desc}`;
    }
  };
function uu(e) {
  return e && !!e.ɵproviders;
}
var lu = W({ ɵcmp: W }),
  du = W({ ɵdir: W }),
  fu = W({ ɵpipe: W }),
  pu = W({ ɵmod: W }),
  _o = W({ ɵfac: W }),
  Fn = W({ __NG_ELEMENT_ID__: W }),
  pp = W({ __NG_ENV_ID__: W });
function Dr(e) {
  return typeof e == "string" ? e : e == null ? "" : String(e);
}
function vp(e) {
  return typeof e == "function"
    ? e.name || e.toString()
    : typeof e == "object" && e != null && typeof e.type == "function"
    ? e.type.name || e.type.toString()
    : Dr(e);
}
var yp = W({ ngErrorCode: W }),
  dE = W({ ngErrorMessage: W }),
  fE = W({ ngTokenPath: W });
function hu(e, t) {
  return Ep("", -200, t);
}
function Is(e, t) {
  throw new I(-201, !1);
}
function Ep(e, t, n) {
  let r = new I(t, e);
  return (r[yp] = t), (r[dE] = e), n && (r[fE] = n), r;
}
function pE(e) {
  return e[yp];
}
var Qc;
function _p() {
  return Qc;
}
function Te(e) {
  let t = Qc;
  return (Qc = e), t;
}
function gu(e, t, n) {
  let r = Co(e);
  if (r && r.providedIn == "root")
    return r.value === void 0 ? (r.value = r.factory()) : r.value;
  if (n & 8) return null;
  if (t !== void 0) return t;
  Is(e, "Injector");
}
var hE = {},
  xn = hE,
  gE = "__NG_DI_FLAG__",
  Kc = class {
    injector;
    constructor(t) {
      this.injector = t;
    }
    retrieve(t, n) {
      let r = On(n) || 0;
      try {
        return this.injector.get(t, r & 8 ? null : xn, r);
      } catch (o) {
        if (ir(o)) return o;
        throw o;
      }
    }
  };
function mE(e, t = 0) {
  let n = ji();
  if (n === void 0) throw new I(-203, !1);
  if (n === null) return gu(e, void 0, t);
  {
    let r = vE(t),
      o = n.retrieve(e, r);
    if (ir(o)) {
      if (r.optional) return null;
      throw o;
    }
    return o;
  }
}
function R(e, t = 0) {
  return (_p() || mE)(Fe(e), t);
}
function g(e, t) {
  return R(e, On(t));
}
function On(e) {
  return typeof e > "u" || typeof e == "number"
    ? e
    : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
}
function vE(e) {
  return {
    optional: !!(e & 8),
    host: !!(e & 1),
    self: !!(e & 2),
    skipSelf: !!(e & 4),
  };
}
function Jc(e) {
  let t = [];
  for (let n = 0; n < e.length; n++) {
    let r = Fe(e[n]);
    if (Array.isArray(r)) {
      if (r.length === 0) throw new I(900, !1);
      let o,
        i = 0;
      for (let s = 0; s < r.length; s++) {
        let a = r[s],
          c = yE(a);
        typeof c == "number" ? (c === -1 ? (o = a.token) : (i |= c)) : (o = a);
      }
      t.push(R(o, i));
    } else t.push(R(r));
  }
  return t;
}
function yE(e) {
  return e[gE];
}
function cn(e, t) {
  let n = e.hasOwnProperty(_o);
  return n ? e[_o] : null;
}
function Dp(e, t, n) {
  if (e.length !== t.length) return !1;
  for (let r = 0; r < e.length; r++) {
    let o = e[r],
      i = t[r];
    if ((n && ((o = n(o)), (i = n(i))), i !== o)) return !1;
  }
  return !0;
}
function Cp(e) {
  return e.flat(Number.POSITIVE_INFINITY);
}
function Ss(e, t) {
  e.forEach((n) => (Array.isArray(n) ? Ss(n, t) : t(n)));
}
function mu(e, t, n) {
  t >= e.length ? e.push(n) : e.splice(t, 0, n);
}
function Io(e, t) {
  return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
}
function Ip(e, t, n, r) {
  let o = e.length;
  if (o == t) e.push(n, r);
  else if (o === 1) e.push(r, e[0]), (e[0] = n);
  else {
    for (o--, e.push(e[o - 1], e[o]); o > t; ) {
      let i = o - 2;
      (e[o] = e[i]), o--;
    }
    (e[t] = n), (e[t + 1] = r);
  }
}
function Sp(e, t, n) {
  let r = Cr(e, t);
  return r >= 0 ? (e[r | 1] = n) : ((r = ~r), Ip(e, r, t, n)), r;
}
function ws(e, t) {
  let n = Cr(e, t);
  if (n >= 0) return e[n | 1];
}
function Cr(e, t) {
  return EE(e, t, 1);
}
function EE(e, t, n) {
  let r = 0,
    o = e.length >> n;
  for (; o !== r; ) {
    let i = r + ((o - r) >> 1),
      s = e[i << n];
    if (t === s) return i << n;
    s > t ? (o = i) : (r = i + 1);
  }
  return ~(o << n);
}
var kn = {},
  Vt = [],
  Bt = new w(""),
  vu = new w("", -1),
  yu = new w(""),
  Do = class {
    get(t, n = xn) {
      if (n === xn) {
        let o = Ep("", -201);
        throw ((o.name = "\u0275NotFound"), o);
      }
      return n;
    }
  };
function Eu(e) {
  return e[pu] || null;
}
function fn(e) {
  return e[lu] || null;
}
function _u(e) {
  return e[du] || null;
}
function wp(e) {
  return e[fu] || null;
}
function Ht(e) {
  return { ɵproviders: e };
}
function Tp(e) {
  return Ht([{ provide: Bt, multi: !0, useValue: e }]);
}
function bp(...e) {
  return { ɵproviders: Du(!0, e), ɵfromNgModule: !0 };
}
function Du(e, ...t) {
  let n = [],
    r = new Set(),
    o,
    i = (s) => {
      n.push(s);
    };
  return (
    Ss(t, (s) => {
      let a = s;
      ys(a, i, [], r) && ((o ||= []), o.push(a));
    }),
    o !== void 0 && Mp(o, i),
    n
  );
}
function Mp(e, t) {
  for (let n = 0; n < e.length; n++) {
    let { ngModule: r, providers: o } = e[n];
    Cu(o, (i) => {
      t(i, r);
    });
  }
}
function ys(e, t, n, r) {
  if (((e = Fe(e)), !e)) return !1;
  let o = null,
    i = Xc(e),
    s = !i && fn(e);
  if (!i && !s) {
    let c = e.ngModule;
    if (((i = Xc(c)), i)) o = c;
    else return !1;
  } else {
    if (s && !s.standalone) return !1;
    o = e;
  }
  let a = r.has(o);
  if (s) {
    if (a) return !1;
    if ((r.add(o), s.dependencies)) {
      let c =
        typeof s.dependencies == "function" ? s.dependencies() : s.dependencies;
      for (let u of c) ys(u, t, n, r);
    }
  } else if (i) {
    if (i.imports != null && !a) {
      r.add(o);
      let u;
      try {
        Ss(i.imports, (l) => {
          ys(l, t, n, r) && ((u ||= []), u.push(l));
        });
      } finally {
      }
      u !== void 0 && Mp(u, t);
    }
    if (!a) {
      let u = cn(o) || (() => new o());
      t({ provide: o, useFactory: u, deps: Vt }, o),
        t({ provide: yu, useValue: o, multi: !0 }, o),
        t({ provide: Bt, useValue: () => R(o), multi: !0 }, o);
    }
    let c = i.providers;
    if (c != null && !a) {
      let u = e;
      Cu(c, (l) => {
        t(l, u);
      });
    }
  } else return !1;
  return o !== e && e.providers !== void 0;
}
function Cu(e, t) {
  for (let n of e)
    uu(n) && (n = n.ɵproviders), Array.isArray(n) ? Cu(n, t) : t(n);
}
var _E = W({ provide: String, useValue: W });
function Np(e) {
  return e !== null && typeof e == "object" && _E in e;
}
function DE(e) {
  return !!(e && e.useExisting);
}
function CE(e) {
  return !!(e && e.useFactory);
}
function Es(e) {
  return typeof e == "function";
}
var So = new w(""),
  ms = {},
  hp = {},
  Yc;
function wo() {
  return Yc === void 0 && (Yc = new Do()), Yc;
}
var ue = class {},
  Pn = class extends ue {
    parent;
    source;
    scopes;
    records = new Map();
    _ngOnDestroyHooks = new Set();
    _onDestroyHooks = [];
    get destroyed() {
      return this._destroyed;
    }
    _destroyed = !1;
    injectorDefTypes;
    constructor(t, n, r, o) {
      super(),
        (this.parent = n),
        (this.source = r),
        (this.scopes = o),
        tu(t, (s) => this.processProvider(s)),
        this.records.set(vu, _r(void 0, this)),
        o.has("environment") && this.records.set(ue, _r(void 0, this));
      let i = this.records.get(So);
      i != null && typeof i.value == "string" && this.scopes.add(i.value),
        (this.injectorDefTypes = new Set(this.get(yu, Vt, { self: !0 })));
    }
    retrieve(t, n) {
      let r = On(n) || 0;
      try {
        return this.get(t, xn, r);
      } catch (o) {
        if (ir(o)) return o;
        throw o;
      }
    }
    destroy() {
      Eo(this), (this._destroyed = !0);
      let t = L(null);
      try {
        for (let r of this._ngOnDestroyHooks) r.ngOnDestroy();
        let n = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let r of n) r();
      } finally {
        this.records.clear(),
          this._ngOnDestroyHooks.clear(),
          this.injectorDefTypes.clear(),
          L(t);
      }
    }
    onDestroy(t) {
      return (
        Eo(this), this._onDestroyHooks.push(t), () => this.removeOnDestroy(t)
      );
    }
    runInContext(t) {
      Eo(this);
      let n = pt(this),
        r = Te(void 0),
        o;
      try {
        return t();
      } finally {
        pt(n), Te(r);
      }
    }
    get(t, n = xn, r) {
      if ((Eo(this), t.hasOwnProperty(pp))) return t[pp](this);
      let o = On(r),
        i,
        s = pt(this),
        a = Te(void 0);
      try {
        if (!(o & 4)) {
          let u = this.records.get(t);
          if (u === void 0) {
            let l = bE(t) && Co(t);
            l && this.injectableDefInScope(l)
              ? (u = _r(eu(t), ms))
              : (u = null),
              this.records.set(t, u);
          }
          if (u != null) return this.hydrate(t, u, o);
        }
        let c = o & 2 ? wo() : this.parent;
        return (n = o & 8 && n === xn ? null : n), c.get(t, n);
      } catch (c) {
        let u = pE(c);
        throw u === -200 || u === -201 ? new I(u, null) : c;
      } finally {
        Te(a), pt(s);
      }
    }
    resolveInjectorInitializers() {
      let t = L(null),
        n = pt(this),
        r = Te(void 0),
        o;
      try {
        let i = this.get(Bt, Vt, { self: !0 });
        for (let s of i) s();
      } finally {
        pt(n), Te(r), L(t);
      }
    }
    toString() {
      let t = [],
        n = this.records;
      for (let r of n.keys()) t.push($t(r));
      return `R3Injector[${t.join(", ")}]`;
    }
    processProvider(t) {
      t = Fe(t);
      let n = Es(t) ? t : Fe(t && t.provide),
        r = SE(t);
      if (!Es(t) && t.multi === !0) {
        let o = this.records.get(n);
        o ||
          ((o = _r(void 0, ms, !0)),
          (o.factory = () => Jc(o.multi)),
          this.records.set(n, o)),
          (n = t),
          o.multi.push(t);
      }
      this.records.set(n, r);
    }
    hydrate(t, n, r) {
      let o = L(null);
      try {
        if (n.value === hp) throw hu($t(t));
        return (
          n.value === ms && ((n.value = hp), (n.value = n.factory(void 0, r))),
          typeof n.value == "object" &&
            n.value &&
            TE(n.value) &&
            this._ngOnDestroyHooks.add(n.value),
          n.value
        );
      } finally {
        L(o);
      }
    }
    injectableDefInScope(t) {
      if (!t.providedIn) return !1;
      let n = Fe(t.providedIn);
      return typeof n == "string"
        ? n === "any" || this.scopes.has(n)
        : this.injectorDefTypes.has(n);
    }
    removeOnDestroy(t) {
      let n = this._onDestroyHooks.indexOf(t);
      n !== -1 && this._onDestroyHooks.splice(n, 1);
    }
  };
function eu(e) {
  let t = Co(e),
    n = t !== null ? t.factory : cn(e);
  if (n !== null) return n;
  if (e instanceof w) throw new I(204, !1);
  if (e instanceof Function) return IE(e);
  throw new I(204, !1);
}
function IE(e) {
  if (e.length > 0) throw new I(204, !1);
  let n = lE(e);
  return n !== null ? () => n.factory(e) : () => new e();
}
function SE(e) {
  if (Np(e)) return _r(void 0, e.useValue);
  {
    let t = Rp(e);
    return _r(t, ms);
  }
}
function Rp(e, t, n) {
  let r;
  if (Es(e)) {
    let o = Fe(e);
    return cn(o) || eu(o);
  } else if (Np(e)) r = () => Fe(e.useValue);
  else if (CE(e)) r = () => e.useFactory(...Jc(e.deps || []));
  else if (DE(e))
    r = (o, i) => R(Fe(e.useExisting), i !== void 0 && i & 8 ? 8 : void 0);
  else {
    let o = Fe(e && (e.useClass || e.provide));
    if (wE(e)) r = () => new o(...Jc(e.deps));
    else return cn(o) || eu(o);
  }
  return r;
}
function Eo(e) {
  if (e.destroyed) throw new I(205, !1);
}
function _r(e, t, n = !1) {
  return { factory: e, value: t, multi: n ? [] : void 0 };
}
function wE(e) {
  return !!e.deps;
}
function TE(e) {
  return (
    e !== null && typeof e == "object" && typeof e.ngOnDestroy == "function"
  );
}
function bE(e) {
  return (
    typeof e == "function" ||
    (typeof e == "object" && e.ngMetadataName === "InjectionToken")
  );
}
function tu(e, t) {
  for (let n of e)
    Array.isArray(n) ? tu(n, t) : n && uu(n) ? tu(n.ɵproviders, t) : t(n);
}
function he(e, t) {
  let n;
  e instanceof Pn ? (Eo(e), (n = e)) : (n = new Kc(e));
  let r,
    o = pt(n),
    i = Te(void 0);
  try {
    return t();
  } finally {
    pt(o), Te(i);
  }
}
function Ap() {
  return _p() !== void 0 || ji() != null;
}
var rt = 0,
  x = 1,
  O = 2,
  de = 3,
  Qe = 4,
  Ue = 5,
  To = 6,
  Ir = 7,
  Ee = 8,
  pn = 9,
  gt = 10,
  Z = 11,
  Sr = 12,
  Iu = 13,
  Ln = 14,
  Ge = 15,
  hn = 16,
  jn = 17,
  mt = 18,
  bo = 19,
  Su = 20,
  jt = 21,
  Ts = 22,
  Mo = 23,
  ze = 24,
  bs = 25,
  No = 26,
  le = 27,
  xp = 1;
var gn = 7,
  Ro = 8,
  $n = 9,
  be = 10;
function vt(e) {
  return Array.isArray(e) && typeof e[xp] == "object";
}
function ot(e) {
  return Array.isArray(e) && e[xp] === !0;
}
function wu(e) {
  return (e.flags & 4) !== 0;
}
function mn(e) {
  return e.componentOffset > -1;
}
function wr(e) {
  return (e.flags & 1) === 1;
}
function Vn(e) {
  return !!e.template;
}
function Tr(e) {
  return (e[O] & 512) !== 0;
}
function Bn(e) {
  return (e[O] & 256) === 256;
}
var Op = "svg",
  Pp = "math";
function ke(e) {
  for (; Array.isArray(e); ) e = e[rt];
  return e;
}
function Ao(e, t) {
  return ke(t[e]);
}
function it(e, t) {
  return ke(t[e.index]);
}
function Ms(e, t) {
  return e.data[t];
}
function Tu(e, t) {
  return e[t];
}
function bu(e, t, n, r) {
  n >= e.data.length && ((e.data[n] = null), (e.blueprint[n] = null)),
    (t[n] = r);
}
function Ke(e, t) {
  let n = t[e];
  return vt(n) ? n : n[rt];
}
function Fp(e) {
  return (e[O] & 4) === 4;
}
function Ns(e) {
  return (e[O] & 128) === 128;
}
function kp(e) {
  return ot(e[de]);
}
function br(e, t) {
  return t == null ? null : e[t];
}
function Mu(e) {
  e[jn] = 0;
}
function Nu(e) {
  e[O] & 1024 || ((e[O] |= 1024), Ns(e) && Oo(e));
}
function Lp(e, t) {
  for (; e > 0; ) (t = t[Ln]), e--;
  return t;
}
function xo(e) {
  return !!(e[O] & 9216 || e[ze]?.dirty);
}
function Rs(e) {
  e[gt].changeDetectionScheduler?.notify(8),
    e[O] & 64 && (e[O] |= 1024),
    xo(e) && Oo(e);
}
function Oo(e) {
  e[gt].changeDetectionScheduler?.notify(0);
  let t = un(e);
  for (; t !== null && !(t[O] & 8192 || ((t[O] |= 8192), !Ns(t))); ) t = un(t);
}
function Ru(e, t) {
  if (Bn(e)) throw new I(911, !1);
  e[jt] === null && (e[jt] = []), e[jt].push(t);
}
function jp(e, t) {
  if (e[jt] === null) return;
  let n = e[jt].indexOf(t);
  n !== -1 && e[jt].splice(n, 1);
}
function un(e) {
  let t = e[de];
  return ot(t) ? t[de] : t;
}
function Au(e) {
  return (e[Ir] ??= []);
}
function xu(e) {
  return (e.cleanup ??= []);
}
function $p(e, t, n, r) {
  let o = Au(t);
  o.push(n), e.firstCreatePass && xu(e).push(r, o.length - 1);
}
var j = { lFrame: nh(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
var nu = !1;
function Vp() {
  return j.lFrame.elementDepthCount;
}
function Bp() {
  j.lFrame.elementDepthCount++;
}
function Hp() {
  j.lFrame.elementDepthCount--;
}
function As() {
  return j.bindingsEnabled;
}
function Up() {
  return j.skipHydrationRootTNode !== null;
}
function Gp(e) {
  return j.skipHydrationRootTNode === e;
}
function zp() {
  j.skipHydrationRootTNode = null;
}
function B() {
  return j.lFrame.lView;
}
function Me() {
  return j.lFrame.tView;
}
function yt(e) {
  return (j.lFrame.contextLView = e), e[Ee];
}
function Et(e) {
  return (j.lFrame.contextLView = null), e;
}
function Ne() {
  let e = Ou();
  for (; e !== null && e.type === 64; ) e = e.parent;
  return e;
}
function Ou() {
  return j.lFrame.currentTNode;
}
function Mr() {
  let e = j.lFrame,
    t = e.currentTNode;
  return e.isParent ? t : t.parent;
}
function Ut(e, t) {
  let n = j.lFrame;
  (n.currentTNode = e), (n.isParent = t);
}
function Pu() {
  return j.lFrame.isParent;
}
function Wp() {
  j.lFrame.isParent = !1;
}
function qp() {
  return j.lFrame.contextLView;
}
function Fu() {
  return nu;
}
function ku(e) {
  let t = nu;
  return (nu = e), t;
}
function Po() {
  let e = j.lFrame,
    t = e.bindingRootIndex;
  return t === -1 && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t;
}
function Zp() {
  return j.lFrame.bindingIndex;
}
function Yp(e) {
  return (j.lFrame.bindingIndex = e);
}
function Fo() {
  return j.lFrame.bindingIndex++;
}
function Xp(e) {
  let t = j.lFrame,
    n = t.bindingIndex;
  return (t.bindingIndex = t.bindingIndex + e), n;
}
function Qp() {
  return j.lFrame.inI18n;
}
function Lu(e) {
  j.lFrame.inI18n = e;
}
function Kp(e, t) {
  let n = j.lFrame;
  (n.bindingIndex = n.bindingRootIndex = e), xs(t);
}
function Jp() {
  return j.lFrame.currentDirectiveIndex;
}
function xs(e) {
  j.lFrame.currentDirectiveIndex = e;
}
function eh(e) {
  let t = j.lFrame.currentDirectiveIndex;
  return t === -1 ? null : e[t];
}
function ju() {
  return j.lFrame.currentQueryIndex;
}
function Os(e) {
  j.lFrame.currentQueryIndex = e;
}
function ME(e) {
  let t = e[x];
  return t.type === 2 ? t.declTNode : t.type === 1 ? e[Ue] : null;
}
function $u(e, t, n) {
  if (n & 4) {
    let o = t,
      i = e;
    for (; (o = o.parent), o === null && !(n & 1); )
      if (((o = ME(i)), o === null || ((i = i[Ln]), o.type & 10))) break;
    if (o === null) return !1;
    (t = o), (e = i);
  }
  let r = (j.lFrame = th());
  return (r.currentTNode = t), (r.lView = e), !0;
}
function Ps(e) {
  let t = th(),
    n = e[x];
  (j.lFrame = t),
    (t.currentTNode = n.firstChild),
    (t.lView = e),
    (t.tView = n),
    (t.contextLView = e),
    (t.bindingIndex = n.bindingStartIndex),
    (t.inI18n = !1);
}
function th() {
  let e = j.lFrame,
    t = e === null ? null : e.child;
  return t === null ? nh(e) : t;
}
function nh(e) {
  let t = {
    currentTNode: null,
    isParent: !0,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: e,
    child: null,
    inI18n: !1,
  };
  return e !== null && (e.child = t), t;
}
function rh() {
  let e = j.lFrame;
  return (j.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e;
}
var Vu = rh;
function Fs() {
  let e = rh();
  (e.isParent = !0),
    (e.tView = null),
    (e.selectedIndex = -1),
    (e.contextLView = null),
    (e.elementDepthCount = 0),
    (e.currentDirectiveIndex = -1),
    (e.currentNamespace = null),
    (e.bindingRootIndex = -1),
    (e.bindingIndex = -1),
    (e.currentQueryIndex = 0);
}
function oh(e) {
  return (j.lFrame.contextLView = Lp(e, j.lFrame.contextLView))[Ee];
}
function Hn() {
  return j.lFrame.selectedIndex;
}
function vn(e) {
  j.lFrame.selectedIndex = e;
}
function Bu() {
  let e = j.lFrame;
  return Ms(e.tView, e.selectedIndex);
}
function ih() {
  return j.lFrame.currentNamespace;
}
var sh = !0;
function ko() {
  return sh;
}
function Nr(e) {
  sh = e;
}
function ru(e, t = null, n = null, r) {
  let o = Hu(e, t, n, r);
  return o.resolveInjectorInitializers(), o;
}
function Hu(e, t = null, n = null, r, o = new Set()) {
  let i = [n || Vt, bp(e)];
  return (
    (r = r || (typeof e == "object" ? void 0 : $t(e))),
    new Pn(i, t || wo(), r || null, o)
  );
}
var Xe = class e {
    static THROW_IF_NOT_FOUND = xn;
    static NULL = new Do();
    static create(t, n) {
      if (Array.isArray(t)) return ru({ name: "" }, n, t, "");
      {
        let r = t.name ?? "";
        return ru({ name: r }, t.parent, t.providers, r);
      }
    }
    static ɵprov = S({ token: e, providedIn: "any", factory: () => R(vu) });
    static __NG_ELEMENT_ID__ = -1;
  },
  Y = new w(""),
  Gt = (() => {
    class e {
      static __NG_ELEMENT_ID__ = NE;
      static __NG_ENV_ID__ = (n) => n;
    }
    return e;
  })(),
  ou = class extends Gt {
    _lView;
    constructor(t) {
      super(), (this._lView = t);
    }
    get destroyed() {
      return Bn(this._lView);
    }
    onDestroy(t) {
      let n = this._lView;
      return Ru(n, t), () => jp(n, t);
    }
  };
function NE() {
  return new ou(B());
}
var ht = class {
    _console = console;
    handleError(t) {
      this._console.error("ERROR", t);
    }
  },
  _e = new w("", {
    providedIn: "root",
    factory: () => {
      let e = g(ue),
        t;
      return (n) => {
        e.destroyed && !t
          ? setTimeout(() => {
              throw n;
            })
          : ((t ??= e.get(ht)), t.handleError(n));
      };
    },
  }),
  ah = { provide: Bt, useValue: () => void g(ht), multi: !0 },
  RE = new w("", {
    providedIn: "root",
    factory: () => {
      let e = g(Y).defaultView;
      if (!e) return;
      let t = g(_e),
        n = (i) => {
          t(i.reason), i.preventDefault();
        },
        r = (i) => {
          i.error ? t(i.error) : t(new Error(i.message, { cause: i })),
            i.preventDefault();
        },
        o = () => {
          e.addEventListener("unhandledrejection", n),
            e.addEventListener("error", r);
        };
      typeof Zone < "u" ? Zone.root.run(o) : o(),
        g(Gt).onDestroy(() => {
          e.removeEventListener("error", r),
            e.removeEventListener("unhandledrejection", n);
        });
    },
  });
function Uu() {
  return Ht([Tp(() => void g(RE))]);
}
function Le(e, t) {
  let [n, r, o] = xc(e, t?.equal),
    i = n,
    s = i[Se];
  return (i.set = r), (i.update = o), (i.asReadonly = ch.bind(i)), i;
}
function ch() {
  let e = this[Se];
  if (e.readonlyFn === void 0) {
    let t = () => this();
    (t[Se] = e), (e.readonlyFn = t);
  }
  return e.readonlyFn;
}
var ln = class {},
  Lo = new w("", { providedIn: "root", factory: () => !1 });
var Gu = new w(""),
  zu = new w(""),
  _t = (() => {
    class e {
      taskId = 0;
      pendingTasks = new Set();
      destroyed = !1;
      pendingTask = new pe(!1);
      get hasPendingTasks() {
        return this.destroyed ? !1 : this.pendingTask.value;
      }
      get hasPendingTasksObservable() {
        return this.destroyed
          ? new $((n) => {
              n.next(!1), n.complete();
            })
          : this.pendingTask;
      }
      add() {
        !this.hasPendingTasks && !this.destroyed && this.pendingTask.next(!0);
        let n = this.taskId++;
        return this.pendingTasks.add(n), n;
      }
      has(n) {
        return this.pendingTasks.has(n);
      }
      remove(n) {
        this.pendingTasks.delete(n),
          this.pendingTasks.size === 0 &&
            this.hasPendingTasks &&
            this.pendingTask.next(!1);
      }
      ngOnDestroy() {
        this.pendingTasks.clear(),
          this.hasPendingTasks && this.pendingTask.next(!1),
          (this.destroyed = !0),
          this.pendingTask.unsubscribe();
      }
      static ɵprov = S({
        token: e,
        providedIn: "root",
        factory: () => new e(),
      });
    }
    return e;
  })(),
  ks = (() => {
    class e {
      internalPendingTasks = g(_t);
      scheduler = g(ln);
      errorHandler = g(_e);
      add() {
        let n = this.internalPendingTasks.add();
        return () => {
          this.internalPendingTasks.has(n) &&
            (this.scheduler.notify(11), this.internalPendingTasks.remove(n));
        };
      }
      run(n) {
        let r = this.add();
        n().catch(this.errorHandler).finally(r);
      }
      static ɵprov = S({
        token: e,
        providedIn: "root",
        factory: () => new e(),
      });
    }
    return e;
  })();
function jo(...e) {}
var Wu = (() => {
    class e {
      static ɵprov = S({
        token: e,
        providedIn: "root",
        factory: () => new iu(),
      });
    }
    return e;
  })(),
  iu = class {
    dirtyEffectCount = 0;
    queues = new Map();
    add(t) {
      this.enqueue(t), this.schedule(t);
    }
    schedule(t) {
      t.dirty && this.dirtyEffectCount++;
    }
    remove(t) {
      let n = t.zone,
        r = this.queues.get(n);
      r.has(t) && (r.delete(t), t.dirty && this.dirtyEffectCount--);
    }
    enqueue(t) {
      let n = t.zone;
      this.queues.has(n) || this.queues.set(n, new Set());
      let r = this.queues.get(n);
      r.has(t) || r.add(t);
    }
    flush() {
      for (; this.dirtyEffectCount > 0; ) {
        let t = !1;
        for (let [n, r] of this.queues)
          n === null
            ? (t ||= this.flushQueue(r))
            : (t ||= n.run(() => this.flushQueue(r)));
        t || (this.dirtyEffectCount = 0);
      }
    }
    flushQueue(t) {
      let n = !1;
      for (let r of t) r.dirty && (this.dirtyEffectCount--, (n = !0), r.run());
      return n;
    }
  };
function ua(e) {
  return { toString: e }.toString();
}
function VE(e) {
  return typeof e == "function";
}
var qs = class {
  previousValue;
  currentValue;
  firstChange;
  constructor(t, n, r) {
    (this.previousValue = t), (this.currentValue = n), (this.firstChange = r);
  }
  isFirstChange() {
    return this.firstChange;
  }
};
function Gh(e, t, n, r) {
  t !== null ? t.applyValueToInputSignal(t, r) : (e[n] = r);
}
var qt = (() => {
  let e = () => zh;
  return (e.ngInherit = !0), e;
})();
function zh(e) {
  return e.type.prototype.ngOnChanges && (e.setInput = HE), BE;
}
function BE() {
  let e = qh(this),
    t = e?.current;
  if (t) {
    let n = e.previous;
    if (n === kn) e.previous = t;
    else for (let r in t) n[r] = t[r];
    (e.current = null), this.ngOnChanges(t);
  }
}
function HE(e, t, n, r, o) {
  let i = this.declaredInputs[r],
    s = qh(e) || UE(e, { previous: kn, current: null }),
    a = s.current || (s.current = {}),
    c = s.previous,
    u = c[i];
  (a[i] = new qs(u && u.currentValue, n, c === kn)), Gh(e, t, o, n);
}
var Wh = "__ngSimpleChanges__";
function qh(e) {
  return e[Wh] || null;
}
function UE(e, t) {
  return (e[Wh] = t);
}
var uh = [];
var X = function (e, t = null, n) {
  for (let r = 0; r < uh.length; r++) {
    let o = uh[r];
    o(e, t, n);
  }
};
function GE(e, t, n) {
  let { ngOnChanges: r, ngOnInit: o, ngDoCheck: i } = t.type.prototype;
  if (r) {
    let s = zh(t);
    (n.preOrderHooks ??= []).push(e, s),
      (n.preOrderCheckHooks ??= []).push(e, s);
  }
  o && (n.preOrderHooks ??= []).push(0 - e, o),
    i &&
      ((n.preOrderHooks ??= []).push(e, i),
      (n.preOrderCheckHooks ??= []).push(e, i));
}
function Zh(e, t) {
  for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
    let i = e.data[n].type.prototype,
      {
        ngAfterContentInit: s,
        ngAfterContentChecked: a,
        ngAfterViewInit: c,
        ngAfterViewChecked: u,
        ngOnDestroy: l,
      } = i;
    s && (e.contentHooks ??= []).push(-n, s),
      a &&
        ((e.contentHooks ??= []).push(n, a),
        (e.contentCheckHooks ??= []).push(n, a)),
      c && (e.viewHooks ??= []).push(-n, c),
      u &&
        ((e.viewHooks ??= []).push(n, u), (e.viewCheckHooks ??= []).push(n, u)),
      l != null && (e.destroyHooks ??= []).push(n, l);
  }
}
function Bs(e, t, n) {
  Yh(e, t, 3, n);
}
function Hs(e, t, n, r) {
  (e[O] & 3) === n && Yh(e, t, n, r);
}
function qu(e, t) {
  let n = e[O];
  (n & 3) === t && ((n &= 16383), (n += 1), (e[O] = n));
}
function Yh(e, t, n, r) {
  let o = r !== void 0 ? e[jn] & 65535 : 0,
    i = r ?? -1,
    s = t.length - 1,
    a = 0;
  for (let c = o; c < s; c++)
    if (typeof t[c + 1] == "number") {
      if (((a = t[c]), r != null && a >= r)) break;
    } else
      t[c] < 0 && (e[jn] += 65536),
        (a < i || i == -1) &&
          (zE(e, n, t, c), (e[jn] = (e[jn] & 4294901760) + c + 2)),
        c++;
}
function lh(e, t) {
  X(4, e, t);
  let n = L(null);
  try {
    t.call(e);
  } finally {
    L(n), X(5, e, t);
  }
}
function zE(e, t, n, r) {
  let o = n[r] < 0,
    i = n[r + 1],
    s = o ? -n[r] : n[r],
    a = e[s];
  o
    ? e[O] >> 14 < e[jn] >> 16 &&
      (e[O] & 3) === t &&
      ((e[O] += 16384), lh(a, i))
    : lh(a, i);
}
var Ar = -1,
  Go = class {
    factory;
    name;
    injectImpl;
    resolving = !1;
    canSeeViewProviders;
    multi;
    componentProviders;
    index;
    providerFactory;
    constructor(t, n, r, o) {
      (this.factory = t),
        (this.name = o),
        (this.canSeeViewProviders = n),
        (this.injectImpl = r);
    }
  };
function WE(e) {
  return (e.flags & 8) !== 0;
}
function qE(e) {
  return (e.flags & 16) !== 0;
}
function ZE(e, t, n) {
  let r = 0;
  for (; r < n.length; ) {
    let o = n[r];
    if (typeof o == "number") {
      if (o !== 0) break;
      r++;
      let i = n[r++],
        s = n[r++],
        a = n[r++];
      e.setAttribute(t, s, a, i);
    } else {
      let i = o,
        s = n[++r];
      YE(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
    }
  }
  return r;
}
function Xh(e) {
  return e === 3 || e === 4 || e === 6;
}
function YE(e) {
  return e.charCodeAt(0) === 64;
}
function Rl(e, t) {
  if (!(t === null || t.length === 0))
    if (e === null || e.length === 0) e = t.slice();
    else {
      let n = -1;
      for (let r = 0; r < t.length; r++) {
        let o = t[r];
        typeof o == "number"
          ? (n = o)
          : n === 0 ||
            (n === -1 || n === 2
              ? dh(e, n, o, null, t[++r])
              : dh(e, n, o, null, null));
      }
    }
  return e;
}
function dh(e, t, n, r, o) {
  let i = 0,
    s = e.length;
  if (t === -1) s = -1;
  else
    for (; i < e.length; ) {
      let a = e[i++];
      if (typeof a == "number") {
        if (a === t) {
          s = -1;
          break;
        } else if (a > t) {
          s = i - 1;
          break;
        }
      }
    }
  for (; i < e.length; ) {
    let a = e[i];
    if (typeof a == "number") break;
    if (a === n) {
      o !== null && (e[i + 1] = o);
      return;
    }
    i++, o !== null && i++;
  }
  s !== -1 && (e.splice(s, 0, t), (i = s + 1)),
    e.splice(i++, 0, n),
    o !== null && e.splice(i++, 0, o);
}
function Qh(e) {
  return e !== Ar;
}
function Zs(e) {
  return e & 32767;
}
function XE(e) {
  return e >> 16;
}
function Ys(e, t) {
  let n = XE(e),
    r = t;
  for (; n > 0; ) (r = r[Ln]), n--;
  return r;
}
var nl = !0;
function Xs(e) {
  let t = nl;
  return (nl = e), t;
}
var QE = 256,
  Kh = QE - 1,
  Jh = 5,
  KE = 0,
  Dt = {};
function JE(e, t, n) {
  let r;
  typeof n == "string"
    ? (r = n.charCodeAt(0) || 0)
    : n.hasOwnProperty(Fn) && (r = n[Fn]),
    r == null && (r = n[Fn] = KE++);
  let o = r & Kh,
    i = 1 << o;
  t.data[e + (o >> Jh)] |= i;
}
function eg(e, t) {
  let n = tg(e, t);
  if (n !== -1) return n;
  let r = t[x];
  r.firstCreatePass &&
    ((e.injectorIndex = t.length),
    Zu(r.data, e),
    Zu(t, null),
    Zu(r.blueprint, null));
  let o = Al(e, t),
    i = e.injectorIndex;
  if (Qh(o)) {
    let s = Zs(o),
      a = Ys(o, t),
      c = a[x].data;
    for (let u = 0; u < 8; u++) t[i + u] = a[s + u] | c[s + u];
  }
  return (t[i + 8] = o), i;
}
function Zu(e, t) {
  e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
}
function tg(e, t) {
  return e.injectorIndex === -1 ||
    (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
    t[e.injectorIndex + 8] === null
    ? -1
    : e.injectorIndex;
}
function Al(e, t) {
  if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
  let n = 0,
    r = null,
    o = t;
  for (; o !== null; ) {
    if (((r = sg(o)), r === null)) return Ar;
    if ((n++, (o = o[Ln]), r.injectorIndex !== -1))
      return r.injectorIndex | (n << 16);
  }
  return Ar;
}
function e_(e, t, n) {
  JE(e, t, n);
}
function t_(e, t) {
  if (t === "class") return e.classes;
  if (t === "style") return e.styles;
  let n = e.attrs;
  if (n) {
    let r = n.length,
      o = 0;
    for (; o < r; ) {
      let i = n[o];
      if (Xh(i)) break;
      if (i === 0) o = o + 2;
      else if (typeof i == "number")
        for (o++; o < r && typeof n[o] == "string"; ) o++;
      else {
        if (i === t) return n[o + 1];
        o = o + 2;
      }
    }
  }
  return null;
}
function ng(e, t, n) {
  if (n & 8 || e !== void 0) return e;
  Is(t, "NodeInjector");
}
function rg(e, t, n, r) {
  if ((n & 8 && r === void 0 && (r = null), (n & 3) === 0)) {
    let o = e[pn],
      i = Te(void 0);
    try {
      return o ? o.get(t, r, n & 8) : gu(t, r, n & 8);
    } finally {
      Te(i);
    }
  }
  return ng(r, t, n);
}
function og(e, t, n, r = 0, o) {
  if (e !== null) {
    if (t[O] & 2048 && !(r & 2)) {
      let s = i_(e, t, n, r, Dt);
      if (s !== Dt) return s;
    }
    let i = ig(e, t, n, r, Dt);
    if (i !== Dt) return i;
  }
  return rg(t, n, r, o);
}
function ig(e, t, n, r, o) {
  let i = r_(n);
  if (typeof i == "function") {
    if (!$u(t, e, r)) return r & 1 ? ng(o, n, r) : rg(t, n, r, o);
    try {
      let s;
      if (((s = i(r)), s == null && !(r & 8))) Is(n);
      else return s;
    } finally {
      Vu();
    }
  } else if (typeof i == "number") {
    let s = null,
      a = tg(e, t),
      c = Ar,
      u = r & 1 ? t[Ge][Ue] : null;
    for (
      (a === -1 || r & 4) &&
      ((c = a === -1 ? Al(e, t) : t[a + 8]),
      c === Ar || !ph(r, !1)
        ? (a = -1)
        : ((s = t[x]), (a = Zs(c)), (t = Ys(c, t))));
      a !== -1;

    ) {
      let l = t[x];
      if (fh(i, a, l.data)) {
        let d = n_(a, t, n, s, r, u);
        if (d !== Dt) return d;
      }
      (c = t[a + 8]),
        c !== Ar && ph(r, t[x].data[a + 8] === u) && fh(i, a, t)
          ? ((s = l), (a = Zs(c)), (t = Ys(c, t)))
          : (a = -1);
    }
  }
  return o;
}
function n_(e, t, n, r, o, i) {
  let s = t[x],
    a = s.data[e + 8],
    c = r == null ? mn(a) && nl : r != s && (a.type & 3) !== 0,
    u = o & 1 && i === a,
    l = Us(a, s, n, c, u);
  return l !== null ? Qs(t, s, l, a, o) : Dt;
}
function Us(e, t, n, r, o) {
  let i = e.providerIndexes,
    s = t.data,
    a = i & 1048575,
    c = e.directiveStart,
    u = e.directiveEnd,
    l = i >> 20,
    d = r ? a : a + l,
    p = o ? a + l : u;
  for (let f = d; f < p; f++) {
    let v = s[f];
    if ((f < c && n === v) || (f >= c && v.type === n)) return f;
  }
  if (o) {
    let f = s[c];
    if (f && Vn(f) && f.type === n) return c;
  }
  return null;
}
function Qs(e, t, n, r, o) {
  let i = e[n],
    s = t.data;
  if (i instanceof Go) {
    let a = i;
    if (a.resolving) {
      let f = vp(s[n]);
      throw hu(f);
    }
    let c = Xs(a.canSeeViewProviders);
    a.resolving = !0;
    let u = s[n].type || s[n],
      l,
      d = a.injectImpl ? Te(a.injectImpl) : null,
      p = $u(e, r, 0);
    try {
      (i = e[n] = a.factory(void 0, o, s, e, r)),
        t.firstCreatePass && n >= r.directiveStart && GE(n, s[n], t);
    } finally {
      d !== null && Te(d), Xs(c), (a.resolving = !1), Vu();
    }
  }
  return i;
}
function r_(e) {
  if (typeof e == "string") return e.charCodeAt(0) || 0;
  let t = e.hasOwnProperty(Fn) ? e[Fn] : void 0;
  return typeof t == "number" ? (t >= 0 ? t & Kh : o_) : t;
}
function fh(e, t, n) {
  let r = 1 << e;
  return !!(n[t + (e >> Jh)] & r);
}
function ph(e, t) {
  return !(e & 2) && !(e & 1 && t);
}
var Un = class {
  _tNode;
  _lView;
  constructor(t, n) {
    (this._tNode = t), (this._lView = n);
  }
  get(t, n, r) {
    return og(this._tNode, this._lView, t, On(r), n);
  }
};
function o_() {
  return new Un(Ne(), B());
}
function la(e) {
  return ua(() => {
    let t = e.prototype.constructor,
      n = t[_o] || rl(t),
      r = Object.prototype,
      o = Object.getPrototypeOf(e.prototype).constructor;
    for (; o && o !== r; ) {
      let i = o[_o] || rl(o);
      if (i && i !== n) return i;
      o = Object.getPrototypeOf(o);
    }
    return (i) => new i();
  });
}
function rl(e) {
  return au(e)
    ? () => {
        let t = rl(Fe(e));
        return t && t();
      }
    : cn(e);
}
function i_(e, t, n, r, o) {
  let i = e,
    s = t;
  for (; i !== null && s !== null && s[O] & 2048 && !Tr(s); ) {
    let a = ig(i, s, n, r | 2, Dt);
    if (a !== Dt) return a;
    let c = i.parent;
    if (!c) {
      let u = s[Su];
      if (u) {
        let l = u.get(n, Dt, r);
        if (l !== Dt) return l;
      }
      (c = sg(s)), (s = s[Ln]);
    }
    i = c;
  }
  return o;
}
function sg(e) {
  let t = e[x],
    n = t.type;
  return n === 2 ? t.declTNode : n === 1 ? e[Ue] : null;
}
function Yo(e) {
  return t_(Ne(), e);
}
function s_() {
  return kr(Ne(), B());
}
function kr(e, t) {
  return new at(it(e, t));
}
var at = (() => {
  class e {
    nativeElement;
    constructor(n) {
      this.nativeElement = n;
    }
    static __NG_ELEMENT_ID__ = s_;
  }
  return e;
})();
function a_(e) {
  return e instanceof at ? e.nativeElement : e;
}
function c_() {
  return this._results[Symbol.iterator]();
}
var Ks = class {
  _emitDistinctChangesOnly;
  dirty = !0;
  _onDirty = void 0;
  _results = [];
  _changesDetected = !1;
  _changes = void 0;
  length = 0;
  first = void 0;
  last = void 0;
  get changes() {
    return (this._changes ??= new K());
  }
  constructor(t = !1) {
    this._emitDistinctChangesOnly = t;
  }
  get(t) {
    return this._results[t];
  }
  map(t) {
    return this._results.map(t);
  }
  filter(t) {
    return this._results.filter(t);
  }
  find(t) {
    return this._results.find(t);
  }
  reduce(t, n) {
    return this._results.reduce(t, n);
  }
  forEach(t) {
    this._results.forEach(t);
  }
  some(t) {
    return this._results.some(t);
  }
  toArray() {
    return this._results.slice();
  }
  toString() {
    return this._results.toString();
  }
  reset(t, n) {
    this.dirty = !1;
    let r = Cp(t);
    (this._changesDetected = !Dp(this._results, r, n)) &&
      ((this._results = r),
      (this.length = r.length),
      (this.last = r[this.length - 1]),
      (this.first = r[0]));
  }
  notifyOnChanges() {
    this._changes !== void 0 &&
      (this._changesDetected || !this._emitDistinctChangesOnly) &&
      this._changes.next(this);
  }
  onDirty(t) {
    this._onDirty = t;
  }
  setDirty() {
    (this.dirty = !0), this._onDirty?.();
  }
  destroy() {
    this._changes !== void 0 &&
      (this._changes.complete(), this._changes.unsubscribe());
  }
  [Symbol.iterator] = c_;
};
function ag(e) {
  return (e.flags & 128) === 128;
}
var xl = (function (e) {
    return (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e;
  })(xl || {}),
  cg = new Map(),
  u_ = 0;
function l_() {
  return u_++;
}
function d_(e) {
  cg.set(e[bo], e);
}
function ol(e) {
  cg.delete(e[bo]);
}
var hh = "__ngContext__";
function yn(e, t) {
  vt(t) ? ((e[hh] = t[bo]), d_(t)) : (e[hh] = t);
}
function ug(e) {
  return dg(e[Sr]);
}
function lg(e) {
  return dg(e[Qe]);
}
function dg(e) {
  for (; e !== null && !ot(e); ) e = e[Qe];
  return e;
}
var il;
function Ol(e) {
  il = e;
}
function Pl() {
  if (il !== void 0) return il;
  if (typeof document < "u") return document;
  throw new I(210, !1);
}
var da = new w("", { providedIn: "root", factory: () => f_ }),
  f_ = "ng",
  fa = new w(""),
  Lr = new w("", { providedIn: "platform", factory: () => "unknown" });
var pa = new w("", {
    providedIn: "root",
    factory: () =>
      Pl().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") ||
      null,
  }),
  ha = {
    breakpoints: [
      16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048,
      3840,
    ],
    placeholderResolution: 30,
    disableImageSizeWarning: !1,
    disableImageLazyLoadWarning: !1,
  },
  ga = new w("", { providedIn: "root", factory: () => ha });
var p_ = "h",
  h_ = "b";
var fg = !1,
  pg = new w("", { providedIn: "root", factory: () => fg });
var g_ = (e, t, n, r) => {};
function m_(e, t, n, r) {
  g_(e, t, n, r);
}
function Fl(e) {
  return (e.flags & 32) === 32;
}
var v_ = () => null;
function hg(e, t, n = !1) {
  return v_(e, t, n);
}
function gg(e, t) {
  let n = e.contentQueries;
  if (n !== null) {
    let r = L(null);
    try {
      for (let o = 0; o < n.length; o += 2) {
        let i = n[o],
          s = n[o + 1];
        if (s !== -1) {
          let a = e.data[s];
          Os(i), a.contentQueries(2, t[s], s);
        }
      }
    } finally {
      L(r);
    }
  }
}
function sl(e, t, n) {
  Os(0);
  let r = L(null);
  try {
    t(e, n);
  } finally {
    L(r);
  }
}
function kl(e, t, n) {
  if (wu(t)) {
    let r = L(null);
    try {
      let o = t.directiveStart,
        i = t.directiveEnd;
      for (let s = o; s < i; s++) {
        let a = e.data[s];
        if (a.contentQueries) {
          let c = n[s];
          a.contentQueries(1, c, s);
        }
      }
    } finally {
      L(r);
    }
  }
}
var Wt = (function (e) {
    return (
      (e[(e.Emulated = 0)] = "Emulated"),
      (e[(e.None = 2)] = "None"),
      (e[(e.ShadowDom = 3)] = "ShadowDom"),
      e
    );
  })(Wt || {}),
  Ls;
function y_() {
  if (Ls === void 0 && ((Ls = null), nt.trustedTypes))
    try {
      Ls = nt.trustedTypes.createPolicy("angular", {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return Ls;
}
function Ll(e) {
  return y_()?.createHTML(e) || e;
}
var js;
function E_() {
  if (js === void 0 && ((js = null), nt.trustedTypes))
    try {
      js = nt.trustedTypes.createPolicy("angular#unsafe-bypass", {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return js;
}
function gh(e) {
  return E_()?.createScriptURL(e) || e;
}
var Js = class {
  changingThisBreaksApplicationSecurity;
  constructor(t) {
    this.changingThisBreaksApplicationSecurity = t;
  }
  toString() {
    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${_s})`;
  }
};
function jr(e) {
  return e instanceof Js ? e.changingThisBreaksApplicationSecurity : e;
}
function jl(e, t) {
  let n = mg(e);
  if (n != null && n !== t) {
    if (n === "ResourceURL" && t === "URL") return !0;
    throw new Error(`Required a safe ${t}, got a ${n} (see ${_s})`);
  }
  return n === t;
}
function mg(e) {
  return (e instanceof Js && e.getTypeName()) || null;
}
function __(e) {
  let t = new cl(e);
  return D_() ? new al(t) : t;
}
var al = class {
    inertDocumentHelper;
    constructor(t) {
      this.inertDocumentHelper = t;
    }
    getInertBodyElement(t) {
      t = "<body><remove></remove>" + t;
      try {
        let n = new window.DOMParser().parseFromString(Ll(t), "text/html").body;
        return n === null
          ? this.inertDocumentHelper.getInertBodyElement(t)
          : (n.firstChild?.remove(), n);
      } catch {
        return null;
      }
    }
  },
  cl = class {
    defaultDoc;
    inertDocument;
    constructor(t) {
      (this.defaultDoc = t),
        (this.inertDocument =
          this.defaultDoc.implementation.createHTMLDocument(
            "sanitization-inert"
          ));
    }
    getInertBodyElement(t) {
      let n = this.inertDocument.createElement("template");
      return (n.innerHTML = Ll(t)), n;
    }
  };
function D_() {
  try {
    return !!new window.DOMParser().parseFromString(Ll(""), "text/html");
  } catch {
    return !1;
  }
}
var C_ = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function $l(e) {
  return (e = String(e)), e.match(C_) ? e : "unsafe:" + e;
}
function Cn(e) {
  let t = {};
  for (let n of e.split(",")) t[n] = !0;
  return t;
}
function Xo(...e) {
  let t = {};
  for (let n of e) for (let r in n) n.hasOwnProperty(r) && (t[r] = !0);
  return t;
}
var I_ = Cn("area,br,col,hr,img,wbr"),
  vg = Cn("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
  yg = Cn("rp,rt"),
  S_ = Xo(yg, vg),
  w_ = Xo(
    vg,
    Cn(
      "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
    )
  ),
  T_ = Xo(
    yg,
    Cn(
      "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
    )
  ),
  b_ = Xo(I_, w_, T_, S_),
  Eg = Cn("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
  M_ = Cn(
    "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
  ),
  N_ = Cn(
    "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
  ),
  R_ = Xo(Eg, M_, N_);
function A_(e) {
  return "content" in e && x_(e) ? e.content : null;
}
function x_(e) {
  return e.nodeType === Node.ELEMENT_NODE && e.nodeName === "TEMPLATE";
}
var ma = (function (e) {
  return (
    (e[(e.NONE = 0)] = "NONE"),
    (e[(e.HTML = 1)] = "HTML"),
    (e[(e.STYLE = 2)] = "STYLE"),
    (e[(e.SCRIPT = 3)] = "SCRIPT"),
    (e[(e.URL = 4)] = "URL"),
    (e[(e.RESOURCE_URL = 5)] = "RESOURCE_URL"),
    e
  );
})(ma || {});
function va(e) {
  let t = Dg();
  return t ? t.sanitize(ma.URL, e) || "" : jl(e, "URL") ? jr(e) : $l(Dr(e));
}
function _g(e) {
  let t = Dg();
  if (t) return gh(t.sanitize(ma.RESOURCE_URL, e) || "");
  if (jl(e, "ResourceURL")) return gh(jr(e));
  throw new I(904, !1);
}
function O_(e, t) {
  return (t === "src" &&
    (e === "embed" ||
      e === "frame" ||
      e === "iframe" ||
      e === "media" ||
      e === "script")) ||
    (t === "href" && (e === "base" || e === "link"))
    ? _g
    : va;
}
function Vl(e, t, n) {
  return O_(t, n)(e);
}
function Dg() {
  let e = B();
  return e && e[gt].sanitizer;
}
var P_ = /^>|^->|<!--|-->|--!>|<!-$/g,
  F_ = /(<|>)/g,
  k_ = "\u200B$1\u200B";
function L_(e) {
  return e.replace(P_, (t) => t.replace(F_, k_));
}
function Cg(e) {
  return e instanceof Function ? e() : e;
}
function j_(e, t, n) {
  let r = e.length;
  for (;;) {
    let o = e.indexOf(t, n);
    if (o === -1) return o;
    if (o === 0 || e.charCodeAt(o - 1) <= 32) {
      let i = t.length;
      if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
    }
    n = o + 1;
  }
}
var Ig = "ng-template";
function $_(e, t, n, r) {
  let o = 0;
  if (r) {
    for (; o < t.length && typeof t[o] == "string"; o += 2)
      if (t[o] === "class" && j_(t[o + 1].toLowerCase(), n, 0) !== -1)
        return !0;
  } else if (Bl(e)) return !1;
  if (((o = t.indexOf(1, o)), o > -1)) {
    let i;
    for (; ++o < t.length && typeof (i = t[o]) == "string"; )
      if (i.toLowerCase() === n) return !0;
  }
  return !1;
}
function Bl(e) {
  return e.type === 4 && e.value !== Ig;
}
function V_(e, t, n) {
  let r = e.type === 4 && !n ? Ig : e.value;
  return t === r;
}
function B_(e, t, n) {
  let r = 4,
    o = e.attrs,
    i = o !== null ? G_(o) : 0,
    s = !1;
  for (let a = 0; a < t.length; a++) {
    let c = t[a];
    if (typeof c == "number") {
      if (!s && !st(r) && !st(c)) return !1;
      if (s && st(c)) continue;
      (s = !1), (r = c | (r & 1));
      continue;
    }
    if (!s)
      if (r & 4) {
        if (
          ((r = 2 | (r & 1)),
          (c !== "" && !V_(e, c, n)) || (c === "" && t.length === 1))
        ) {
          if (st(r)) return !1;
          s = !0;
        }
      } else if (r & 8) {
        if (o === null || !$_(e, o, c, n)) {
          if (st(r)) return !1;
          s = !0;
        }
      } else {
        let u = t[++a],
          l = H_(c, o, Bl(e), n);
        if (l === -1) {
          if (st(r)) return !1;
          s = !0;
          continue;
        }
        if (u !== "") {
          let d;
          if (
            (l > i ? (d = "") : (d = o[l + 1].toLowerCase()), r & 2 && u !== d)
          ) {
            if (st(r)) return !1;
            s = !0;
          }
        }
      }
  }
  return st(r) || s;
}
function st(e) {
  return (e & 1) === 0;
}
function H_(e, t, n, r) {
  if (t === null) return -1;
  let o = 0;
  if (r || !n) {
    let i = !1;
    for (; o < t.length; ) {
      let s = t[o];
      if (s === e) return o;
      if (s === 3 || s === 6) i = !0;
      else if (s === 1 || s === 2) {
        let a = t[++o];
        for (; typeof a == "string"; ) a = t[++o];
        continue;
      } else {
        if (s === 4) break;
        if (s === 0) {
          o += 4;
          continue;
        }
      }
      o += i ? 1 : 2;
    }
    return -1;
  } else return z_(t, e);
}
function U_(e, t, n = !1) {
  for (let r = 0; r < t.length; r++) if (B_(e, t[r], n)) return !0;
  return !1;
}
function G_(e) {
  for (let t = 0; t < e.length; t++) {
    let n = e[t];
    if (Xh(n)) return t;
  }
  return e.length;
}
function z_(e, t) {
  let n = e.indexOf(4);
  if (n > -1)
    for (n++; n < e.length; ) {
      let r = e[n];
      if (typeof r == "number") return -1;
      if (r === t) return n;
      n++;
    }
  return -1;
}
function mh(e, t) {
  return e ? ":not(" + t.trim() + ")" : t;
}
function W_(e) {
  let t = e[0],
    n = 1,
    r = 2,
    o = "",
    i = !1;
  for (; n < e.length; ) {
    let s = e[n];
    if (typeof s == "string")
      if (r & 2) {
        let a = e[++n];
        o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
      } else r & 8 ? (o += "." + s) : r & 4 && (o += " " + s);
    else
      o !== "" && !st(s) && ((t += mh(i, o)), (o = "")),
        (r = s),
        (i = i || !st(r));
    n++;
  }
  return o !== "" && (t += mh(i, o)), t;
}
function q_(e) {
  return e.map(W_).join(",");
}
function Z_(e) {
  let t = [],
    n = [],
    r = 1,
    o = 2;
  for (; r < e.length; ) {
    let i = e[r];
    if (typeof i == "string")
      o === 2 ? i !== "" && t.push(i, e[++r]) : o === 8 && n.push(i);
    else {
      if (!st(o)) break;
      o = i;
    }
    r++;
  }
  return n.length && t.push(1, ...n), t;
}
var It = {};
function Sg(e, t) {
  return e.createText(t);
}
function wg(e, t, n) {
  e.setValue(t, n);
}
function Tg(e, t) {
  return e.createComment(L_(t));
}
function Hl(e, t, n) {
  return e.createElement(t, n);
}
function Gn(e, t, n, r, o) {
  e.insertBefore(t, n, r, o);
}
function bg(e, t, n) {
  e.appendChild(t, n);
}
function vh(e, t, n, r, o) {
  r !== null ? Gn(e, t, n, r, o) : bg(e, t, n);
}
function Mg(e, t, n, r) {
  e.removeChild(null, t, n, r);
}
function Y_(e, t, n) {
  e.setAttribute(t, "style", n);
}
function X_(e, t, n) {
  n === "" ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n);
}
function Ng(e, t, n) {
  let { mergedAttrs: r, classes: o, styles: i } = n;
  r !== null && ZE(e, t, r),
    o !== null && X_(e, t, o),
    i !== null && Y_(e, t, i);
}
function Ul(e, t, n, r, o, i, s, a, c, u, l) {
  let d = le + r,
    p = d + o,
    f = Q_(d, p),
    v = typeof u == "function" ? u() : u;
  return (f[x] = {
    type: e,
    blueprint: f,
    template: n,
    queries: null,
    viewQuery: a,
    declTNode: t,
    data: f.slice().fill(null, d),
    bindingStartIndex: d,
    expandoStartIndex: p,
    hostBindingOpCodes: null,
    firstCreatePass: !0,
    firstUpdatePass: !0,
    staticViewQueries: !1,
    staticContentQueries: !1,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof i == "function" ? i() : i,
    pipeRegistry: typeof s == "function" ? s() : s,
    firstChild: null,
    schemas: c,
    consts: v,
    incompleteFirstPass: !1,
    ssrId: l,
  });
}
function Q_(e, t) {
  let n = [];
  for (let r = 0; r < t; r++) n.push(r < e ? null : It);
  return n;
}
function K_(e) {
  let t = e.tView;
  return t === null || t.incompleteFirstPass
    ? (e.tView = Ul(
        1,
        null,
        e.template,
        e.decls,
        e.vars,
        e.directiveDefs,
        e.pipeDefs,
        e.viewQuery,
        e.schemas,
        e.consts,
        e.id
      ))
    : t;
}
function Gl(e, t, n, r, o, i, s, a, c, u, l) {
  let d = t.blueprint.slice();
  return (
    (d[rt] = o),
    (d[O] = r | 4 | 128 | 8 | 64 | 1024),
    (u !== null || (e && e[O] & 2048)) && (d[O] |= 2048),
    Mu(d),
    (d[de] = d[Ln] = e),
    (d[Ee] = n),
    (d[gt] = s || (e && e[gt])),
    (d[Z] = a || (e && e[Z])),
    (d[pn] = c || (e && e[pn]) || null),
    (d[Ue] = i),
    (d[bo] = l_()),
    (d[To] = l),
    (d[Su] = u),
    (d[Ge] = t.type == 2 ? e[Ge] : d),
    d
  );
}
function J_(e, t, n) {
  let r = it(t, e),
    o = K_(n),
    i = e[gt].rendererFactory,
    s = zl(
      e,
      Gl(
        e,
        o,
        null,
        Rg(n),
        r,
        t,
        null,
        i.createRenderer(r, n),
        null,
        null,
        null
      )
    );
  return (e[t.index] = s);
}
function Rg(e) {
  let t = 16;
  return e.signals ? (t = 4096) : e.onPush && (t = 64), t;
}
function Qo(e, t, n, r) {
  if (n === 0) return -1;
  let o = t.length;
  for (let i = 0; i < n; i++) t.push(r), e.blueprint.push(r), e.data.push(null);
  return o;
}
function zl(e, t) {
  return e[Sr] ? (e[Iu][Qe] = t) : (e[Sr] = t), (e[Iu] = t), t;
}
function D(e = 1) {
  Ag(Me(), B(), Hn() + e, !1);
}
function Ag(e, t, n, r) {
  if (!r)
    if ((t[O] & 3) === 3) {
      let i = e.preOrderCheckHooks;
      i !== null && Bs(t, i, n);
    } else {
      let i = e.preOrderHooks;
      i !== null && Hs(t, i, 0, n);
    }
  vn(n);
}
var ya = (function (e) {
  return (
    (e[(e.None = 0)] = "None"),
    (e[(e.SignalBased = 1)] = "SignalBased"),
    (e[(e.HasDecoratorInputTransform = 2)] = "HasDecoratorInputTransform"),
    e
  );
})(ya || {});
function ul(e, t, n, r) {
  let o = L(null);
  try {
    let [i, s, a] = e.inputs[n],
      c = null;
    (s & ya.SignalBased) !== 0 && (c = t[i][Se]),
      c !== null && c.transformFn !== void 0
        ? (r = c.transformFn(r))
        : a !== null && (r = a.call(t, r)),
      e.setInput !== null ? e.setInput(t, c, r, n, i) : Gh(t, c, i, r);
  } finally {
    L(o);
  }
}
var Ct = (function (e) {
    return (
      (e[(e.Important = 1)] = "Important"),
      (e[(e.DashCase = 2)] = "DashCase"),
      e
    );
  })(Ct || {}),
  ll;
function Wl(e, t) {
  return ll(e, t);
}
function eD(e) {
  ll === void 0 && (ll = e());
}
var xr = new Set(),
  ql = (function (e) {
    return (
      (e[(e.CHANGE_DETECTION = 0)] = "CHANGE_DETECTION"),
      (e[(e.AFTER_NEXT_RENDER = 1)] = "AFTER_NEXT_RENDER"),
      e
    );
  })(ql || {}),
  Ko = new w(""),
  yh = new Set();
function $r(e) {
  yh.has(e) ||
    (yh.add(e),
    performance?.mark?.("mark_feature_usage", { detail: { feature: e } }));
}
var xg = !1,
  dl = class extends K {
    __isAsync;
    destroyRef = void 0;
    pendingTasks = void 0;
    constructor(t = !1) {
      super(),
        (this.__isAsync = t),
        Ap() &&
          ((this.destroyRef = g(Gt, { optional: !0 }) ?? void 0),
          (this.pendingTasks = g(_t, { optional: !0 }) ?? void 0));
    }
    emit(t) {
      let n = L(null);
      try {
        super.next(t);
      } finally {
        L(n);
      }
    }
    subscribe(t, n, r) {
      let o = t,
        i = n || (() => null),
        s = r;
      if (t && typeof t == "object") {
        let c = t;
        (o = c.next?.bind(c)),
          (i = c.error?.bind(c)),
          (s = c.complete?.bind(c));
      }
      this.__isAsync &&
        ((i = this.wrapInTimeout(i)),
        o && (o = this.wrapInTimeout(o)),
        s && (s = this.wrapInTimeout(s)));
      let a = super.subscribe({ next: o, error: i, complete: s });
      return t instanceof ae && t.add(a), a;
    }
    wrapInTimeout(t) {
      return (n) => {
        let r = this.pendingTasks?.add();
        setTimeout(() => {
          try {
            t(n);
          } finally {
            r !== void 0 && this.pendingTasks?.remove(r);
          }
        });
      };
    }
  },
  De = dl;
function Og(e) {
  let t, n;
  function r() {
    e = jo;
    try {
      n !== void 0 &&
        typeof cancelAnimationFrame == "function" &&
        cancelAnimationFrame(n),
        t !== void 0 && clearTimeout(t);
    } catch {}
  }
  return (
    (t = setTimeout(() => {
      e(), r();
    })),
    typeof requestAnimationFrame == "function" &&
      (n = requestAnimationFrame(() => {
        e(), r();
      })),
    () => r()
  );
}
function Eh(e) {
  return (
    queueMicrotask(() => e()),
    () => {
      e = jo;
    }
  );
}
var Zl = "isAngularZone",
  ea = Zl + "_ID",
  tD = 0,
  oe = class e {
    hasPendingMacrotasks = !1;
    hasPendingMicrotasks = !1;
    isStable = !0;
    onUnstable = new De(!1);
    onMicrotaskEmpty = new De(!1);
    onStable = new De(!1);
    onError = new De(!1);
    constructor(t) {
      let {
        enableLongStackTrace: n = !1,
        shouldCoalesceEventChangeDetection: r = !1,
        shouldCoalesceRunChangeDetection: o = !1,
        scheduleInRootZone: i = xg,
      } = t;
      if (typeof Zone > "u") throw new I(908, !1);
      Zone.assertZonePatched();
      let s = this;
      (s._nesting = 0),
        (s._outer = s._inner = Zone.current),
        Zone.TaskTrackingZoneSpec &&
          (s._inner = s._inner.fork(new Zone.TaskTrackingZoneSpec())),
        n &&
          Zone.longStackTraceZoneSpec &&
          (s._inner = s._inner.fork(Zone.longStackTraceZoneSpec)),
        (s.shouldCoalesceEventChangeDetection = !o && r),
        (s.shouldCoalesceRunChangeDetection = o),
        (s.callbackScheduled = !1),
        (s.scheduleInRootZone = i),
        oD(s);
    }
    static isInAngularZone() {
      return typeof Zone < "u" && Zone.current.get(Zl) === !0;
    }
    static assertInAngularZone() {
      if (!e.isInAngularZone()) throw new I(909, !1);
    }
    static assertNotInAngularZone() {
      if (e.isInAngularZone()) throw new I(909, !1);
    }
    run(t, n, r) {
      return this._inner.run(t, n, r);
    }
    runTask(t, n, r, o) {
      let i = this._inner,
        s = i.scheduleEventTask("NgZoneEvent: " + o, t, nD, jo, jo);
      try {
        return i.runTask(s, n, r);
      } finally {
        i.cancelTask(s);
      }
    }
    runGuarded(t, n, r) {
      return this._inner.runGuarded(t, n, r);
    }
    runOutsideAngular(t) {
      return this._outer.run(t);
    }
  },
  nD = {};
function Yl(e) {
  if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable)
    try {
      e._nesting++, e.onMicrotaskEmpty.emit(null);
    } finally {
      if ((e._nesting--, !e.hasPendingMicrotasks))
        try {
          e.runOutsideAngular(() => e.onStable.emit(null));
        } finally {
          e.isStable = !0;
        }
    }
}
function rD(e) {
  if (e.isCheckStableRunning || e.callbackScheduled) return;
  e.callbackScheduled = !0;
  function t() {
    Og(() => {
      (e.callbackScheduled = !1),
        fl(e),
        (e.isCheckStableRunning = !0),
        Yl(e),
        (e.isCheckStableRunning = !1);
    });
  }
  e.scheduleInRootZone
    ? Zone.root.run(() => {
        t();
      })
    : e._outer.run(() => {
        t();
      }),
    fl(e);
}
function oD(e) {
  let t = () => {
      rD(e);
    },
    n = tD++;
  e._inner = e._inner.fork({
    name: "angular",
    properties: { [Zl]: !0, [ea]: n, [ea + n]: !0 },
    onInvokeTask: (r, o, i, s, a, c) => {
      if (iD(c)) return r.invokeTask(i, s, a, c);
      try {
        return _h(e), r.invokeTask(i, s, a, c);
      } finally {
        ((e.shouldCoalesceEventChangeDetection && s.type === "eventTask") ||
          e.shouldCoalesceRunChangeDetection) &&
          t(),
          Dh(e);
      }
    },
    onInvoke: (r, o, i, s, a, c, u) => {
      try {
        return _h(e), r.invoke(i, s, a, c, u);
      } finally {
        e.shouldCoalesceRunChangeDetection &&
          !e.callbackScheduled &&
          !sD(c) &&
          t(),
          Dh(e);
      }
    },
    onHasTask: (r, o, i, s) => {
      r.hasTask(i, s),
        o === i &&
          (s.change == "microTask"
            ? ((e._hasPendingMicrotasks = s.microTask), fl(e), Yl(e))
            : s.change == "macroTask" &&
              (e.hasPendingMacrotasks = s.macroTask));
    },
    onHandleError: (r, o, i, s) => (
      r.handleError(i, s), e.runOutsideAngular(() => e.onError.emit(s)), !1
    ),
  });
}
function fl(e) {
  e._hasPendingMicrotasks ||
  ((e.shouldCoalesceEventChangeDetection ||
    e.shouldCoalesceRunChangeDetection) &&
    e.callbackScheduled === !0)
    ? (e.hasPendingMicrotasks = !0)
    : (e.hasPendingMicrotasks = !1);
}
function _h(e) {
  e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
}
function Dh(e) {
  e._nesting--, Yl(e);
}
var ta = class {
  hasPendingMicrotasks = !1;
  hasPendingMacrotasks = !1;
  isStable = !0;
  onUnstable = new De();
  onMicrotaskEmpty = new De();
  onStable = new De();
  onError = new De();
  run(t, n, r) {
    return t.apply(n, r);
  }
  runGuarded(t, n, r) {
    return t.apply(n, r);
  }
  runOutsideAngular(t) {
    return t();
  }
  runTask(t, n, r, o) {
    return t.apply(n, r);
  }
};
function iD(e) {
  return Pg(e, "__ignore_ng_zone__");
}
function sD(e) {
  return Pg(e, "__scheduler_tick__");
}
function Pg(e, t) {
  return !Array.isArray(e) || e.length !== 1 ? !1 : e[0]?.data?.[t] === !0;
}
var Fg = (() => {
  class e {
    impl = null;
    execute() {
      this.impl?.execute();
    }
    static ɵprov = S({ token: e, providedIn: "root", factory: () => new e() });
  }
  return e;
})();
var aD = new w("", {
  providedIn: "root",
  factory: () => ({ queue: new Set(), isScheduled: !1, scheduler: null }),
});
function kg(e, t) {
  let n = e.get(aD);
  if (Array.isArray(t)) for (let r of t) n.queue.add(r);
  else n.queue.add(t);
  n.scheduler && n.scheduler(e);
}
function cD(e, t) {
  for (let [n, r] of t) kg(e, r.animateFns);
}
function Ch(e, t, n, r) {
  let o = e?.[No]?.enter;
  t !== null && o && o.has(n.index) && cD(r, o);
}
function Rr(e, t, n, r, o, i, s, a) {
  if (o != null) {
    let c,
      u = !1;
    ot(o) ? (c = o) : vt(o) && ((u = !0), (o = o[rt]));
    let l = ke(o);
    e === 0 && r !== null
      ? (Ch(a, r, i, n), s == null ? bg(t, r, l) : Gn(t, r, l, s || null, !0))
      : e === 1 && r !== null
      ? (Ch(a, r, i, n), Gn(t, r, l, s || null, !0))
      : e === 2
      ? Ih(a, i, n, (d) => {
          Mg(t, l, u, d);
        })
      : e === 3 &&
        Ih(a, i, n, () => {
          t.destroyNode(l);
        }),
      c != null && yD(t, e, n, c, i, r, s);
  }
}
function uD(e, t) {
  Lg(e, t), (t[rt] = null), (t[Ue] = null);
}
function lD(e, t, n, r, o, i) {
  (r[rt] = o), (r[Ue] = t), Ea(e, r, n, 1, o, i);
}
function Lg(e, t) {
  t[gt].changeDetectionScheduler?.notify(9), Ea(e, t, t[Z], 2, null, null);
}
function dD(e) {
  let t = e[Sr];
  if (!t) return Yu(e[x], e);
  for (; t; ) {
    let n = null;
    if (vt(t)) n = t[Sr];
    else {
      let r = t[be];
      r && (n = r);
    }
    if (!n) {
      for (; t && !t[Qe] && t !== e; ) vt(t) && Yu(t[x], t), (t = t[de]);
      t === null && (t = e), vt(t) && Yu(t[x], t), (n = t && t[Qe]);
    }
    t = n;
  }
}
function Xl(e, t) {
  let n = e[$n],
    r = n.indexOf(t);
  n.splice(r, 1);
}
function jg(e, t) {
  if (Bn(t)) return;
  let n = t[Z];
  n.destroyNode && Ea(e, t, n, 3, null, null), dD(t);
}
function Yu(e, t) {
  if (Bn(t)) return;
  let n = L(null);
  try {
    (t[O] &= -129),
      (t[O] |= 256),
      t[ze] && ho(t[ze]),
      hD(e, t),
      pD(e, t),
      t[x].type === 1 && t[Z].destroy();
    let r = t[hn];
    if (r !== null && ot(t[de])) {
      r !== t[de] && Xl(r, t);
      let o = t[mt];
      o !== null && o.detachView(e);
    }
    ol(t);
  } finally {
    L(n);
  }
}
function Ih(e, t, n, r) {
  let o = e?.[No];
  if (o == null || o.leave == null || !o.leave.has(t.index)) return r(!1);
  if (o.skipLeaveAnimations) return (o.skipLeaveAnimations = !1), r(!1);
  e && xr.add(e),
    kg(n, () => {
      if (o.leave && o.leave.has(t.index)) {
        let s = o.leave.get(t.index),
          a = [];
        if (s)
          for (let c = 0; c < s.animateFns.length; c++) {
            let u = s.animateFns[c],
              { promise: l } = u();
            a.push(l);
          }
        (o.running = Promise.allSettled(a)), fD(e, r);
      } else e && xr.delete(e), r(!1);
    });
}
function fD(e, t) {
  let n = e[No]?.running;
  if (n) {
    n.then(() => {
      (e[No].running = void 0), xr.delete(e), t(!0);
    });
    return;
  }
  t(!1);
}
function pD(e, t) {
  let n = e.cleanup,
    r = t[Ir];
  if (n !== null)
    for (let s = 0; s < n.length - 1; s += 2)
      if (typeof n[s] == "string") {
        let a = n[s + 3];
        a >= 0 ? r[a]() : r[-a].unsubscribe(), (s += 2);
      } else {
        let a = r[n[s + 1]];
        n[s].call(a);
      }
  r !== null && (t[Ir] = null);
  let o = t[jt];
  if (o !== null) {
    t[jt] = null;
    for (let s = 0; s < o.length; s++) {
      let a = o[s];
      a();
    }
  }
  let i = t[Mo];
  if (i !== null) {
    t[Mo] = null;
    for (let s of i) s.destroy();
  }
}
function hD(e, t) {
  let n;
  if (e != null && (n = e.destroyHooks) != null)
    for (let r = 0; r < n.length; r += 2) {
      let o = t[n[r]];
      if (!(o instanceof Go)) {
        let i = n[r + 1];
        if (Array.isArray(i))
          for (let s = 0; s < i.length; s += 2) {
            let a = o[i[s]],
              c = i[s + 1];
            X(4, a, c);
            try {
              c.call(a);
            } finally {
              X(5, a, c);
            }
          }
        else {
          X(4, o, i);
          try {
            i.call(o);
          } finally {
            X(5, o, i);
          }
        }
      }
    }
}
function gD(e, t, n) {
  return $g(e, t.parent, n);
}
function $g(e, t, n) {
  let r = t;
  for (; r !== null && r.type & 168; ) (t = r), (r = t.parent);
  if (r === null) return n[rt];
  if (mn(r)) {
    let { encapsulation: o } = e.data[r.directiveStart + r.componentOffset];
    if (o === Wt.None || o === Wt.Emulated) return null;
  }
  return it(r, n);
}
function mD(e, t, n) {
  return Bg(e, t, n);
}
function Vg(e, t, n) {
  return e.type & 40 ? it(e, n) : null;
}
var Bg = Vg,
  pl;
function Hg(e, t) {
  (Bg = e), (pl = t);
}
function Ql(e, t, n, r) {
  let o = gD(e, r, t),
    i = t[Z],
    s = r.parent || t[Ue],
    a = mD(s, r, t);
  if (o != null)
    if (Array.isArray(n))
      for (let c = 0; c < n.length; c++) vh(i, o, n[c], a, !1);
    else vh(i, o, n, a, !1);
  pl !== void 0 && pl(i, r, t, n, o);
}
function $o(e, t) {
  if (t !== null) {
    let n = t.type;
    if (n & 3) return it(t, e);
    if (n & 4) return hl(-1, e[t.index]);
    if (n & 8) {
      let r = t.child;
      if (r !== null) return $o(e, r);
      {
        let o = e[t.index];
        return ot(o) ? hl(-1, o) : ke(o);
      }
    } else {
      if (n & 128) return $o(e, t.next);
      if (n & 32) return Wl(t, e)() || ke(e[t.index]);
      {
        let r = Ug(e, t);
        if (r !== null) {
          if (Array.isArray(r)) return r[0];
          let o = un(e[Ge]);
          return $o(o, r);
        } else return $o(e, t.next);
      }
    }
  }
  return null;
}
function Ug(e, t) {
  if (t !== null) {
    let r = e[Ge][Ue],
      o = t.projection;
    return r.projection[o];
  }
  return null;
}
function hl(e, t) {
  let n = be + e + 1;
  if (n < t.length) {
    let r = t[n],
      o = r[x].firstChild;
    if (o !== null) return $o(r, o);
  }
  return t[gn];
}
function Kl(e, t, n, r, o, i, s) {
  for (; n != null; ) {
    let a = r[pn];
    if (n.type === 128) {
      n = n.next;
      continue;
    }
    let c = r[n.index],
      u = n.type;
    if ((s && t === 0 && (c && yn(ke(c), r), (n.flags |= 2)), !Fl(n)))
      if (u & 8) Kl(e, t, n.child, r, o, i, !1), Rr(t, e, a, o, c, n, i, r);
      else if (u & 32) {
        let l = Wl(n, r),
          d;
        for (; (d = l()); ) Rr(t, e, a, o, d, n, i, r);
        Rr(t, e, a, o, c, n, i, r);
      } else u & 16 ? vD(e, t, r, n, o, i) : Rr(t, e, a, o, c, n, i, r);
    n = s ? n.projectionNext : n.next;
  }
}
function Ea(e, t, n, r, o, i) {
  Kl(n, r, e.firstChild, t, o, i, !1);
}
function vD(e, t, n, r, o, i) {
  let s = n[Ge],
    c = s[Ue].projection[r.projection];
  if (Array.isArray(c))
    for (let u = 0; u < c.length; u++) {
      let l = c[u];
      Rr(t, e, n[pn], o, l, r, i, n);
    }
  else {
    let u = c,
      l = s[de];
    ag(r) && (u.flags |= 128), Kl(e, t, u, l, o, i, !0);
  }
}
function yD(e, t, n, r, o, i, s) {
  let a = r[gn],
    c = ke(r);
  a !== c && Rr(t, e, n, i, a, o, s);
  for (let u = be; u < r.length; u++) {
    let l = r[u];
    Ea(l[x], l, e, t, i, a);
  }
}
function ED(e, t, n, r, o) {
  if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
  else {
    let i = r.indexOf("-") === -1 ? void 0 : Ct.DashCase;
    o == null
      ? e.removeStyle(n, r, i)
      : (typeof o == "string" &&
          o.endsWith("!important") &&
          ((o = o.slice(0, -10)), (i |= Ct.Important)),
        e.setStyle(n, r, o, i));
  }
}
function Gg(e, t, n, r, o) {
  let i = Hn(),
    s = r & 2;
  try {
    vn(-1), s && t.length > le && Ag(e, t, le, !1), X(s ? 2 : 0, o, n), n(r, o);
  } finally {
    vn(i), X(s ? 3 : 1, o, n);
  }
}
function _a(e, t, n) {
  TD(e, t, n), (n.flags & 64) === 64 && bD(e, t, n);
}
function Jl(e, t, n = it) {
  let r = t.localNames;
  if (r !== null) {
    let o = t.index + 1;
    for (let i = 0; i < r.length; i += 2) {
      let s = r[i + 1],
        a = s === -1 ? n(t, e) : e[s];
      e[o++] = a;
    }
  }
}
function _D(e, t, n, r) {
  let i = r.get(pg, fg) || n === Wt.ShadowDom,
    s = e.selectRootElement(t, i);
  return DD(s), s;
}
function DD(e) {
  CD(e);
}
var CD = () => null;
function ID(e) {
  return e === "class"
    ? "className"
    : e === "for"
    ? "htmlFor"
    : e === "formaction"
    ? "formAction"
    : e === "innerHtml"
    ? "innerHTML"
    : e === "readonly"
    ? "readOnly"
    : e === "tabindex"
    ? "tabIndex"
    : e;
}
function zg(e, t, n, r, o, i) {
  let s = t[x];
  if (nd(e, s, t, n, r)) {
    mn(e) && wD(t, e.index);
    return;
  }
  e.type & 3 && (n = ID(n)), SD(e, t, n, r, o, i);
}
function SD(e, t, n, r, o, i) {
  if (e.type & 3) {
    let s = it(e, t);
    (r = i != null ? i(r, e.value || "", n) : r), o.setProperty(s, n, r);
  } else e.type & 12;
}
function wD(e, t) {
  let n = Ke(t, e);
  n[O] & 16 || (n[O] |= 64);
}
function TD(e, t, n) {
  let r = n.directiveStart,
    o = n.directiveEnd;
  mn(n) && J_(t, n, e.data[r + n.componentOffset]),
    e.firstCreatePass || eg(n, t);
  let i = n.initialInputs;
  for (let s = r; s < o; s++) {
    let a = e.data[s],
      c = Qs(t, e, s, n);
    if ((yn(c, t), i !== null && RD(t, s - r, c, a, n, i), Vn(a))) {
      let u = Ke(n.index, t);
      u[Ee] = Qs(t, e, s, n);
    }
  }
}
function bD(e, t, n) {
  let r = n.directiveStart,
    o = n.directiveEnd,
    i = n.index,
    s = Jp();
  try {
    vn(i);
    for (let a = r; a < o; a++) {
      let c = e.data[a],
        u = t[a];
      xs(a),
        (c.hostBindings !== null || c.hostVars !== 0 || c.hostAttrs !== null) &&
          MD(c, u);
    }
  } finally {
    vn(-1), xs(s);
  }
}
function MD(e, t) {
  e.hostBindings !== null && e.hostBindings(1, t);
}
function ed(e, t) {
  let n = e.directiveRegistry,
    r = null;
  if (n)
    for (let o = 0; o < n.length; o++) {
      let i = n[o];
      U_(t, i.selectors, !1) && ((r ??= []), Vn(i) ? r.unshift(i) : r.push(i));
    }
  return r;
}
function ND(e, t, n, r, o, i) {
  let s = it(e, t);
  td(t[Z], s, i, e.value, n, r, o);
}
function td(e, t, n, r, o, i, s) {
  if (i == null) e.removeAttribute(t, o, n);
  else {
    let a = s == null ? Dr(i) : s(i, r || "", o);
    e.setAttribute(t, o, a, n);
  }
}
function RD(e, t, n, r, o, i) {
  let s = i[t];
  if (s !== null)
    for (let a = 0; a < s.length; a += 2) {
      let c = s[a],
        u = s[a + 1];
      ul(r, n, c, u);
    }
}
function Wg(e, t, n, r, o) {
  let i = le + n,
    s = t[x],
    a = o(s, t, e, r, n);
  (t[i] = a), Ut(e, !0);
  let c = e.type === 2;
  return (
    c ? (Ng(t[Z], a, e), (Vp() === 0 || wr(e)) && yn(a, t), Bp()) : yn(a, t),
    ko() && (!c || !Fl(e)) && Ql(s, t, a, e),
    e
  );
}
function qg(e) {
  let t = e;
  return Pu() ? Wp() : ((t = t.parent), Ut(t, !1)), t;
}
function AD(e, t) {
  let n = e[pn];
  if (!n) return;
  let r;
  try {
    r = n.get(_e, null);
  } catch {
    r = null;
  }
  r?.(t);
}
function nd(e, t, n, r, o) {
  let i = e.inputs?.[r],
    s = e.hostDirectiveInputs?.[r],
    a = !1;
  if (s)
    for (let c = 0; c < s.length; c += 2) {
      let u = s[c],
        l = s[c + 1],
        d = t.data[u];
      ul(d, n[u], l, o), (a = !0);
    }
  if (i)
    for (let c of i) {
      let u = n[c],
        l = t.data[c];
      ul(l, u, r, o), (a = !0);
    }
  return a;
}
function xD(e, t) {
  let n = Ke(t, e),
    r = n[x];
  OD(r, n);
  let o = n[rt];
  o !== null && n[To] === null && (n[To] = hg(o, n[pn])),
    X(18),
    rd(r, n, n[Ee]),
    X(19, n[Ee]);
}
function OD(e, t) {
  for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n]);
}
function rd(e, t, n) {
  Ps(t);
  try {
    let r = e.viewQuery;
    r !== null && sl(1, r, n);
    let o = e.template;
    o !== null && Gg(e, t, o, 1, n),
      e.firstCreatePass && (e.firstCreatePass = !1),
      t[mt]?.finishViewCreation(e),
      e.staticContentQueries && gg(e, t),
      e.staticViewQueries && sl(2, e.viewQuery, n);
    let i = e.components;
    i !== null && PD(t, i);
  } catch (r) {
    throw (
      (e.firstCreatePass &&
        ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
      r)
    );
  } finally {
    (t[O] &= -5), Fs();
  }
}
function PD(e, t) {
  for (let n = 0; n < t.length; n++) xD(e, t[n]);
}
function FD(e, t, n, r) {
  let o = L(null);
  try {
    let i = t.tView,
      a = e[O] & 4096 ? 4096 : 16,
      c = Gl(
        e,
        i,
        n,
        a,
        null,
        t,
        null,
        null,
        r?.injector ?? null,
        r?.embeddedViewInjector ?? null,
        r?.dehydratedView ?? null
      ),
      u = e[t.index];
    c[hn] = u;
    let l = e[mt];
    return l !== null && (c[mt] = l.createEmbeddedView(i)), rd(i, c, n), c;
  } finally {
    L(o);
  }
}
function Sh(e, t) {
  return !t || t.firstChild === null || ag(e);
}
function zo(e, t, n, r, o = !1) {
  for (; n !== null; ) {
    if (n.type === 128) {
      n = o ? n.projectionNext : n.next;
      continue;
    }
    let i = t[n.index];
    i !== null && r.push(ke(i)), ot(i) && Zg(i, r);
    let s = n.type;
    if (s & 8) zo(e, t, n.child, r);
    else if (s & 32) {
      let a = Wl(n, t),
        c;
      for (; (c = a()); ) r.push(c);
    } else if (s & 16) {
      let a = Ug(t, n);
      if (Array.isArray(a)) r.push(...a);
      else {
        let c = un(t[Ge]);
        zo(c[x], c, a, r, !0);
      }
    }
    n = o ? n.projectionNext : n.next;
  }
  return r;
}
function Zg(e, t) {
  for (let n = be; n < e.length; n++) {
    let r = e[n],
      o = r[x].firstChild;
    o !== null && zo(r[x], r, o, t);
  }
  e[gn] !== e[rt] && t.push(e[gn]);
}
function Yg(e) {
  if (e[bs] !== null) {
    for (let t of e[bs]) t.impl.addSequence(t);
    e[bs].length = 0;
  }
}
var Xg = [];
function kD(e) {
  return e[ze] ?? LD(e);
}
function LD(e) {
  let t = Xg.pop() ?? Object.create($D);
  return (t.lView = e), t;
}
function jD(e) {
  e.lView[ze] !== e && ((e.lView = null), Xg.push(e));
}
var $D = G(C({}, sr), {
  consumerIsAlwaysLive: !0,
  kind: "template",
  consumerMarkedDirty: (e) => {
    Oo(e.lView);
  },
  consumerOnSignalRead() {
    this.lView[ze] = this;
  },
});
function VD(e) {
  let t = e[ze] ?? Object.create(BD);
  return (t.lView = e), t;
}
var BD = G(C({}, sr), {
  consumerIsAlwaysLive: !0,
  kind: "template",
  consumerMarkedDirty: (e) => {
    let t = un(e.lView);
    for (; t && !Qg(t[x]); ) t = un(t);
    t && Nu(t);
  },
  consumerOnSignalRead() {
    this.lView[ze] = this;
  },
});
function Qg(e) {
  return e.type !== 2;
}
function Kg(e) {
  if (e[Mo] === null) return;
  let t = !0;
  for (; t; ) {
    let n = !1;
    for (let r of e[Mo])
      r.dirty &&
        ((n = !0),
        r.zone === null || Zone.current === r.zone
          ? r.run()
          : r.zone.run(() => r.run()));
    t = n && !!(e[O] & 8192);
  }
}
var HD = 100;
function Jg(e, t = 0) {
  let r = e[gt].rendererFactory,
    o = !1;
  o || r.begin?.();
  try {
    UD(e, t);
  } finally {
    o || r.end?.();
  }
}
function UD(e, t) {
  let n = Fu();
  try {
    ku(!0), gl(e, t);
    let r = 0;
    for (; xo(e); ) {
      if (r === HD) throw new I(103, !1);
      r++, gl(e, 1);
    }
  } finally {
    ku(n);
  }
}
function GD(e, t, n, r) {
  if (Bn(t)) return;
  let o = t[O],
    i = !1,
    s = !1;
  Ps(t);
  let a = !0,
    c = null,
    u = null;
  i ||
    (Qg(e)
      ? ((u = kD(t)), (c = cr(u)))
      : Ui() === null
      ? ((a = !1), (u = VD(t)), (c = cr(u)))
      : t[ze] && (ho(t[ze]), (t[ze] = null)));
  try {
    Mu(t), Yp(e.bindingStartIndex), n !== null && Gg(e, t, n, 2, r);
    let l = (o & 3) === 3;
    if (!i)
      if (l) {
        let f = e.preOrderCheckHooks;
        f !== null && Bs(t, f, null);
      } else {
        let f = e.preOrderHooks;
        f !== null && Hs(t, f, 0, null), qu(t, 0);
      }
    if (
      (s || zD(t), Kg(t), em(t, 0), e.contentQueries !== null && gg(e, t), !i)
    )
      if (l) {
        let f = e.contentCheckHooks;
        f !== null && Bs(t, f);
      } else {
        let f = e.contentHooks;
        f !== null && Hs(t, f, 1), qu(t, 1);
      }
    qD(e, t);
    let d = e.components;
    d !== null && nm(t, d, 0);
    let p = e.viewQuery;
    if ((p !== null && sl(2, p, r), !i))
      if (l) {
        let f = e.viewCheckHooks;
        f !== null && Bs(t, f);
      } else {
        let f = e.viewHooks;
        f !== null && Hs(t, f, 2), qu(t, 2);
      }
    if ((e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[Ts])) {
      for (let f of t[Ts]) f();
      t[Ts] = null;
    }
    i || (Yg(t), (t[O] &= -73));
  } catch (l) {
    throw (i || Oo(t), l);
  } finally {
    u !== null && (fo(u, c), a && jD(u)), Fs();
  }
}
function em(e, t) {
  for (let n = ug(e); n !== null; n = lg(n))
    for (let r = be; r < n.length; r++) {
      let o = n[r];
      tm(o, t);
    }
}
function zD(e) {
  for (let t = ug(e); t !== null; t = lg(t)) {
    if (!(t[O] & 2)) continue;
    let n = t[$n];
    for (let r = 0; r < n.length; r++) {
      let o = n[r];
      Nu(o);
    }
  }
}
function WD(e, t, n) {
  X(18);
  let r = Ke(t, e);
  tm(r, n), X(19, r[Ee]);
}
function tm(e, t) {
  Ns(e) && gl(e, t);
}
function gl(e, t) {
  let r = e[x],
    o = e[O],
    i = e[ze],
    s = !!(t === 0 && o & 16);
  if (
    ((s ||= !!(o & 64 && t === 0)),
    (s ||= !!(o & 1024)),
    (s ||= !!(i?.dirty && po(i))),
    (s ||= !1),
    i && (i.dirty = !1),
    (e[O] &= -9217),
    s)
  )
    GD(r, e, r.template, e[Ee]);
  else if (o & 8192) {
    let a = L(null);
    try {
      Kg(e), em(e, 1);
      let c = r.components;
      c !== null && nm(e, c, 1), Yg(e);
    } finally {
      L(a);
    }
  }
}
function nm(e, t, n) {
  for (let r = 0; r < t.length; r++) WD(e, t[r], n);
}
function qD(e, t) {
  let n = e.hostBindingOpCodes;
  if (n !== null)
    try {
      for (let r = 0; r < n.length; r++) {
        let o = n[r];
        if (o < 0) vn(~o);
        else {
          let i = o,
            s = n[++r],
            a = n[++r];
          Kp(s, i);
          let c = t[i];
          X(24, c), a(2, c), X(25, c);
        }
      }
    } finally {
      vn(-1);
    }
}
function od(e, t) {
  let n = Fu() ? 64 : 1088;
  for (e[gt].changeDetectionScheduler?.notify(t); e; ) {
    e[O] |= n;
    let r = un(e);
    if (Tr(e) && !r) return e;
    e = r;
  }
  return null;
}
function rm(e, t, n, r) {
  return [e, !0, 0, t, null, r, null, n, null, null];
}
function ZD(e, t, n, r = !0) {
  let o = t[x];
  if ((YD(o, t, e, n), r)) {
    let s = hl(n, e),
      a = t[Z],
      c = a.parentNode(e[gn]);
    c !== null && lD(o, e[Ue], a, t, c, s);
  }
  let i = t[To];
  i !== null && i.firstChild !== null && (i.firstChild = null);
}
function ml(e, t) {
  if (e.length <= be) return;
  let n = be + t,
    r = e[n];
  if (r) {
    let o = r[hn];
    o !== null && o !== e && Xl(o, r), t > 0 && (e[n - 1][Qe] = r[Qe]);
    let i = Io(e, be + t);
    uD(r[x], r);
    let s = i[mt];
    s !== null && s.detachView(i[x]),
      (r[de] = null),
      (r[Qe] = null),
      (r[O] &= -129);
  }
  return r;
}
function YD(e, t, n, r) {
  let o = be + r,
    i = n.length;
  r > 0 && (n[o - 1][Qe] = t),
    r < i - be
      ? ((t[Qe] = n[o]), mu(n, be + r, t))
      : (n.push(t), (t[Qe] = null)),
    (t[de] = n);
  let s = t[hn];
  s !== null && n !== s && om(s, t);
  let a = t[mt];
  a !== null && a.insertView(e), Rs(t), (t[O] |= 128);
}
function om(e, t) {
  let n = e[$n],
    r = t[de];
  if (vt(r)) e[O] |= 2;
  else {
    let o = r[de][Ge];
    t[Ge] !== o && (e[O] |= 2);
  }
  n === null ? (e[$n] = [t]) : n.push(t);
}
var En = class {
  _lView;
  _cdRefInjectingView;
  _appRef = null;
  _attachedToViewContainer = !1;
  exhaustive;
  get rootNodes() {
    let t = this._lView,
      n = t[x];
    return zo(n, t, n.firstChild, []);
  }
  constructor(t, n) {
    (this._lView = t), (this._cdRefInjectingView = n);
  }
  get context() {
    return this._lView[Ee];
  }
  set context(t) {
    this._lView[Ee] = t;
  }
  get destroyed() {
    return Bn(this._lView);
  }
  destroy() {
    if (this._appRef) this._appRef.detachView(this);
    else if (this._attachedToViewContainer) {
      let t = this._lView[de];
      if (ot(t)) {
        let n = t[Ro],
          r = n ? n.indexOf(this) : -1;
        r > -1 && (ml(t, r), Io(n, r));
      }
      this._attachedToViewContainer = !1;
    }
    jg(this._lView[x], this._lView);
  }
  onDestroy(t) {
    Ru(this._lView, t);
  }
  markForCheck() {
    od(this._cdRefInjectingView || this._lView, 4);
  }
  detach() {
    this._lView[O] &= -129;
  }
  reattach() {
    Rs(this._lView), (this._lView[O] |= 128);
  }
  detectChanges() {
    (this._lView[O] |= 1024), Jg(this._lView);
  }
  checkNoChanges() {}
  attachToViewContainerRef() {
    if (this._appRef) throw new I(902, !1);
    this._attachedToViewContainer = !0;
  }
  detachFromAppRef() {
    this._appRef = null;
    let t = Tr(this._lView),
      n = this._lView[hn];
    n !== null && !t && Xl(n, this._lView), Lg(this._lView[x], this._lView);
  }
  attachToAppRef(t) {
    if (this._attachedToViewContainer) throw new I(902, !1);
    this._appRef = t;
    let n = Tr(this._lView),
      r = this._lView[hn];
    r !== null && !n && om(r, this._lView), Rs(this._lView);
  }
};
var _n = (() => {
  class e {
    _declarationLView;
    _declarationTContainer;
    elementRef;
    static __NG_ELEMENT_ID__ = XD;
    constructor(n, r, o) {
      (this._declarationLView = n),
        (this._declarationTContainer = r),
        (this.elementRef = o);
    }
    get ssrId() {
      return this._declarationTContainer.tView?.ssrId || null;
    }
    createEmbeddedView(n, r) {
      return this.createEmbeddedViewImpl(n, r);
    }
    createEmbeddedViewImpl(n, r, o) {
      let i = FD(this._declarationLView, this._declarationTContainer, n, {
        embeddedViewInjector: r,
        dehydratedView: o,
      });
      return new En(i);
    }
  }
  return e;
})();
function XD() {
  return Da(Ne(), B());
}
function Da(e, t) {
  return e.type & 4 ? new _n(t, e, kr(e, t)) : null;
}
function im(e, t, n) {
  let r = t.insertBeforeIndex,
    o = Array.isArray(r) ? r[0] : r;
  return o === null ? Vg(e, t, n) : ke(n[o]);
}
function sm(e, t, n, r, o) {
  let i = t.insertBeforeIndex;
  if (Array.isArray(i)) {
    let s = r,
      a = null;
    if (
      (t.type & 3 || ((a = s), (s = o)), s !== null && t.componentOffset === -1)
    )
      for (let c = 1; c < i.length; c++) {
        let u = n[i[c]];
        Gn(e, s, u, a, !1);
      }
  }
}
function id(e, t, n, r, o) {
  let i = e.data[t];
  if (i === null) (i = sd(e, t, n, r, o)), Qp() && (i.flags |= 32);
  else if (i.type & 64) {
    (i.type = n), (i.value = r), (i.attrs = o);
    let s = Mr();
    i.injectorIndex = s === null ? -1 : s.injectorIndex;
  }
  return Ut(i, !0), i;
}
function sd(e, t, n, r, o) {
  let i = Ou(),
    s = Pu(),
    a = s ? i : i && i.parent,
    c = (e.data[t] = KD(e, a, n, t, r, o));
  return QD(e, c, i, s), c;
}
function QD(e, t, n, r) {
  e.firstChild === null && (e.firstChild = t),
    n !== null &&
      (r
        ? n.child == null && t.parent !== null && (n.child = t)
        : n.next === null && ((n.next = t), (t.prev = n)));
}
function KD(e, t, n, r, o, i) {
  let s = t ? t.injectorIndex : -1,
    a = 0;
  return (
    Up() && (a |= 128),
    {
      type: n,
      index: r,
      insertBeforeIndex: null,
      injectorIndex: s,
      directiveStart: -1,
      directiveEnd: -1,
      directiveStylingLast: -1,
      componentOffset: -1,
      propertyBindings: null,
      flags: a,
      providerIndexes: 0,
      value: o,
      attrs: i,
      mergedAttrs: null,
      localNames: null,
      initialInputs: null,
      inputs: null,
      hostDirectiveInputs: null,
      outputs: null,
      hostDirectiveOutputs: null,
      directiveToIndex: null,
      tView: null,
      next: null,
      prev: null,
      projectionNext: null,
      child: null,
      parent: t,
      projection: null,
      styles: null,
      stylesWithoutHost: null,
      residualStyles: void 0,
      classes: null,
      classesWithoutHost: null,
      residualClasses: void 0,
      classBindings: 0,
      styleBindings: 0,
    }
  );
}
function am(e, t) {
  if ((e.push(t), e.length > 1))
    for (let n = e.length - 2; n >= 0; n--) {
      let r = e[n];
      cm(r) || (JD(r, t) && eC(r) === null && tC(r, t.index));
    }
}
function cm(e) {
  return !(e.type & 64);
}
function JD(e, t) {
  return cm(t) || e.index > t.index;
}
function eC(e) {
  let t = e.insertBeforeIndex;
  return Array.isArray(t) ? t[0] : t;
}
function tC(e, t) {
  let n = e.insertBeforeIndex;
  Array.isArray(n) ? (n[0] = t) : (Hg(im, sm), (e.insertBeforeIndex = t));
}
function Vo(e, t) {
  let n = e.data[t];
  return n === null || typeof n == "string"
    ? null
    : n.hasOwnProperty("currentCaseLViewIndex")
    ? n
    : n.value;
}
function nC(e, t, n) {
  let r = e.data[t];
  r === null ? (e.data[t] = n) : (r.value = n);
}
function rC(e, t) {
  let n = e.insertBeforeIndex;
  n === null
    ? (Hg(im, sm), (n = e.insertBeforeIndex = [null, t]))
    : (gp(Array.isArray(n), !0, "Expecting array here"), n.push(t));
}
function oC(e, t, n) {
  let r = sd(e, n, 64, null, null);
  return am(t, r), r;
}
function Ca(e, t) {
  let n = t[e.currentCaseLViewIndex];
  return n === null ? n : n < 0 ? ~n : n;
}
function iC(e) {
  return e >>> 17;
}
function sC(e) {
  return (e & 131070) >>> 1;
}
function aC(e, t, n) {
  return e | (t << 17) | (n << 1);
}
function cC(e) {
  return e === -1;
}
function um(e, t, n) {
  e.index = 0;
  let r = Ca(t, n);
  r !== null ? (e.removes = t.remove[r]) : (e.removes = Vt);
}
function vl(e) {
  if (e.index < e.removes.length) {
    let t = e.removes[e.index++];
    if (t > 0) return e.lView[t];
    {
      e.stack.push(e.index, e.removes);
      let n = ~t,
        r = e.lView[x].data[n];
      return um(e, r, e.lView), vl(e);
    }
  } else
    return e.stack.length === 0
      ? ((e.lView = void 0), null)
      : ((e.removes = e.stack.pop()), (e.index = e.stack.pop()), vl(e));
}
function uC() {
  let e = { stack: [], index: -1 };
  function t(n, r) {
    for (e.lView = r; e.stack.length; ) e.stack.pop();
    return um(e, n.value, r), vl.bind(null, e);
  }
  return t;
}
var fP = new RegExp(`^(\\d+)*(${h_}|${p_})*(.*)`);
var lC = () => {};
function dC(e, t, n, r) {
  lC(e, t, n, r);
}
var fC = () => {};
function pC(e, t, n) {
  fC(e, t, n);
}
var hC = () => null;
function wh(e, t) {
  return hC(e, t);
}
var lm = class {},
  Ia = class {},
  yl = class {
    resolveComponentFactory(t) {
      throw new I(917, !1);
    }
  },
  Jo = class {
    static NULL = new yl();
  },
  zn = class {},
  Zn = (() => {
    class e {
      destroyNode = null;
      static __NG_ELEMENT_ID__ = () => gC();
    }
    return e;
  })();
function gC() {
  let e = B(),
    t = Ne(),
    n = Ke(t.index, e);
  return (vt(n) ? n : e)[Z];
}
var dm = (() => {
  class e {
    static ɵprov = S({ token: e, providedIn: "root", factory: () => null });
  }
  return e;
})();
var Gs = {},
  El = class {
    injector;
    parentInjector;
    constructor(t, n) {
      (this.injector = t), (this.parentInjector = n);
    }
    get(t, n, r) {
      let o = this.injector.get(t, Gs, r);
      return o !== Gs || n === Gs ? o : this.parentInjector.get(t, n, r);
    }
  };
function Th(e, t, n) {
  let r = n ? e.styles : null,
    o = n ? e.classes : null,
    i = 0;
  if (t !== null)
    for (let s = 0; s < t.length; s++) {
      let a = t[s];
      if (typeof a == "number") i = a;
      else if (i == 1) o = su(o, a);
      else if (i == 2) {
        let c = a,
          u = t[++s];
        r = su(r, c + ": " + u + ";");
      }
    }
  n ? (e.styles = r) : (e.stylesWithoutHost = r),
    n ? (e.classes = o) : (e.classesWithoutHost = o);
}
function ie(e, t = 0) {
  let n = B();
  if (n === null) return R(e, t);
  let r = Ne();
  return og(r, n, Fe(e), t);
}
function fm(e, t, n, r, o) {
  let i = r === null ? null : { "": -1 },
    s = o(e, n);
  if (s !== null) {
    let a = s,
      c = null,
      u = null;
    for (let l of s)
      if (l.resolveHostDirectives !== null) {
        [a, c, u] = l.resolveHostDirectives(s);
        break;
      }
    yC(e, t, n, a, i, c, u);
  }
  i !== null && r !== null && mC(n, r, i);
}
function mC(e, t, n) {
  let r = (e.localNames = []);
  for (let o = 0; o < t.length; o += 2) {
    let i = n[t[o + 1]];
    if (i == null) throw new I(-301, !1);
    r.push(t[o], i);
  }
}
function vC(e, t, n) {
  (t.componentOffset = n), (e.components ??= []).push(t.index);
}
function yC(e, t, n, r, o, i, s) {
  let a = r.length,
    c = !1;
  for (let p = 0; p < a; p++) {
    let f = r[p];
    !c && Vn(f) && ((c = !0), vC(e, n, p)), e_(eg(n, t), e, f.type);
  }
  SC(n, e.data.length, a);
  for (let p = 0; p < a; p++) {
    let f = r[p];
    f.providersResolver && f.providersResolver(f);
  }
  let u = !1,
    l = !1,
    d = Qo(e, t, a, null);
  a > 0 && (n.directiveToIndex = new Map());
  for (let p = 0; p < a; p++) {
    let f = r[p];
    if (
      ((n.mergedAttrs = Rl(n.mergedAttrs, f.hostAttrs)),
      _C(e, n, t, d, f),
      IC(d, f, o),
      s !== null && s.has(f))
    ) {
      let [E, _] = s.get(f);
      n.directiveToIndex.set(f.type, [
        d,
        E + n.directiveStart,
        _ + n.directiveStart,
      ]);
    } else (i === null || !i.has(f)) && n.directiveToIndex.set(f.type, d);
    f.contentQueries !== null && (n.flags |= 4),
      (f.hostBindings !== null || f.hostAttrs !== null || f.hostVars !== 0) &&
        (n.flags |= 64);
    let v = f.type.prototype;
    !u &&
      (v.ngOnChanges || v.ngOnInit || v.ngDoCheck) &&
      ((e.preOrderHooks ??= []).push(n.index), (u = !0)),
      !l &&
        (v.ngOnChanges || v.ngDoCheck) &&
        ((e.preOrderCheckHooks ??= []).push(n.index), (l = !0)),
      d++;
  }
  EC(e, n, i);
}
function EC(e, t, n) {
  for (let r = t.directiveStart; r < t.directiveEnd; r++) {
    let o = e.data[r];
    if (n === null || !n.has(o)) bh(0, t, o, r), bh(1, t, o, r), Nh(t, r, !1);
    else {
      let i = n.get(o);
      Mh(0, t, i, r), Mh(1, t, i, r), Nh(t, r, !0);
    }
  }
}
function bh(e, t, n, r) {
  let o = e === 0 ? n.inputs : n.outputs;
  for (let i in o)
    if (o.hasOwnProperty(i)) {
      let s;
      e === 0 ? (s = t.inputs ??= {}) : (s = t.outputs ??= {}),
        (s[i] ??= []),
        s[i].push(r),
        pm(t, i);
    }
}
function Mh(e, t, n, r) {
  let o = e === 0 ? n.inputs : n.outputs;
  for (let i in o)
    if (o.hasOwnProperty(i)) {
      let s = o[i],
        a;
      e === 0
        ? (a = t.hostDirectiveInputs ??= {})
        : (a = t.hostDirectiveOutputs ??= {}),
        (a[s] ??= []),
        a[s].push(r, i),
        pm(t, s);
    }
}
function pm(e, t) {
  t === "class" ? (e.flags |= 8) : t === "style" && (e.flags |= 16);
}
function Nh(e, t, n) {
  let { attrs: r, inputs: o, hostDirectiveInputs: i } = e;
  if (r === null || (!n && o === null) || (n && i === null) || Bl(e)) {
    (e.initialInputs ??= []), e.initialInputs.push(null);
    return;
  }
  let s = null,
    a = 0;
  for (; a < r.length; ) {
    let c = r[a];
    if (c === 0) {
      a += 4;
      continue;
    } else if (c === 5) {
      a += 2;
      continue;
    } else if (typeof c == "number") break;
    if (!n && o.hasOwnProperty(c)) {
      let u = o[c];
      for (let l of u)
        if (l === t) {
          (s ??= []), s.push(c, r[a + 1]);
          break;
        }
    } else if (n && i.hasOwnProperty(c)) {
      let u = i[c];
      for (let l = 0; l < u.length; l += 2)
        if (u[l] === t) {
          (s ??= []), s.push(u[l + 1], r[a + 1]);
          break;
        }
    }
    a += 2;
  }
  (e.initialInputs ??= []), e.initialInputs.push(s);
}
function _C(e, t, n, r, o) {
  e.data[r] = o;
  let i = o.factory || (o.factory = cn(o.type, !0)),
    s = new Go(i, Vn(o), ie, null);
  (e.blueprint[r] = s), (n[r] = s), DC(e, t, r, Qo(e, n, o.hostVars, It), o);
}
function DC(e, t, n, r, o) {
  let i = o.hostBindings;
  if (i) {
    let s = e.hostBindingOpCodes;
    s === null && (s = e.hostBindingOpCodes = []);
    let a = ~t.index;
    CC(s) != a && s.push(a), s.push(n, r, i);
  }
}
function CC(e) {
  let t = e.length;
  for (; t > 0; ) {
    let n = e[--t];
    if (typeof n == "number" && n < 0) return n;
  }
  return 0;
}
function IC(e, t, n) {
  if (n) {
    if (t.exportAs)
      for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
    Vn(t) && (n[""] = e);
  }
}
function SC(e, t, n) {
  (e.flags |= 1),
    (e.directiveStart = t),
    (e.directiveEnd = t + n),
    (e.providerIndexes = t);
}
function ad(e, t, n, r, o, i, s, a) {
  let c = t[x],
    u = c.consts,
    l = br(u, s),
    d = id(c, e, n, r, l);
  return (
    i && fm(c, t, d, br(u, a), o),
    (d.mergedAttrs = Rl(d.mergedAttrs, d.attrs)),
    d.attrs !== null && Th(d, d.attrs, !1),
    d.mergedAttrs !== null && Th(d, d.mergedAttrs, !0),
    c.queries !== null && c.queries.elementStart(c, d),
    d
  );
}
function cd(e, t) {
  Zh(e, t), wu(t) && e.queries.elementEnd(t);
}
function ud(e) {
  return gm(e)
    ? Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e)
    : !1;
}
function hm(e, t) {
  if (Array.isArray(e)) for (let n = 0; n < e.length; n++) t(e[n]);
  else {
    let n = e[Symbol.iterator](),
      r;
    for (; !(r = n.next()).done; ) t(r.value);
  }
}
function gm(e) {
  return e !== null && (typeof e == "function" || typeof e == "object");
}
function ld(e, t, n) {
  return (e[t] = n);
}
function wC(e, t) {
  return e[t];
}
function Dn(e, t, n) {
  if (n === It) return !1;
  let r = e[t];
  return Object.is(r, n) ? !1 : ((e[t] = n), !0);
}
function TC(e, t, n, r) {
  let o = Dn(e, t, n);
  return Dn(e, t + 1, r) || o;
}
function Xu(e, t, n) {
  return function r(o) {
    let i = mn(e) ? Ke(e.index, t) : t;
    od(i, 5);
    let s = t[Ee],
      a = Rh(t, s, n, o),
      c = r.__ngNextListenerFn__;
    for (; c; ) (a = Rh(t, s, c, o) && a), (c = c.__ngNextListenerFn__);
    return a;
  };
}
function Rh(e, t, n, r) {
  let o = L(null);
  try {
    return X(6, t, n), n(r) !== !1;
  } catch (i) {
    return AD(e, i), !1;
  } finally {
    X(7, t, n), L(o);
  }
}
function bC(e, t, n, r, o, i, s, a) {
  let c = wr(e),
    u = !1,
    l = null;
  if ((!r && c && (l = NC(t, n, i, e.index)), l !== null)) {
    let d = l.__ngLastListenerFn__ || l;
    (d.__ngNextListenerFn__ = s), (l.__ngLastListenerFn__ = s), (u = !0);
  } else {
    let d = it(e, n),
      p = r ? r(d) : d;
    m_(n, p, i, a);
    let f = o.listen(p, i, a);
    if (!MC(i)) {
      let v = r ? (E) => r(ke(E[e.index])) : e.index;
      mm(v, t, n, i, a, f, !1);
    }
  }
  return u;
}
function MC(e) {
  return e.startsWith("animation") || e.startsWith("transition");
}
function NC(e, t, n, r) {
  let o = e.cleanup;
  if (o != null)
    for (let i = 0; i < o.length - 1; i += 2) {
      let s = o[i];
      if (s === n && o[i + 1] === r) {
        let a = t[Ir],
          c = o[i + 2];
        return a && a.length > c ? a[c] : null;
      }
      typeof s == "string" && (i += 2);
    }
  return null;
}
function mm(e, t, n, r, o, i, s) {
  let a = t.firstCreatePass ? xu(t) : null,
    c = Au(n),
    u = c.length;
  c.push(o, i), a && a.push(r, e, u, (u + 1) * (s ? -1 : 1));
}
function Ah(e, t, n, r, o, i) {
  let s = t[n],
    a = t[x],
    u = a.data[n].outputs[r],
    d = s[u].subscribe(i);
  mm(e.index, a, t, o, i, d, !0);
}
var _l = Symbol("BINDING");
var na = class extends Jo {
  ngModule;
  constructor(t) {
    super(), (this.ngModule = t);
  }
  resolveComponentFactory(t) {
    let n = fn(t);
    return new Or(n, this.ngModule);
  }
};
function RC(e) {
  return Object.keys(e).map((t) => {
    let [n, r, o] = e[t],
      i = {
        propName: n,
        templateName: t,
        isSignal: (r & ya.SignalBased) !== 0,
      };
    return o && (i.transform = o), i;
  });
}
function AC(e) {
  return Object.keys(e).map((t) => ({ propName: e[t], templateName: t }));
}
function xC(e, t, n) {
  let r = t instanceof ue ? t : t?.injector;
  return (
    r &&
      e.getStandaloneInjector !== null &&
      (r = e.getStandaloneInjector(r) || r),
    r ? new El(n, r) : n
  );
}
function OC(e) {
  let t = e.get(zn, null);
  if (t === null) throw new I(407, !1);
  let n = e.get(dm, null),
    r = e.get(ln, null);
  return {
    rendererFactory: t,
    sanitizer: n,
    changeDetectionScheduler: r,
    ngReflect: !1,
  };
}
function PC(e, t) {
  let n = vm(e);
  return Hl(t, n, n === "svg" ? Op : n === "math" ? Pp : null);
}
function vm(e) {
  return (e.selectors[0][0] || "div").toLowerCase();
}
var Or = class extends Ia {
  componentDef;
  ngModule;
  selector;
  componentType;
  ngContentSelectors;
  isBoundToModule;
  cachedInputs = null;
  cachedOutputs = null;
  get inputs() {
    return (
      (this.cachedInputs ??= RC(this.componentDef.inputs)), this.cachedInputs
    );
  }
  get outputs() {
    return (
      (this.cachedOutputs ??= AC(this.componentDef.outputs)), this.cachedOutputs
    );
  }
  constructor(t, n) {
    super(),
      (this.componentDef = t),
      (this.ngModule = n),
      (this.componentType = t.type),
      (this.selector = q_(t.selectors)),
      (this.ngContentSelectors = t.ngContentSelectors ?? []),
      (this.isBoundToModule = !!n);
  }
  create(t, n, r, o, i, s) {
    X(22);
    let a = L(null);
    try {
      let c = this.componentDef,
        u = FC(r, c, s, i),
        l = xC(c, o || this.ngModule, t),
        d = OC(l),
        p = d.rendererFactory.createRenderer(null, c),
        f = r ? _D(p, r, c.encapsulation, l) : PC(c, p),
        v =
          s?.some(xh) ||
          i?.some((y) => typeof y != "function" && y.bindings.some(xh)),
        E = Gl(
          null,
          u,
          null,
          512 | Rg(c),
          null,
          null,
          d,
          p,
          l,
          null,
          hg(f, l, !0)
        );
      (E[le] = f), Ps(E);
      let _ = null;
      try {
        let y = ad(le, E, 2, "#host", () => u.directiveRegistry, !0, 0);
        Ng(p, f, y),
          yn(f, E),
          _a(u, E, y),
          kl(u, y, E),
          cd(u, y),
          n !== void 0 && LC(y, this.ngContentSelectors, n),
          (_ = Ke(y.index, E)),
          (E[Ee] = _[Ee]),
          rd(u, E, null);
      } catch (y) {
        throw (_ !== null && ol(_), ol(E), y);
      } finally {
        X(23), Fs();
      }
      return new ra(this.componentType, E, !!v);
    } finally {
      L(a);
    }
  }
};
function FC(e, t, n, r) {
  let o = e ? ["ng-version", "20.3.10"] : Z_(t.selectors[0]),
    i = null,
    s = null,
    a = 0;
  if (n)
    for (let l of n)
      (a += l[_l].requiredVars),
        l.create && ((l.targetIdx = 0), (i ??= []).push(l)),
        l.update && ((l.targetIdx = 0), (s ??= []).push(l));
  if (r)
    for (let l = 0; l < r.length; l++) {
      let d = r[l];
      if (typeof d != "function")
        for (let p of d.bindings) {
          a += p[_l].requiredVars;
          let f = l + 1;
          p.create && ((p.targetIdx = f), (i ??= []).push(p)),
            p.update && ((p.targetIdx = f), (s ??= []).push(p));
        }
    }
  let c = [t];
  if (r)
    for (let l of r) {
      let d = typeof l == "function" ? l : l.type,
        p = _u(d);
      c.push(p);
    }
  return Ul(0, null, kC(i, s), 1, a, c, null, null, null, [o], null);
}
function kC(e, t) {
  return !e && !t
    ? null
    : (n) => {
        if (n & 1 && e) for (let r of e) r.create();
        if (n & 2 && t) for (let r of t) r.update();
      };
}
function xh(e) {
  let t = e[_l].kind;
  return t === "input" || t === "twoWay";
}
var ra = class extends lm {
  _rootLView;
  _hasInputBindings;
  instance;
  hostView;
  changeDetectorRef;
  componentType;
  location;
  previousInputValues = null;
  _tNode;
  constructor(t, n, r) {
    super(),
      (this._rootLView = n),
      (this._hasInputBindings = r),
      (this._tNode = Ms(n[x], le)),
      (this.location = kr(this._tNode, n)),
      (this.instance = Ke(this._tNode.index, n)[Ee]),
      (this.hostView = this.changeDetectorRef = new En(n, void 0)),
      (this.componentType = t);
  }
  setInput(t, n) {
    this._hasInputBindings;
    let r = this._tNode;
    if (
      ((this.previousInputValues ??= new Map()),
      this.previousInputValues.has(t) &&
        Object.is(this.previousInputValues.get(t), n))
    )
      return;
    let o = this._rootLView,
      i = nd(r, o[x], o, t, n);
    this.previousInputValues.set(t, n);
    let s = Ke(r.index, o);
    od(s, 1);
  }
  get injector() {
    return new Un(this._tNode, this._rootLView);
  }
  destroy() {
    this.hostView.destroy();
  }
  onDestroy(t) {
    this.hostView.onDestroy(t);
  }
};
function LC(e, t, n) {
  let r = (e.projection = []);
  for (let o = 0; o < t.length; o++) {
    let i = n[o];
    r.push(i != null && i.length ? Array.from(i) : null);
  }
}
var Zt = (() => {
  class e {
    static __NG_ELEMENT_ID__ = jC;
  }
  return e;
})();
function jC() {
  let e = Ne();
  return Em(e, B());
}
var $C = Zt,
  ym = class extends $C {
    _lContainer;
    _hostTNode;
    _hostLView;
    constructor(t, n, r) {
      super(),
        (this._lContainer = t),
        (this._hostTNode = n),
        (this._hostLView = r);
    }
    get element() {
      return kr(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new Un(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      let t = Al(this._hostTNode, this._hostLView);
      if (Qh(t)) {
        let n = Ys(t, this._hostLView),
          r = Zs(t),
          o = n[x].data[r + 8];
        return new Un(o, n);
      } else return new Un(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(t) {
      let n = Oh(this._lContainer);
      return (n !== null && n[t]) || null;
    }
    get length() {
      return this._lContainer.length - be;
    }
    createEmbeddedView(t, n, r) {
      let o, i;
      typeof r == "number"
        ? (o = r)
        : r != null && ((o = r.index), (i = r.injector));
      let s = wh(this._lContainer, t.ssrId),
        a = t.createEmbeddedViewImpl(n || {}, i, s);
      return this.insertImpl(a, o, Sh(this._hostTNode, s)), a;
    }
    createComponent(t, n, r, o, i, s, a) {
      let c = t && !VE(t),
        u;
      if (c) u = n;
      else {
        let _ = n || {};
        (u = _.index),
          (r = _.injector),
          (o = _.projectableNodes),
          (i = _.environmentInjector || _.ngModuleRef),
          (s = _.directives),
          (a = _.bindings);
      }
      let l = c ? t : new Or(fn(t)),
        d = r || this.parentInjector;
      if (!i && l.ngModule == null) {
        let y = (c ? d : this.parentInjector).get(ue, null);
        y && (i = y);
      }
      let p = fn(l.componentType ?? {}),
        f = wh(this._lContainer, p?.id ?? null),
        v = f?.firstChild ?? null,
        E = l.create(d, o, v, i, s, a);
      return this.insertImpl(E.hostView, u, Sh(this._hostTNode, f)), E;
    }
    insert(t, n) {
      return this.insertImpl(t, n, !0);
    }
    insertImpl(t, n, r) {
      let o = t._lView;
      if (kp(o)) {
        let a = this.indexOf(t);
        if (a !== -1) this.detach(a);
        else {
          let c = o[de],
            u = new ym(c, c[Ue], c[de]);
          u.detach(u.indexOf(t));
        }
      }
      let i = this._adjustIndex(n),
        s = this._lContainer;
      return ZD(s, o, i, r), t.attachToViewContainerRef(), mu(Qu(s), i, t), t;
    }
    move(t, n) {
      return this.insert(t, n);
    }
    indexOf(t) {
      let n = Oh(this._lContainer);
      return n !== null ? n.indexOf(t) : -1;
    }
    remove(t) {
      let n = this._adjustIndex(t, -1),
        r = ml(this._lContainer, n);
      r && (Io(Qu(this._lContainer), n), jg(r[x], r));
    }
    detach(t) {
      let n = this._adjustIndex(t, -1),
        r = ml(this._lContainer, n);
      return r && Io(Qu(this._lContainer), n) != null ? new En(r) : null;
    }
    _adjustIndex(t, n = 0) {
      return t ?? this.length + n;
    }
  };
function Oh(e) {
  return e[Ro];
}
function Qu(e) {
  return e[Ro] || (e[Ro] = []);
}
function Em(e, t) {
  let n,
    r = t[e.index];
  return (
    ot(r) ? (n = r) : ((n = rm(r, t, null, e)), (t[e.index] = n), zl(t, n)),
    BC(n, t, e, r),
    new ym(n, e, t)
  );
}
function VC(e, t) {
  let n = e[Z],
    r = n.createComment(""),
    o = it(t, e),
    i = n.parentNode(o);
  return Gn(n, i, r, n.nextSibling(o), !1), r;
}
var BC = GC,
  HC = () => !1;
function UC(e, t, n) {
  return HC(e, t, n);
}
function GC(e, t, n, r) {
  if (e[gn]) return;
  let o;
  n.type & 8 ? (o = ke(r)) : (o = VC(t, n)), (e[gn] = o);
}
var Dl = class e {
    queryList;
    matches = null;
    constructor(t) {
      this.queryList = t;
    }
    clone() {
      return new e(this.queryList);
    }
    setDirty() {
      this.queryList.setDirty();
    }
  },
  Cl = class e {
    queries;
    constructor(t = []) {
      this.queries = t;
    }
    createEmbeddedView(t) {
      let n = t.queries;
      if (n !== null) {
        let r = t.contentQueries !== null ? t.contentQueries[0] : n.length,
          o = [];
        for (let i = 0; i < r; i++) {
          let s = n.getByIndex(i),
            a = this.queries[s.indexInDeclarationView];
          o.push(a.clone());
        }
        return new e(o);
      }
      return null;
    }
    insertView(t) {
      this.dirtyQueriesWithMatches(t);
    }
    detachView(t) {
      this.dirtyQueriesWithMatches(t);
    }
    finishViewCreation(t) {
      this.dirtyQueriesWithMatches(t);
    }
    dirtyQueriesWithMatches(t) {
      for (let n = 0; n < this.queries.length; n++)
        dd(t, n).matches !== null && this.queries[n].setDirty();
    }
  },
  Il = class {
    flags;
    read;
    predicate;
    constructor(t, n, r = null) {
      (this.flags = n),
        (this.read = r),
        typeof t == "string" ? (this.predicate = KC(t)) : (this.predicate = t);
    }
  },
  Sl = class e {
    queries;
    constructor(t = []) {
      this.queries = t;
    }
    elementStart(t, n) {
      for (let r = 0; r < this.queries.length; r++)
        this.queries[r].elementStart(t, n);
    }
    elementEnd(t) {
      for (let n = 0; n < this.queries.length; n++)
        this.queries[n].elementEnd(t);
    }
    embeddedTView(t) {
      let n = null;
      for (let r = 0; r < this.length; r++) {
        let o = n !== null ? n.length : 0,
          i = this.getByIndex(r).embeddedTView(t, o);
        i &&
          ((i.indexInDeclarationView = r), n !== null ? n.push(i) : (n = [i]));
      }
      return n !== null ? new e(n) : null;
    }
    template(t, n) {
      for (let r = 0; r < this.queries.length; r++)
        this.queries[r].template(t, n);
    }
    getByIndex(t) {
      return this.queries[t];
    }
    get length() {
      return this.queries.length;
    }
    track(t) {
      this.queries.push(t);
    }
  },
  wl = class e {
    metadata;
    matches = null;
    indexInDeclarationView = -1;
    crossesNgTemplate = !1;
    _declarationNodeIndex;
    _appliesToNextNode = !0;
    constructor(t, n = -1) {
      (this.metadata = t), (this._declarationNodeIndex = n);
    }
    elementStart(t, n) {
      this.isApplyingToNode(n) && this.matchTNode(t, n);
    }
    elementEnd(t) {
      this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1);
    }
    template(t, n) {
      this.elementStart(t, n);
    }
    embeddedTView(t, n) {
      return this.isApplyingToNode(t)
        ? ((this.crossesNgTemplate = !0),
          this.addMatch(-t.index, n),
          new e(this.metadata))
        : null;
    }
    isApplyingToNode(t) {
      if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
        let n = this._declarationNodeIndex,
          r = t.parent;
        for (; r !== null && r.type & 8 && r.index !== n; ) r = r.parent;
        return n === (r !== null ? r.index : -1);
      }
      return this._appliesToNextNode;
    }
    matchTNode(t, n) {
      let r = this.metadata.predicate;
      if (Array.isArray(r))
        for (let o = 0; o < r.length; o++) {
          let i = r[o];
          this.matchTNodeWithReadOption(t, n, zC(n, i)),
            this.matchTNodeWithReadOption(t, n, Us(n, t, i, !1, !1));
        }
      else
        r === _n
          ? n.type & 4 && this.matchTNodeWithReadOption(t, n, -1)
          : this.matchTNodeWithReadOption(t, n, Us(n, t, r, !1, !1));
    }
    matchTNodeWithReadOption(t, n, r) {
      if (r !== null) {
        let o = this.metadata.read;
        if (o !== null)
          if (o === at || o === Zt || (o === _n && n.type & 4))
            this.addMatch(n.index, -2);
          else {
            let i = Us(n, t, o, !1, !1);
            i !== null && this.addMatch(n.index, i);
          }
        else this.addMatch(n.index, r);
      }
    }
    addMatch(t, n) {
      this.matches === null ? (this.matches = [t, n]) : this.matches.push(t, n);
    }
  };
function zC(e, t) {
  let n = e.localNames;
  if (n !== null) {
    for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
  }
  return null;
}
function WC(e, t) {
  return e.type & 11 ? kr(e, t) : e.type & 4 ? Da(e, t) : null;
}
function qC(e, t, n, r) {
  return n === -1 ? WC(t, e) : n === -2 ? ZC(e, t, r) : Qs(e, e[x], n, t);
}
function ZC(e, t, n) {
  if (n === at) return kr(t, e);
  if (n === _n) return Da(t, e);
  if (n === Zt) return Em(t, e);
}
function _m(e, t, n, r) {
  let o = t[mt].queries[r];
  if (o.matches === null) {
    let i = e.data,
      s = n.matches,
      a = [];
    for (let c = 0; s !== null && c < s.length; c += 2) {
      let u = s[c];
      if (u < 0) a.push(null);
      else {
        let l = i[u];
        a.push(qC(t, l, s[c + 1], n.metadata.read));
      }
    }
    o.matches = a;
  }
  return o.matches;
}
function Tl(e, t, n, r) {
  let o = e.queries.getByIndex(n),
    i = o.matches;
  if (i !== null) {
    let s = _m(e, t, o, n);
    for (let a = 0; a < i.length; a += 2) {
      let c = i[a];
      if (c > 0) r.push(s[a / 2]);
      else {
        let u = i[a + 1],
          l = t[-c];
        for (let d = be; d < l.length; d++) {
          let p = l[d];
          p[hn] === p[de] && Tl(p[x], p, u, r);
        }
        if (l[$n] !== null) {
          let d = l[$n];
          for (let p = 0; p < d.length; p++) {
            let f = d[p];
            Tl(f[x], f, u, r);
          }
        }
      }
    }
  }
  return r;
}
function YC(e, t) {
  return e[mt].queries[t].queryList;
}
function XC(e, t, n) {
  let r = new Ks((n & 4) === 4);
  return (
    $p(e, t, r, r.destroy), (t[mt] ??= new Cl()).queries.push(new Dl(r)) - 1
  );
}
function QC(e, t, n, r) {
  let o = Me();
  if (o.firstCreatePass) {
    let i = Ne();
    JC(o, new Il(t, n, r), i.index),
      eI(o, e),
      (n & 2) === 2 && (o.staticContentQueries = !0);
  }
  return XC(o, B(), n);
}
function KC(e) {
  return e.split(",").map((t) => t.trim());
}
function JC(e, t, n) {
  e.queries === null && (e.queries = new Sl()), e.queries.track(new wl(t, n));
}
function eI(e, t) {
  let n = e.contentQueries || (e.contentQueries = []),
    r = n.length ? n[n.length - 1] : -1;
  t !== r && n.push(e.queries.length - 1, t);
}
function dd(e, t) {
  return e.queries.getByIndex(t);
}
function tI(e, t) {
  let n = e[x],
    r = dd(n, t);
  return r.crossesNgTemplate ? Tl(n, e, t, []) : _m(n, e, r, t);
}
var Wn = class {},
  Sa = class {};
var oa = class extends Wn {
    ngModuleType;
    _parent;
    _bootstrapComponents = [];
    _r3Injector;
    instance;
    destroyCbs = [];
    componentFactoryResolver = new na(this);
    constructor(t, n, r, o = !0) {
      super(), (this.ngModuleType = t), (this._parent = n);
      let i = Eu(t);
      (this._bootstrapComponents = Cg(i.bootstrap)),
        (this._r3Injector = Hu(
          t,
          n,
          [
            { provide: Wn, useValue: this },
            { provide: Jo, useValue: this.componentFactoryResolver },
            ...r,
          ],
          $t(t),
          new Set(["environment"])
        )),
        o && this.resolveInjectorInitializers();
    }
    resolveInjectorInitializers() {
      this._r3Injector.resolveInjectorInitializers(),
        (this.instance = this._r3Injector.get(this.ngModuleType));
    }
    get injector() {
      return this._r3Injector;
    }
    destroy() {
      let t = this._r3Injector;
      !t.destroyed && t.destroy(),
        this.destroyCbs.forEach((n) => n()),
        (this.destroyCbs = null);
    }
    onDestroy(t) {
      this.destroyCbs.push(t);
    }
  },
  ia = class extends Sa {
    moduleType;
    constructor(t) {
      super(), (this.moduleType = t);
    }
    create(t) {
      return new oa(this.moduleType, t, []);
    }
  };
var Wo = class extends Wn {
  injector;
  componentFactoryResolver = new na(this);
  instance = null;
  constructor(t) {
    super();
    let n = new Pn(
      [
        ...t.providers,
        { provide: Wn, useValue: this },
        { provide: Jo, useValue: this.componentFactoryResolver },
      ],
      t.parent || wo(),
      t.debugName,
      new Set(["environment"])
    );
    (this.injector = n),
      t.runEnvironmentInitializers && n.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(t) {
    this.injector.onDestroy(t);
  }
};
function ei(e, t, n = null) {
  return new Wo({
    providers: e,
    parent: t,
    debugName: n,
    runEnvironmentInitializers: !0,
  }).injector;
}
var nI = (() => {
  class e {
    _injector;
    cachedInjectors = new Map();
    constructor(n) {
      this._injector = n;
    }
    getOrCreateStandaloneInjector(n) {
      if (!n.standalone) return null;
      if (!this.cachedInjectors.has(n)) {
        let r = Du(!1, n.type),
          o =
            r.length > 0
              ? ei([r], this._injector, `Standalone[${n.type.name}]`)
              : null;
        this.cachedInjectors.set(n, o);
      }
      return this.cachedInjectors.get(n);
    }
    ngOnDestroy() {
      try {
        for (let n of this.cachedInjectors.values()) n !== null && n.destroy();
      } finally {
        this.cachedInjectors.clear();
      }
    }
    static ɵprov = S({
      token: e,
      providedIn: "environment",
      factory: () => new e(R(ue)),
    });
  }
  return e;
})();
function We(e) {
  return ua(() => {
    let t = Dm(e),
      n = G(C({}, t), {
        decls: e.decls,
        vars: e.vars,
        template: e.template,
        consts: e.consts || null,
        ngContentSelectors: e.ngContentSelectors,
        onPush: e.changeDetection === xl.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (t.standalone && e.dependencies) || null,
        getStandaloneInjector: t.standalone
          ? (o) => o.get(nI).getOrCreateStandaloneInjector(n)
          : null,
        getExternalStyles: null,
        signals: e.signals ?? !1,
        data: e.data || {},
        encapsulation: e.encapsulation || Wt.Emulated,
        styles: e.styles || Vt,
        _: null,
        schemas: e.schemas || null,
        tView: null,
        id: "",
      });
    t.standalone && $r("NgStandalone"), Cm(n);
    let r = e.dependencies;
    return (
      (n.directiveDefs = Ph(r, rI)), (n.pipeDefs = Ph(r, wp)), (n.id = sI(n)), n
    );
  });
}
function rI(e) {
  return fn(e) || _u(e);
}
function oI(e, t) {
  if (e == null) return kn;
  let n = {};
  for (let r in e)
    if (e.hasOwnProperty(r)) {
      let o = e[r],
        i,
        s,
        a,
        c;
      Array.isArray(o)
        ? ((a = o[0]), (i = o[1]), (s = o[2] ?? i), (c = o[3] || null))
        : ((i = o), (s = o), (a = ya.None), (c = null)),
        (n[i] = [r, a, c]),
        (t[i] = s);
    }
  return n;
}
function iI(e) {
  if (e == null) return kn;
  let t = {};
  for (let n in e) e.hasOwnProperty(n) && (t[e[n]] = n);
  return t;
}
function ct(e) {
  return ua(() => {
    let t = Dm(e);
    return Cm(t), t;
  });
}
function fd(e) {
  return {
    type: e.type,
    name: e.name,
    factory: null,
    pure: e.pure !== !1,
    standalone: e.standalone ?? !0,
    onDestroy: e.type.prototype.ngOnDestroy || null,
  };
}
function Dm(e) {
  let t = {};
  return {
    type: e.type,
    providersResolver: null,
    factory: null,
    hostBindings: e.hostBindings || null,
    hostVars: e.hostVars || 0,
    hostAttrs: e.hostAttrs || null,
    contentQueries: e.contentQueries || null,
    declaredInputs: t,
    inputConfig: e.inputs || kn,
    exportAs: e.exportAs || null,
    standalone: e.standalone ?? !0,
    signals: e.signals === !0,
    selectors: e.selectors || Vt,
    viewQuery: e.viewQuery || null,
    features: e.features || null,
    setInput: null,
    resolveHostDirectives: null,
    hostDirectives: null,
    inputs: oI(e.inputs, t),
    outputs: iI(e.outputs),
    debugInfo: null,
  };
}
function Cm(e) {
  e.features?.forEach((t) => t(e));
}
function Ph(e, t) {
  return e
    ? () => {
        let n = typeof e == "function" ? e() : e,
          r = [];
        for (let o of n) {
          let i = t(o);
          i !== null && r.push(i);
        }
        return r;
      }
    : null;
}
function sI(e) {
  let t = 0,
    n = typeof e.consts == "function" ? "" : e.consts,
    r = [
      e.selectors,
      e.ngContentSelectors,
      e.hostVars,
      e.hostAttrs,
      n,
      e.vars,
      e.decls,
      e.encapsulation,
      e.standalone,
      e.signals,
      e.exportAs,
      JSON.stringify(e.inputs),
      JSON.stringify(e.outputs),
      Object.getOwnPropertyNames(e.type.prototype),
      !!e.contentQueries,
      !!e.viewQuery,
    ];
  for (let i of r.join("|")) t = (Math.imul(31, t) + i.charCodeAt(0)) << 0;
  return (t += 2147483648), "c" + t;
}
function aI(e, t, n, r, o, i, s, a) {
  if (n.firstCreatePass) {
    e.mergedAttrs = Rl(e.mergedAttrs, e.attrs);
    let l = (e.tView = Ul(
      2,
      e,
      o,
      i,
      s,
      n.directiveRegistry,
      n.pipeRegistry,
      null,
      n.schemas,
      n.consts,
      null
    ));
    n.queries !== null &&
      (n.queries.template(n, e), (l.queries = n.queries.embeddedTView(e)));
  }
  a && (e.flags |= a), Ut(e, !1);
  let c = uI(n, t, e, r);
  ko() && Ql(n, t, c, e), yn(c, t);
  let u = rm(c, t, c, e);
  (t[r + le] = u), zl(t, u), UC(u, e, t);
}
function cI(e, t, n, r, o, i, s, a, c, u, l) {
  let d = n + le,
    p;
  return (
    t.firstCreatePass
      ? ((p = id(t, d, 4, s || null, a || null)),
        As() && fm(t, e, p, br(t.consts, u), ed),
        Zh(t, p))
      : (p = t.data[d]),
    aI(p, e, t, n, r, o, i, c),
    wr(p) && _a(t, e, p),
    u != null && Jl(e, p, l),
    p
  );
}
function k(e, t, n, r, o, i, s, a) {
  let c = B(),
    u = Me(),
    l = br(u.consts, i);
  return cI(c, u, e, t, n, r, o, l, void 0, s, a), k;
}
var uI = lI;
function lI(e, t, n, r) {
  return Nr(!0), t[Z].createComment("");
}
var pd = (() => {
  class e {
    log(n) {
      console.log(n);
    }
    warn(n) {
      console.warn(n);
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = S({ token: e, factory: e.ɵfac, providedIn: "platform" });
  }
  return e;
})();
var hd = new w("");
function Yn(e) {
  return !!e && typeof e.then == "function";
}
function wa(e) {
  return !!e && typeof e.subscribe == "function";
}
var Im = new w("");
var gd = (() => {
    class e {
      resolve;
      reject;
      initialized = !1;
      done = !1;
      donePromise = new Promise((n, r) => {
        (this.resolve = n), (this.reject = r);
      });
      appInits = g(Im, { optional: !0 }) ?? [];
      injector = g(Xe);
      constructor() {}
      runInitializers() {
        if (this.initialized) return;
        let n = [];
        for (let o of this.appInits) {
          let i = he(this.injector, o);
          if (Yn(i)) n.push(i);
          else if (wa(i)) {
            let s = new Promise((a, c) => {
              i.subscribe({ complete: a, error: c });
            });
            n.push(s);
          }
        }
        let r = () => {
          (this.done = !0), this.resolve();
        };
        Promise.all(n)
          .then(() => {
            r();
          })
          .catch((o) => {
            this.reject(o);
          }),
          n.length === 0 && r(),
          (this.initialized = !0);
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = S({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  Ta = new w("");
function Sm() {
  Ac(() => {
    let e = "";
    throw new I(600, e);
  });
}
function wm(e) {
  return e.isBoundToModule;
}
var dI = 10;
var Xn = (() => {
  class e {
    _runningTick = !1;
    _destroyed = !1;
    _destroyListeners = [];
    _views = [];
    internalErrorHandler = g(_e);
    afterRenderManager = g(Fg);
    zonelessEnabled = g(Lo);
    rootEffectScheduler = g(Wu);
    dirtyFlags = 0;
    tracingSnapshot = null;
    allTestViews = new Set();
    autoDetectTestViews = new Set();
    includeAllTestViews = !1;
    afterTick = new K();
    get allViews() {
      return [
        ...(this.includeAllTestViews
          ? this.allTestViews
          : this.autoDetectTestViews
        ).keys(),
        ...this._views,
      ];
    }
    get destroyed() {
      return this._destroyed;
    }
    componentTypes = [];
    components = [];
    internalPendingTask = g(_t);
    get isStable() {
      return this.internalPendingTask.hasPendingTasksObservable.pipe(
        A((n) => !n)
      );
    }
    constructor() {
      g(Ko, { optional: !0 });
    }
    whenStable() {
      let n;
      return new Promise((r) => {
        n = this.isStable.subscribe({
          next: (o) => {
            o && r();
          },
        });
      }).finally(() => {
        n.unsubscribe();
      });
    }
    _injector = g(ue);
    _rendererFactory = null;
    get injector() {
      return this._injector;
    }
    bootstrap(n, r) {
      return this.bootstrapImpl(n, r);
    }
    bootstrapImpl(n, r, o = Xe.NULL) {
      return this._injector.get(oe).run(() => {
        X(10);
        let s = n instanceof Ia;
        if (!this._injector.get(gd).done) {
          let v = "";
          throw new I(405, v);
        }
        let c;
        s ? (c = n) : (c = this._injector.get(Jo).resolveComponentFactory(n)),
          this.componentTypes.push(c.componentType);
        let u = wm(c) ? void 0 : this._injector.get(Wn),
          l = r || c.selector,
          d = c.create(o, [], l, u),
          p = d.location.nativeElement,
          f = d.injector.get(hd, null);
        return (
          f?.registerApplication(p),
          d.onDestroy(() => {
            this.detachView(d.hostView),
              Bo(this.components, d),
              f?.unregisterApplication(p);
          }),
          this._loadComponent(d),
          X(11, d),
          d
        );
      });
    }
    tick() {
      this.zonelessEnabled || (this.dirtyFlags |= 1), this._tick();
    }
    _tick() {
      X(12),
        this.tracingSnapshot !== null
          ? this.tracingSnapshot.run(ql.CHANGE_DETECTION, this.tickImpl)
          : this.tickImpl();
    }
    tickImpl = () => {
      if (this._runningTick) throw new I(101, !1);
      let n = L(null);
      try {
        (this._runningTick = !0), this.synchronize();
      } finally {
        (this._runningTick = !1),
          this.tracingSnapshot?.dispose(),
          (this.tracingSnapshot = null),
          L(n),
          this.afterTick.next(),
          X(13);
      }
    };
    synchronize() {
      this._rendererFactory === null &&
        !this._injector.destroyed &&
        (this._rendererFactory = this._injector.get(zn, null, {
          optional: !0,
        }));
      let n = 0;
      for (; this.dirtyFlags !== 0 && n++ < dI; )
        X(14), this.synchronizeOnce(), X(15);
    }
    synchronizeOnce() {
      this.dirtyFlags & 16 &&
        ((this.dirtyFlags &= -17), this.rootEffectScheduler.flush());
      let n = !1;
      if (this.dirtyFlags & 7) {
        let r = !!(this.dirtyFlags & 1);
        (this.dirtyFlags &= -8), (this.dirtyFlags |= 8);
        for (let { _lView: o } of this.allViews) {
          if (!r && !xo(o)) continue;
          let i = r && !this.zonelessEnabled ? 0 : 1;
          Jg(o, i), (n = !0);
        }
        if (
          ((this.dirtyFlags &= -5),
          this.syncDirtyFlagsWithViews(),
          this.dirtyFlags & 23)
        )
          return;
      }
      n || (this._rendererFactory?.begin?.(), this._rendererFactory?.end?.()),
        this.dirtyFlags & 8 &&
          ((this.dirtyFlags &= -9), this.afterRenderManager.execute()),
        this.syncDirtyFlagsWithViews();
    }
    syncDirtyFlagsWithViews() {
      if (this.allViews.some(({ _lView: n }) => xo(n))) {
        this.dirtyFlags |= 2;
        return;
      } else this.dirtyFlags &= -8;
    }
    attachView(n) {
      let r = n;
      this._views.push(r), r.attachToAppRef(this);
    }
    detachView(n) {
      let r = n;
      Bo(this._views, r), r.detachFromAppRef();
    }
    _loadComponent(n) {
      this.attachView(n.hostView);
      try {
        this.tick();
      } catch (o) {
        this.internalErrorHandler(o);
      }
      this.components.push(n), this._injector.get(Ta, []).forEach((o) => o(n));
    }
    ngOnDestroy() {
      if (!this._destroyed)
        try {
          this._destroyListeners.forEach((n) => n()),
            this._views.slice().forEach((n) => n.destroy());
        } finally {
          (this._destroyed = !0),
            (this._views = []),
            (this._destroyListeners = []);
        }
    }
    onDestroy(n) {
      return (
        this._destroyListeners.push(n), () => Bo(this._destroyListeners, n)
      );
    }
    destroy() {
      if (this._destroyed) throw new I(406, !1);
      let n = this._injector;
      n.destroy && !n.destroyed && n.destroy();
    }
    get viewCount() {
      return this._views.length;
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = S({ token: e, factory: e.ɵfac, providedIn: "root" });
  }
  return e;
})();
function Bo(e, t) {
  let n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
function St(e, t, n, r) {
  let o = B(),
    i = Fo();
  if (Dn(o, i, t)) {
    let s = Me(),
      a = Bu();
    ND(a, o, e, t, n, r);
  }
  return St;
}
var EP =
  typeof document < "u" &&
  typeof document?.documentElement?.getAnimations == "function";
function T(e, t, n) {
  let r = B(),
    o = Fo();
  if (Dn(r, o, t)) {
    let i = Me(),
      s = Bu();
    zg(s, r, e, t, r[Z], n);
  }
  return T;
}
function Fh(e, t, n, r, o) {
  nd(t, e, n, o ? "class" : "style", r);
}
function m(e, t, n, r) {
  let o = B(),
    i = o[x],
    s = e + le,
    a = i.firstCreatePass ? ad(s, o, 2, t, ed, As(), n, r) : i.data[s];
  if ((Wg(a, o, e, t, fI), wr(a))) {
    let c = o[x];
    _a(c, o, a), kl(c, a, o);
  }
  return r != null && Jl(o, a), m;
}
function h() {
  let e = Me(),
    t = Ne(),
    n = qg(t);
  return (
    e.firstCreatePass && cd(e, n),
    Gp(n) && zp(),
    Hp(),
    n.classesWithoutHost != null &&
      WE(n) &&
      Fh(e, n, B(), n.classesWithoutHost, !0),
    n.stylesWithoutHost != null &&
      qE(n) &&
      Fh(e, n, B(), n.stylesWithoutHost, !1),
    h
  );
}
function ut(e, t, n, r) {
  return m(e, t, n, r), h(), ut;
}
var fI = (e, t, n, r, o) => (Nr(!0), Hl(t[Z], r, ih()));
function je(e, t, n) {
  let r = B(),
    o = r[x],
    i = e + le,
    s = o.firstCreatePass
      ? ad(i, r, 8, "ng-container", ed, As(), t, n)
      : o.data[i];
  if ((Wg(s, r, e, "ng-container", pI), wr(s))) {
    let a = r[x];
    _a(a, r, s), kl(a, s, r);
  }
  return n != null && Jl(r, s), je;
}
function $e() {
  let e = Me(),
    t = Ne(),
    n = qg(t);
  return e.firstCreatePass && cd(e, n), $e;
}
var pI = (e, t, n, r, o) => (Nr(!0), Tg(t[Z], ""));
function Vr() {
  return B();
}
var $s = void 0;
function hI(e) {
  let t = Math.floor(Math.abs(e)),
    n = e.toString().replace(/^[^.]*\.?/, "").length;
  return t === 1 && n === 0 ? 1 : 5;
}
var gI = [
    "en",
    [
      ["a", "p"],
      ["AM", "PM"],
    ],
    [["AM", "PM"]],
    [
      ["S", "M", "T", "W", "T", "F", "S"],
      ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    ],
    $s,
    [
      ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    ],
    $s,
    [
      ["B", "A"],
      ["BC", "AD"],
      ["Before Christ", "Anno Domini"],
    ],
    0,
    [6, 0],
    ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
    ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
    ["{1}, {0}", $s, "{1} 'at' {0}", $s],
    [".", ",", ";", "%", "+", "-", "E", "\xD7", "\u2030", "\u221E", "NaN", ":"],
    ["#,##0.###", "#,##0%", "\xA4#,##0.00", "#E0"],
    "USD",
    "$",
    "US Dollar",
    {},
    "ltr",
    hI,
  ],
  Ku = {};
function md(e) {
  let t = mI(e),
    n = kh(t);
  if (n) return n;
  let r = t.split("-")[0];
  if (((n = kh(r)), n)) return n;
  if (r === "en") return gI;
  throw new I(701, !1);
}
function vd(e) {
  return md(e)[ba.PluralCase];
}
function kh(e) {
  return (
    e in Ku ||
      (Ku[e] =
        nt.ng &&
        nt.ng.common &&
        nt.ng.common.locales &&
        nt.ng.common.locales[e]),
    Ku[e]
  );
}
var ba = (function (e) {
  return (
    (e[(e.LocaleId = 0)] = "LocaleId"),
    (e[(e.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
    (e[(e.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
    (e[(e.DaysFormat = 3)] = "DaysFormat"),
    (e[(e.DaysStandalone = 4)] = "DaysStandalone"),
    (e[(e.MonthsFormat = 5)] = "MonthsFormat"),
    (e[(e.MonthsStandalone = 6)] = "MonthsStandalone"),
    (e[(e.Eras = 7)] = "Eras"),
    (e[(e.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
    (e[(e.WeekendRange = 9)] = "WeekendRange"),
    (e[(e.DateFormat = 10)] = "DateFormat"),
    (e[(e.TimeFormat = 11)] = "TimeFormat"),
    (e[(e.DateTimeFormat = 12)] = "DateTimeFormat"),
    (e[(e.NumberSymbols = 13)] = "NumberSymbols"),
    (e[(e.NumberFormats = 14)] = "NumberFormats"),
    (e[(e.CurrencyCode = 15)] = "CurrencyCode"),
    (e[(e.CurrencySymbol = 16)] = "CurrencySymbol"),
    (e[(e.CurrencyName = 17)] = "CurrencyName"),
    (e[(e.Currencies = 18)] = "Currencies"),
    (e[(e.Directionality = 19)] = "Directionality"),
    (e[(e.PluralCase = 20)] = "PluralCase"),
    (e[(e.ExtraData = 21)] = "ExtraData"),
    e
  );
})(ba || {});
function mI(e) {
  return e.toLowerCase().replace(/_/g, "-");
}
var vI = ["zero", "one", "two", "few", "many"];
function yI(e, t) {
  let n = vd(t)(parseInt(e, 10)),
    r = vI[n];
  return r !== void 0 ? r : "other";
}
var ti = "en-US";
var Tm = { marker: "element" },
  bm = { marker: "ICU" },
  zt = (function (e) {
    return (
      (e[(e.SHIFT = 2)] = "SHIFT"),
      (e[(e.APPEND_EAGERLY = 1)] = "APPEND_EAGERLY"),
      (e[(e.COMMENT = 2)] = "COMMENT"),
      e
    );
  })(zt || {}),
  Mm = ti;
function ni(e) {
  typeof e == "string" && (Mm = e.toLowerCase().replace(/_/g, "-"));
}
function EI() {
  return Mm;
}
var qo = 0,
  Ho = 0;
function _I(e) {
  e && (qo = qo | (1 << Math.min(Ho, 31))), Ho++;
}
function DI(e, t, n) {
  if (Ho > 0) {
    let r = e.data[n],
      o = Array.isArray(r) ? r : r.update,
      i = Zp() - Ho - 1;
    Rm(e, t, o, i, qo);
  }
  (qo = 0), (Ho = 0);
}
function CI(e, t, n) {
  let r = e[Z];
  switch (n) {
    case Node.COMMENT_NODE:
      return Tg(r, t);
    case Node.TEXT_NODE:
      return Sg(r, t);
    case Node.ELEMENT_NODE:
      return Hl(r, t, null);
  }
}
var zs = (e, t, n, r) => (Nr(!0), CI(e, n, r));
function II(e, t, n, r) {
  let o = e[Z];
  for (let i = 0; i < t.length; i++) {
    let s = t[i++],
      a = t[i],
      c = (s & zt.COMMENT) === zt.COMMENT,
      u = (s & zt.APPEND_EAGERLY) === zt.APPEND_EAGERLY,
      l = s >>> zt.SHIFT,
      d = e[l],
      p = !1;
    d === null &&
      ((d = e[l] = zs(e, l, a, c ? Node.COMMENT_NODE : Node.TEXT_NODE)),
      (p = ko())),
      u && n !== null && p && Gn(o, n, d, r, !1);
  }
}
function Nm(e, t, n, r) {
  let o = n[Z],
    i = null,
    s;
  for (let a = 0; a < t.length; a++) {
    let c = t[a];
    if (typeof c == "string") {
      let u = t[++a];
      n[u] === null && (n[u] = zs(n, u, c, Node.TEXT_NODE));
    } else if (typeof c == "number")
      switch (c & 1) {
        case 0:
          let u = iC(c);
          i === null && ((i = u), (s = o.parentNode(r)));
          let l, d;
          if (
            (u === i ? ((l = r), (d = s)) : ((l = null), (d = ke(n[u]))),
            d !== null)
          ) {
            let E = sC(c),
              _ = n[E];
            Gn(o, d, _, l, !1);
            let y = Vo(e, E);
            if (y !== null && typeof y == "object") {
              let U = Ca(y, n);
              U !== null && Nm(e, y.create[U], n, n[y.anchorIdx]);
            }
          }
          break;
        case 1:
          let p = c >>> 1,
            f = t[++a],
            v = t[++a];
          td(o, Ao(p, n), null, null, f, v, null);
          break;
        default:
      }
    else
      switch (c) {
        case bm:
          let u = t[++a],
            l = t[++a];
          if (n[l] === null) {
            let f = (n[l] = zs(n, l, u, Node.COMMENT_NODE));
            yn(f, n);
          }
          break;
        case Tm:
          let d = t[++a],
            p = t[++a];
          if (n[p] === null) {
            let f = (n[p] = zs(n, p, d, Node.ELEMENT_NODE));
            yn(f, n);
          }
          break;
        default:
      }
  }
}
function Rm(e, t, n, r, o) {
  for (let i = 0; i < n.length; i++) {
    let s = n[i],
      a = n[++i];
    if (s & o) {
      let c = "";
      for (let u = i + 1; u <= i + a; u++) {
        let l = n[u];
        if (typeof l == "string") c += l;
        else if (typeof l == "number")
          if (l < 0) c += Dr(t[r - l]);
          else {
            let d = l >>> 2;
            switch (l & 3) {
              case 1:
                let p = n[++u],
                  f = n[++u],
                  v = e.data[d];
                typeof v == "string"
                  ? td(t[Z], t[d], null, v, p, c, f)
                  : zg(v, t, p, c, t[Z], f);
                break;
              case 0:
                let E = t[d];
                E !== null && wg(t[Z], E, c);
                break;
              case 2:
                SI(e, Vo(e, d), t, c);
                break;
              case 3:
                Lh(e, Vo(e, d), r, t);
                break;
            }
          }
      }
    } else {
      let c = n[i + 1];
      if (c > 0 && (c & 3) === 3) {
        let u = c >>> 2,
          l = Vo(e, u);
        t[l.currentCaseLViewIndex] < 0 && Lh(e, l, r, t);
      }
    }
    i += a;
  }
}
function Lh(e, t, n, r) {
  let o = r[t.currentCaseLViewIndex];
  if (o !== null) {
    let i = qo;
    o < 0 && ((o = r[t.currentCaseLViewIndex] = ~o), (i = -1)),
      Rm(e, r, t.update[o], n, i);
  }
}
function SI(e, t, n, r) {
  let o = wI(t, r);
  if (
    Ca(t, n) !== o &&
    (Am(e, t, n),
    (n[t.currentCaseLViewIndex] = o === null ? null : ~o),
    o !== null)
  ) {
    let s = n[t.anchorIdx];
    s && Nm(e, t.create[o], n, s), pC(n, t.anchorIdx, o);
  }
}
function Am(e, t, n) {
  let r = Ca(t, n);
  if (r !== null) {
    let o = t.remove[r];
    for (let i = 0; i < o.length; i++) {
      let s = o[i];
      if (s > 0) {
        let a = Ao(s, n);
        a !== null && Mg(n[Z], a);
      } else Am(e, Vo(e, ~s), n);
    }
  }
}
function wI(e, t) {
  let n = e.cases.indexOf(t);
  if (n === -1)
    switch (e.type) {
      case 1: {
        let r = yI(t, EI());
        (n = e.cases.indexOf(r)),
          n === -1 && r !== "other" && (n = e.cases.indexOf("other"));
        break;
      }
      case 0: {
        n = e.cases.indexOf("other");
        break;
      }
    }
  return n === -1 ? null : n;
}
var sa = /�(\d+):?\d*�/gi;
var TI = /�(\d+)�/,
  xm = /^\s*(�\d+:?\d*�)\s*,\s*(select|plural)\s*,/,
  Uo = "\uFFFD",
  bI = /�\/?\*(\d+:\d+)�/gi,
  MI = /�(\/?[#*]\d+):?\d*�/gi,
  NI = /\uE500/g;
function RI(e) {
  return e.replace(NI, " ");
}
function AI(e, t, n, r, o, i) {
  let s = Mr(),
    a = [],
    c = [],
    u = [[]],
    l = [[]];
  o = OI(o, i);
  let d = RI(o).split(MI);
  for (let p = 0; p < d.length; p++) {
    let f = d[p];
    if ((p & 1) === 0) {
      let v = bl(f);
      for (let E = 0; E < v.length; E++) {
        let _ = v[E];
        if ((E & 1) === 0) {
          let y = _;
          y !== "" && xI(l[0], e, s, u[0], a, c, n, y);
        } else {
          let y = _;
          if (typeof y != "object")
            throw new Error(
              `Unable to parse ICU expression in "${o}" message.`
            );
          let se = Om(e, s, u[0], n, a, "", !0).index;
          Fm(l[0], e, n, c, t, y, se);
        }
      }
    } else {
      let v = f.charCodeAt(0) === 47,
        E = f.charCodeAt(v ? 1 : 0),
        _ = le + Number.parseInt(f.substring(v ? 2 : 1));
      if (v) u.shift(), l.shift(), Ut(Mr(), !1);
      else {
        let y = oC(e, u[0], _);
        u.unshift([]), Ut(y, !0);
        let U = { kind: 2, index: _, children: [], type: E === 35 ? 0 : 1 };
        l[0].push(U), l.unshift(U.children);
      }
    }
  }
  e.data[r] = { create: a, update: c, ast: l[0], parentTNodeIndex: t };
}
function Om(e, t, n, r, o, i, s) {
  let a = Qo(e, r, 1, null),
    c = a << zt.SHIFT,
    u = Mr();
  t === u && (u = null),
    u === null && (c |= zt.APPEND_EAGERLY),
    s && ((c |= zt.COMMENT), eD(uC)),
    o.push(c, i === null ? "" : i);
  let l = sd(e, a, s ? 32 : 1, i === null ? "" : i, null);
  am(n, l);
  let d = l.index;
  return Ut(l, !1), u !== null && t !== u && rC(u, d), l;
}
function xI(e, t, n, r, o, i, s, a) {
  let c = a.match(sa),
    l = Om(t, n, r, s, o, c ? null : a, !1).index;
  c && Ws(i, a, l, null, 0, null), e.push({ kind: 0, index: l });
}
function Ws(e, t, n, r, o, i) {
  let s = e.length,
    a = s + 1;
  e.push(null, null);
  let c = s + 2,
    u = t.split(sa),
    l = 0;
  for (let d = 0; d < u.length; d++) {
    let p = u[d];
    if (d & 1) {
      let f = o + parseInt(p, 10);
      e.push(-1 - f), (l = l | Pm(f));
    } else p !== "" && e.push(p);
  }
  return (
    e.push((n << 2) | (r ? 1 : 0)),
    r && e.push(r, i),
    (e[s] = l),
    (e[a] = e.length - c),
    l
  );
}
function Pm(e) {
  return 1 << Math.min(e, 31);
}
function jh(e) {
  let t,
    n = "",
    r = 0,
    o = !1,
    i;
  for (; (t = bI.exec(e)) !== null; )
    o
      ? t[0] === `${Uo}/*${i}${Uo}` && ((r = t.index), (o = !1))
      : ((n += e.substring(r, t.index + t[0].length)), (i = t[1]), (o = !0));
  return (n += e.slice(r)), n;
}
function OI(e, t) {
  if (cC(t)) return jh(e);
  {
    let n = e.indexOf(`:${t}${Uo}`) + 2 + t.toString().length,
      r = e.search(new RegExp(`${Uo}\\/\\*\\d+:${t}${Uo}`));
    return jh(e.substring(n, r));
  }
}
function Fm(e, t, n, r, o, i, s) {
  let a = 0,
    c = {
      type: i.type,
      currentCaseLViewIndex: Qo(t, n, 1, null),
      anchorIdx: s,
      cases: [],
      create: [],
      remove: [],
      update: [],
    };
  LI(r, i, s), nC(t, s, c);
  let u = i.values,
    l = [];
  for (let d = 0; d < u.length; d++) {
    let p = u[d],
      f = [];
    for (let E = 0; E < p.length; E++) {
      let _ = p[E];
      if (typeof _ != "string") {
        let y = f.push(_) - 1;
        p[E] = `<!--\uFFFD${y}\uFFFD-->`;
      }
    }
    let v = [];
    l.push(v), (a = FI(v, t, c, n, r, o, i.cases[d], p.join(""), f) | a);
  }
  a && jI(r, a, s),
    e.push({
      kind: 3,
      index: s,
      cases: l,
      currentCaseLViewIndex: c.currentCaseLViewIndex,
    });
}
function PI(e) {
  let t = [],
    n = [],
    r = 1,
    o = 0;
  e = e.replace(xm, function (s, a, c) {
    return (
      c === "select" ? (r = 0) : (r = 1), (o = parseInt(a.slice(1), 10)), ""
    );
  });
  let i = bl(e);
  for (let s = 0; s < i.length; ) {
    let a = i[s++].trim();
    r === 1 && (a = a.replace(/\s*(?:=)?(\w+)\s*/, "$1")),
      a.length && t.push(a);
    let c = bl(i[s++]);
    t.length > n.length && n.push(c);
  }
  return { type: r, mainBinding: o, cases: t, values: n };
}
function bl(e) {
  if (!e) return [];
  let t = 0,
    n = [],
    r = [],
    o = /[{}]/g;
  o.lastIndex = 0;
  let i;
  for (; (i = o.exec(e)); ) {
    let a = i.index;
    if (i[0] == "}") {
      if ((n.pop(), n.length == 0)) {
        let c = e.substring(t, a);
        xm.test(c) ? r.push(PI(c)) : r.push(c), (t = a + 1);
      }
    } else {
      if (n.length == 0) {
        let c = e.substring(t, a);
        r.push(c), (t = a + 1);
      }
      n.push("{");
    }
  }
  let s = e.substring(t);
  return r.push(s), r;
}
function FI(e, t, n, r, o, i, s, a, c) {
  let u = [],
    l = [],
    d = [];
  n.cases.push(s), n.create.push(u), n.remove.push(l), n.update.push(d);
  let f = __(Pl()).getInertBodyElement(a),
    v = A_(f) || f;
  return v ? km(e, t, n, r, o, u, l, d, v, i, c, 0) : 0;
}
function km(e, t, n, r, o, i, s, a, c, u, l, d) {
  let p = 0,
    f = c.firstChild;
  for (; f; ) {
    let v = Qo(t, r, 1, null);
    switch (f.nodeType) {
      case Node.ELEMENT_NODE:
        let E = f,
          _ = E.tagName.toLowerCase();
        if (b_.hasOwnProperty(_)) {
          Ju(i, Tm, _, u, v), (t.data[v] = _);
          let Q = E.attributes;
          for (let Be = 0; Be < Q.length; Be++) {
            let Ie = Q.item(Be),
              or = Ie.name.toLowerCase();
            !!Ie.value.match(sa)
              ? R_.hasOwnProperty(or) &&
                (Eg[or]
                  ? Ws(a, Ie.value, v, Ie.name, 0, $l)
                  : Ws(a, Ie.value, v, Ie.name, 0, null))
              : $I(i, v, Ie);
          }
          let Ce = { kind: 1, index: v, children: [] };
          e.push(Ce),
            (p = km(Ce.children, t, n, r, o, i, s, a, f, v, l, d + 1) | p),
            $h(s, v, d);
        }
        break;
      case Node.TEXT_NODE:
        let y = f.textContent || "",
          U = y.match(sa);
        Ju(i, null, U ? "" : y, u, v),
          $h(s, v, d),
          U && (p = Ws(a, y, v, null, 0, null) | p),
          e.push({ kind: 0, index: v });
        break;
      case Node.COMMENT_NODE:
        let se = TI.exec(f.textContent || "");
        if (se) {
          let Q = parseInt(se[1], 10),
            Ce = l[Q];
          Ju(i, bm, "", u, v), Fm(e, t, r, o, u, Ce, v), kI(s, v, d);
        }
        break;
    }
    f = f.nextSibling;
  }
  return p;
}
function $h(e, t, n) {
  n === 0 && e.push(t);
}
function kI(e, t, n) {
  n === 0 && (e.push(~t), e.push(t));
}
function LI(e, t, n) {
  e.push(Pm(t.mainBinding), 2, -1 - t.mainBinding, (n << 2) | 2);
}
function jI(e, t, n) {
  e.push(t, 1, (n << 2) | 3);
}
function Ju(e, t, n, r, o) {
  t !== null && e.push(t), e.push(n, o, aC(0, r, o));
}
function $I(e, t, n) {
  e.push((t << 1) | 1, n.name, n.value);
}
var Vh = 0,
  VI = /\[(�.+?�?)\]/,
  BI = /\[(�.+?�?)\]|(�\/?\*\d+:\d+�)/g,
  HI = /({\s*)(VAR_(PLURAL|SELECT)(_\d+)?)(\s*,)/g,
  UI = /{([A-Z0-9_]+)}/g,
  GI = /�I18N_EXP_(ICU(_\d+)?)�/g,
  zI = /\/\*/,
  WI = /\d+\:(\d+)/;
function qI(e, t = {}) {
  let n = e;
  if (VI.test(e)) {
    let r = {},
      o = [Vh];
    n = n.replace(BI, (i, s, a) => {
      let c = s || a,
        u = r[c] || [];
      if (
        (u.length ||
          (c.split("|").forEach((E) => {
            let _ = E.match(WI),
              y = _ ? parseInt(_[1], 10) : Vh,
              U = zI.test(E);
            u.push([y, U, E]);
          }),
          (r[c] = u)),
        !u.length)
      )
        throw new Error(`i18n postprocess: unmatched placeholder - ${c}`);
      let l = o[o.length - 1],
        d = 0;
      for (let E = 0; E < u.length; E++)
        if (u[E][0] === l) {
          d = E;
          break;
        }
      let [p, f, v] = u[d];
      return f ? o.pop() : l !== p && o.push(p), u.splice(d, 1), v;
    });
  }
  return (
    Object.keys(t).length &&
      ((n = n.replace(HI, (r, o, i, s, a, c) =>
        t.hasOwnProperty(i) ? `${o}${t[i]}${c}` : r
      )),
      (n = n.replace(UI, (r, o) => (t.hasOwnProperty(o) ? t[o] : r))),
      (n = n.replace(GI, (r, o) => {
        if (t.hasOwnProperty(o)) {
          let i = t[o];
          if (!i.length)
            throw new Error(
              `i18n postprocess: unmatched ICU - ${r} with key: ${o}`
            );
          return i.shift();
        }
        return r;
      }))),
    n
  );
}
function ri(e, t, n = -1) {
  let r = Me(),
    o = B(),
    i = le + e,
    s = br(r.consts, t),
    a = Mr();
  if (
    (r.firstCreatePass && AI(r, a === null ? 0 : a.index, o, i, s, n),
    r.type === 2)
  ) {
    let p = o[Ge];
    p[O] |= 32;
  } else o[O] |= 32;
  let c = r.data[i],
    u = a === o[Ue] ? null : a,
    l = $g(r, u, o),
    d = a && a.type & 8 ? o[a.index] : null;
  dC(o, i, a, n), II(o, c.create, l, d), Lu(!0);
}
function oi() {
  Lu(!1);
}
function N(e, t, n) {
  ri(e, t, n), oi();
}
function Qn(e) {
  let t = B();
  return _I(Dn(t, Fo(), e)), Qn;
}
function Br(e) {
  DI(Me(), B(), e + le);
}
function Ma(e, t = {}) {
  return qI(e, t);
}
function Je(e, t, n) {
  let r = B(),
    o = Me(),
    i = Ne();
  return ZI(o, r, r[Z], i, e, t, n), Je;
}
function ZI(e, t, n, r, o, i, s) {
  let a = !0,
    c = null;
  if (
    ((r.type & 3 || s) &&
      ((c ??= Xu(r, t, i)), bC(r, e, t, s, n, o, i, c) && (a = !1)),
    a)
  ) {
    let u = r.outputs?.[o],
      l = r.hostDirectiveOutputs?.[o];
    if (l && l.length)
      for (let d = 0; d < l.length; d += 2) {
        let p = l[d],
          f = l[d + 1];
        (c ??= Xu(r, t, i)), Ah(r, t, p, f, o, c);
      }
    if (u && u.length)
      for (let d of u) (c ??= Xu(r, t, i)), Ah(r, t, d, o, o, c);
  }
}
function q(e = 1) {
  return oh(e);
}
function yd(e, t, n, r) {
  QC(e, t, n, r);
}
function Ed(e) {
  let t = B(),
    n = Me(),
    r = ju();
  Os(r + 1);
  let o = dd(n, r);
  if (e.dirty && Fp(t) === ((o.metadata.flags & 2) === 2)) {
    if (o.matches === null) e.reset([]);
    else {
      let i = tI(t, r);
      e.reset(i, a_), e.notifyOnChanges();
    }
    return !0;
  }
  return !1;
}
function _d() {
  return YC(B(), ju());
}
function ge(e) {
  let t = qp();
  return Tu(t, le + e);
}
function Vs(e, t) {
  return (e << 17) | (t << 2);
}
function qn(e) {
  return (e >> 17) & 32767;
}
function YI(e) {
  return (e & 2) == 2;
}
function XI(e, t) {
  return (e & 131071) | (t << 17);
}
function Ml(e) {
  return e | 2;
}
function Pr(e) {
  return (e & 131068) >> 2;
}
function el(e, t) {
  return (e & -131069) | (t << 2);
}
function QI(e) {
  return (e & 1) === 1;
}
function Nl(e) {
  return e | 1;
}
function KI(e, t, n, r, o, i) {
  let s = i ? t.classBindings : t.styleBindings,
    a = qn(s),
    c = Pr(s);
  e[r] = n;
  let u = !1,
    l;
  if (Array.isArray(n)) {
    let d = n;
    (l = d[1]), (l === null || Cr(d, l) > 0) && (u = !0);
  } else l = n;
  if (o)
    if (c !== 0) {
      let p = qn(e[a + 1]);
      (e[r + 1] = Vs(p, a)),
        p !== 0 && (e[p + 1] = el(e[p + 1], r)),
        (e[a + 1] = XI(e[a + 1], r));
    } else
      (e[r + 1] = Vs(a, 0)), a !== 0 && (e[a + 1] = el(e[a + 1], r)), (a = r);
  else
    (e[r + 1] = Vs(c, 0)),
      a === 0 ? (a = r) : (e[c + 1] = el(e[c + 1], r)),
      (c = r);
  u && (e[r + 1] = Ml(e[r + 1])),
    Bh(e, l, r, !0),
    Bh(e, l, r, !1),
    JI(t, l, e, r, i),
    (s = Vs(a, c)),
    i ? (t.classBindings = s) : (t.styleBindings = s);
}
function JI(e, t, n, r, o) {
  let i = o ? e.residualClasses : e.residualStyles;
  i != null &&
    typeof t == "string" &&
    Cr(i, t) >= 0 &&
    (n[r + 1] = Nl(n[r + 1]));
}
function Bh(e, t, n, r) {
  let o = e[n + 1],
    i = t === null,
    s = r ? qn(o) : Pr(o),
    a = !1;
  for (; s !== 0 && (a === !1 || i); ) {
    let c = e[s],
      u = e[s + 1];
    eS(c, t) && ((a = !0), (e[s + 1] = r ? Nl(u) : Ml(u))),
      (s = r ? qn(u) : Pr(u));
  }
  a && (e[n + 1] = r ? Ml(o) : Nl(o));
}
function eS(e, t) {
  return e === null || t == null || (Array.isArray(e) ? e[1] : e) === t
    ? !0
    : Array.isArray(e) && typeof t == "string"
    ? Cr(e, t) >= 0
    : !1;
}
function Na(e, t, n) {
  return Lm(e, t, n, !1), Na;
}
function In(e, t) {
  return Lm(e, t, null, !0), In;
}
function Lm(e, t, n, r) {
  let o = B(),
    i = Me(),
    s = Xp(2);
  if ((i.firstUpdatePass && nS(i, e, s, r), t !== It && Dn(o, s, t))) {
    let a = i.data[Hn()];
    aS(i, a, o, o[Z], e, (o[s + 1] = cS(t, n)), r, s);
  }
}
function tS(e, t) {
  return t >= e.expandoStartIndex;
}
function nS(e, t, n, r) {
  let o = e.data;
  if (o[n + 1] === null) {
    let i = o[Hn()],
      s = tS(e, n);
    uS(i, r) && t === null && !s && (t = !1),
      (t = rS(o, i, t, r)),
      KI(o, i, t, n, s, r);
  }
}
function rS(e, t, n, r) {
  let o = eh(e),
    i = r ? t.residualClasses : t.residualStyles;
  if (o === null)
    (r ? t.classBindings : t.styleBindings) === 0 &&
      ((n = tl(null, e, t, n, r)), (n = Zo(n, t.attrs, r)), (i = null));
  else {
    let s = t.directiveStylingLast;
    if (s === -1 || e[s] !== o)
      if (((n = tl(o, e, t, n, r)), i === null)) {
        let c = oS(e, t, r);
        c !== void 0 &&
          Array.isArray(c) &&
          ((c = tl(null, e, t, c[1], r)),
          (c = Zo(c, t.attrs, r)),
          iS(e, t, r, c));
      } else i = sS(e, t, r);
  }
  return (
    i !== void 0 && (r ? (t.residualClasses = i) : (t.residualStyles = i)), n
  );
}
function oS(e, t, n) {
  let r = n ? t.classBindings : t.styleBindings;
  if (Pr(r) !== 0) return e[qn(r)];
}
function iS(e, t, n, r) {
  let o = n ? t.classBindings : t.styleBindings;
  e[qn(o)] = r;
}
function sS(e, t, n) {
  let r,
    o = t.directiveEnd;
  for (let i = 1 + t.directiveStylingLast; i < o; i++) {
    let s = e[i].hostAttrs;
    r = Zo(r, s, n);
  }
  return Zo(r, t.attrs, n);
}
function tl(e, t, n, r, o) {
  let i = null,
    s = n.directiveEnd,
    a = n.directiveStylingLast;
  for (
    a === -1 ? (a = n.directiveStart) : a++;
    a < s && ((i = t[a]), (r = Zo(r, i.hostAttrs, o)), i !== e);

  )
    a++;
  return e !== null && (n.directiveStylingLast = a), r;
}
function Zo(e, t, n) {
  let r = n ? 1 : 2,
    o = -1;
  if (t !== null)
    for (let i = 0; i < t.length; i++) {
      let s = t[i];
      typeof s == "number"
        ? (o = s)
        : o === r &&
          (Array.isArray(e) || (e = e === void 0 ? [] : ["", e]),
          Sp(e, s, n ? !0 : t[++i]));
    }
  return e === void 0 ? null : e;
}
function aS(e, t, n, r, o, i, s, a) {
  if (!(t.type & 3)) return;
  let c = e.data,
    u = c[a + 1],
    l = QI(u) ? Hh(c, t, n, o, Pr(u), s) : void 0;
  if (!aa(l)) {
    aa(i) || (YI(u) && (i = Hh(c, null, n, o, a, s)));
    let d = Ao(Hn(), n);
    ED(r, s, d, o, i);
  }
}
function Hh(e, t, n, r, o, i) {
  let s = t === null,
    a;
  for (; o > 0; ) {
    let c = e[o],
      u = Array.isArray(c),
      l = u ? c[1] : c,
      d = l === null,
      p = n[o + 1];
    p === It && (p = d ? Vt : void 0);
    let f = d ? ws(p, r) : l === r ? p : void 0;
    if ((u && !aa(f) && (f = ws(c, r)), aa(f) && ((a = f), s))) return a;
    let v = e[o + 1];
    o = s ? qn(v) : Pr(v);
  }
  if (t !== null) {
    let c = i ? t.residualClasses : t.residualStyles;
    c != null && (a = ws(c, r));
  }
  return a;
}
function aa(e) {
  return e !== void 0;
}
function cS(e, t) {
  return (
    e == null ||
      e === "" ||
      (typeof t == "string"
        ? (e = e + t)
        : typeof e == "object" && (e = $t(jr(e)))),
    e
  );
}
function uS(e, t) {
  return (e.flags & (t ? 8 : 16)) !== 0;
}
function M(e, t = "") {
  let n = B(),
    r = Me(),
    o = e + le,
    i = r.firstCreatePass ? id(r, o, 1, t, null) : r.data[o],
    s = lS(r, n, i, t, e);
  (n[o] = s), ko() && Ql(r, n, s, i), Ut(i, !1);
}
var lS = (e, t, n, r, o) => (Nr(!0), Sg(t[Z], r));
function dS(e, t, n, r = "") {
  return Dn(e, Fo(), n) ? t + Dr(n) + r : It;
}
function Re(e) {
  return ee("", e), Re;
}
function ee(e, t, n) {
  let r = B(),
    o = dS(r, e, t, n);
  return o !== It && fS(r, Hn(), o), ee;
}
function fS(e, t, n) {
  let r = Ao(t, e);
  wg(e[Z], r, n);
}
function ii(e, t, n) {
  let r = Po() + e,
    o = B();
  return o[r] === It ? ld(o, r, n ? t.call(n) : t()) : wC(o, r);
}
function si(e, t, n, r) {
  return $m(B(), Po(), e, t, n, r);
}
function Dd(e, t, n, r, o) {
  return pS(B(), Po(), e, t, n, r, o);
}
function jm(e, t) {
  let n = e[t];
  return n === It ? void 0 : n;
}
function $m(e, t, n, r, o, i) {
  let s = t + n;
  return Dn(e, s, o) ? ld(e, s + 1, i ? r.call(i, o) : r(o)) : jm(e, s + 1);
}
function pS(e, t, n, r, o, i, s) {
  let a = t + n;
  return TC(e, a, o, i)
    ? ld(e, a + 2, s ? r.call(s, o, i) : r(o, i))
    : jm(e, a + 2);
}
function Yt(e, t) {
  let n = Me(),
    r,
    o = e + le;
  n.firstCreatePass
    ? ((r = hS(t, n.pipeRegistry)),
      (n.data[o] = r),
      r.onDestroy && (n.destroyHooks ??= []).push(o, r.onDestroy))
    : (r = n.data[o]);
  let i = r.factory || (r.factory = cn(r.type, !0)),
    s,
    a = Te(ie);
  try {
    let c = Xs(!1),
      u = i();
    return Xs(c), bu(n, B(), o, u), u;
  } finally {
    Te(a);
  }
}
function hS(e, t) {
  if (t)
    for (let n = t.length - 1; n >= 0; n--) {
      let r = t[n];
      if (e === r.name) return r;
    }
}
function Xt(e, t, n) {
  let r = e + le,
    o = B(),
    i = Tu(o, r);
  return gS(o, r) ? $m(o, Po(), t, i.transform, n, i) : i.transform(n);
}
function gS(e, t) {
  return e[x].data[t].pure;
}
function me(e, t) {
  return Da(e, t);
}
var ca = class {
    ngModuleFactory;
    componentFactories;
    constructor(t, n) {
      (this.ngModuleFactory = t), (this.componentFactories = n);
    }
  },
  Cd = (() => {
    class e {
      compileModuleSync(n) {
        return new ia(n);
      }
      compileModuleAsync(n) {
        return Promise.resolve(this.compileModuleSync(n));
      }
      compileModuleAndAllComponentsSync(n) {
        let r = this.compileModuleSync(n),
          o = Eu(n),
          i = Cg(o.declarations).reduce((s, a) => {
            let c = fn(a);
            return c && s.push(new Or(c)), s;
          }, []);
        return new ca(r, i);
      }
      compileModuleAndAllComponentsAsync(n) {
        return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
      }
      clearCache() {}
      clearCacheFor(n) {}
      getModuleId(n) {}
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = S({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })();
var mS = (() => {
    class e {
      zone = g(oe);
      changeDetectionScheduler = g(ln);
      applicationRef = g(Xn);
      applicationErrorHandler = g(_e);
      _onMicrotaskEmptySubscription;
      initialize() {
        this._onMicrotaskEmptySubscription ||
          (this._onMicrotaskEmptySubscription =
            this.zone.onMicrotaskEmpty.subscribe({
              next: () => {
                this.changeDetectionScheduler.runningTick ||
                  this.zone.run(() => {
                    try {
                      (this.applicationRef.dirtyFlags |= 1),
                        this.applicationRef._tick();
                    } catch (n) {
                      this.applicationErrorHandler(n);
                    }
                  });
              },
            }));
      }
      ngOnDestroy() {
        this._onMicrotaskEmptySubscription?.unsubscribe();
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = S({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  Vm = new w("", { factory: () => !1 });
function Id({
  ngZoneFactory: e,
  ignoreChangesOutsideZone: t,
  scheduleInRootZone: n,
}) {
  return (
    (e ??= () => new oe(G(C({}, wd()), { scheduleInRootZone: n }))),
    [
      { provide: oe, useFactory: e },
      {
        provide: Bt,
        multi: !0,
        useFactory: () => {
          let r = g(mS, { optional: !0 });
          return () => r.initialize();
        },
      },
      {
        provide: Bt,
        multi: !0,
        useFactory: () => {
          let r = g(vS);
          return () => {
            r.initialize();
          };
        },
      },
      t === !0 ? { provide: Gu, useValue: !0 } : [],
      { provide: zu, useValue: n ?? xg },
      {
        provide: _e,
        useFactory: () => {
          let r = g(oe),
            o = g(ue),
            i;
          return (s) => {
            r.runOutsideAngular(() => {
              o.destroyed && !i
                ? setTimeout(() => {
                    throw s;
                  })
                : ((i ??= o.get(ht)), i.handleError(s));
            });
          };
        },
      },
    ]
  );
}
function Sd(e) {
  let t = e?.ignoreChangesOutsideZone,
    n = e?.scheduleInRootZone,
    r = Id({
      ngZoneFactory: () => {
        let o = wd(e);
        return (
          (o.scheduleInRootZone = n),
          o.shouldCoalesceEventChangeDetection && $r("NgZone_CoalesceEvent"),
          new oe(o)
        );
      },
      ignoreChangesOutsideZone: t,
      scheduleInRootZone: n,
    });
  return Ht([{ provide: Vm, useValue: !0 }, { provide: Lo, useValue: !1 }, r]);
}
function wd(e) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
  };
}
var vS = (() => {
  class e {
    subscription = new ae();
    initialized = !1;
    zone = g(oe);
    pendingTasks = g(_t);
    initialize() {
      if (this.initialized) return;
      this.initialized = !0;
      let n = null;
      !this.zone.isStable &&
        !this.zone.hasPendingMacrotasks &&
        !this.zone.hasPendingMicrotasks &&
        (n = this.pendingTasks.add()),
        this.zone.runOutsideAngular(() => {
          this.subscription.add(
            this.zone.onStable.subscribe(() => {
              oe.assertNotInAngularZone(),
                queueMicrotask(() => {
                  n !== null &&
                    !this.zone.hasPendingMacrotasks &&
                    !this.zone.hasPendingMicrotasks &&
                    (this.pendingTasks.remove(n), (n = null));
                });
            })
          );
        }),
        this.subscription.add(
          this.zone.onUnstable.subscribe(() => {
            oe.assertInAngularZone(), (n ??= this.pendingTasks.add());
          })
        );
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = S({ token: e, factory: e.ɵfac, providedIn: "root" });
  }
  return e;
})();
var Bm = (() => {
  class e {
    applicationErrorHandler = g(_e);
    appRef = g(Xn);
    taskService = g(_t);
    ngZone = g(oe);
    zonelessEnabled = g(Lo);
    tracing = g(Ko, { optional: !0 });
    disableScheduling = g(Gu, { optional: !0 }) ?? !1;
    zoneIsDefined = typeof Zone < "u" && !!Zone.root.run;
    schedulerTickApplyArgs = [{ data: { __scheduler_tick__: !0 } }];
    subscriptions = new ae();
    angularZoneId = this.zoneIsDefined ? this.ngZone._inner?.get(ea) : null;
    scheduleInRootZone =
      !this.zonelessEnabled &&
      this.zoneIsDefined &&
      (g(zu, { optional: !0 }) ?? !1);
    cancelScheduledCallback = null;
    useMicrotaskScheduler = !1;
    runningTick = !1;
    pendingRenderTaskId = null;
    constructor() {
      this.subscriptions.add(
        this.appRef.afterTick.subscribe(() => {
          this.runningTick || this.cleanup();
        })
      ),
        this.subscriptions.add(
          this.ngZone.onUnstable.subscribe(() => {
            this.runningTick || this.cleanup();
          })
        ),
        (this.disableScheduling ||=
          !this.zonelessEnabled &&
          (this.ngZone instanceof ta || !this.zoneIsDefined));
    }
    notify(n) {
      if (!this.zonelessEnabled && n === 5) return;
      let r = !1;
      switch (n) {
        case 0: {
          this.appRef.dirtyFlags |= 2;
          break;
        }
        case 3:
        case 2:
        case 4:
        case 5:
        case 1: {
          this.appRef.dirtyFlags |= 4;
          break;
        }
        case 6: {
          (this.appRef.dirtyFlags |= 2), (r = !0);
          break;
        }
        case 12: {
          (this.appRef.dirtyFlags |= 16), (r = !0);
          break;
        }
        case 13: {
          (this.appRef.dirtyFlags |= 2), (r = !0);
          break;
        }
        case 11: {
          r = !0;
          break;
        }
        case 9:
        case 8:
        case 7:
        case 10:
        default:
          this.appRef.dirtyFlags |= 8;
      }
      if (
        ((this.appRef.tracingSnapshot =
          this.tracing?.snapshot(this.appRef.tracingSnapshot) ?? null),
        !this.shouldScheduleTick(r))
      )
        return;
      let o = this.useMicrotaskScheduler ? Eh : Og;
      (this.pendingRenderTaskId = this.taskService.add()),
        this.scheduleInRootZone
          ? (this.cancelScheduledCallback = Zone.root.run(() =>
              o(() => this.tick())
            ))
          : (this.cancelScheduledCallback = this.ngZone.runOutsideAngular(() =>
              o(() => this.tick())
            ));
    }
    shouldScheduleTick(n) {
      return !(
        (this.disableScheduling && !n) ||
        this.appRef.destroyed ||
        this.pendingRenderTaskId !== null ||
        this.runningTick ||
        this.appRef._runningTick ||
        (!this.zonelessEnabled &&
          this.zoneIsDefined &&
          Zone.current.get(ea + this.angularZoneId))
      );
    }
    tick() {
      if (this.runningTick || this.appRef.destroyed) return;
      if (this.appRef.dirtyFlags === 0) {
        this.cleanup();
        return;
      }
      !this.zonelessEnabled &&
        this.appRef.dirtyFlags & 7 &&
        (this.appRef.dirtyFlags |= 1);
      let n = this.taskService.add();
      try {
        this.ngZone.run(
          () => {
            (this.runningTick = !0), this.appRef._tick();
          },
          void 0,
          this.schedulerTickApplyArgs
        );
      } catch (r) {
        this.taskService.remove(n), this.applicationErrorHandler(r);
      } finally {
        this.cleanup();
      }
      (this.useMicrotaskScheduler = !0),
        Eh(() => {
          (this.useMicrotaskScheduler = !1), this.taskService.remove(n);
        });
    }
    ngOnDestroy() {
      this.subscriptions.unsubscribe(), this.cleanup();
    }
    cleanup() {
      if (
        ((this.runningTick = !1),
        this.cancelScheduledCallback?.(),
        (this.cancelScheduledCallback = null),
        this.pendingRenderTaskId !== null)
      ) {
        let n = this.pendingRenderTaskId;
        (this.pendingRenderTaskId = null), this.taskService.remove(n);
      }
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = S({ token: e, factory: e.ɵfac, providedIn: "root" });
  }
  return e;
})();
function yS() {
  return (typeof $localize < "u" && $localize.locale) || ti;
}
var Hr = new w("", {
  providedIn: "root",
  factory: () => g(Hr, { optional: !0, skipSelf: !0 }) || yS(),
});
function et(e) {
  return fp(e);
}
function Td(e, t) {
  return qi(e, t?.equal);
}
var Hm = class {
  [Se];
  constructor(t) {
    this[Se] = t;
  }
  destroy() {
    this[Se].destroy();
  }
};
var Wm = Symbol("InputSignalNode#UNSET"),
  OS = G(C({}, Zi), {
    transformFn: void 0,
    applyValueToInputSignal(e, t) {
      lr(e, t);
    },
  });
function qm(e, t) {
  let n = Object.create(OS);
  (n.value = e), (n.transformFn = t?.transform);
  function r() {
    if ((ar(n), n.value === Wm)) {
      let o = null;
      throw new I(-950, o);
    }
    return n.value;
  }
  return (r[Se] = n), r;
}
var Aa = class {
    attributeName;
    constructor(t) {
      this.attributeName = t;
    }
    __NG_ELEMENT_ID__ = () => Yo(this.attributeName);
    toString() {
      return `HostAttributeToken ${this.attributeName}`;
    }
  },
  PS = new w("");
PS.__NG_ELEMENT_ID__ = (e) => {
  let t = Ne();
  if (t === null) throw new I(204, !1);
  if (t.type & 2) return t.value;
  if (e & 8) return null;
  throw new I(204, !1);
};
function Um(e, t) {
  return qm(e, t);
}
function FS(e) {
  return qm(Wm, e);
}
var Zm = ((Um.required = FS), Um);
var bd = new w(""),
  kS = new w("");
function ai(e) {
  return !e.moduleRef;
}
function LS(e) {
  let t = ai(e) ? e.r3Injector : e.moduleRef.injector,
    n = t.get(oe);
  return n.run(() => {
    ai(e)
      ? e.r3Injector.resolveInjectorInitializers()
      : e.moduleRef.resolveInjectorInitializers();
    let r = t.get(_e),
      o;
    if (
      (n.runOutsideAngular(() => {
        o = n.onError.subscribe({ next: r });
      }),
      ai(e))
    ) {
      let i = () => t.destroy(),
        s = e.platformInjector.get(bd);
      s.add(i),
        t.onDestroy(() => {
          o.unsubscribe(), s.delete(i);
        });
    } else {
      let i = () => e.moduleRef.destroy(),
        s = e.platformInjector.get(bd);
      s.add(i),
        e.moduleRef.onDestroy(() => {
          Bo(e.allPlatformModules, e.moduleRef), o.unsubscribe(), s.delete(i);
        });
    }
    return $S(r, n, () => {
      let i = t.get(_t),
        s = i.add(),
        a = t.get(gd);
      return (
        a.runInitializers(),
        a.donePromise
          .then(() => {
            let c = t.get(Hr, ti);
            if ((ni(c || ti), !t.get(kS, !0)))
              return ai(e)
                ? t.get(Xn)
                : (e.allPlatformModules.push(e.moduleRef), e.moduleRef);
            if (ai(e)) {
              let l = t.get(Xn);
              return (
                e.rootComponent !== void 0 && l.bootstrap(e.rootComponent), l
              );
            } else return jS?.(e.moduleRef, e.allPlatformModules), e.moduleRef;
          })
          .finally(() => void i.remove(s))
      );
    });
  });
}
var jS;
function $S(e, t, n) {
  try {
    let r = n();
    return Yn(r)
      ? r.catch((o) => {
          throw (t.runOutsideAngular(() => e(o)), o);
        })
      : r;
  } catch (r) {
    throw (t.runOutsideAngular(() => e(r)), r);
  }
}
var Ra = null;
function VS(e = [], t) {
  return Xe.create({
    name: t,
    providers: [
      { provide: So, useValue: "platform" },
      { provide: bd, useValue: new Set([() => (Ra = null)]) },
      ...e,
    ],
  });
}
function BS(e = []) {
  if (Ra) return Ra;
  let t = VS(e);
  return (Ra = t), Sm(), HS(t), t;
}
function HS(e) {
  let t = e.get(fa, null);
  he(e, () => {
    t?.forEach((n) => n());
  });
}
var Sn = (() => {
  class e {
    static __NG_ELEMENT_ID__ = US;
  }
  return e;
})();
function US(e) {
  return GS(Ne(), B(), (e & 16) === 16);
}
function GS(e, t, n) {
  if (mn(e) && !n) {
    let r = Ke(e.index, t);
    return new En(r, r);
  } else if (e.type & 175) {
    let r = t[Ge];
    return new En(r, t);
  }
  return null;
}
var Md = class {
    constructor() {}
    supports(t) {
      return ud(t);
    }
    create(t) {
      return new Nd(t);
    }
  },
  zS = (e, t) => t,
  Nd = class {
    length = 0;
    collection;
    _linkedRecords = null;
    _unlinkedRecords = null;
    _previousItHead = null;
    _itHead = null;
    _itTail = null;
    _additionsHead = null;
    _additionsTail = null;
    _movesHead = null;
    _movesTail = null;
    _removalsHead = null;
    _removalsTail = null;
    _identityChangesHead = null;
    _identityChangesTail = null;
    _trackByFn;
    constructor(t) {
      this._trackByFn = t || zS;
    }
    forEachItem(t) {
      let n;
      for (n = this._itHead; n !== null; n = n._next) t(n);
    }
    forEachOperation(t) {
      let n = this._itHead,
        r = this._removalsHead,
        o = 0,
        i = null;
      for (; n || r; ) {
        let s = !r || (n && n.currentIndex < Gm(r, o, i)) ? n : r,
          a = Gm(s, o, i),
          c = s.currentIndex;
        if (s === r) o--, (r = r._nextRemoved);
        else if (((n = n._next), s.previousIndex == null)) o++;
        else {
          i || (i = []);
          let u = a - o,
            l = c - o;
          if (u != l) {
            for (let p = 0; p < u; p++) {
              let f = p < i.length ? i[p] : (i[p] = 0),
                v = f + p;
              l <= v && v < u && (i[p] = f + 1);
            }
            let d = s.previousIndex;
            i[d] = l - u;
          }
        }
        a !== c && t(s, a, c);
      }
    }
    forEachPreviousItem(t) {
      let n;
      for (n = this._previousItHead; n !== null; n = n._nextPrevious) t(n);
    }
    forEachAddedItem(t) {
      let n;
      for (n = this._additionsHead; n !== null; n = n._nextAdded) t(n);
    }
    forEachMovedItem(t) {
      let n;
      for (n = this._movesHead; n !== null; n = n._nextMoved) t(n);
    }
    forEachRemovedItem(t) {
      let n;
      for (n = this._removalsHead; n !== null; n = n._nextRemoved) t(n);
    }
    forEachIdentityChange(t) {
      let n;
      for (n = this._identityChangesHead; n !== null; n = n._nextIdentityChange)
        t(n);
    }
    diff(t) {
      if ((t == null && (t = []), !ud(t))) throw new I(900, !1);
      return this.check(t) ? this : null;
    }
    onDestroy() {}
    check(t) {
      this._reset();
      let n = this._itHead,
        r = !1,
        o,
        i,
        s;
      if (Array.isArray(t)) {
        this.length = t.length;
        for (let a = 0; a < this.length; a++)
          (i = t[a]),
            (s = this._trackByFn(a, i)),
            n === null || !Object.is(n.trackById, s)
              ? ((n = this._mismatch(n, i, s, a)), (r = !0))
              : (r && (n = this._verifyReinsertion(n, i, s, a)),
                Object.is(n.item, i) || this._addIdentityChange(n, i)),
            (n = n._next);
      } else
        (o = 0),
          hm(t, (a) => {
            (s = this._trackByFn(o, a)),
              n === null || !Object.is(n.trackById, s)
                ? ((n = this._mismatch(n, a, s, o)), (r = !0))
                : (r && (n = this._verifyReinsertion(n, a, s, o)),
                  Object.is(n.item, a) || this._addIdentityChange(n, a)),
              (n = n._next),
              o++;
          }),
          (this.length = o);
      return this._truncate(n), (this.collection = t), this.isDirty;
    }
    get isDirty() {
      return (
        this._additionsHead !== null ||
        this._movesHead !== null ||
        this._removalsHead !== null ||
        this._identityChangesHead !== null
      );
    }
    _reset() {
      if (this.isDirty) {
        let t;
        for (t = this._previousItHead = this._itHead; t !== null; t = t._next)
          t._nextPrevious = t._next;
        for (t = this._additionsHead; t !== null; t = t._nextAdded)
          t.previousIndex = t.currentIndex;
        for (
          this._additionsHead = this._additionsTail = null, t = this._movesHead;
          t !== null;
          t = t._nextMoved
        )
          t.previousIndex = t.currentIndex;
        (this._movesHead = this._movesTail = null),
          (this._removalsHead = this._removalsTail = null),
          (this._identityChangesHead = this._identityChangesTail = null);
      }
    }
    _mismatch(t, n, r, o) {
      let i;
      return (
        t === null ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
        (t =
          this._unlinkedRecords === null
            ? null
            : this._unlinkedRecords.get(r, null)),
        t !== null
          ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
            this._reinsertAfter(t, i, o))
          : ((t =
              this._linkedRecords === null
                ? null
                : this._linkedRecords.get(r, o)),
            t !== null
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new Rd(n, r), i, o))),
        t
      );
    }
    _verifyReinsertion(t, n, r, o) {
      let i =
        this._unlinkedRecords === null
          ? null
          : this._unlinkedRecords.get(r, null);
      return (
        i !== null
          ? (t = this._reinsertAfter(i, t._prev, o))
          : t.currentIndex != o &&
            ((t.currentIndex = o), this._addToMoves(t, o)),
        t
      );
    }
    _truncate(t) {
      for (; t !== null; ) {
        let n = t._next;
        this._addToRemovals(this._unlink(t)), (t = n);
      }
      this._unlinkedRecords !== null && this._unlinkedRecords.clear(),
        this._additionsTail !== null && (this._additionsTail._nextAdded = null),
        this._movesTail !== null && (this._movesTail._nextMoved = null),
        this._itTail !== null && (this._itTail._next = null),
        this._removalsTail !== null && (this._removalsTail._nextRemoved = null),
        this._identityChangesTail !== null &&
          (this._identityChangesTail._nextIdentityChange = null);
    }
    _reinsertAfter(t, n, r) {
      this._unlinkedRecords !== null && this._unlinkedRecords.remove(t);
      let o = t._prevRemoved,
        i = t._nextRemoved;
      return (
        o === null ? (this._removalsHead = i) : (o._nextRemoved = i),
        i === null ? (this._removalsTail = o) : (i._prevRemoved = o),
        this._insertAfter(t, n, r),
        this._addToMoves(t, r),
        t
      );
    }
    _moveAfter(t, n, r) {
      return (
        this._unlink(t), this._insertAfter(t, n, r), this._addToMoves(t, r), t
      );
    }
    _addAfter(t, n, r) {
      return (
        this._insertAfter(t, n, r),
        this._additionsTail === null
          ? (this._additionsTail = this._additionsHead = t)
          : (this._additionsTail = this._additionsTail._nextAdded = t),
        t
      );
    }
    _insertAfter(t, n, r) {
      let o = n === null ? this._itHead : n._next;
      return (
        (t._next = o),
        (t._prev = n),
        o === null ? (this._itTail = t) : (o._prev = t),
        n === null ? (this._itHead = t) : (n._next = t),
        this._linkedRecords === null && (this._linkedRecords = new xa()),
        this._linkedRecords.put(t),
        (t.currentIndex = r),
        t
      );
    }
    _remove(t) {
      return this._addToRemovals(this._unlink(t));
    }
    _unlink(t) {
      this._linkedRecords !== null && this._linkedRecords.remove(t);
      let n = t._prev,
        r = t._next;
      return (
        n === null ? (this._itHead = r) : (n._next = r),
        r === null ? (this._itTail = n) : (r._prev = n),
        t
      );
    }
    _addToMoves(t, n) {
      return (
        t.previousIndex === n ||
          (this._movesTail === null
            ? (this._movesTail = this._movesHead = t)
            : (this._movesTail = this._movesTail._nextMoved = t)),
        t
      );
    }
    _addToRemovals(t) {
      return (
        this._unlinkedRecords === null && (this._unlinkedRecords = new xa()),
        this._unlinkedRecords.put(t),
        (t.currentIndex = null),
        (t._nextRemoved = null),
        this._removalsTail === null
          ? ((this._removalsTail = this._removalsHead = t),
            (t._prevRemoved = null))
          : ((t._prevRemoved = this._removalsTail),
            (this._removalsTail = this._removalsTail._nextRemoved = t)),
        t
      );
    }
    _addIdentityChange(t, n) {
      return (
        (t.item = n),
        this._identityChangesTail === null
          ? (this._identityChangesTail = this._identityChangesHead = t)
          : (this._identityChangesTail =
              this._identityChangesTail._nextIdentityChange =
                t),
        t
      );
    }
  },
  Rd = class {
    item;
    trackById;
    currentIndex = null;
    previousIndex = null;
    _nextPrevious = null;
    _prev = null;
    _next = null;
    _prevDup = null;
    _nextDup = null;
    _prevRemoved = null;
    _nextRemoved = null;
    _nextAdded = null;
    _nextMoved = null;
    _nextIdentityChange = null;
    constructor(t, n) {
      (this.item = t), (this.trackById = n);
    }
  },
  Ad = class {
    _head = null;
    _tail = null;
    add(t) {
      this._head === null
        ? ((this._head = this._tail = t),
          (t._nextDup = null),
          (t._prevDup = null))
        : ((this._tail._nextDup = t),
          (t._prevDup = this._tail),
          (t._nextDup = null),
          (this._tail = t));
    }
    get(t, n) {
      let r;
      for (r = this._head; r !== null; r = r._nextDup)
        if ((n === null || n <= r.currentIndex) && Object.is(r.trackById, t))
          return r;
      return null;
    }
    remove(t) {
      let n = t._prevDup,
        r = t._nextDup;
      return (
        n === null ? (this._head = r) : (n._nextDup = r),
        r === null ? (this._tail = n) : (r._prevDup = n),
        this._head === null
      );
    }
  },
  xa = class {
    map = new Map();
    put(t) {
      let n = t.trackById,
        r = this.map.get(n);
      r || ((r = new Ad()), this.map.set(n, r)), r.add(t);
    }
    get(t, n) {
      let r = t,
        o = this.map.get(r);
      return o ? o.get(t, n) : null;
    }
    remove(t) {
      let n = t.trackById;
      return this.map.get(n).remove(t) && this.map.delete(n), t;
    }
    get isEmpty() {
      return this.map.size === 0;
    }
    clear() {
      this.map.clear();
    }
  };
function Gm(e, t, n) {
  let r = e.previousIndex;
  if (r === null) return r;
  let o = 0;
  return n && r < n.length && (o = n[r]), r + t + o;
}
function zm() {
  return new xd([new Md()]);
}
var xd = (() => {
  class e {
    factories;
    static ɵprov = S({ token: e, providedIn: "root", factory: zm });
    constructor(n) {
      this.factories = n;
    }
    static create(n, r) {
      if (r != null) {
        let o = r.factories.slice();
        n = n.concat(o);
      }
      return new e(n);
    }
    static extend(n) {
      return {
        provide: e,
        useFactory: () => {
          let r = g(e, { optional: !0, skipSelf: !0 });
          return e.create(n, r || zm());
        },
      };
    }
    find(n) {
      let r = this.factories.find((o) => o.supports(n));
      if (r != null) return r;
      throw new I(901, !1);
    }
  }
  return e;
})();
function Ym(e) {
  let {
    rootComponent: t,
    appProviders: n,
    platformProviders: r,
    platformRef: o,
  } = e;
  X(8);
  try {
    let i = o?.injector ?? BS(r),
      s = [Id({}), { provide: ln, useExisting: Bm }, ah, ...(n || [])],
      a = new Wo({
        providers: s,
        parent: i,
        debugName: "",
        runEnvironmentInitializers: !1,
      });
    return LS({
      r3Injector: a.injector,
      platformInjector: i,
      rootComponent: t,
    });
  } catch (i) {
    return Promise.reject(i);
  } finally {
    X(9);
  }
}
function Qt(e) {
  return typeof e == "boolean" ? e : e != null && e !== "false";
}
function Od(e, t = NaN) {
  return !isNaN(parseFloat(e)) && !isNaN(Number(e)) ? Number(e) : t;
}
var Km = null;
function Kt() {
  return Km;
}
function Pd(e) {
  Km ??= e;
}
var li = class {},
  Fd = (() => {
    class e {
      historyGo(n) {
        throw new Error("");
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = S({
        token: e,
        factory: () => g(Jm),
        providedIn: "platform",
      });
    }
    return e;
  })();
var Jm = (() => {
  class e extends Fd {
    _location;
    _history;
    _doc = g(Y);
    constructor() {
      super(),
        (this._location = window.location),
        (this._history = window.history);
    }
    getBaseHrefFromDOM() {
      return Kt().getBaseHref(this._doc);
    }
    onPopState(n) {
      let r = Kt().getGlobalEventTarget(this._doc, "window");
      return (
        r.addEventListener("popstate", n, !1),
        () => r.removeEventListener("popstate", n)
      );
    }
    onHashChange(n) {
      let r = Kt().getGlobalEventTarget(this._doc, "window");
      return (
        r.addEventListener("hashchange", n, !1),
        () => r.removeEventListener("hashchange", n)
      );
    }
    get href() {
      return this._location.href;
    }
    get protocol() {
      return this._location.protocol;
    }
    get hostname() {
      return this._location.hostname;
    }
    get port() {
      return this._location.port;
    }
    get pathname() {
      return this._location.pathname;
    }
    get search() {
      return this._location.search;
    }
    get hash() {
      return this._location.hash;
    }
    set pathname(n) {
      this._location.pathname = n;
    }
    pushState(n, r, o) {
      this._history.pushState(n, r, o);
    }
    replaceState(n, r, o) {
      this._history.replaceState(n, r, o);
    }
    forward() {
      this._history.forward();
    }
    back() {
      this._history.back();
    }
    historyGo(n = 0) {
      this._history.go(n);
    }
    getState() {
      return this._history.state;
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = S({
      token: e,
      factory: () => new e(),
      providedIn: "platform",
    });
  }
  return e;
})();
function ev(e, t) {
  return e
    ? t
      ? e.endsWith("/")
        ? t.startsWith("/")
          ? e + t.slice(1)
          : e + t
        : t.startsWith("/")
        ? e + t
        : `${e}/${t}`
      : e
    : t;
}
function Xm(e) {
  let t = e.search(/#|\?|$/);
  return e[t - 1] === "/" ? e.slice(0, t - 1) + e.slice(t) : e;
}
function wn(e) {
  return e && e[0] !== "?" ? `?${e}` : e;
}
var Ur = (() => {
    class e {
      historyGo(n) {
        throw new Error("");
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = S({ token: e, factory: () => g(nv), providedIn: "root" });
    }
    return e;
  })(),
  tv = new w(""),
  nv = (() => {
    class e extends Ur {
      _platformLocation;
      _baseHref;
      _removeListenerFns = [];
      constructor(n, r) {
        super(),
          (this._platformLocation = n),
          (this._baseHref =
            r ??
            this._platformLocation.getBaseHrefFromDOM() ??
            g(Y).location?.origin ??
            "");
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(n) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(n),
          this._platformLocation.onHashChange(n)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      prepareExternalUrl(n) {
        return ev(this._baseHref, n);
      }
      path(n = !1) {
        let r =
            this._platformLocation.pathname + wn(this._platformLocation.search),
          o = this._platformLocation.hash;
        return o && n ? `${r}${o}` : r;
      }
      pushState(n, r, o, i) {
        let s = this.prepareExternalUrl(o + wn(i));
        this._platformLocation.pushState(n, r, s);
      }
      replaceState(n, r, o, i) {
        let s = this.prepareExternalUrl(o + wn(i));
        this._platformLocation.replaceState(n, r, s);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(n = 0) {
        this._platformLocation.historyGo?.(n);
      }
      static ɵfac = function (r) {
        return new (r || e)(R(Fd), R(tv, 8));
      };
      static ɵprov = S({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  Gr = (() => {
    class e {
      _subject = new K();
      _basePath;
      _locationStrategy;
      _urlChangeListeners = [];
      _urlChangeSubscription = null;
      constructor(n) {
        this._locationStrategy = n;
        let r = this._locationStrategy.getBaseHref();
        (this._basePath = ZS(Xm(Qm(r)))),
          this._locationStrategy.onPopState((o) => {
            this._subject.next({
              url: this.path(!0),
              pop: !0,
              state: o.state,
              type: o.type,
            });
          });
      }
      ngOnDestroy() {
        this._urlChangeSubscription?.unsubscribe(),
          (this._urlChangeListeners = []);
      }
      path(n = !1) {
        return this.normalize(this._locationStrategy.path(n));
      }
      getState() {
        return this._locationStrategy.getState();
      }
      isCurrentPathEqualTo(n, r = "") {
        return this.path() == this.normalize(n + wn(r));
      }
      normalize(n) {
        return e.stripTrailingSlash(qS(this._basePath, Qm(n)));
      }
      prepareExternalUrl(n) {
        return (
          n && n[0] !== "/" && (n = "/" + n),
          this._locationStrategy.prepareExternalUrl(n)
        );
      }
      go(n, r = "", o = null) {
        this._locationStrategy.pushState(o, "", n, r),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(n + wn(r)), o);
      }
      replaceState(n, r = "", o = null) {
        this._locationStrategy.replaceState(o, "", n, r),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(n + wn(r)), o);
      }
      forward() {
        this._locationStrategy.forward();
      }
      back() {
        this._locationStrategy.back();
      }
      historyGo(n = 0) {
        this._locationStrategy.historyGo?.(n);
      }
      onUrlChange(n) {
        return (
          this._urlChangeListeners.push(n),
          (this._urlChangeSubscription ??= this.subscribe((r) => {
            this._notifyUrlChangeListeners(r.url, r.state);
          })),
          () => {
            let r = this._urlChangeListeners.indexOf(n);
            this._urlChangeListeners.splice(r, 1),
              this._urlChangeListeners.length === 0 &&
                (this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeSubscription = null));
          }
        );
      }
      _notifyUrlChangeListeners(n = "", r) {
        this._urlChangeListeners.forEach((o) => o(n, r));
      }
      subscribe(n, r, o) {
        return this._subject.subscribe({
          next: n,
          error: r ?? void 0,
          complete: o ?? void 0,
        });
      }
      static normalizeQueryParams = wn;
      static joinWithSlash = ev;
      static stripTrailingSlash = Xm;
      static ɵfac = function (r) {
        return new (r || e)(R(Ur));
      };
      static ɵprov = S({ token: e, factory: () => WS(), providedIn: "root" });
    }
    return e;
  })();
function WS() {
  return new Gr(R(Ur));
}
function qS(e, t) {
  if (!e || !t.startsWith(e)) return t;
  let n = t.substring(e.length);
  return n === "" || ["/", ";", "?", "#"].includes(n[0]) ? n : t;
}
function Qm(e) {
  return e.replace(/\/index.html$/, "");
}
function ZS(e) {
  if (new RegExp("^(https?:)?//").test(e)) {
    let [, n] = e.split(/\/\/[^\/]+/);
    return n;
  }
  return e;
}
var Oa = class {
    $implicit;
    ngForOf;
    index;
    count;
    constructor(t, n, r, o) {
      (this.$implicit = t),
        (this.ngForOf = n),
        (this.index = r),
        (this.count = o);
    }
    get first() {
      return this.index === 0;
    }
    get last() {
      return this.index === this.count - 1;
    }
    get even() {
      return this.index % 2 === 0;
    }
    get odd() {
      return !this.even;
    }
  },
  wt = (() => {
    class e {
      _viewContainer;
      _template;
      _differs;
      set ngForOf(n) {
        (this._ngForOf = n), (this._ngForOfDirty = !0);
      }
      set ngForTrackBy(n) {
        this._trackByFn = n;
      }
      get ngForTrackBy() {
        return this._trackByFn;
      }
      _ngForOf = null;
      _ngForOfDirty = !0;
      _differ = null;
      _trackByFn;
      constructor(n, r, o) {
        (this._viewContainer = n), (this._template = r), (this._differs = o);
      }
      set ngForTemplate(n) {
        n && (this._template = n);
      }
      ngDoCheck() {
        if (this._ngForOfDirty) {
          this._ngForOfDirty = !1;
          let n = this._ngForOf;
          !this._differ &&
            n &&
            (this._differ = this._differs.find(n).create(this.ngForTrackBy));
        }
        if (this._differ) {
          let n = this._differ.diff(this._ngForOf);
          n && this._applyChanges(n);
        }
      }
      _applyChanges(n) {
        let r = this._viewContainer;
        n.forEachOperation((o, i, s) => {
          if (o.previousIndex == null)
            r.createEmbeddedView(
              this._template,
              new Oa(o.item, this._ngForOf, -1, -1),
              s === null ? void 0 : s
            );
          else if (s == null) r.remove(i === null ? void 0 : i);
          else if (i !== null) {
            let a = r.get(i);
            r.move(a, s), rv(a, o);
          }
        });
        for (let o = 0, i = r.length; o < i; o++) {
          let a = r.get(o).context;
          (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
        }
        n.forEachIdentityChange((o) => {
          let i = r.get(o.currentIndex);
          rv(i, o);
        });
      }
      static ngTemplateContextGuard(n, r) {
        return !0;
      }
      static ɵfac = function (r) {
        return new (r || e)(ie(Zt), ie(_n), ie(xd));
      };
      static ɵdir = ct({
        type: e,
        selectors: [["", "ngFor", "", "ngForOf", ""]],
        inputs: {
          ngForOf: "ngForOf",
          ngForTrackBy: "ngForTrackBy",
          ngForTemplate: "ngForTemplate",
        },
      });
    }
    return e;
  })();
function rv(e, t) {
  e.context.$implicit = t.item;
}
var lt = (() => {
    class e {
      _viewContainer;
      _context = new Pa();
      _thenTemplateRef = null;
      _elseTemplateRef = null;
      _thenViewRef = null;
      _elseViewRef = null;
      constructor(n, r) {
        (this._viewContainer = n), (this._thenTemplateRef = r);
      }
      set ngIf(n) {
        (this._context.$implicit = this._context.ngIf = n), this._updateView();
      }
      set ngIfThen(n) {
        ov(n, !1),
          (this._thenTemplateRef = n),
          (this._thenViewRef = null),
          this._updateView();
      }
      set ngIfElse(n) {
        ov(n, !1),
          (this._elseTemplateRef = n),
          (this._elseViewRef = null),
          this._updateView();
      }
      _updateView() {
        this._context.$implicit
          ? this._thenViewRef ||
            (this._viewContainer.clear(),
            (this._elseViewRef = null),
            this._thenTemplateRef &&
              (this._thenViewRef = this._viewContainer.createEmbeddedView(
                this._thenTemplateRef,
                this._context
              )))
          : this._elseViewRef ||
            (this._viewContainer.clear(),
            (this._thenViewRef = null),
            this._elseTemplateRef &&
              (this._elseViewRef = this._viewContainer.createEmbeddedView(
                this._elseTemplateRef,
                this._context
              )));
      }
      static ngIfUseIfTypeGuard;
      static ngTemplateGuard_ngIf;
      static ngTemplateContextGuard(n, r) {
        return !0;
      }
      static ɵfac = function (r) {
        return new (r || e)(ie(Zt), ie(_n));
      };
      static ɵdir = ct({
        type: e,
        selectors: [["", "ngIf", ""]],
        inputs: { ngIf: "ngIf", ngIfThen: "ngIfThen", ngIfElse: "ngIfElse" },
      });
    }
    return e;
  })(),
  Pa = class {
    $implicit = null;
    ngIf = null;
  };
function ov(e, t) {
  if (e && !e.createEmbeddedView) throw new I(2020, !1);
}
function YS(e, t) {
  return new I(2100, !1);
}
var kd = class {
    createSubscription(t, n, r) {
      return et(() => t.subscribe({ next: n, error: r }));
    }
    dispose(t) {
      et(() => t.unsubscribe());
    }
  },
  Ld = class {
    createSubscription(t, n, r) {
      return (
        t.then(
          (o) => n?.(o),
          (o) => r?.(o)
        ),
        {
          unsubscribe: () => {
            (n = null), (r = null);
          },
        }
      );
    }
    dispose(t) {
      t.unsubscribe();
    }
  },
  XS = new Ld(),
  QS = new kd(),
  Jt = (() => {
    class e {
      _ref;
      _latestValue = null;
      markForCheckOnValueUpdate = !0;
      _subscription = null;
      _obj = null;
      _strategy = null;
      applicationErrorHandler = g(_e);
      constructor(n) {
        this._ref = n;
      }
      ngOnDestroy() {
        this._subscription && this._dispose(), (this._ref = null);
      }
      transform(n) {
        if (!this._obj) {
          if (n)
            try {
              (this.markForCheckOnValueUpdate = !1), this._subscribe(n);
            } finally {
              this.markForCheckOnValueUpdate = !0;
            }
          return this._latestValue;
        }
        return n !== this._obj
          ? (this._dispose(), this.transform(n))
          : this._latestValue;
      }
      _subscribe(n) {
        (this._obj = n),
          (this._strategy = this._selectStrategy(n)),
          (this._subscription = this._strategy.createSubscription(
            n,
            (r) => this._updateLatestValue(n, r),
            (r) => this.applicationErrorHandler(r)
          ));
      }
      _selectStrategy(n) {
        if (Yn(n)) return XS;
        if (wa(n)) return QS;
        throw YS(e, n);
      }
      _dispose() {
        this._strategy.dispose(this._subscription),
          (this._latestValue = null),
          (this._subscription = null),
          (this._obj = null);
      }
      _updateLatestValue(n, r) {
        n === this._obj &&
          ((this._latestValue = r),
          this.markForCheckOnValueUpdate && this._ref?.markForCheck());
      }
      static ɵfac = function (r) {
        return new (r || e)(ie(Sn, 16));
      };
      static ɵpipe = fd({ name: "async", type: e, pure: !1 });
    }
    return e;
  })();
function di(e, t) {
  t = encodeURIComponent(t);
  for (let n of e.split(";")) {
    let r = n.indexOf("="),
      [o, i] = r == -1 ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
    if (o.trim() === t) return decodeURIComponent(i);
  }
  return null;
}
var Kn = class {};
var sv = "browser";
var av = (e) => e.src,
  JS = new w("", { providedIn: "root", factory: () => av });
var iv = /^((\s*\d+w\s*(,|$)){1,})$/;
var ew = [1, 2],
  tw = 640;
var nw = 1920,
  rw = 1080;
var cv = (() => {
  class e {
    imageLoader = g(JS);
    config = ow(g(ga));
    renderer = g(Zn);
    imgElement = g(at).nativeElement;
    injector = g(Xe);
    lcpObserver;
    _renderedSrc = null;
    ngSrc;
    ngSrcset;
    sizes;
    width;
    height;
    decoding;
    loading;
    priority = !1;
    loaderParams;
    disableOptimizedSrcset = !1;
    fill = !1;
    placeholder;
    placeholderConfig;
    src;
    srcset;
    constructor() {}
    ngOnInit() {
      $r("NgOptimizedImage"),
        this.placeholder && this.removePlaceholderOnLoad(this.imgElement),
        this.setHostAttributes();
    }
    setHostAttributes() {
      this.fill
        ? (this.sizes ||= "100vw")
        : (this.setHostAttribute("width", this.width.toString()),
          this.setHostAttribute("height", this.height.toString())),
        this.setHostAttribute("loading", this.getLoadingBehavior()),
        this.setHostAttribute("fetchpriority", this.getFetchPriority()),
        this.setHostAttribute("decoding", this.getDecoding()),
        this.setHostAttribute("ng-img", "true");
      let n = this.updateSrcAndSrcset();
      this.sizes
        ? this.getLoadingBehavior() === "lazy"
          ? this.setHostAttribute("sizes", "auto, " + this.sizes)
          : this.setHostAttribute("sizes", this.sizes)
        : this.ngSrcset &&
          iv.test(this.ngSrcset) &&
          this.getLoadingBehavior() === "lazy" &&
          this.setHostAttribute("sizes", "auto, 100vw");
    }
    ngOnChanges(n) {
      if (n.ngSrc && !n.ngSrc.isFirstChange()) {
        let r = this._renderedSrc;
        this.updateSrcAndSrcset(!0);
      }
    }
    callImageLoader(n) {
      let r = n;
      return (
        this.loaderParams && (r.loaderParams = this.loaderParams),
        this.imageLoader(r)
      );
    }
    getLoadingBehavior() {
      return !this.priority && this.loading !== void 0
        ? this.loading
        : this.priority
        ? "eager"
        : "lazy";
    }
    getFetchPriority() {
      return this.priority ? "high" : "auto";
    }
    getDecoding() {
      return this.priority ? "sync" : this.decoding ?? "auto";
    }
    getRewrittenSrc() {
      if (!this._renderedSrc) {
        let n = { src: this.ngSrc };
        this._renderedSrc = this.callImageLoader(n);
      }
      return this._renderedSrc;
    }
    getRewrittenSrcset() {
      let n = iv.test(this.ngSrcset);
      return this.ngSrcset
        .split(",")
        .filter((o) => o !== "")
        .map((o) => {
          o = o.trim();
          let i = n ? parseFloat(o) : parseFloat(o) * this.width;
          return `${this.callImageLoader({ src: this.ngSrc, width: i })} ${o}`;
        })
        .join(", ");
    }
    getAutomaticSrcset() {
      return this.sizes ? this.getResponsiveSrcset() : this.getFixedSrcset();
    }
    getResponsiveSrcset() {
      let { breakpoints: n } = this.config,
        r = n;
      return (
        this.sizes?.trim() === "100vw" && (r = n.filter((i) => i >= tw)),
        r
          .map(
            (i) =>
              `${this.callImageLoader({ src: this.ngSrc, width: i })} ${i}w`
          )
          .join(", ")
      );
    }
    updateSrcAndSrcset(n = !1) {
      n && (this._renderedSrc = null);
      let r = this.getRewrittenSrc();
      this.setHostAttribute("src", r);
      let o;
      return (
        this.ngSrcset
          ? (o = this.getRewrittenSrcset())
          : this.shouldGenerateAutomaticSrcset() &&
            (o = this.getAutomaticSrcset()),
        o && this.setHostAttribute("srcset", o),
        o
      );
    }
    getFixedSrcset() {
      return ew
        .map(
          (r) =>
            `${this.callImageLoader({
              src: this.ngSrc,
              width: this.width * r,
            })} ${r}x`
        )
        .join(", ");
    }
    shouldGenerateAutomaticSrcset() {
      let n = !1;
      return (
        this.sizes || (n = this.width > nw || this.height > rw),
        !this.disableOptimizedSrcset &&
          !this.srcset &&
          this.imageLoader !== av &&
          !n
      );
    }
    generatePlaceholder(n) {
      let { placeholderResolution: r } = this.config;
      return n === !0
        ? `url(${this.callImageLoader({
            src: this.ngSrc,
            width: r,
            isPlaceholder: !0,
          })})`
        : typeof n == "string"
        ? `url(${n})`
        : null;
    }
    shouldBlurPlaceholder(n) {
      return !n || !n.hasOwnProperty("blur") ? !0 : !!n.blur;
    }
    removePlaceholderOnLoad(n) {
      let r = () => {
          let s = this.injector.get(Sn);
          o(), i(), (this.placeholder = !1), s.markForCheck();
        },
        o = this.renderer.listen(n, "load", r),
        i = this.renderer.listen(n, "error", r);
      iw(n, r);
    }
    setHostAttribute(n, r) {
      this.renderer.setAttribute(this.imgElement, n, r);
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵdir = ct({
      type: e,
      selectors: [["img", "ngSrc", ""]],
      hostVars: 18,
      hostBindings: function (r, o) {
        r & 2 &&
          Na("position", o.fill ? "absolute" : null)(
            "width",
            o.fill ? "100%" : null
          )("height", o.fill ? "100%" : null)("inset", o.fill ? "0" : null)(
            "background-size",
            o.placeholder ? "cover" : null
          )("background-position", o.placeholder ? "50% 50%" : null)(
            "background-repeat",
            o.placeholder ? "no-repeat" : null
          )(
            "background-image",
            o.placeholder ? o.generatePlaceholder(o.placeholder) : null
          )(
            "filter",
            o.placeholder && o.shouldBlurPlaceholder(o.placeholderConfig)
              ? "blur(15px)"
              : null
          );
      },
      inputs: {
        ngSrc: [2, "ngSrc", "ngSrc", sw],
        ngSrcset: "ngSrcset",
        sizes: "sizes",
        width: [2, "width", "width", Od],
        height: [2, "height", "height", Od],
        decoding: "decoding",
        loading: "loading",
        priority: [2, "priority", "priority", Qt],
        loaderParams: "loaderParams",
        disableOptimizedSrcset: [
          2,
          "disableOptimizedSrcset",
          "disableOptimizedSrcset",
          Qt,
        ],
        fill: [2, "fill", "fill", Qt],
        placeholder: [2, "placeholder", "placeholder", aw],
        placeholderConfig: "placeholderConfig",
        src: "src",
        srcset: "srcset",
      },
      features: [qt],
    });
  }
  return e;
})();
function ow(e) {
  let t = {};
  return (
    e.breakpoints && (t.breakpoints = e.breakpoints.sort((n, r) => n - r)),
    Object.assign({}, ha, e, t)
  );
}
function iw(e, t) {
  e.complete && e.naturalWidth && t();
}
function sw(e) {
  return typeof e == "string" ? e : jr(e);
}
function aw(e) {
  return typeof e == "string" && e !== "true" && e !== "false" && e !== ""
    ? e
    : Qt(e);
}
var fi = class {
    _doc;
    constructor(t) {
      this._doc = t;
    }
    manager;
  },
  Fa = (() => {
    class e extends fi {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return !0;
      }
      addEventListener(n, r, o, i) {
        return (
          n.addEventListener(r, o, i),
          () => this.removeEventListener(n, r, o, i)
        );
      }
      removeEventListener(n, r, o, i) {
        return n.removeEventListener(r, o, i);
      }
      static ɵfac = function (r) {
        return new (r || e)(R(Y));
      };
      static ɵprov = S({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  La = new w(""),
  Hd = (() => {
    class e {
      _zone;
      _plugins;
      _eventNameToPlugin = new Map();
      constructor(n, r) {
        (this._zone = r),
          n.forEach((s) => {
            s.manager = this;
          });
        let o = n.filter((s) => !(s instanceof Fa));
        this._plugins = o.slice().reverse();
        let i = n.find((s) => s instanceof Fa);
        i && this._plugins.push(i);
      }
      addEventListener(n, r, o, i) {
        return this._findPluginFor(r).addEventListener(n, r, o, i);
      }
      getZone() {
        return this._zone;
      }
      _findPluginFor(n) {
        let r = this._eventNameToPlugin.get(n);
        if (r) return r;
        if (((r = this._plugins.find((i) => i.supports(n))), !r))
          throw new I(5101, !1);
        return this._eventNameToPlugin.set(n, r), r;
      }
      static ɵfac = function (r) {
        return new (r || e)(R(La), R(oe));
      };
      static ɵprov = S({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  jd = "ng-app-id";
function uv(e) {
  for (let t of e) t.remove();
}
function lv(e, t) {
  let n = t.createElement("style");
  return (n.textContent = e), n;
}
function uw(e, t, n, r) {
  let o = e.head?.querySelectorAll(`style[${jd}="${t}"],link[${jd}="${t}"]`);
  if (o)
    for (let i of o)
      i.removeAttribute(jd),
        i instanceof HTMLLinkElement
          ? r.set(i.href.slice(i.href.lastIndexOf("/") + 1), {
              usage: 0,
              elements: [i],
            })
          : i.textContent && n.set(i.textContent, { usage: 0, elements: [i] });
}
function Vd(e, t) {
  let n = t.createElement("link");
  return n.setAttribute("rel", "stylesheet"), n.setAttribute("href", e), n;
}
var Ud = (() => {
    class e {
      doc;
      appId;
      nonce;
      inline = new Map();
      external = new Map();
      hosts = new Set();
      constructor(n, r, o, i = {}) {
        (this.doc = n),
          (this.appId = r),
          (this.nonce = o),
          uw(n, r, this.inline, this.external),
          this.hosts.add(n.head);
      }
      addStyles(n, r) {
        for (let o of n) this.addUsage(o, this.inline, lv);
        r?.forEach((o) => this.addUsage(o, this.external, Vd));
      }
      removeStyles(n, r) {
        for (let o of n) this.removeUsage(o, this.inline);
        r?.forEach((o) => this.removeUsage(o, this.external));
      }
      addUsage(n, r, o) {
        let i = r.get(n);
        i
          ? i.usage++
          : r.set(n, {
              usage: 1,
              elements: [...this.hosts].map((s) =>
                this.addElement(s, o(n, this.doc))
              ),
            });
      }
      removeUsage(n, r) {
        let o = r.get(n);
        o && (o.usage--, o.usage <= 0 && (uv(o.elements), r.delete(n)));
      }
      ngOnDestroy() {
        for (let [, { elements: n }] of [...this.inline, ...this.external])
          uv(n);
        this.hosts.clear();
      }
      addHost(n) {
        this.hosts.add(n);
        for (let [r, { elements: o }] of this.inline)
          o.push(this.addElement(n, lv(r, this.doc)));
        for (let [r, { elements: o }] of this.external)
          o.push(this.addElement(n, Vd(r, this.doc)));
      }
      removeHost(n) {
        this.hosts.delete(n);
      }
      addElement(n, r) {
        return (
          this.nonce && r.setAttribute("nonce", this.nonce), n.appendChild(r)
        );
      }
      static ɵfac = function (r) {
        return new (r || e)(R(Y), R(da), R(pa, 8), R(Lr));
      };
      static ɵprov = S({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  $d = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
    math: "http://www.w3.org/1998/Math/MathML",
  },
  Gd = /%COMP%/g;
var fv = "%COMP%",
  lw = `_nghost-${fv}`,
  dw = `_ngcontent-${fv}`,
  fw = !0,
  pw = new w("", { providedIn: "root", factory: () => fw });
function hw(e) {
  return dw.replace(Gd, e);
}
function gw(e) {
  return lw.replace(Gd, e);
}
function pv(e, t) {
  return t.map((n) => n.replace(Gd, e));
}
var zd = (() => {
    class e {
      eventManager;
      sharedStylesHost;
      appId;
      removeStylesOnCompDestroy;
      doc;
      platformId;
      ngZone;
      nonce;
      tracingService;
      rendererByCompId = new Map();
      defaultRenderer;
      platformIsServer;
      constructor(n, r, o, i, s, a, c, u = null, l = null) {
        (this.eventManager = n),
          (this.sharedStylesHost = r),
          (this.appId = o),
          (this.removeStylesOnCompDestroy = i),
          (this.doc = s),
          (this.platformId = a),
          (this.ngZone = c),
          (this.nonce = u),
          (this.tracingService = l),
          (this.platformIsServer = !1),
          (this.defaultRenderer = new pi(
            n,
            s,
            c,
            this.platformIsServer,
            this.tracingService
          ));
      }
      createRenderer(n, r) {
        if (!n || !r) return this.defaultRenderer;
        let o = this.getOrCreateRenderer(n, r);
        return (
          o instanceof ka
            ? o.applyToHost(n)
            : o instanceof hi && o.applyStyles(),
          o
        );
      }
      getOrCreateRenderer(n, r) {
        let o = this.rendererByCompId,
          i = o.get(r.id);
        if (!i) {
          let s = this.doc,
            a = this.ngZone,
            c = this.eventManager,
            u = this.sharedStylesHost,
            l = this.removeStylesOnCompDestroy,
            d = this.platformIsServer,
            p = this.tracingService;
          switch (r.encapsulation) {
            case Wt.Emulated:
              i = new ka(c, u, r, this.appId, l, s, a, d, p);
              break;
            case Wt.ShadowDom:
              return new Bd(c, u, n, r, s, a, this.nonce, d, p);
            default:
              i = new hi(c, u, r, l, s, a, d, p);
              break;
          }
          o.set(r.id, i);
        }
        return i;
      }
      ngOnDestroy() {
        this.rendererByCompId.clear();
      }
      componentReplaced(n) {
        this.rendererByCompId.delete(n);
      }
      static ɵfac = function (r) {
        return new (r || e)(
          R(Hd),
          R(Ud),
          R(da),
          R(pw),
          R(Y),
          R(Lr),
          R(oe),
          R(pa),
          R(Ko, 8)
        );
      };
      static ɵprov = S({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  pi = class {
    eventManager;
    doc;
    ngZone;
    platformIsServer;
    tracingService;
    data = Object.create(null);
    throwOnSyntheticProps = !0;
    constructor(t, n, r, o, i) {
      (this.eventManager = t),
        (this.doc = n),
        (this.ngZone = r),
        (this.platformIsServer = o),
        (this.tracingService = i);
    }
    destroy() {}
    destroyNode = null;
    createElement(t, n) {
      return n
        ? this.doc.createElementNS($d[n] || n, t)
        : this.doc.createElement(t);
    }
    createComment(t) {
      return this.doc.createComment(t);
    }
    createText(t) {
      return this.doc.createTextNode(t);
    }
    appendChild(t, n) {
      (dv(t) ? t.content : t).appendChild(n);
    }
    insertBefore(t, n, r) {
      t && (dv(t) ? t.content : t).insertBefore(n, r);
    }
    removeChild(t, n) {
      n.remove();
    }
    selectRootElement(t, n) {
      let r = typeof t == "string" ? this.doc.querySelector(t) : t;
      if (!r) throw new I(-5104, !1);
      return n || (r.textContent = ""), r;
    }
    parentNode(t) {
      return t.parentNode;
    }
    nextSibling(t) {
      return t.nextSibling;
    }
    setAttribute(t, n, r, o) {
      if (o) {
        n = o + ":" + n;
        let i = $d[o];
        i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
      } else t.setAttribute(n, r);
    }
    removeAttribute(t, n, r) {
      if (r) {
        let o = $d[r];
        o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
      } else t.removeAttribute(n);
    }
    addClass(t, n) {
      t.classList.add(n);
    }
    removeClass(t, n) {
      t.classList.remove(n);
    }
    setStyle(t, n, r, o) {
      o & (Ct.DashCase | Ct.Important)
        ? t.style.setProperty(n, r, o & Ct.Important ? "important" : "")
        : (t.style[n] = r);
    }
    removeStyle(t, n, r) {
      r & Ct.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
    }
    setProperty(t, n, r) {
      t != null && (t[n] = r);
    }
    setValue(t, n) {
      t.nodeValue = n;
    }
    listen(t, n, r, o) {
      if (
        typeof t == "string" &&
        ((t = Kt().getGlobalEventTarget(this.doc, t)), !t)
      )
        throw new I(5102, !1);
      let i = this.decoratePreventDefault(r);
      return (
        this.tracingService?.wrapEventListener &&
          (i = this.tracingService.wrapEventListener(t, n, i)),
        this.eventManager.addEventListener(t, n, i, o)
      );
    }
    decoratePreventDefault(t) {
      return (n) => {
        if (n === "__ngUnwrap__") return t;
        t(n) === !1 && n.preventDefault();
      };
    }
  };
function dv(e) {
  return e.tagName === "TEMPLATE" && e.content !== void 0;
}
var Bd = class extends pi {
    sharedStylesHost;
    hostEl;
    shadowRoot;
    constructor(t, n, r, o, i, s, a, c, u) {
      super(t, i, s, c, u),
        (this.sharedStylesHost = n),
        (this.hostEl = r),
        (this.shadowRoot = r.attachShadow({ mode: "open" })),
        this.sharedStylesHost.addHost(this.shadowRoot);
      let l = o.styles;
      l = pv(o.id, l);
      for (let p of l) {
        let f = document.createElement("style");
        a && f.setAttribute("nonce", a),
          (f.textContent = p),
          this.shadowRoot.appendChild(f);
      }
      let d = o.getExternalStyles?.();
      if (d)
        for (let p of d) {
          let f = Vd(p, i);
          a && f.setAttribute("nonce", a), this.shadowRoot.appendChild(f);
        }
    }
    nodeOrShadowRoot(t) {
      return t === this.hostEl ? this.shadowRoot : t;
    }
    appendChild(t, n) {
      return super.appendChild(this.nodeOrShadowRoot(t), n);
    }
    insertBefore(t, n, r) {
      return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
    }
    removeChild(t, n) {
      return super.removeChild(null, n);
    }
    parentNode(t) {
      return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)));
    }
    destroy() {
      this.sharedStylesHost.removeHost(this.shadowRoot);
    }
  },
  hi = class extends pi {
    sharedStylesHost;
    removeStylesOnCompDestroy;
    styles;
    styleUrls;
    constructor(t, n, r, o, i, s, a, c, u) {
      super(t, i, s, a, c),
        (this.sharedStylesHost = n),
        (this.removeStylesOnCompDestroy = o);
      let l = r.styles;
      (this.styles = u ? pv(u, l) : l),
        (this.styleUrls = r.getExternalStyles?.(u));
    }
    applyStyles() {
      this.sharedStylesHost.addStyles(this.styles, this.styleUrls);
    }
    destroy() {
      this.removeStylesOnCompDestroy &&
        xr.size === 0 &&
        this.sharedStylesHost.removeStyles(this.styles, this.styleUrls);
    }
  },
  ka = class extends hi {
    contentAttr;
    hostAttr;
    constructor(t, n, r, o, i, s, a, c, u) {
      let l = o + "-" + r.id;
      super(t, n, r, i, s, a, c, u, l),
        (this.contentAttr = hw(l)),
        (this.hostAttr = gw(l));
    }
    applyToHost(t) {
      this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
    }
    createElement(t, n) {
      let r = super.createElement(t, n);
      return super.setAttribute(r, this.contentAttr, ""), r;
    }
  };
var ja = class e extends li {
    supportsDOMEvents = !0;
    static makeCurrent() {
      Pd(new e());
    }
    onAndCancel(t, n, r, o) {
      return (
        t.addEventListener(n, r, o),
        () => {
          t.removeEventListener(n, r, o);
        }
      );
    }
    dispatchEvent(t, n) {
      t.dispatchEvent(n);
    }
    remove(t) {
      t.remove();
    }
    createElement(t, n) {
      return (n = n || this.getDefaultDocument()), n.createElement(t);
    }
    createHtmlDocument() {
      return document.implementation.createHTMLDocument("fakeTitle");
    }
    getDefaultDocument() {
      return document;
    }
    isElementNode(t) {
      return t.nodeType === Node.ELEMENT_NODE;
    }
    isShadowRoot(t) {
      return t instanceof DocumentFragment;
    }
    getGlobalEventTarget(t, n) {
      return n === "window"
        ? window
        : n === "document"
        ? t
        : n === "body"
        ? t.body
        : null;
    }
    getBaseHref(t) {
      let n = mw();
      return n == null ? null : vw(n);
    }
    resetBaseElement() {
      gi = null;
    }
    getUserAgent() {
      return window.navigator.userAgent;
    }
    getCookie(t) {
      return di(document.cookie, t);
    }
  },
  gi = null;
function mw() {
  return (
    (gi = gi || document.head.querySelector("base")),
    gi ? gi.getAttribute("href") : null
  );
}
function vw(e) {
  return new URL(e, document.baseURI).pathname;
}
var yw = (() => {
    class e {
      build() {
        return new XMLHttpRequest();
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = S({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  hv = ["alt", "control", "meta", "shift"],
  Ew = {
    "\b": "Backspace",
    "	": "Tab",
    "\x7F": "Delete",
    "\x1B": "Escape",
    Del: "Delete",
    Esc: "Escape",
    Left: "ArrowLeft",
    Right: "ArrowRight",
    Up: "ArrowUp",
    Down: "ArrowDown",
    Menu: "ContextMenu",
    Scroll: "ScrollLock",
    Win: "OS",
  },
  _w = {
    alt: (e) => e.altKey,
    control: (e) => e.ctrlKey,
    meta: (e) => e.metaKey,
    shift: (e) => e.shiftKey,
  },
  gv = (() => {
    class e extends fi {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return e.parseEventName(n) != null;
      }
      addEventListener(n, r, o, i) {
        let s = e.parseEventName(r),
          a = e.eventCallback(s.fullKey, o, this.manager.getZone());
        return this.manager
          .getZone()
          .runOutsideAngular(() => Kt().onAndCancel(n, s.domEventName, a, i));
      }
      static parseEventName(n) {
        let r = n.toLowerCase().split("."),
          o = r.shift();
        if (r.length === 0 || !(o === "keydown" || o === "keyup")) return null;
        let i = e._normalizeKey(r.pop()),
          s = "",
          a = r.indexOf("code");
        if (
          (a > -1 && (r.splice(a, 1), (s = "code.")),
          hv.forEach((u) => {
            let l = r.indexOf(u);
            l > -1 && (r.splice(l, 1), (s += u + "."));
          }),
          (s += i),
          r.length != 0 || i.length === 0)
        )
          return null;
        let c = {};
        return (c.domEventName = o), (c.fullKey = s), c;
      }
      static matchEventFullKeyCode(n, r) {
        let o = Ew[n.key] || n.key,
          i = "";
        return (
          r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
          o == null || !o
            ? !1
            : ((o = o.toLowerCase()),
              o === " " ? (o = "space") : o === "." && (o = "dot"),
              hv.forEach((s) => {
                if (s !== o) {
                  let a = _w[s];
                  a(n) && (i += s + ".");
                }
              }),
              (i += o),
              i === r)
        );
      }
      static eventCallback(n, r, o) {
        return (i) => {
          e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
        };
      }
      static _normalizeKey(n) {
        return n === "esc" ? "escape" : n;
      }
      static ɵfac = function (r) {
        return new (r || e)(R(Y));
      };
      static ɵprov = S({ token: e, factory: e.ɵfac });
    }
    return e;
  })();
function Wd(e, t, n) {
  let r = C({ rootComponent: e, platformRef: n?.platformRef }, Dw(t));
  return Ym(r);
}
function Dw(e) {
  return {
    appProviders: [...Tw, ...(e?.providers ?? [])],
    platformProviders: ww,
  };
}
function Cw() {
  ja.makeCurrent();
}
function Iw() {
  return new ht();
}
function Sw() {
  return Ol(document), document;
}
var ww = [
  { provide: Lr, useValue: sv },
  { provide: fa, useValue: Cw, multi: !0 },
  { provide: Y, useFactory: Sw },
];
var Tw = [
  { provide: So, useValue: "root" },
  { provide: ht, useFactory: Iw },
  { provide: La, useClass: Fa, multi: !0, deps: [Y] },
  { provide: La, useClass: gv, multi: !0, deps: [Y] },
  zd,
  Ud,
  Hd,
  { provide: zn, useExisting: zd },
  { provide: Kn, useClass: yw },
  [],
];
var Wr = class {},
  qr = class {},
  bt = class e {
    headers;
    normalizedNames = new Map();
    lazyInit;
    lazyUpdate = null;
    constructor(t) {
      t
        ? typeof t == "string"
          ? (this.lazyInit = () => {
              (this.headers = new Map()),
                t
                  .split(
                    `
`
                  )
                  .forEach((n) => {
                    let r = n.indexOf(":");
                    if (r > 0) {
                      let o = n.slice(0, r),
                        i = n.slice(r + 1).trim();
                      this.addHeaderEntry(o, i);
                    }
                  });
            })
          : typeof Headers < "u" && t instanceof Headers
          ? ((this.headers = new Map()),
            t.forEach((n, r) => {
              this.addHeaderEntry(r, n);
            }))
          : (this.lazyInit = () => {
              (this.headers = new Map()),
                Object.entries(t).forEach(([n, r]) => {
                  this.setHeaderEntries(n, r);
                });
            })
        : (this.headers = new Map());
    }
    has(t) {
      return this.init(), this.headers.has(t.toLowerCase());
    }
    get(t) {
      this.init();
      let n = this.headers.get(t.toLowerCase());
      return n && n.length > 0 ? n[0] : null;
    }
    keys() {
      return this.init(), Array.from(this.normalizedNames.values());
    }
    getAll(t) {
      return this.init(), this.headers.get(t.toLowerCase()) || null;
    }
    append(t, n) {
      return this.clone({ name: t, value: n, op: "a" });
    }
    set(t, n) {
      return this.clone({ name: t, value: n, op: "s" });
    }
    delete(t, n) {
      return this.clone({ name: t, value: n, op: "d" });
    }
    maybeSetNormalizedName(t, n) {
      this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
    }
    init() {
      this.lazyInit &&
        (this.lazyInit instanceof e
          ? this.copyFrom(this.lazyInit)
          : this.lazyInit(),
        (this.lazyInit = null),
        this.lazyUpdate &&
          (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
          (this.lazyUpdate = null)));
    }
    copyFrom(t) {
      t.init(),
        Array.from(t.headers.keys()).forEach((n) => {
          this.headers.set(n, t.headers.get(n)),
            this.normalizedNames.set(n, t.normalizedNames.get(n));
        });
    }
    clone(t) {
      let n = new e();
      return (
        (n.lazyInit =
          this.lazyInit && this.lazyInit instanceof e ? this.lazyInit : this),
        (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
        n
      );
    }
    applyUpdate(t) {
      let n = t.name.toLowerCase();
      switch (t.op) {
        case "a":
        case "s":
          let r = t.value;
          if ((typeof r == "string" && (r = [r]), r.length === 0)) return;
          this.maybeSetNormalizedName(t.name, n);
          let o = (t.op === "a" ? this.headers.get(n) : void 0) || [];
          o.push(...r), this.headers.set(n, o);
          break;
        case "d":
          let i = t.value;
          if (!i) this.headers.delete(n), this.normalizedNames.delete(n);
          else {
            let s = this.headers.get(n);
            if (!s) return;
            (s = s.filter((a) => i.indexOf(a) === -1)),
              s.length === 0
                ? (this.headers.delete(n), this.normalizedNames.delete(n))
                : this.headers.set(n, s);
          }
          break;
      }
    }
    addHeaderEntry(t, n) {
      let r = t.toLowerCase();
      this.maybeSetNormalizedName(t, r),
        this.headers.has(r)
          ? this.headers.get(r).push(n)
          : this.headers.set(r, [n]);
    }
    setHeaderEntries(t, n) {
      let r = (Array.isArray(n) ? n : [n]).map((i) => i.toString()),
        o = t.toLowerCase();
      this.headers.set(o, r), this.maybeSetNormalizedName(t, o);
    }
    forEach(t) {
      this.init(),
        Array.from(this.normalizedNames.keys()).forEach((n) =>
          t(this.normalizedNames.get(n), this.headers.get(n))
        );
    }
  };
var Ba = class {
  encodeKey(t) {
    return mv(t);
  }
  encodeValue(t) {
    return mv(t);
  }
  decodeKey(t) {
    return decodeURIComponent(t);
  }
  decodeValue(t) {
    return decodeURIComponent(t);
  }
};
function bw(e, t) {
  let n = new Map();
  return (
    e.length > 0 &&
      e
        .replace(/^\?/, "")
        .split("&")
        .forEach((o) => {
          let i = o.indexOf("="),
            [s, a] =
              i == -1
                ? [t.decodeKey(o), ""]
                : [t.decodeKey(o.slice(0, i)), t.decodeValue(o.slice(i + 1))],
            c = n.get(s) || [];
          c.push(a), n.set(s, c);
        }),
    n
  );
}
var Mw = /%(\d[a-f0-9])/gi,
  Nw = {
    40: "@",
    "3A": ":",
    24: "$",
    "2C": ",",
    "3B": ";",
    "3D": "=",
    "3F": "?",
    "2F": "/",
  };
function mv(e) {
  return encodeURIComponent(e).replace(Mw, (t, n) => Nw[n] ?? t);
}
function $a(e) {
  return `${e}`;
}
var en = class e {
  map;
  encoder;
  updates = null;
  cloneFrom = null;
  constructor(t = {}) {
    if (((this.encoder = t.encoder || new Ba()), t.fromString)) {
      if (t.fromObject) throw new I(2805, !1);
      this.map = bw(t.fromString, this.encoder);
    } else
      t.fromObject
        ? ((this.map = new Map()),
          Object.keys(t.fromObject).forEach((n) => {
            let r = t.fromObject[n],
              o = Array.isArray(r) ? r.map($a) : [$a(r)];
            this.map.set(n, o);
          }))
        : (this.map = null);
  }
  has(t) {
    return this.init(), this.map.has(t);
  }
  get(t) {
    this.init();
    let n = this.map.get(t);
    return n ? n[0] : null;
  }
  getAll(t) {
    return this.init(), this.map.get(t) || null;
  }
  keys() {
    return this.init(), Array.from(this.map.keys());
  }
  append(t, n) {
    return this.clone({ param: t, value: n, op: "a" });
  }
  appendAll(t) {
    let n = [];
    return (
      Object.keys(t).forEach((r) => {
        let o = t[r];
        Array.isArray(o)
          ? o.forEach((i) => {
              n.push({ param: r, value: i, op: "a" });
            })
          : n.push({ param: r, value: o, op: "a" });
      }),
      this.clone(n)
    );
  }
  set(t, n) {
    return this.clone({ param: t, value: n, op: "s" });
  }
  delete(t, n) {
    return this.clone({ param: t, value: n, op: "d" });
  }
  toString() {
    return (
      this.init(),
      this.keys()
        .map((t) => {
          let n = this.encoder.encodeKey(t);
          return this.map
            .get(t)
            .map((r) => n + "=" + this.encoder.encodeValue(r))
            .join("&");
        })
        .filter((t) => t !== "")
        .join("&")
    );
  }
  clone(t) {
    let n = new e({ encoder: this.encoder });
    return (
      (n.cloneFrom = this.cloneFrom || this),
      (n.updates = (this.updates || []).concat(t)),
      n
    );
  }
  init() {
    this.map === null && (this.map = new Map()),
      this.cloneFrom !== null &&
        (this.cloneFrom.init(),
        this.cloneFrom
          .keys()
          .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
        this.updates.forEach((t) => {
          switch (t.op) {
            case "a":
            case "s":
              let n = (t.op === "a" ? this.map.get(t.param) : void 0) || [];
              n.push($a(t.value)), this.map.set(t.param, n);
              break;
            case "d":
              if (t.value !== void 0) {
                let r = this.map.get(t.param) || [],
                  o = r.indexOf($a(t.value));
                o !== -1 && r.splice(o, 1),
                  r.length > 0
                    ? this.map.set(t.param, r)
                    : this.map.delete(t.param);
              } else {
                this.map.delete(t.param);
                break;
              }
          }
        }),
        (this.cloneFrom = this.updates = null));
  }
};
var Ha = class {
  map = new Map();
  set(t, n) {
    return this.map.set(t, n), this;
  }
  get(t) {
    return (
      this.map.has(t) || this.map.set(t, t.defaultValue()), this.map.get(t)
    );
  }
  delete(t) {
    return this.map.delete(t), this;
  }
  has(t) {
    return this.map.has(t);
  }
  keys() {
    return this.map.keys();
  }
};
function Rw(e) {
  switch (e) {
    case "DELETE":
    case "GET":
    case "HEAD":
    case "OPTIONS":
    case "JSONP":
      return !1;
    default:
      return !0;
  }
}
function vv(e) {
  return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
}
function yv(e) {
  return typeof Blob < "u" && e instanceof Blob;
}
function Ev(e) {
  return typeof FormData < "u" && e instanceof FormData;
}
function Aw(e) {
  return typeof URLSearchParams < "u" && e instanceof URLSearchParams;
}
var mi = "Content-Type",
  Ua = "Accept",
  Qd = "X-Request-URL",
  Dv = "text/plain",
  Cv = "application/json",
  Iv = `${Cv}, ${Dv}, */*`,
  zr = class e {
    url;
    body = null;
    headers;
    context;
    reportProgress = !1;
    withCredentials = !1;
    credentials;
    keepalive = !1;
    cache;
    priority;
    mode;
    redirect;
    referrer;
    integrity;
    responseType = "json";
    method;
    params;
    urlWithParams;
    transferCache;
    timeout;
    constructor(t, n, r, o) {
      (this.url = n), (this.method = t.toUpperCase());
      let i;
      if (
        (Rw(this.method) || o
          ? ((this.body = r !== void 0 ? r : null), (i = o))
          : (i = r),
        i)
      ) {
        if (
          ((this.reportProgress = !!i.reportProgress),
          (this.withCredentials = !!i.withCredentials),
          (this.keepalive = !!i.keepalive),
          i.responseType && (this.responseType = i.responseType),
          i.headers && (this.headers = i.headers),
          i.context && (this.context = i.context),
          i.params && (this.params = i.params),
          i.priority && (this.priority = i.priority),
          i.cache && (this.cache = i.cache),
          i.credentials && (this.credentials = i.credentials),
          typeof i.timeout == "number")
        ) {
          if (i.timeout < 1 || !Number.isInteger(i.timeout))
            throw new I(2822, "");
          this.timeout = i.timeout;
        }
        i.mode && (this.mode = i.mode),
          i.redirect && (this.redirect = i.redirect),
          i.integrity && (this.integrity = i.integrity),
          i.referrer && (this.referrer = i.referrer),
          (this.transferCache = i.transferCache);
      }
      if (
        ((this.headers ??= new bt()), (this.context ??= new Ha()), !this.params)
      )
        (this.params = new en()), (this.urlWithParams = n);
      else {
        let s = this.params.toString();
        if (s.length === 0) this.urlWithParams = n;
        else {
          let a = n.indexOf("?"),
            c = a === -1 ? "?" : a < n.length - 1 ? "&" : "";
          this.urlWithParams = n + c + s;
        }
      }
    }
    serializeBody() {
      return this.body === null
        ? null
        : typeof this.body == "string" ||
          vv(this.body) ||
          yv(this.body) ||
          Ev(this.body) ||
          Aw(this.body)
        ? this.body
        : this.body instanceof en
        ? this.body.toString()
        : typeof this.body == "object" ||
          typeof this.body == "boolean" ||
          Array.isArray(this.body)
        ? JSON.stringify(this.body)
        : this.body.toString();
    }
    detectContentTypeHeader() {
      return this.body === null || Ev(this.body)
        ? null
        : yv(this.body)
        ? this.body.type || null
        : vv(this.body)
        ? null
        : typeof this.body == "string"
        ? Dv
        : this.body instanceof en
        ? "application/x-www-form-urlencoded;charset=UTF-8"
        : typeof this.body == "object" ||
          typeof this.body == "number" ||
          typeof this.body == "boolean"
        ? Cv
        : null;
    }
    clone(t = {}) {
      let n = t.method || this.method,
        r = t.url || this.url,
        o = t.responseType || this.responseType,
        i = t.keepalive ?? this.keepalive,
        s = t.priority || this.priority,
        a = t.cache || this.cache,
        c = t.mode || this.mode,
        u = t.redirect || this.redirect,
        l = t.credentials || this.credentials,
        d = t.referrer || this.referrer,
        p = t.integrity || this.integrity,
        f = t.transferCache ?? this.transferCache,
        v = t.timeout ?? this.timeout,
        E = t.body !== void 0 ? t.body : this.body,
        _ = t.withCredentials ?? this.withCredentials,
        y = t.reportProgress ?? this.reportProgress,
        U = t.headers || this.headers,
        se = t.params || this.params,
        Q = t.context ?? this.context;
      return (
        t.setHeaders !== void 0 &&
          (U = Object.keys(t.setHeaders).reduce(
            (Ce, Be) => Ce.set(Be, t.setHeaders[Be]),
            U
          )),
        t.setParams &&
          (se = Object.keys(t.setParams).reduce(
            (Ce, Be) => Ce.set(Be, t.setParams[Be]),
            se
          )),
        new e(n, r, E, {
          params: se,
          headers: U,
          context: Q,
          reportProgress: y,
          responseType: o,
          withCredentials: _,
          transferCache: f,
          keepalive: i,
          cache: a,
          priority: s,
          timeout: v,
          mode: c,
          redirect: u,
          credentials: l,
          referrer: d,
          integrity: p,
        })
      );
    }
  },
  tn = (function (e) {
    return (
      (e[(e.Sent = 0)] = "Sent"),
      (e[(e.UploadProgress = 1)] = "UploadProgress"),
      (e[(e.ResponseHeader = 2)] = "ResponseHeader"),
      (e[(e.DownloadProgress = 3)] = "DownloadProgress"),
      (e[(e.Response = 4)] = "Response"),
      (e[(e.User = 5)] = "User"),
      e
    );
  })(tn || {}),
  Zr = class {
    headers;
    status;
    statusText;
    url;
    ok;
    type;
    redirected;
    constructor(t, n = 200, r = "OK") {
      (this.headers = t.headers || new bt()),
        (this.status = t.status !== void 0 ? t.status : n),
        (this.statusText = t.statusText || r),
        (this.url = t.url || null),
        (this.redirected = t.redirected),
        (this.ok = this.status >= 200 && this.status < 300);
    }
  },
  vi = class e extends Zr {
    constructor(t = {}) {
      super(t);
    }
    type = tn.ResponseHeader;
    clone(t = {}) {
      return new e({
        headers: t.headers || this.headers,
        status: t.status !== void 0 ? t.status : this.status,
        statusText: t.statusText || this.statusText,
        url: t.url || this.url || void 0,
      });
    }
  },
  Yr = class e extends Zr {
    body;
    constructor(t = {}) {
      super(t), (this.body = t.body !== void 0 ? t.body : null);
    }
    type = tn.Response;
    clone(t = {}) {
      return new e({
        body: t.body !== void 0 ? t.body : this.body,
        headers: t.headers || this.headers,
        status: t.status !== void 0 ? t.status : this.status,
        statusText: t.statusText || this.statusText,
        url: t.url || this.url || void 0,
        redirected: t.redirected ?? this.redirected,
      });
    }
  },
  Tt = class extends Zr {
    name = "HttpErrorResponse";
    message;
    error;
    ok = !1;
    constructor(t) {
      super(t, 0, "Unknown Error"),
        this.status >= 200 && this.status < 300
          ? (this.message = `Http failure during parsing for ${
              t.url || "(unknown url)"
            }`)
          : (this.message = `Http failure response for ${
              t.url || "(unknown url)"
            }: ${t.status} ${t.statusText}`),
        (this.error = t.error || null);
    }
  },
  Sv = 200,
  xw = 204;
function qd(e, t) {
  return {
    body: t,
    headers: e.headers,
    context: e.context,
    observe: e.observe,
    params: e.params,
    reportProgress: e.reportProgress,
    responseType: e.responseType,
    withCredentials: e.withCredentials,
    credentials: e.credentials,
    transferCache: e.transferCache,
    timeout: e.timeout,
    keepalive: e.keepalive,
    priority: e.priority,
    cache: e.cache,
    mode: e.mode,
    redirect: e.redirect,
    integrity: e.integrity,
    referrer: e.referrer,
  };
}
var za = (() => {
    class e {
      handler;
      constructor(n) {
        this.handler = n;
      }
      request(n, r, o = {}) {
        let i;
        if (n instanceof zr) i = n;
        else {
          let c;
          o.headers instanceof bt ? (c = o.headers) : (c = new bt(o.headers));
          let u;
          o.params &&
            (o.params instanceof en
              ? (u = o.params)
              : (u = new en({ fromObject: o.params }))),
            (i = new zr(n, r, o.body !== void 0 ? o.body : null, {
              headers: c,
              context: o.context,
              params: u,
              reportProgress: o.reportProgress,
              responseType: o.responseType || "json",
              withCredentials: o.withCredentials,
              transferCache: o.transferCache,
              keepalive: o.keepalive,
              priority: o.priority,
              cache: o.cache,
              mode: o.mode,
              redirect: o.redirect,
              credentials: o.credentials,
              referrer: o.referrer,
              integrity: o.integrity,
              timeout: o.timeout,
            }));
        }
        let s = b(i).pipe(Ft((c) => this.handler.handle(c)));
        if (n instanceof zr || o.observe === "events") return s;
        let a = s.pipe(we((c) => c instanceof Yr));
        switch (o.observe || "body") {
          case "body":
            switch (i.responseType) {
              case "arraybuffer":
                return a.pipe(
                  A((c) => {
                    if (c.body !== null && !(c.body instanceof ArrayBuffer))
                      throw new I(2806, !1);
                    return c.body;
                  })
                );
              case "blob":
                return a.pipe(
                  A((c) => {
                    if (c.body !== null && !(c.body instanceof Blob))
                      throw new I(2807, !1);
                    return c.body;
                  })
                );
              case "text":
                return a.pipe(
                  A((c) => {
                    if (c.body !== null && typeof c.body != "string")
                      throw new I(2808, !1);
                    return c.body;
                  })
                );
              case "json":
              default:
                return a.pipe(A((c) => c.body));
            }
          case "response":
            return a;
          default:
            throw new I(2809, !1);
        }
      }
      delete(n, r = {}) {
        return this.request("DELETE", n, r);
      }
      get(n, r = {}) {
        return this.request("GET", n, r);
      }
      head(n, r = {}) {
        return this.request("HEAD", n, r);
      }
      jsonp(n, r) {
        return this.request("JSONP", n, {
          params: new en().append(r, "JSONP_CALLBACK"),
          observe: "body",
          responseType: "json",
        });
      }
      options(n, r = {}) {
        return this.request("OPTIONS", n, r);
      }
      patch(n, r, o = {}) {
        return this.request("PATCH", n, qd(o, r));
      }
      post(n, r, o = {}) {
        return this.request("POST", n, qd(o, r));
      }
      put(n, r, o = {}) {
        return this.request("PUT", n, qd(o, r));
      }
      static ɵfac = function (r) {
        return new (r || e)(R(Wr));
      };
      static ɵprov = S({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Ow = /^\)\]\}',?\n/;
function _v(e) {
  if (e.url) return e.url;
  let t = Qd.toLocaleLowerCase();
  return e.headers.get(t);
}
var wv = new w(""),
  Va = (() => {
    class e {
      fetchImpl =
        g(Zd, { optional: !0 })?.fetch ?? ((...n) => globalThis.fetch(...n));
      ngZone = g(oe);
      destroyRef = g(Gt);
      handle(n) {
        return new $((r) => {
          let o = new AbortController();
          this.doRequest(n, o.signal, r).then(Yd, (s) =>
            r.error(new Tt({ error: s }))
          );
          let i;
          return (
            n.timeout &&
              (i = this.ngZone.runOutsideAngular(() =>
                setTimeout(() => {
                  o.signal.aborted ||
                    o.abort(
                      new DOMException("signal timed out", "TimeoutError")
                    );
                }, n.timeout)
              )),
            () => {
              i !== void 0 && clearTimeout(i), o.abort();
            }
          );
        });
      }
      doRequest(n, r, o) {
        return xt(this, null, function* () {
          let i = this.createRequestInit(n),
            s;
          try {
            let v = this.ngZone.runOutsideAngular(() =>
              this.fetchImpl(n.urlWithParams, C({ signal: r }, i))
            );
            Pw(v), o.next({ type: tn.Sent }), (s = yield v);
          } catch (v) {
            o.error(
              new Tt({
                error: v,
                status: v.status ?? 0,
                statusText: v.statusText,
                url: n.urlWithParams,
                headers: v.headers,
              })
            );
            return;
          }
          let a = new bt(s.headers),
            c = s.statusText,
            u = _v(s) ?? n.urlWithParams,
            l = s.status,
            d = null;
          if (
            (n.reportProgress &&
              o.next(new vi({ headers: a, status: l, statusText: c, url: u })),
            s.body)
          ) {
            let v = s.headers.get("content-length"),
              E = [],
              _ = s.body.getReader(),
              y = 0,
              U,
              se,
              Q = typeof Zone < "u" && Zone.current,
              Ce = !1;
            if (
              (yield this.ngZone.runOutsideAngular(() =>
                xt(this, null, function* () {
                  for (;;) {
                    if (this.destroyRef.destroyed) {
                      yield _.cancel(), (Ce = !0);
                      break;
                    }
                    let { done: Ie, value: or } = yield _.read();
                    if (Ie) break;
                    if ((E.push(or), (y += or.length), n.reportProgress)) {
                      se =
                        n.responseType === "text"
                          ? (se ?? "") +
                            (U ??= new TextDecoder()).decode(or, { stream: !0 })
                          : void 0;
                      let wc = () =>
                        o.next({
                          type: tn.DownloadProgress,
                          total: v ? +v : void 0,
                          loaded: y,
                          partialText: se,
                        });
                      Q ? Q.run(wc) : wc();
                    }
                  }
                })
              ),
              Ce)
            ) {
              o.complete();
              return;
            }
            let Be = this.concatChunks(E, y);
            try {
              let Ie = s.headers.get(mi) ?? "";
              d = this.parseBody(n, Be, Ie, l);
            } catch (Ie) {
              o.error(
                new Tt({
                  error: Ie,
                  headers: new bt(s.headers),
                  status: s.status,
                  statusText: s.statusText,
                  url: _v(s) ?? n.urlWithParams,
                })
              );
              return;
            }
          }
          l === 0 && (l = d ? Sv : 0);
          let p = l >= 200 && l < 300,
            f = s.redirected;
          p
            ? (o.next(
                new Yr({
                  body: d,
                  headers: a,
                  status: l,
                  statusText: c,
                  url: u,
                  redirected: f,
                })
              ),
              o.complete())
            : o.error(
                new Tt({
                  error: d,
                  headers: a,
                  status: l,
                  statusText: c,
                  url: u,
                  redirected: f,
                })
              );
        });
      }
      parseBody(n, r, o, i) {
        switch (n.responseType) {
          case "json":
            let s = new TextDecoder().decode(r).replace(Ow, "");
            if (s === "") return null;
            try {
              return JSON.parse(s);
            } catch (a) {
              if (i < 200 || i >= 300) return s;
              throw a;
            }
          case "text":
            return new TextDecoder().decode(r);
          case "blob":
            return new Blob([r], { type: o });
          case "arraybuffer":
            return r.buffer;
        }
      }
      createRequestInit(n) {
        let r = {},
          o;
        if (
          ((o = n.credentials),
          n.withCredentials && (o = "include"),
          n.headers.forEach((i, s) => (r[i] = s.join(","))),
          n.headers.has(Ua) || (r[Ua] = Iv),
          !n.headers.has(mi))
        ) {
          let i = n.detectContentTypeHeader();
          i !== null && (r[mi] = i);
        }
        return {
          body: n.serializeBody(),
          method: n.method,
          headers: r,
          credentials: o,
          keepalive: n.keepalive,
          cache: n.cache,
          priority: n.priority,
          mode: n.mode,
          redirect: n.redirect,
          referrer: n.referrer,
          integrity: n.integrity,
        };
      }
      concatChunks(n, r) {
        let o = new Uint8Array(r),
          i = 0;
        for (let s of n) o.set(s, i), (i += s.length);
        return o;
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = S({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Zd = class {};
function Yd() {}
function Pw(e) {
  e.then(Yd, Yd);
}
function Fw(e, t) {
  return t(e);
}
function kw(e, t, n) {
  return (r, o) => he(n, () => t(r, (i) => e(i, o)));
}
var Tv = new w(""),
  bv = new w(""),
  Mv = new w("", { providedIn: "root", factory: () => !0 });
var Ga = (() => {
  class e extends Wr {
    backend;
    injector;
    chain = null;
    pendingTasks = g(ks);
    contributeToStability = g(Mv);
    constructor(n, r) {
      super(), (this.backend = n), (this.injector = r);
    }
    handle(n) {
      if (this.chain === null) {
        let r = Array.from(
          new Set([...this.injector.get(Tv), ...this.injector.get(bv, [])])
        );
        this.chain = r.reduceRight((o, i) => kw(o, i, this.injector), Fw);
      }
      if (this.contributeToStability) {
        let r = this.pendingTasks.add();
        return this.chain(n, (o) => this.backend.handle(o)).pipe(An(r));
      } else return this.chain(n, (r) => this.backend.handle(r));
    }
    static ɵfac = function (r) {
      return new (r || e)(R(qr), R(ue));
    };
    static ɵprov = S({ token: e, factory: e.ɵfac });
  }
  return e;
})();
var Lw = /^\)\]\}',?\n/,
  jw = RegExp(`^${Qd}:`, "m");
function $w(e) {
  return "responseURL" in e && e.responseURL
    ? e.responseURL
    : jw.test(e.getAllResponseHeaders())
    ? e.getResponseHeader(Qd)
    : null;
}
var Xd = (() => {
    class e {
      xhrFactory;
      constructor(n) {
        this.xhrFactory = n;
      }
      handle(n) {
        if (n.method === "JSONP") throw new I(-2800, !1);
        let r = this.xhrFactory;
        return b(null).pipe(
          J(
            () =>
              new $((i) => {
                let s = r.build();
                if (
                  (s.open(n.method, n.urlWithParams),
                  n.withCredentials && (s.withCredentials = !0),
                  n.headers.forEach((_, y) =>
                    s.setRequestHeader(_, y.join(","))
                  ),
                  n.headers.has(Ua) || s.setRequestHeader(Ua, Iv),
                  !n.headers.has(mi))
                ) {
                  let _ = n.detectContentTypeHeader();
                  _ !== null && s.setRequestHeader(mi, _);
                }
                if ((n.timeout && (s.timeout = n.timeout), n.responseType)) {
                  let _ = n.responseType.toLowerCase();
                  s.responseType = _ !== "json" ? _ : "text";
                }
                let a = n.serializeBody(),
                  c = null,
                  u = () => {
                    if (c !== null) return c;
                    let _ = s.statusText || "OK",
                      y = new bt(s.getAllResponseHeaders()),
                      U = $w(s) || n.url;
                    return (
                      (c = new vi({
                        headers: y,
                        status: s.status,
                        statusText: _,
                        url: U,
                      })),
                      c
                    );
                  },
                  l = () => {
                    let { headers: _, status: y, statusText: U, url: se } = u(),
                      Q = null;
                    y !== xw &&
                      (Q =
                        typeof s.response > "u" ? s.responseText : s.response),
                      y === 0 && (y = Q ? Sv : 0);
                    let Ce = y >= 200 && y < 300;
                    if (n.responseType === "json" && typeof Q == "string") {
                      let Be = Q;
                      Q = Q.replace(Lw, "");
                      try {
                        Q = Q !== "" ? JSON.parse(Q) : null;
                      } catch (Ie) {
                        (Q = Be),
                          Ce && ((Ce = !1), (Q = { error: Ie, text: Q }));
                      }
                    }
                    Ce
                      ? (i.next(
                          new Yr({
                            body: Q,
                            headers: _,
                            status: y,
                            statusText: U,
                            url: se || void 0,
                          })
                        ),
                        i.complete())
                      : i.error(
                          new Tt({
                            error: Q,
                            headers: _,
                            status: y,
                            statusText: U,
                            url: se || void 0,
                          })
                        );
                  },
                  d = (_) => {
                    let { url: y } = u(),
                      U = new Tt({
                        error: _,
                        status: s.status || 0,
                        statusText: s.statusText || "Unknown Error",
                        url: y || void 0,
                      });
                    i.error(U);
                  },
                  p = d;
                n.timeout &&
                  (p = (_) => {
                    let { url: y } = u(),
                      U = new Tt({
                        error: new DOMException(
                          "Request timed out",
                          "TimeoutError"
                        ),
                        status: s.status || 0,
                        statusText: s.statusText || "Request timeout",
                        url: y || void 0,
                      });
                    i.error(U);
                  });
                let f = !1,
                  v = (_) => {
                    f || (i.next(u()), (f = !0));
                    let y = { type: tn.DownloadProgress, loaded: _.loaded };
                    _.lengthComputable && (y.total = _.total),
                      n.responseType === "text" &&
                        s.responseText &&
                        (y.partialText = s.responseText),
                      i.next(y);
                  },
                  E = (_) => {
                    let y = { type: tn.UploadProgress, loaded: _.loaded };
                    _.lengthComputable && (y.total = _.total), i.next(y);
                  };
                return (
                  s.addEventListener("load", l),
                  s.addEventListener("error", d),
                  s.addEventListener("timeout", p),
                  s.addEventListener("abort", d),
                  n.reportProgress &&
                    (s.addEventListener("progress", v),
                    a !== null &&
                      s.upload &&
                      s.upload.addEventListener("progress", E)),
                  s.send(a),
                  i.next({ type: tn.Sent }),
                  () => {
                    s.removeEventListener("error", d),
                      s.removeEventListener("abort", d),
                      s.removeEventListener("load", l),
                      s.removeEventListener("timeout", p),
                      n.reportProgress &&
                        (s.removeEventListener("progress", v),
                        a !== null &&
                          s.upload &&
                          s.upload.removeEventListener("progress", E)),
                      s.readyState !== s.DONE && s.abort();
                  }
                );
              })
          )
        );
      }
      static ɵfac = function (r) {
        return new (r || e)(R(Kn));
      };
      static ɵprov = S({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Nv = new w(""),
  Vw = "XSRF-TOKEN",
  Bw = new w("", { providedIn: "root", factory: () => Vw }),
  Hw = "X-XSRF-TOKEN",
  Uw = new w("", { providedIn: "root", factory: () => Hw }),
  yi = class {},
  Gw = (() => {
    class e {
      doc;
      cookieName;
      lastCookieString = "";
      lastToken = null;
      parseCount = 0;
      constructor(n, r) {
        (this.doc = n), (this.cookieName = r);
      }
      getToken() {
        let n = this.doc.cookie || "";
        return (
          n !== this.lastCookieString &&
            (this.parseCount++,
            (this.lastToken = di(n, this.cookieName)),
            (this.lastCookieString = n)),
          this.lastToken
        );
      }
      static ɵfac = function (r) {
        return new (r || e)(R(Y), R(Bw));
      };
      static ɵprov = S({ token: e, factory: e.ɵfac });
    }
    return e;
  })();
function zw(e, t) {
  let n = e.url.toLowerCase();
  if (
    !g(Nv) ||
    e.method === "GET" ||
    e.method === "HEAD" ||
    n.startsWith("http://") ||
    n.startsWith("https://")
  )
    return t(e);
  let r = g(yi).getToken(),
    o = g(Uw);
  return (
    r != null &&
      !e.headers.has(o) &&
      (e = e.clone({ headers: e.headers.set(o, r) })),
    t(e)
  );
}
var Kd = (function (e) {
  return (
    (e[(e.Interceptors = 0)] = "Interceptors"),
    (e[(e.LegacyInterceptors = 1)] = "LegacyInterceptors"),
    (e[(e.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
    (e[(e.NoXsrfProtection = 3)] = "NoXsrfProtection"),
    (e[(e.JsonpSupport = 4)] = "JsonpSupport"),
    (e[(e.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
    (e[(e.Fetch = 6)] = "Fetch"),
    e
  );
})(Kd || {});
function Ww(e, t) {
  return { ɵkind: e, ɵproviders: t };
}
function Jd(...e) {
  let t = [
    za,
    Xd,
    Ga,
    { provide: Wr, useExisting: Ga },
    { provide: qr, useFactory: () => g(wv, { optional: !0 }) ?? g(Xd) },
    { provide: Tv, useValue: zw, multi: !0 },
    { provide: Nv, useValue: !0 },
    { provide: yi, useClass: Gw },
  ];
  for (let n of e) t.push(...n.ɵproviders);
  return Ht(t);
}
function ef() {
  return Ww(Kd.Fetch, [
    Va,
    { provide: wv, useExisting: Va },
    { provide: qr, useExisting: Va },
  ]);
}
var Rv = (() => {
  class e {
    _doc;
    constructor(n) {
      this._doc = n;
    }
    getTitle() {
      return this._doc.title;
    }
    setTitle(n) {
      this._doc.title = n || "";
    }
    static ɵfac = function (r) {
      return new (r || e)(R(Y));
    };
    static ɵprov = S({ token: e, factory: e.ɵfac, providedIn: "root" });
  }
  return e;
})();
var Av;
function xv(e) {
  Av ??= new TextEncoder();
  let t = Av.encode(e),
    n = new DataView(t.buffer, t.byteOffset, t.byteLength),
    r = Ov(n, t.length, 0),
    o = Ov(n, t.length, 102072);
  return (
    r == 0 &&
      (o == 0 || o == 1) &&
      ((r = r ^ 319790063), (o = o ^ -1801410264)),
    (BigInt.asUintN(32, BigInt(r)) << BigInt(32)) |
      BigInt.asUintN(32, BigInt(o))
  );
}
function Zw(e, t = "") {
  let n = xv(e);
  return (
    t &&
      ((n =
        BigInt.asUintN(64, n << BigInt(1)) | ((n >> BigInt(63)) & BigInt(1))),
      (n += xv(t))),
    BigInt.asUintN(63, n).toString()
  );
}
function Ov(e, t, n) {
  let r = 2654435769,
    o = 2654435769,
    i = 0,
    s = t - 12;
  for (; i <= s; i += 12) {
    (r += e.getUint32(i, !0)),
      (o += e.getUint32(i + 4, !0)),
      (n += e.getUint32(i + 8, !0));
    let c = Pv(r, o, n);
    (r = c[0]), (o = c[1]), (n = c[2]);
  }
  let a = t - i;
  return (
    (n += t),
    a >= 4
      ? ((r += e.getUint32(i, !0)),
        (i += 4),
        a >= 8
          ? ((o += e.getUint32(i, !0)),
            (i += 4),
            a >= 9 && (n += e.getUint8(i++) << 8),
            a >= 10 && (n += e.getUint8(i++) << 16),
            a === 11 && (n += e.getUint8(i++) << 24))
          : (a >= 5 && (o += e.getUint8(i++)),
            a >= 6 && (o += e.getUint8(i++) << 8),
            a === 7 && (o += e.getUint8(i++) << 16)))
      : (a >= 1 && (r += e.getUint8(i++)),
        a >= 2 && (r += e.getUint8(i++) << 8),
        a === 3 && (r += e.getUint8(i++) << 16)),
    Pv(r, o, n)[2]
  );
}
function Pv(e, t, n) {
  return (
    (e -= t),
    (e -= n),
    (e ^= n >>> 13),
    (t -= n),
    (t -= e),
    (t ^= e << 8),
    (n -= e),
    (n -= t),
    (n ^= t >>> 13),
    (e -= t),
    (e -= n),
    (e ^= n >>> 12),
    (t -= n),
    (t -= e),
    (t ^= e << 16),
    (n -= e),
    (n -= t),
    (n ^= t >>> 5),
    (e -= t),
    (e -= n),
    (e ^= n >>> 3),
    (t -= n),
    (t -= e),
    (t ^= e << 10),
    (n -= e),
    (n -= t),
    (n ^= t >>> 15),
    [e, t, n]
  );
}
function Fv(e, t, n, r, o = []) {
  let i = {},
    s = {},
    a = {},
    c = Yw(e[0], e.raw[0]),
    u = [c.text],
    l = [],
    d = c.text;
  for (let v = 1; v < e.length; v++) {
    let {
      messagePart: E,
      placeholderName: _ = Qw(v),
      associatedMessageId: y,
    } = Xw(e[v], e.raw[v]);
    (d += `{$${_}}${E}`),
      t !== void 0 && ((i[_] = t[v - 1]), (s[_] = o[v - 1])),
      l.push(_),
      y !== void 0 && (a[_] = y),
      u.push(E);
  }
  let p = c.customId || Zw(d, c.meaning || ""),
    f = c.legacyIds ? c.legacyIds.filter((v) => v !== p) : [];
  return {
    id: p,
    legacyIds: f,
    substitutions: i,
    substitutionLocations: s,
    text: d,
    customId: c.customId,
    meaning: c.meaning || "",
    description: c.description || "",
    messageParts: u,
    messagePartLocations: r,
    placeholderNames: l,
    associatedMessageIds: a,
    location: n,
  };
}
function Yw(e, t) {
  let { text: n, block: r } = kv(e, t);
  if (r === void 0) return { text: n };
  {
    let [o, ...i] = r.split("\u241F"),
      [s, a] = o.split("@@", 2),
      [c, u] = s.split("|", 2);
    return (
      u === void 0 && ((u = c), (c = void 0)),
      u === "" && (u = void 0),
      { text: n, meaning: c, description: u, customId: a, legacyIds: i }
    );
  }
}
function Xw(e, t) {
  let { text: n, block: r } = kv(e, t);
  if (r === void 0) return { messagePart: n };
  {
    let [o, i] = r.split("@@");
    return { messagePart: n, placeholderName: o, associatedMessageId: i };
  }
}
function kv(e, t) {
  if (t.charAt(0) !== ":") return { text: e };
  {
    let n = Kw(e, t);
    return { block: e.substring(1, n), text: e.substring(n + 1) };
  }
}
function Qw(e) {
  return e === 1 ? "PH" : `PH_${e - 1}`;
}
function Kw(e, t) {
  for (let n = 1, r = 1; n < e.length; n++, r++)
    if (t[r] === "\\") r++;
    else if (e[n] === ":") return n;
  throw new Error(`Unterminated $localize metadata block in "${t}".`);
}
var tf = class extends Error {
  parsedMessage;
  type = "MissingTranslationError";
  constructor(t) {
    super(`No translation found for ${Lv(t)}.`), (this.parsedMessage = t);
  }
};
function eT(e, t, n) {
  let r = Fv(t, n),
    o = e[r.id];
  if (r.legacyIds !== void 0)
    for (let i = 0; i < r.legacyIds.length && o === void 0; i++)
      o = e[r.legacyIds[i]];
  if (o === void 0) throw new tf(r);
  return [
    o.messageParts,
    o.placeholderNames.map((i) => {
      if (r.substitutions.hasOwnProperty(i)) return r.substitutions[i];
      throw new Error(`There is a placeholder name mismatch with the translation provided for the message ${Lv(
        r
      )}.
The translation contains a placeholder with name ${i}, which does not exist in the message.`);
    }),
  ];
}
function tT(e) {
  let t = e.split(/{\$([^}]*)}/),
    n = [t[0]],
    r = [];
  for (let i = 1; i < t.length - 1; i += 2) r.push(t[i]), n.push(`${t[i + 1]}`);
  let o = n.map((i) => (i.charAt(0) === ":" ? "\\" + i : i));
  return { text: e, messageParts: nT(n, o), placeholderNames: r };
}
function nT(e, t) {
  return Object.defineProperty(e, "raw", { value: t }), e;
}
function Lv(e) {
  let t = e.meaning && ` - "${e.meaning}"`,
    n =
      e.legacyIds && e.legacyIds.length > 0
        ? ` [${e.legacyIds.map((r) => `"${r}"`).join(", ")}]`
        : "";
  return `"${e.id}"${n} ("${e.text}"${t})`;
}
function jv(e) {
  $localize.translate || ($localize.translate = rT),
    $localize.TRANSLATIONS || ($localize.TRANSLATIONS = {}),
    Object.keys(e).forEach((t) => {
      $localize.TRANSLATIONS[t] = tT(e[t]);
    });
}
function rT(e, t) {
  try {
    return eT($localize.TRANSLATIONS, e, t);
  } catch (n) {
    return console.warn(n.message), [e, t];
  }
}
var P = "primary",
  Oi = Symbol("RouteTitle"),
  af = class {
    params;
    constructor(t) {
      this.params = t || {};
    }
    has(t) {
      return Object.prototype.hasOwnProperty.call(this.params, t);
    }
    get(t) {
      if (this.has(t)) {
        let n = this.params[t];
        return Array.isArray(n) ? n[0] : n;
      }
      return null;
    }
    getAll(t) {
      if (this.has(t)) {
        let n = this.params[t];
        return Array.isArray(n) ? n : [n];
      }
      return [];
    }
    get keys() {
      return Object.keys(this.params);
    }
  };
function tr(e) {
  return new af(e);
}
function Wv(e, t, n) {
  let r = n.path.split("/");
  if (
    r.length > e.length ||
    (n.pathMatch === "full" && (t.hasChildren() || r.length < e.length))
  )
    return null;
  let o = {};
  for (let i = 0; i < r.length; i++) {
    let s = r[i],
      a = e[i];
    if (s[0] === ":") o[s.substring(1)] = a;
    else if (s !== a.path) return null;
  }
  return { consumed: e.slice(0, r.length), posParams: o };
}
function oT(e, t) {
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; ++n) if (!Mt(e[n], t[n])) return !1;
  return !0;
}
function Mt(e, t) {
  let n = e ? cf(e) : void 0,
    r = t ? cf(t) : void 0;
  if (!n || !r || n.length != r.length) return !1;
  let o;
  for (let i = 0; i < n.length; i++)
    if (((o = n[i]), !qv(e[o], t[o]))) return !1;
  return !0;
}
function cf(e) {
  return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)];
}
function qv(e, t) {
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length) return !1;
    let n = [...e].sort(),
      r = [...t].sort();
    return n.every((o, i) => r[i] === o);
  } else return e === t;
}
function Zv(e) {
  return e.length > 0 ? e[e.length - 1] : null;
}
function rn(e) {
  return Gc(e) ? e : Yn(e) ? ne(Promise.resolve(e)) : b(e);
}
var iT = { exact: Xv, subset: Qv },
  Yv = { exact: sT, subset: aT, ignored: () => !0 };
function $v(e, t, n) {
  return (
    iT[n.paths](e.root, t.root, n.matrixParams) &&
    Yv[n.queryParams](e.queryParams, t.queryParams) &&
    !(n.fragment === "exact" && e.fragment !== t.fragment)
  );
}
function sT(e, t) {
  return Mt(e, t);
}
function Xv(e, t, n) {
  if (
    !Jn(e.segments, t.segments) ||
    !Za(e.segments, t.segments, n) ||
    e.numberOfChildren !== t.numberOfChildren
  )
    return !1;
  for (let r in t.children)
    if (!e.children[r] || !Xv(e.children[r], t.children[r], n)) return !1;
  return !0;
}
function aT(e, t) {
  return (
    Object.keys(t).length <= Object.keys(e).length &&
    Object.keys(t).every((n) => qv(e[n], t[n]))
  );
}
function Qv(e, t, n) {
  return Kv(e, t, t.segments, n);
}
function Kv(e, t, n, r) {
  if (e.segments.length > n.length) {
    let o = e.segments.slice(0, n.length);
    return !(!Jn(o, n) || t.hasChildren() || !Za(o, n, r));
  } else if (e.segments.length === n.length) {
    if (!Jn(e.segments, n) || !Za(e.segments, n, r)) return !1;
    for (let o in t.children)
      if (!e.children[o] || !Qv(e.children[o], t.children[o], r)) return !1;
    return !0;
  } else {
    let o = n.slice(0, e.segments.length),
      i = n.slice(e.segments.length);
    return !Jn(e.segments, o) || !Za(e.segments, o, r) || !e.children[P]
      ? !1
      : Kv(e.children[P], t, i, r);
  }
}
function Za(e, t, n) {
  return t.every((r, o) => Yv[n](e[o].parameters, r.parameters));
}
var Rt = class {
    root;
    queryParams;
    fragment;
    _queryParamMap;
    constructor(t = new z([], {}), n = {}, r = null) {
      (this.root = t), (this.queryParams = n), (this.fragment = r);
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= tr(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      return lT.serialize(this);
    }
  },
  z = class {
    segments;
    children;
    parent = null;
    constructor(t, n) {
      (this.segments = t),
        (this.children = n),
        Object.values(n).forEach((r) => (r.parent = this));
    }
    hasChildren() {
      return this.numberOfChildren > 0;
    }
    get numberOfChildren() {
      return Object.keys(this.children).length;
    }
    toString() {
      return Ya(this);
    }
  },
  Tn = class {
    path;
    parameters;
    _parameterMap;
    constructor(t, n) {
      (this.path = t), (this.parameters = n);
    }
    get parameterMap() {
      return (this._parameterMap ??= tr(this.parameters)), this._parameterMap;
    }
    toString() {
      return ey(this);
    }
  };
function cT(e, t) {
  return Jn(e, t) && e.every((n, r) => Mt(n.parameters, t[r].parameters));
}
function Jn(e, t) {
  return e.length !== t.length ? !1 : e.every((n, r) => n.path === t[r].path);
}
function uT(e, t) {
  let n = [];
  return (
    Object.entries(e.children).forEach(([r, o]) => {
      r === P && (n = n.concat(t(o, r)));
    }),
    Object.entries(e.children).forEach(([r, o]) => {
      r !== P && (n = n.concat(t(o, r)));
    }),
    n
  );
}
var Pi = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = S({
        token: e,
        factory: () => new nr(),
        providedIn: "root",
      });
    }
    return e;
  })(),
  nr = class {
    parse(t) {
      let n = new lf(t);
      return new Rt(
        n.parseRootSegment(),
        n.parseQueryParams(),
        n.parseFragment()
      );
    }
    serialize(t) {
      let n = `/${Ei(t.root, !0)}`,
        r = pT(t.queryParams),
        o = typeof t.fragment == "string" ? `#${dT(t.fragment)}` : "";
      return `${n}${r}${o}`;
    }
  },
  lT = new nr();
function Ya(e) {
  return e.segments.map((t) => ey(t)).join("/");
}
function Ei(e, t) {
  if (!e.hasChildren()) return Ya(e);
  if (t) {
    let n = e.children[P] ? Ei(e.children[P], !1) : "",
      r = [];
    return (
      Object.entries(e.children).forEach(([o, i]) => {
        o !== P && r.push(`${o}:${Ei(i, !1)}`);
      }),
      r.length > 0 ? `${n}(${r.join("//")})` : n
    );
  } else {
    let n = uT(e, (r, o) =>
      o === P ? [Ei(e.children[P], !1)] : [`${o}:${Ei(r, !1)}`]
    );
    return Object.keys(e.children).length === 1 && e.children[P] != null
      ? `${Ya(e)}/${n[0]}`
      : `${Ya(e)}/(${n.join("//")})`;
  }
}
function Jv(e) {
  return encodeURIComponent(e)
    .replace(/%40/g, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",");
}
function Wa(e) {
  return Jv(e).replace(/%3B/gi, ";");
}
function dT(e) {
  return encodeURI(e);
}
function uf(e) {
  return Jv(e)
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/%26/gi, "&");
}
function Xa(e) {
  return decodeURIComponent(e);
}
function Vv(e) {
  return Xa(e.replace(/\+/g, "%20"));
}
function ey(e) {
  return `${uf(e.path)}${fT(e.parameters)}`;
}
function fT(e) {
  return Object.entries(e)
    .map(([t, n]) => `;${uf(t)}=${uf(n)}`)
    .join("");
}
function pT(e) {
  let t = Object.entries(e)
    .map(([n, r]) =>
      Array.isArray(r)
        ? r.map((o) => `${Wa(n)}=${Wa(o)}`).join("&")
        : `${Wa(n)}=${Wa(r)}`
    )
    .filter((n) => n);
  return t.length ? `?${t.join("&")}` : "";
}
var hT = /^[^\/()?;#]+/;
function nf(e) {
  let t = e.match(hT);
  return t ? t[0] : "";
}
var gT = /^[^\/()?;=#]+/;
function mT(e) {
  let t = e.match(gT);
  return t ? t[0] : "";
}
var vT = /^[^=?&#]+/;
function yT(e) {
  let t = e.match(vT);
  return t ? t[0] : "";
}
var ET = /^[^&#]+/;
function _T(e) {
  let t = e.match(ET);
  return t ? t[0] : "";
}
var lf = class {
  url;
  remaining;
  constructor(t) {
    (this.url = t), (this.remaining = t);
  }
  parseRootSegment() {
    return (
      this.consumeOptional("/"),
      this.remaining === "" ||
      this.peekStartsWith("?") ||
      this.peekStartsWith("#")
        ? new z([], {})
        : new z([], this.parseChildren())
    );
  }
  parseQueryParams() {
    let t = {};
    if (this.consumeOptional("?"))
      do this.parseQueryParam(t);
      while (this.consumeOptional("&"));
    return t;
  }
  parseFragment() {
    return this.consumeOptional("#")
      ? decodeURIComponent(this.remaining)
      : null;
  }
  parseChildren() {
    if (this.remaining === "") return {};
    this.consumeOptional("/");
    let t = [];
    for (
      this.peekStartsWith("(") || t.push(this.parseSegment());
      this.peekStartsWith("/") &&
      !this.peekStartsWith("//") &&
      !this.peekStartsWith("/(");

    )
      this.capture("/"), t.push(this.parseSegment());
    let n = {};
    this.peekStartsWith("/(") &&
      (this.capture("/"), (n = this.parseParens(!0)));
    let r = {};
    return (
      this.peekStartsWith("(") && (r = this.parseParens(!1)),
      (t.length > 0 || Object.keys(n).length > 0) && (r[P] = new z(t, n)),
      r
    );
  }
  parseSegment() {
    let t = nf(this.remaining);
    if (t === "" && this.peekStartsWith(";")) throw new I(4009, !1);
    return this.capture(t), new Tn(Xa(t), this.parseMatrixParams());
  }
  parseMatrixParams() {
    let t = {};
    for (; this.consumeOptional(";"); ) this.parseParam(t);
    return t;
  }
  parseParam(t) {
    let n = mT(this.remaining);
    if (!n) return;
    this.capture(n);
    let r = "";
    if (this.consumeOptional("=")) {
      let o = nf(this.remaining);
      o && ((r = o), this.capture(r));
    }
    t[Xa(n)] = Xa(r);
  }
  parseQueryParam(t) {
    let n = yT(this.remaining);
    if (!n) return;
    this.capture(n);
    let r = "";
    if (this.consumeOptional("=")) {
      let s = _T(this.remaining);
      s && ((r = s), this.capture(r));
    }
    let o = Vv(n),
      i = Vv(r);
    if (t.hasOwnProperty(o)) {
      let s = t[o];
      Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
    } else t[o] = i;
  }
  parseParens(t) {
    let n = {};
    for (
      this.capture("(");
      !this.consumeOptional(")") && this.remaining.length > 0;

    ) {
      let r = nf(this.remaining),
        o = this.remaining[r.length];
      if (o !== "/" && o !== ")" && o !== ";") throw new I(4010, !1);
      let i;
      r.indexOf(":") > -1
        ? ((i = r.slice(0, r.indexOf(":"))), this.capture(i), this.capture(":"))
        : t && (i = P);
      let s = this.parseChildren();
      (n[i ?? P] = Object.keys(s).length === 1 && s[P] ? s[P] : new z([], s)),
        this.consumeOptional("//");
    }
    return n;
  }
  peekStartsWith(t) {
    return this.remaining.startsWith(t);
  }
  consumeOptional(t) {
    return this.peekStartsWith(t)
      ? ((this.remaining = this.remaining.substring(t.length)), !0)
      : !1;
  }
  capture(t) {
    if (!this.consumeOptional(t)) throw new I(4011, !1);
  }
};
function ty(e) {
  return e.segments.length > 0 ? new z([], { [P]: e }) : e;
}
function ny(e) {
  let t = {};
  for (let [r, o] of Object.entries(e.children)) {
    let i = ny(o);
    if (r === P && i.segments.length === 0 && i.hasChildren())
      for (let [s, a] of Object.entries(i.children)) t[s] = a;
    else (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
  }
  let n = new z(e.segments, t);
  return DT(n);
}
function DT(e) {
  if (e.numberOfChildren === 1 && e.children[P]) {
    let t = e.children[P];
    return new z(e.segments.concat(t.segments), t.children);
  }
  return e;
}
function bn(e) {
  return e instanceof Rt;
}
function ry(e, t, n = null, r = null) {
  let o = oy(e);
  return iy(o, t, n, r);
}
function oy(e) {
  let t;
  function n(i) {
    let s = {};
    for (let c of i.children) {
      let u = n(c);
      s[c.outlet] = u;
    }
    let a = new z(i.url, s);
    return i === e && (t = a), a;
  }
  let r = n(e.root),
    o = ty(r);
  return t ?? o;
}
function iy(e, t, n, r) {
  let o = e;
  for (; o.parent; ) o = o.parent;
  if (t.length === 0) return rf(o, o, o, n, r);
  let i = CT(t);
  if (i.toRoot()) return rf(o, o, new z([], {}), n, r);
  let s = IT(i, o, e),
    a = s.processChildren
      ? Di(s.segmentGroup, s.index, i.commands)
      : ay(s.segmentGroup, s.index, i.commands);
  return rf(o, s.segmentGroup, a, n, r);
}
function Qa(e) {
  return typeof e == "object" && e != null && !e.outlets && !e.segmentPath;
}
function Si(e) {
  return typeof e == "object" && e != null && e.outlets;
}
function rf(e, t, n, r, o) {
  let i = {};
  r &&
    Object.entries(r).forEach(([c, u]) => {
      i[c] = Array.isArray(u) ? u.map((l) => `${l}`) : `${u}`;
    });
  let s;
  e === t ? (s = n) : (s = sy(e, t, n));
  let a = ty(ny(s));
  return new Rt(a, i, o);
}
function sy(e, t, n) {
  let r = {};
  return (
    Object.entries(e.children).forEach(([o, i]) => {
      i === t ? (r[o] = n) : (r[o] = sy(i, t, n));
    }),
    new z(e.segments, r)
  );
}
var Ka = class {
  isAbsolute;
  numberOfDoubleDots;
  commands;
  constructor(t, n, r) {
    if (
      ((this.isAbsolute = t),
      (this.numberOfDoubleDots = n),
      (this.commands = r),
      t && r.length > 0 && Qa(r[0]))
    )
      throw new I(4003, !1);
    let o = r.find(Si);
    if (o && o !== Zv(r)) throw new I(4004, !1);
  }
  toRoot() {
    return (
      this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/"
    );
  }
};
function CT(e) {
  if (typeof e[0] == "string" && e.length === 1 && e[0] === "/")
    return new Ka(!0, 0, e);
  let t = 0,
    n = !1,
    r = e.reduce((o, i, s) => {
      if (typeof i == "object" && i != null) {
        if (i.outlets) {
          let a = {};
          return (
            Object.entries(i.outlets).forEach(([c, u]) => {
              a[c] = typeof u == "string" ? u.split("/") : u;
            }),
            [...o, { outlets: a }]
          );
        }
        if (i.segmentPath) return [...o, i.segmentPath];
      }
      return typeof i != "string"
        ? [...o, i]
        : s === 0
        ? (i.split("/").forEach((a, c) => {
            (c == 0 && a === ".") ||
              (c == 0 && a === ""
                ? (n = !0)
                : a === ".."
                ? t++
                : a != "" && o.push(a));
          }),
          o)
        : [...o, i];
    }, []);
  return new Ka(n, t, r);
}
var Kr = class {
  segmentGroup;
  processChildren;
  index;
  constructor(t, n, r) {
    (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
  }
};
function IT(e, t, n) {
  if (e.isAbsolute) return new Kr(t, !0, 0);
  if (!n) return new Kr(t, !1, NaN);
  if (n.parent === null) return new Kr(n, !0, 0);
  let r = Qa(e.commands[0]) ? 0 : 1,
    o = n.segments.length - 1 + r;
  return ST(n, o, e.numberOfDoubleDots);
}
function ST(e, t, n) {
  let r = e,
    o = t,
    i = n;
  for (; i > o; ) {
    if (((i -= o), (r = r.parent), !r)) throw new I(4005, !1);
    o = r.segments.length;
  }
  return new Kr(r, !1, o - i);
}
function wT(e) {
  return Si(e[0]) ? e[0].outlets : { [P]: e };
}
function ay(e, t, n) {
  if (((e ??= new z([], {})), e.segments.length === 0 && e.hasChildren()))
    return Di(e, t, n);
  let r = TT(e, t, n),
    o = n.slice(r.commandIndex);
  if (r.match && r.pathIndex < e.segments.length) {
    let i = new z(e.segments.slice(0, r.pathIndex), {});
    return (
      (i.children[P] = new z(e.segments.slice(r.pathIndex), e.children)),
      Di(i, 0, o)
    );
  } else
    return r.match && o.length === 0
      ? new z(e.segments, {})
      : r.match && !e.hasChildren()
      ? df(e, t, n)
      : r.match
      ? Di(e, 0, o)
      : df(e, t, n);
}
function Di(e, t, n) {
  if (n.length === 0) return new z(e.segments, {});
  {
    let r = wT(n),
      o = {};
    if (
      Object.keys(r).some((i) => i !== P) &&
      e.children[P] &&
      e.numberOfChildren === 1 &&
      e.children[P].segments.length === 0
    ) {
      let i = Di(e.children[P], t, n);
      return new z(e.segments, i.children);
    }
    return (
      Object.entries(r).forEach(([i, s]) => {
        typeof s == "string" && (s = [s]),
          s !== null && (o[i] = ay(e.children[i], t, s));
      }),
      Object.entries(e.children).forEach(([i, s]) => {
        r[i] === void 0 && (o[i] = s);
      }),
      new z(e.segments, o)
    );
  }
}
function TT(e, t, n) {
  let r = 0,
    o = t,
    i = { match: !1, pathIndex: 0, commandIndex: 0 };
  for (; o < e.segments.length; ) {
    if (r >= n.length) return i;
    let s = e.segments[o],
      a = n[r];
    if (Si(a)) break;
    let c = `${a}`,
      u = r < n.length - 1 ? n[r + 1] : null;
    if (o > 0 && c === void 0) break;
    if (c && u && typeof u == "object" && u.outlets === void 0) {
      if (!Hv(c, u, s)) return i;
      r += 2;
    } else {
      if (!Hv(c, {}, s)) return i;
      r++;
    }
    o++;
  }
  return { match: !0, pathIndex: o, commandIndex: r };
}
function df(e, t, n) {
  let r = e.segments.slice(0, t),
    o = 0;
  for (; o < n.length; ) {
    let i = n[o];
    if (Si(i)) {
      let c = bT(i.outlets);
      return new z(r, c);
    }
    if (o === 0 && Qa(n[0])) {
      let c = e.segments[t];
      r.push(new Tn(c.path, Bv(n[0]))), o++;
      continue;
    }
    let s = Si(i) ? i.outlets[P] : `${i}`,
      a = o < n.length - 1 ? n[o + 1] : null;
    s && a && Qa(a)
      ? (r.push(new Tn(s, Bv(a))), (o += 2))
      : (r.push(new Tn(s, {})), o++);
  }
  return new z(r, {});
}
function bT(e) {
  let t = {};
  return (
    Object.entries(e).forEach(([n, r]) => {
      typeof r == "string" && (r = [r]),
        r !== null && (t[n] = df(new z([], {}), 0, r));
    }),
    t
  );
}
function Bv(e) {
  let t = {};
  return Object.entries(e).forEach(([n, r]) => (t[n] = `${r}`)), t;
}
function Hv(e, t, n) {
  return e == n.path && Mt(t, n.parameters);
}
var Ci = "imperative",
  fe = (function (e) {
    return (
      (e[(e.NavigationStart = 0)] = "NavigationStart"),
      (e[(e.NavigationEnd = 1)] = "NavigationEnd"),
      (e[(e.NavigationCancel = 2)] = "NavigationCancel"),
      (e[(e.NavigationError = 3)] = "NavigationError"),
      (e[(e.RoutesRecognized = 4)] = "RoutesRecognized"),
      (e[(e.ResolveStart = 5)] = "ResolveStart"),
      (e[(e.ResolveEnd = 6)] = "ResolveEnd"),
      (e[(e.GuardsCheckStart = 7)] = "GuardsCheckStart"),
      (e[(e.GuardsCheckEnd = 8)] = "GuardsCheckEnd"),
      (e[(e.RouteConfigLoadStart = 9)] = "RouteConfigLoadStart"),
      (e[(e.RouteConfigLoadEnd = 10)] = "RouteConfigLoadEnd"),
      (e[(e.ChildActivationStart = 11)] = "ChildActivationStart"),
      (e[(e.ChildActivationEnd = 12)] = "ChildActivationEnd"),
      (e[(e.ActivationStart = 13)] = "ActivationStart"),
      (e[(e.ActivationEnd = 14)] = "ActivationEnd"),
      (e[(e.Scroll = 15)] = "Scroll"),
      (e[(e.NavigationSkipped = 16)] = "NavigationSkipped"),
      e
    );
  })(fe || {}),
  Ze = class {
    id;
    url;
    constructor(t, n) {
      (this.id = t), (this.url = n);
    }
  },
  rr = class extends Ze {
    type = fe.NavigationStart;
    navigationTrigger;
    restoredState;
    constructor(t, n, r = "imperative", o = null) {
      super(t, n), (this.navigationTrigger = r), (this.restoredState = o);
    }
    toString() {
      return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
    }
  },
  ft = class extends Ze {
    urlAfterRedirects;
    type = fe.NavigationEnd;
    constructor(t, n, r) {
      super(t, n), (this.urlAfterRedirects = r);
    }
    toString() {
      return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
  },
  Ae = (function (e) {
    return (
      (e[(e.Redirect = 0)] = "Redirect"),
      (e[(e.SupersededByNewNavigation = 1)] = "SupersededByNewNavigation"),
      (e[(e.NoDataFromResolver = 2)] = "NoDataFromResolver"),
      (e[(e.GuardRejected = 3)] = "GuardRejected"),
      (e[(e.Aborted = 4)] = "Aborted"),
      e
    );
  })(Ae || {}),
  wi = (function (e) {
    return (
      (e[(e.IgnoredSameUrlNavigation = 0)] = "IgnoredSameUrlNavigation"),
      (e[(e.IgnoredByUrlHandlingStrategy = 1)] =
        "IgnoredByUrlHandlingStrategy"),
      e
    );
  })(wi || {}),
  Nt = class extends Ze {
    reason;
    code;
    type = fe.NavigationCancel;
    constructor(t, n, r, o) {
      super(t, n), (this.reason = r), (this.code = o);
    }
    toString() {
      return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
    }
  },
  nn = class extends Ze {
    reason;
    code;
    type = fe.NavigationSkipped;
    constructor(t, n, r, o) {
      super(t, n), (this.reason = r), (this.code = o);
    }
  },
  eo = class extends Ze {
    error;
    target;
    type = fe.NavigationError;
    constructor(t, n, r, o) {
      super(t, n), (this.error = r), (this.target = o);
    }
    toString() {
      return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
  },
  Ti = class extends Ze {
    urlAfterRedirects;
    state;
    type = fe.RoutesRecognized;
    constructor(t, n, r, o) {
      super(t, n), (this.urlAfterRedirects = r), (this.state = o);
    }
    toString() {
      return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Ja = class extends Ze {
    urlAfterRedirects;
    state;
    type = fe.GuardsCheckStart;
    constructor(t, n, r, o) {
      super(t, n), (this.urlAfterRedirects = r), (this.state = o);
    }
    toString() {
      return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  ec = class extends Ze {
    urlAfterRedirects;
    state;
    shouldActivate;
    type = fe.GuardsCheckEnd;
    constructor(t, n, r, o, i) {
      super(t, n),
        (this.urlAfterRedirects = r),
        (this.state = o),
        (this.shouldActivate = i);
    }
    toString() {
      return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
  },
  tc = class extends Ze {
    urlAfterRedirects;
    state;
    type = fe.ResolveStart;
    constructor(t, n, r, o) {
      super(t, n), (this.urlAfterRedirects = r), (this.state = o);
    }
    toString() {
      return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  nc = class extends Ze {
    urlAfterRedirects;
    state;
    type = fe.ResolveEnd;
    constructor(t, n, r, o) {
      super(t, n), (this.urlAfterRedirects = r), (this.state = o);
    }
    toString() {
      return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  rc = class {
    route;
    type = fe.RouteConfigLoadStart;
    constructor(t) {
      this.route = t;
    }
    toString() {
      return `RouteConfigLoadStart(path: ${this.route.path})`;
    }
  },
  oc = class {
    route;
    type = fe.RouteConfigLoadEnd;
    constructor(t) {
      this.route = t;
    }
    toString() {
      return `RouteConfigLoadEnd(path: ${this.route.path})`;
    }
  },
  ic = class {
    snapshot;
    type = fe.ChildActivationStart;
    constructor(t) {
      this.snapshot = t;
    }
    toString() {
      return `ChildActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  sc = class {
    snapshot;
    type = fe.ChildActivationEnd;
    constructor(t) {
      this.snapshot = t;
    }
    toString() {
      return `ChildActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  ac = class {
    snapshot;
    type = fe.ActivationStart;
    constructor(t) {
      this.snapshot = t;
    }
    toString() {
      return `ActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  cc = class {
    snapshot;
    type = fe.ActivationEnd;
    constructor(t) {
      this.snapshot = t;
    }
    toString() {
      return `ActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  };
var bi = class {},
  to = class {
    url;
    navigationBehaviorOptions;
    constructor(t, n) {
      (this.url = t), (this.navigationBehaviorOptions = n);
    }
  };
function MT(e) {
  return !(e instanceof bi) && !(e instanceof to);
}
function NT(e, t) {
  return (
    e.providers &&
      !e._injector &&
      (e._injector = ei(e.providers, t, `Route: ${e.path}`)),
    e._injector ?? t
  );
}
function dt(e) {
  return e.outlet || P;
}
function RT(e, t) {
  let n = e.filter((r) => dt(r) === t);
  return n.push(...e.filter((r) => dt(r) !== t)), n;
}
function oo(e) {
  if (!e) return null;
  if (e.routeConfig?._injector) return e.routeConfig._injector;
  for (let t = e.parent; t; t = t.parent) {
    let n = t.routeConfig;
    if (n?._loadedInjector) return n._loadedInjector;
    if (n?._injector) return n._injector;
  }
  return null;
}
var uc = class {
    rootInjector;
    outlet = null;
    route = null;
    children;
    attachRef = null;
    get injector() {
      return oo(this.route?.snapshot) ?? this.rootInjector;
    }
    constructor(t) {
      (this.rootInjector = t), (this.children = new io(this.rootInjector));
    }
  },
  io = (() => {
    class e {
      rootInjector;
      contexts = new Map();
      constructor(n) {
        this.rootInjector = n;
      }
      onChildOutletCreated(n, r) {
        let o = this.getOrCreateContext(n);
        (o.outlet = r), this.contexts.set(n, o);
      }
      onChildOutletDestroyed(n) {
        let r = this.getContext(n);
        r && ((r.outlet = null), (r.attachRef = null));
      }
      onOutletDeactivated() {
        let n = this.contexts;
        return (this.contexts = new Map()), n;
      }
      onOutletReAttached(n) {
        this.contexts = n;
      }
      getOrCreateContext(n) {
        let r = this.getContext(n);
        return (
          r || ((r = new uc(this.rootInjector)), this.contexts.set(n, r)), r
        );
      }
      getContext(n) {
        return this.contexts.get(n) || null;
      }
      static ɵfac = function (r) {
        return new (r || e)(R(ue));
      };
      static ɵprov = S({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  lc = class {
    _root;
    constructor(t) {
      this._root = t;
    }
    get root() {
      return this._root.value;
    }
    parent(t) {
      let n = this.pathFromRoot(t);
      return n.length > 1 ? n[n.length - 2] : null;
    }
    children(t) {
      let n = ff(t, this._root);
      return n ? n.children.map((r) => r.value) : [];
    }
    firstChild(t) {
      let n = ff(t, this._root);
      return n && n.children.length > 0 ? n.children[0].value : null;
    }
    siblings(t) {
      let n = pf(t, this._root);
      return n.length < 2
        ? []
        : n[n.length - 2].children.map((o) => o.value).filter((o) => o !== t);
    }
    pathFromRoot(t) {
      return pf(t, this._root).map((n) => n.value);
    }
  };
function ff(e, t) {
  if (e === t.value) return t;
  for (let n of t.children) {
    let r = ff(e, n);
    if (r) return r;
  }
  return null;
}
function pf(e, t) {
  if (e === t.value) return [t];
  for (let n of t.children) {
    let r = pf(e, n);
    if (r.length) return r.unshift(t), r;
  }
  return [];
}
var qe = class {
  value;
  children;
  constructor(t, n) {
    (this.value = t), (this.children = n);
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
};
function Qr(e) {
  let t = {};
  return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
}
var Mi = class extends lc {
  snapshot;
  constructor(t, n) {
    super(t), (this.snapshot = n), Df(this, t);
  }
  toString() {
    return this.snapshot.toString();
  }
};
function cy(e) {
  let t = AT(e),
    n = new pe([new Tn("", {})]),
    r = new pe({}),
    o = new pe({}),
    i = new pe({}),
    s = new pe(""),
    a = new xe(n, r, i, s, o, P, e, t.root);
  return (a.snapshot = t.root), new Mi(new qe(a, []), t);
}
function AT(e) {
  let t = {},
    n = {},
    r = {},
    i = new er([], t, r, "", n, P, e, null, {});
  return new Ni("", new qe(i, []));
}
var xe = class {
  urlSubject;
  paramsSubject;
  queryParamsSubject;
  fragmentSubject;
  dataSubject;
  outlet;
  component;
  snapshot;
  _futureSnapshot;
  _routerState;
  _paramMap;
  _queryParamMap;
  title;
  url;
  params;
  queryParams;
  fragment;
  data;
  constructor(t, n, r, o, i, s, a, c) {
    (this.urlSubject = t),
      (this.paramsSubject = n),
      (this.queryParamsSubject = r),
      (this.fragmentSubject = o),
      (this.dataSubject = i),
      (this.outlet = s),
      (this.component = a),
      (this._futureSnapshot = c),
      (this.title = this.dataSubject?.pipe(A((u) => u[Oi])) ?? b(void 0)),
      (this.url = t),
      (this.params = n),
      (this.queryParams = r),
      (this.fragment = o),
      (this.data = i);
  }
  get routeConfig() {
    return this._futureSnapshot.routeConfig;
  }
  get root() {
    return this._routerState.root;
  }
  get parent() {
    return this._routerState.parent(this);
  }
  get firstChild() {
    return this._routerState.firstChild(this);
  }
  get children() {
    return this._routerState.children(this);
  }
  get pathFromRoot() {
    return this._routerState.pathFromRoot(this);
  }
  get paramMap() {
    return (
      (this._paramMap ??= this.params.pipe(A((t) => tr(t)))), this._paramMap
    );
  }
  get queryParamMap() {
    return (
      (this._queryParamMap ??= this.queryParams.pipe(A((t) => tr(t)))),
      this._queryParamMap
    );
  }
  toString() {
    return this.snapshot
      ? this.snapshot.toString()
      : `Future(${this._futureSnapshot})`;
  }
};
function dc(e, t, n = "emptyOnly") {
  let r,
    { routeConfig: o } = e;
  return (
    t !== null &&
    (n === "always" ||
      o?.path === "" ||
      (!t.component && !t.routeConfig?.loadComponent))
      ? (r = {
          params: C(C({}, t.params), e.params),
          data: C(C({}, t.data), e.data),
          resolve: C(C(C(C({}, e.data), t.data), o?.data), e._resolvedData),
        })
      : (r = {
          params: C({}, e.params),
          data: C({}, e.data),
          resolve: C(C({}, e.data), e._resolvedData ?? {}),
        }),
    o && ly(o) && (r.resolve[Oi] = o.title),
    r
  );
}
var er = class {
    url;
    params;
    queryParams;
    fragment;
    data;
    outlet;
    component;
    routeConfig;
    _resolve;
    _resolvedData;
    _routerState;
    _paramMap;
    _queryParamMap;
    get title() {
      return this.data?.[Oi];
    }
    constructor(t, n, r, o, i, s, a, c, u) {
      (this.url = t),
        (this.params = n),
        (this.queryParams = r),
        (this.fragment = o),
        (this.data = i),
        (this.outlet = s),
        (this.component = a),
        (this.routeConfig = c),
        (this._resolve = u);
    }
    get root() {
      return this._routerState.root;
    }
    get parent() {
      return this._routerState.parent(this);
    }
    get firstChild() {
      return this._routerState.firstChild(this);
    }
    get children() {
      return this._routerState.children(this);
    }
    get pathFromRoot() {
      return this._routerState.pathFromRoot(this);
    }
    get paramMap() {
      return (this._paramMap ??= tr(this.params)), this._paramMap;
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= tr(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      let t = this.url.map((r) => r.toString()).join("/"),
        n = this.routeConfig ? this.routeConfig.path : "";
      return `Route(url:'${t}', path:'${n}')`;
    }
  },
  Ni = class extends lc {
    url;
    constructor(t, n) {
      super(n), (this.url = t), Df(this, n);
    }
    toString() {
      return uy(this._root);
    }
  };
function Df(e, t) {
  (t.value._routerState = e), t.children.forEach((n) => Df(e, n));
}
function uy(e) {
  let t = e.children.length > 0 ? ` { ${e.children.map(uy).join(", ")} } ` : "";
  return `${e.value}${t}`;
}
function of(e) {
  if (e.snapshot) {
    let t = e.snapshot,
      n = e._futureSnapshot;
    (e.snapshot = n),
      Mt(t.queryParams, n.queryParams) ||
        e.queryParamsSubject.next(n.queryParams),
      t.fragment !== n.fragment && e.fragmentSubject.next(n.fragment),
      Mt(t.params, n.params) || e.paramsSubject.next(n.params),
      oT(t.url, n.url) || e.urlSubject.next(n.url),
      Mt(t.data, n.data) || e.dataSubject.next(n.data);
  } else
    (e.snapshot = e._futureSnapshot),
      e.dataSubject.next(e._futureSnapshot.data);
}
function hf(e, t) {
  let n = Mt(e.params, t.params) && cT(e.url, t.url),
    r = !e.parent != !t.parent;
  return n && !r && (!e.parent || hf(e.parent, t.parent));
}
function ly(e) {
  return typeof e.title == "string" || e.title === null;
}
var dy = new w(""),
  Fi = (() => {
    class e {
      activated = null;
      get activatedComponentRef() {
        return this.activated;
      }
      _activatedRoute = null;
      name = P;
      activateEvents = new De();
      deactivateEvents = new De();
      attachEvents = new De();
      detachEvents = new De();
      routerOutletData = Zm();
      parentContexts = g(io);
      location = g(Zt);
      changeDetector = g(Sn);
      inputBinder = g(gc, { optional: !0 });
      supportsBindingToComponentInputs = !0;
      ngOnChanges(n) {
        if (n.name) {
          let { firstChange: r, previousValue: o } = n.name;
          if (r) return;
          this.isTrackedInParentContexts(o) &&
            (this.deactivate(), this.parentContexts.onChildOutletDestroyed(o)),
            this.initializeOutletWithName();
        }
      }
      ngOnDestroy() {
        this.isTrackedInParentContexts(this.name) &&
          this.parentContexts.onChildOutletDestroyed(this.name),
          this.inputBinder?.unsubscribeFromRouteData(this);
      }
      isTrackedInParentContexts(n) {
        return this.parentContexts.getContext(n)?.outlet === this;
      }
      ngOnInit() {
        this.initializeOutletWithName();
      }
      initializeOutletWithName() {
        if (
          (this.parentContexts.onChildOutletCreated(this.name, this),
          this.activated)
        )
          return;
        let n = this.parentContexts.getContext(this.name);
        n?.route &&
          (n.attachRef
            ? this.attach(n.attachRef, n.route)
            : this.activateWith(n.route, n.injector));
      }
      get isActivated() {
        return !!this.activated;
      }
      get component() {
        if (!this.activated) throw new I(4012, !1);
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated) throw new I(4012, !1);
        return this._activatedRoute;
      }
      get activatedRouteData() {
        return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
      }
      detach() {
        if (!this.activated) throw new I(4012, !1);
        this.location.detach();
        let n = this.activated;
        return (
          (this.activated = null),
          (this._activatedRoute = null),
          this.detachEvents.emit(n.instance),
          n
        );
      }
      attach(n, r) {
        (this.activated = n),
          (this._activatedRoute = r),
          this.location.insert(n.hostView),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.attachEvents.emit(n.instance);
      }
      deactivate() {
        if (this.activated) {
          let n = this.component;
          this.activated.destroy(),
            (this.activated = null),
            (this._activatedRoute = null),
            this.deactivateEvents.emit(n);
        }
      }
      activateWith(n, r) {
        if (this.isActivated) throw new I(4013, !1);
        this._activatedRoute = n;
        let o = this.location,
          s = n.snapshot.component,
          a = this.parentContexts.getOrCreateContext(this.name).children,
          c = new gf(n, a, o.injector, this.routerOutletData);
        (this.activated = o.createComponent(s, {
          index: o.length,
          injector: c,
          environmentInjector: r,
        })),
          this.changeDetector.markForCheck(),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.activateEvents.emit(this.activated.instance);
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵdir = ct({
        type: e,
        selectors: [["router-outlet"]],
        inputs: { name: "name", routerOutletData: [1, "routerOutletData"] },
        outputs: {
          activateEvents: "activate",
          deactivateEvents: "deactivate",
          attachEvents: "attach",
          detachEvents: "detach",
        },
        exportAs: ["outlet"],
        features: [qt],
      });
    }
    return e;
  })(),
  gf = class {
    route;
    childContexts;
    parent;
    outletData;
    constructor(t, n, r, o) {
      (this.route = t),
        (this.childContexts = n),
        (this.parent = r),
        (this.outletData = o);
    }
    get(t, n) {
      return t === xe
        ? this.route
        : t === io
        ? this.childContexts
        : t === dy
        ? this.outletData
        : this.parent.get(t, n);
    }
  },
  gc = new w("");
var Cf = (() => {
  class e {
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵcmp = We({
      type: e,
      selectors: [["ng-component"]],
      exportAs: ["emptyRouterOutlet"],
      decls: 1,
      vars: 0,
      template: function (r, o) {
        r & 1 && ut(0, "router-outlet");
      },
      dependencies: [Fi],
      encapsulation: 2,
    });
  }
  return e;
})();
function If(e) {
  let t = e.children && e.children.map(If),
    n = t ? G(C({}, e), { children: t }) : C({}, e);
  return (
    !n.component &&
      !n.loadComponent &&
      (t || n.loadChildren) &&
      n.outlet &&
      n.outlet !== P &&
      (n.component = Cf),
    n
  );
}
function xT(e, t, n) {
  let r = Ri(e, t._root, n ? n._root : void 0);
  return new Mi(r, t);
}
function Ri(e, t, n) {
  if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
    let r = n.value;
    r._futureSnapshot = t.value;
    let o = OT(e, t, n);
    return new qe(r, o);
  } else {
    if (e.shouldAttach(t.value)) {
      let i = e.retrieve(t.value);
      if (i !== null) {
        let s = i.route;
        return (
          (s.value._futureSnapshot = t.value),
          (s.children = t.children.map((a) => Ri(e, a))),
          s
        );
      }
    }
    let r = PT(t.value),
      o = t.children.map((i) => Ri(e, i));
    return new qe(r, o);
  }
}
function OT(e, t, n) {
  return t.children.map((r) => {
    for (let o of n.children)
      if (e.shouldReuseRoute(r.value, o.value.snapshot)) return Ri(e, r, o);
    return Ri(e, r);
  });
}
function PT(e) {
  return new xe(
    new pe(e.url),
    new pe(e.params),
    new pe(e.queryParams),
    new pe(e.fragment),
    new pe(e.data),
    e.outlet,
    e.component,
    e
  );
}
var no = class {
    redirectTo;
    navigationBehaviorOptions;
    constructor(t, n) {
      (this.redirectTo = t), (this.navigationBehaviorOptions = n);
    }
  },
  fy = "ngNavigationCancelingError";
function fc(e, t) {
  let { redirectTo: n, navigationBehaviorOptions: r } = bn(t)
      ? { redirectTo: t, navigationBehaviorOptions: void 0 }
      : t,
    o = py(!1, Ae.Redirect);
  return (o.url = n), (o.navigationBehaviorOptions = r), o;
}
function py(e, t) {
  let n = new Error(`NavigationCancelingError: ${e || ""}`);
  return (n[fy] = !0), (n.cancellationCode = t), n;
}
function FT(e) {
  return hy(e) && bn(e.url);
}
function hy(e) {
  return !!e && e[fy];
}
var kT = (e, t, n, r) =>
    A(
      (o) => (
        new mf(t, o.targetRouterState, o.currentRouterState, n, r).activate(e),
        o
      )
    ),
  mf = class {
    routeReuseStrategy;
    futureState;
    currState;
    forwardEvent;
    inputBindingEnabled;
    constructor(t, n, r, o, i) {
      (this.routeReuseStrategy = t),
        (this.futureState = n),
        (this.currState = r),
        (this.forwardEvent = o),
        (this.inputBindingEnabled = i);
    }
    activate(t) {
      let n = this.futureState._root,
        r = this.currState ? this.currState._root : null;
      this.deactivateChildRoutes(n, r, t),
        of(this.futureState.root),
        this.activateChildRoutes(n, r, t);
    }
    deactivateChildRoutes(t, n, r) {
      let o = Qr(n);
      t.children.forEach((i) => {
        let s = i.value.outlet;
        this.deactivateRoutes(i, o[s], r), delete o[s];
      }),
        Object.values(o).forEach((i) => {
          this.deactivateRouteAndItsChildren(i, r);
        });
    }
    deactivateRoutes(t, n, r) {
      let o = t.value,
        i = n ? n.value : null;
      if (o === i)
        if (o.component) {
          let s = r.getContext(o.outlet);
          s && this.deactivateChildRoutes(t, n, s.children);
        } else this.deactivateChildRoutes(t, n, r);
      else i && this.deactivateRouteAndItsChildren(n, r);
    }
    deactivateRouteAndItsChildren(t, n) {
      t.value.component &&
      this.routeReuseStrategy.shouldDetach(t.value.snapshot)
        ? this.detachAndStoreRouteSubtree(t, n)
        : this.deactivateRouteAndOutlet(t, n);
    }
    detachAndStoreRouteSubtree(t, n) {
      let r = n.getContext(t.value.outlet),
        o = r && t.value.component ? r.children : n,
        i = Qr(t);
      for (let s of Object.values(i)) this.deactivateRouteAndItsChildren(s, o);
      if (r && r.outlet) {
        let s = r.outlet.detach(),
          a = r.children.onOutletDeactivated();
        this.routeReuseStrategy.store(t.value.snapshot, {
          componentRef: s,
          route: t,
          contexts: a,
        });
      }
    }
    deactivateRouteAndOutlet(t, n) {
      let r = n.getContext(t.value.outlet),
        o = r && t.value.component ? r.children : n,
        i = Qr(t);
      for (let s of Object.values(i)) this.deactivateRouteAndItsChildren(s, o);
      r &&
        (r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()),
        (r.attachRef = null),
        (r.route = null));
    }
    activateChildRoutes(t, n, r) {
      let o = Qr(n);
      t.children.forEach((i) => {
        this.activateRoutes(i, o[i.value.outlet], r),
          this.forwardEvent(new cc(i.value.snapshot));
      }),
        t.children.length && this.forwardEvent(new sc(t.value.snapshot));
    }
    activateRoutes(t, n, r) {
      let o = t.value,
        i = n ? n.value : null;
      if ((of(o), o === i))
        if (o.component) {
          let s = r.getOrCreateContext(o.outlet);
          this.activateChildRoutes(t, n, s.children);
        } else this.activateChildRoutes(t, n, r);
      else if (o.component) {
        let s = r.getOrCreateContext(o.outlet);
        if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
          let a = this.routeReuseStrategy.retrieve(o.snapshot);
          this.routeReuseStrategy.store(o.snapshot, null),
            s.children.onOutletReAttached(a.contexts),
            (s.attachRef = a.componentRef),
            (s.route = a.route.value),
            s.outlet && s.outlet.attach(a.componentRef, a.route.value),
            of(a.route.value),
            this.activateChildRoutes(t, null, s.children);
        } else
          (s.attachRef = null),
            (s.route = o),
            s.outlet && s.outlet.activateWith(o, s.injector),
            this.activateChildRoutes(t, null, s.children);
      } else this.activateChildRoutes(t, null, r);
    }
  },
  pc = class {
    path;
    route;
    constructor(t) {
      (this.path = t), (this.route = this.path[this.path.length - 1]);
    }
  },
  Jr = class {
    component;
    route;
    constructor(t, n) {
      (this.component = t), (this.route = n);
    }
  };
function LT(e, t, n) {
  let r = e._root,
    o = t ? t._root : null;
  return _i(r, o, n, [r.value]);
}
function jT(e) {
  let t = e.routeConfig ? e.routeConfig.canActivateChild : null;
  return !t || t.length === 0 ? null : { node: e, guards: t };
}
function so(e, t) {
  let n = Symbol(),
    r = t.get(e, n);
  return r === n ? (typeof e == "function" && !cu(e) ? e : t.get(e)) : r;
}
function _i(
  e,
  t,
  n,
  r,
  o = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let i = Qr(t);
  return (
    e.children.forEach((s) => {
      $T(s, i[s.value.outlet], n, r.concat([s.value]), o),
        delete i[s.value.outlet];
    }),
    Object.entries(i).forEach(([s, a]) => Ii(a, n.getContext(s), o)),
    o
  );
}
function $T(
  e,
  t,
  n,
  r,
  o = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let i = e.value,
    s = t ? t.value : null,
    a = n ? n.getContext(e.value.outlet) : null;
  if (s && i.routeConfig === s.routeConfig) {
    let c = VT(s, i, i.routeConfig.runGuardsAndResolvers);
    c
      ? o.canActivateChecks.push(new pc(r))
      : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
      i.component ? _i(e, t, a ? a.children : null, r, o) : _i(e, t, n, r, o),
      c &&
        a &&
        a.outlet &&
        a.outlet.isActivated &&
        o.canDeactivateChecks.push(new Jr(a.outlet.component, s));
  } else
    s && Ii(t, a, o),
      o.canActivateChecks.push(new pc(r)),
      i.component
        ? _i(e, null, a ? a.children : null, r, o)
        : _i(e, null, n, r, o);
  return o;
}
function VT(e, t, n) {
  if (typeof n == "function") return n(e, t);
  switch (n) {
    case "pathParamsChange":
      return !Jn(e.url, t.url);
    case "pathParamsOrQueryParamsChange":
      return !Jn(e.url, t.url) || !Mt(e.queryParams, t.queryParams);
    case "always":
      return !0;
    case "paramsOrQueryParamsChange":
      return !hf(e, t) || !Mt(e.queryParams, t.queryParams);
    case "paramsChange":
    default:
      return !hf(e, t);
  }
}
function Ii(e, t, n) {
  let r = Qr(e),
    o = e.value;
  Object.entries(r).forEach(([i, s]) => {
    o.component
      ? t
        ? Ii(s, t.children.getContext(i), n)
        : Ii(s, null, n)
      : Ii(s, t, n);
  }),
    o.component
      ? t && t.outlet && t.outlet.isActivated
        ? n.canDeactivateChecks.push(new Jr(t.outlet.component, o))
        : n.canDeactivateChecks.push(new Jr(null, o))
      : n.canDeactivateChecks.push(new Jr(null, o));
}
function ki(e) {
  return typeof e == "function";
}
function BT(e) {
  return typeof e == "boolean";
}
function HT(e) {
  return e && ki(e.canLoad);
}
function UT(e) {
  return e && ki(e.canActivate);
}
function GT(e) {
  return e && ki(e.canActivateChild);
}
function zT(e) {
  return e && ki(e.canDeactivate);
}
function WT(e) {
  return e && ki(e.canMatch);
}
function gy(e) {
  return e instanceof Pt || e?.name === "EmptyError";
}
var qa = Symbol("INITIAL_VALUE");
function ro() {
  return J((e) =>
    ps(e.map((t) => t.pipe(kt(1), Zc(qa)))).pipe(
      A((t) => {
        for (let n of t)
          if (n !== !0) {
            if (n === qa) return qa;
            if (n === !1 || qT(n)) return n;
          }
        return !0;
      }),
      we((t) => t !== qa),
      kt(1)
    )
  );
}
function qT(e) {
  return bn(e) || e instanceof no;
}
function ZT(e, t) {
  return ce((n) => {
    let {
      targetSnapshot: r,
      currentSnapshot: o,
      guards: { canActivateChecks: i, canDeactivateChecks: s },
    } = n;
    return s.length === 0 && i.length === 0
      ? b(G(C({}, n), { guardsResult: !0 }))
      : YT(s, r, o, e).pipe(
          ce((a) => (a && BT(a) ? XT(r, i, e, t) : b(a))),
          A((a) => G(C({}, n), { guardsResult: a }))
        );
  });
}
function YT(e, t, n, r) {
  return ne(e).pipe(
    ce((o) => tb(o.component, o.route, n, t, r)),
    Lt((o) => o !== !0, !0)
  );
}
function XT(e, t, n, r) {
  return ne(t).pipe(
    Ft((o) =>
      yr(
        KT(o.route.parent, r),
        QT(o.route, r),
        eb(e, o.path, n),
        JT(e, o.route, n)
      )
    ),
    Lt((o) => o !== !0, !0)
  );
}
function QT(e, t) {
  return e !== null && t && t(new ac(e)), b(!0);
}
function KT(e, t) {
  return e !== null && t && t(new ic(e)), b(!0);
}
function JT(e, t, n) {
  let r = t.routeConfig ? t.routeConfig.canActivate : null;
  if (!r || r.length === 0) return b(!0);
  let o = r.map((i) =>
    vo(() => {
      let s = oo(t) ?? n,
        a = so(i, s),
        c = UT(a) ? a.canActivate(t, e) : he(s, () => a(t, e));
      return rn(c).pipe(Lt());
    })
  );
  return b(o).pipe(ro());
}
function eb(e, t, n) {
  let r = t[t.length - 1],
    i = t
      .slice(0, t.length - 1)
      .reverse()
      .map((s) => jT(s))
      .filter((s) => s !== null)
      .map((s) =>
        vo(() => {
          let a = s.guards.map((c) => {
            let u = oo(s.node) ?? n,
              l = so(c, u),
              d = GT(l) ? l.canActivateChild(r, e) : he(u, () => l(r, e));
            return rn(d).pipe(Lt());
          });
          return b(a).pipe(ro());
        })
      );
  return b(i).pipe(ro());
}
function tb(e, t, n, r, o) {
  let i = t && t.routeConfig ? t.routeConfig.canDeactivate : null;
  if (!i || i.length === 0) return b(!0);
  let s = i.map((a) => {
    let c = oo(t) ?? o,
      u = so(a, c),
      l = zT(u) ? u.canDeactivate(e, t, n, r) : he(c, () => u(e, t, n, r));
    return rn(l).pipe(Lt());
  });
  return b(s).pipe(ro());
}
function nb(e, t, n, r) {
  let o = t.canLoad;
  if (o === void 0 || o.length === 0) return b(!0);
  let i = o.map((s) => {
    let a = so(s, e),
      c = HT(a) ? a.canLoad(t, n) : he(e, () => a(t, n));
    return rn(c);
  });
  return b(i).pipe(ro(), my(r));
}
function my(e) {
  return $c(
    re((t) => {
      if (typeof t != "boolean") throw fc(e, t);
    }),
    A((t) => t === !0)
  );
}
function rb(e, t, n, r) {
  let o = t.canMatch;
  if (!o || o.length === 0) return b(!0);
  let i = o.map((s) => {
    let a = so(s, e),
      c = WT(a) ? a.canMatch(t, n) : he(e, () => a(t, n));
    return rn(c);
  });
  return b(i).pipe(ro(), my(r));
}
var Ai = class {
    segmentGroup;
    constructor(t) {
      this.segmentGroup = t || null;
    }
  },
  xi = class extends Error {
    urlTree;
    constructor(t) {
      super(), (this.urlTree = t);
    }
  };
function Xr(e) {
  return sn(new Ai(e));
}
function ob(e) {
  return sn(new I(4e3, !1));
}
function ib(e) {
  return sn(py(!1, Ae.GuardRejected));
}
var vf = class {
  urlSerializer;
  urlTree;
  constructor(t, n) {
    (this.urlSerializer = t), (this.urlTree = n);
  }
  lineralizeSegments(t, n) {
    let r = [],
      o = n.root;
    for (;;) {
      if (((r = r.concat(o.segments)), o.numberOfChildren === 0)) return b(r);
      if (o.numberOfChildren > 1 || !o.children[P])
        return ob(`${t.redirectTo}`);
      o = o.children[P];
    }
  }
  applyRedirectCommands(t, n, r, o, i) {
    return sb(n, o, i).pipe(
      A((s) => {
        if (s instanceof Rt) throw new xi(s);
        let a = this.applyRedirectCreateUrlTree(
          s,
          this.urlSerializer.parse(s),
          t,
          r
        );
        if (s[0] === "/") throw new xi(a);
        return a;
      })
    );
  }
  applyRedirectCreateUrlTree(t, n, r, o) {
    let i = this.createSegmentGroup(t, n.root, r, o);
    return new Rt(
      i,
      this.createQueryParams(n.queryParams, this.urlTree.queryParams),
      n.fragment
    );
  }
  createQueryParams(t, n) {
    let r = {};
    return (
      Object.entries(t).forEach(([o, i]) => {
        if (typeof i == "string" && i[0] === ":") {
          let a = i.substring(1);
          r[o] = n[a];
        } else r[o] = i;
      }),
      r
    );
  }
  createSegmentGroup(t, n, r, o) {
    let i = this.createSegments(t, n.segments, r, o),
      s = {};
    return (
      Object.entries(n.children).forEach(([a, c]) => {
        s[a] = this.createSegmentGroup(t, c, r, o);
      }),
      new z(i, s)
    );
  }
  createSegments(t, n, r, o) {
    return n.map((i) =>
      i.path[0] === ":" ? this.findPosParam(t, i, o) : this.findOrReturn(i, r)
    );
  }
  findPosParam(t, n, r) {
    let o = r[n.path.substring(1)];
    if (!o) throw new I(4001, !1);
    return o;
  }
  findOrReturn(t, n) {
    let r = 0;
    for (let o of n) {
      if (o.path === t.path) return n.splice(r), o;
      r++;
    }
    return t;
  }
};
function sb(e, t, n) {
  if (typeof e == "string") return b(e);
  let r = e,
    {
      queryParams: o,
      fragment: i,
      routeConfig: s,
      url: a,
      outlet: c,
      params: u,
      data: l,
      title: d,
    } = t;
  return rn(
    he(n, () =>
      r({
        params: u,
        data: l,
        queryParams: o,
        fragment: i,
        routeConfig: s,
        url: a,
        outlet: c,
        title: d,
      })
    )
  );
}
var yf = {
  matched: !1,
  consumedSegments: [],
  remainingSegments: [],
  parameters: {},
  positionalParamSegments: {},
};
function ab(e, t, n, r, o) {
  let i = vy(e, t, n);
  return i.matched
    ? ((r = NT(t, r)),
      rb(r, t, n, o).pipe(A((s) => (s === !0 ? i : C({}, yf)))))
    : b(i);
}
function vy(e, t, n) {
  if (t.path === "**") return cb(n);
  if (t.path === "")
    return t.pathMatch === "full" && (e.hasChildren() || n.length > 0)
      ? C({}, yf)
      : {
          matched: !0,
          consumedSegments: [],
          remainingSegments: n,
          parameters: {},
          positionalParamSegments: {},
        };
  let o = (t.matcher || Wv)(n, e, t);
  if (!o) return C({}, yf);
  let i = {};
  Object.entries(o.posParams ?? {}).forEach(([a, c]) => {
    i[a] = c.path;
  });
  let s =
    o.consumed.length > 0
      ? C(C({}, i), o.consumed[o.consumed.length - 1].parameters)
      : i;
  return {
    matched: !0,
    consumedSegments: o.consumed,
    remainingSegments: n.slice(o.consumed.length),
    parameters: s,
    positionalParamSegments: o.posParams ?? {},
  };
}
function cb(e) {
  return {
    matched: !0,
    parameters: e.length > 0 ? Zv(e).parameters : {},
    consumedSegments: e,
    remainingSegments: [],
    positionalParamSegments: {},
  };
}
function Uv(e, t, n, r) {
  return n.length > 0 && db(e, n, r)
    ? {
        segmentGroup: new z(t, lb(r, new z(n, e.children))),
        slicedSegments: [],
      }
    : n.length === 0 && fb(e, n, r)
    ? {
        segmentGroup: new z(e.segments, ub(e, n, r, e.children)),
        slicedSegments: n,
      }
    : { segmentGroup: new z(e.segments, e.children), slicedSegments: n };
}
function ub(e, t, n, r) {
  let o = {};
  for (let i of n)
    if (mc(e, t, i) && !r[dt(i)]) {
      let s = new z([], {});
      o[dt(i)] = s;
    }
  return C(C({}, r), o);
}
function lb(e, t) {
  let n = {};
  n[P] = t;
  for (let r of e)
    if (r.path === "" && dt(r) !== P) {
      let o = new z([], {});
      n[dt(r)] = o;
    }
  return n;
}
function db(e, t, n) {
  return n.some((r) => mc(e, t, r) && dt(r) !== P);
}
function fb(e, t, n) {
  return n.some((r) => mc(e, t, r));
}
function mc(e, t, n) {
  return (e.hasChildren() || t.length > 0) && n.pathMatch === "full"
    ? !1
    : n.path === "";
}
function pb(e, t, n) {
  return t.length === 0 && !e.children[n];
}
var Ef = class {};
function hb(e, t, n, r, o, i, s = "emptyOnly") {
  return new _f(e, t, n, r, o, s, i).recognize();
}
var gb = 31,
  _f = class {
    injector;
    configLoader;
    rootComponentType;
    config;
    urlTree;
    paramsInheritanceStrategy;
    urlSerializer;
    applyRedirects;
    absoluteRedirectCount = 0;
    allowRedirects = !0;
    constructor(t, n, r, o, i, s, a) {
      (this.injector = t),
        (this.configLoader = n),
        (this.rootComponentType = r),
        (this.config = o),
        (this.urlTree = i),
        (this.paramsInheritanceStrategy = s),
        (this.urlSerializer = a),
        (this.applyRedirects = new vf(this.urlSerializer, this.urlTree));
    }
    noMatchError(t) {
      return new I(4002, `'${t.segmentGroup}'`);
    }
    recognize() {
      let t = Uv(this.urlTree.root, [], [], this.config).segmentGroup;
      return this.match(t).pipe(
        A(({ children: n, rootSnapshot: r }) => {
          let o = new qe(r, n),
            i = new Ni("", o),
            s = ry(r, [], this.urlTree.queryParams, this.urlTree.fragment);
          return (
            (s.queryParams = this.urlTree.queryParams),
            (i.url = this.urlSerializer.serialize(s)),
            { state: i, tree: s }
          );
        })
      );
    }
    match(t) {
      let n = new er(
        [],
        Object.freeze({}),
        Object.freeze(C({}, this.urlTree.queryParams)),
        this.urlTree.fragment,
        Object.freeze({}),
        P,
        this.rootComponentType,
        null,
        {}
      );
      return this.processSegmentGroup(this.injector, this.config, t, P, n).pipe(
        A((r) => ({ children: r, rootSnapshot: n })),
        Ye((r) => {
          if (r instanceof xi)
            return (this.urlTree = r.urlTree), this.match(r.urlTree.root);
          throw r instanceof Ai ? this.noMatchError(r) : r;
        })
      );
    }
    processSegmentGroup(t, n, r, o, i) {
      return r.segments.length === 0 && r.hasChildren()
        ? this.processChildren(t, n, r, i)
        : this.processSegment(t, n, r, r.segments, o, !0, i).pipe(
            A((s) => (s instanceof qe ? [s] : []))
          );
    }
    processChildren(t, n, r, o) {
      let i = [];
      for (let s of Object.keys(r.children))
        s === "primary" ? i.unshift(s) : i.push(s);
      return ne(i).pipe(
        Ft((s) => {
          let a = r.children[s],
            c = RT(n, s);
          return this.processSegmentGroup(t, c, a, s, o);
        }),
        Wc((s, a) => (s.push(...a), s)),
        an(null),
        zc(),
        ce((s) => {
          if (s === null) return Xr(r);
          let a = yy(s);
          return mb(a), b(a);
        })
      );
    }
    processSegment(t, n, r, o, i, s, a) {
      return ne(n).pipe(
        Ft((c) =>
          this.processSegmentAgainstRoute(
            c._injector ?? t,
            n,
            c,
            r,
            o,
            i,
            s,
            a
          ).pipe(
            Ye((u) => {
              if (u instanceof Ai) return b(null);
              throw u;
            })
          )
        ),
        Lt((c) => !!c),
        Ye((c) => {
          if (gy(c)) return pb(r, o, i) ? b(new Ef()) : Xr(r);
          throw c;
        })
      );
    }
    processSegmentAgainstRoute(t, n, r, o, i, s, a, c) {
      return dt(r) !== s && (s === P || !mc(o, i, r))
        ? Xr(o)
        : r.redirectTo === void 0
        ? this.matchSegmentAgainstRoute(t, o, r, i, s, c)
        : this.allowRedirects && a
        ? this.expandSegmentAgainstRouteUsingRedirect(t, o, n, r, i, s, c)
        : Xr(o);
    }
    expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s, a) {
      let {
        matched: c,
        parameters: u,
        consumedSegments: l,
        positionalParamSegments: d,
        remainingSegments: p,
      } = vy(n, o, i);
      if (!c) return Xr(n);
      typeof o.redirectTo == "string" &&
        o.redirectTo[0] === "/" &&
        (this.absoluteRedirectCount++,
        this.absoluteRedirectCount > gb && (this.allowRedirects = !1));
      let f = new er(
          i,
          u,
          Object.freeze(C({}, this.urlTree.queryParams)),
          this.urlTree.fragment,
          Gv(o),
          dt(o),
          o.component ?? o._loadedComponent ?? null,
          o,
          zv(o)
        ),
        v = dc(f, a, this.paramsInheritanceStrategy);
      return (
        (f.params = Object.freeze(v.params)),
        (f.data = Object.freeze(v.data)),
        this.applyRedirects
          .applyRedirectCommands(l, o.redirectTo, d, f, t)
          .pipe(
            J((_) => this.applyRedirects.lineralizeSegments(o, _)),
            ce((_) => this.processSegment(t, r, n, _.concat(p), s, !1, a))
          )
      );
    }
    matchSegmentAgainstRoute(t, n, r, o, i, s) {
      let a = ab(n, r, o, t, this.urlSerializer);
      return (
        r.path === "**" && (n.children = {}),
        a.pipe(
          J((c) =>
            c.matched
              ? ((t = r._injector ?? t),
                this.getChildConfig(t, r, o).pipe(
                  J(({ routes: u }) => {
                    let l = r._loadedInjector ?? t,
                      {
                        parameters: d,
                        consumedSegments: p,
                        remainingSegments: f,
                      } = c,
                      v = new er(
                        p,
                        d,
                        Object.freeze(C({}, this.urlTree.queryParams)),
                        this.urlTree.fragment,
                        Gv(r),
                        dt(r),
                        r.component ?? r._loadedComponent ?? null,
                        r,
                        zv(r)
                      ),
                      E = dc(v, s, this.paramsInheritanceStrategy);
                    (v.params = Object.freeze(E.params)),
                      (v.data = Object.freeze(E.data));
                    let { segmentGroup: _, slicedSegments: y } = Uv(n, p, f, u);
                    if (y.length === 0 && _.hasChildren())
                      return this.processChildren(l, u, _, v).pipe(
                        A((se) => new qe(v, se))
                      );
                    if (u.length === 0 && y.length === 0)
                      return b(new qe(v, []));
                    let U = dt(r) === i;
                    return this.processSegment(
                      l,
                      u,
                      _,
                      y,
                      U ? P : i,
                      !0,
                      v
                    ).pipe(A((se) => new qe(v, se instanceof qe ? [se] : [])));
                  })
                ))
              : Xr(n)
          )
        )
      );
    }
    getChildConfig(t, n, r) {
      return n.children
        ? b({ routes: n.children, injector: t })
        : n.loadChildren
        ? n._loadedRoutes !== void 0
          ? b({ routes: n._loadedRoutes, injector: n._loadedInjector })
          : nb(t, n, r, this.urlSerializer).pipe(
              ce((o) =>
                o
                  ? this.configLoader.loadChildren(t, n).pipe(
                      re((i) => {
                        (n._loadedRoutes = i.routes),
                          (n._loadedInjector = i.injector);
                      })
                    )
                  : ib(n)
              )
            )
        : b({ routes: [], injector: t });
    }
  };
function mb(e) {
  e.sort((t, n) =>
    t.value.outlet === P
      ? -1
      : n.value.outlet === P
      ? 1
      : t.value.outlet.localeCompare(n.value.outlet)
  );
}
function vb(e) {
  let t = e.value.routeConfig;
  return t && t.path === "";
}
function yy(e) {
  let t = [],
    n = new Set();
  for (let r of e) {
    if (!vb(r)) {
      t.push(r);
      continue;
    }
    let o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
    o !== void 0 ? (o.children.push(...r.children), n.add(o)) : t.push(r);
  }
  for (let r of n) {
    let o = yy(r.children);
    t.push(new qe(r.value, o));
  }
  return t.filter((r) => !n.has(r));
}
function Gv(e) {
  return e.data || {};
}
function zv(e) {
  return e.resolve || {};
}
function yb(e, t, n, r, o, i) {
  return ce((s) =>
    hb(e, t, n, r, s.extractedUrl, o, i).pipe(
      A(({ state: a, tree: c }) =>
        G(C({}, s), { targetSnapshot: a, urlAfterRedirects: c })
      )
    )
  );
}
function Eb(e, t) {
  return ce((n) => {
    let {
      targetSnapshot: r,
      guards: { canActivateChecks: o },
    } = n;
    if (!o.length) return b(n);
    let i = new Set(o.map((c) => c.route)),
      s = new Set();
    for (let c of i) if (!s.has(c)) for (let u of Ey(c)) s.add(u);
    let a = 0;
    return ne(s).pipe(
      Ft((c) =>
        i.has(c)
          ? _b(c, r, e, t)
          : ((c.data = dc(c, c.parent, e).resolve), b(void 0))
      ),
      re(() => a++),
      Er(1),
      ce((c) => (a === s.size ? b(n) : Oe))
    );
  });
}
function Ey(e) {
  let t = e.children.map((n) => Ey(n)).flat();
  return [e, ...t];
}
function _b(e, t, n, r) {
  let o = e.routeConfig,
    i = e._resolve;
  return (
    o?.title !== void 0 && !ly(o) && (i[Oi] = o.title),
    vo(
      () => (
        (e.data = dc(e, e.parent, n).resolve),
        Db(i, e, t, r).pipe(
          A(
            (s) => ((e._resolvedData = s), (e.data = C(C({}, e.data), s)), null)
          )
        )
      )
    )
  );
}
function Db(e, t, n, r) {
  let o = cf(e);
  if (o.length === 0) return b({});
  let i = {};
  return ne(o).pipe(
    ce((s) =>
      Cb(e[s], t, n, r).pipe(
        Lt(),
        re((a) => {
          if (a instanceof no) throw fc(new nr(), a);
          i[s] = a;
        })
      )
    ),
    Er(1),
    A(() => i),
    Ye((s) => (gy(s) ? Oe : sn(s)))
  );
}
function Cb(e, t, n, r) {
  let o = oo(t) ?? r,
    i = so(e, o),
    s = i.resolve ? i.resolve(t, n) : he(o, () => i(t, n));
  return rn(s);
}
function sf(e) {
  return J((t) => {
    let n = e(t);
    return n ? ne(n).pipe(A(() => t)) : b(t);
  });
}
var Sf = (() => {
    class e {
      buildTitle(n) {
        let r,
          o = n.root;
        for (; o !== void 0; )
          (r = this.getResolvedTitleForRoute(o) ?? r),
            (o = o.children.find((i) => i.outlet === P));
        return r;
      }
      getResolvedTitleForRoute(n) {
        return n.data[Oi];
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = S({ token: e, factory: () => g(_y), providedIn: "root" });
    }
    return e;
  })(),
  _y = (() => {
    class e extends Sf {
      title;
      constructor(n) {
        super(), (this.title = n);
      }
      updateTitle(n) {
        let r = this.buildTitle(n);
        r !== void 0 && this.title.setTitle(r);
      }
      static ɵfac = function (r) {
        return new (r || e)(R(Rv));
      };
      static ɵprov = S({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  ao = new w("", { providedIn: "root", factory: () => ({}) }),
  Li = new w(""),
  Dy = (() => {
    class e {
      componentLoaders = new WeakMap();
      childrenLoaders = new WeakMap();
      onLoadStartListener;
      onLoadEndListener;
      compiler = g(Cd);
      loadComponent(n, r) {
        if (this.componentLoaders.get(r)) return this.componentLoaders.get(r);
        if (r._loadedComponent) return b(r._loadedComponent);
        this.onLoadStartListener && this.onLoadStartListener(r);
        let o = rn(he(n, () => r.loadComponent())).pipe(
            A(Iy),
            J(Sy),
            re((s) => {
              this.onLoadEndListener && this.onLoadEndListener(r),
                (r._loadedComponent = s);
            }),
            An(() => {
              this.componentLoaders.delete(r);
            })
          ),
          i = new mr(o, () => new K()).pipe(gr());
        return this.componentLoaders.set(r, i), i;
      }
      loadChildren(n, r) {
        if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
        if (r._loadedRoutes)
          return b({ routes: r._loadedRoutes, injector: r._loadedInjector });
        this.onLoadStartListener && this.onLoadStartListener(r);
        let i = Cy(r, this.compiler, n, this.onLoadEndListener).pipe(
            An(() => {
              this.childrenLoaders.delete(r);
            })
          ),
          s = new mr(i, () => new K()).pipe(gr());
        return this.childrenLoaders.set(r, s), s;
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = S({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })();
function Cy(e, t, n, r) {
  return rn(he(n, () => e.loadChildren())).pipe(
    A(Iy),
    J(Sy),
    ce((o) =>
      o instanceof Sa || Array.isArray(o) ? b(o) : ne(t.compileModuleAsync(o))
    ),
    A((o) => {
      r && r(e);
      let i,
        s,
        a = !1;
      return (
        Array.isArray(o)
          ? ((s = o), (a = !0))
          : ((i = o.create(n).injector),
            (s = i.get(Li, [], { optional: !0, self: !0 }).flat())),
        { routes: s.map(If), injector: i }
      );
    })
  );
}
function Ib(e) {
  return e && typeof e == "object" && "default" in e;
}
function Iy(e) {
  return Ib(e) ? e.default : e;
}
function Sy(e) {
  return b(e);
}
var vc = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = S({ token: e, factory: () => g(Sb), providedIn: "root" });
    }
    return e;
  })(),
  Sb = (() => {
    class e {
      shouldProcessUrl(n) {
        return !0;
      }
      extract(n) {
        return n;
      }
      merge(n, r) {
        return n;
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = S({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  wy = new w("");
var Ty = new w(""),
  by = (() => {
    class e {
      currentNavigation = Le(null, { equal: () => !1 });
      currentTransition = null;
      lastSuccessfulNavigation = null;
      events = new K();
      transitionAbortWithErrorSubject = new K();
      configLoader = g(Dy);
      environmentInjector = g(ue);
      destroyRef = g(Gt);
      urlSerializer = g(Pi);
      rootContexts = g(io);
      location = g(Gr);
      inputBindingEnabled = g(gc, { optional: !0 }) !== null;
      titleStrategy = g(Sf);
      options = g(ao, { optional: !0 }) || {};
      paramsInheritanceStrategy =
        this.options.paramsInheritanceStrategy || "emptyOnly";
      urlHandlingStrategy = g(vc);
      createViewTransition = g(wy, { optional: !0 });
      navigationErrorHandler = g(Ty, { optional: !0 });
      navigationId = 0;
      get hasRequestedNavigation() {
        return this.navigationId !== 0;
      }
      transitions;
      afterPreactivation = () => b(void 0);
      rootComponentType = null;
      destroyed = !1;
      constructor() {
        let n = (o) => this.events.next(new rc(o)),
          r = (o) => this.events.next(new oc(o));
        (this.configLoader.onLoadEndListener = r),
          (this.configLoader.onLoadStartListener = n),
          this.destroyRef.onDestroy(() => {
            this.destroyed = !0;
          });
      }
      complete() {
        this.transitions?.complete();
      }
      handleNavigationRequest(n) {
        let r = ++this.navigationId;
        et(() => {
          this.transitions?.next(
            G(C({}, n), {
              extractedUrl: this.urlHandlingStrategy.extract(n.rawUrl),
              targetSnapshot: null,
              targetRouterState: null,
              guards: { canActivateChecks: [], canDeactivateChecks: [] },
              guardsResult: null,
              abortController: new AbortController(),
              id: r,
            })
          );
        });
      }
      setupNavigations(n) {
        return (
          (this.transitions = new pe(null)),
          this.transitions.pipe(
            we((r) => r !== null),
            J((r) => {
              let o = !1;
              return b(r).pipe(
                J((i) => {
                  if (this.navigationId > r.id)
                    return (
                      this.cancelNavigationTransition(
                        r,
                        "",
                        Ae.SupersededByNewNavigation
                      ),
                      Oe
                    );
                  (this.currentTransition = r),
                    this.currentNavigation.set({
                      id: i.id,
                      initialUrl: i.rawUrl,
                      extractedUrl: i.extractedUrl,
                      targetBrowserUrl:
                        typeof i.extras.browserUrl == "string"
                          ? this.urlSerializer.parse(i.extras.browserUrl)
                          : i.extras.browserUrl,
                      trigger: i.source,
                      extras: i.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? G(C({}, this.lastSuccessfulNavigation), {
                            previousNavigation: null,
                          })
                        : null,
                      abort: () => i.abortController.abort(),
                    });
                  let s =
                      !n.navigated ||
                      this.isUpdatingInternalState() ||
                      this.isUpdatedBrowserUrl(),
                    a = i.extras.onSameUrlNavigation ?? n.onSameUrlNavigation;
                  if (!s && a !== "reload")
                    return (
                      this.events.next(
                        new nn(
                          i.id,
                          this.urlSerializer.serialize(i.rawUrl),
                          "",
                          wi.IgnoredSameUrlNavigation
                        )
                      ),
                      i.resolve(!1),
                      Oe
                    );
                  if (this.urlHandlingStrategy.shouldProcessUrl(i.rawUrl))
                    return b(i).pipe(
                      J(
                        (c) => (
                          this.events.next(
                            new rr(
                              c.id,
                              this.urlSerializer.serialize(c.extractedUrl),
                              c.source,
                              c.restoredState
                            )
                          ),
                          c.id !== this.navigationId ? Oe : Promise.resolve(c)
                        )
                      ),
                      yb(
                        this.environmentInjector,
                        this.configLoader,
                        this.rootComponentType,
                        n.config,
                        this.urlSerializer,
                        this.paramsInheritanceStrategy
                      ),
                      re((c) => {
                        (r.targetSnapshot = c.targetSnapshot),
                          (r.urlAfterRedirects = c.urlAfterRedirects),
                          this.currentNavigation.update(
                            (l) => ((l.finalUrl = c.urlAfterRedirects), l)
                          );
                        let u = new Ti(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          this.urlSerializer.serialize(c.urlAfterRedirects),
                          c.targetSnapshot
                        );
                        this.events.next(u);
                      })
                    );
                  if (
                    s &&
                    this.urlHandlingStrategy.shouldProcessUrl(i.currentRawUrl)
                  ) {
                    let {
                        id: c,
                        extractedUrl: u,
                        source: l,
                        restoredState: d,
                        extras: p,
                      } = i,
                      f = new rr(c, this.urlSerializer.serialize(u), l, d);
                    this.events.next(f);
                    let v = cy(this.rootComponentType).snapshot;
                    return (
                      (this.currentTransition = r =
                        G(C({}, i), {
                          targetSnapshot: v,
                          urlAfterRedirects: u,
                          extras: G(C({}, p), {
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          }),
                        })),
                      this.currentNavigation.update(
                        (E) => ((E.finalUrl = u), E)
                      ),
                      b(r)
                    );
                  } else
                    return (
                      this.events.next(
                        new nn(
                          i.id,
                          this.urlSerializer.serialize(i.extractedUrl),
                          "",
                          wi.IgnoredByUrlHandlingStrategy
                        )
                      ),
                      i.resolve(!1),
                      Oe
                    );
                }),
                re((i) => {
                  let s = new Ja(
                    i.id,
                    this.urlSerializer.serialize(i.extractedUrl),
                    this.urlSerializer.serialize(i.urlAfterRedirects),
                    i.targetSnapshot
                  );
                  this.events.next(s);
                }),
                A(
                  (i) => (
                    (this.currentTransition = r =
                      G(C({}, i), {
                        guards: LT(
                          i.targetSnapshot,
                          i.currentSnapshot,
                          this.rootContexts
                        ),
                      })),
                    r
                  )
                ),
                ZT(this.environmentInjector, (i) => this.events.next(i)),
                re((i) => {
                  if (
                    ((r.guardsResult = i.guardsResult),
                    i.guardsResult && typeof i.guardsResult != "boolean")
                  )
                    throw fc(this.urlSerializer, i.guardsResult);
                  let s = new ec(
                    i.id,
                    this.urlSerializer.serialize(i.extractedUrl),
                    this.urlSerializer.serialize(i.urlAfterRedirects),
                    i.targetSnapshot,
                    !!i.guardsResult
                  );
                  this.events.next(s);
                }),
                we((i) =>
                  i.guardsResult
                    ? !0
                    : (this.cancelNavigationTransition(i, "", Ae.GuardRejected),
                      !1)
                ),
                sf((i) => {
                  if (i.guards.canActivateChecks.length !== 0)
                    return b(i).pipe(
                      re((s) => {
                        let a = new tc(
                          s.id,
                          this.urlSerializer.serialize(s.extractedUrl),
                          this.urlSerializer.serialize(s.urlAfterRedirects),
                          s.targetSnapshot
                        );
                        this.events.next(a);
                      }),
                      J((s) => {
                        let a = !1;
                        return b(s).pipe(
                          Eb(
                            this.paramsInheritanceStrategy,
                            this.environmentInjector
                          ),
                          re({
                            next: () => (a = !0),
                            complete: () => {
                              a ||
                                this.cancelNavigationTransition(
                                  s,
                                  "",
                                  Ae.NoDataFromResolver
                                );
                            },
                          })
                        );
                      }),
                      re((s) => {
                        let a = new nc(
                          s.id,
                          this.urlSerializer.serialize(s.extractedUrl),
                          this.urlSerializer.serialize(s.urlAfterRedirects),
                          s.targetSnapshot
                        );
                        this.events.next(a);
                      })
                    );
                }),
                sf((i) => {
                  let s = (a) => {
                    let c = [];
                    if (a.routeConfig?.loadComponent) {
                      let u = oo(a) ?? this.environmentInjector;
                      c.push(
                        this.configLoader.loadComponent(u, a.routeConfig).pipe(
                          re((l) => {
                            a.component = l;
                          }),
                          A(() => {})
                        )
                      );
                    }
                    for (let u of a.children) c.push(...s(u));
                    return c;
                  };
                  return ps(s(i.targetSnapshot.root)).pipe(an(null), kt(1));
                }),
                sf(() => this.afterPreactivation()),
                J(() => {
                  let { currentSnapshot: i, targetSnapshot: s } = r,
                    a = this.createViewTransition?.(
                      this.environmentInjector,
                      i.root,
                      s.root
                    );
                  return a ? ne(a).pipe(A(() => r)) : b(r);
                }),
                A((i) => {
                  let s = xT(
                    n.routeReuseStrategy,
                    i.targetSnapshot,
                    i.currentRouterState
                  );
                  return (
                    (this.currentTransition = r =
                      G(C({}, i), { targetRouterState: s })),
                    this.currentNavigation.update(
                      (a) => ((a.targetRouterState = s), a)
                    ),
                    r
                  );
                }),
                re(() => {
                  this.events.next(new bi());
                }),
                kT(
                  this.rootContexts,
                  n.routeReuseStrategy,
                  (i) => this.events.next(i),
                  this.inputBindingEnabled
                ),
                kt(1),
                gs(
                  new $((i) => {
                    let s = r.abortController.signal,
                      a = () => i.next();
                    return (
                      s.addEventListener("abort", a),
                      () => s.removeEventListener("abort", a)
                    );
                  }).pipe(
                    we(() => !o && !r.targetRouterState),
                    re(() => {
                      this.cancelNavigationTransition(
                        r,
                        r.abortController.signal.reason + "",
                        Ae.Aborted
                      );
                    })
                  )
                ),
                re({
                  next: (i) => {
                    (o = !0),
                      (this.lastSuccessfulNavigation = et(
                        this.currentNavigation
                      )),
                      this.events.next(
                        new ft(
                          i.id,
                          this.urlSerializer.serialize(i.extractedUrl),
                          this.urlSerializer.serialize(i.urlAfterRedirects)
                        )
                      ),
                      this.titleStrategy?.updateTitle(
                        i.targetRouterState.snapshot
                      ),
                      i.resolve(!0);
                  },
                  complete: () => {
                    o = !0;
                  },
                }),
                gs(
                  this.transitionAbortWithErrorSubject.pipe(
                    re((i) => {
                      throw i;
                    })
                  )
                ),
                An(() => {
                  o ||
                    this.cancelNavigationTransition(
                      r,
                      "",
                      Ae.SupersededByNewNavigation
                    ),
                    this.currentTransition?.id === r.id &&
                      (this.currentNavigation.set(null),
                      (this.currentTransition = null));
                }),
                Ye((i) => {
                  if (this.destroyed) return r.resolve(!1), Oe;
                  if (((o = !0), hy(i)))
                    this.events.next(
                      new Nt(
                        r.id,
                        this.urlSerializer.serialize(r.extractedUrl),
                        i.message,
                        i.cancellationCode
                      )
                    ),
                      FT(i)
                        ? this.events.next(
                            new to(i.url, i.navigationBehaviorOptions)
                          )
                        : r.resolve(!1);
                  else {
                    let s = new eo(
                      r.id,
                      this.urlSerializer.serialize(r.extractedUrl),
                      i,
                      r.targetSnapshot ?? void 0
                    );
                    try {
                      let a = he(this.environmentInjector, () =>
                        this.navigationErrorHandler?.(s)
                      );
                      if (a instanceof no) {
                        let { message: c, cancellationCode: u } = fc(
                          this.urlSerializer,
                          a
                        );
                        this.events.next(
                          new Nt(
                            r.id,
                            this.urlSerializer.serialize(r.extractedUrl),
                            c,
                            u
                          )
                        ),
                          this.events.next(
                            new to(a.redirectTo, a.navigationBehaviorOptions)
                          );
                      } else throw (this.events.next(s), i);
                    } catch (a) {
                      this.options.resolveNavigationPromiseOnError
                        ? r.resolve(!1)
                        : r.reject(a);
                    }
                  }
                  return Oe;
                })
              );
            })
          )
        );
      }
      cancelNavigationTransition(n, r, o) {
        let i = new Nt(
          n.id,
          this.urlSerializer.serialize(n.extractedUrl),
          r,
          o
        );
        this.events.next(i), n.resolve(!1);
      }
      isUpdatingInternalState() {
        return (
          this.currentTransition?.extractedUrl.toString() !==
          this.currentTransition?.currentUrlTree.toString()
        );
      }
      isUpdatedBrowserUrl() {
        let n = this.urlHandlingStrategy.extract(
            this.urlSerializer.parse(this.location.path(!0))
          ),
          r = et(this.currentNavigation),
          o = r?.targetBrowserUrl ?? r?.extractedUrl;
        return n.toString() !== o?.toString() && !r?.extras.skipLocationChange;
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = S({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })();
function wb(e) {
  return e !== Ci;
}
var My = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = S({ token: e, factory: () => g(Tb), providedIn: "root" });
    }
    return e;
  })(),
  hc = class {
    shouldDetach(t) {
      return !1;
    }
    store(t, n) {}
    shouldAttach(t) {
      return !1;
    }
    retrieve(t) {
      return null;
    }
    shouldReuseRoute(t, n) {
      return t.routeConfig === n.routeConfig;
    }
  },
  Tb = (() => {
    class e extends hc {
      static ɵfac = (() => {
        let n;
        return function (o) {
          return (n || (n = la(e)))(o || e);
        };
      })();
      static ɵprov = S({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  Ny = (() => {
    class e {
      urlSerializer = g(Pi);
      options = g(ao, { optional: !0 }) || {};
      canceledNavigationResolution =
        this.options.canceledNavigationResolution || "replace";
      location = g(Gr);
      urlHandlingStrategy = g(vc);
      urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred";
      currentUrlTree = new Rt();
      getCurrentUrlTree() {
        return this.currentUrlTree;
      }
      rawUrlTree = this.currentUrlTree;
      getRawUrlTree() {
        return this.rawUrlTree;
      }
      createBrowserPath({ finalUrl: n, initialUrl: r, targetBrowserUrl: o }) {
        let i = n !== void 0 ? this.urlHandlingStrategy.merge(n, r) : r,
          s = o ?? i;
        return s instanceof Rt ? this.urlSerializer.serialize(s) : s;
      }
      commitTransition({ targetRouterState: n, finalUrl: r, initialUrl: o }) {
        r && n
          ? ((this.currentUrlTree = r),
            (this.rawUrlTree = this.urlHandlingStrategy.merge(r, o)),
            (this.routerState = n))
          : (this.rawUrlTree = o);
      }
      routerState = cy(null);
      getRouterState() {
        return this.routerState;
      }
      stateMemento = this.createStateMemento();
      updateStateMemento() {
        this.stateMemento = this.createStateMemento();
      }
      createStateMemento() {
        return {
          rawUrlTree: this.rawUrlTree,
          currentUrlTree: this.currentUrlTree,
          routerState: this.routerState,
        };
      }
      resetInternalState({ finalUrl: n }) {
        (this.routerState = this.stateMemento.routerState),
          (this.currentUrlTree = this.stateMemento.currentUrlTree),
          (this.rawUrlTree = this.urlHandlingStrategy.merge(
            this.currentUrlTree,
            n ?? this.rawUrlTree
          ));
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = S({ token: e, factory: () => g(bb), providedIn: "root" });
    }
    return e;
  })(),
  bb = (() => {
    class e extends Ny {
      currentPageId = 0;
      lastSuccessfulId = -1;
      restoredState() {
        return this.location.getState();
      }
      get browserPageId() {
        return this.canceledNavigationResolution !== "computed"
          ? this.currentPageId
          : this.restoredState()?.ɵrouterPageId ?? this.currentPageId;
      }
      registerNonRouterCurrentEntryChangeListener(n) {
        return this.location.subscribe((r) => {
          r.type === "popstate" &&
            setTimeout(() => {
              n(r.url, r.state, "popstate");
            });
        });
      }
      handleRouterEvent(n, r) {
        n instanceof rr
          ? this.updateStateMemento()
          : n instanceof nn
          ? this.commitTransition(r)
          : n instanceof Ti
          ? this.urlUpdateStrategy === "eager" &&
            (r.extras.skipLocationChange ||
              this.setBrowserUrl(this.createBrowserPath(r), r))
          : n instanceof bi
          ? (this.commitTransition(r),
            this.urlUpdateStrategy === "deferred" &&
              !r.extras.skipLocationChange &&
              this.setBrowserUrl(this.createBrowserPath(r), r))
          : n instanceof Nt &&
            n.code !== Ae.SupersededByNewNavigation &&
            n.code !== Ae.Redirect
          ? this.restoreHistory(r)
          : n instanceof eo
          ? this.restoreHistory(r, !0)
          : n instanceof ft &&
            ((this.lastSuccessfulId = n.id),
            (this.currentPageId = this.browserPageId));
      }
      setBrowserUrl(n, { extras: r, id: o }) {
        let { replaceUrl: i, state: s } = r;
        if (this.location.isCurrentPathEqualTo(n) || i) {
          let a = this.browserPageId,
            c = C(C({}, s), this.generateNgRouterState(o, a));
          this.location.replaceState(n, "", c);
        } else {
          let a = C(
            C({}, s),
            this.generateNgRouterState(o, this.browserPageId + 1)
          );
          this.location.go(n, "", a);
        }
      }
      restoreHistory(n, r = !1) {
        if (this.canceledNavigationResolution === "computed") {
          let o = this.browserPageId,
            i = this.currentPageId - o;
          i !== 0
            ? this.location.historyGo(i)
            : this.getCurrentUrlTree() === n.finalUrl &&
              i === 0 &&
              (this.resetInternalState(n), this.resetUrlToCurrentUrlTree());
        } else
          this.canceledNavigationResolution === "replace" &&
            (r && this.resetInternalState(n), this.resetUrlToCurrentUrlTree());
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(
          this.urlSerializer.serialize(this.getRawUrlTree()),
          "",
          this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
        );
      }
      generateNgRouterState(n, r) {
        return this.canceledNavigationResolution === "computed"
          ? { navigationId: n, ɵrouterPageId: r }
          : { navigationId: n };
      }
      static ɵfac = (() => {
        let n;
        return function (o) {
          return (n || (n = la(e)))(o || e);
        };
      })();
      static ɵprov = S({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })();
function wf(e, t) {
  e.events
    .pipe(
      we(
        (n) =>
          n instanceof ft ||
          n instanceof Nt ||
          n instanceof eo ||
          n instanceof nn
      ),
      A((n) =>
        n instanceof ft || n instanceof nn
          ? 0
          : (
              n instanceof Nt
                ? n.code === Ae.Redirect ||
                  n.code === Ae.SupersededByNewNavigation
                : !1
            )
          ? 2
          : 1
      ),
      we((n) => n !== 2),
      kt(1)
    )
    .subscribe(() => {
      t();
    });
}
var Mb = {
    paths: "exact",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "exact",
  },
  Nb = {
    paths: "subset",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "subset",
  },
  co = (() => {
    class e {
      get currentUrlTree() {
        return this.stateManager.getCurrentUrlTree();
      }
      get rawUrlTree() {
        return this.stateManager.getRawUrlTree();
      }
      disposed = !1;
      nonRouterCurrentEntryChangeSubscription;
      console = g(pd);
      stateManager = g(Ny);
      options = g(ao, { optional: !0 }) || {};
      pendingTasks = g(_t);
      urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred";
      navigationTransitions = g(by);
      urlSerializer = g(Pi);
      location = g(Gr);
      urlHandlingStrategy = g(vc);
      injector = g(ue);
      _events = new K();
      get events() {
        return this._events;
      }
      get routerState() {
        return this.stateManager.getRouterState();
      }
      navigated = !1;
      routeReuseStrategy = g(My);
      onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore";
      config = g(Li, { optional: !0 })?.flat() ?? [];
      componentInputBindingEnabled = !!g(gc, { optional: !0 });
      currentNavigation =
        this.navigationTransitions.currentNavigation.asReadonly();
      constructor() {
        this.resetConfig(this.config),
          this.navigationTransitions.setupNavigations(this).subscribe({
            error: (n) => {
              this.console.warn(n);
            },
          }),
          this.subscribeToNavigationEvents();
      }
      eventsSubscription = new ae();
      subscribeToNavigationEvents() {
        let n = this.navigationTransitions.events.subscribe((r) => {
          try {
            let o = this.navigationTransitions.currentTransition,
              i = et(this.navigationTransitions.currentNavigation);
            if (o !== null && i !== null) {
              if (
                (this.stateManager.handleRouterEvent(r, i),
                r instanceof Nt &&
                  r.code !== Ae.Redirect &&
                  r.code !== Ae.SupersededByNewNavigation)
              )
                this.navigated = !0;
              else if (r instanceof ft) this.navigated = !0;
              else if (r instanceof to) {
                let s = r.navigationBehaviorOptions,
                  a = this.urlHandlingStrategy.merge(r.url, o.currentRawUrl),
                  c = C(
                    {
                      browserUrl: o.extras.browserUrl,
                      info: o.extras.info,
                      skipLocationChange: o.extras.skipLocationChange,
                      replaceUrl:
                        o.extras.replaceUrl ||
                        this.urlUpdateStrategy === "eager" ||
                        wb(o.source),
                    },
                    s
                  );
                this.scheduleNavigation(a, Ci, null, c, {
                  resolve: o.resolve,
                  reject: o.reject,
                  promise: o.promise,
                });
              }
            }
            MT(r) && this._events.next(r);
          } catch (o) {
            this.navigationTransitions.transitionAbortWithErrorSubject.next(o);
          }
        });
        this.eventsSubscription.add(n);
      }
      resetRootComponentType(n) {
        (this.routerState.root.component = n),
          (this.navigationTransitions.rootComponentType = n);
      }
      initialNavigation() {
        this.setUpLocationChangeListener(),
          this.navigationTransitions.hasRequestedNavigation ||
            this.navigateToSyncWithBrowser(
              this.location.path(!0),
              Ci,
              this.stateManager.restoredState()
            );
      }
      setUpLocationChangeListener() {
        this.nonRouterCurrentEntryChangeSubscription ??=
          this.stateManager.registerNonRouterCurrentEntryChangeListener(
            (n, r, o) => {
              this.navigateToSyncWithBrowser(n, o, r);
            }
          );
      }
      navigateToSyncWithBrowser(n, r, o) {
        let i = { replaceUrl: !0 },
          s = o?.navigationId ? o : null;
        if (o) {
          let c = C({}, o);
          delete c.navigationId,
            delete c.ɵrouterPageId,
            Object.keys(c).length !== 0 && (i.state = c);
        }
        let a = this.parseUrl(n);
        this.scheduleNavigation(a, r, s, i).catch((c) => {
          this.disposed || this.injector.get(_e)(c);
        });
      }
      get url() {
        return this.serializeUrl(this.currentUrlTree);
      }
      getCurrentNavigation() {
        return et(this.navigationTransitions.currentNavigation);
      }
      get lastSuccessfulNavigation() {
        return this.navigationTransitions.lastSuccessfulNavigation;
      }
      resetConfig(n) {
        (this.config = n.map(If)), (this.navigated = !1);
      }
      ngOnDestroy() {
        this.dispose();
      }
      dispose() {
        this._events.unsubscribe(),
          this.navigationTransitions.complete(),
          this.nonRouterCurrentEntryChangeSubscription &&
            (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
            (this.nonRouterCurrentEntryChangeSubscription = void 0)),
          (this.disposed = !0),
          this.eventsSubscription.unsubscribe();
      }
      createUrlTree(n, r = {}) {
        let {
            relativeTo: o,
            queryParams: i,
            fragment: s,
            queryParamsHandling: a,
            preserveFragment: c,
          } = r,
          u = c ? this.currentUrlTree.fragment : s,
          l = null;
        switch (a ?? this.options.defaultQueryParamsHandling) {
          case "merge":
            l = C(C({}, this.currentUrlTree.queryParams), i);
            break;
          case "preserve":
            l = this.currentUrlTree.queryParams;
            break;
          default:
            l = i || null;
        }
        l !== null && (l = this.removeEmptyProps(l));
        let d;
        try {
          let p = o ? o.snapshot : this.routerState.snapshot.root;
          d = oy(p);
        } catch {
          (typeof n[0] != "string" || n[0][0] !== "/") && (n = []),
            (d = this.currentUrlTree.root);
        }
        return iy(d, n, l, u ?? null);
      }
      navigateByUrl(n, r = { skipLocationChange: !1 }) {
        let o = bn(n) ? n : this.parseUrl(n),
          i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
        return this.scheduleNavigation(i, Ci, null, r);
      }
      navigate(n, r = { skipLocationChange: !1 }) {
        return Rb(n), this.navigateByUrl(this.createUrlTree(n, r), r);
      }
      serializeUrl(n) {
        return this.urlSerializer.serialize(n);
      }
      parseUrl(n) {
        try {
          return this.urlSerializer.parse(n);
        } catch {
          return this.console.warn(dn(4018, !1)), this.urlSerializer.parse("/");
        }
      }
      isActive(n, r) {
        let o;
        if (
          (r === !0 ? (o = C({}, Mb)) : r === !1 ? (o = C({}, Nb)) : (o = r),
          bn(n))
        )
          return $v(this.currentUrlTree, n, o);
        let i = this.parseUrl(n);
        return $v(this.currentUrlTree, i, o);
      }
      removeEmptyProps(n) {
        return Object.entries(n).reduce(
          (r, [o, i]) => (i != null && (r[o] = i), r),
          {}
        );
      }
      scheduleNavigation(n, r, o, i, s) {
        if (this.disposed) return Promise.resolve(!1);
        let a, c, u;
        s
          ? ((a = s.resolve), (c = s.reject), (u = s.promise))
          : (u = new Promise((d, p) => {
              (a = d), (c = p);
            }));
        let l = this.pendingTasks.add();
        return (
          wf(this, () => {
            queueMicrotask(() => this.pendingTasks.remove(l));
          }),
          this.navigationTransitions.handleNavigationRequest({
            source: r,
            restoredState: o,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.currentUrlTree,
            rawUrl: n,
            extras: i,
            resolve: a,
            reject: c,
            promise: u,
            currentSnapshot: this.routerState.snapshot,
            currentRouterState: this.routerState,
          }),
          u.catch((d) => Promise.reject(d))
        );
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = S({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })();
function Rb(e) {
  for (let t = 0; t < e.length; t++) if (e[t] == null) throw new I(4008, !1);
}
var Ve = (() => {
    class e {
      router;
      route;
      tabIndexAttribute;
      renderer;
      el;
      locationStrategy;
      reactiveHref = Le(null);
      get href() {
        return et(this.reactiveHref);
      }
      set href(n) {
        this.reactiveHref.set(n);
      }
      target;
      queryParams;
      fragment;
      queryParamsHandling;
      state;
      info;
      relativeTo;
      isAnchorElement;
      subscription;
      onChanges = new K();
      applicationErrorHandler = g(_e);
      options = g(ao, { optional: !0 });
      constructor(n, r, o, i, s, a) {
        (this.router = n),
          (this.route = r),
          (this.tabIndexAttribute = o),
          (this.renderer = i),
          (this.el = s),
          (this.locationStrategy = a),
          this.reactiveHref.set(g(new Aa("href"), { optional: !0 }));
        let c = s.nativeElement.tagName?.toLowerCase();
        (this.isAnchorElement =
          c === "a" ||
          c === "area" ||
          !!(
            typeof customElements == "object" &&
            customElements.get(c)?.observedAttributes?.includes?.("href")
          )),
          this.isAnchorElement
            ? this.setTabIndexIfNotOnNativeEl("0")
            : this.subscribeToNavigationEventsIfNecessary();
      }
      subscribeToNavigationEventsIfNecessary() {
        if (this.subscription !== void 0 || !this.isAnchorElement) return;
        let n = this.preserveFragment,
          r = (o) => o === "merge" || o === "preserve";
        (n ||= r(this.queryParamsHandling)),
          (n ||=
            !this.queryParamsHandling &&
            !r(this.options?.defaultQueryParamsHandling)),
          n &&
            (this.subscription = this.router.events.subscribe((o) => {
              o instanceof ft && this.updateHref();
            }));
      }
      preserveFragment = !1;
      skipLocationChange = !1;
      replaceUrl = !1;
      setTabIndexIfNotOnNativeEl(n) {
        this.tabIndexAttribute != null ||
          this.isAnchorElement ||
          this.applyAttributeValue("tabindex", n);
      }
      ngOnChanges(n) {
        this.isAnchorElement &&
          (this.updateHref(), this.subscribeToNavigationEventsIfNecessary()),
          this.onChanges.next(this);
      }
      routerLinkInput = null;
      set routerLink(n) {
        n == null
          ? ((this.routerLinkInput = null),
            this.setTabIndexIfNotOnNativeEl(null))
          : (bn(n)
              ? (this.routerLinkInput = n)
              : (this.routerLinkInput = Array.isArray(n) ? n : [n]),
            this.setTabIndexIfNotOnNativeEl("0"));
      }
      onClick(n, r, o, i, s) {
        let a = this.urlTree;
        if (
          a === null ||
          (this.isAnchorElement &&
            (n !== 0 ||
              r ||
              o ||
              i ||
              s ||
              (typeof this.target == "string" && this.target != "_self")))
        )
          return !0;
        let c = {
          skipLocationChange: this.skipLocationChange,
          replaceUrl: this.replaceUrl,
          state: this.state,
          info: this.info,
        };
        return (
          this.router.navigateByUrl(a, c)?.catch((u) => {
            this.applicationErrorHandler(u);
          }),
          !this.isAnchorElement
        );
      }
      ngOnDestroy() {
        this.subscription?.unsubscribe();
      }
      updateHref() {
        let n = this.urlTree;
        this.reactiveHref.set(
          n !== null && this.locationStrategy
            ? this.locationStrategy?.prepareExternalUrl(
                this.router.serializeUrl(n)
              ) ?? ""
            : null
        );
      }
      applyAttributeValue(n, r) {
        let o = this.renderer,
          i = this.el.nativeElement;
        r !== null ? o.setAttribute(i, n, r) : o.removeAttribute(i, n);
      }
      get urlTree() {
        return this.routerLinkInput === null
          ? null
          : bn(this.routerLinkInput)
          ? this.routerLinkInput
          : this.router.createUrlTree(this.routerLinkInput, {
              relativeTo:
                this.relativeTo !== void 0 ? this.relativeTo : this.route,
              queryParams: this.queryParams,
              fragment: this.fragment,
              queryParamsHandling: this.queryParamsHandling,
              preserveFragment: this.preserveFragment,
            });
      }
      static ɵfac = function (r) {
        return new (r || e)(
          ie(co),
          ie(xe),
          Yo("tabindex"),
          ie(Zn),
          ie(at),
          ie(Ur)
        );
      };
      static ɵdir = ct({
        type: e,
        selectors: [["", "routerLink", ""]],
        hostVars: 2,
        hostBindings: function (r, o) {
          r & 1 &&
            Je("click", function (s) {
              return o.onClick(
                s.button,
                s.ctrlKey,
                s.shiftKey,
                s.altKey,
                s.metaKey
              );
            }),
            r & 2 && St("href", o.reactiveHref(), Vl)("target", o.target);
        },
        inputs: {
          target: "target",
          queryParams: "queryParams",
          fragment: "fragment",
          queryParamsHandling: "queryParamsHandling",
          state: "state",
          info: "info",
          relativeTo: "relativeTo",
          preserveFragment: [2, "preserveFragment", "preserveFragment", Qt],
          skipLocationChange: [
            2,
            "skipLocationChange",
            "skipLocationChange",
            Qt,
          ],
          replaceUrl: [2, "replaceUrl", "replaceUrl", Qt],
          routerLink: "routerLink",
        },
        features: [qt],
      });
    }
    return e;
  })(),
  Tf = (() => {
    class e {
      router;
      element;
      renderer;
      cdr;
      link;
      links;
      classes = [];
      routerEventsSubscription;
      linkInputChangesSubscription;
      _isActive = !1;
      get isActive() {
        return this._isActive;
      }
      routerLinkActiveOptions = { exact: !1 };
      ariaCurrentWhenActive;
      isActiveChange = new De();
      constructor(n, r, o, i, s) {
        (this.router = n),
          (this.element = r),
          (this.renderer = o),
          (this.cdr = i),
          (this.link = s),
          (this.routerEventsSubscription = n.events.subscribe((a) => {
            a instanceof ft && this.update();
          }));
      }
      ngAfterContentInit() {
        b(this.links.changes, b(null))
          .pipe(vr())
          .subscribe((n) => {
            this.update(), this.subscribeToEachLinkOnChanges();
          });
      }
      subscribeToEachLinkOnChanges() {
        this.linkInputChangesSubscription?.unsubscribe();
        let n = [...this.links.toArray(), this.link]
          .filter((r) => !!r)
          .map((r) => r.onChanges);
        this.linkInputChangesSubscription = ne(n)
          .pipe(vr())
          .subscribe((r) => {
            this._isActive !== this.isLinkActive(this.router)(r) &&
              this.update();
          });
      }
      set routerLinkActive(n) {
        let r = Array.isArray(n) ? n : n.split(" ");
        this.classes = r.filter((o) => !!o);
      }
      ngOnChanges(n) {
        this.update();
      }
      ngOnDestroy() {
        this.routerEventsSubscription.unsubscribe(),
          this.linkInputChangesSubscription?.unsubscribe();
      }
      update() {
        !this.links ||
          !this.router.navigated ||
          queueMicrotask(() => {
            let n = this.hasActiveLinks();
            this.classes.forEach((r) => {
              n
                ? this.renderer.addClass(this.element.nativeElement, r)
                : this.renderer.removeClass(this.element.nativeElement, r);
            }),
              n && this.ariaCurrentWhenActive !== void 0
                ? this.renderer.setAttribute(
                    this.element.nativeElement,
                    "aria-current",
                    this.ariaCurrentWhenActive.toString()
                  )
                : this.renderer.removeAttribute(
                    this.element.nativeElement,
                    "aria-current"
                  ),
              this._isActive !== n &&
                ((this._isActive = n),
                this.cdr.markForCheck(),
                this.isActiveChange.emit(n));
          });
      }
      isLinkActive(n) {
        let r = xb(this.routerLinkActiveOptions)
          ? this.routerLinkActiveOptions
          : this.routerLinkActiveOptions.exact || !1;
        return (o) => {
          let i = o.urlTree;
          return i ? n.isActive(i, r) : !1;
        };
      }
      hasActiveLinks() {
        let n = this.isLinkActive(this.router);
        return (this.link && n(this.link)) || this.links.some(n);
      }
      static ɵfac = function (r) {
        return new (r || e)(ie(co), ie(at), ie(Zn), ie(Sn), ie(Ve, 8));
      };
      static ɵdir = ct({
        type: e,
        selectors: [["", "routerLinkActive", ""]],
        contentQueries: function (r, o, i) {
          if ((r & 1 && yd(i, Ve, 5), r & 2)) {
            let s;
            Ed((s = _d())) && (o.links = s);
          }
        },
        inputs: {
          routerLinkActiveOptions: "routerLinkActiveOptions",
          ariaCurrentWhenActive: "ariaCurrentWhenActive",
          routerLinkActive: "routerLinkActive",
        },
        outputs: { isActiveChange: "isActiveChange" },
        exportAs: ["routerLinkActive"],
        features: [qt],
      });
    }
    return e;
  })();
function xb(e) {
  return !!e.paths;
}
var Ob = new w("");
function bf(e, ...t) {
  return Ht([
    { provide: Li, multi: !0, useValue: e },
    [],
    { provide: xe, useFactory: Pb, deps: [co] },
    { provide: Ta, multi: !0, useFactory: Fb },
    t.map((n) => n.ɵproviders),
  ]);
}
function Pb(e) {
  return e.routerState.root;
}
function Fb() {
  let e = g(Xe);
  return (t) => {
    let n = e.get(Xn);
    if (t !== n.components[0]) return;
    let r = e.get(co),
      o = e.get(kb);
    e.get(Lb) === 1 && r.initialNavigation(),
      e.get(jb, null, { optional: !0 })?.setUpPreloading(),
      e.get(Ob, null, { optional: !0 })?.init(),
      r.resetRootComponentType(n.componentTypes[0]),
      o.closed || (o.next(), o.complete(), o.unsubscribe());
  };
}
var kb = new w("", { factory: () => new K() }),
  Lb = new w("", { providedIn: "root", factory: () => 1 });
var jb = new w("");
var uo = "smbg-lang",
  yc = class e {
    documentRef = g(Y);
    localeSignal = Le(this.detectLocale());
    locale = this.localeSignal.asReadonly();
    switchLocale(t) {
      this.localeSignal() !== t &&
        (typeof window > "u" ||
          (this.persistLocale(t),
          this.localeSignal.set(t),
          this.documentRef?.documentElement &&
            (this.documentRef.documentElement.lang = t),
          window.location.reload()));
    }
    detectLocale() {
      let t = this.getStoredLocale();
      return (
        t ||
        ((this.documentRef?.documentElement?.lang ?? "")
          .toLowerCase()
          .startsWith("hi")
          ? "hi"
          : "en")
      );
    }
    persistLocale(t) {
      if (!(typeof localStorage > "u"))
        try {
          localStorage.setItem(uo, t);
        } catch {}
    }
    getStoredLocale() {
      if (typeof localStorage > "u") return null;
      try {
        let t = localStorage.getItem(uo);
        return t === "hi" ? "hi" : t === "en" ? "en" : null;
      } catch {
        return null;
      }
    }
    static ɵfac = function (n) {
      return new (n || e)();
    };
    static ɵprov = S({ token: e, factory: e.ɵfac, providedIn: "root" });
  };
var $b = "chapter-summary.json",
  Vb = "chapter-verse-detail-temp.json",
  Bb = "chapter-verse-word-meaning-temp.json",
  At = class e {
    http = g(za);
    documentRef = g(Y, { optional: !0 });
    locale = this.resolveLocale();
    chapterSummaries$ = this.loadJson($b).pipe(
      yo({ bufferSize: 1, refCount: !1 })
    );
    chapterDetails$ = this.loadJson(Vb).pipe(
      A((t) =>
        t.map((n) =>
          G(C({}, n), {
            previousChapterRoute: this.hashLinkToRoute(n.previousChapterUrl),
            nextChapterRoute: this.hashLinkToRoute(n.nextChapterUrl),
            verses: n.verses.map((r) =>
              G(C({}, r), {
                currentVerseRoute: this.hashLinkToRoute(r.currentVerseUrl),
                nextVerseRoute: this.hashLinkToRoute(r.nextVerseUrl),
                previousVerseRoute: this.hashLinkToRoute(r.previousVerseUrl),
                meaning: r.meaning.map((o) => this.enhanceMeaningEntry(o)),
              })
            ),
          })
        )
      ),
      yo({ bufferSize: 1, refCount: !1 })
    );
    wordMeanings$ = this.loadJson(Bb).pipe(
      A((t) =>
        t.map((n) =>
          G(C({}, n), {
            previousWMRoute: this.hashLinkToRoute(n.previousWMUrl),
            nextWMRoute: this.hashLinkToRoute(n.nextWMUrl),
            data: n.data.map((r) =>
              G(C({}, r), { route: this.hashLinkToRoute(r.refLink) })
            ),
          })
        )
      ),
      yo({ bufferSize: 1, refCount: !1 })
    );
    getChapterSummaries() {
      return this.chapterSummaries$;
    }
    getChapters() {
      return this.chapterDetails$;
    }
    getChapterById(t) {
      return this.chapterDetails$.pipe(A((n) => n.find((r) => r.id === t)));
    }
    getVerse(t, n) {
      return this.chapterDetails$.pipe(
        A((r) => {
          let o = r.find((s) => s.id === t);
          if (!o) return;
          let i = o.verses.find((s) => s.id === n);
          if (i) return { chapter: o, verse: i };
        })
      );
    }
    getWordMeaning(t) {
      return this.wordMeanings$.pipe(A((n) => n.find((r) => r.id === t)));
    }
    enhanceMeaningEntry(t) {
      return G(C({}, t), {
        wordMeaningDetailRoute: this.hashLinkToRoute(t.wordMeaningDetailUrl),
      });
    }
    hashLinkToRoute(t) {
      if (!t) return;
      let n = t.trim();
      return !n || !n.startsWith("#/")
        ? void 0
        : ["/", ...n.slice(2).split("/").filter(Boolean)];
    }
    loadJson(t) {
      let n = `smbg/assets/data/json/${t}`;
      if (this.locale === "en") return this.http.get(n);
      let r = `smbg/assets/data/json/${this.locale}/${t}`;
      return this.http
        .get(r)
        .pipe(Ye((o) => (o.status === 404 ? this.http.get(n) : sn(() => o))));
    }
    resolveLocale() {
      let t = this.getStoredLocale();
      return (
        t ||
        ((g(Hr) ?? "en").toLowerCase().startsWith("hi") ||
        (
          this.documentRef?.documentElement?.lang?.toLowerCase() ?? ""
        ).startsWith("hi")
          ? "hi"
          : "en")
      );
    }
    getStoredLocale() {
      if (typeof localStorage > "u") return null;
      try {
        let t = localStorage.getItem(uo);
        return t === "hi" ? "hi" : t === "en" ? "en" : null;
      } catch {
        return null;
      }
    }
    static ɵfac = function (n) {
      return new (n || e)();
    };
    static ɵprov = S({ token: e, factory: e.ɵfac, providedIn: "root" });
  };
var Hb = () => ["/"],
  Ub = (e, t) => ["/chapter", e, "verse", t];
function Gb(e, t) {
  if (
    (e & 1 &&
      (m(0, "a", 36)(1, "span", 27),
      M(2, "\u2B05\uFE0F"),
      h(),
      m(3, "span", 28),
      N(4, 5),
      h()()),
    e & 2)
  ) {
    let n = q(2).ngIf;
    T("routerLink", n.previousChapterRoute);
  }
}
function zb(e, t) {
  if (
    (e & 1 &&
      (m(0, "a", 36)(1, "span", 27),
      M(2, "\u27A1\uFE0F"),
      h(),
      m(3, "span", 28),
      N(4, 6),
      h()()),
    e & 2)
  ) {
    let n = q(2).ngIf;
    T("routerLink", n.nextChapterRoute);
  }
}
function Wb(e, t) {
  if ((e & 1 && (m(0, "p"), M(1), h()), e & 2)) {
    let n = t.$implicit;
    D(), ee(" ", n, " ");
  }
}
function qb(e, t) {
  if (
    (e & 1 &&
      (je(0),
      m(1, "a", 52)(2, "span", 27),
      M(3, "\u{1F9E0}"),
      h(),
      m(4, "span", 28),
      N(5, 10),
      h()(),
      $e()),
    e & 2)
  ) {
    let n = t.ngIf;
    D(), T("routerLink", n);
  }
}
function Zb(e, t) {
  if ((e & 1 && (m(0, "div", 53), M(1), h()), e & 2)) {
    let n = t.$implicit;
    D(), ee(" ", n.value, " ");
  }
}
function Yb(e, t) {
  if ((e & 1 && (m(0, "div", 54), M(1), h()), e & 2)) {
    let n = t.$implicit;
    D(), ee(" ", n.value, " ");
  }
}
function Xb(e, t) {
  if (
    (e & 1 &&
      (m(0, "li", 55)(1, "span", 56), M(2), h(), m(3, "span", 57), M(4), h()()),
    e & 2)
  ) {
    let n = t.$implicit;
    D(2), Re(n.header), D(2), ee(" \u2014 ", n.value, " ");
  }
}
function Qb(e, t) {
  if (
    (e & 1 &&
      (m(0, "div", 19)(1, "div", 37)(2, "div", 38)(3, "div")(4, "h3", 39),
      M(5),
      h(),
      m(6, "p", 40),
      M(7),
      h()(),
      m(8, "div", 41)(9, "a", 42)(10, "span", 27),
      M(11, "\u{1F4DC}"),
      h(),
      m(12, "span", 28),
      N(13, 7),
      h()(),
      k(14, qb, 6, 1, "ng-container", 43),
      h()(),
      m(15, "div", 31)(16, "div", 44)(17, "div", 45)(18, "h4", 46),
      M(19, " \u0936\u094D\u0932\u094B\u0915 "),
      h(),
      m(20, "div", 47),
      k(21, Zb, 2, 1, "div", 48),
      h()(),
      m(22, "div", 45)(23, "h4", 46),
      N(24, 8),
      h(),
      m(25, "div", 47),
      k(26, Yb, 2, 1, "div", 49),
      h()(),
      m(27, "div", 19)(28, "h4", 46),
      N(29, 9),
      h(),
      m(30, "ul", 50),
      k(31, Xb, 5, 2, "li", 51),
      h()()()()()()),
    e & 2)
  ) {
    let n = t.$implicit,
      r = q(2).ngIf;
    D(5),
      Re(n.verseHeader),
      D(2),
      Re(n.oneLiner),
      D(2),
      T("routerLink", Dd(7, Ub, r.id, n.id)),
      D(5),
      T(
        "ngIf",
        n.meaning[0] == null ? null : n.meaning[0].wordMeaningDetailRoute
      ),
      D(7),
      T("ngForOf", n.shlok),
      D(5),
      T("ngForOf", n.shlokEng),
      D(5),
      T("ngForOf", n.translation);
  }
}
function Kb(e, t) {
  if (
    (e & 1 &&
      (je(0),
      m(1, "div", 18)(2, "div", 19)(3, "div", 20)(4, "div", 21)(5, "div")(
        6,
        "p",
        22
      ),
      N(7, 2),
      h(),
      m(8, "h1", 23),
      M(9),
      h(),
      m(10, "p", 24),
      M(11),
      h()(),
      m(12, "div", 25)(13, "a", 26)(14, "span", 27),
      M(15, "\u{1F3E0}"),
      h(),
      m(16, "span", 28),
      N(17, 3),
      h()(),
      k(18, Gb, 5, 1, "a", 29)(19, zb, 5, 1, "a", 29),
      h()()()(),
      m(20, "div", 19)(21, "div", 30)(22, "div", 31)(23, "div", 32),
      k(24, Wb, 2, 1, "p", 33),
      h()()()(),
      m(25, "div", 19)(26, "h2", 34),
      N(27, 4),
      h()(),
      k(28, Qb, 32, 10, "div", 35),
      h(),
      $e()),
    e & 2)
  ) {
    let n = q().ngIf;
    D(9),
      ee(" ", n.chapterTitleForChapterPage, " "),
      D(2),
      ee(" ", n.chapterSubTitleForChapterPage, " "),
      D(2),
      T("routerLink", ii(7, Hb)),
      D(5),
      T("ngIf", n.previousChapterRoute),
      D(),
      T("ngIf", n.nextChapterRoute),
      D(5),
      T("ngForOf", n.description),
      D(4),
      T("ngForOf", n.verses);
  }
}
function Jb(e, t) {
  if (
    (e & 1 && (m(0, "div", 16), k(1, Kb, 29, 8, "ng-container", 17), h()),
    e & 2)
  ) {
    let n = t.ngIf;
    q();
    let r = ge(6);
    D(), T("ngIf", n)("ngIfElse", r);
  }
}
function eM(e, t) {
  e & 1 && (m(0, "div", 58)(1, "div", 59)(2, "span", 60), N(3, 11), h()()());
}
function tM(e, t) {
  e & 1 &&
    (m(0, "section", 61)(1, "div", 16)(2, "div", 62)(3, "span"),
    N(4, 12),
    h(),
    m(5, "a", 63),
    N(6, 13),
    h(),
    M(7, ". "),
    h()()());
}
var Ec = class e {
  route = g(xe);
  dataService = g(At);
  chapter$ = this.route.paramMap.pipe(
    J((t) => {
      let n = t.get("chapterId");
      return n ? this.dataService.getChapterById(n) : b(void 0);
    })
  );
  static ɵfac = function (n) {
    return new (n || e)();
  };
  static ɵcmp = We({
    type: e,
    selectors: [["app-chapter"]],
    decls: 7,
    vars: 4,
    consts: () => {
      let t;
      t = $localize`:@@chapterBreadcrumbLabel: Bhagavad Gita `;
      let n;
      n = $localize`:@@chapterHomeCta:Home`;
      let r;
      r = $localize`:@@chapterVersesHeading:Verses`;
      let o;
      o = $localize`:@@chapterPreviousCta:Previous Chapter`;
      let i;
      i = $localize`:@@chapterNextCta:Next Chapter`;
      let s;
      s = $localize`:@@chapterViewVerseCta:View Verse`;
      let a;
      a = $localize`:@@chapterTransliterationHeading: Transliteration `;
      let c;
      c = $localize`:@@chapterTranslationHeading: Translation `;
      let u;
      u = $localize`:@@chapterWordMeaningsCta:Word Meanings`;
      let l;
      l = $localize`:@@chapterLoadingLabel:Loading chapter…`;
      let d;
      d = $localize`:@@chapterMissingMessage:Requested chapter could not be found. Please return to the`;
      let p;
      return (
        (p = $localize`:@@chapterMissingHomeLink:home page`),
        [
          ["loading", ""],
          ["notFound", ""],
          t,
          n,
          r,
          o,
          i,
          s,
          a,
          c,
          u,
          l,
          d,
          p,
          [1, "chapter-page", "py-4"],
          ["class", "container", 4, "ngIf", "ngIfElse"],
          [1, "container"],
          [4, "ngIf", "ngIfElse"],
          [1, "row", "g-4"],
          [1, "col-12"],
          [1, "chapter-header", "p-4", "rounded", "text-white"],
          [
            1,
            "d-flex",
            "flex-column",
            "flex-lg-row",
            "justify-content-between",
            "align-items-lg-center",
            "gap-3",
          ],
          [1, "text-uppercase", "small", "text-white-50", "mb-1"],
          [1, "h2", "mb-2"],
          [1, "mb-0", "text-white-75"],
          [1, "d-flex", "flex-wrap", "gap-2"],
          [1, "btn", "btn-outline-light", "btn-sm", 3, "routerLink"],
          ["aria-hidden", "true", 1, "icon-inline"],
          [1, "ms-1"],
          ["class", "btn btn-light btn-sm", 3, "routerLink", 4, "ngIf"],
          [1, "card", "shadow-sm", "border-0"],
          [1, "card-body"],
          [1, "chapter-description"],
          [4, "ngFor", "ngForOf"],
          [1, "h4", "text-primary-emphasis", "mb-3"],
          ["class", "col-12", 4, "ngFor", "ngForOf"],
          [1, "btn", "btn-light", "btn-sm", 3, "routerLink"],
          [1, "card", "verse-card", "border-0", "shadow-sm"],
          [
            1,
            "card-header",
            "bg-transparent",
            "d-flex",
            "flex-column",
            "flex-md-row",
            "justify-content-between",
            "gap-3",
          ],
          [1, "h5", "mb-1"],
          [1, "mb-0", "text-body-secondary"],
          [1, "d-flex", "gap-2", "flex-wrap"],
          [1, "btn", "btn-sm", "btn-primary", 3, "routerLink"],
          [4, "ngIf"],
          [1, "verse-content", "row", "g-4"],
          [1, "col-md-6"],
          [1, "h6", "text-uppercase", "text-primary", "fw-semibold", "mb-2"],
          [1, "verse-block"],
          ["class", "sanskrit-line", 4, "ngFor", "ngForOf"],
          ["class", "transliteration-line", 4, "ngFor", "ngForOf"],
          [1, "list-unstyled", "mb-0"],
          ["class", "mb-2", 4, "ngFor", "ngForOf"],
          [1, "btn", "btn-sm", "btn-outline-primary", 3, "routerLink"],
          [1, "sanskrit-line"],
          [1, "transliteration-line"],
          [1, "mb-2"],
          [1, "fw-semibold", "text-body"],
          [1, "text-body-secondary"],
          [1, "d-flex", "justify-content-center", "py-5"],
          ["role", "status", 1, "spinner-border", "text-primary"],
          [1, "visually-hidden"],
          [1, "py-5"],
          ["role", "alert", 1, "alert", "alert-warning"],
          ["routerLink", "/", 1, "alert-link"],
        ]
      );
    },
    template: function (n, r) {
      if (
        (n & 1 &&
          (m(0, "section", 14),
          k(1, Jb, 2, 2, "div", 15),
          Yt(2, "async"),
          h(),
          k(3, eM, 4, 0, "ng-template", null, 0, me)(
            5,
            tM,
            8,
            0,
            "ng-template",
            null,
            1,
            me
          )),
        n & 2)
      ) {
        let o = ge(4);
        D(), T("ngIf", Xt(2, 2, r.chapter$))("ngIfElse", o);
      }
    },
    dependencies: [lt, wt, Ve, Jt],
    styles: [
      ".chapter-page[_ngcontent-%COMP%]{background-color:var(--app-surface-bg);transition:background-color .2s ease}.chapter-page[_ngcontent-%COMP%]   .chapter-header[_ngcontent-%COMP%]{background:linear-gradient(135deg,#0d6efd,#6610f2)}.chapter-page[_ngcontent-%COMP%]   .chapter-description[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] + p[_ngcontent-%COMP%]{margin-top:1rem}.chapter-page[_ngcontent-%COMP%]   .verse-card[_ngcontent-%COMP%]   .verse-block[_ngcontent-%COMP%]{background-color:var(--app-verse-block-primary);border-radius:.5rem;padding:1rem;transition:background-color .2s ease}.chapter-page[_ngcontent-%COMP%]   .verse-card[_ngcontent-%COMP%]   .sanskrit-line[_ngcontent-%COMP%]{font-size:1.1rem;font-weight:600;text-align:center}.chapter-page[_ngcontent-%COMP%]   .verse-card[_ngcontent-%COMP%]   .transliteration-line[_ngcontent-%COMP%]{font-size:1rem;font-style:italic;text-align:center}.chapter-page[_ngcontent-%COMP%]   .verse-card[_ngcontent-%COMP%]   .verse-block[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] + *[_ngcontent-%COMP%]{margin-top:.5rem}",
    ],
  });
};
var nM = (e) => ["/chapter", e];
function rM(e, t) {
  if ((e & 1 && (m(0, "p"), M(1), h()), e & 2)) {
    let n = t.$implicit;
    D(), ee(" ", n, " ");
  }
}
function oM(e, t) {
  if (
    (e & 1 &&
      (m(0, "div", 23)(1, "div", 24)(2, "div", 25)(3, "h3", 26),
      M(4),
      h(),
      m(5, "p", 27),
      M(6),
      h(),
      m(7, "div", 28)(8, "a", 29)(9, "span", 30),
      M(10, "\u{1F4D6}"),
      h(),
      m(11, "span", 31),
      N(12, 4),
      h()()()()()()),
    e & 2)
  ) {
    let n = t.$implicit;
    D(4),
      Re(n.chapterTitle),
      D(2),
      ee(" ", n.briefDescription, " "),
      D(2),
      T("routerLink", si(3, nM, n.id));
  }
}
function iM(e, t) {
  if (
    (e & 1 &&
      (m(0, "div", 20)(1, "div", 15)(2, "h2", 21),
      N(3, 3),
      h()(),
      k(4, oM, 13, 5, "div", 22),
      h()),
    e & 2)
  ) {
    let n = t.ngIf;
    D(4), T("ngForOf", n);
  }
}
function sM(e, t) {
  e & 1 && (m(0, "div", 32)(1, "div", 33)(2, "span", 34), N(3, 5), h()()());
}
var _c = class e {
  dataService = g(At);
  summaries$ = this.dataService.getChapterSummaries();
  introParagraphs = [
    "\u0936\u094D\u0930\u0940\u092E\u0926\u094D\u092D\u0917\u0935\u0926\u094D\u200C\u0917\u0940\u0924\u093E \u0939\u093F\u0928\u094D\u0926\u0941\u0913\u0902 \u0915\u0947 \u092A\u0935\u093F\u0924\u094D\u0930\u0924\u092E \u0917\u094D\u0930\u0928\u094D\u0925\u094B\u0902 \u092E\u0947\u0902 \u0938\u0947 \u090F\u0915 \u0939\u0948\u0964 \u092E\u0939\u093E\u092D\u093E\u0930\u0924 \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930 \u0915\u0941\u0930\u0941\u0915\u094D\u0937\u0947\u0924\u094D\u0930 \u092F\u0941\u0926\u094D\u0927 \u092E\u0947\u0902 \u092D\u0917\u0935\u093E\u0928 \u0936\u094D\u0930\u0940 \u0915\u0943\u0937\u094D\u0923 \u0928\u0947 \u0917\u0940\u0924\u093E \u0915\u093E \u0938\u0928\u094D\u0926\u0947\u0936 \u0905\u0930\u094D\u091C\u0941\u0928 \u0915\u094B \u0938\u0941\u0928\u093E\u092F\u093E \u0925\u093E\u0964 \u092F\u0939 \u092E\u0939\u093E\u092D\u093E\u0930\u0924 \u0915\u0947 \u092D\u0940\u0937\u094D\u092E\u092A\u0930\u094D\u0935 \u0915\u0947 \u0905\u0928\u094D\u0924\u0930\u094D\u0917\u0924 \u0926\u093F\u092F\u093E \u0917\u092F\u093E \u090F\u0915 \u0909\u092A\u0928\u093F\u0937\u0926\u094D \u0939\u0948\u0964 \u092D\u0917\u0935\u0924 \u0917\u0940\u0924\u093E \u092E\u0947\u0902 \u090F\u0915\u0947\u0936\u094D\u0935\u0930\u0935\u093E\u0926, \u0915\u0930\u094D\u092E \u092F\u094B\u0917, \u091C\u094D\u091E\u093E\u0928\u092F\u094B\u0917, \u092D\u0915\u094D\u0924\u093F \u092F\u094B\u0917 \u0915\u0940 \u092C\u0939\u0941\u0924 \u0938\u0941\u0928\u094D\u0926\u0930 \u0922\u0902\u0917 \u0938\u0947 \u091A\u0930\u094D\u091A\u093E \u0939\u0941\u0908 \u0939\u0948\u0964",
    "\u0936\u094D\u0930\u0940\u092E\u0926\u094D\u092D\u0917\u0935\u0926\u094D\u200C\u0917\u0940\u0924\u093E \u0915\u0940 \u092A\u0943\u0937\u094D\u0920\u092D\u0942\u092E\u093F \u092E\u0939\u093E\u092D\u093E\u0930\u0924 \u0915\u093E \u092F\u0941\u0926\u094D\u0927 \u0939\u0948\u0964 \u091C\u093F\u0938 \u092A\u094D\u0930\u0915\u093E\u0930 \u090F\u0915 \u0938\u093E\u092E\u093E\u0928\u094D\u092F \u092E\u0928\u0941\u0937\u094D\u092F \u0905\u092A\u0928\u0947 \u091C\u0940\u0935\u0928 \u0915\u0940 \u0938\u092E\u0938\u094D\u092F\u093E\u0913\u0902 \u092E\u0947\u0902 \u0909\u0932\u091D\u0915\u0930 \u0915\u093F\u0902\u0915\u0930\u094D\u0924\u0935\u094D\u092F\u0935\u093F\u092E\u0942\u0922\u093C \u0939\u094B \u091C\u093E\u0924\u093E \u0939\u0948 \u0914\u0930 \u091C\u0940\u0935\u0928 \u0915\u0940 \u0938\u092E\u0938\u094D\u092F\u093E\u092F\u094B\u0902 \u0938\u0947 \u0932\u095C\u0928\u0947 \u0915\u0940 \u092C\u091C\u093E\u092F \u0909\u0938\u0938\u0947 \u092D\u093E\u0917\u0928\u0947 \u0915\u093E \u092E\u0928 \u092C\u0928\u093E \u0932\u0947\u0924\u093E \u0939\u0948 \u0909\u0938\u0940 \u092A\u094D\u0930\u0915\u093E\u0930 \u0905\u0930\u094D\u091C\u0941\u0928 \u091C\u094B \u092E\u0939\u093E\u092D\u093E\u0930\u0924 \u0915\u0947 \u092E\u0939\u093E\u0928\u093E\u092F\u0915 \u0925\u0947, \u0905\u092A\u0928\u0947 \u0938\u093E\u092E\u0928\u0947 \u0906\u0928\u0947 \u0935\u093E\u0932\u0940 \u0938\u092E\u0938\u094D\u092F\u093E\u0913\u0902 \u0938\u0947 \u092D\u092F\u092D\u0940\u0924 \u0939\u094B\u0915\u0930 \u091C\u0940\u0935\u0928 \u0914\u0930 \u0915\u094D\u0937\u0924\u094D\u0930\u093F\u092F \u0927\u0930\u094D\u092E \u0938\u0947 \u0928\u093F\u0930\u093E\u0936 \u0939\u094B \u0917\u090F \u0925\u0947, \u0905\u0930\u094D\u091C\u0941\u0928 \u0915\u0940 \u0924\u0930\u0939 \u0939\u0940 \u0939\u092E \u0938\u092D\u0940 \u0915\u092D\u0940-\u0915\u092D\u0940 \u0905\u0928\u093F\u0936\u094D\u091A\u092F \u0915\u0940 \u0938\u094D\u0925\u093F\u0924\u093F \u092E\u0947\u0902 \u092F\u093E \u0924\u094B \u0939\u0924\u093E\u0936 \u0939\u094B \u091C\u093E\u0924\u0947 \u0939\u0948\u0902 \u0914\u0930 \u092F\u093E \u092B\u093F\u0930 \u0905\u092A\u0928\u0940 \u0938\u092E\u0938\u094D\u092F\u093E\u0913\u0902 \u0938\u0947 \u0935\u093F\u091A\u0932\u093F\u0924 \u0939\u094B\u0915\u0930 \u092D\u093E\u0917 \u0916\u095C\u0947 \u0939\u094B\u0924\u0947 \u0939\u0948\u0902\u0964",
    "\u092D\u093E\u0930\u0924 \u0935\u0930\u094D\u0937 \u0915\u0947 \u090B\u0937\u093F\u092F\u094B\u0902 \u0928\u0947 \u0917\u0939\u0928 \u0935\u093F\u091A\u093E\u0930 \u0915\u0947 \u092A\u0936\u094D\u091A\u093E\u0924 \u091C\u093F\u0938 \u091C\u094D\u091E\u093E\u0928 \u0915\u094B \u0906\u0924\u094D\u092E\u0938\u093E\u0924 \u0915\u093F\u092F\u093E \u0909\u0938\u0947 \u0909\u0928\u094D\u0939\u094B\u0902\u0928\u0947 \u0935\u0947\u0926\u094B\u0902 \u0915\u093E \u0928\u093E\u092E \u0926\u093F\u092F\u093E\u0964 \u0907\u0928\u094D\u0939\u0940\u0902 \u0935\u0947\u0926\u094B\u0902 \u0915\u093E \u0905\u0902\u0924\u093F\u092E \u092D\u093E\u0917 \u0909\u092A\u0928\u093F\u0937\u0926 \u0915\u0939\u0932\u093E\u0924\u093E \u0939\u0948\u0964 \u092E\u093E\u0928\u0935 \u091C\u0940\u0935\u0928 \u0915\u0940 \u0935\u093F\u0936\u0947\u0937\u0924\u093E \u092E\u093E\u0928\u0935 \u0915\u094B \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u092C\u094C\u0926\u094D\u0927\u093F\u0915 \u0936\u0915\u094D\u0924\u093F \u0939\u0948 \u0914\u0930 \u0909\u092A\u0928\u093F\u0937\u0926\u094B\u0902 \u092E\u0947\u0902 \u0928\u093F\u0939\u093F\u0924 \u091C\u094D\u091E\u093E\u0928 \u092E\u093E\u0928\u0935 \u0915\u0940 \u092C\u094C\u0926\u094D\u0927\u093F\u0915\u0924\u093E \u0915\u0940 \u0909\u091A\u094D\u091A\u0924\u092E \u0905\u0935\u0938\u094D\u0925\u093E \u0924\u094B \u0939\u0948 \u0939\u0940, \u0905\u092A\u093F\u0924\u0941 \u092C\u0941\u0926\u094D\u0927\u093F \u0915\u0940 \u0938\u0940\u092E\u093E\u0913\u0902 \u0915\u0947 \u092A\u0930\u0947 \u092E\u0928\u0941\u0937\u094D\u092F \u0915\u094D\u092F\u093E \u0905\u0928\u0941\u092D\u0935 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0948 \u0909\u0938\u0915\u0940 \u090F\u0915 \u091D\u0932\u0915 \u092D\u0940 \u0926\u093F\u0916\u093E \u0926\u0947\u0924\u093E \u0939\u0948\u0964",
    "\u0936\u094D\u0930\u0940\u092E\u0926\u094D\u092D\u0917\u0935\u0926\u094D\u0917\u0940\u0924\u093E \u0935\u0930\u094D\u0924\u092E\u093E\u0928 \u092E\u0947\u0902 \u0927\u0930\u094D\u092E \u0938\u0947 \u091C\u094D\u092F\u093E\u0926\u093E \u091C\u0940\u0935\u0928 \u0915\u0947 \u092A\u094D\u0930\u0924\u093F \u0905\u092A\u0928\u0947 \u0926\u093E\u0930\u094D\u0936\u0928\u093F\u0915 \u0926\u0943\u0937\u094D\u091F\u093F\u0915\u094B\u0923 \u0915\u094B \u0932\u0947\u0915\u0930 \u092D\u093E\u0930\u0924 \u092E\u0947\u0902 \u0939\u0940 \u0928\u0939\u0940\u0902 \u0935\u093F\u0926\u0947\u0936\u094B\u0902 \u092E\u0947\u0902 \u092D\u0940 \u0932\u094B\u0917\u094B\u0902 \u0915\u093E \u0927\u094D\u092F\u093E\u0928 \u0905\u092A\u0928\u0940 \u0914\u0930 \u0906\u0915\u0930\u094D\u0937\u093F\u0924 \u0915\u0930 \u0930\u0939\u0940 \u0939\u0948\u0964 \u0928\u093F\u0937\u094D\u0915\u093E\u092E \u0915\u0930\u094D\u092E \u0915\u093E \u0917\u0940\u0924\u093E \u0915\u093E \u0938\u0902\u0926\u0947\u0936 \u092A\u094D\u0930\u092C\u0902\u0927\u0928 \u0917\u0941\u0930\u0941\u0913\u0902 \u0915\u094B \u092D\u0940 \u0932\u0941\u092D\u093E \u0930\u0939\u093E \u0939\u0948\u0964 \u0935\u093F\u0936\u094D\u0935 \u0915\u0947 \u0938\u092D\u0940 \u0927\u0930\u094D\u092E\u094B\u0902 \u0915\u0940 \u0938\u092C\u0938\u0947 \u092A\u094D\u0930\u0938\u093F\u0926\u094D\u0927 \u092A\u0941\u0938\u094D\u0924\u0915\u094B\u0902 \u092E\u0947\u0902 \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0964 \u0917\u0940\u0924\u093E \u092A\u094D\u0930\u0947\u0938 \u0917\u094B\u0930\u0916\u092A\u0941\u0930 \u091C\u0948\u0938\u0940 \u0927\u093E\u0930\u094D\u092E\u093F\u0915 \u0938\u093E\u0939\u093F\u0924\u094D\u092F \u0915\u0940 \u092A\u0941\u0938\u094D\u0924\u0915\u094B\u0902 \u0915\u094B \u0915\u093E\u092B\u0940 \u0915\u092E \u092E\u0942\u0932\u094D\u092F \u092A\u0930 \u0909\u092A\u0932\u092C\u094D\u0927 \u0915\u0930\u093E\u0928\u0947 \u0935\u093E\u0932\u0947 \u092A\u094D\u0930\u0915\u093E\u0936\u0928 \u0928\u0947 \u092D\u0940 \u0915\u0908 \u0906\u0915\u093E\u0930 \u092E\u0947\u0902 \u0905\u0930\u094D\u0925 \u0914\u0930 \u092D\u093E\u0937\u094D\u092F \u0915\u0947 \u0938\u093E\u0925 \u0936\u094D\u0930\u0940\u092E\u0926\u094D\u092D\u0917\u0935\u0926\u094D\u0917\u0940\u0924\u093E \u0915\u0947 \u092A\u094D\u0930\u0915\u093E\u0936\u0928 \u0926\u094D\u0935\u093E\u0930\u093E \u0907\u0938\u0947 \u0906\u092E \u091C\u0928\u0924\u093E \u0924\u0915 \u092A\u0939\u0941\u0902\u091A\u093E\u0928\u0947 \u092E\u0947\u0902 \u0915\u093E\u092B\u0940 \u092F\u094B\u0917\u0926\u093E\u0928 \u0926\u093F\u092F\u093E \u0939\u0948\u0964",
    "\u0928\u0940\u091A\u0947 \u0926\u093F\u090F \u0917\u090F \u0905\u0928\u0941\u092D\u093E\u0917 \u092E\u0947\u0902 \u0939\u0930 \u0905\u0927\u094D\u092F\u093E\u092F \u0914\u0930 \u0909\u0938\u092E\u0947\u0902 \u0909\u0932\u094D\u0932\u0947\u0916\u093F\u0924 \u0935\u093F\u0936\u0947\u0937\u0924\u093E\u0913\u0902 \u0915\u093E \u0932\u093F\u0902\u0915 \u0926\u093F\u092F\u093E \u0917\u092F\u093E \u0939\u0948 \u091C\u093F\u0938\u0947 \u0906\u092A \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0915\u0947 \u092A\u095D \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964",
  ];
  static ɵfac = function (n) {
    return new (n || e)();
  };
  static ɵcmp = We({
    type: e,
    selectors: [["app-home"]],
    decls: 19,
    vars: 5,
    consts: () => {
      let t;
      t = $localize`:@@homeHeroAlt:Shri Krishna guiding Arjuna`;
      let n;
      n = $localize`:@@homeHeroTitle: Bhagavad Gita — The Song of God `;
      let r;
      r = $localize`:@@homeHeroSubtitle: Explore curated summaries, verse-by-verse commentary, and word meanings from the Shrimad Bhagavad Gita. Navigate seamlessly between chapters, deep-dive into individual verses, and listen to authentic recitations. `;
      let o;
      o = $localize`:@@homeChapterHeading: Start with a Chapter Overview `;
      let i;
      i = $localize`:@@homeReadChapterCta:Read Chapter`;
      let s;
      return (
        (s = $localize`:@@homeLoadingLabel:Loading chapters…`),
        [
          ["loading", ""],
          n,
          r,
          o,
          i,
          s,
          [1, "home-page", "py-4"],
          [1, "container"],
          [1, "row", "g-4", "align-items-center"],
          [1, "col-lg-6", "text-lg-start", "text-center"],
          [1, "display-5", "fw-semibold", "text-primary-emphasis"],
          [1, "lead", "text-body-secondary"],
          [1, "col-lg-6", "text-center"],
          [
            "ngSrc",
            "smbg/assets/data/images/krishna_arjun2.jpg",
            "width",
            "600",
            "height",
            "400",
            "alt",
            t,
            1,
            "img-fluid",
            "rounded",
            "shadow",
            "hero-image",
          ],
          [1, "row", "g-4", "mt-1"],
          [1, "col-12"],
          [1, "card", "border-0", "shadow-sm"],
          [1, "card-body", "intro-text"],
          [4, "ngFor", "ngForOf"],
          ["class", "row g-4 mt-2", 4, "ngIf", "ngIfElse"],
          [1, "row", "g-4", "mt-2"],
          [1, "h3", "text-primary-emphasis", "mb-3"],
          ["class", "col-md-6 col-xl-4", 4, "ngFor", "ngForOf"],
          [1, "col-md-6", "col-xl-4"],
          [1, "card", "h-100", "shadow-sm", "border-0", "chapter-card"],
          [1, "card-body", "d-flex", "flex-column"],
          [1, "h5", "text-primary"],
          [1, "text-body-secondary", "flex-grow-1"],
          [1, "mt-3"],
          [1, "btn", "btn-outline-primary", "btn-sm", 3, "routerLink"],
          ["aria-hidden", "true", 1, "icon-inline"],
          [1, "ms-1"],
          [1, "d-flex", "justify-content-center", "py-5"],
          ["role", "status", 1, "spinner-border", "text-primary"],
          [1, "visually-hidden"],
        ]
      );
    },
    template: function (n, r) {
      if (
        (n & 1 &&
          (m(0, "section", 6)(1, "div", 7)(2, "div", 8)(3, "div", 9)(
            4,
            "h1",
            10
          ),
          N(5, 1),
          h(),
          m(6, "p", 11),
          N(7, 2),
          h()(),
          m(8, "div", 12),
          ut(9, "img", 13),
          h()(),
          m(10, "div", 14)(11, "div", 15)(12, "div", 16)(13, "div", 17),
          k(14, rM, 2, 1, "p", 18),
          h()()()(),
          k(15, iM, 5, 1, "div", 19),
          Yt(16, "async"),
          k(17, sM, 4, 0, "ng-template", null, 0, me),
          h()()),
        n & 2)
      ) {
        let o = ge(18);
        D(14),
          T("ngForOf", r.introParagraphs),
          D(),
          T("ngIf", Xt(16, 3, r.summaries$))("ngIfElse", o);
      }
    },
    dependencies: [lt, wt, Ve, cv, Jt],
    styles: [
      ".home-page[_ngcontent-%COMP%]{background:radial-gradient(circle at top,var(--app-hero-top-gradient),transparent 60%),radial-gradient(circle at bottom,var(--app-hero-bottom-gradient),transparent 55%);transition:background .2s ease}.home-page[_ngcontent-%COMP%]   .hero-image[_ngcontent-%COMP%]{max-height:420px;object-fit:cover}.home-page[_ngcontent-%COMP%]   .chapter-card[_ngcontent-%COMP%]{transition:transform .2s ease,box-shadow .2s ease}.home-page[_ngcontent-%COMP%]   .chapter-card[_ngcontent-%COMP%]:hover{transform:translateY(-4px);box-shadow:var(--app-card-shadow)}.home-page[_ngcontent-%COMP%]   .intro-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] + p[_ngcontent-%COMP%]{margin-top:1rem}",
    ],
  });
};
var aM = (e) => ["/chapter", e];
function cM(e, t) {
  if (
    (e & 1 &&
      (m(0, "a", 44)(1, "span", 28),
      M(2, "\u25C0\uFE0F"),
      h(),
      m(3, "span", 29),
      N(4, 6),
      h()()),
    e & 2)
  ) {
    let n = q(2).ngIf;
    T("routerLink", n.verse.previousVerseRoute);
  }
}
function uM(e, t) {
  if (
    (e & 1 &&
      (m(0, "a", 44)(1, "span", 28),
      M(2, "\u25B6\uFE0F"),
      h(),
      m(3, "span", 29),
      N(4, 7),
      h()()),
    e & 2)
  ) {
    let n = q(2).ngIf;
    T("routerLink", n.verse.nextVerseRoute);
  }
}
function lM(e, t) {
  if ((e & 1 && (m(0, "div", 45), M(1), h()), e & 2)) {
    let n = t.$implicit;
    D(), ee(" ", n.value, " ");
  }
}
function dM(e, t) {
  if ((e & 1 && (m(0, "div", 46), M(1), h()), e & 2)) {
    let n = t.$implicit;
    D(), ee(" ", n.value, " ");
  }
}
function fM(e, t) {
  e & 1 &&
    (je(0),
    m(1, "span", 28),
    M(2, "\u23F9\uFE0F"),
    h(),
    m(3, "span", 29),
    N(4, 8),
    h(),
    $e());
}
function pM(e, t) {
  e & 1 &&
    (m(0, "span", 28), M(1, "\u{1F501}"), h(), m(2, "span", 29), N(3, 9), h());
}
function hM(e, t) {
  if ((e & 1 && (m(0, "a", 49), M(1), h()), e & 2)) {
    let n = q().$implicit;
    T("routerLink", n.wordMeaningDetailRoute), D(), ee(" ", n.sanskrit, " ");
  }
}
function gM(e, t) {
  if ((e & 1 && (m(0, "span", 50), M(1), h()), e & 2)) {
    let n = q().$implicit;
    D(), Re(n.sanskrit);
  }
}
function mM(e, t) {
  e & 1 && (m(0, "span"), M(1, ", "), h());
}
function vM(e, t) {
  if (
    (e & 1 &&
      (je(0),
      k(1, hM, 2, 2, "a", 48)(2, gM, 2, 1, "ng-template", null, 3, me),
      m(4, "span"),
      M(5),
      h(),
      k(6, mM, 2, 0, "span", 43),
      $e()),
    e & 2)
  ) {
    let n = t.$implicit,
      r = t.last,
      o = ge(3);
    D(),
      T("ngIf", n.wordMeaningDetailRoute)("ngIfElse", o),
      D(4),
      ee("\u2014 ", n.meaning),
      D(),
      T("ngIf", !r);
  }
}
function yM(e, t) {
  if (
    (e & 1 &&
      (m(0, "div")(1, "h2", 34),
      N(2, 10),
      h(),
      m(3, "div"),
      k(4, vM, 7, 4, "ng-container", 47),
      h()()),
    e & 2)
  ) {
    let n = q(2).ngIf;
    D(4), T("ngForOf", n.verse.meaning);
  }
}
function EM(e, t) {
  if (
    (e & 1 &&
      (m(0, "li", 53)(1, "span", 54), M(2), h(), m(3, "span", 55), M(4), h()()),
    e & 2)
  ) {
    let n = t.$implicit;
    D(2), Re(n.header), D(2), ee(" \u2014 ", n.value);
  }
}
function _M(e, t) {
  if (
    (e & 1 &&
      (m(0, "div")(1, "h2", 34),
      N(2, 11),
      h(),
      m(3, "ul", 51),
      k(4, EM, 5, 2, "li", 52),
      h()()),
    e & 2)
  ) {
    let n = q(2).ngIf;
    D(4), T("ngForOf", n.verse.translation);
  }
}
function DM(e, t) {
  if ((e & 1 && (m(0, "div", 58), M(1), h()), e & 2)) {
    let n = t.$implicit;
    In("commentary-highlight", n.isShlokCommentary), D(), ee(" ", n.value, " ");
  }
}
function CM(e, t) {
  if (
    (e & 1 &&
      (m(0, "div")(1, "h2", 34),
      N(2, 12),
      h(),
      m(3, "div", 56),
      k(4, DM, 2, 3, "div", 57),
      h()()),
    e & 2)
  ) {
    let n = q(2).ngIf;
    D(4), T("ngForOf", n.verse.commentary);
  }
}
function IM(e, t) {
  if (e & 1) {
    let n = Vr();
    je(0),
      m(1, "div", 20)(2, "div", 21)(3, "div", 22)(4, "div", 23)(5, "div")(
        6,
        "p",
        24
      ),
      M(7),
      h(),
      m(8, "h1", 25),
      M(9),
      h()(),
      m(10, "div", 26)(11, "a", 27)(12, "span", 28),
      M(13, "\u21A9\uFE0F"),
      h(),
      m(14, "span", 29),
      N(15, 4),
      h()(),
      k(16, cM, 5, 1, "a", 30)(17, uM, 5, 1, "a", 30),
      h()()()(),
      m(18, "div", 31)(19, "div", 32)(20, "div", 33)(21, "h2", 34),
      M(22, "\u0936\u094D\u0932\u094B\u0915"),
      h(),
      m(23, "div", 35),
      k(24, lM, 2, 1, "div", 36),
      h(),
      m(25, "h2", 34),
      M(26, "Transliteration"),
      h(),
      m(27, "div", 37),
      k(28, dM, 2, 1, "div", 38),
      h()()()(),
      m(29, "div", 31)(30, "div", 32)(31, "div", 39)(32, "div")(33, "h2", 34),
      N(34, 5),
      h(),
      m(35, "div", 40)(36, "audio", 41),
      M(37, " Your browser does not support the HTML5 Audio element. "),
      h()(),
      m(38, "button", 42),
      Je("click", function () {
        yt(n);
        let o = q(2);
        return Et(o.toggleLoop());
      }),
      k(39, fM, 5, 0, "ng-container", 19)(
        40,
        pM,
        4,
        0,
        "ng-template",
        null,
        2,
        me
      ),
      h()(),
      k(42, yM, 5, 1, "div", 43)(43, _M, 5, 1, "div", 43)(
        44,
        CM,
        5,
        1,
        "div",
        43
      ),
      h()()()(),
      $e();
  }
  if (e & 2) {
    let n = ge(41),
      r = q().ngIf,
      o = q();
    D(7),
      ee(" ", r.chapterTitle, " "),
      D(2),
      Re(r.verse.verseHeader),
      D(2),
      T("routerLink", si(14, aM, r.chapterId)),
      D(5),
      T("ngIf", r.verse.previousVerseRoute),
      D(),
      T("ngIf", r.verse.nextVerseRoute),
      D(7),
      T("ngForOf", r.verse.shlok),
      D(4),
      T("ngForOf", r.verse.shlokEng),
      D(8),
      T("src", o.audioSource(r.verse), va),
      St("loop", o.loopEnabled() ? "" : null),
      D(3),
      T("ngIf", o.loopEnabled())("ngIfElse", n),
      D(3),
      T("ngIf", r.verse.meaning.length),
      D(),
      T("ngIf", r.verse.translation.length),
      D(),
      T("ngIf", r.verse.commentary.length);
  }
}
function SM(e, t) {
  if (
    (e & 1 && (m(0, "div", 18), k(1, IM, 45, 16, "ng-container", 19), h()),
    e & 2)
  ) {
    let n = t.ngIf;
    q();
    let r = ge(6);
    D(), T("ngIf", n)("ngIfElse", r);
  }
}
function wM(e, t) {
  e & 1 && (m(0, "div", 59)(1, "div", 60)(2, "span", 61), N(3, 13), h()()());
}
function TM(e, t) {
  e & 1 &&
    (m(0, "section", 62)(1, "div", 18)(2, "div", 63)(3, "span"),
    N(4, 14),
    h(),
    m(5, "a", 64),
    N(6, 15),
    h(),
    M(7, ". "),
    h()()());
}
var Dc = class e {
  route = g(xe);
  dataService = g(At);
  loopSignal = Le(!1);
  loopEnabled = Td(() => this.loopSignal());
  viewModel$ = this.route.paramMap.pipe(
    J((t) => {
      let n = t.get("chapterId"),
        r = t.get("verseId");
      return !n || !r
        ? b(void 0)
        : this.dataService.getVerse(n, r).pipe(
            re(() => this.loopSignal.set(!1)),
            A((o) =>
              o
                ? {
                    chapterId: n,
                    chapterTitle: o.chapter.chapterTitleForChapterPage,
                    verse: o.verse,
                  }
                : void 0
            )
          );
    })
  );
  toggleLoop() {
    this.loopSignal.update((t) => !t);
  }
  audioSource(t) {
    return t.shlokPath.startsWith("smbg/assets/")
      ? t.shlokPath
      : `smbg/assets/${t.shlokPath.replace(/^\/+/, "")}`;
  }
  static ɵfac = function (n) {
    return new (n || e)();
  };
  static ɵcmp = We({
    type: e,
    selectors: [["app-verse"]],
    decls: 7,
    vars: 4,
    consts: () => {
      let t;
      t = $localize`:@@verseBackToChapterCta:Back to Chapter`;
      let n;
      n = $localize`:@@verseAudioHeading:Audio Recitation`;
      let r;
      r = $localize`:@@versePreviousCta:Previous`;
      let o;
      o = $localize`:@@verseNextCta:Next`;
      let i;
      i = $localize`:@@verseDisableLoop:Disable loop`;
      let s;
      s = $localize`:@@verseEnableLoop:Enable loop`;
      let a;
      a = $localize`:@@verseMeaningHeading:Meaning`;
      let c;
      c = $localize`:@@verseTranslationHeading:Translation`;
      let u;
      u = $localize`:@@verseCommentaryHeading:Commentary`;
      let l;
      l = $localize`:@@verseLoadingLabel:Loading verse…`;
      let d;
      d = $localize`:@@verseMissingMessage:Requested verse could not be found. Return to the`;
      let p;
      return (
        (p = $localize`:@@verseMissingHomeLink:home page`),
        [
          ["loading", ""],
          ["notFound", ""],
          ["enableLoopLabel", ""],
          ["plainMeaning", ""],
          t,
          n,
          r,
          o,
          i,
          s,
          a,
          c,
          u,
          l,
          d,
          p,
          [1, "verse-page", "py-4"],
          ["class", "container", 4, "ngIf", "ngIfElse"],
          [1, "container"],
          [4, "ngIf", "ngIfElse"],
          [1, "row", "g-4"],
          [1, "col-12"],
          [1, "verse-header", "p-4", "rounded", "text-white"],
          [
            1,
            "d-flex",
            "flex-column",
            "flex-lg-row",
            "justify-content-between",
            "gap-3",
            "align-items-lg-center",
          ],
          [1, "text-uppercase", "small", "text-white-50", "mb-1"],
          [1, "h2", "mb-0"],
          [1, "d-flex", "flex-wrap", "gap-2"],
          [1, "btn", "btn-outline-light", "btn-sm", 3, "routerLink"],
          ["aria-hidden", "true", 1, "icon-inline"],
          [1, "ms-1"],
          ["class", "btn btn-light btn-sm", 3, "routerLink", 4, "ngIf"],
          [1, "col-lg-6"],
          [1, "card", "border-0", "shadow-sm", "h-100"],
          [1, "card-body"],
          [1, "h5", "text-primary", "fw-semibold", "mb-3"],
          [1, "verse-block", "mb-4"],
          ["class", "sanskrit-line", 4, "ngFor", "ngForOf"],
          [1, "verse-block"],
          ["class", "transliteration-line", 4, "ngFor", "ngForOf"],
          [1, "card-body", "d-flex", "flex-column", "gap-4"],
          [1, "audio-wrapper"],
          ["controls", "", "controlsList", "nodownload", 3, "src"],
          [
            "type",
            "button",
            1,
            "btn",
            "btn-outline-primary",
            "btn-sm",
            "mt-2",
            3,
            "click",
          ],
          [4, "ngIf"],
          [1, "btn", "btn-light", "btn-sm", 3, "routerLink"],
          [1, "sanskrit-line"],
          [1, "transliteration-line"],
          [4, "ngFor", "ngForOf"],
          ["class", "fw-semibold", 3, "routerLink", 4, "ngIf", "ngIfElse"],
          [1, "fw-semibold", 3, "routerLink"],
          [1, "fw-semibold"],
          [1, "list-unstyled", "mb-0"],
          ["class", "mb-2", 4, "ngFor", "ngForOf"],
          [1, "mb-2"],
          [1, "fw-semibold", "text-body"],
          [1, "text-body-secondary"],
          [1, "commentary-block"],
          ["class", "mb-3", 3, "commentary-highlight", 4, "ngFor", "ngForOf"],
          [1, "mb-3"],
          [1, "d-flex", "justify-content-center", "py-5"],
          ["role", "status", 1, "spinner-border", "text-primary"],
          [1, "visually-hidden"],
          [1, "py-5"],
          ["role", "alert", 1, "alert", "alert-warning"],
          ["routerLink", "/", 1, "alert-link"],
        ]
      );
    },
    template: function (n, r) {
      if (
        (n & 1 &&
          (m(0, "section", 16),
          k(1, SM, 2, 2, "div", 17),
          Yt(2, "async"),
          h(),
          k(3, wM, 4, 0, "ng-template", null, 0, me)(
            5,
            TM,
            8,
            0,
            "ng-template",
            null,
            1,
            me
          )),
        n & 2)
      ) {
        let o = ge(4);
        D(), T("ngIf", Xt(2, 2, r.viewModel$))("ngIfElse", o);
      }
    },
    dependencies: [lt, wt, Ve, Jt],
    styles: [
      ".verse-page[_ngcontent-%COMP%]{background-color:var(--app-surface-bg);transition:background-color .2s ease}.verse-page[_ngcontent-%COMP%]   .verse-header[_ngcontent-%COMP%]{background:linear-gradient(135deg,#198754,#0d6efd)}.verse-page[_ngcontent-%COMP%]   .verse-block[_ngcontent-%COMP%]{background-color:var(--app-verse-block-secondary);border-radius:.5rem;padding:1rem}.verse-page[_ngcontent-%COMP%]   .verse-block[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] + *[_ngcontent-%COMP%]{margin-top:.5rem}.verse-page[_ngcontent-%COMP%]   .sanskrit-line[_ngcontent-%COMP%]{font-size:1.1rem;font-weight:600;text-align:center}.verse-page[_ngcontent-%COMP%]   .transliteration-line[_ngcontent-%COMP%]{font-size:1rem;font-style:italic;text-align:center}.verse-page[_ngcontent-%COMP%]   .audio-wrapper[_ngcontent-%COMP%]{background-color:var(--app-audio-bg);padding:1rem;border-radius:.5rem;transition:background-color .2s ease}.verse-page[_ngcontent-%COMP%]   audio[_ngcontent-%COMP%]{width:100%}.verse-page[_ngcontent-%COMP%]   .commentary-block[_ngcontent-%COMP%]{background-color:var(--app-commentary-bg);border-radius:.5rem;padding:1rem;border:1px solid var(--app-border-color);transition:background-color .2s ease,border-color .2s ease}.verse-page[_ngcontent-%COMP%]   .commentary-highlight[_ngcontent-%COMP%]{text-align:center;font-weight:700}",
    ],
  });
};
function bM(e, t) {
  if (
    (e & 1 &&
      (m(0, "a", 35)(1, "span", 26),
      M(2, "\u2B05\uFE0F"),
      h(),
      m(3, "span", 27),
      N(4, 9),
      h()()),
    e & 2)
  ) {
    let n = q(2).ngIf;
    T("routerLink", n.previousWMRoute);
  }
}
function MM(e, t) {
  if (
    (e & 1 &&
      (m(0, "a", 35)(1, "span", 26),
      M(2, "\u27A1\uFE0F"),
      h(),
      m(3, "span", 27),
      N(4, 10),
      h()()),
    e & 2)
  ) {
    let n = q(2).ngIf;
    T("routerLink", n.nextWMRoute);
  }
}
function NM(e, t) {
  if ((e & 1 && (m(0, "a", 38), M(1), h()), e & 2)) {
    let n = q().$implicit;
    T("routerLink", n.route), D(), ee(" ", n.referenceHeader, " ");
  }
}
function RM(e, t) {
  if ((e & 1 && (m(0, "span"), N(1, 11), h()), e & 2)) {
    let n = q().$implicit;
    D(), Qn(n.referenceHeader), Br(1);
  }
}
function AM(e, t) {
  if (
    (e & 1 &&
      (m(0, "tr")(1, "td", 36),
      M(2),
      h(),
      m(3, "td"),
      M(4),
      h(),
      m(5, "td"),
      k(6, NM, 2, 2, "a", 37)(7, RM, 2, 1, "ng-template", null, 2, me),
      h()()),
    e & 2)
  ) {
    let n = t.$implicit,
      r = ge(8);
    D(2),
      Re(n.word),
      D(2),
      Re(n.meaning),
      D(2),
      T("ngIf", n.route)("ngIfElse", r);
  }
}
function xM(e, t) {
  if (
    (e & 1 &&
      (je(0),
      m(1, "div", 19)(2, "div", 20)(3, "div", 21)(4, "div")(5, "h1", 22),
      N(6, 3),
      h(),
      m(7, "p", 23),
      N(8, 4),
      h()(),
      m(9, "div", 24)(10, "a", 25)(11, "span", 26),
      M(12, "\u{1F3E0}"),
      h(),
      m(13, "span", 27),
      N(14, 5),
      h()(),
      k(15, bM, 5, 1, "a", 28)(16, MM, 5, 1, "a", 28),
      h()()(),
      m(17, "div", 20)(18, "div", 29)(19, "div", 30)(20, "table", 31)(
        21,
        "thead",
        32
      )(22, "tr")(23, "th", 33),
      N(24, 6),
      h(),
      m(25, "th", 33),
      N(26, 7),
      h(),
      m(27, "th", 33),
      N(28, 8),
      h()()(),
      m(29, "tbody"),
      k(30, AM, 9, 4, "tr", 34),
      h()()()()()(),
      $e()),
    e & 2)
  ) {
    let n = q().ngIf;
    D(6),
      Qn(n.id),
      Br(6),
      D(9),
      T("ngIf", n.previousWMRoute),
      D(),
      T("ngIf", n.nextWMRoute),
      D(14),
      T("ngForOf", n.data);
  }
}
function OM(e, t) {
  if (
    (e & 1 && (m(0, "div", 17), k(1, xM, 31, 4, "ng-container", 18), h()),
    e & 2)
  ) {
    let n = t.ngIf;
    q();
    let r = ge(6);
    D(), T("ngIf", n)("ngIfElse", r);
  }
}
function PM(e, t) {
  e & 1 && (m(0, "div", 39)(1, "div", 40)(2, "span", 41), N(3, 12), h()()());
}
function FM(e, t) {
  e & 1 &&
    (m(0, "section", 42)(1, "div", 17)(2, "div", 43)(3, "span"),
    N(4, 13),
    h(),
    m(5, "a", 44),
    N(6, 14),
    h(),
    M(7, ". "),
    h()()());
}
var Cc = class e {
  route = g(xe);
  dataService = g(At);
  detail$ = this.route.paramMap.pipe(
    J((t) => {
      let n = t.get("wordId");
      return n ? this.dataService.getWordMeaning(n) : b(void 0);
    })
  );
  static ɵfac = function (n) {
    return new (n || e)();
  };
  static ɵcmp = We({
    type: e,
    selectors: [["app-word-meaning"]],
    decls: 7,
    vars: 4,
    consts: () => {
      let t;
      t = $localize`:@@wordHeading:Occurrences of "${"\uFFFD0\uFFFD"}:INTERPOLATION:"`;
      let n;
      n = $localize`:@@wordSubheading: Explore the Sanskrit word usage across verses and quickly jump to the referenced shloks. `;
      let r;
      r = $localize`:@@wordHomeCta:Home`;
      let o;
      o = $localize`:@@wordTableHeaderWord:Word`;
      let i;
      i = $localize`:@@wordTableHeaderMeaning:Meaning`;
      let s;
      s = $localize`:@@wordTableHeaderReference:Reference`;
      let a;
      a = $localize`:@@wordPreviousCta:Previous`;
      let c;
      c = $localize`:@@wordNextCta:Next`;
      let u;
      u = $localize`:@@wordReferenceFallback:${"\uFFFD0\uFFFD"}:INTERPOLATION:`;
      let l;
      l = $localize`:@@wordLoadingLabel:Loading word meanings…`;
      let d;
      d = $localize`:@@wordMissingMessage:Requested word meaning entry was not found. Return to the`;
      let p;
      return (
        (p = $localize`:@@wordMissingHomeLink:home page`),
        [
          ["loading", ""],
          ["notFound", ""],
          ["referenceText", ""],
          t,
          n,
          r,
          o,
          i,
          s,
          a,
          c,
          u,
          l,
          d,
          p,
          [1, "word-meaning-page", "py-4"],
          ["class", "container", 4, "ngIf", "ngIfElse"],
          [1, "container"],
          [4, "ngIf", "ngIfElse"],
          [1, "row", "g-4"],
          [1, "col-12"],
          [
            1,
            "word-header",
            "p-4",
            "rounded",
            "text-white",
            "d-flex",
            "flex-column",
            "flex-lg-row",
            "justify-content-between",
            "gap-3",
            "align-items-lg-center",
          ],
          [1, "h3", "mb-1"],
          [1, "mb-0", "text-white-75"],
          [1, "d-flex", "flex-wrap", "gap-2"],
          ["routerLink", "/", 1, "btn", "btn-outline-light", "btn-sm"],
          ["aria-hidden", "true", 1, "icon-inline"],
          [1, "ms-1"],
          ["class", "btn btn-light btn-sm", 3, "routerLink", 4, "ngIf"],
          [1, "card", "border-0", "shadow-sm"],
          [1, "table-responsive"],
          [1, "table", "table-hover", "mb-0", "align-middle"],
          [1, "table-light"],
          ["scope", "col"],
          [4, "ngFor", "ngForOf"],
          [1, "btn", "btn-light", "btn-sm", 3, "routerLink"],
          [1, "fw-semibold"],
          [
            "class",
            "link-primary text-decoration-none",
            3,
            "routerLink",
            4,
            "ngIf",
            "ngIfElse",
          ],
          [1, "link-primary", "text-decoration-none", 3, "routerLink"],
          [1, "d-flex", "justify-content-center", "py-5"],
          ["role", "status", 1, "spinner-border", "text-primary"],
          [1, "visually-hidden"],
          [1, "py-5"],
          ["role", "alert", 1, "alert", "alert-warning"],
          ["routerLink", "/", 1, "alert-link"],
        ]
      );
    },
    template: function (n, r) {
      if (
        (n & 1 &&
          (m(0, "section", 15),
          k(1, OM, 2, 2, "div", 16),
          Yt(2, "async"),
          h(),
          k(3, PM, 4, 0, "ng-template", null, 0, me)(
            5,
            FM,
            8,
            0,
            "ng-template",
            null,
            1,
            me
          )),
        n & 2)
      ) {
        let o = ge(4);
        D(), T("ngIf", Xt(2, 2, r.detail$))("ngIfElse", o);
      }
    },
    dependencies: [lt, wt, Ve, Jt],
    styles: [
      ".word-meaning-page[_ngcontent-%COMP%]{background-color:var(--app-surface-bg);transition:background-color .2s ease}.word-meaning-page[_ngcontent-%COMP%]   .word-header[_ngcontent-%COMP%]{background:linear-gradient(135deg,#0d6efd,#20c997)}",
    ],
  });
};
var Ry = [
  { path: "", component: _c, title: "Shrimad Bhagwat Geeta" },
  {
    path: "chapter/:chapterId",
    component: Ec,
    title: (e) =>
      `Chapter ${e.paramMap.get("chapterId") ?? ""} | Shrimad Bhagwat Geeta`,
  },
  {
    path: "chapter/:chapterId/verse/:verseId",
    component: Dc,
    title: (e) => {
      let t = e.paramMap.get("chapterId") ?? "";
      return `Verse ${
        e.paramMap.get("verseId") ?? ""
      } | Chapter ${t} | Shrimad Bhagwat Geeta`;
    },
  },
  {
    path: "word-meaning/:wordId",
    component: Cc,
    title: (e) =>
      `Word Meaning: ${e.paramMap.get("wordId") ?? ""} | Shrimad Bhagwat Geeta`,
  },
  { path: "**", redirectTo: "" },
];
var Mf = new w("IS_LANGUAGE_SWITCH_ENABLED"),
  Ay = {
    providers: [
      Uu(),
      Sd({ eventCoalescing: !0 }),
      bf(Ry),
      Jd(ef()),
      { provide: Mf, useValue: !1 },
    ],
  };
var xy = "smbg-theme",
  Ic = class e {
    documentRef = g(Y);
    themeSignal = Le("light");
    constructor() {
      let t = this.getInitialTheme();
      if ((this.applyTheme(t), typeof window < "u")) {
        let n = window.matchMedia("(prefers-color-scheme: dark)"),
          r = (o) => {
            this.hasStoredPreference() ||
              this.applyTheme(o.matches ? "dark" : "light");
          };
        try {
          n.addEventListener("change", r);
        } catch {}
      }
    }
    theme = this.themeSignal.asReadonly();
    toggleTheme() {
      let t = this.themeSignal() === "light" ? "dark" : "light";
      this.applyTheme(t, !0);
    }
    applyTheme(t, n = !1) {
      this.themeSignal.set(t);
      let r = this.documentRef?.body;
      if (
        (r && r.setAttribute("data-bs-theme", t),
        n && typeof localStorage < "u")
      )
        try {
          localStorage.setItem(xy, t);
        } catch {}
    }
    getInitialTheme() {
      let t = this.getStoredTheme();
      return (
        t ||
        (typeof window < "u" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light")
      );
    }
    getStoredTheme() {
      if (typeof localStorage > "u") return null;
      try {
        let t = localStorage.getItem(xy);
        return t === "dark" || t === "light" ? t : null;
      } catch {
        return null;
      }
    }
    hasStoredPreference() {
      return this.getStoredTheme() !== null;
    }
    static ɵfac = function (n) {
      return new (n || e)();
    };
    static ɵprov = S({ token: e, factory: e.ɵfac, providedIn: "root" });
  };
var kM = () => ({ exact: !0 });
function LM(e, t) {
  if (e & 1) {
    let n = Vr();
    je(0),
      m(1, "div", 23)(2, "button", 24),
      Je("click", function () {
        yt(n);
        let o = q();
        return Et(o.switchLocale("en"));
      }),
      ri(3, 4),
      ut(4, "span", 25)(5, "span", 26),
      oi(),
      h(),
      m(6, "button", 24),
      Je("click", function () {
        yt(n);
        let o = q();
        return Et(o.switchLocale("hi"));
      }),
      ri(7, 5),
      ut(8, "span", 25)(9, "span", 26),
      oi(),
      h()(),
      $e();
  }
  if (e & 2) {
    let n = q();
    D(2),
      In("active", n.locale() === "en"),
      T("disabled", n.locale() === "en"),
      St("aria-pressed", n.locale() === "en"),
      D(4),
      In("active", n.locale() === "hi"),
      T("disabled", n.locale() === "hi"),
      St("aria-pressed", n.locale() === "hi");
  }
}
function jM(e, t) {
  e & 1 &&
    (je(0),
    m(1, "span", 25),
    M(2, "\u{1F31E}"),
    h(),
    m(3, "span", 26),
    N(4, 6),
    h(),
    $e());
}
function $M(e, t) {
  e & 1 &&
    (m(0, "span", 25), M(1, "\u{1F319}"), h(), m(2, "span", 26), N(3, 7), h());
}
var Sc = class e {
  currentYear = new Date().getFullYear();
  navOpen = Le(!1);
  themeService = g(Ic);
  languageService = g(yc);
  showLanguageSwitcher = g(Mf, { optional: !0 }) ?? !1;
  theme = this.themeService.theme;
  locale = this.languageService.locale;
  toggleNav() {
    this.navOpen.update((t) => !t);
  }
  closeNav() {
    this.navOpen.set(!1);
  }
  toggleTheme() {
    this.themeService.toggleTheme();
  }
  switchLocale(t) {
    this.languageService.switchLocale(t);
  }
  static ɵfac = function (n) {
    return new (n || e)();
  };
  static ɵcmp = We({
    type: e,
    selectors: [["app-root"]],
    decls: 22,
    vars: 9,
    consts: () => {
      let t;
      t = $localize`:@@appTitle:Shrimad Bhagwat Geeta`;
      let n;
      n = $localize`:@@navHome: Home `;
      let r;
      r = $localize`:@@footerCredit: © ${"\uFFFD0\uFFFD"}:INTERPOLATION: Shrimad Bhagwat Geeta. Built with Angular and Bootstrap 5. `;
      let o;
      (o = $localize`:@@languageEnglish:${"\uFFFD#4\uFFFD"}:START_TAG_SPAN:🌐${"[\uFFFD/#4\uFFFD|\uFFFD/#5\uFFFD]"}:CLOSE_TAG_SPAN:${"\uFFFD#5\uFFFD"}:START_TAG_SPAN_1:English${"[\uFFFD/#4\uFFFD|\uFFFD/#5\uFFFD]"}:CLOSE_TAG_SPAN:`),
        (o = Ma(o));
      let i;
      (i = $localize`:@@languageHindi:${"\uFFFD#8\uFFFD"}:START_TAG_SPAN:🇮🇳${"[\uFFFD/#8\uFFFD|\uFFFD/#9\uFFFD]"}:CLOSE_TAG_SPAN:${"\uFFFD#9\uFFFD"}:START_TAG_SPAN_1:हिन्दी${"[\uFFFD/#8\uFFFD|\uFFFD/#9\uFFFD]"}:CLOSE_TAG_SPAN:`),
        (i = Ma(i));
      let s;
      s = $localize`:@@themeToggleLabelLight:Light Mode`;
      let a;
      return (
        (a = $localize`:@@themeToggleLabelDark:Dark Mode`),
        [
          ["darkModeLabel", ""],
          t,
          n,
          r,
          o,
          i,
          s,
          a,
          [1, "app-shell", "d-flex", "flex-column", "min-vh-100"],
          [1, "navbar", "navbar-expand-lg", "navbar-dark", "bg-dark"],
          [1, "container"],
          ["routerLink", "/", 1, "navbar-brand", "fw-semibold"],
          [
            "type",
            "button",
            "aria-controls",
            "mainNavbar",
            "aria-label",
            "Toggle navigation",
            1,
            "navbar-toggler",
            3,
            "click",
          ],
          [1, "navbar-toggler-icon"],
          ["id", "mainNavbar", 1, "collapse", "navbar-collapse"],
          [
            1,
            "navbar-nav",
            "ms-auto",
            "align-items-lg-center",
            "gap-2",
            "flex-lg-row",
            "flex-column",
          ],
          [
            "routerLink",
            "/",
            "routerLinkActive",
            "active",
            1,
            "nav-link",
            3,
            "click",
            "routerLinkActiveOptions",
          ],
          [4, "ngIf"],
          [
            "type",
            "button",
            1,
            "btn",
            "btn-outline-light",
            "btn-sm",
            "theme-toggle",
            3,
            "click",
          ],
          [4, "ngIf", "ngIfElse"],
          [1, "flex-grow-1"],
          [1, "py-4", "bg-dark", "text-white"],
          [1, "container", "text-center", "small"],
          [
            "role",
            "group",
            "aria-label",
            "Language selector",
            1,
            "btn-group",
            "language-toggle",
          ],
          [
            "type",
            "button",
            1,
            "btn",
            "btn-outline-light",
            "btn-sm",
            3,
            "click",
            "disabled",
          ],
          ["aria-hidden", "true", 1, "icon-inline"],
          [1, "ms-1"],
        ]
      );
    },
    template: function (n, r) {
      if (n & 1) {
        let o = Vr();
        m(0, "div", 8)(1, "header")(2, "nav", 9)(3, "div", 10)(4, "a", 11),
          N(5, 1),
          h(),
          m(6, "button", 12),
          Je("click", function () {
            return yt(o), Et(r.toggleNav());
          }),
          ut(7, "span", 13),
          h(),
          m(8, "div", 14)(9, "div", 15)(10, "a", 16),
          Je("click", function () {
            return yt(o), Et(r.closeNav());
          }),
          N(11, 2),
          h(),
          k(12, LM, 10, 8, "ng-container", 17),
          m(13, "button", 18),
          Je("click", function () {
            return yt(o), Et(r.toggleTheme());
          }),
          k(14, jM, 5, 0, "ng-container", 19)(
            15,
            $M,
            4,
            0,
            "ng-template",
            null,
            0,
            me
          ),
          h()()()()()(),
          m(17, "main", 20),
          ut(18, "router-outlet"),
          h(),
          m(19, "footer", 21)(20, "div", 22),
          N(21, 3),
          h()()();
      }
      if (n & 2) {
        let o = ge(16);
        D(6),
          St("aria-expanded", r.navOpen() ? "true" : "false"),
          D(2),
          In("show", r.navOpen()),
          D(2),
          T("routerLinkActiveOptions", ii(8, kM)),
          D(2),
          T("ngIf", r.showLanguageSwitcher),
          D(2),
          T("ngIf", r.theme() === "dark")("ngIfElse", o),
          D(7),
          Qn(r.currentYear),
          Br(21);
      }
    },
    dependencies: [Fi, Ve, Tf, lt],
    styles: [
      ".app-shell[_ngcontent-%COMP%]{background-color:var(--app-surface-bg);color:var(--app-text-color);min-height:100vh;transition:background-color .2s ease,color .2s ease}.theme-toggle[_ngcontent-%COMP%]{white-space:nowrap}.icon-inline[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;font-size:1rem}.language-toggle[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{white-space:nowrap}.language-toggle[_ngcontent-%COMP%]   .btn.active[_ngcontent-%COMP%]{color:#0d6efd;background-color:#fff;border-color:#fff}[data-bs-theme=dark][_ngcontent-%COMP%]   .language-toggle[_ngcontent-%COMP%]   .btn.active[_ngcontent-%COMP%]{color:#0d6efd}footer[_ngcontent-%COMP%]{letter-spacing:.02em;transition:background-color .2s ease,color .2s ease}",
    ],
  });
};
function VM() {
  return xt(this, null, function* () {
    let e = BM();
    if (
      (typeof document < "u" && (document.documentElement.lang = e), e === "hi")
    ) {
      let [t] = yield Promise.all([
          import("./chunk-KTAD6XN4.js"),
          import("./chunk-GMEXNDR2.js"),
        ]),
        n = t.default ?? t;
      n?.translations && jv(n.translations), ni("hi");
    } else ni("en");
    return e;
  });
}
function BM() {
  if (typeof window < "u")
    try {
      let e = localStorage.getItem(uo);
      if (e === "hi" || e === "en") return e;
    } catch {}
  return typeof document < "u" &&
    (document.documentElement.lang?.toLowerCase() ?? "").startsWith("hi")
    ? "hi"
    : "en";
}
VM()
  .then(() => Wd(Sc, Ay))
  .catch((e) => console.error(e));
