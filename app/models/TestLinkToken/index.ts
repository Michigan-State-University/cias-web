// `VALID`/`EXPIRED`/`INVALID` mirror the backend's `status` on `POST /v1/test_link_tokens/verify`
// verbatim; `PENDING`/`UNAVAILABLE` are client-side only and never cross the wire.
export enum TestLinkTokenStatus {
  VALID = 'valid',
  EXPIRED = 'expired',
  INVALID = 'invalid',
  PENDING = 'pending',
  UNAVAILABLE = 'unavailable',
}
