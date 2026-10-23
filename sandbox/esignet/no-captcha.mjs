#!/usr/bin/env node
// Makes a copy of eSignet's own sign-in flow without the CAPTCHA, for a local sandbox only.
// eSignet 2.0's flow-esignet.yaml puts an hCaptcha box on every sign-in screen. Locally there's
// no CAPTCHA validator (eSignet logs that it ignores the token), so the box only gets in the way
// of researchers. Everything else in the flow – the screens, OTP, consent – is unchanged.
//
//   node no-captcha.mjs < flow-esignet.yaml > flow-esignet.nocaptcha.yaml
import { readFileSync } from 'node:fs';

const lines = readFileSync(0, 'utf8').split('\n');
const indent = (l) => l.length - l.trimStart().length;
const out = [];
let skipDeeperThan = -1;

for (const line of lines) {
  if (skipDeeperThan >= 0) {
    if (line.trim() !== '' && indent(line) > skipDeeperThan) continue;
    skipDeeperThan = -1;
  }
  const t = line.trim();
  if (t === '- *captcha_box') continue;                          // the box on each screen
  if (t === '- ref: CAPTCHA_BOX' || t === 'captcha:' || line === 'interceptors:') {
    skipDeeperThan = indent(line);                               // required inputs, resend-OTP captcha, CaptchaInterceptor
    continue;
  }
  out.push(line);
}

const result = out.join('\n');
if (/CAPTCHA_BOX\n|CaptchaInterceptor|captcha_token/.test(result.replace(/^captcha_box: &captcha_box[\s\S]*?\n\n/m, ''))) {
  console.error('no-captcha: the flow file has changed shape; check it by hand');
  process.exit(1);
}
process.stdout.write(result);
