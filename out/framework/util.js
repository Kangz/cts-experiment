export function getStackTrace() {
    const e = new Error();
    if (e.stack) {
        return e.stack.split("\n").splice(4, 1).map((s) => s.trim()).join("\n");
    }
    else {
        return "";
    }
}
export function now() {
    let p;
    if (typeof (performance) !== "undefined") {
        p = performance;
    }
    else {
        p = require('perf_hooks').performance;
    }
    return p.now();
}
//# sourceMappingURL=util.js.map