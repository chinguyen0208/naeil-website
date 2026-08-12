// =====================================================================
// NAEIL — i18n / language switcher
// Centralized translation source for the whole site (en / vi / zh).
// Every translatable string carries a matching key in each of the three
// dictionaries below; DOM elements opt in via a `data-i18n="key"`
// attribute (see html files). Selecting a language re-renders every
// matching element's text, updates both the desktop and mobile
// selector UI, and persists the choice (localStorage) so it survives
// navigation between pages and page refresh.
// =====================================================================
(function () {
  'use strict';

  var STORAGE_KEY = 'naeil_locale';
  var DEFAULT_LOCALE = 'en';
  var LOCALES = ['en', 'vi', 'zh'];
  var LOCALE_LABEL = { en: 'EN', vi: 'VI', zh: '中文' };

  // -------------------------------------------------------------------
  // Translation dictionary — keys are grouped by where they live on the
  // site (nav / mega menu / booking modal / footer are shared across
  // every page; the rest are namespaced per page). Ported 1:1 from the
  // site's copy-management spreadsheet (naeil-website-copy.xlsx) so the
  // two stay in sync.
  // -------------------------------------------------------------------
  var T = {
    en: {
      // ---- Shared: Navbar ----
      'nav.home': 'Home', 'nav.nail': 'Nail', 'nav.hair': 'Hair', 'nav.lash': 'Lash',
      'nav.about': 'About', 'nav.visit': 'Visit', 'nav.book': 'Book an appointment',
      // ---- Shared: Language switcher ----
      'lang.label': 'Language', 'lang.en': 'English', 'lang.vi': 'Tiếng Việt', 'lang.zh': '中文',
      // ---- Shared: Mega menu ----
      'megamenu.services': 'Services', 'megamenu.explore': 'Explore',
      'megamenu.nail.title': 'Nail', 'megamenu.nail.desc': 'Precision gel & lacquer artistry',
      'megamenu.hair.title': 'Hair', 'megamenu.hair.desc': 'Restorative head spa rituals',
      'megamenu.lash.title': 'Lash', 'megamenu.lash.desc': 'Korean lash lift & tint',
      'megamenu.about.title': 'About', 'megamenu.about.desc': 'Our philosophy & ritual',
      'megamenu.visit.title': 'Visit', 'megamenu.visit.desc': 'Location & opening hours',
      'megamenu.book': 'Book your appointment',
      // ---- Shared: Booking modal ----
      'booking.eyebrow': 'Get in touch', 'booking.title': 'Book your appointment',
      'booking.sub': "Choose how you'd like to reach us.",
      'booking.whatsapp': 'WhatsApp', 'booking.zalo': 'Zalo', 'booking.phone': 'Phone',
      'booking.instagram': 'Instagram', 'booking.facebook': 'Facebook',
      // ---- Shared: Footer ----
      'footer.brand': 'naeil nail bar',
      'footer.services': 'Services', 'footer.nail': 'Nail', 'footer.lash': 'Lash',
      'footer.headspa': 'Head Spa', 'footer.rituals': 'Rituals', 'footer.giftcards': 'Gift Cards',
      'footer.about': 'About', 'footer.aboutlink': 'visit', 'footer.aboutlink2': 'About us', 'footer.careers': 'Careers',
      'footer.getintouch': 'Get in Touch', 'footer.visit': 'Visit',
      'footer.address': '52 Nguyen Thai Hoc, Ba Dinh, Hanoi',
      'footer.phone': '+84 888 104 166', 'footer.hours': 'Open daily, 10am – 8pm',
      'footer.copyright': '© 2026 NAEIL. All rights reserved.',
      // ---- Home ----
      'home.hero.title': 'Self care, redefined',
      'home.hero.sub': 'Where effortless beauty meets thoughtful care.',
      'home.hero.cta': 'Book your rituals', 'home.hero.scroll': 'scroll to discover',
      'home.services.eyebrow': 'Our Services',
      'home.services.nail.title': 'Nail',
      'home.services.nail.copy': 'Precision nail artistry using only the finest gel and lacquer systems. From soft minimalist tones to bespoke nail art.',
      'home.services.nail.link': 'explore nail',
      'home.services.lash.title': 'Lash Lift',
      'home.services.lash.copy': 'Designed to enhance your natural lashes with soft curl, depth and definition, this treatment creates an awake, polished look that lasts beyond your daily routine.',
      'home.services.lash.link': 'explore lash lift',
      'home.services.spa.title': 'Head Spa',
      'home.services.spa.copy': 'Thoughtfully designed to nourish the scalp, ease physical tension and encourage deep relaxation through expert touch and personalised care.',
      'home.services.spa.link': 'explore head spa',
      'home.philosophy.eyebrow': 'Our Philosophy',
      'home.philosophy.title1': 'Refined Beauty', 'home.philosophy.title2': 'Consious', 'home.philosophy.title3': 'care',
      'home.philosophy.copy': "At Naeil, we believe beauty is more than appearance—it's the way you care for yourself. Using non-toxic products, maintaining the highest hygiene standards, and creating a space to truly slow down, every detail is designed to help you feel your best.",
      'home.philosophy.btn': 'About Naeil',
      // ---- Nail ----
      'nail.hero.title': "Naeil's Nail",
      'nail.hero.sub': 'Refined beauty without compromise.',
      'nail.hero.desc1': 'Using only premium non-toxic products, we create polished,',
      'nail.hero.desc2': 'long-lasting results while caring for the health of your nails.',
      'nail.hero.cta': 'Book your appointment',
      'nail.services.eyebrow': 'What Goes On Your Nail',
      'nail.services.sub': 'From BIAB systems to gel colours and treatments, every formula we use is chosen for safer ingredients, exceptional performance, and healthier natural nails.',
      'nail.services.gelbottle.title': 'The Gel Bottle',
      'nail.services.gelbottle.copy': 'Professional BIAB systems with non-toxic formulations designed to strengthen and protect natural nails.',
      'nail.services.mayour.title': 'Mayour',
      'nail.services.mayour.copy': 'Premium Korean gel colours with refined pigments and cleaner formulations for healthy, long-lasting wear.',
      'nail.services.favori.title': 'Favori',
      'nail.services.favori.copy': 'Professional Korean design products selected for delicate finishes.',
      'nail.standard.eyebrow': 'The Naeil Standard',
      'nail.standard.title': 'Beautiful nails, without compromise.',
      'nail.standard.copy': 'Every product we choose, every formula we trust and every technique we practice is selected to deliver beautiful, long-lasting results while protecting the health of your natural nails.',
      'nail.standard.btn': 'Book your appointment',
      // ---- Head Spa ----
      'spa.hero.title': 'Head Spa',
      'spa.hero.sub': 'Scalp care. Hair nourishment.',
      'spa.hero.desc': 'A restorative head spa ritual designed to cleanse, nourish and rebalance your scalp. Relieve tension, improve circulation and restore healthy, radiant hair from the roots.',
      'spa.hero.cta': 'Book your service',
      'spa.services.eyebrow': 'Our Headspa Services',
      'spa.services.sub': 'Rituals designed to meet every need — from gentle cleansing to intensive scalp and hair care.',
      'spa.services.essential.title': 'Essential - 45 MIN',
      'spa.services.essential.subdesc': 'Quick Wash · Basic Cleansing',
      'spa.services.essential.copy': 'A simple yet elevated cleansing ritual for everyday scalp care. Includes a gentle shampoo, relaxing scalp massage, and a professional blow-dry.',
      'spa.services.essential.price': 'from 250,000 VND',
      'spa.services.restore.title': 'Restore - 75 MIN',
      'spa.services.restore.subdesc': 'Hair Wash · Neck & Shoulder Massage',
      'spa.services.restore.copy': 'A calming head spa experience combining a hair wash with scalp, neck and shoulder massage. Designed to ease tension and leave you feeling relaxed after a long day.',
      'spa.services.restore.price': 'from 375,000',
      'spa.services.scalpreset.title': 'Scalp Reset - 90 MIN',
      'spa.services.scalpreset.subdesc': 'Scalp Cleansing',
      'spa.services.scalpreset.copy': 'A personalised scalp treatment for oily, sensitive or congested scalps. Following a scalp analysis, this ritual includes deep cleansing, scalp exfoliation, intensive purification and customised treatment to restore long-term scalp health.',
      'spa.services.scalpreset.price': 'from 690,000',
      'spa.services.hairreplenish.title': 'Hair Replenish - 90 MIN',
      'spa.services.hairreplenish.subdesc': 'Restore & Nourish Hair',
      'spa.services.hairreplenish.copy': 'An intensive hair treatment designed to repair, strengthen, and deeply nourish dry or chemically damaged hair. Personalised to your hair condition, this ritual restores softness, shine, elasticity, and long-lasting moisture.',
      'spa.services.hairreplenish.price': 'from 790,000',
      'spa.services.note': 'All rituals include scalp analysis and a personalized consultation.',
      'spa.expect.label': 'The Naeil Experience',
      'spa.expect.title': 'Personalised care, from scalp to hair',
      'spa.expect.intro': 'A mindful head spa journey designed around you — where every step is intentional, and every detail matters.',
      'spa.expect.analyse.title': 'Consult', 'spa.expect.analyse.copy': 'A consultation to understand your scalp, hair and care needs.',
      'spa.expect.cleanse.title': 'Cleanse', 'spa.expect.cleanse.copy': 'Gentle yet effective cleansing to purify and rebalance.',
      'spa.expect.treat.title': 'Relax', 'spa.expect.treat.copy': 'Scalp massage combined with neck and shoulder massage, tailored to your treatment.',
      'spa.expect.nourish.title': 'Care', 'spa.expect.nourish.copy': 'Targeted care steps tailored to your scalp and hair.',
      'spa.expect.styling.title': 'Finish', 'spa.expect.styling.copy': 'Silky, salon-finished hair that feels as good as it looks.',
      // ---- Lash ----
      'lash.hero.title': 'Korean Lash Lift',
      'lash.hero.sub': 'Softly lifted, refined results.',
      'lash.hero.desc': 'A bespoke lash treatment designed to enhance your natural lashes with soft lift and delicate definition, tailored to your unique eye shape.',
      'lash.hero.cta': 'Book your appointment',
      'lash.intro.eyebrow': 'Natural, Yet Noticeable',
      'lash.intro.sub': 'A gentle lift that enhances your natural beauty — softer, brighter, unmistakably you.',
      'lash.slider.before': 'Before', 'lash.slider.after': 'After',
      'lash.process.label': 'THE PROCESS',
      'lash.process.title': 'From natural lashes to lasting lift.',
      'lash.process.intro': 'A gentle, four-step ritual designed to lift, define and care for your lashes — from the inside out.',
      'lash.process.step.cleanse': 'Cleanse', 'lash.process.step.lift': 'Lift',
      'lash.process.step.set': 'Set', 'lash.process.step.nourish': 'Nourish',
      'lash.process.cleanse.title': 'Cleanse',
      'lash.process.cleanse.desc': 'Gently removes excess oils and impurities while preserving natural moisture, creating the ideal foundation for better product absorption, healthier lashes and longer-lasting lift results.',
      'lash.process.lift.title': 'Lift',
      'lash.process.lift.desc': 'A keratin-based lifting system that softly reshapes each lash into a smooth, resilient curl while maintaining flexibility, hydration and long-lasting definition.',
      'lash.process.set.title': 'Set',
      'lash.process.set.desc': 'Rebalances the natural pH and seals the cuticle to lock in the curl, protect against damage and leave every lash looking smooth, healthy and beautifully defined.',
      'lash.process.nourish.title': 'Nourish',
      'lash.process.nourish.desc': 'Finishes the treatment with a peptide-rich ampoule and serum that deeply hydrates, strengthens and improves shine, helping maintain healthier, fuller-looking lashes long after your appointment.',
      'lash.process.hint': 'Swipe to explore each step',
      'lash.why.kicker': 'The Naeil Difference', 'lash.why.heading1': 'Why we', 'lash.why.heading2': 'love it',
      'lash.why.korean.title': 'Korean Techniques', 'lash.why.korean.copy': 'Advanced Korean lash lift techniques for beautiful, natural results.',
      'lash.why.organic.title': '100% Organic', 'lash.why.organic.copy': 'All products are organic Korean-made, safe and gentle for your lashes.',
      'lash.why.longlasting.title': 'Long Lasting', 'lash.why.longlasting.copy': 'Last 6-8 weeks with proper care.',
      'lash.why.nodamage.title': 'No Damage', 'lash.why.nodamage.copy': 'Gentle formula that keeps your lashes healthy and strong.',
      'lash.why.lowmaintenance.title': 'Low Maintenance', 'lash.why.lowmaintenance.copy': 'Natural, lifted lash, everyday.',
      // ---- About ----
      'about.hero.eyebrow': 'ABOUT NAEIL',
      'about.hero.line1': 'Less effort.', 'about.hero.line2': 'More present.',
      'about.hero.desc': 'NAEIL is a modern beauty studio offering exceptional beauty experiences. Thoughtfully crafted rituals for those who appreciate precision, comfort and calm.',
      'about.hero.cta': 'Book your appointment',
      'about.philosophy.quote': 'We believe beauty should never feel rushed.',
      'about.philosophy.copy': 'Every ritual at NAEIL is designed to create a moment of stillness through thoughtful techniques, clean products and intentional care.',
      'about.philosophy.vertical1': 'Thoughtful care.', 'about.philosophy.vertical2': 'In every detail.',
      'about.values.label': 'OUR VALUES',
      'about.values.precision.title': 'Precision', 'about.values.precision.copy': 'Every detail matters. From the way we work to the products we choose.',
      'about.values.comfort.title': 'Comfort', 'about.values.comfort.copy': 'Designed for complete ease and relaxation. A luxurious get away.',
      'about.values.presence.title': 'Presence', 'about.values.presence.copy': 'A ritual that allows you to slow down and be fully in the moment.',
      'about.ritual.label': 'OUR RITUAL',
      'about.ritual.title': 'A quiet rhythm, from arrival to ease.',
      'about.ritual.walkin.title': 'Walk In', 'about.ritual.walkin.copy': 'Leave the outside world at the door.',
      'about.ritual.pause.title': 'Pause', 'about.ritual.pause.copy': 'Take a breath. Settle in.',
      'about.ritual.reset.title': 'Reset', 'about.ritual.reset.copy': 'We care for every detail.',
      'about.ritual.restore.title': 'Restore', 'about.ritual.restore.copy': 'Feel lighter, inside out.',
      'about.ritual.leavelighter.title': 'Leave Lighter', 'about.ritual.leavelighter.copy': 'Carry the calm with you.',
      'about.space.label': 'OUR SPACE',
      'about.space.title1': 'A place designed', 'about.space.title2': 'to slow you down.',
      'about.space.copy': 'Soft light, natural textures and intentional design — created to help you feel at ease from the moment you arrive.',
      'about.finalcta.title1': 'Leave lighter.', 'about.finalcta.title2': 'Carry the calm with you.',
      'about.finalcta.copy': "Whether it's your first visit or your fiftieth, we'll be here.",
      'about.finalcta.btn': 'Book your appointment',
      // ---- Visit ----
      'visit.hero.title': 'Visit Us',
      'visit.hero.desc': "We'd love to welcome you to NAEIL Nail Bar.",
      'visit.hero.cta': 'Book your appointment',
      'visit.info.location': 'Location',
      'visit.info.address1': '52 Nguyen Thai Hoc, Ba Dinh,', 'visit.info.address2': 'Hanoi, Vietnam',
      'visit.info.directions': 'Get Directions',
      'visit.info.hours': 'Opening Hours',
      'visit.info.monfri': 'Mon–Fri', 'visit.info.satsun': 'Sat–Sun', 'visit.info.publicholiday': 'Public Holiday',
      'visit.info.note': 'Open daily. Walk-ins welcome.',
      'visit.find.title1': 'A calm space,', 'visit.find.title2': 'right in the city.',
      'visit.find.copy': 'Tucked along a tree-lined street near the Temple of Literature, the studio sits within an easy, unhurried walk from the Old Quarter.',
      'visit.find.parking': 'Street parking available, with a nearby parking lot just steps away.',
      'visit.finalcta.title': "We can't wait to welcome you.",
      'visit.finalcta.copy': 'Your moment of care awaits.',
      'visit.finalcta.btn': 'Book your appointment'
    },

    vi: {
      'nav.home': 'Trang chủ',
      'nav.nail': 'Nail',
      'nav.hair': 'Hair',
      'nav.lash': 'Lash',
      'nav.about': 'Giới thiệu',
      'nav.visit': 'Ghé thăm',
      'nav.book': 'Đặt lịch hẹn',
      'lang.label': 'Ngôn ngữ',
      'lang.en': 'English',
      'lang.vi': 'Tiếng Việt',
      'lang.zh': '中文',
      'megamenu.services': 'Dịch vụ',
      'megamenu.explore': 'Khám phá',
      'megamenu.nail.title': 'Nail',
      'megamenu.nail.desc': 'Chăm sóc móng & sơn gel',
      'megamenu.hair.title': 'Hair',
      'megamenu.hair.desc': 'Liệu trình chăm sóc tóc',
      'megamenu.lash.title': 'Lash',
      'megamenu.lash.desc': 'Uốn & nhuộm mi kiểu Hàn Quốc',
      'megamenu.about.title': 'Giới thiệu',
      'megamenu.about.desc': 'Câu chuyện về NAEIL',
      'megamenu.visit.title': 'Ghé thăm',
      'megamenu.visit.desc': 'Địa chỉ & giờ mở cửa',
      'megamenu.book': 'Đặt lịch dịch vụ',
      'booking.eyebrow': 'Liên hệ với chúng tôi',
      'booking.title': 'Đặt lịch dịch vụ',
      'booking.sub': 'Chọn cách bạn muốn liên hệ với chúng tôi.',
      'booking.whatsapp': 'WhatsApp',
      'booking.zalo': 'Zalo',
      'booking.phone': 'Điện thoại',
      'booking.instagram': 'Instagram',
      'booking.facebook': 'Facebook',
      'footer.brand': 'naeil nail bar',
      'footer.services': 'Dịch vụ',
      'footer.nail': 'Nail',
      'footer.lash': 'Lash',
      'footer.headspa': 'Head Spa',
      'footer.rituals': 'Liệu trình',
      'footer.giftcards': 'Thẻ quà tặng',
      'footer.about': 'Giới thiệu',
      'footer.aboutlink': 'Ghé thăm',
      'footer.aboutlink2': 'Về chúng tôi',
      'footer.careers': 'Tuyển dụng',
      'footer.getintouch': 'Liên hệ',
      'footer.visit': 'Ghé thăm',
      'footer.address': 'Số 52 Nguyễn Thái Học, Ba Đình, Hà Nội',
      'footer.phone': '+84 888 104 166',
      'footer.hours': 'Mở cửa hàng ngày, 10:00 – 20:00',
      'footer.copyright': '© 2026 NAEIL. Bảo lưu mọi quyền.',
      'home.hero.title': 'Self care, redefined',
      'home.hero.sub': 'Một không gian làm đẹp được tạo nên từ sự tinh tế và chăm chút trong từng trải nghiệm.',
      'home.hero.cta': 'Đặt lịch trải nghiệm',
      'home.hero.scroll': 'kéo xuống để khám phá',
      'home.services.eyebrow': 'DỊCH VỤ TẠI NAEIL',
      'home.services.nail.title': 'Nail',
      'home.services.nail.copy': 'Gel và màu sơn được tuyển chọn kỹ lưỡng, cùng những thiết kế tinh tế dành riêng cho bạn.',
      'home.services.nail.link': 'Tìm hiểu thêm',
      'home.services.lash.title': 'Lash Lift',
      'home.services.lash.copy': 'Định hình hàng mi tự nhiên với độ cong mềm mại, cho ánh nhìn tươi tắn và chỉn chu mỗi ngày.',
      'home.services.lash.link': 'Tìm hiểu thêm',
      'home.services.spa.title': 'Head Spa',
      'home.services.spa.copy': 'Gội đầu thư giãn kết hợp chăm sóc da đầu và massage, giúp cơ thể thả lỏng và tinh thần nhẹ nhàng hơn.',
      'home.services.spa.link': 'Tìm hiểu thêm',
      'home.philosophy.eyebrow': 'Điều NAEIL theo đuổi',
      'home.philosophy.title1': 'Chúng tôi tin vào những điều vừa đủ',
      'home.philosophy.title2': '',
      'home.philosophy.title3': '',
      'home.philosophy.copy': 'Tại NAEIL, chúng tôi tin rằng vẻ đẹp không chỉ nằm ở diện mạo, mà còn ở cách bạn chăm sóc chính mình. Từ những sản phẩm lành tính, tiêu chuẩn vệ sinh nghiêm ngặt đến không gian được chăm chút, mọi thứ đều được lựa chọn và thực hiện với sự chỉn chu, để bạn có thể chậm lại và tận hưởng khoảng thời gian dành riêng cho mình.',
      'home.philosophy.btn': 'Về Naeil',
      'nail.hero.title': "Naeil's Nail",
      'nail.hero.sub': 'Vẻ đẹp tinh tế, không cần đánh đổi',
      'nail.hero.desc1': 'Sử dụng các sản phẩm cao cấp, không độc hại, NAEIL chăm chút đôi tay của bạn với những thiết kế đẹp mắt và vẫn giữ được sự khỏe mạnh tự nhiên của móng.',
      'nail.hero.desc2': '',
      'nail.hero.cta': 'Đặt lịch dịch vụ',
      'nail.services.eyebrow': 'Naeil dùng gì chăm móng của bạn ?',
      'nail.services.sub': 'Từ BIAB, gel màu đến các sản phẩm chăm sóc móng, mọi lựa chọn tại NAEIL đều được tuyển chọn kỹ lưỡng với thành phần lành tính, hiệu quả vượt trội và luôn ưu tiên sức khỏe tự nhiên của móng.',
      'nail.services.gelbottle.title': 'The Gel Bottle',
      'nail.services.gelbottle.copy': 'Dòng BIAB chuyên nghiệp với công thức lành tính, dành cho một nền móng khỏe và bền đẹp.',
      'nail.services.mayour.title': 'Mayour',
      'nail.services.mayour.copy': 'Màu gel cao cấp từ Hàn Quốc với bảng màu tinh tế, độ bền cao và thành phần được chọn lọc để nâng niu móng tự nhiên.',
      'nail.services.favori.title': 'Favori',
      'nail.services.favori.copy': 'Sản phẩm thiết kế chuyên nghiệp từ Nhật Bản, mang đến độ hoàn thiện tinh tế trong từng chi tiết.',
      'nail.standard.eyebrow': 'Tiêu chuẩn Naeil',
      'nail.standard.title': 'Móng đẹp, bắt đầu từ một nền móng khỏe.',
      'nail.standard.copy': 'Mỗi lựa chọn tại NAEIL, từ sản phẩm, công thức đến kỹ thuật, đều được cân nhắc kỹ lưỡng để mang đến vẻ đẹp bền lâu, đồng thời gìn giữ vẻ khỏe mạnh tự nhiên của móng.',
      'nail.standard.btn': 'Đặt lịch dịch vụ',
      'spa.hero.title': 'Head Spa',
      'spa.hero.sub': 'Chăm sóc da đầu. Nuôi dưỡng mái tóc.',
      'spa.hero.desc': 'Chăm sóc da đầu và mái tóc với quy trình làm sạch, nuôi dưỡng và massage thư giãn. Một trải nghiệm nhẹ nhàng giúp xoa dịu căng thẳng, mang lại cảm giác thư thái cùng mái tóc mềm mượt, khỏe đẹp.',
      'spa.hero.cta': 'Đặt lịch dịch vụ',
      'spa.services.eyebrow': 'Dịch vụ Head Spa',
      'spa.services.sub': 'Các liệu trình được thiết kế để đáp ứng từng nhu cầu — từ làm sạch cơ bản đến chăm sóc chuyên sâu cho da đầu và mái tóc.',
      'spa.services.essential.title': 'Essential - 45 PHÚT',
      'spa.services.essential.subdesc': 'Gội nhanh · Làm sạch cơ bản',
      'spa.services.essential.copy': 'Gội sạch da đầu và tóc, kết hợp massage da đầu nhẹ nhàng và sấy tạo kiểu. Phù hợp cho nhu cầu làm sạch hằng ngày hoặc những ngày bạn muốn chăm sóc nhanh gọn.',
      'spa.services.essential.price': 'từ 250.000 VNĐ',
      'spa.services.restore.title': 'Restore - 75 PHÚT',
      'spa.services.restore.subdesc': 'Gội đầu · Massage cổ vai gáy',
      'spa.services.restore.copy': 'Gội đầu kết hợp massage da đầu và cổ, vai, gáy. Tập trung vào sự thư giãn, giúp cơ thể thả lỏng và mang lại cảm giác dễ chịu sau một ngày dài.',
      'spa.services.restore.price': 'từ 375.000',
      'spa.services.scalpreset.title': 'Scalp Reset - 90 PHÚT',
      'spa.services.scalpreset.subdesc': 'Làm sạch da đầu',
      'spa.services.scalpreset.copy': 'Liệu trình dành cho da đầu cần được làm sạch kỹ hơn. Kết hợp sản phẩm tẩy tế bào chết chuyên dụng và các bước làm sạch sâu, giúp loại bỏ buildup và mang lại cảm giác sạch thoáng cho da đầu.',
      'spa.services.scalpreset.price': 'từ 690.000',
      'spa.services.hairreplenish.title': 'Hair Replenish - 90 PHÚT',
      'spa.services.hairreplenish.subdesc': 'Phục hồi & nuôi dưỡng tóc',
      'spa.services.hairreplenish.copy': 'Liệu trình dành cho mái tóc khô, xơ hoặc thiếu sức sống. Tập trung bổ sung dưỡng chất và chăm sóc chuyên sâu để tóc trở nên mềm mượt, đàn hồi và bóng khỏe hơn.',
      'spa.services.hairreplenish.price': 'từ 790.000',
      'spa.services.note': 'Mỗi liệu trình đều bắt đầu với phân tích da đầu và tư vấn cá nhân hóa theo nhu cầu của bạn.',
      'spa.expect.label': 'Trải nghiệm tại Naeil',
      'spa.expect.title': 'Chăm sóc theo nhu cầu',
      'spa.expect.intro': 'Từ da đầu đến mái tóc, mỗi bước chăm sóc đều được điều chỉnh theo nhu cầu riêng của bạn.',
      'spa.expect.analyse.title': 'Tư vấn',
      'spa.expect.analyse.copy': 'Tìm hiểu tình trạng da đầu, mái tóc và nhu cầu chăm sóc của bạn.',
      'spa.expect.cleanse.title': 'Làm sạch',
      'spa.expect.cleanse.copy': 'Làm sạch dịu nhẹ, giúp loại bỏ bụi bẩn, bã nhờn và cân bằng da đầu.',
      'spa.expect.treat.title': 'Thư giãn',
      'spa.expect.treat.copy': 'Massage da đầu, kết hợp massage cổ vai gáy với liệu trình phù hợp.',
      'spa.expect.nourish.title': 'Chăm sóc',
      'spa.expect.nourish.copy': 'Các bước chăm sóc chuyên biệt, phù hợp với da đầu và mái tóc của bạn.',
      'spa.expect.styling.title': 'Hoàn thiện',
      'spa.expect.styling.copy': 'Sấy và tạo kiểu nhẹ nhàng, mang đến mái tóc chỉn chu, mềm mượt và tự nhiên.',
      'lash.hero.title': 'Korean Lash Lift',
      'lash.hero.sub': 'Dịch vụ uốn mi Hàn Quốc',
      'lash.hero.desc': 'Dịch vụ uốn mi được cá nhân hóa theo dáng mắt, mang đến hàng mi cong tự nhiên, mềm mại và hài hòa với đường nét khuôn mặt.',
      'lash.hero.cta': 'Đặt lịch dịch vụ',
      'lash.intro.eyebrow': 'Tự nhiên nhưng vẫn nổi bật',
      'lash.intro.sub': 'Một liệu trình uốn mi nhẹ nhàng tôn lên vẻ đẹp tự nhiên của bạn — mềm mại hơn, rạng rỡ hơn nhưng vẫn là chính bạn.',
      'lash.slider.before': 'Trước',
      'lash.slider.after': 'Sau',
      'lash.process.label': 'TRẢI NGHIỆM',
      'lash.process.title': 'Từ hàng mi tự nhiên đến độ cong bền lâu.',
      'lash.process.intro': 'Liệu trình bốn bước nhẹ nhàng được thiết kế để uốn cong, định hình và chăm sóc hàng mi của bạn — từ sâu bên trong.',
      'lash.process.step.cleanse': 'Làm sạch',
      'lash.process.step.lift': 'Uốn cong',
      'lash.process.step.set': 'Định hình',
      'lash.process.step.nourish': 'Nuôi dưỡng',
      'lash.process.cleanse.title': 'Làm sạch',
      'lash.process.cleanse.desc': 'Nhẹ nhàng làm sạch dầu thừa và tạp chất, đồng thời duy trì độ ẩm tự nhiên của mi. Bước chuẩn bị này giúp sản phẩm thẩm thấu tốt hơn, hỗ trợ hàng mi khỏe đẹp và giữ độ cong bền lâu.',
      'lash.process.lift.title': 'Uốn cong',
      'lash.process.lift.desc': 'Công thức uốn mi chứa keratin, nhẹ nhàng định hình từng sợi mi, tạo nên độ cong mềm mại, tự nhiên mà vẫn duy trì sự mềm mại và độ ẩm cần thiết.',
      'lash.process.set.title': 'Định hình',
      'lash.process.set.desc': 'Cân bằng độ pH tự nhiên, giúp sợi mi giữ được độ mềm mại, khỏe đẹp, đồng thời duy trì đường cong bền lâu và hạn chế hư tổn',
      'lash.process.nourish.title': 'Nuôi dưỡng',
      'lash.process.nourish.desc': 'Hoàn thiện liệu trình với tinh chất dưỡng giàu peptide, giúp cấp ẩm, tăng cường độ chắc khỏe và mang lại vẻ mềm mại, bóng khỏe cho hàng mi.',
      'lash.process.hint': 'kéo xuống để khám phá',
      'lash.why.kicker': 'Điều làm nên khác biệt tại NAEIL',
      'lash.why.heading1': 'Vì sao bạn sẽ yêu thích',
      'lash.why.heading2': '',
      'lash.why.korean.title': 'Kỹ thuật uốn mi Hàn Quốc',
      'lash.why.korean.copy': 'Kỹ thuật uốn mi Hàn Quốc được tinh chỉnh để tạo nên độ cong tự nhiên, mềm mại và hài hòa với dáng mắt.',
      'lash.why.organic.title': '100% Hữu cơ',
      'lash.why.organic.copy': 'Sản phẩm Hàn Quốc với thành phần được chọn lọc kỹ lưỡng, mang lại trải nghiệm an toàn và dịu nhẹ cho hàng mi.',
      'lash.why.longlasting.title': 'Độ cong bền lâu',
      'lash.why.longlasting.copy': 'Duy trì hàng mi cong đẹp trong 6–8 tuần với routine chăm sóc phù hợp.',
      'lash.why.nodamage.title': 'Dịu nhẹ cho mi',
      'lash.why.nodamage.copy': 'Công thức dịu nhẹ giúp bảo vệ và duy trì vẻ khỏe đẹp tự nhiên của hàng mi.',
      'lash.why.lowmaintenance.title': 'Ít cần chăm sóc',
      'lash.why.lowmaintenance.copy': 'Hàng mi cong tự nhiên, luôn chỉn chu mỗi ngày.',
      'about.hero.eyebrow': 'VỀ NAEIL',
      'about.hero.line1': 'Chỉn chu một cách tự nhiên.',
      'about.hero.line2': '',
      'about.hero.desc': 'NAEIL là salon làm đẹp hiện đại, nơi những trải nghiệm được tạo nên từ sự tinh tế, chỉn chu và chăm sóc tận tâm. Mỗi chi tiết đều được chăm chút dành cho những ai tìm kiếm vẻ đẹp nhẹ nhàng, tinh tế cùng sự thư thái.',
      'about.hero.cta': 'Đặt lịch dịch vụ',
      'about.philosophy.quote': 'Chúng tôi tin rằng vẻ đẹp không bao giờ nên đến từ sự vội vã.',
      'about.philosophy.copy': 'Mỗi trải nghiệm tại NAEIL là một khoảng dừng, nơi kỹ thuật tinh tế, sản phẩm được chọn lọc và sự chăm sóc chu đáo hòa quyện trong từng chi tiết.',
      'about.philosophy.vertical1': 'Chăm sóc tận tâm.',
      'about.philosophy.vertical2': 'Trong từng chi tiết.',
      'about.values.label': 'GIÁ TRỊ CỦA CHÚNG TÔI',
      'about.values.precision.title': 'Sự chỉn chu, tỉ mỉ.',
      'about.values.precision.copy': 'Mọi chi tiết đều quan trọng. Từ cách chúng tôi làm việc đến sản phẩm chúng tôi lựa chọn.',
      'about.values.comfort.title': 'Sự thư thái',
      'about.values.comfort.copy': 'Một không gian để bạn hoàn toàn thư giãn, tận hưởng và cảm thấy được nâng niu.',
      'about.values.presence.title': 'Sự trọn vẹn',
      'about.values.presence.copy': 'Nơi bạn có thể chậm lại và hoàn toàn hiện diện trong khoảnh khắc.',
      'about.ritual.label': 'THÓI QUEN KHÔNG THỂ THIẾU',
      'about.ritual.title': 'Từ khoảnh khắc đầu tiên, mọi thứ đều được chậm lại.',
      'about.ritual.walkin.title': 'Bước vào',
      'about.ritual.walkin.copy': 'Để lại những vội vã bên ngoài.',
      'about.ritual.pause.title': 'Dừng lại',
      'about.ritual.pause.copy': 'Hít thở sâu. Cho mình một khoảng lặng.',
      'about.ritual.reset.title': 'Cân bằng',
      'about.ritual.reset.copy': 'Mọi chi tiết đều được chăm chút.',
      'about.ritual.restore.title': 'Tái tạo',
      'about.ritual.restore.copy': 'Trở về trạng thái cân bằng.',
      'about.ritual.leavelighter.title': 'Thả lỏng',
      'about.ritual.leavelighter.copy': 'Giữ lại cảm giác thư thái sau mỗi lần ghé thăm.',
      'about.space.label': 'KHÔNG GIAN CỦA CHÚNG TÔI',
      'about.space.title1': 'Một không gian được tạo nên để bạn chậm lại.',
      'about.space.title2': '',
      'about.space.copy': 'Ánh sáng dịu nhẹ, chất liệu tự nhiên và từng chi tiết thiết kế được cân nhắc kỹ lưỡng — tạo nên một không gian nơi bạn có thể thả lỏng ngay từ khoảnh khắc đầu tiên.',
      'about.finalcta.title1': 'Bước ra nhẹ nhàng hơn.',
      'about.finalcta.title2': 'Giữ lại cảm giác bình yên.',
      'about.finalcta.copy': 'Mỗi lần ghé thăm đều được chăm chút như lần đầu tiên.',
      'about.finalcta.btn': 'Đặt lịch dịch vụ',
      'visit.hero.title': 'Ghé thăm chúng tôi',
      'visit.hero.desc': 'Hẹn gặp bạn tại NAEIL.',
      'visit.hero.cta': 'Đặt lịch dịch vụ',
      'visit.info.location': 'Địa chỉ',
      'visit.info.address1': 'Số 52 Nguyễn Thái Học, Ba Đình, Hà Nội, Việt Nam',
      'visit.info.address2': '',
      'visit.info.directions': 'Chỉ đường',
      'visit.info.hours': 'Giờ mở cửa',
      'visit.info.monfri': 'Thứ Hai – Thứ Sáu',
      'visit.info.satsun': 'Thứ Bảy – Chủ Nhật',
      'visit.info.publicholiday': 'Ngày lễ',
      'visit.info.note': 'Hoạt động mỗi ngày. Luôn sẵn sàng đón bạn.',
      'visit.find.title1': 'Một khoảng yên giữa lòng thành phố Hà Nội',
      'visit.find.title2': '',
      'visit.find.copy': 'Tọa lạc trên con phố rợp bóng cây gần Văn Miếu, NAEIL cách khu Phố Cổ một quãng đi bộ ngắn và dễ dàng.',
      'visit.find.parking': 'Có chỗ đỗ xe trên đường và bãi đỗ xe gần kề, thuận tiện cho khách ghé thăm.',
      'visit.finalcta.title': 'NAEIL mong sớm được đón bạn',
      'visit.finalcta.copy': 'Đến lúc dành một chút thời gian cho mình.',
      'visit.finalcta.btn': 'Đặt lịch dịch vụ',
    },

    zh: {
      'nav.home': '首页', 'nav.nail': '美甲', 'nav.hair': '头发', 'nav.lash': '睫毛',
      'nav.about': '关于我们', 'nav.visit': '到店信息', 'nav.book': '立即预约',
      'lang.label': '语言', 'lang.en': 'English', 'lang.vi': 'Tiếng Việt', 'lang.zh': '中文',
      'megamenu.services': '服务项目', 'megamenu.explore': '探索更多',
      'megamenu.nail.title': '美甲', 'megamenu.nail.desc': '精致凝胶与甲油工艺',
      'megamenu.hair.title': '头皮护理', 'megamenu.hair.desc': '修复型头皮护理仪式',
      'megamenu.lash.title': '睫毛', 'megamenu.lash.desc': '韩式睫毛烫染',
      'megamenu.about.title': '关于我们', 'megamenu.about.desc': '我们的理念与仪式',
      'megamenu.visit.title': '到店信息', 'megamenu.visit.desc': '地址与营业时间',
      'megamenu.book': '立即预约',
      'booking.eyebrow': '联系我们', 'booking.title': '预约您的服务',
      'booking.sub': '请选择您方便的联系方式。',
      'booking.whatsapp': 'WhatsApp', 'booking.zalo': 'Zalo', 'booking.phone': '电话',
      'booking.instagram': 'Instagram', 'booking.facebook': 'Facebook',
      'footer.brand': 'naeil nail bar',
      'footer.services': '服务项目', 'footer.nail': '美甲', 'footer.lash': '睫毛',
      'footer.headspa': '头皮护理', 'footer.rituals': '护理仪式', 'footer.giftcards': '礼品卡',
      'footer.about': '关于我们', 'footer.aboutlink': '到店信息', 'footer.aboutlink2': '关于我们', 'footer.careers': '招聘信息',
      'footer.getintouch': '联系我们', 'footer.visit': '到店信息',
      'footer.address': '河内市巴亭郡阮太学街52号',
      'footer.phone': '+84 888 104 166', 'footer.hours': '每日营业 上午10点至晚上8点',
      'footer.copyright': '© 2026 NAEIL. 保留所有权利。',
      'home.hero.title': '重新定义 自我关爱',
      'home.hero.sub': '毫不费力的美丽，遇见用心的呵护。',
      'home.hero.cta': '预约您的护理仪式', 'home.hero.scroll': '向下滑动探索',
      'home.services.eyebrow': '我们的服务',
      'home.services.nail.title': '美甲',
      'home.services.nail.copy': '精工美甲艺术，只选用顶级凝胶与甲油系统。从柔和极简色调到定制美甲设计，一应俱全。',
      'home.services.nail.link': '探索美甲服务',
      'home.services.lash.title': '睫毛烫',
      'home.services.lash.copy': '以柔和卷翘、丰盈层次与清晰轮廓提升您的天然睫毛，打造持久精神、精致动人的双眼，效果远超日常打理。',
      'home.services.lash.link': '探索睫毛烫服务',
      'home.services.spa.title': '头皮护理',
      'home.services.spa.copy': '用心设计，滋养头皮、舒缓身体紧张，并通过专业手法与个性化护理带来深度放松。',
      'home.services.spa.link': '探索头皮护理服务',
      'home.philosophy.eyebrow': '我们的理念',
      'home.philosophy.title1': '精致之美', 'home.philosophy.title2': '用心', 'home.philosophy.title3': '呵护',
      'home.philosophy.copy': '在Naeil，我们相信美丽不仅仅是外表——更是你善待自己的方式。使用无毒产品，坚持最高卫生标准，并营造一个真正让人慢下来的空间，每一个细节都是为了让您感觉自己处于最佳状态。',
      'home.philosophy.btn': '了解Naeil',
      'nail.hero.title': 'Naeil 美甲',
      'nail.hero.sub': '精致之美，从不将就。',
      'nail.hero.desc1': '只选用优质无毒产品，我们打造精致持久的效果，',
      'nail.hero.desc2': '同时呵护您指甲的健康。',
      'nail.hero.cta': '立即预约',
      'nail.services.eyebrow': '指甲上的选择',
      'nail.services.sub': '从BIAB建构胶系统到凝胶色彩与护理产品，我们所用的每一种配方都以更安全的成分、卓越的效果与更健康的天然指甲为选择标准。',
      'nail.services.gelbottle.title': 'The Gel Bottle',
      'nail.services.gelbottle.copy': '专业BIAB建构胶系统，无毒配方，专为强化与保护天然指甲而设计。',
      'nail.services.mayour.title': 'Mayour',
      'nail.services.mayour.copy': '韩国高级凝胶色彩，色素精致、配方更纯净，持久佩戴亦健康无负担。',
      'nail.services.favori.title': 'Favori',
      'nail.services.favori.copy': '专业韩国设计产品，专为精致细腻的效果精选。',
      'nail.standard.eyebrow': 'Naeil 标准',
      'nail.standard.title': '美丽指甲，从不将就。',
      'nail.standard.copy': '我们选择的每一款产品、信赖的每一种配方、践行的每一项技法，都是为了在呵护您天然指甲健康的同时，带来美丽持久的效果。',
      'nail.standard.btn': '立即预约',
      'spa.hero.title': '头皮护理',
      'spa.hero.sub': '头皮护理，秀发滋养。',
      'spa.hero.desc': '一场修复身心的头皮护理仪式，为您清洁、滋养并重新平衡头皮。舒缓紧张、改善血液循环，从发根开始恢复健康有光泽的秀发。',
      'spa.hero.cta': '立即预约服务',
      'spa.services.eyebrow': '我们的头皮护理服务',
      'spa.services.sub': '为不同需求量身打造的护理仪式——从基础清洁到深层头皮秀发护理。',
      'spa.services.essential.title': '基础护理 - 45分钟',
      'spa.services.essential.subdesc': '快速洗发 · 基础清洁',
      'spa.services.essential.copy': '简约却不失精致的日常头皮清洁护理。包含温和洗发、放松头皮按摩以及专业吹风造型。',
      'spa.services.essential.price': '起价 250,000 越南盾',
      'spa.services.restore.title': '修复护理 - 75分钟',
      'spa.services.restore.subdesc': '洗发 · 颈肩按摩',
      'spa.services.restore.copy': '舒缓身心的头皮护理体验，结合洗发与头皮、颈肩按摩。专注放松身心，为忙碌一天后带来舒适惬意的感受。',
      'spa.services.restore.price': '起价 375,000 越南盾',
      'spa.services.scalpreset.title': '头皮重启护理 - 90分钟',
      'spa.services.scalpreset.subdesc': '头皮清洁',
      'spa.services.scalpreset.copy': '专为油性、敏感或阻塞型头皮打造的个性化护理。在头皮检测之后，此护理仪式包含深层清洁、头皮去角质、强效净化及定制护理，帮助长期恢复头皮健康。',
      'spa.services.scalpreset.price': '起价 690,000 越南盾',
      'spa.services.hairreplenish.title': '秀发滋养护理 - 90分钟',
      'spa.services.hairreplenish.subdesc': '头发修护滋养',
      'spa.services.hairreplenish.copy': '高强度秀发护理，专为修复、强韧及深层滋养干燥或经化学处理受损的秀发而设计。根据您的发质个性化定制，这一护理仪式能恢复柔顺、光泽、弹性与持久水润。',
      'spa.services.hairreplenish.price': '起价 790,000 越南盾',
      'spa.services.note': '所有护理项目均包含头皮检测与个性化咨询。',
      'spa.expect.label': '奈耳专属护理体验',
      'spa.expect.title': '从头皮到秀发的贴心护理',
      'spa.expect.intro': '用心设计、为你量身打造的头皮护理之旅 —— 每个步骤皆有深意，每个细节都不将就。',
      'spa.expect.analyse.title': '咨询', 'spa.expect.analyse.copy': '了解您的头皮、发质与护理需求。',
      'spa.expect.cleanse.title': '清洁净化', 'spa.expect.cleanse.copy': '温和却高效的清洁，净化并重新平衡头皮。',
      'spa.expect.treat.title': '舒缓放松', 'spa.expect.treat.copy': '头皮按摩结合颈肩按摩，搭配合适的护理疗程。',
      'spa.expect.nourish.title': '护理', 'spa.expect.nourish.copy': '根据头皮与发质状况，提供针对性护理。',
      'spa.expect.styling.title': '完美呈现', 'spa.expect.styling.copy': '丝滑亮泽、沙龙级的秀发造型，看得见更感受得到。',
      'lash.hero.title': '韩式睫毛烫',
      'lash.hero.sub': '柔和卷翘，精致效果。',
      'lash.hero.desc': '为您量身定制的睫毛护理，以柔和卷翘与细腻轮廓提升天然睫毛，根据您独特的眼型专属打造。',
      'lash.hero.cta': '立即预约',
      'lash.intro.eyebrow': '自然而不失亮眼',
      'lash.intro.sub': '温柔卷翘，提升您的天然美——更柔和、更明亮，依然是独特的你。',
      'lash.slider.before': '护理前', 'lash.slider.after': '护理后',
      'lash.process.label': '护理流程',
      'lash.process.title': '从天然睫毛到持久卷翘。',
      'lash.process.intro': '温和的四步护理仪式，从内而外提升、雕塑并呵护您的睫毛。',
      'lash.process.step.cleanse': '清洁', 'lash.process.step.lift': '卷翘',
      'lash.process.step.set': '定型', 'lash.process.step.nourish': '滋养',
      'lash.process.cleanse.title': '清洁',
      'lash.process.cleanse.desc': '温和去除多余油脂与杂质，同时保留天然水分，为更好的产品吸收、更健康的睫毛与更持久的卷翘效果打下理想基础。',
      'lash.process.lift.title': '卷翘',
      'lash.process.lift.desc': '以角蛋白为基础的卷翘系统，温柔地将每一根睫毛塑造成顺滑而富有韧性的卷度，同时保持柔韧度、水润感与持久的轮廓感。',
      'lash.process.set.title': '定型',
      'lash.process.set.desc': '重新平衡天然酸碱值并封闭毛鳞片，锁住卷度、防止损伤，让每一根睫毛都顺滑健康、轮廓分明。',
      'lash.process.nourish.title': '滋养',
      'lash.process.nourish.desc': '以富含肽的精华安瓶为护理收尾，深层滋润、强韧睫毛并提升光泽，让睫毛在护理后长久保持健康丰盈的状态。',
      'lash.process.hint': '滑动查看各步骤',
      'lash.why.kicker': 'Naeil 的独特之处', 'lash.why.heading1': '我们为何', 'lash.why.heading2': '钟爱它',
      'lash.why.korean.title': '韩式技法', 'lash.why.korean.copy': '先进的韩式睫毛烫技法，打造美丽自然的效果。',
      'lash.why.organic.title': '100%有机', 'lash.why.organic.copy': '所有产品均为韩国原产有机产品，安全温和，呵护您的睫毛。',
      'lash.why.longlasting.title': '持久不掉', 'lash.why.longlasting.copy': '妥善保养可维持6-8周。',
      'lash.why.nodamage.title': '零损伤', 'lash.why.nodamage.copy': '温和配方，保持睫毛健康强韧。',
      'lash.why.lowmaintenance.title': '免打理', 'lash.why.lowmaintenance.copy': '自然卷翘睫毛，每日轻松拥有。',
      'about.hero.eyebrow': '关于 NAEIL',
      'about.hero.line1': '更少费力。', 'about.hero.line2': '更多当下。',
      'about.hero.desc': 'NAEIL 是一家现代美容工作室，致力于提供卓越的美丽体验。为那些珍视精致、舒适与宁静的人，精心打造每一场护理仪式。',
      'about.hero.cta': '立即预约',
      'about.philosophy.quote': '我们相信，美丽从不该被匆忙对待。',
      'about.philosophy.copy': 'NAEIL 的每一场护理仪式，都通过用心的技法、纯净的产品与专注的呵护，为您创造一段静谧的时光。',
      'about.philosophy.vertical1': '用心呵护。', 'about.philosophy.vertical2': '尽在每个细节。',
      'about.values.label': '我们的价值观',
      'about.values.precision.title': '精致', 'about.values.precision.copy': '每个细节都至关重要。从我们的工作方式到所选用的每一款产品，皆是如此。',
      'about.values.comfort.title': '舒适', 'about.values.comfort.copy': '为彻底的轻松与放松而设计，是一场奢华的心灵小憩。',
      'about.values.presence.title': '当下', 'about.values.presence.copy': '一场让您慢下来、全然活在当下的护理仪式。',
      'about.ritual.label': '我们的仪式',
      'about.ritual.title': '宁静的节奏，从抵达到放松。',
      'about.ritual.walkin.title': '步入', 'about.ritual.walkin.copy': '将外界的喧嚣留在门外。',
      'about.ritual.pause.title': '暂停', 'about.ritual.pause.copy': '深呼吸，静心安坐。',
      'about.ritual.reset.title': '重启', 'about.ritual.reset.copy': '我们悉心照料每一个细节。',
      'about.ritual.restore.title': '修复', 'about.ritual.restore.copy': '由内而外，感受轻盈。',
      'about.ritual.leavelighter.title': '轻盈离开', 'about.ritual.leavelighter.copy': '把这份宁静一同带走。',
      'about.space.label': '我们的空间',
      'about.space.title1': '一个让您慢下来', 'about.space.title2': '的空间。',
      'about.space.copy': '柔和的光线、天然的质感与用心的设计——从您踏入的那一刻起，便让您感到自在安心。',
      'about.finalcta.title1': '轻盈离开，', 'about.finalcta.title2': '把宁静带走。',
      'about.finalcta.copy': '无论是您的第一次到访，还是第五十次，我们都在这里等候您。',
      'about.finalcta.btn': '立即预约',
      'visit.hero.title': '欢迎光临',
      'visit.hero.desc': '我们诚挚欢迎您光临 NAEIL Nail Bar。',
      'visit.hero.cta': '立即预约',
      'visit.info.location': '地址',
      'visit.info.address1': '越南河内市巴亭郡', 'visit.info.address2': '阮太学街52号',
      'visit.info.directions': '获取路线',
      'visit.info.hours': '营业时间',
      'visit.info.monfri': '周一至周五', 'visit.info.satsun': '周六至周日', 'visit.info.publicholiday': '公共假日',
      'visit.info.note': '每日营业，欢迎随时到店。',
      'visit.find.title1': '闹市之中的', 'visit.find.title2': '宁静空间。',
      'visit.find.copy': '工作室坐落于文庙附近一条绿树成荫的街道，从老城区悠然步行即可轻松抵达。',
      'visit.find.parking': '提供路边停车位，附近亦有停车场，步行即可抵达。',
      'visit.finalcta.title': '我们迫不及待想欢迎您的到来。',
      'visit.finalcta.copy': '属于您的呵护时光，即将开始。',
      'visit.finalcta.btn': '立即预约'
    }
  };

  // -------------------------------------------------------------------
  // Core: read/apply/persist locale
  // -------------------------------------------------------------------
  function getStoredLocale() {
    try {
      var v = window.localStorage.getItem(STORAGE_KEY);
      if (v && LOCALES.indexOf(v) !== -1) return v;
    } catch (err) { /* localStorage unavailable (privacy mode etc.) */ }
    return DEFAULT_LOCALE;
  }

  function storeLocale(locale) {
    try { window.localStorage.setItem(STORAGE_KEY, locale); } catch (err) { /* no-op */ }
  }

  function applyLocale(locale) {
    if (LOCALES.indexOf(locale) === -1) locale = DEFAULT_LOCALE;
    var dict = T[locale] || T[DEFAULT_LOCALE];

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var text = dict[key] != null ? dict[key] : T[DEFAULT_LOCALE][key];
      if (text != null) el.textContent = text;
    });

    // Some two-line headings (hero titles, etc.) pair a manual <br> with
    // a second data-i18n span. Not every language needs that second
    // line — e.g. a Vietnamese rewrite may read better as one line — so
    // any <br data-i18n-br="key"> hides itself whenever the paired
    // key's translation for the active locale is empty, and reappears
    // once that key has real text again.
    document.querySelectorAll('[data-i18n-br]').forEach(function (br) {
      var key = br.getAttribute('data-i18n-br');
      var text = dict[key];
      br.style.display = text ? '' : 'none';
    });

    document.querySelectorAll('.lang-switcher-label').forEach(function (el) {
      el.textContent = LOCALE_LABEL[locale];
    });

    document.querySelectorAll('[data-lang-option]').forEach(function (el) {
      var isActive = el.getAttribute('data-lang-option') === locale;
      el.classList.toggle('is-selected', isActive);
      el.setAttribute('aria-checked', isActive ? 'true' : 'false');
    });

    document.documentElement.setAttribute('lang', locale);
    document.documentElement.setAttribute('data-locale', locale);
    storeLocale(locale);

    // Let page-specific scripts (e.g. the Lash process panel's dynamic
    // step swap) know the language changed, so they can re-render any
    // content they manage outside the data-i18n system.
    document.dispatchEvent(new CustomEvent('naeil:localechange', { detail: { locale: locale, dict: dict } }));
  }

  // -------------------------------------------------------------------
  // Dropdown UI — desktop popover + mobile inline rows share the same
  // [data-lang-option] click handling; only the desktop version has an
  // open/close popover to manage.
  // -------------------------------------------------------------------
  function initDesktopSwitcher() {
    var switcher = document.querySelector('.lang-switcher');
    if (!switcher) return;
    var trigger = switcher.querySelector('.lang-switcher-trigger');
    var dropdown = switcher.querySelector('.lang-dropdown');
    if (!trigger || !dropdown) return;

    function close() {
      switcher.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
    function open() {
      switcher.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (switcher.classList.contains('is-open')) close(); else open();
    });
    document.addEventListener('click', function (e) {
      if (!switcher.contains(e.target)) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && switcher.classList.contains('is-open')) close();
    });
    dropdown.querySelectorAll('[data-lang-option]').forEach(function (opt) {
      opt.addEventListener('click', function () {
        applyLocale(opt.getAttribute('data-lang-option'));
        close();
      });
    });
  }

  function initMobileSwitcher() {
    document.querySelectorAll('.mega-menu-lang [data-lang-option]').forEach(function (opt) {
      opt.addEventListener('click', function () {
        applyLocale(opt.getAttribute('data-lang-option'));
      });
    });
  }

  // Mobile HEADER switcher — the small "VI ˅" trigger that sits in the
  // top bar itself (left of the hamburger), separate from the mega-menu
  // drawer's own Language group above. Same open/close popover pattern
  // as initDesktopSwitcher, kept as its own function (rather than
  // generalizing both into one) so the existing desktop switcher stays
  // completely untouched.
  function initMobileHeaderSwitcher() {
    var switcher = document.querySelector('.mobile-lang-switcher');
    if (!switcher) return;
    var trigger = switcher.querySelector('.mobile-lang-trigger');
    var dropdown = switcher.querySelector('.mobile-lang-dropdown');
    if (!trigger || !dropdown) return;

    function close() {
      switcher.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
    function open() {
      switcher.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (switcher.classList.contains('is-open')) close(); else open();
    });
    document.addEventListener('click', function (e) {
      if (!switcher.contains(e.target)) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && switcher.classList.contains('is-open')) close();
    });
    dropdown.querySelectorAll('[data-lang-option]').forEach(function (opt) {
      opt.addEventListener('click', function () {
        applyLocale(opt.getAttribute('data-lang-option'));
        close();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initDesktopSwitcher();
    initMobileSwitcher();
    initMobileHeaderSwitcher();
    applyLocale(getStoredLocale());
  });

  // Expose for other inline scripts on the page (e.g. Lash's process
  // panel swap) that need to read the current dictionary/locale.
  window.NAEIL_I18N = {
    translations: T,
    locales: LOCALES,
    getLocale: getStoredLocale,
    applyLocale: applyLocale
  };
})();
