! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.printd = {})
}(this, function (t) {
    "use strict";

    function e(t, e) {
        var n = t.createElement("style");
        return n.type = "text/css",
            n.appendChild(window.document.createTextNode(e)),
            n
    }

    function n(t) {
        void 0 === t && (t = window.document.body);
        var e = window.document.createElement("iframe");
        return e.setAttribute("src", "about:blank"),
            e.setAttribute("style", "visibility:hidden;width:0;height:0;position:absolute;z-index:-9999;bottom:0;"),
            e.setAttribute("width", "0"),
            e.setAttribute("height", "0"),
            e.setAttribute("wmode", "opaque"),
            t.appendChild(e),
            e
    }
    var i = function () {
        function t(t) {
            void 0 === t && (t = window.document.body),
                this.node = null,
                this.parent = t,
                this.iframe = n(this.parent)
        }
        return t.prototype.getIFrame = function () {
                return this.iframe
            },
            t.prototype.print = function (t, n, i) {
                this.node = t.cloneNode(!0);
                var o = this.iframe,
                    d = o.contentDocument,
                    r = o.contentWindow;
                d && r && (n && d.head.appendChild(e(d, n)),
                    this.node && (d.body.innerHTML = "",
                        d.body.appendChild(this.node),
                        i ? i(r, d, this.node, this.launchPrint) : this.launchPrint(r)))
            },
            t.prototype.launchPrint = function (t) {
                t.document.execCommand("print", !1, null) || t.print()
            },
            t
    }();
    t.Printd = i,
        t.createIFrame = n,
        t.createStyle = e,
        t.default = i,
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
});