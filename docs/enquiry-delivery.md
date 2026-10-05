# Enquiry delivery setup

Owner-approved recipient: `admin@jufajaconstructions.com.au`. It is configured
as `ENQUIRY_TO_EMAIL` in Vercel production.

## Current sending-domain status

Release verification confirmed that the newly connected Resend account named
`jufa` already has `jufajaconstructions.com.au` verified for sending in
`ap-northeast-1`. Open/click tracking is disabled. No additional DNS
authentication is required for that verified account's current configuration.

The earlier account named `Resend` has a separate domain entry whose status is
still `not_started`. Its pending DNS records belong to that account and must
not replace the verified account's records. If the owner chooses that earlier
account instead, retrieve and configure its account-specific DNS records and
verify it before sending. Preserve existing mailbox MX records.

## Required production configuration

- `RESEND_API_KEY`: a sending key belonging to the verified sending account.
  Vercel currently has a secret named `resend`, but the application does not
  read that name. Its value has not been retrieved or exposed, so its validity
  and account ownership have not been established. If it is the intended key,
  configure it under the required `RESEND_API_KEY` name.
- `ENQUIRY_FROM_EMAIL`: the owner-approved sender on the verified domain.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`: shared rate-limit
  credentials. Production fails closed without the shared limiter.

Keep all credentials in Vercel environment configuration, never source control
or public client variables. Redeploy after environment configuration changes.
`.env.example` documents configuration names without credentials.

Website release does not establish real email delivery. Browser and API tests
intercept/mock provider delivery; invalid live API requests only test rejection.
No real enquiry or email has been sent. After setup, verify delivery only with
an explicitly owner-authorised test enquiry.
