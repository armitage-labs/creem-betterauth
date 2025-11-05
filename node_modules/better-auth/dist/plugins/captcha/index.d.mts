import * as _better_auth_core from '@better-auth/core';

declare const Providers: {
    readonly CLOUDFLARE_TURNSTILE: "cloudflare-turnstile";
    readonly GOOGLE_RECAPTCHA: "google-recaptcha";
    readonly HCAPTCHA: "hcaptcha";
    readonly CAPTCHAFOX: "captchafox";
};

interface BaseCaptchaOptions {
    secretKey: string;
    endpoints?: string[];
    siteVerifyURLOverride?: string;
}
interface GoogleRecaptchaOptions extends BaseCaptchaOptions {
    provider: typeof Providers.GOOGLE_RECAPTCHA;
    minScore?: number;
}
interface CloudflareTurnstileOptions extends BaseCaptchaOptions {
    provider: typeof Providers.CLOUDFLARE_TURNSTILE;
}
interface HCaptchaOptions extends BaseCaptchaOptions {
    provider: typeof Providers.HCAPTCHA;
    siteKey?: string;
}
interface CaptchaFoxOptions extends BaseCaptchaOptions {
    provider: typeof Providers.CAPTCHAFOX;
    siteKey?: string;
}
type CaptchaOptions = GoogleRecaptchaOptions | CloudflareTurnstileOptions | HCaptchaOptions | CaptchaFoxOptions;

declare const captcha: (options: CaptchaOptions) => {
    id: "captcha";
    onRequest: (request: Request, ctx: _better_auth_core.AuthContext) => Promise<{
        response: Response;
    } | undefined>;
};

export { captcha };
