/*!
 * g.Raphael 0.51 - Charting library, based on Raphaël
 *
 * Copyright (c) 2009-2012 Dmitry Baranovskiy (http://g.raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
(function() {
    function B(f, m, i, b, a, h, n, A) {
        var c;
        if (a && !b || !a && !i)
            return n ? "" : A.path();
        h = {round: "round", sharp: "sharp", soft: "soft", square: "square"}[h] || "square";
        b = Math.round(b);
        i = Math.round(i);
        f = Math.round(f);
        m = Math.round(m);
        switch (h) {
            case "round":
                a ? (a = ~~(i / 2), c = b < a ? ["M", f - ~~(i / 2), m, "l", 0, 0, "a", ~~(i / 2), b, 0, 0, 1, i, 0, "l", 0, 0, "z"] : ["M", f - a, m, "l", 0, a - b, "a", a, a, 0, 1, 1, i, 0, "l", 0, b - a, "z"]) : (a = ~~(b / 2), c = i < a ? ["M", f + 0.5, m + 0.5 - ~~(b / 2), "l", 0, 0, "a", i, ~~(b / 2), 0, 0, 1, 0, b, "l", 0, 0, "z"] : ["M", f + 0.5, m + 0.5 - a, "l", i - a, 0, "a", a,
                    a, 0, 1, 1, 0, b, "l", a - i, 0, "z"]);
                break;
            case "sharp":
                a ? (a = ~~(i / 2), c = ["M", f + a, m, "l", -i, 0, 0, -C(b - a, 0), a, -y(a, b), a, y(a, b), a, "z"]) : (a = ~~(b / 2), c = ["M", f, m + a, "l", 0, -b, C(i - a, 0), 0, y(a, i), a, -y(a, i), a + (2 * a < b), "z"]);
                break;
            case "square":
                c = a ? ["M", f + ~~(i / 2), m, "l", 1 - i, 0, 0, -b, i - 1, 0, "z"] : ["M", f, m + ~~(b / 2), "l", 0, -b, i, 0, 0, b, "z"];
                break;
            case "soft":
                a ? (a = y(Math.round(i / 5), b), c = ["M", f - ~~(i / 2), m, "l", 0, a - b, "a", a, a, 0, 0, 1, a, -a, "l", i - 2 * a, 0, "a", a, a, 0, 0, 1, a, a, "l", 0, b - a, "z"]) : (a = y(i, Math.round(b / 5)), c = ["M", f + 0.5, m + 0.5 - ~~(b / 2), "l", i - a,
                    0, "a", a, a, 0, 0, 1, a, a, "l", 0, b - 2 * a, "a", a, a, 0, 0, 1, -a, a, "l", a - i, 0, "z"])
        }
        return n ? c.join(",") : A.path(c)
    }
    function E(f, m, i, b, a, h, n) {
        var n = n || {}, A = n.type || "square", c = parseFloat(n.gutter || "20%"), s = f.set(), u = f.set(), p = f.set(), t = f.set(), w = Math.max.apply(Math, h), g = [], l = 0, y = n.colors || this.colors, q = h.length;
        if (Raphael.is(h[0], "array")) {
            for (var w = [], l = q, q = 0, e = h.length; e--; )
                u.push(f.set()), w.push(Math.max.apply(Math, h[e])), q = Math.max(q, h[e].length);
            if (n.stacked)
                for (e = q; e--; ) {
                    for (var k = 0, d = h.length; d--; )
                        k += +h[d][e] ||
                                0;
                    g.push(k)
                }
            for (e = h.length; e--; )
                if (h[e].length < q)
                    for (d = q; d--; )
                        h[e].push(0);
            w = Math.max.apply(Math, n.stacked ? g : w)
        }
        var w = n.to || w, b = 100 * (b / (q * (100 + c) + c)), c = b * c / 100, r = null == n.vgutter ? 20 : n.vgutter, g = [], k = m + c, v = (a - 2 * r) / w;
        n.stretch || (c = Math.round(c), b = Math.floor(b));
        !n.stacked && (b /= l || 1);
        for (e = 0; e < q; e++) {
            g = [];
            for (d = 0; d < (l || 1); d++) {
                var j = Math.round((l ? h[d][e] : h[e]) * v), x = i + a - r - j, o = B(Math.round(k + b / 2), x + j, b, j, !0, A, null, f).attr({stroke: "none", fill: y[l ? d : e]});
                l ? u[d].push(o) : u.push(o);
                o.y = x;
                o.x = Math.round(k + b /
                        2);
                o.w = b;
                o.h = j;
                o.value = l ? h[d][e] : h[e];
                n.stacked ? g.push(o) : k += b
            }
            if (n.stacked) {
                t.push(d = f.rect(g[0].x - g[0].w / 2, i, b, a).attr(this.shim));
                d.bars = f.set();
                for (var x = 0, z = g.length; z--; )
                    g[z].toFront();
                for (var z = 0, D = g.length; z < D; z++) {
                    var o = g[z], j = (x + o.value) * v, H = B(o.x, i + a - r - 0.5 * !!x, b, j, !0, A, 1, f);
                    d.bars.push(o);
                    x && o.attr({path: H});
                    o.h = j;
                    o.y = i + a - r - 0.5 * !!x - j;
                    p.push(j = f.rect(o.x - o.w / 2, o.y, b, o.value * v).attr(this.shim));
                    j.bar = o;
                    j.value = o.value;
                    x += o.value
                }
                k += b
            }
            k += c
        }
        t.toFront();
        k = m + c;
        if (!n.stacked)
            for (e = 0; e < q; e++) {
                for (d =
                        0; d < (l || 1); d++)
                    p.push(j = f.rect(Math.round(k), i + r, b, a - r).attr(this.shim)), j.bar = l ? u[d][e] : u[e], j.value = j.bar.value, k += b;
                k += c
            }
        s.label = function(b, e) {
            b = b || [];
            this.labels = f.set();
            var d, j = -Infinity;
            if (n.stacked)
                for (var c = 0; c < q; c++)
                    for (var m = 0, g = 0; g < (l || 1); g++) {
                        m = m + (l ? h[g][c] : h[c]);
                        if (g == l - 1) {
                            d = f.labelise(b[c], m, w);
                            d = f.text(u[c * (l || 1) + g].x, i + a - r / 2, d).attr(txtattr).insertBefore(p[c * (l || 1) + g]);
                            var k = d.getBBox();
                            if (k.x - 7 < j)
                                d.remove();
                            else {
                                this.labels.push(d);
                                j = k.x + k.width
                            }
                        }
                    }
            else
                for (c = 0; c < q; c++)
                    for (g = 0; g < (l ||
                            1); g++) {
                        d = f.labelise(l ? b[g] && b[g][c] : b[c], l ? h[g][c] : h[c], w);
                        d = f.text(u[c * (l || 1) + g].x, e ? i + a - r / 2 : u[c * (l || 1) + g].y - 10, d).attr(txtattr).insertBefore(p[c * (l || 1) + g]);
                        k = d.getBBox();
                        if (k.x - 7 < j)
                            d.remove();
                        else {
                            this.labels.push(d);
                            j = k.x + k.width
                        }
                    }
            return this
        };
        s.hover = function(a, b) {
            t.hide();
            p.show();
            p.mouseover(a).mouseout(b);
            return this
        };
        s.hoverColumn = function(a, b) {
            p.hide();
            t.show();
            t.mouseover(a).mouseout(b || function() {
            });
            return this
        };
        s.click = function(a) {
            t.hide();
            p.show();
            p.click(a);
            return this
        };
        s.each = function(a) {
            if (!Raphael.is(a,
                    "function"))
                return this;
            for (var b = p.length; b--; )
                a.call(p[b]);
            return this
        };
        s.eachColumn = function(a) {
            if (!Raphael.is(a, "function"))
                return this;
            for (var b = t.length; b--; )
                a.call(t[b]);
            return this
        };
        s.clickColumn = function(a) {
            p.hide();
            t.show();
            t.click(a);
            return this
        };
        s.push(u, p, t);
        s.bars = u;
        s.covers = p;
        return s
    }
    function F(f, m, i, b, a, h, n) {
        var n = n || {}, y = n.type || "square", c = parseFloat(n.gutter || "20%"), s = f.set(), u = f.set(), p = f.set(), t = f.set(), w = Math.max.apply(Math, h), g = [], l = 0, C = n.colors || this.colors, q = h.length;
        if (Raphael.is(h[0],
                "array")) {
            for (var w = [], l = q, q = 0, e = h.length; e--; )
                u.push(f.set()), w.push(Math.max.apply(Math, h[e])), q = Math.max(q, h[e].length);
            if (n.stacked)
                for (e = q; e--; ) {
                    for (var k = 0, d = h.length; d--; )
                        k += +h[d][e] || 0;
                    g.push(k)
                }
            for (e = h.length; e--; )
                if (h[e].length < q)
                    for (d = q; d--; )
                        h[e].push(0);
            w = Math.max.apply(Math, n.stacked ? g : w)
        }
        var w = n.to || w, r = Math.floor(100 * (a / (q * (100 + c) + c))), a = Math.floor(r * c / 100), c = [], g = i + a, k = (b - 1) / w;
        !n.stacked && (r /= l || 1);
        for (e = 0; e < q; e++) {
            c = [];
            for (d = 0; d < (l || 1); d++) {
                var v = l ? h[d][e] : h[e], j = B(m, g + r / 2, Math.round(v *
                        k), r - 1, !1, y, null, f).attr({stroke: "none", fill: C[l ? d : e]});
                l ? u[d].push(j) : u.push(j);
                j.x = m + Math.round(v * k);
                j.y = g + r / 2;
                j.w = Math.round(v * k);
                j.h = r;
                j.value = +v;
                n.stacked ? c.push(j) : g += r
            }
            if (n.stacked) {
                d = f.rect(m, c[0].y - c[0].h / 2, b, r).attr(this.shim);
                t.push(d);
                d.bars = f.set();
                for (var x = 0, o = c.length; o--; )
                    c[o].toFront();
                for (var o = 0, z = c.length; o < z; o++) {
                    var j = c[o], v = Math.round((x + j.value) * k), D = B(m, j.y, v, r - 1, !1, y, 1, f);
                    d.bars.push(j);
                    x && j.attr({path: D});
                    j.w = v;
                    j.x = m + v;
                    p.push(v = f.rect(m + x * k, j.y - j.h / 2, j.value * k, r).attr(this.shim));
                    v.bar = j;
                    x += j.value
                }
                g += r
            }
            g += a
        }
        t.toFront();
        g = i + a;
        if (!n.stacked)
            for (e = 0; e < q; e++) {
                for (d = 0; d < (l || 1); d++)
                    v = f.rect(m, g, b, r).attr(this.shim), p.push(v), v.bar = l ? u[d][e] : u[e], v.value = v.bar.value, g += r;
                g += a
            }
        s.label = function(a, b) {
            a = a || [];
            this.labels = f.set();
            for (var c = 0; c < q; c++)
                for (var d = 0; d < l; d++) {
                    var e = f.labelise(l ? a[d] && a[d][c] : a[c], l ? h[d][c] : h[c], w), g = b ? "end" : "start";
                    this.labels.push(e = f.text(b ? u[c * (l || 1) + d].x - r / 2 + 3 : m + 5, u[c * (l || 1) + d].y, e).attr(txtattr).attr({"text-anchor": g}).insertBefore(p[0]));
                    e.getBBox().x <
                            m + 5 ? e.attr({x: m + 5, "text-anchor": "start"}) : u[c * (l || 1) + d].label = e
                }
            return this
        };
        s.hover = function(a, b) {
            t.hide();
            p.show();
            p.mouseover(a).mouseout(b || function() {
            });
            return this
        };
        s.hoverColumn = function(a, b) {
            p.hide();
            t.show();
            t.mouseover(a).mouseout(b || function() {
            });
            return this
        };
        s.each = function(a) {
            if (!Raphael.is(a, "function"))
                return this;
            for (var b = p.length; b--; )
                a.call(p[b]);
            return this
        };
        s.eachColumn = function(a) {
            if (!Raphael.is(a, "function"))
                return this;
            for (var b = t.length; b--; )
                a.call(t[b]);
            return this
        };
        s.click =
                function(a) {
                    t.hide();
                    p.show();
                    p.click(a);
                    return this
                };
        s.clickColumn = function(a) {
            p.hide();
            t.show();
            t.click(a);
            return this
        };
        s.push(u, p, t);
        s.bars = u;
        s.covers = p;
        return s
    }
    var y = Math.min, C = Math.max, G = function() {
    };
    G.prototype = Raphael.g;
    F.prototype = E.prototype = new G;
    Raphael.fn.barchart = function(f, m, i, b, a, h) {
        return new E(this, f, m, i, b, a, h)
    };
    Raphael.fn.hbarchart = function(f, m, i, b, a, h) {
        return new F(this, f, m, i, b, a, h)
    }
})();