export const ENQUIRY_TYPES = [
  'General enquiry', 'Home design', 'Custom home', 'Knockdown rebuild',
  'House and land', 'Display home', 'Inclusions', 'Design inspiration',
] as const;

export type EnquiryType = typeof ENQUIRY_TYPES[number];
export interface EnquiryContext { enquiryType: EnquiryType; target: string }

const aliases: Record<string, EnquiryType> = {
  'general enquiry': 'General enquiry', general: 'General enquiry',
  'home design': 'Home design', 'new build': 'Home design',
  'custom home': 'Custom home', 'custom homes': 'Custom home', 'custom design': 'Custom home',
  'knockdown rebuild': 'Knockdown rebuild', 'knock down rebuild': 'Knockdown rebuild',
  'house & land': 'House and land', 'house and land': 'House and land',
  'display homes': 'Display home', 'display home': 'Display home',
  inclusions: 'Inclusions', 'design inspiration': 'Design inspiration',
};

export function cleanContext(value: unknown): string {
  return typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, 120) : '';
}

export function getEnquiryContext(values: { interest?: unknown; design?: unknown; project?: unknown }): EnquiryContext {
  const design = cleanContext(values.design);
  const project = cleanContext(values.project);
  if (design) return { enquiryType: 'Home design', target: design };
  if (project) return { enquiryType: 'Design inspiration', target: project };
  return { enquiryType: aliases[cleanContext(values.interest).toLowerCase()] ?? 'General enquiry', target: '' };
}
