/*!
 * g.Raphael 0.51 - Charting library, based on Raphaël
 *
 * Copyright (c) 2009-2012 Dmitry Baranovskiy (http://g.raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
(function() {
    function S(h, o) {
        for (var p = h.length / o, m = 0, k = p, b = 0, i = []; m < h.length; )
            k--, 0 > k ? (b += h[m] * (1 + k), i.push(b / p), b = h[m++] * -k, k += p) : b += 1 * h[m++];
        return i
    }
    function E(h, o, p, m, k, b, i, c) {
        var F, f, u, w;
        function J(a) {
            for (var s = [], e = 0, G = b.length; e < G; e++)
                s = s.concat(b[e]);
            s.sort(function(a, e) {
                return a - e
            });
            for (var c = [], g = [], e = 0, G = s.length; e < G; e++)
                s[e] != s[e - 1] && c.push(s[e]) && g.push(o + d + (s[e] - v) * A);
            for (var s = c, G = s.length, l = a || h.set(), e = 0; e < G; e++) {
                var c = g[e] - (g[e] - (g[e - 1] || o)) / 2, f = ((g[e + 1] || o + m) - g[e]) / 2 + (g[e] - (g[e -
                1] || o)) / 2, j;
                a ? j = {} : l.push(j = h.rect(c - 1, p, Math.max(f + 1, 1), k).attr({stroke: "none", fill: "#000", opacity: 0}));
                j.values = [];
                j.symbols = h.set();
                j.y = [];
                j.x = g[e];
                j.axis = s[e];
                for (var f = 0, r = i.length; f < r; f++)
                    for (var c = b[f] || b[0], n = 0, u = c.length; n < u; n++)
                        c[n] == s[e] && (j.values.push(i[f][n]), j.y.push(p + k - d - (i[f][n] - y) * H), j.symbols.push(q.symbols[f][n]));
                a && a.call(j)
            }
            !a && (t = l)
        }
        function N(a) {
            for (var g = a || h.set(), e, c = 0, j = i.length; c < j; c++)
                for (var f = 0, m = i[c].length; f < m; f++) {
                    var l = o + d + ((b[c] || b[0])[f] - v) * A, n = o + d + ((b[c] ||
                            b[0])[f ? f - 1 : 1] - v) * A, r = p + k - d - (i[c][f] - y) * H;
                    a ? e = {} : g.push(e = h.circle(l, r, Math.abs(n - l) / 2).attr({stroke: "#000", fill: "#000", opacity: 1}));
                    e.x = l;
                    e.y = r;
                    e.value = i[c][f];
                    e.line = q.lines[c];
                    e.shade = q.shades[c];
                    e.symbol = q.symbols[c][f];
                    e.symbols = q.symbols[c];
                    e.axis = (b[c] || b[0])[f];
                    a && a.call(e)
                }
            !a && (C = g)
        }
        c = c || {};
        h.raphael.is(b[0], "array") || (b = [b]);
        h.raphael.is(i[0], "array") || (i = [i]);
        for (var d = c.gutter || 10, l = Math.max(b[0].length, i[0].length), O = c.symbol || "", P = c.colors || this.colors, t = null, C = null, q = h.set(), g = [], a =
                0, n = i.length; a < n; a++)
            l = Math.max(l, i[a].length);
        for (var K = h.set(), a = 0, n = i.length; a < n; a++)
            c.shade && K.push(h.path().attr({stroke: "none", fill: P[a], opacity: c.nostroke ? 1 : 0.3})), i[a].length > m - 2 * d && (i[a] = S(i[a], m - 2 * d), l = m - 2 * d), b[a] && b[a].length > m - 2 * d && (b[a] = S(b[a], m - 2 * d));
        var g = Array.prototype.concat.apply([], b), l = Array.prototype.concat.apply([], i), g = this.snapEnds(Math.min.apply(Math, g), Math.max.apply(Math, g), b[0].length - 1), v = g.from, g = g.to, l = this.snapEnds(Math.min.apply(Math, l), Math.max.apply(Math, l), i[0].length -
                1), y = l.from, a = l.to, A = (m - 2 * d) / (g - v || 1), H = (k - 2 * d) / (a - y || 1), l = h.set();
        c.axis && (n = (c.axis + "").split(/[,\s]+/), +n[0] && l.push(this.axis(o + d, p + d, m - 2 * d, v, g, c.axisxstep || Math.floor((m - 2 * d) / 20), 2, h)), +n[1] && l.push(this.axis(o + m - d, p + k - d, k - 2 * d, y, a, c.axisystep || Math.floor((k - 2 * d) / 20), 3, h)), +n[2] && l.push(this.axis(o + d, p + k - d, m - 2 * d, v, g, c.axisxstep || Math.floor((m - 2 * d) / 20), 0, h)), +n[3] && l.push(this.axis(o + d, p + k - d, k - 2 * d, y, a, c.axisystep || Math.floor((k - 2 * d) / 20), 1, h)));
        for (var Q = h.set(), R = h.set(), E, a = 0, n = i.length; a < n; a++) {
            c.nostroke ||
                    Q.push(E = h.path().attr({stroke: P[a], "stroke-width": c.width || 2, "stroke-linejoin": "round", "stroke-linecap": "round", "stroke-dasharray": c.dash || ""}));
            for (var D = Raphael.is(O, "array") ? O[a] : O, I = h.set(), g = [], j = 0, T = i[a].length; j < T; j++) {
                var x = o + d + ((b[a] || b[0])[j] - v) * A, z = p + k - d - (i[a][j] - y) * H;
                (Raphael.is(D, "array") ? D[j] : D) && I.push(h[Raphael.is(D, "array") ? D[j] : D](x, z, 3 * (c.width || 2)).attr({fill: P[a], stroke: "none"}));
                if (c.smooth) {
                    if (j && j != T - 1) {
                        f = o + d + ((b[a] || b[0])[j - 1] - v) * A;
                        var L = p + k - d - (i[a][j - 1] - y) * H;
                        u = x;
                        w = z;
                        var r =
                                o + d + ((b[a] || b[0])[j + 1] - v) * A, B = p + k - d - (i[a][j + 1] - y) * H, M = (u - f) / 2;
                        F = (r - u) / 2;
                        f = Math.atan((u - f) / Math.abs(w - L));
                        r = Math.atan((r - u) / Math.abs(w - B));
                        f = L < w ? Math.PI - f : f;
                        r = B < w ? Math.PI - r : r;
                        B = Math.PI / 2 - (f + r) % (2 * Math.PI) / 2;
                        L = M * Math.sin(B + f);
                        f = M * Math.cos(B + f);
                        M = F * Math.sin(B + r);
                        r = F * Math.cos(B + r);
                        F = u - L;
                        f = w + f;
                        u += M;
                        w += r;
                        g = g.concat([F, f, x, z, u, w])
                    }
                    j || (g = ["M", x, z, "C", x, z])
                } else
                    g = g.concat([j ? "L" : "M", x, z])
            }
            c.smooth && (g = g.concat([x, z, x, z]));
            R.push(I);
            c.shade && K[a].attr({path: g.concat(["L", x, p + k - d, "L", o + d + ((b[a] || b[0])[0] - v) *
                            A, p + k - d, "z"]).join(",")});
            !c.nostroke && E.attr({path: g.join(",")})
        }
        q.push(Q, K, R, l, t, C);
        q.lines = Q;
        q.shades = K;
        q.symbols = R;
        q.axis = l;
        q.hoverColumn = function(a, c) {
            !t && J();
            t.mouseover(a).mouseout(c);
            return this
        };
        q.clickColumn = function(a) {
            !t && J();
            t.click(a);
            return this
        };
        q.hrefColumn = function(a) {
            var c = h.raphael.is(arguments[0], "array") ? arguments[0] : arguments;
            if (!(arguments.length - 1) && typeof a == "object")
                for (var e in a)
                    for (var b = 0, d = t.length; b < d; b++)
                        t[b].axis == e && t[b].attr("href", a[e]);
            !t && J();
            b = 0;
            for (d = c.length; b <
                    d; b++)
                t[b] && t[b].attr("href", c[b]);
            return this
        };
        q.hover = function(a, b) {
            !C && N();
            C.mouseover(a).mouseout(b);
            return this
        };
        q.click = function(a) {
            !C && N();
            C.click(a);
            return this
        };
        q.each = function(a) {
            N(a);
            return this
        };
        q.eachColumn = function(a) {
            J(a);
            return this
        };
        return q
    }
    var I = function() {
    };
    I.prototype = Raphael.g;
    E.prototype = new I;
    Raphael.fn.linechart = function(h, o, p, m, k, b, i) {
        return new E(this, h, o, p, m, k, b, i)
    }
})();