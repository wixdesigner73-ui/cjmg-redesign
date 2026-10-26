// All business content below was audited from https://www.thecjmg.com (Oct 2026).
// Anything not on the live site is marked `// DERIVED` or `// CONFIRM` and listed in CONTENT-AUDIT.md.

export const SITE = {
  name: 'CJMG Creative',
  url: 'https://www.thecjmg.com',
  phone: '281.766.0777',
  phoneHref: '+12817660777',
  email: 'info@thecjmg.com',
  hours: '9–6 CST, USA',
  place: 'Houston',
  tagline: 'Your brand, your way.',
};

const WIX = 'https://static.wixstatic.com/media/';
export const wix = (id, w, h) => {
  if (!id) return '';
  const ext = id.split('.').pop();
  // Wix image service: crop-to-fill resize for photos; logos are used as-is.
  if (w && h && ext === 'jpg') return `${WIX}${id}/v1/fill/w_${w},h_${h},al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/${id}`;
  return `${WIX}${id}`;
};

export const IMG = {
  logo: 'ffa66f_a42cbc8250514a4ea791cbd77679ac18~mv2.png',
  hero: '11062b_c528e7036ffa4eada761737b77749400f000.jpg',
  homeServices: 'ffa66f_49203d52c2174ba79952290c3ddbbeb0f000.jpg',
  designHero: '11062b_50f6f6470c9642078f20bc034734c14bf000.jpg',
  banner: '11062b_d6ea2422bae844ea8476a116f7e1a8eaf000.jpg',
  seoTop: '11062b_001c98fe822d4f95800342d54d8e730df000.jpg',
  credentials: [
    'ffa66f_0bd6c5c0fb654987a20019c253230db5~mv2.png',
    'ffa66f_58ccc9eeb79c4e13b248abba5a5ccece~mv2.png',
    'ffa66f_84d14fc29a7c4a668e5b3f53c4f32a44~mv2.png',
    'ffa66f_4b5028447a8f4e1ca61564ae89333749~mv2.png',
  ],
};

const P = (name, cat, group, url, shot, logo, extra = {}) => ({
  name, cat, group, url, shot, logo, goals: ['Branding', 'Website Development'], ...extra,
});

// Order: homepage "Recent Projects" first, then the Website Design page list.
// The live page lists "Rapid Repair Ranger" twice (second copy reuses RLM Excavation's link) — de-duplicated here.
export const PROJECTS = [
  P('Fleur De Photo', 'Real Estate Photography', 'Creative & Events', 'http://fleurdephoto.com', '11062b_7c243021554746e48588dbe2a6f490eaf000.jpg', 'ffa66f_764227669a5f482c89f9e794a5e3488f~mv2.avif'),
  P('Speaking Gold', 'Public Speaking', 'Creative & Events', 'https://www.speakinggold.com/', '11062b_92ec89710cee4331ae25912859bafaa3f000.jpg', null),
  P('Mind Over Matter Counseling Services', 'Counseling Services', 'Health & Care', 'https://www.mindovermattermattercounseling.com/', '11062b_93d2fd372c99445692d253ef4410b284f000.jpg', null),
  P('Zantha Products', 'Health Supplements', 'Health & Care', 'https://www.zanthaproducts.com/', '11062b_88aec84e507544ab9a66aac2494f7e16f000.jpg', 'ffa66f_46a06709ac984185a9b90ef90e409ee3~mv2.png'),
  P('The Grandbaby Project', 'Elderly Care', 'Health & Care', 'https://www.thegrandbabyproject.org', '11062b_c6ba1531f860478d9bb84c7e7f34d067f000.jpg', 'ffa66f_f6454b90bfbe4af4923b21f4a993dc96~mv2.png'),
  P('LASH LAB PDX', 'Beauty', 'Beauty', 'https://mshood86.wixsite.com/lashlabpdx', '11062b_887d9e4b480a42c98a61fffb8d8bbf64f000.jpg', null),
  P('Arkitainer Tiny Homes', 'Real Estate Construction', 'Home & Trade', 'https://www.arkitainertinyhome.com', 'ffa66f_e4930ad38aaa4543a8ffcfc553125b07f000.jpg', null),
  P("Nikki's Beauty & Fitness Bar", 'Beauty', 'Beauty', 'https://www.nikkisbeautyandfitnessbar.com', '11062b_07adfb9662d849d58963d762c9448eecf000.jpg', 'ffa66f_acc7816e799b4e60adb9a38b945023b9~mv2.png'),
  P('Pretty Little Princess Events', 'Entertainment', 'Creative & Events', 'https://www.prettylittleprincess7.com/', '11062b_ab90c76e981644f1a5cb91f5aaa6334af000.jpg', 'ffa66f_3052f198656f4f32bcede18df706cfac~mv2.png'),
  P('Rapid Repair Ranger', 'Repair', 'Home & Trade', 'https://www.rapidrepairrangerhandymanservices.com', '11062b_b8008f60559c41b9b09658e15f2aa52ff000.jpg', 'ffa66f_2bf284840ab440b8a000637d1aa7ef22~mv2.png'),
  P('RLM Excavation', 'Land Excavation', 'Home & Trade', 'https://www.rlmexcavation.com', '11062b_7a4c8e0d92b64d9bb11b7190e9900fc2f000.jpg', null),
  P('Marmitas Restaurant', 'Restaurant', 'Food', 'https://www.marmitasbr.com', '11062b_6655a7138a5b4da488c950c2eecefff9f000.jpg', null),
  P('Educate U', 'Education', 'Business & Community', null, '11062b_9fb78dad59ec4b2e88f4db7482a162ebf000.jpg', 'ffa66f_f821f1775cab48728ebc9c3e51e2e29a~mv2.png'),
  P('Equilibrium Physical Therapy', 'Medical-Health', 'Health & Care', 'https://www.eqphysical.com', '11062b_d8a2c9e827694c0d8fc6616fbbcac90ff000.jpg', 'ffa66f_3e8dd88240044f45939d50a799a654aa~mv2.png'),
  P('Amelia Aubourg', 'Reading', 'Creative & Events', 'https://www.ameliaaubourg.com', '11062b_a29a7278ed9e48c7b827a2fe10923501f000.jpg', null),
  P("Kelsey's Quackery", 'Farming', 'Business & Community', 'https://www.kelseysquackery.com/', '11062b_4b2a94499963414281e893d0fc6fdcb8f000.jpg', 'ffa66f_4b80772979194cd9995dc9c6133ea783~mv2.avif'),
  P('Odd Jobs By Dennis', 'Home Repair', 'Home & Trade', 'https://www.oddjobsbydennis.com', '11062b_a3a0fc7110504b12b74fa28666ea0bccf000.jpg', 'ffa66f_2ad660a14df74ed1b9faf9e62346e2d5~mv2.avif'),
  P('Brookie Cookie Bakery', 'Bakery', 'Food', 'https://www.brookiecookiebakery.com/', '11062b_26a8e1fa3fdd49e5a47ebfa86da66c1cf000.jpg', null),
  P('Innovatio Karma', 'Finance', 'Business & Community', 'https://www.innovatiokarma.com/', '11062b_cdf16e9ed06d436aa76e084ff4938c8af000.jpg', 'ffa66f_4aed1c40fdfb4e6ba36828de3afd8aef~mv2.avif'),
  P('Lakeside Subs', 'Restaurant', 'Food', 'http://lakesidesubs.com', '11062b_f3848621d7164f8c8b16f990094be3d6f000.jpg', 'ffa66f_cb0df5c64ff74a95847f4b3eda594356~mv2.png'),
  P('Empowered Holistic Health', 'Health-Herbal', 'Health & Care', 'http://empoweredhhealth.com', '11062b_58238a40adf54285a97b900648dd4ab7f000.jpg', 'ffa66f_08603d847dc949e5b0761e7cbac3351f~mv2.png'),
  P('A&K Danes', 'Animal Care', 'Business & Community', 'https://www.akdanes.com/', '11062b_b07b4c36aacc42aa86ce4bd9b8d3afd3f000.jpg', null),
  P('Highly Affordable Roofing', 'Real Estate Repair', 'Home & Trade', 'http://highlyaffordableroofing.com', '11062b_1d5fe2371f3a4d2caf40a1b369f55c01f000.jpg', 'ffa66f_bafd706e406645689ddc8acfe651beab~mv2.png'),
  P('Alyzion Medical', 'Counseling', 'Health & Care', 'https://www.alyzionpsychiatry.com', '11062b_79fb0a985d25457792889076ee94f54ef000.jpg', 'ffa66f_2c05393e048b4319bad4fc69f39c0b50~mv2.png'),
  P('Bridelle Huston', 'Entertainment', 'Creative & Events', 'http://bridellehuston.com', '11062b_402c9770f63d46699bc0b8f011ac1075f000.jpg', 'ffa66f_83fc4ee9d33e456ebedc47d3a55c1991~mv2.png'),
].map((p, i) => ({
  ...p,
  slug: p.name.toLowerCase().replace(/&/g, 'and').replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  i,
}));

export const FILTERS = ['All', 'Health & Care', 'Beauty', 'Food', 'Home & Trade', 'Creative & Events', 'Business & Community'];
export const FEATURED = ['fleur-de-photo', 'speaking-gold', 'mind-over-matter-counseling-services', 'zantha-products', 'the-grandbaby-project', 'lash-lab-pdx'];

export const TESTIMONIALS = [
  { quote: 'Quality work from a quality design agency, totally brought my vision to life.', name: 'Mr. Morrison', role: 'Owner', biz: 'Fantom Clothing', img: 'ffa66f_41ad61745ab54dd1969496cf28f0c7c0~mv2.png' },
  { quote: 'Communicates well, keeps clients informed on changes, offers suggestions, and provides good quality work!', name: 'Deon Richardson', role: 'Owner', biz: 'Bow Tie Chauffeur', img: 'ffa66f_5b225e8421604fe1bb41c2b9a8d8a7f7~mv2.png' },
  { quote: 'Fast service and attention to details are what you look for in online creative agencies. CJMG was able to bring out the best in my overall brand and totally change my perspective on my branding.', name: 'Marlyn', role: 'Owner', biz: 'Dipped in Gold By Marlyn', img: 'ffa66f_4e7e419a90ef44f99ef5b770cfecebc5~mv2.png' },
];

export const AGENDA = {
  lead: 'CJMG Creative Services delivers modern website design, strategic SEO, and impactful branding built to elevate your business.',
  body: 'We help companies stand out online with clean, professional websites, strong search visibility, and cohesive brand identity. Whether you’re launching something new or refreshing your current image, our focus is simple—create visuals that capture attention and strategies that drive growth.',
  contact: 'A Houston based website design and website management agency. We specialize in coming up with design concepts to push your business forward. Website design strategy and implementation are our specialty. CJMG Creative Agency is here to fit your needs including SEO and also website profile management and updates.',
};

export const DESIGN = {
  question: 'What is website design?',
  quote: 'A website is the face of your business. Make sure to be aware of its beauty.',
  short: 'Professional, user-friendly websites tailored to your brand.',
  body: 'CJMG Creative provides tailored solutions to create visually stunning and user-friendly websites that your specific business needs. Our team works closely with you ensure your site not only looks great but also functions seamlessly, enhancing your online and driving engagement.',
  body2: 'We build responsive, clean, and modern websites that look great on all devices and help customers clearly understand who you are. From layout and graphics to navigation and messaging, we design with purpose—to convert visitors into customers.',
  inclusions: ['Custom layout and design', 'Mobile-optimized pages', 'Fast loading and clean navigation', 'Optional content writing & updates'],
  process: ['Mobile Responsive', 'SEO (Website, Google, Social)', 'Map & Menu Structure', 'Stock Images & Forms', 'Domain (1 Year Included)', 'Hosting (1 Month Included)'],
  faqs: [
    ['Domain name?', 'As the business owner, you own all of the rights to your domain name and website address. If you do not own a domain, we will work together to select the right domain for your business and walk you through the purchase process and also management and maintenance of your domain.'],
    ['Edit my own site?', 'Yes. we design and transfer control of the website over to our clients. We offer management guidance upon completion of the design to make sure there is a basic understanding of website maintenance and design.'],
    ['What’s included in the website process?', 'Mobile Responsive. SEO (Website, Google, Social). Map & Menu Structure. Stock Images & Forms. Domain (1 Year Included). Hosting (1 Month Included).'],
  ],
};

export const SEO = {
  question: 'What is SEO?',
  answer: 'SEO (Search Engine Optimization) is the process of improving your website so it appears higher in search engine results like Google. The goal is to attract more organic (non-paid) traffic from people searching for your products or services.',
  short: 'Increase visibility. Attract the right audience.',
  body: 'Boost your online presence with our comprehensive SEO services, designed to enhance both local and national visibility. Our expert team utilizes proven strategies to optimize your website ensuring it ranks higher in search results and attracts more targeted traffic.',
  body2: 'We use proven SEO strategies to help your website rank higher and reach more customers organically. From keyword optimization to speed improvements, we make sure your online presence is strong, credible, and competitive.',
  inclusions: [
    ['Keyword research & optimization', 'Find and target the searches your customers actually make.'],
    ['On-page SEO improvements', 'Page-level optimization so search engines understand your site.'],
    ['Technical SEO enhancements', 'Speed and site-health improvements behind the scenes.'],
    ['Content optimization', 'Sharpening your existing content for the right keywords.'],
    ['Local SEO', 'Google Business Profile setup and optimization.'],
  ],
  faqs: [
    ['How long does SEO take to work?', 'SEO is a long-term strategy. Most businesses begin seeing noticeable improvements within 3–6 months, depending on competition, website history, and how aggressive the strategy is.'],
    ['Can you guarantee #1 rankings?', 'No legitimate SEO expert can guarantee specific rankings—Google’s algorithm constantly changes. However, we follow proven strategies that significantly increase your visibility, authority, and traffic.'],
    ['Do I need SEO if I already have a website?', 'Yes. A website alone doesn’t mean customers will find you. SEO ensures your site ranks for the keywords your customers are searching for, helping you attract the right audience.'],
  ],
};

const L = (...ids) => ids.map((i) => `ffa66f_${i}~mv2.png`);
export const LOGO = {
  tagline: 'Check the work. Check the process. Check the facts. Contact. Done.',
  details: ['Brand Identity', 'Brand Guidelines', 'Brand Discovery Process with Questionnaire', 'Color Palette in HEX Convertible to Print', 'Main Logo Design', 'Logo Submark Design', 'Font Recommendations (Textures and patterns)', 'File Formats (.PNG, .PDF, .SVG, .AI)'],
  groups: [
    ['Custom Logo Design Work', L('d3264f45a1e94228b12bd01bb1eb79de', 'bcff3e562ac74567baf822d991c3d0e9', 'c023520e96b94e8b8ed13f9501663319', 'ec20533c8369441987c7ed6ef50f9784', '41ad61745ab54dd1969496cf28f0c7c0', 'b4f7d12058784b439b7b3fee5ae1b16b', 'a99113ae66264c8094ff37635f4e79a0')],
    ['Text Based Logo Work', L('b84d1d61c1104c83923dddaaa9066564', 'f3b1fb5cd9c14bdabd3499d62710b96f', 'c7be5bc9da584e1c99e4beb5872d5f55', '74dde6d4644e4a83969ce3a1d2fca436', '0f823ad4e38147c29a932a31ac1cbdba', '591652e8be3d44af9d3e2527559997e2', 'c6833f56225a4d229f0991baa1d63b95', '7618128df37144caa796e5254b7341bf', 'b07bdeda8a5549faacae7778353f2cf4')],
    ['Character Logo Design Work', L('4a8c01bdc1ed4369a126a8440694858e', 'ec8344f2ac2d46249aba7459e7d354c5', '6583e09f9db2457bad705dc671ea534c', 'c13c1b0287ae410e804626245d2fa61c', 'b8c65118d18b431093b4fdb1e3c8f295', 'bca484a661e74de4a95aad8a9b113d1d', 'c1f9b8255e5549ccbf2e5daf4643cf6b')],
    ['Service Industry Logo Design Work', L('7ad449b14713487796f71225836ba485', '87cc42c703394f4ca790e8877a58e277', '95962c84925848be8097a9402f4fd0fd', '439745dc5c67438eaa3162d2fa35f036', '0c38640700ee46bbb919cb2cda4f36d7', 'fee743b446f244ac91691ba78eab2a21')],
    ['More Logo Design Work', L('c5da203423274dc6b4a26ee5fade71e2', 'e6aa54e1245a47c28e80b2013d315ab7', '4e5b61def2494de7bb8addbce134be24', '85948c3d28274b0cb258fceb4f60bdff', '262be7f4b1b14747bcc462f29d9fd0fd', '08938bc184564ad0bd4deb324dc57d37', 'f57628e2c74946c8bf82ad30dae2c673')],
  ],
};

export const SERVICES = [
  { id: 'website-design', icon: 'browser', title: 'Website Design', href: '/website-design', blurb: DESIGN.short, text: 'Custom layouts, mobile-optimized pages, fast loading and clean navigation, with optional content writing & updates.' },
  { id: 'seo', icon: 'search', title: 'Search Engine Optimization', href: '/seo-services', blurb: SEO.short, text: 'Keyword research, on-page and technical SEO, content optimization and local SEO through Google Business Profile.' },
  { id: 'branding', icon: 'pen', title: 'Logo Design & Branding', href: '/logo-design', blurb: 'Brand identity, guidelines and logo files.', text: 'Brand identity, brand guidelines, a main logo and submark, HEX color palette and files in PNG, PDF, SVG and AI.' },
  { id: 'revamps', icon: 'refresh', title: 'Website Revamps', href: '/website-design#revamps', blurb: 'Refresh your current image.', text: 'Already online? Refresh your current image with a clean, professional, mobile-optimized redesign.' }, // DERIVED from Agency Agenda + hero tagline
  { id: 'migration', icon: 'move', title: 'Website Migration', href: '/website-design#revamps', blurb: 'Move to a better home.', text: 'Migration is part of our core offering. Tell us about your current site and we’ll map out the move.' }, // CONFIRM scope with owner
  { id: 'management', icon: 'sliders', title: 'Website Management & Updates', href: '/client-consultation', blurb: 'Profile management and updates.', text: 'Website profile management and updates, with optional monthly maintenance after your project is complete.' },
];

export const PROCESS = [
  { n: '01', t: 'Discover', d: 'A consultation and brand discovery: your mission, colors, services and the functionality your website needs.' },
  { n: '02', t: 'Design', d: 'A custom layout, map & menu structure and mobile-responsive pages built around your brand.' },
  { n: '03', t: 'Develop', d: 'Stock images, forms and SEO for your website, Google and social, built into the project.' },
  { n: '04', t: 'Launch', d: 'Domain (1 year) and hosting (1 month) included, plus control of your site and management guidance.' },
];

export const SERVICE_OPTIONS = ['Website Design', 'Search Engine Optimization (SEO)', 'Logo Design & Branding', 'Website Revamp / Migration', 'Website Management & Updates']; // CONFIRM against live dropdown

export const NAV = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Portfolio', '/portfolio'],
  ['Contact', '/contact'],
];
