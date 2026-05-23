/**
 * Onat Bakery branch locations.
 */
export const BRANCHES = [
  {
    id: 'maadi-1',
    name: { ar: 'المعادي 1', en: 'Maadi 1' },
    address: {
      ar: '56 طريق مصر حلوان الزراعي — بجوار مسجد حسين صدقي',
      en: '56 Egypt–Helwan Agricultural Rd — near Hussein Sadqy Mosque',
    },
    phones: ['0227518858', '01125549988'],
  },
  {
    id: 'zahraa-maadi',
    name: { ar: 'زهراء المعادي', en: 'Zahraa Maadi' },
    address: {
      ar: 'شارع الخمسين العموم — برج 8 شطر 13 — بجوار حلوان تسبياس',
      en: '50th Public St — Tower 8, Plot 13 — near Helwan Suspensions Bridge',
    },
    phones: ['0225197647', '01095103088'],
  },
  {
    id: 'rehab',
    name: { ar: 'الرحاب', en: 'El Rehab' },
    address: {
      ar: 'C86 — السوق الشرقي — الرحاب 2',
      en: 'C86 — Eastern Market — Rehab 2',
    },
    phones: ['01025016216', '0220296160'],
  },
  {
    id: 'shebin',
    name: { ar: 'شبين الكوم', en: 'Shebin El Kom' },
    address: {
      ar: 'شارع باريس — برج السعد — أمام الدمشقي',
      en: 'Paris St — Al-Saad Tower — in front of Al-Dimashqi',
    },
    phones: ['01122494945', '01007457427'],
  },
];

export function getBranchField(field, lang) {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[lang] || field.ar || field.en || '';
}

export function phoneTelHref(number) {
  const digits = number.replace(/\D/g, '');
  if (!digits) return '#';
  if (digits.startsWith('20')) return `tel:+${digits}`;
  if (digits.startsWith('0')) return `tel:+20${digits.slice(1)}`;
  return `tel:+20${digits}`;
}
