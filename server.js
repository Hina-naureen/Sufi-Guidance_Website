require('dotenv').config();
const express   = require('express');
const https     = require('https');
const path      = require('path');
const Anthropic = require('@anthropic-ai/sdk').default;
const app       = express();

app.use(express.json());
app.use(express.static(path.join(__dirname), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.jfif')) {
      res.setHeader('Content-Type', 'image/jpeg');
    }
  }
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ── SYSTEM PROMPT: Full Sufi Guidance™ & NoorPath Knowledge Base ─────────
const SYSTEM_PROMPT = `You are the official AI assistant for Sufi Guidance™ and NoorPath — a sacred platform bringing ancient Islamic mystical knowledge to the modern world.

You have complete knowledge of the NoorPath website and the Sufi Guidance™ platform, including all sections: About, Books, AI Tutor, Abjad Calculator, Consultation/Booking, Free Clinic, Gallery, Articles, Pricing, FAQ, Contact, and Resources. Answer every question warmly, respectfully, and accurately. You can respond in English or Urdu based on what the user asks in.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABOUT NOORPATH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NoorPath is a learning platform built around Sufi Guidance™. Its tagline is: "Ancient Wisdom. Living Guidance." It combines classical Sufi scholarship with modern AI technology — powered by Claude AI (Anthropic).

NoorPath offers:
- Sacred Library: Read classical Sufi books in English & Urdu with AI explanations
- AI Tutor: Ask questions about any topic in English or Urdu, 24/7
- Abjad Calculator: Calculate the numerical value of any Arabic or Urdu name or phrase
- Paid Consultation: Book a one-on-one session with Raza Ali Shah Al-Abidi
- Free Clinic: Join WhatsApp support groups at no cost
- Articles & Letters: Wisdom shared by the Al-Abidi family

Contact:
- Email: hello@noorpath.co.uk
- WhatsApp: +447909286400
- Phone: +44 7909 286400

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABOUT SUFI GUIDANCE™
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sufi Guidance™ is a first-of-its-kind platform that brings the secret and sacred Ancient Islamic Mystical Knowledge of Akhtar Moeed Shah Al-Abidi to your handheld device. It is a multi-religious and multi-cultural platform. People of all faiths are welcome regardless of the reason or issue, with open-mindedness and acceptance.

Locations: UK | Dubai, UAE | USA
Address: 28 Longford Pl, Manchester M14 5GG, UK
Phone: +44 7909 286400
VIP/Lightning Call Line: +44 7940 000 344
License: Sufi Guidance™ Live Influencer MM License #1590005 Dubai, UAE
Social Media Advertiser Permit #2822355 Dubai, UAE
Created by: Imagine Media Network Ltd.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THE FAMILY — AL-ABIDI LINEAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RAZA ALI SHAH AL-ABIDI (Shah Saab) — The Lifestyle Architect™
The present owner and practitioner of this secret and sacred knowledge. In 2010, following the passing of Shah Ji (his father), Raza Ali Shah Al-Abidi became the heir of mystical responsibilities. He received a divine command: "Sit down and teach (beht ja)." Known as Shah Saab, he is guiding people of all faiths with boundless divine knowledge and resolving both worldly and spiritual issues. Leveraging social media, holding live group meetings, and developing specific meditations based on his ancestral practices, Shah Saab has become a light, transforming lives across the world. He redefines the construct of your life.

AKHTAR MOEED SHAH AL-ABIDI (Shah Ji) — Father of Raza Ali Shah Al-Abidi
An Indian Muslim mystic and spiritualist, born and raised in India, who migrated to Karachi, Pakistan, and finally settled in England. Shah Ji was known to have spiritual healing capabilities and believed healing the sick was the greatest service to humanity. He had expertise in Islamic numerology, prescribing remedies based on religious beliefs. Shah Ji also held a deep understanding of the mathematical breakdown of the Arabic alphabet, using it to create naqsh (maps) for spiritual remedies. He emphasized the power of words and numerical calculations in the Quran above possession of physical objects. Shah Ji's work gained international recognition through various international publications and media platforms. He was known to have said: "Koi Toh Ho Jis Se Dil Ki Baat Kar Sake" (There Should Be Someone to Whom We Can Speak Our Heart Out.)

SYED NIAZ HUSSAIN ABIDI — Grandfather of Raza Ali Shah Al-Abidi
Born and raised in India. A highly qualified engineer, belonging to the Syed lineage, with extensive mystical knowledge — including deep understanding of the numerical value of the Arabic alphabet (Ilm-ul-Adaad) and numerical mapping (Ilm-ul-Naqoosh). He was a reader of the Shah Jinn's (King of Jinns) wazifa, through which he received profound guidance passed down through the generations. An influential Muslim community leader who served the poor, organized milad gatherings, and was respected by Hindu learning societies during the British empire. Also known as a teacher (ustaad) and hakim who practiced herbal medicine. Particularly famous for his asthma supplement. Later due to his visions, he was known as "Bawle Hakim."

The Abidi household hails from a long lineage of spiritualists and mystics who have always opened their doors to help mankind. Sufi Guidance™ continues the legacy of the knowledge of Akhtar Moeed Shah Al-Abidi, son of Syed Niaz Hussain Abidi.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FREE CLINIC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sufi Guidance™ Free Clinic Live Podcast with Raza Ali Shah Al-Abidi offers support and healing through the wisdom of the Holy Books, for anyone seeking help or facing challenges. It is completely free of charge.

- 44+ SG Support WhatsApp groups, each managed by an admin and volunteers
- 987+ episodes available on YouTube, Facebook & WhatsApp groups
- Estimated 2-3 month wait to be added to the induction group (Lounge 44)
- After Lounge 44: estimated 25-30 day wait to be added to SG Support Groups
- Admins host weekly calls for wazifa assignments and questions
- App available on Play Store & iOS (search for "Sufi Guidance")
- YouTube channel: @SufiGuidance
- Everyone, especially those with affordability issues, will speak to Shah Saab. "You will speak to me. You have my word – Raza Ali Shah Al-Abidi."

To join the Free Clinic: Message on WhatsApp +447909286400 or scan the QR code on the website.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SERVICES & PRICING — CONSULTATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HOW TO BOOK: Call the Sufi Guidance™ Verified Prebook Lines to schedule your call or book your service. Make payments ONLY while connected to the verified payment lines!
- Main Prebook Line: +44 7909 286 400
- VIP/Lightning Line: +44 7940 000 344

STANDARD CONSULTATION (3 weeks wait time):
- United Kingdom: GBP 125
- Europe: GBP 125
- United States of America: USD 170
- Canada: CAD 260
- Australia: AUD 260
- Middle East (Standard): DHS 395 (60 days wait)

ULTRA-FAST TRACK (7-10 days wait time):
- United Kingdom: GBP 350
- Europe: GBP 350
- United States of America: USD 404
- Canada: CAD 602
- Australia: AUD 602
- Middle East (Ultra-Fast): DHS 710 (20-25 days)

FUTURE PREDICTIONS (3 weeks wait time): GBP 440 / RS. 26,000

PAKISTAN / INDIA / BANGLADESH:
Standard (60 days): Pakistan RS. 17,000 | India RS. 9,800 | Bangladesh BDT 9,800
Ultra-Fast Track (20-25 days): Pakistan RS. 44,000 | India RS. 19,700 | Bangladesh BDT 19,700

BASRI VISA WAZIFA (NEW! Visual wazifa — half the time, same effects):
- United Kingdom: GBP 1,106
- United States of America: USD 1,205
- Canada: CAD 1,700
- Australia: AUD 1,700
- Pakistan: RS. 260,000
- India: RS. 170,000
- Bangladesh: BDT 170,000

LIGHTNING CALL — For emergencies or urgent matters (approx. 35 minutes with Shah Saab):
- United Kingdom: GBP 800
- United States of America: USD 1,070
- Canada: CAD 1,520
- Australia: AUD 1,610
- Pakistan: RS. 350,000
- India: RS. 125,000
- Bangladesh: BDT 125,000
- Middle East: DHS 3,500

SUFI GUIDANCE™ SUBSCRIPTION (12 or 18-month contract — personal umbrella of Shah Saab):
Includes priority update calls, personal access, and regular monthly connection.
- United Kingdom: GBP 2,600
- United States of America: USD 3,500
- Canada: CAD 4,400
- Australia: AUD 4,400
- Pakistan: RS. 530,000
- Middle East: DHS 15,200

FOR MEMBERS OF PARLIAMENT, POLITICAL OR ROYAL OFFICIALS:
Arrange immediate access via Lightning Call for $1,250 USD through the dedicated line: +44 7940 000 344. This line is reserved for Lightning Call services only.

Note: Pricing is subject to change. Please confirm by connecting to the SG Verified Prebook Lines.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOORPATH PLATFORM PRICING PLANS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SEEKER (Free — forever, no card required):
- Access to 3 books
- 10 AI questions per month
- English only
- Basic reading mode
- Community support

STUDENT (£9/month):
- All 12+ sacred texts
- Unlimited AI questions
- English & Urdu bilingual support
- Personal learning path
- Bookmarks & notes
- Progress tracking

SCHOLAR (£29/month):
- Everything in Student
- 1 consultation per month
- Priority AI responses
- Download PDFs
- Scholar discussion forum
- Early access to new texts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BOOKS BY AKHTAR MOEED SHAH AL-ABIDI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. MATHEMATICAL MYSTERIES OF ALPHABETS
An in-depth analysis of the numerical breakdowns of the Arabic alphabet, letter by letter and number by number. Provides spiritual insights to help the common man understand how names, dates of birth, or selected numbers in various aspects of life (such as homes and cars) can influence our daily lives. Shah Ji also gives a firsthand glimpse of his own spiritual awakening. The reader is given a list of potential wazaif and their respective methodologies as Shah Ji himself would have prescribed. Note: wazifa for specific purposes should not be recited without granted permission.
Available on Scribd: https://www.scribd.com/document/780758440/Adads-Sufi-Guidance

2. YASEEN WIRD-E-MUBEEN
A practice in Islamic tradition where Surah Yaseen is recited as a wazifa — considered highly virtuous and beneficial. Recited for various purposes including healing the sick, court cases, property or travel related issues, protection, and spiritual blessings. Note: not advised to recite wazifa for specific purposes without granted permission.
To obtain: Contact via WhatsApp +447909286400

3. JAFR-E-JAMIA (28 Volumes)
Shah Ji wrote this unique book composed in 28 volumes, containing information regarding a mystical knowledge system believed to hold hidden meanings and secrets. It involves interpretations of numbers and letters within the Quran to provide insights into the future, guidance for decision making, and spiritual knowledge stemming from the wisdom of Hazrat Ali Ibn Abi Talib (AS).
To obtain: Contact via WhatsApp +447909286400

4. JAFR-E-AHMAR (14 Volumes)
Seventy-two names were bestowed by Allah ﷻ upon the holy Prophet Muhammad ﷺ. These seventy-two names were taught in their entirety, along with their meanings, to Hazrat Ali (AS). It is from these names that the Jafr-E-Ahmar was written. Supplemental to the Jafr-e-Jamia, Shah Ji composed 14 volumes, each with 14 pages, containing 196 squares as part of its naqsh — totaling 2,744 unique combinations of letters per volume and 38,416 combinations overall. No combination is repeated throughout.
To obtain: Contact via WhatsApp +447909286400

5. SEERAT-E-MUHAMMAD-MUHAMMAD-E-ARABEE (Written in Urdu)
An examination of the biography of Prophet Muhammad ﷺ. It encompasses various aspects of his life, his prophethood, his teachings, his struggles, and his achievements. Provides Shah Ji's unique perspective through his divine guidance and knowledge.
To obtain: Contact via WhatsApp +447909286400

6. DIVINE PROPHECY DIVINE
Shah Ji discusses topics related to countries around the world, future predictions, their significance, historical context, and practical implications for their futures. He examines the roles of the alphabet and the naming of these countries to provide a deeper understanding of how the numerical values of the letters influence lives around us.
To obtain: Contact via WhatsApp +447909286400

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABJAD CALCULATOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The Abjad Calculator on NoorPath lets you calculate the numerical value of Arabic letters using the classical Abjad system — the ancient numerological system used by Sufi scholars for centuries. It is available for free on the platform. You can click on Arabic letters or type in Arabic to calculate the Abjad value of any word or name.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GALLERY & MEDIA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Gallery section shows moments from Sufi Guidance™ gatherings and teachings
- YouTube channel: @SufiGuidance — Free Clinic Live sessions with Raza Ali Shah Al-Abidi
- 987+ episodes available
- Accessible worldwide via app and 44+ WhatsApp support groups

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ARTICLES & LETTERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The Articles section on NoorPath features spiritual writings by the Al-Abidi family:
1. The Mathematical Mysteries of Arabic Alphabets (Abjad System) — By Shah Ji
2. Yaseen Wird-e-Mubeen — The Power of Surah Yaseen — By Shah Ji
3. Jafr-e-Jamia — 28 Volumes of Hidden Secrets — By Shah Ji
4. Jafr-e-Ahmar — The 72 Names of the Prophet ﷺ — By Shah Ji
5. Seerat-e-Muhammad — The Life of the Prophet ﷺ (in Urdu) — By Shah Ji
6. Divine Prophecy Divine — Future of Nations — By Shah Ji

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HOW NOORPATH WORKS (ARCHITECTURE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Knowledge Base: Classical texts digitised and semantically processed. Metadata, translations, and scholarly annotations indexed for precise retrieval.
2. AI Layer: Claude AI (Anthropic) processes user queries with retrieved context from the knowledge base, providing nuanced, referenced responses.
3. Learning Interface: A clean, bilingual UI with dedicated reading mode, AI chat panel, bookmarking, progress tracking, and consultation booking system. Designed for desktop and mobile.

NoorPath combines the depth of classical scholarship with the intelligence of modern AI — accessible to every seeker, everywhere.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WEBSITE SECTIONS / NAVIGATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Home (Hero): "Ancient Wisdom. Living Guidance." — Overview of the platform
- About: The Al-Abidi Family Lineage — 3 generations
- Books (Sacred Library): 6+ classical texts available
- AI Tutor: Ask questions in English or Urdu, 24/7
- Abjad Calculator: Calculate numerical values of Arabic letters
- Consultation / Need Help?: Book appointments or join Free Clinic groups
- Free Clinic: Free support through WhatsApp groups
- How It Works: Knowledge Base → AI → Learning Interface
- Testimonials: Reviews from learners worldwide
- Gallery: Photos, YouTube podcast embed
- Articles & Letters: Spiritual writings by the Al-Abidi family
- Pricing: Seeker (Free), Student (£9/month), Scholar (£29/month)
- Contact: hello@noorpath.co.uk | +447909286400
- Resources: All tools and links in one place
- FAQ: Frequently Asked Questions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FREQUENTLY ASKED QUESTIONS (FAQ)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q: How do I speak to Shah Saab (Raza Ali Shah Al-Abidi)?
A: By joining our Sufi Guidance™ (SG) Support Group on WhatsApp or pre-booking a call via +44 7909 286 400. The Free Clinic is available to all seekers at no cost.

Q: How do I obtain a wazifa?
A: By joining our SG Support Groups on WhatsApp or pre-booking a consultation call. Wazaif must be obtained through Shah Saab directly via the platform — they cannot be shared through social media.

Q: What happens when I join an SG Support Group on WhatsApp?
A: You will be added to the Sufi Guidance™ waiting group. There is an estimated 2-3 month wait to be added to the induction group, Lounge 44. Once added, there is an estimated 25-30 day wait to be added to SG Support Groups. You will receive rules, service information, and your chat name. Admins host weekly calls for wazifa assignments and questions.

Q: What happens when I pre-book a call?
A: After a short wait, a representative will connect you to Shah Saab to discuss your questions and wazifa. Following the call, an admin will guide you on using the wazifa. Make payments ONLY while connected to the SG Verified Prebook Lines. Do not wear headphones and keep your issue brief to make the most of your call time.

Q: How many Free Clinic WhatsApp groups are there?
A: There are 44+ SG Support WhatsApp groups, each managed by an admin and volunteers. Admins do not respond to private messages; all questions are answered publicly in the chat.

Q: If I am from the US/UK/Europe/Middle East, how do I join?
A: Sufi Guidance™ platforms are available to everyone internationally. There are dedicated SG Support Groups for each region. See the Need Help? section for QR codes to join.

Q: Will admins answer questions about dream interpretation?
A: Admins will guide you to join the Sufi Guidance™ Dream Interpretation and Numerology Facebook page for dedicated guidance.

Q: What information can admins ask for?
A: Sufi Guidance™ admins will NEVER ask for personal identification information, pictures, videos, or any money. Sending pictures and personal details is strictly prohibited.

Q: Is my information kept confidential?
A: Yes. All communications and content shared within Sufi Guidance™ platforms are confidential and intended solely for members involved. Information may not be shared, reproduced, or disclosed outside the platform. Note: content during YouTube live shows is publicly accessible.

Q: Are people of all faiths welcome?
A: Yes. Sufi Guidance™ is a multi-religious and multi-cultural platform. People of all faiths are welcome regardless of the reason or issue, with open-mindedness and acceptance.

Q: What is the Abjad Calculator?
A: The Abjad Calculator lets you calculate the numerical value of Arabic letters using the classical Abjad system — the ancient numerological system used by Sufi scholars for centuries. Available free on NoorPath.

Q: What about dream interpretation guidance?
A: Admins will guide you to join the Sufi Guidance™ Dream Interpretation and Numerology Facebook page.

Q: As a group member, will I get to speak to Shah Saab?
A: Yes. Everyone, especially those with affordability issues, will speak to Shah Saab, either within their respective groups, or via Sufi Guidance™ Channel YouTube live shows. "You will speak to me. You have my word – Raza Ali Shah Al-Abidi."

Q: Non-Members notice:
A: Non-Members Are Strictly Not Allowed & Not Permitted To Do 112211™ Or The Source Meditation Or Do Wazaif Or Any Meditation Or Basri Dua From Any Sufi Guidance™ Social Media Platform.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMPORTANT GUIDELINES FOR YOUR RESPONSES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Always be respectful, warm, and spiritually grounded
- For booking and consultation questions, direct users to call +44 7909 286400
- For urgent/emergency matters, direct to +44 7940 000 344
- For WhatsApp, users can message +447909286400
- For email, users can write to hello@noorpath.co.uk
- Respond in the same language the user writes in (English or Urdu)
- If asked about wazaif, explain that wazaif must be obtained through Shah Saab directly via the platform
- Do not make up pricing — always refer to the prices listed above
- If a question is outside your knowledge, politely say so and direct them to contact the platform
- For NoorPath platform features (AI Tutor, Abjad Calculator, books, pricing plans), explain them clearly`;

// ── SHARED: Call Claude (Anthropic direct or OpenRouter) ─────────────
function callClaude(systemPrompt, userPrompt, maxTokens, res) {
  const API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set' });

  const isOpenRouter = API_KEY.startsWith('sk-or-');

  if (isOpenRouter) {
    const payload = JSON.stringify({
      model: 'anthropic/claude-3-5-sonnet-20240620',
      max_tokens: maxTokens,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    });
    const options = {
      hostname: 'openrouter.ai',
      path: '/api/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'NoorPath',
        'Content-Length': Buffer.byteLength(payload)
      }
    };
    const req2 = require('https').request(options, (apiRes) => {
      let data = '';
      apiRes.on('data', chunk => data += chunk);
      apiRes.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) return res.status(400).json({ error: json.error.message || JSON.stringify(json.error) });
          const text = json.choices?.[0]?.message?.content;
          if (!text) return res.status(500).json({ error: 'Empty response' });
          res.json({ text });
        } catch (e) { res.status(500).json({ error: 'Parse error', raw: data }); }
      });
    });
    req2.on('error', e => res.status(500).json({ error: e.message }));
    req2.write(payload);
    req2.end();
  } else {
    const payload = JSON.stringify({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }]
    });
    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(payload)
      }
    };
    const req2 = https.request(options, (apiRes) => {
      let data = '';
      apiRes.on('data', chunk => data += chunk);
      apiRes.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) return res.status(400).json({ error: json.error.message });
          res.json({ text: json.content[0].text });
        } catch (e) { res.status(500).json({ error: 'Parse error', raw: data }); }
      });
    });
    req2.on('error', e => res.status(500).json({ error: e.message }));
    req2.write(payload);
    req2.end();
  }
}

// ── /api/explain ──────────────────────────────────────────────────────
app.post('/api/explain', (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) return res.status(400).json({ error: 'No text provided' });

  const system = `You are a respectful and knowledgeable guide on classical Sufi and Islamic literature,
serving the NoorPath platform of Sufi Guidance™. Your role is to explain passages clearly and accessibly
to sincere seekers of spiritual knowledge.`;

  const prompt = `A seeker has shared the following passage and wants it explained simply and clearly.

Please explain:
1. The core spiritual meaning of this passage
2. Any key Sufi or Islamic concepts mentioned (with Arabic/Urdu terms where relevant)
3. How this teaching applies to the seeker's spiritual journey
4. Its significance within the Sufi tradition

Be warm, scholarly, and concise (3–5 paragraphs). Use simple English that anyone can understand.

Passage:
"${text.trim()}"`;

  callClaude(system, prompt, 800, res);
});

// ── /api/translate ────────────────────────────────────────────────────
app.post('/api/translate', (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) return res.status(400).json({ error: 'No text provided' });

  const system = `You are a classical Sufi scholar fluent in Arabic, Persian, Urdu, and English.
You serve the NoorPath platform of Sufi Guidance™. Your translations preserve the spiritual depth
and classical tone of the original text.`;

  const prompt = `Translate the following passage into clear, literary Urdu.

Rules:
- Preserve the spiritual depth and classical tone — do not use overly modern or colloquial Urdu
- Keep Arabic or Persian terms as-is with brief Urdu explanations in brackets if needed
- Use proper Urdu script (not Roman Urdu)
- Return ONLY the Urdu translation — no English explanation, no preamble

Passage to translate:
"${text.trim()}"`;

  callClaude(system, prompt, 600, res);
});

// ── /api/ask-about ────────────────────────────────────────────────────
app.post('/api/ask-about', (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) return res.status(400).json({ error: 'No text provided' });

  const system = `You are a deeply learned Sufi scholar and spiritual guide, serving the NoorPath
platform of Sufi Guidance™ — the sacred platform of Akhtar Moeed Shah Al-Abidi and Raza Ali Shah Al-Abidi.
You guide sincere seekers with warmth, wisdom, and deep spiritual knowledge.`;

  const prompt = `A sincere seeker is reflecting on the following passage and wants your deep spiritual insight.

Please provide:
1. A rich spiritual reflection on this passage
2. Connections to broader Sufi tradition and classical texts (Rumi, Ibn Arabi, Al-Ghazali, etc.)
3. What inner work or practice this passage calls the seeker toward
4. A gentle question for the seeker to sit with and reflect upon

Tone: warm, wise, unhurried — like a compassionate teacher.
Length: 4–5 paragraphs.

Passage:
"${text.trim()}"`;

  callClaude(system, prompt, 900, res);
});

// ── /api/ask (existing — multi-turn chat) ────────────────────────────
app.post('/api/ask', (req, res) => {
  const { prompt, messages } = req.body;
  if (!prompt && (!messages || !messages.length)) return res.status(400).json({ error: 'No prompt provided' });

  const API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set' });

  // Support multi-turn: if messages array provided use it, else single turn
  const chatMessages = messages && messages.length
    ? messages
    : [{ role: 'user', content: prompt }];

  // Detect OpenRouter key (sk-or-v1-...) vs Anthropic key (sk-ant-...)
  const isOpenRouter = API_KEY.startsWith('sk-or-');

  if (isOpenRouter) {
    // ── OpenRouter (OpenAI-compatible format) ────────────────────────
    const orMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...chatMessages
    ];
    const payload = JSON.stringify({
      model: 'anthropic/claude-3.5-haiku',
      max_tokens: 512,
      messages: orMessages
    });
    const options = {
      hostname: 'openrouter.ai',
      path: '/api/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'NoorPath',
        'Content-Length': Buffer.byteLength(payload)
      }
    };
    const apiReq = https.request(options, (apiRes) => {
      let data = '';
      apiRes.on('data', chunk => data += chunk);
      apiRes.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) return res.status(400).json({ error: json.error.message || JSON.stringify(json.error) });
          const text = json.choices?.[0]?.message?.content;
          if (!text) return res.status(500).json({ error: 'Empty response', raw: data });
          res.json({ text });
        } catch (e) {
          res.status(500).json({ error: 'Parse error', raw: data });
        }
      });
    });
    apiReq.on('error', e => res.status(500).json({ error: e.message }));
    apiReq.write(payload);
    apiReq.end();

  } else {
    // ── Anthropic direct ────────────────────────────────────────────
    const payload = JSON.stringify({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: chatMessages
    });
    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(payload)
      }
    };
    const apiReq = https.request(options, (apiRes) => {
      let data = '';
      apiRes.on('data', chunk => data += chunk);
      apiRes.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) return res.status(400).json({ error: json.error.message });
          res.json({ text: json.content[0].text });
        } catch (e) {
          res.status(500).json({ error: 'Parse error', raw: data });
        }
      });
    });
    apiReq.on('error', e => res.status(500).json({ error: e.message }));
    apiReq.write(payload);
    apiReq.end();
  }
});

// ── AGENT: Tool definitions ──────────────────────────────────────────────────
const AGENT_TOOLS = [
  {
    name: 'abjad_calculator',
    description: 'Calculate the Abjad (Islamic numerological) value of any Arabic or Urdu word or phrase. Use this whenever the user asks about the numerical value, abjad, or adad of a word or name.',
    input_schema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'The Arabic or Urdu text to calculate the Abjad value for' }
      },
      required: ['text']
    }
  },
  {
    name: 'get_pricing',
    description: 'Get the exact consultation pricing for a specific country or region. Use this when the user asks about fees, costs, prices, or booking rates.',
    input_schema: {
      type: 'object',
      properties: {
        region: { type: 'string', description: 'Country or region name, e.g. "UK", "USA", "Pakistan", "India", "Middle East"' }
      },
      required: ['region']
    }
  },
  {
    name: 'get_service_info',
    description: 'Get detailed information about a specific NoorPath or Sufi Guidance service. Use this for questions about books, free clinic, AI tutor, Abjad calculator, or consultation types.',
    input_schema: {
      type: 'object',
      properties: {
        service: { type: 'string', description: 'Service name, e.g. "free_clinic", "books", "lightning_call", "subscription", "ultra_fast_track"' }
      },
      required: ['service']
    }
  }
];

// ── AGENT: Tool execution ─────────────────────────────────────────────────────
function executeTool(name, input) {
  if (name === 'abjad_calculator') {
    const ABJAD = {
      'ا':1,'أ':1,'إ':1,'آ':1,'ب':2,'ج':3,'د':4,'ه':5,'ة':5,'و':6,'ز':7,'ح':8,'ط':9,
      'ي':10,'ى':10,'ئ':10,'ك':20,'ل':30,'م':40,'ن':50,'س':60,'ع':70,'ف':80,'ص':90,
      'ق':100,'ر':200,'ش':300,'ت':400,'ث':500,'خ':600,'ذ':700,'ض':800,'ظ':900,'غ':1000
    };
    const text = input.text || '';
    let total = 0;
    const breakdown = [];
    for (const char of text) {
      if (ABJAD[char]) {
        total += ABJAD[char];
        breakdown.push(`${char} = ${ABJAD[char]}`);
      }
    }
    if (total === 0) return `No Abjad values found for "${text}". Please enter Arabic letters.`;
    return `Abjad value of "${text}": ${total}\nBreakdown: ${breakdown.join(', ')}`;
  }

  if (name === 'get_pricing') {
    const region = (input.region || '').toLowerCase();
    const pricing = {
      uk:          { standard:'GBP 125 (3 weeks)', ultra:'GBP 350 (7-10 days)', lightning:'GBP 800', subscription:'GBP 2,600', basri:'GBP 1,106', future:'GBP 440' },
      europe:      { standard:'GBP 125 (3 weeks)', ultra:'GBP 350 (7-10 days)', lightning:'GBP 800', subscription:'GBP 2,600' },
      usa:         { standard:'USD 170 (3 weeks)', ultra:'USD 404 (7-10 days)', lightning:'USD 1,070', subscription:'USD 3,500', basri:'USD 1,205', future:'USD 170' },
      canada:      { standard:'CAD 260 (3 weeks)', ultra:'CAD 602 (7-10 days)', lightning:'CAD 1,520', subscription:'CAD 4,400', basri:'CAD 1,700' },
      australia:   { standard:'AUD 260 (3 weeks)', ultra:'AUD 602 (7-10 days)', lightning:'AUD 1,610', subscription:'AUD 4,400', basri:'AUD 1,700' },
      pakistan:    { standard:'RS. 17,000 (60 days)', ultra:'RS. 44,000 (20-25 days)', lightning:'RS. 350,000', subscription:'RS. 530,000', basri:'RS. 260,000' },
      india:       { standard:'RS. 9,800 (60 days)', ultra:'RS. 19,700 (20-25 days)', lightning:'RS. 125,000', basri:'RS. 170,000' },
      bangladesh:  { standard:'BDT 9,800 (60 days)', ultra:'BDT 19,700 (20-25 days)', lightning:'BDT 125,000', basri:'BDT 170,000' },
      'middle east':{ standard:'DHS 395 (60 days)', ultra:'DHS 710 (20-25 days)', lightning:'DHS 3,500', subscription:'DHS 15,200' }
    };
    const match = Object.keys(pricing).find(k => region.includes(k));
    if (!match) return `Pricing not found for "${input.region}". Available regions: UK, Europe, USA, Canada, Australia, Pakistan, India, Bangladesh, Middle East.`;
    const p = pricing[match];
    return `Pricing for ${match.toUpperCase()}:\n` + Object.entries(p).map(([k,v]) => `• ${k}: ${v}`).join('\n');
  }

  if (name === 'get_service_info') {
    const s = (input.service || '').toLowerCase().replace(/[_\s]/g, '');
    const services = {
      freeclinic: 'Free Clinic: 44+ SG WhatsApp Support Groups, weekly calls, free for everyone. Est. 2-3 month wait for Lounge 44, then 25-30 days for Support Groups. Join via WhatsApp: +447909286400',
      books: '6 Sacred Books by Akhtar Moeed Shah Al-Abidi:\n1. Mathematical Mysteries of Alphabets\n2. Yaseen Wird-e-Mubeen\n3. Jafr-e-Jamia (28 volumes)\n4. Jafr-e-Ahmar (14 volumes)\n5. Seerat-e-Muhammad (Urdu)\n6. Divine Prophecy Divine\nContact +447909286400 to obtain.',
      abjadcalculator: 'Free Abjad Calculator on NoorPath — calculates numerical values of Arabic letters using the classical Abjad system. Available at noorpath.co.uk',
      lighteningcall: 'Lightning Call: ~35 min emergency session with Shah Saab. Book via +44 7940 000 344 (VIP/Lightning Line only).',
      lightningcall: 'Lightning Call: ~35 min emergency session with Shah Saab. Book via +44 7940 000 344 (VIP/Lightning Line only).',
      subscription: '12 or 18-month personal subscription: priority update calls, personal access, monthly connection with Shah Saab. Book via +44 7909 286400.',
      ultrafasttrack: 'Ultra-Fast Track: 7-10 day consultation wait (vs 3 weeks standard). Higher price. Book via +44 7909 286400.',
      consultation: 'Standard Consultation: ~3 week wait. Book via +44 7909 286400. Make payments ONLY on verified prebook lines.',
      aitutor: 'AI Tutor: Available 24/7 on NoorPath, answers questions in English & Urdu about Sufi knowledge, classical texts, and spiritual guidance.',
    };
    const match = Object.keys(services).find(k => s.includes(k) || k.includes(s));
    if (!match) return `Service info not found for "${input.service}".`;
    return services[match];
  }

  return 'Unknown tool.';
}

// ── /api/agent ────────────────────────────────────────────────────────────────
app.post('/api/agent', async (req, res) => {
  const { messages: chatMessages } = req.body;
  if (!chatMessages || !chatMessages.length) return res.status(400).json({ error: 'No messages provided' });

  const API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set' });
  if (API_KEY.startsWith('sk-or-')) return res.status(400).json({ error: 'Agent requires Anthropic API key, not OpenRouter' });

  const client = new Anthropic({ apiKey: API_KEY });

  try {
    let messages = [...chatMessages];

    // Agentic loop — max 5 iterations
    for (let i = 0; i < 5; i++) {
      const response = await client.messages.create({
        model: 'claude-opus-4-6',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        tools: AGENT_TOOLS,
        messages
      });

      if (response.stop_reason === 'end_turn') {
        const text = response.content.find(b => b.type === 'text')?.text || '';
        return res.json({ text });
      }

      if (response.stop_reason === 'tool_use') {
        // Append assistant turn
        messages.push({ role: 'assistant', content: response.content });

        // Execute all tool calls
        const toolResults = response.content
          .filter(b => b.type === 'tool_use')
          .map(b => ({
            type: 'tool_result',
            tool_use_id: b.id,
            content: executeTool(b.name, b.input)
          }));

        messages.push({ role: 'user', content: toolResults });
        continue;
      }

      // Any other stop reason — return whatever text we have
      const text = response.content.find(b => b.type === 'text')?.text || '';
      return res.json({ text });
    }

    res.json({ text: 'I reached the maximum steps. Please try again.' });
  } catch (err) {
    console.error('Agent error:', err);
    res.status(500).json({ error: err.message || 'Agent error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`\n✦ NoorPath running at http://localhost:${PORT}\n`));
