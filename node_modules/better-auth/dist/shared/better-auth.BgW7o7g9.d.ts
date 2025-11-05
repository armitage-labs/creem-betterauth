interface CookieAttributes {
    value: string;
    "max-age"?: number;
    expires?: Date;
    domain?: string;
    path?: string;
    secure?: boolean;
    httponly?: boolean;
    samesite?: "strict" | "lax" | "none";
    [key: string]: any;
}
declare function parseSetCookieHeader(setCookie: string): Map<string, CookieAttributes>;
declare function setCookieToHeader(headers: Headers): (context: {
    response: Response;
}) => void;

export { parseSetCookieHeader as p, setCookieToHeader as s };
