/**
 * Google Maps reviews — source of truth for the reviews section.
 */
const reviewImg = (name) => `images/reviews/${name}`;

export const GOOGLE_REVIEWS = [
  {
    id: 'iman',
    name: 'Iman Mohamed Magdy Eissa',
    avatar: reviewImg('iman-avatar.jpg'),
    photo: reviewImg('iman-photo.jpg'),
    photoAlt: {
      ar: 'خبز طازج من المخبز',
      en: 'Fresh bread at the bakery',
    },
    badge: { ar: 'دليل محلي', en: 'Local Guide' },
    meta: { ar: '91 مراجعة', en: '91 reviews' },
    timeAgo: { ar: 'منذ 3 سنوات', en: '3 years ago' },
    text: {
      ar: 'مخبز محلي موثوق، جودة ممتازة جداً (أقل قليلاً من البريميوم) وأسعار معقولة. أنصح بيه بشدة.',
      en: 'Trusted local bakery, very good quality (slightly subpremium) and reasonable prices. Highly recommend',
    },
    rating: 5,
  },
  {
    id: 'mahmoud',
    name: 'Mahmoud Zarif',
    avatar: reviewImg('mahmoud-avatar.jpg'),
    photo: reviewImg('mahmoud-photo.jpg'),
    photoAlt: {
      ar: 'معجنات ومخبوزات طازجة',
      en: 'Fresh pastries and baked goods',
    },
    meta: { ar: '7 مراجعات', en: '7 reviews' },
    timeAgo: { ar: 'منذ 10 أشهر', en: '10 months ago' },
    text: {
      ar: 'مخبوزات onat حاجه مشاءالله تبارك الرحمن',
      en: 'Onat bakery — mashallah, truly blessed quality.',
    },
    rating: 5,
    scores: { food: 5, service: 5, atmosphere: 5 },
  },
  {
    id: 'elham',
    name: 'Elham Khalil',
    avatar: reviewImg('elham-avatar.jpg'),
    photo: reviewImg('elham-photo.jpg'),
    photoAlt: {
      ar: 'بسكوت ومخبوزات',
      en: 'Biscuits and baked treats',
    },
    badge: { ar: 'دليل محلي', en: 'Local Guide' },
    meta: { ar: '53 مراجعة', en: '53 reviews' },
    timeAgo: { ar: 'منذ سنة', en: 'a year ago' },
    text: {
      ar: 'حقيقي ألذ بسكوت نشادر أكلته ف حياتي',
      en: 'Honestly the best ammonia biscuits I have ever had in my life.',
    },
    rating: 5,
    scores: { food: 5, service: 5, atmosphere: 5 },
  },
  {
    id: 'esslam',
    name: 'Esslam Eldaba',
    avatar: reviewImg('esslam-avatar.jpg'),
    photo: reviewImg('esslam-photo.jpg'),
    photoAlt: {
      ar: 'عرض المخبز',
      en: 'Bakery display counter',
    },
    meta: { ar: 'مراجعتان', en: '2 reviews' },
    timeAgo: { ar: 'منذ 4 سنوات', en: '4 years ago' },
    text: {
      ar: 'من انضف الاماكن الي بحب اتعامل معاها',
      en: 'One of the cleanest places I like dealing with.',
    },
    rating: 5,
  },
  {
    id: 'mohamed',
    name: 'Mohamed Abdelal Ahmed',
    avatar: reviewImg('mohamed-avatar.jpg'),
    photo: reviewImg('mohamed-photo.jpg'),
    photoAlt: {
      ar: 'كيك وحلويات فاخرة',
      en: 'Premium cakes and desserts',
    },
    meta: { ar: 'مراجعتان', en: '2 reviews' },
    timeAgo: { ar: 'منذ 4 أيام', en: '4 days ago' },
    isNew: true,
    text: {
      ar: 'حاجه فاخر من الاخر والله ♥️♥️♥️♥️',
      en: 'Absolutely premium — honestly amazing ♥️',
    },
    rating: 5,
    scores: { food: 5, service: 5, atmosphere: 5 },
    tags: {
      ar: ['هادئ جداً', 'بدون انتظار', 'E£2,000+'],
      en: ['Very quiet', 'No wait', 'E£2,000+'],
    },
  },
  {
    id: 'ahmed',
    name: 'Ahmed Mustafa',
    avatar: reviewImg('ahmed-avatar.jpg'),
    photo: reviewImg('ahmed-photo.jpg'),
    photoAlt: {
      ar: 'حلويات وباتيسري',
      en: 'Patisserie selection',
    },
    badge: { ar: 'دليل محلي', en: 'Local Guide' },
    meta: { ar: '116 مراجعة', en: '116 reviews' },
    timeAgo: { ar: 'منذ 4 أشهر', en: '4 months ago' },
    text: {
      ar: 'من أحسن المخابز في المعادي',
      en: 'One of the best bakeries in Maadi',
    },
    rating: 5,
  },
];

export function getReviewText(review, lang) {
  return review.text[lang] || review.text.ar || review.text.en || '';
}

export function getReviewField(field, lang) {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[lang] || field.ar || field.en || '';
}

export function getReviewPhotoAlt(review, lang) {
  if (!review.photoAlt) return '';
  return getReviewField(review.photoAlt, lang);
}
