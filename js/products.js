/**
 * Onat Bakery product catalog — synced from menu images.
 * Set shopifyVariantId after importing products to Shopify.
 */
export const CATEGORIES = [
  { id: 'biscuits', nameAr: 'بسكوت', nameEn: 'Biscuits' },
  { id: 'diet-bread', nameAr: 'دايت & فينو', nameEn: 'Diet & Fino' },
  { id: 'patisserie', nameAr: 'باتيه & كرواسون', nameEn: 'Pâté & Croissant' },
  { id: 'pizza-savory', nameAr: 'بيتزا & ساليزون', nameEn: 'Pizza & Savory' },
  { id: 'rusks-feteer', nameAr: 'بقسماط & فطير', nameEn: 'Rusks & Feteer' },
  { id: 'snacks', nameAr: 'مقرمشات', nameEn: 'Snacks' },
  { id: 'kahk-sweets', nameAr: 'كعك & حلو', nameEn: 'Kahk & Sweets' },
  { id: 'pastries', nameAr: 'نواعم & منين', nameEn: 'Pastries' },
  { id: 'eclairs', nameAr: 'اكلير & قطع', nameEn: 'Eclairs & Pieces' },
  { id: 'cakes-donuts', nameAr: 'كيك & دونات', nameEn: 'Cakes & Donuts' },
];

export const PRODUCTS = [
  // —— Biscuits (menu1) ——
  { id: 'bisc-001', category: 'biscuits', nameAr: 'بسكوت جنزبيل', nameEn: 'Ginger Biscuits', price: 230 },
  { id: 'bisc-002', category: 'biscuits', nameAr: 'بسكوت لوكس ينسون', nameEn: 'Luxe Anise Biscuits', price: 250 },
  { id: 'bisc-003', category: 'biscuits', nameAr: 'بلمي سكر وقرفه', nameEn: 'Sugar Cinnamon Palmier', price: 230 },
  { id: 'bisc-004', category: 'biscuits', nameAr: 'برونيز', nameEn: 'Brownies', price: 240 },
  { id: 'bisc-005', category: 'biscuits', nameAr: 'بسكوت شوكلاتة فسدق', nameEn: 'Chocolate Pistachio Biscuits', price: 270 },
  { id: 'bisc-006', category: 'biscuits', nameAr: 'بسكوت لوتس', nameEn: 'Lotus Biscuits', price: 220 },
  { id: 'bisc-007', category: 'biscuits', nameAr: 'بسكوت فسدق', nameEn: 'Pistachio Biscuits', price: 250 },
  { id: 'bisc-008', category: 'biscuits', nameAr: 'كوكيز لوتس', nameEn: 'Lotus Cookies', price: 230 },
  { id: 'bisc-009', category: 'biscuits', nameAr: 'كوكيز كندر', nameEn: 'Kinder Cookies', price: 230 },
  { id: 'bisc-010', category: 'biscuits', nameAr: 'بسكوت مكس', nameEn: 'Mixed Biscuits', price: 240 },
  { id: 'bisc-011', category: 'biscuits', nameAr: 'بسكويت نشادر', nameEn: 'Ammonia Biscuits', price: 230 },
  { id: 'bisc-012', category: 'biscuits', nameAr: 'كوكيز شوفان', nameEn: 'Oat Cookies', price: 230 },
  { id: 'bisc-013', category: 'biscuits', nameAr: 'برازق سوري', nameEn: 'Syrian Barazek', price: 210 },
  { id: 'bisc-014', category: 'biscuits', nameAr: 'شكلمه جوزهند', nameEn: 'Coconut Shakalama', price: 280 },
  { id: 'bisc-015', category: 'biscuits', nameAr: 'كوكيز ايطالي بالوز', nameEn: 'Italian Almond Cookies', price: 270 },

  // —— Diet & Fino (menu2) ——
  { id: 'diet-001', category: 'diet-bread', nameAr: 'شرائح دايت بزور الشيا', nameEn: 'Diet Chia Slices', price: 160 },
  { id: 'diet-002', category: 'diet-bread', nameAr: 'عيش شوفان دايت', nameEn: 'Diet Oat Bread', price: 3.5 },
  { id: 'diet-003', category: 'diet-bread', nameAr: 'عيش شعير', nameEn: 'Barley Bread', price: 5 },
  { id: 'diet-004', category: 'diet-bread', nameAr: 'كرواسون دايت', nameEn: 'Diet Croissant', price: 17 },
  { id: 'diet-005', category: 'diet-bread', nameAr: 'توست سن', nameEn: 'Brown Toast', price: 140 },
  { id: 'diet-006', category: 'diet-bread', nameAr: 'ميلفي دايت', nameEn: 'Diet Mille-feuille', price: 170 },
  { id: 'diet-007', category: 'diet-bread', nameAr: 'فينو بالسمسم', nameEn: 'Sesame Fino Roll', price: 2.5 },
  { id: 'diet-008', category: 'diet-bread', nameAr: 'عيش شباطه', nameEn: 'Ciabatta', price: 18 },
  { id: 'diet-009', category: 'diet-bread', nameAr: 'باجت براون', nameEn: 'Brown Baguette', price: 15 },
  { id: 'diet-010', category: 'diet-bread', nameAr: 'عيش شامي', nameEn: 'Shami Bread', price: 3 },

  // —— Pâté & Croissant (menu3) ——
  { id: 'pat-001', category: 'patisserie', nameAr: 'باتيه جبنه', nameEn: 'Cheese Pâté', price: 13 },
  { id: 'pat-002', category: 'patisserie', nameAr: 'باتيه شيكولاته', nameEn: 'Chocolate Pâté', price: 17 },
  { id: 'pat-003', category: 'patisserie', nameAr: 'كرواسون ساده', nameEn: 'Plain Croissant', price: 15 },
  { id: 'pat-004', category: 'patisserie', nameAr: 'كرواسون جبنه رومي', nameEn: 'Romi Cheese Croissant', price: 20 },
  { id: 'pat-005', category: 'patisserie', nameAr: 'كرواسون شيكولاته', nameEn: 'Chocolate Croissant', price: 18 },
  { id: 'pat-006', category: 'patisserie', nameAr: 'كرواسون زعتر', nameEn: 'Zaatar Croissant', price: 18 },
  { id: 'pat-007', category: 'patisserie', nameAr: 'كرواسون لوز', nameEn: 'Almond Croissant', price: 25 },
  { id: 'pat-008', category: 'patisserie', nameAr: 'كرواسون نوتيلا', nameEn: 'Nutella Croissant', price: 30 },
  { id: 'pat-009', category: 'patisserie', nameAr: 'كرواسون تركي', nameEn: 'Turkey Croissant', price: 40 },
  { id: 'pat-010', category: 'patisserie', nameAr: 'كرواسون روزبيف', nameEn: 'Roast Beef Croissant', price: 60 },

  // —— Pizza & Savory (menu4) ——
  { id: 'piz-001', category: 'pizza-savory', nameAr: 'بيتزا خضار', nameEn: 'Vegetable Pizza', price: 17 },
  { id: 'piz-002', category: 'pizza-savory', nameAr: 'بيتزا سوسيس وجبنه', nameEn: 'Sausage & Cheese Pizza', price: 22 },
  { id: 'piz-003', category: 'pizza-savory', nameAr: 'بيتزا ميلانو', nameEn: 'Milano Pizza', price: 35 },
  { id: 'piz-004', category: 'pizza-savory', nameAr: 'بيتزا بسطرمه', nameEn: 'Pastrami Pizza', price: 30 },
  { id: 'piz-005', category: 'pizza-savory', nameAr: 'مناقيش جبنه وزعتر', nameEn: 'Cheese Zaatar Manakish', price: 180 },
  { id: 'piz-006', category: 'pizza-savory', nameAr: 'مناقيش سبانخ', nameEn: 'Spinach Manakish', price: 180 },
  { id: 'piz-007', category: 'pizza-savory', nameAr: 'ويتش جبنه', nameEn: 'Cheese Witch', price: 180 },
  { id: 'piz-008', category: 'pizza-savory', nameAr: 'مناقيش بسطرمه', nameEn: 'Pastrami Manakish', price: 290 },
  { id: 'piz-009', category: 'pizza-savory', nameAr: 'ساليزون', nameEn: 'Salé', price: 230 },

  // —— Rusks & Feteer (menu5) ——
  { id: 'rusk-001', category: 'rusks-feteer', nameAr: 'بقسماط سمسم', nameEn: 'Sesame Rusks', price: 140 },
  { id: 'rusk-002', category: 'rusks-feteer', nameAr: 'توست أبيض', nameEn: 'White Toast', price: 140 },
  { id: 'rusk-003', category: 'rusks-feteer', nameAr: 'شرائح جبنه', nameEn: 'Cheese Slices', price: 170 },
  { id: 'rusk-004', category: 'rusks-feteer', nameAr: 'باتون ساليه ملح وكمون', nameEn: 'Salt Cumin Baton Salé', price: 160 },
  { id: 'rusk-005', category: 'rusks-feteer', nameAr: 'فطير صغير', nameEn: 'Small Feteer', price: 14 },
  { id: 'rusk-006', category: 'rusks-feteer', nameAr: 'فطير سمن بلدي', nameEn: 'Feteer with Ghee', price: 120 },

  // —— Snacks (menu6) ——
  { id: 'snk-001', category: 'snacks', nameAr: 'ويفر شيكولاتة', nameEn: 'Chocolate Wafer', price: 180 },
  { id: 'snk-002', category: 'snacks', nameAr: 'ويفر فراولة', nameEn: 'Strawberry Wafer', price: 180 },
  { id: 'snk-003', category: 'snacks', nameAr: 'بريدزو جبنه', nameEn: 'Breadzo Cheese', price: 170 },
  { id: 'snk-004', category: 'snacks', nameAr: 'ذرة اسباني جبنه', nameEn: 'Spanish Corn Cheese', price: 250 },
  { id: 'snk-005', category: 'snacks', nameAr: 'سوداني شيكولاته', nameEn: 'Peanut Chocolate', price: 220 },
  { id: 'snk-006', category: 'snacks', nameAr: 'كرسبي شوكلت', nameEn: 'Crispy Chocolate', price: 170 },

  // —— Kahk & Sweets (menu7) ——
  { id: 'sw-001', category: 'kahk-sweets', nameAr: 'كعك ساده', nameEn: 'Plain Kahk', price: 270 },
  { id: 'sw-002', category: 'kahk-sweets', nameAr: 'كعك مكسرات', nameEn: 'Nut Kahk', price: 310 },
  { id: 'sw-003', category: 'kahk-sweets', nameAr: 'كعك نوتيلا', nameEn: 'Nutella Kahk', price: 270 },
  { id: 'sw-004', category: 'kahk-sweets', nameAr: 'كنافة اساور', nameEn: 'Kunafa Bracelets', price: 320 },
  { id: 'sw-005', category: 'kahk-sweets', nameAr: 'بسبوسة', nameEn: 'Basbousa', price: 220 },
  { id: 'sw-006', category: 'kahk-sweets', nameAr: 'تشيز كيك', nameEn: 'Cheesecake', price: 40 },
  { id: 'sw-007', category: 'kahk-sweets', nameAr: 'ريد فيلفيت', nameEn: 'Red Velvet', price: 40 },
  { id: 'sw-008', category: 'kahk-sweets', nameAr: 'مولتن كيك', nameEn: 'Molten Cake', price: 55 },
  { id: 'sw-009', category: 'kahk-sweets', nameAr: 'ام علي', nameEn: 'Om Ali', price: 40 },

  // —— Pastries (menu8) ——
  { id: 'pas-001', category: 'pastries', nameAr: 'بوريك جبنه وحبة بركه', nameEn: 'Cheese Nigella Borek', price: 165 },
  { id: 'pas-002', category: 'pastries', nameAr: 'منين عجوه', nameEn: 'Date Manin', price: 175 },
  { id: 'pas-003', category: 'pastries', nameAr: 'منين ساده سمنه بلدي', nameEn: 'Plain Manin with Ghee', price: 280 },
  { id: 'pas-004', category: 'pastries', nameAr: 'بيتي فور', nameEn: 'Petit Four', price: 330 },
  { id: 'pas-005', category: 'pastries', nameAr: 'سابليه كيندر', nameEn: 'Kinder Sablé', price: 330 },
  { id: 'pas-006', category: 'pastries', nameAr: 'غريبه', nameEn: 'Ghorayeba', price: 300 },

  // —— Eclairs (menu9) ——
  { id: 'ecl-001', category: 'eclairs', nameAr: 'اكلير كيندر', nameEn: 'Kinder Eclair', price: 35 },
  { id: 'ecl-002', category: 'eclairs', nameAr: 'اكلير لوتس', nameEn: 'Lotus Eclair', price: 35 },
  { id: 'ecl-003', category: 'eclairs', nameAr: 'سينابون', nameEn: 'Cinnabon', price: 30 },
  { id: 'ecl-004', category: 'eclairs', nameAr: 'تارت نوتيلا', nameEn: 'Nutella Tart', price: 35 },
  { id: 'ecl-005', category: 'eclairs', nameAr: 'ابل باي', nameEn: 'Apple Pie', price: 35 },
  { id: 'ecl-006', category: 'eclairs', nameAr: 'دانش فواكة', nameEn: 'Fruit Danish', price: 30 },
  { id: 'ecl-007', category: 'eclairs', nameAr: 'ملفي', nameEn: 'Mille-feuille', price: 35 },

  // —— Cakes & Donuts (menu10) ——
  { id: 'cak-001', category: 'cakes-donuts', nameAr: 'دونات شيكولاته', nameEn: 'Chocolate Donut', price: 30 },
  { id: 'cak-002', category: 'cakes-donuts', nameAr: 'دونات لوتس', nameEn: 'Lotus Donut', price: 30 },
  { id: 'cak-003', category: 'cakes-donuts', nameAr: 'دونات كيندر', nameEn: 'Kinder Donut', price: 30 },
  { id: 'cak-004', category: 'cakes-donuts', nameAr: 'انجلش كيك شيكولاته', nameEn: 'English Chocolate Cake', price: 85 },
  { id: 'cak-005', category: 'cakes-donuts', nameAr: 'كيك شيكولاته', nameEn: 'Chocolate Cake', price: 170 },
  { id: 'cak-006', category: 'cakes-donuts', nameAr: 'كب كيك فراولة', nameEn: 'Strawberry Cupcake', price: 35 },
  { id: 'cak-007', category: 'cakes-donuts', nameAr: 'كيك نوتيلا', nameEn: 'Nutella Cake', price: 35 },
  { id: 'cak-008', category: 'cakes-donuts', nameAr: 'كيك اوريو', nameEn: 'Oreo Cake', price: 35 },
];

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id);
}

export function getProductsByCategory(categoryId) {
  return PRODUCTS.filter((p) => p.category === categoryId);
}

export function findProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}
