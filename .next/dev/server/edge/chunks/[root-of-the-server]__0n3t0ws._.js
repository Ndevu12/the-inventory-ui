(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push(["chunks/[root-of-the-server]__0n3t0ws._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/src/i18n/locales-config.json.[json].cjs [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "defaultLocale": "en",
    "locales": [
        {
            "code": "ar",
            "displayName": "Arabic",
            "isRtl": true,
            "isDefault": false
        },
        {
            "code": "en",
            "displayName": "English",
            "isRtl": false,
            "isDefault": true
        },
        {
            "code": "es",
            "displayName": "Spanish",
            "isRtl": false,
            "isDefault": false
        },
        {
            "code": "fr",
            "displayName": "French",
            "isRtl": false,
            "isDefault": false
        },
        {
            "code": "rw",
            "displayName": "Kinyarwanda",
            "isRtl": false,
            "isDefault": false
        },
        {
            "code": "sw",
            "displayName": "Swahili",
            "isRtl": false,
            "isDefault": false
        }
    ]
};
}),
"[project]/src/i18n/routing.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_LOCALE",
    ()=>DEFAULT_LOCALE,
    "SUPPORTED_LOCALES",
    ()=>SUPPORTED_LOCALES,
    "localeEntries",
    ()=>localeEntries,
    "routing",
    ()=>routing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/routing/defineRouting.js [middleware-edge] (ecmascript) <export default as defineRouting>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2d$config$2e$json$2e5b$json$5d2e$cjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales-config.json.[json].cjs [middleware-edge] (ecmascript)");
;
;
const config = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2d$config$2e$json$2e5b$json$5d2e$cjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"];
const localeEntries = config.locales;
const SUPPORTED_LOCALES = config.locales.map((l)=>l.code);
const DEFAULT_LOCALE = config.defaultLocale;
const routing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__["defineRouting"])({
    locales: [
        ...SUPPORTED_LOCALES
    ],
    defaultLocale: DEFAULT_LOCALE,
    localePrefix: "always"
});
}),
"[project]/src/lib/auth-paths.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JWT_ACCESS_COOKIE_NAME",
    ()=>JWT_ACCESS_COOKIE_NAME,
    "isPublicAuthPath",
    ()=>isPublicAuthPath,
    "normalizeAuthInnerPath",
    ()=>normalizeAuthInnerPath,
    "parseLocalePath",
    ()=>parseLocalePath,
    "requiresJwtAccessCookie",
    ()=>requiresJwtAccessCookie
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/routing.ts [middleware-edge] (ecmascript)");
;
const JWT_ACCESS_COOKIE_NAME = "access_token";
/** Paths that do not require JWT access cookie (tenant UI); prefix is without locale. */ const PUBLIC_INNER_PATHS = new Set([
    "/login",
    "/register",
    "/no-organization"
]);
function normalizeInnerPath(segments) {
    if (segments.length === 0) {
        return "/";
    }
    return `/${segments.join("/")}`;
}
function normalizeAuthInnerPath(innerPath) {
    const trimmed = innerPath.trim();
    if (trimmed === "" || trimmed === "/") {
        return "/";
    }
    return trimmed.replace(/\/+$/, "") || "/";
}
function parseLocalePath(pathname) {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
        return {
            locale: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["DEFAULT_LOCALE"],
            innerPath: "/"
        };
    }
    const [first, ...rest] = segments;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SUPPORTED_LOCALES"].includes(first)) {
        return {
            locale: first,
            innerPath: normalizeAuthInnerPath(normalizeInnerPath(rest))
        };
    }
    return {
        locale: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["DEFAULT_LOCALE"],
        innerPath: normalizeAuthInnerPath(pathname || "/")
    };
}
function isPublicAuthPath(innerPath) {
    const p = normalizeAuthInnerPath(innerPath);
    if (PUBLIC_INNER_PATHS.has(p)) {
        return true;
    }
    if (p === "/accept-invitation" || p.startsWith("/accept-invitation/")) {
        return true;
    }
    return false;
}
function requiresJwtAccessCookie(innerPath) {
    return !isPublicAuthPath(innerPath);
}
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/middleware/middleware.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$paths$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-paths.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/routing.ts [middleware-edge] (ecmascript)");
;
;
;
;
const intlMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["routing"]);
function hasNonEmptyAccessCookie(request) {
    const v = request.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$paths$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["JWT_ACCESS_COOKIE_NAME"])?.value;
    return typeof v === "string" && v.length > 0;
}
function middleware(request) {
    if (request.nextUrl.pathname.startsWith("/api")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    const { locale, innerPath } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$paths$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["parseLocalePath"])(request.nextUrl.pathname);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$paths$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["requiresJwtAccessCookie"])(innerPath) && !hasNonEmptyAccessCookie(request)) {
        const url = request.nextUrl.clone();
        url.pathname = `/${locale}/login`;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    }
    return intlMiddleware(request);
}
const config = {
    matcher: [
        "/((?!api|_next|_vercel|.*\\..*).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__0n3t0ws._.js.map