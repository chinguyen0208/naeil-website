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
  var LOCALE_LABEL = { en: 'EN', vi: 'VI', zh: 'ZH' };

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
      'spa.hero.sub': 'Deeply relaxed, completely at ease.',
      'spa.hero.desc': 'A restorative head spa ritual designed to cleanse, nourish and rebalance your scalp. Relieve tension, improve circulation and restore healthy, radiant hair from the roots.',
      'spa.hero.cta': 'Book your service',
      'spa.services.eyebrow': 'Our Headspa Services',
      'spa.services.sub': 'Carefully crafted rituals to cleanse, restore and elevate.',
      'spa.services.essential.title': 'Essential - 45 MIN',
      'spa.services.essential.copy': 'A simple yet elevated cleansing ritual for everyday scalp care. Includes a gentle shampoo, relaxing scalp massage, neck and shoulder massage, and a professional blow-dry.',
      'spa.services.essential.price': 'from 250,000 VND',
      'spa.services.restore.title': 'Restore - 75 MIN',
      'spa.services.restore.copy': 'A deeply calming head spa experience designed to release stress and restore balance. Includes double cleansing, warm steam therapy, an extended scalp massage, neck and shoulder massage, nourishing care, and blow-dry.',
      'spa.services.restore.price': 'from 375,000',
      'spa.services.scalpreset.title': 'Scalp Reset - 90 MIN',
      'spa.services.scalpreset.copy': 'A personalised scalp treatment for oily, sensitive or congested scalps. Following a scalp analysis, this ritual includes deep cleansing, scalp exfoliation, intensive purification and customised treatment to restore long-term scalp health.',
      'spa.services.scalpreset.price': 'from 690,000',
      'spa.services.hairreplenish.title': 'Hair Replenish - 90 MIN',
      'spa.services.hairreplenish.copy': 'An intensive hair treatment designed to repair, strengthen, and deeply nourish dry or chemically damaged hair. Personalised to your hair condition, this ritual restores softness, shine, elasticity, and long-lasting moisture.',
      'spa.services.hairreplenish.price': 'from 790,000',
      'spa.services.note': 'All rituals include scalp analysis and a personalized consultation.',
      'spa.expect.label': 'What to expect',
      'spa.expect.title': 'A journey of care from scalp to soul',
      'spa.expect.analyse.title': 'Analyse', 'spa.expect.analyse.copy': 'Scalp diagnosis to understand your unique needs..',
      'spa.expect.cleanse.title': 'Cleanse', 'spa.expect.cleanse.copy': 'Gentle yet effective cleansing to purify and rebalance.',
      'spa.expect.treat.title': 'Treat', 'spa.expect.treat.copy': 'Therapeutic massage and treatment to soothe and restore..',
      'spa.expect.nourish.title': 'Nourish', 'spa.expect.nourish.copy': 'Nourishing care to strengthen and revive hair.',
      'spa.expect.styling.title': 'Styling', 'spa.expect.styling.copy': 'Silky, salon-finished hair that feels as good as it looks.',
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
      'nav.home': 'Trang chủ', 'nav.nail': 'Làm nail', 'nav.hair': 'Tóc', 'nav.lash': 'Mi',
      'nav.about': 'Giới thiệu', 'nav.visit': 'Ghé thăm', 'nav.book': 'Đặt lịch hẹn',
      'lang.label': 'Ngôn ngữ', 'lang.en': 'English', 'lang.vi': 'Tiếng Việt', 'lang.zh': '中文',
      'megamenu.services': 'Dịch vụ', 'megamenu.explore': 'Khám phá',
      'megamenu.nail.title': 'Làm nail', 'megamenu.nail.desc': 'Nghệ thuật sơn gel & sơn móng tinh xảo',
      'megamenu.hair.title': 'Gội đầu dưỡng sinh', 'megamenu.hair.desc': 'Liệu trình gội đầu dưỡng sinh phục hồi',
      'megamenu.lash.title': 'Mi', 'megamenu.lash.desc': 'Uốn & nhuộm mi kiểu Hàn Quốc',
      'megamenu.about.title': 'Giới thiệu', 'megamenu.about.desc': 'Triết lý & nghi thức chăm sóc của chúng tôi',
      'megamenu.visit.title': 'Ghé thăm', 'megamenu.visit.desc': 'Địa chỉ & giờ mở cửa',
      'megamenu.book': 'Đặt lịch hẹn',
      'booking.eyebrow': 'Liên hệ với chúng tôi', 'booking.title': 'Đặt lịch hẹn của bạn',
      'booking.sub': 'Chọn cách bạn muốn liên hệ với chúng tôi.',
      'booking.whatsapp': 'WhatsApp', 'booking.zalo': 'Zalo', 'booking.phone': 'Điện thoại',
      'booking.instagram': 'Instagram', 'booking.facebook': 'Facebook',
      'footer.brand': 'naeil nail bar',
      'footer.services': 'Dịch vụ', 'footer.nail': 'Làm nail', 'footer.lash': 'Mi',
      'footer.headspa': 'Gội đầu dưỡng sinh', 'footer.rituals': 'Liệu trình', 'footer.giftcards': 'Thẻ quà tặng',
      'footer.about': 'Giới thiệu', 'footer.aboutlink': 'Ghé thăm', 'footer.aboutlink2': 'Về chúng tôi', 'footer.careers': 'Tuyển dụng',
      'footer.getintouch': 'Liên hệ', 'footer.visit': 'Ghé thăm',
      'footer.address': 'Số 52 Nguyễn Thái Học, Ba Đình, Hà Nội',
      'footer.phone': '+84 888 104 166', 'footer.hours': 'Mở cửa hàng ngày, 10:00 – 20:00',
      'footer.copyright': '© 2026 NAEIL. Bảo lưu mọi quyền.',
      'home.hero.title': 'Chăm sóc bản thân, được định nghĩa lại',
      'home.hero.sub': 'Nơi vẻ đẹp tự nhiên gặp gỡ sự chăm sóc tận tâm.',
      'home.hero.cta': 'Đặt lịch trải nghiệm của bạn', 'home.hero.scroll': 'cuộn xuống để khám phá',
      'home.services.eyebrow': 'Dịch vụ của chúng tôi',
      'home.services.nail.title': 'Làm nail',
      'home.services.nail.copy': 'Nghệ thuật làm nail tinh tế, chỉ sử dụng hệ thống sơn gel và sơn móng cao cấp nhất. Từ tông màu tối giản nhẹ nhàng đến nail art thiết kế riêng.',
      'home.services.nail.link': 'khám phá dịch vụ nail',
      'home.services.lash.title': 'Uốn mi',
      'home.services.lash.copy': 'Được thiết kế để tôn lên hàng mi tự nhiên với độ cong mềm mại, chiều sâu và đường nét rõ ràng, liệu trình này mang lại vẻ ngoài rạng rỡ, tinh tế và bền lâu hơn cả thói quen chăm sóc hằng ngày.',
      'home.services.lash.link': 'khám phá dịch vụ uốn mi',
      'home.services.spa.title': 'Gội đầu dưỡng sinh',
      'home.services.spa.copy': 'Được thiết kế tỉ mỉ để nuôi dưỡng da đầu, giải tỏa căng thẳng cơ thể và mang lại sự thư giãn sâu qua bàn tay chuyên nghiệp cùng chăm sóc cá nhân hóa.',
      'home.services.spa.link': 'khám phá dịch vụ gội đầu dưỡng sinh',
      'home.philosophy.eyebrow': 'Triết lý của chúng tôi',
      'home.philosophy.title1': 'Vẻ đẹp tinh tế', 'home.philosophy.title2': 'Sự chăm sóc', 'home.philosophy.title3': 'có ý thức',
      'home.philosophy.copy': 'Tại Naeil, chúng tôi tin rằng vẻ đẹp không chỉ là ngoại hình — mà là cách bạn chăm sóc chính mình. Sử dụng sản phẩm không độc hại, duy trì tiêu chuẩn vệ sinh cao nhất, và tạo ra một không gian để bạn thực sự chậm lại, từng chi tiết đều được thiết kế để giúp bạn cảm thấy trọn vẹn nhất.',
      'home.philosophy.btn': 'Về Naeil',
      'nail.hero.title': "Naeil's Nail",
      'nail.hero.sub': 'Vẻ đẹp tinh tế, không thỏa hiệp.',
      'nail.hero.desc1': 'Chỉ sử dụng sản phẩm cao cấp không độc hại, chúng tôi tạo nên kết quả hoàn hảo,',
      'nail.hero.desc2': 'bền lâu trong khi vẫn chăm sóc sức khỏe móng tay của bạn.',
      'nail.hero.cta': 'Đặt lịch hẹn của bạn',
      'nail.services.eyebrow': 'Những gì trên móng tay của bạn',
      'nail.services.sub': 'Từ hệ thống BIAB đến các màu gel và liệu pháp chăm sóc, mọi công thức chúng tôi sử dụng đều được chọn lọc vì thành phần an toàn hơn, hiệu quả vượt trội và móng tay tự nhiên khỏe mạnh hơn.',
      'nail.services.gelbottle.title': 'The Gel Bottle',
      'nail.services.gelbottle.copy': 'Hệ thống BIAB chuyên nghiệp với công thức không độc hại, được thiết kế để làm chắc khỏe và bảo vệ móng tay tự nhiên.',
      'nail.services.mayour.title': 'Mayour',
      'nail.services.mayour.copy': 'Màu gel cao cấp từ Hàn Quốc với sắc tố tinh tế và công thức thuần khiết hơn, bền màu và tốt cho sức khỏe móng.',
      'nail.services.favori.title': 'Favori',
      'nail.services.favori.copy': 'Sản phẩm thiết kế chuyên nghiệp từ Hàn Quốc, được chọn lọc cho hiệu ứng hoàn thiện tinh xảo.',
      'nail.standard.eyebrow': 'Tiêu chuẩn Naeil',
      'nail.standard.title': 'Móng tay đẹp, không thỏa hiệp.',
      'nail.standard.copy': 'Mỗi sản phẩm chúng tôi chọn, mỗi công thức chúng tôi tin dùng và mỗi kỹ thuật chúng tôi thực hiện đều được lựa chọn để mang lại kết quả đẹp, bền lâu trong khi vẫn bảo vệ sức khỏe móng tay tự nhiên của bạn.',
      'nail.standard.btn': 'Đặt lịch hẹn của bạn',
      'spa.hero.title': 'Gội đầu dưỡng sinh',
      'spa.hero.sub': 'Thư giãn sâu, hoàn toàn thoải mái.',
      'spa.hero.desc': 'Một liệu trình gội đầu dưỡng sinh phục hồi được thiết kế để làm sạch, nuôi dưỡng và cân bằng lại da đầu. Giải tỏa căng thẳng, cải thiện tuần hoàn và phục hồi mái tóc khỏe mạnh, rạng rỡ từ chân tóc.',
      'spa.hero.cta': 'Đặt lịch dịch vụ của bạn',
      'spa.services.eyebrow': 'Dịch vụ gội đầu dưỡng sinh của chúng tôi',
      'spa.services.sub': 'Những liệu trình được chăm chút tỉ mỉ để làm sạch, phục hồi và nâng tầm trải nghiệm.',
      'spa.services.essential.title': 'Cơ bản - 45 PHÚT',
      'spa.services.essential.copy': 'Một liệu trình làm sạch đơn giản nhưng tinh tế cho việc chăm sóc da đầu hằng ngày. Bao gồm gội đầu nhẹ nhàng, massage da đầu thư giãn, massage vai gáy và sấy tạo kiểu chuyên nghiệp.',
      'spa.services.essential.price': 'từ 250.000 VNĐ',
      'spa.services.restore.title': 'Phục hồi - 75 PHÚT',
      'spa.services.restore.copy': 'Trải nghiệm gội đầu dưỡng sinh sâu lắng được thiết kế để giải tỏa căng thẳng và khôi phục cân bằng. Bao gồm làm sạch hai lần, xông hơi ấm, massage da đầu kéo dài, massage vai gáy, chăm sóc dưỡng chất và sấy tạo kiểu.',
      'spa.services.restore.price': 'từ 375.000',
      'spa.services.scalpreset.title': 'Tái tạo da đầu - 90 PHÚT',
      'spa.services.scalpreset.copy': 'Liệu trình chăm sóc da đầu cá nhân hóa dành cho da đầu dầu, nhạy cảm hoặc bí tắc. Sau khi phân tích da đầu, liệu trình này bao gồm làm sạch sâu, tẩy tế bào chết da đầu, thanh lọc chuyên sâu và chăm sóc tùy chỉnh để phục hồi sức khỏe da đầu lâu dài.',
      'spa.services.scalpreset.price': 'từ 690.000',
      'spa.services.hairreplenish.title': 'Phục hồi tóc - 90 PHÚT',
      'spa.services.hairreplenish.copy': 'Liệu trình chăm sóc tóc chuyên sâu được thiết kế để phục hồi, làm chắc khỏe và nuôi dưỡng sâu mái tóc khô hoặc hư tổn do hóa chất. Được cá nhân hóa theo tình trạng tóc của bạn, liệu trình này khôi phục độ mềm mượt, bóng khỏe, đàn hồi và độ ẩm bền lâu.',
      'spa.services.hairreplenish.price': 'từ 790.000',
      'spa.services.note': 'Tất cả các liệu trình đều bao gồm phân tích da đầu và tư vấn cá nhân hóa.',
      'spa.expect.label': 'Những gì bạn sẽ trải nghiệm',
      'spa.expect.title': 'Hành trình chăm sóc từ da đầu đến tâm hồn',
      'spa.expect.analyse.title': 'Phân tích', 'spa.expect.analyse.copy': 'Chẩn đoán da đầu để hiểu nhu cầu riêng của bạn.',
      'spa.expect.cleanse.title': 'Làm sạch', 'spa.expect.cleanse.copy': 'Làm sạch nhẹ nhàng nhưng hiệu quả để thanh lọc và cân bằng lại.',
      'spa.expect.treat.title': 'Chăm sóc', 'spa.expect.treat.copy': 'Massage trị liệu và chăm sóc để xoa dịu và phục hồi.',
      'spa.expect.nourish.title': 'Nuôi dưỡng', 'spa.expect.nourish.copy': 'Chăm sóc dưỡng chất để làm chắc khỏe và hồi sinh mái tóc.',
      'spa.expect.styling.title': 'Tạo kiểu', 'spa.expect.styling.copy': 'Mái tóc mượt mà, hoàn thiện chuẩn salon, đẹp cả về cảm giác lẫn thị giác.',
      'lash.hero.title': 'Uốn mi kiểu Hàn Quốc',
      'lash.hero.sub': 'Cong nhẹ nhàng, kết quả tinh tế.',
      'lash.hero.desc': 'Liệu trình chăm sóc mi được thiết kế riêng để tôn lên hàng mi tự nhiên với độ cong mềm mại và đường nét tinh tế, phù hợp với hình dáng mắt riêng của bạn.',
      'lash.hero.cta': 'Đặt lịch hẹn của bạn',
      'lash.intro.eyebrow': 'Tự nhiên nhưng vẫn nổi bật',
      'lash.intro.sub': 'Một liệu trình uốn nhẹ nhàng tôn lên vẻ đẹp tự nhiên của bạn — mềm mại hơn, rạng rỡ hơn, vẫn là chính bạn.',
      'lash.slider.before': 'Trước', 'lash.slider.after': 'Sau',
      'lash.process.label': 'QUY TRÌNH',
      'lash.process.title': 'Từ hàng mi tự nhiên đến độ cong bền lâu.',
      'lash.process.intro': 'Một liệu trình bốn bước nhẹ nhàng được thiết kế để uốn cong, định hình và chăm sóc hàng mi của bạn — từ sâu bên trong.',
      'lash.process.step.cleanse': 'Làm sạch', 'lash.process.step.lift': 'Uốn cong',
      'lash.process.step.set': 'Định hình', 'lash.process.step.nourish': 'Nuôi dưỡng',
      'lash.process.cleanse.title': 'Làm sạch',
      'lash.process.cleanse.desc': 'Nhẹ nhàng loại bỏ dầu thừa và tạp chất trong khi vẫn giữ lại độ ẩm tự nhiên, tạo nền tảng lý tưởng để sản phẩm thẩm thấu tốt hơn, mi khỏe hơn và kết quả cong bền lâu hơn.',
      'lash.process.lift.title': 'Uốn cong',
      'lash.process.lift.desc': 'Hệ thống uốn dựa trên keratin, nhẹ nhàng định hình lại từng sợi mi thành đường cong mượt mà, có độ đàn hồi, đồng thời duy trì sự mềm dẻo, độ ẩm và đường nét bền lâu.',
      'lash.process.set.title': 'Định hình',
      'lash.process.set.desc': 'Cân bằng lại độ pH tự nhiên và khóa lớp biểu bì để giữ nếp cong, bảo vệ khỏi hư tổn và giúp từng sợi mi trông mượt mà, khỏe mạnh và rõ nét.',
      'lash.process.nourish.title': 'Nuôi dưỡng',
      'lash.process.nourish.desc': 'Hoàn thiện liệu trình với ống tinh chất giàu peptide, cấp ẩm sâu, làm chắc khỏe và tăng độ bóng, giúp duy trì hàng mi khỏe mạnh, dày đặn lâu dài sau buổi hẹn.',
      'lash.process.hint': 'Vuốt để khám phá từng bước',
      'lash.why.kicker': 'Sự khác biệt của Naeil', 'lash.why.heading1': 'Vì sao chúng tôi', 'lash.why.heading2': 'yêu thích liệu trình này',
      'lash.why.korean.title': 'Kỹ thuật Hàn Quốc', 'lash.why.korean.copy': 'Kỹ thuật uốn mi Hàn Quốc tiên tiến, mang lại kết quả đẹp và tự nhiên.',
      'lash.why.organic.title': '100% Hữu cơ', 'lash.why.organic.copy': 'Tất cả sản phẩm đều là hữu cơ sản xuất tại Hàn Quốc, an toàn và dịu nhẹ cho hàng mi của bạn.',
      'lash.why.longlasting.title': 'Bền lâu', 'lash.why.longlasting.copy': 'Giữ được 6-8 tuần nếu chăm sóc đúng cách.',
      'lash.why.nodamage.title': 'Không gây hư tổn', 'lash.why.nodamage.copy': 'Công thức dịu nhẹ giúp hàng mi luôn khỏe mạnh và chắc khỏe.',
      'lash.why.lowmaintenance.title': 'Ít cần chăm sóc', 'lash.why.lowmaintenance.copy': 'Hàng mi cong tự nhiên, mỗi ngày.',
      'about.hero.eyebrow': 'GIỚI THIỆU NAEIL',
      'about.hero.line1': 'Ít nỗ lực hơn.', 'about.hero.line2': 'Hiện diện nhiều hơn.',
      'about.hero.desc': 'NAEIL là một studio làm đẹp hiện đại mang đến những trải nghiệm làm đẹp đặc biệt. Những liệu trình được chăm chút tỉ mỉ dành cho những ai trân trọng sự tinh tế, thoải mái và bình yên.',
      'about.hero.cta': 'Đặt lịch hẹn của bạn',
      'about.philosophy.quote': 'Chúng tôi tin rằng vẻ đẹp không bao giờ nên vội vã.',
      'about.philosophy.copy': 'Mỗi liệu trình tại NAEIL được thiết kế để tạo nên một khoảnh khắc tĩnh lặng thông qua kỹ thuật chu đáo, sản phẩm sạch và sự chăm sóc có chủ đích.',
      'about.philosophy.vertical1': 'Chăm sóc tận tâm.', 'about.philosophy.vertical2': 'Trong từng chi tiết.',
      'about.values.label': 'GIÁ TRỊ CỦA CHÚNG TÔI',
      'about.values.precision.title': 'Tinh tế', 'about.values.precision.copy': 'Mọi chi tiết đều quan trọng. Từ cách chúng tôi làm việc đến sản phẩm chúng tôi lựa chọn.',
      'about.values.comfort.title': 'Thoải mái', 'about.values.comfort.copy': 'Được thiết kế cho sự thoải mái và thư giãn trọn vẹn. Một kỳ nghỉ ngơi sang trọng.',
      'about.values.presence.title': 'Hiện diện', 'about.values.presence.copy': 'Một liệu trình cho phép bạn chậm lại và hoàn toàn hiện diện trong khoảnh khắc.',
      'about.ritual.label': 'NGHI THỨC CỦA CHÚNG TÔI',
      'about.ritual.title': 'Một nhịp điệu tĩnh lặng, từ lúc bước vào đến khi thư thái.',
      'about.ritual.walkin.title': 'Bước vào', 'about.ritual.walkin.copy': 'Để lại thế giới bên ngoài trước cửa.',
      'about.ritual.pause.title': 'Dừng lại', 'about.ritual.pause.copy': 'Hít một hơi thở. Ổn định lại.',
      'about.ritual.reset.title': 'Tái tạo', 'about.ritual.reset.copy': 'Chúng tôi chăm chút từng chi tiết.',
      'about.ritual.restore.title': 'Phục hồi', 'about.ritual.restore.copy': 'Cảm nhận sự nhẹ nhõm, từ trong ra ngoài.',
      'about.ritual.leavelighter.title': 'Rời đi nhẹ nhàng hơn', 'about.ritual.leavelighter.copy': 'Mang theo sự bình yên cùng bạn.',
      'about.space.label': 'KHÔNG GIAN CỦA CHÚNG TÔI',
      'about.space.title1': 'Một nơi được thiết kế', 'about.space.title2': 'để bạn chậm lại.',
      'about.space.copy': 'Ánh sáng dịu nhẹ, chất liệu tự nhiên và thiết kế có chủ đích — được tạo ra để giúp bạn cảm thấy thoải mái ngay từ khoảnh khắc bước vào.',
      'about.finalcta.title1': 'Rời đi nhẹ nhàng hơn.', 'about.finalcta.title2': 'Mang theo sự bình yên cùng bạn.',
      'about.finalcta.copy': 'Dù là lần ghé thăm đầu tiên hay lần thứ năm mươi, chúng tôi vẫn luôn ở đây.',
      'about.finalcta.btn': 'Đặt lịch hẹn của bạn',
      'visit.hero.title': 'Ghé thăm chúng tôi',
      'visit.hero.desc': 'Chúng tôi rất mong được chào đón bạn đến với NAEIL Nail Bar.',
      'visit.hero.cta': 'Đặt lịch hẹn của bạn',
      'visit.info.location': 'Địa chỉ',
      'visit.info.address1': 'Số 52 Nguyễn Thái Học, Ba Đình,', 'visit.info.address2': 'Hà Nội, Việt Nam',
      'visit.info.directions': 'Chỉ đường',
      'visit.info.hours': 'Giờ mở cửa',
      'visit.info.monfri': 'Thứ Hai – Thứ Sáu', 'visit.info.satsun': 'Thứ Bảy – Chủ Nhật', 'visit.info.publicholiday': 'Ngày lễ',
      'visit.info.note': 'Mở cửa hàng ngày. Chào đón khách vãng lai.',
      'visit.find.title1': 'Một không gian yên bình,', 'visit.find.title2': 'ngay giữa lòng thành phố.',
      'visit.find.copy': 'Nằm trên con phố rợp bóng cây gần Văn Miếu, studio cách khu Phố Cổ một quãng đi bộ thong thả, không vội vã.',
      'visit.find.parking': 'Có chỗ đậu xe trên đường, cùng bãi đỗ xe gần đó chỉ vài bước chân.',
      'visit.finalcta.title': 'Chúng tôi rất mong chờ được chào đón bạn.',
      'visit.finalcta.copy': 'Khoảnh khắc chăm sóc dành riêng cho bạn đang chờ đón.',
      'visit.finalcta.btn': 'Đặt lịch hẹn của bạn'
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
      'spa.hero.sub': '深度放松，全然自在。',
      'spa.hero.desc': '一场修复身心的头皮护理仪式，为您清洁、滋养并重新平衡头皮。舒缓紧张、改善血液循环，从发根开始恢复健康有光泽的秀发。',
      'spa.hero.cta': '立即预约服务',
      'spa.services.eyebrow': '我们的头皮护理服务',
      'spa.services.sub': '用心打造的护理仪式，清洁、修复、焕新一体呈现。',
      'spa.services.essential.title': '基础护理 - 45分钟',
      'spa.services.essential.copy': '简约却不失精致的日常头皮清洁护理。包含温和洗发、放松头皮按摩、肩颈按摩以及专业吹风造型。',
      'spa.services.essential.price': '起价 250,000 越南盾',
      'spa.services.restore.title': '修复护理 - 75分钟',
      'spa.services.restore.copy': '深度舒缓的头皮护理体验，专为释放压力、恢复平衡而设计。包含双重清洁、温热蒸汽护理、加长版头皮按摩、肩颈按摩、滋养护理以及吹风造型。',
      'spa.services.restore.price': '起价 375,000 越南盾',
      'spa.services.scalpreset.title': '头皮重启护理 - 90分钟',
      'spa.services.scalpreset.copy': '专为油性、敏感或阻塞型头皮打造的个性化护理。在头皮检测之后，此护理仪式包含深层清洁、头皮去角质、强效净化及定制护理，帮助长期恢复头皮健康。',
      'spa.services.scalpreset.price': '起价 690,000 越南盾',
      'spa.services.hairreplenish.title': '秀发滋养护理 - 90分钟',
      'spa.services.hairreplenish.copy': '高强度秀发护理，专为修复、强韧及深层滋养干燥或经化学处理受损的秀发而设计。根据您的发质个性化定制，这一护理仪式能恢复柔顺、光泽、弹性与持久水润。',
      'spa.services.hairreplenish.price': '起价 790,000 越南盾',
      'spa.services.note': '所有护理项目均包含头皮检测与个性化咨询。',
      'spa.expect.label': '护理流程',
      'spa.expect.title': '从头皮到心灵的疗愈之旅',
      'spa.expect.analyse.title': '检测分析', 'spa.expect.analyse.copy': '头皮诊断，了解您的独特需求。',
      'spa.expect.cleanse.title': '清洁净化', 'spa.expect.cleanse.copy': '温和却高效的清洁，净化并重新平衡头皮。',
      'spa.expect.treat.title': '护理调理', 'spa.expect.treat.copy': '疗愈按摩与护理，舒缓身心并恢复活力。',
      'spa.expect.nourish.title': '滋养呵护', 'spa.expect.nourish.copy': '滋养护理，强韧秀发、焕发新生。',
      'spa.expect.styling.title': '造型呈现', 'spa.expect.styling.copy': '丝滑亮泽、沙龙级的秀发造型，看得见更感受得到。',
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

  document.addEventListener('DOMContentLoaded', function () {
    initDesktopSwitcher();
    initMobileSwitcher();
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
