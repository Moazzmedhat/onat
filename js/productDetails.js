/**
 * Descriptions and pricing units for menu items.
 */
const CATEGORY_BASE = {
  biscuits: {
    ar: 'بسكوت وكوكيز مخبوز يومياً، هش ومناسب للضيافة والشاي.',
    en: 'Daily-baked biscuits and cookies, crisp and perfect for hosting or tea.',
    unitAr: 'للكيلو',
    unitEn: 'per kg',
    pieceBelow: null,
  },
  'diet-bread': {
    ar: 'خبز ومعجنات دايت أو فينو بمكونات مخفّفة ومتوازنة.',
    en: 'Diet or fino bread and pastries with balanced, lighter ingredients.',
    unitAr: 'للقطعة',
    unitEn: 'per piece',
    pieceBelow: 50,
  },
  patisserie: {
    ar: 'معجنات زبدة طازجة — باتيه وكرواسون محشو أو سادة.',
    en: 'Fresh butter pastries — filled or plain pâté and croissants.',
    unitAr: 'للقطعة',
    unitEn: 'per piece',
    pieceBelow: 100,
  },
  'pizza-savory': {
    ar: 'مخبوزات مالحة: بيتزا، مناقيش، وويتشات للفطور والعشاء.',
    en: 'Savory bakes: pizza, manakish, and filled rolls for any meal.',
    unitAr: 'للقطعة',
    unitEn: 'per piece',
    pieceBelow: 100,
  },
  'rusks-feteer': {
    ar: 'بقسماط، توست، وفطير مصري بطعم تقليدي.',
    en: 'Rusks, toast, and Egyptian feteer with a homestyle taste.',
    unitAr: 'للكيلو',
    unitEn: 'per kg',
    pieceBelow: 30,
  },
  snacks: {
    ar: 'مقرمشات وحلويات خفيفة للتسلية والهدايا.',
    en: 'Crispy snacks and light sweets for treats and gifting.',
    unitAr: 'للكيلو',
    unitEn: 'per kg',
    pieceBelow: null,
  },
  'kahk-sweets': {
    ar: 'حلويات شرقية وكيكات فردية بطعم غني.',
    en: 'Eastern sweets and individual cakes with rich flavor.',
    unitAr: 'للقطعة',
    unitEn: 'per piece',
    pieceBelow: 100,
  },
  pastries: {
    ar: 'نواعم ومنين وبيتي فور للمناسبات والضيافة.',
    en: 'Pastries, manin, and petit fours for celebrations.',
    unitAr: 'للكيلو',
    unitEn: 'per kg',
    pieceBelow: null,
  },
  eclairs: {
    ar: 'قطع حلوة فردية: اكلير، تارت، ودانش محشو.',
    en: 'Individual treats: filled eclairs, tarts, and danish.',
    unitAr: 'للقطعة',
    unitEn: 'per piece',
    pieceBelow: 100,
  },
  'cakes-donuts': {
    ar: 'كيك ودونات وكب كيك بطبقات كريمة أو شوكولاتة.',
    en: 'Cakes, donuts, and cupcakes with cream or chocolate layers.',
    unitAr: 'للقطعة',
    unitEn: 'per piece',
    pieceBelow: 100,
  },
};

const FLAVOR_HINTS = [
  { re: /شوك|chocolate|كاكاو/i, ar: ' بنكهة شوكولاتة فاخرة.', en: ' Premium chocolate notes.' },
  { re: /لوتس|lotus/i, ar: ' بطعم لوتس مميز.', en: ' Distinct lotus flavor.' },
  { re: /كيندر|kinder/i, ar: ' بحشوة كيندر الكريمية.', en: ' With creamy Kinder filling.' },
  { re: /نوتيلا|nutella/i, ar: ' مع نوتيلا غنية.', en: ' Rich Nutella filling.' },
  { re: /فسدق|pistachio/i, ar: ' مع فستق مقرمش.', en: ' With crunchy pistachio.' },
  { re: /لوز|almond/i, ar: ' مع لوز محمص.', en: ' With roasted almonds.' },
  { re: /جبن|cheese|رومي/i, ar: ' بحشوة جبنة متوازنة.', en: ' Balanced cheese filling.' },
  { re: /زعتر|zaatar/i, ar: ' بزعتر ولبنة عطرية.', en: ' Aromatic zaatar blend.' },
  { re: /شوفان|oat/i, ar: ' غني بالشوفان والألياف.', en: ' Oat-rich and wholesome.' },
  { re: /دايت|diet/i, ar: ' خيار أخف للدايت.', en: ' A lighter diet-friendly option.' },
  { re: /فراول|strawberry/i, ar: ' بنكهة فراولة منعشة.', en: ' Fresh strawberry flavor.' },
  { re: /كناف|kunafa/i, ar: ' كنافة مقرمشة بالقطر.', en: ' Crisp kunafa with syrup.' },
  { re: /كعك|kahk/i, ar: ' كعك تقليدي للمناسبات.', en: ' Traditional celebration kahk.' },
  { re: /بسطر|pastrami|تركي|turkey|روزبيف|roast beef/i, ar: ' بحشوة لحوم مدخنة.', en: ' Savory smoked meat filling.' },
  { re: /سبانخ|spinach/i, ar: ' بحشوة سبانخ طازجة.', en: ' Fresh spinach filling.' },
  { re: /عجو|date/i, ar: ' بحشوة عجوة ناضجة.', en: ' Sweet date filling.' },
  { re: /سمسم|sesame/i, ar: ' مغطى بسمسم محمص.', en: ' Topped with toasted sesame.' },
  { re: /ينسون|anise|جنزبيل|ginger/i, ar: ' بنكهات عطرية دافئة.', en: ' Warm aromatic spices.' },
];

export function getProductDescription(product, lang) {
  const base = CATEGORY_BASE[product.category];
  if (!base) return '';

  const name = lang === 'en' ? product.nameEn : product.nameAr;
  let text = lang === 'en' ? base.en : base.ar;

  for (const hint of FLAVOR_HINTS) {
    if (hint.re.test(name)) {
      text += lang === 'en' ? hint.en : hint.ar;
      break;
    }
  }

  return text;
}

export function getProductUnit(product, lang) {
  const base = CATEGORY_BASE[product.category];
  if (!base) return '';

  const usePiece =
    base.pieceBelow != null && product.price < base.pieceBelow;

  if (usePiece) {
    return lang === 'en' ? 'per piece' : 'للقطعة';
  }

  return lang === 'en' ? base.unitEn : base.unitAr;
}

export function getProductTags(product, lang) {
  const tags = [];
  const name = `${product.nameAr} ${product.nameEn}`;

  if (/دايت|diet/i.test(name)) tags.push(lang === 'en' ? 'Diet' : 'دايت');
  if (/شوك|chocolate|كيندر|kinder|لوتس|lotus|نوتيلا/i.test(name))
    tags.push(lang === 'en' ? 'Chocolate' : 'شوكولاتة');
  if (/جبن|cheese/i.test(name)) tags.push(lang === 'en' ? 'Cheese' : 'جبنة');
  if (/مكسر|nut|لوز|almond|فسدق|pistachio/i.test(name))
    tags.push(lang === 'en' ? 'Nuts' : 'مكسرات');
  if (/طازج|fresh/i.test(name) || product.category === 'patisserie')
    tags.push(lang === 'en' ? 'Fresh bake' : 'خبز طازج');

  return tags.slice(0, 3);
}
