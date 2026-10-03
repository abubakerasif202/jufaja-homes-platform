/** Only owner-configured public details may be published; delivery credentials are never reused. */
export default function BusinessContactDetails({ dark = false }: { dark?: boolean }) {
  const phone = process.env.JUFAJA_PUBLIC_PHONE?.trim();
  const email = process.env.JUFAJA_PUBLIC_EMAIL?.trim();
  const office = process.env.JUFAJA_PUBLIC_OFFICE?.trim();
  const hours = process.env.JUFAJA_PUBLIC_HOURS?.trim();
  const phoneLink = phone && /^[+\d\s().-]{8,40}$/.test(phone) ? phone.replace(/[^+\d]/g, '') : '';
  const publicEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '';
  if (!phoneLink && !publicEmail && !office && !hours) return null;
  return <address className={`mt-6 space-y-3 text-sm not-italic leading-6 ${dark ? 'text-jufaja-ivory/90' : 'text-jufaja-forest'}`}>
    {phoneLink && <p><a className="inline-flex min-h-11 items-center underline underline-offset-4" href={`tel:${phoneLink}`}>{phone}</a></p>}
    {publicEmail && <p><a className="inline-flex min-h-11 break-all items-center underline underline-offset-4" href={`mailto:${publicEmail}`}>{publicEmail}</a></p>}
    {office && <p>{office}</p>}
    {hours && <p>{hours}</p>}
  </address>;
}
