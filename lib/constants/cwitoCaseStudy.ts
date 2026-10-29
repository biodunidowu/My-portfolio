const BASE = "/images/works/cwito-case/";

export type Shot = {
  src: string;
  alt: string;
  /** Rendered size on desktop (the design's 1440 frame). */
  width: number;
  height: number;
  radius?: number;
  /** Label above the shot (Before / After). */
  label?: string;
};

/**
 * A grey panel of phone screens.
 * - `row`: screens side by side at full height; on phones the row scrolls sideways.
 * - `crop`: screens rise from the bottom edge, cropped to `visible` px of height.
 */
export type Visual = {
  layout: "row" | "crop";
  shots: Shot[];
  /** Space between screens on desktop. */
  gap: number;
  /** Dashed border (the design's "visual slot" panels) instead of solid. */
  dashed?: boolean;
  /** Panel height on desktop for `row` panels with screens centred in it. */
  height?: number;
  /** `crop`: px of each screen shown, and the space above it. */
  visible?: number;
  top?: number;
  caption?: string;
};

export type Block =
  | { kind: "p"; text: string }
  /** The section's closing question, set darker and medium. */
  | { kind: "question"; text: string }
  /** A paragraph that opens with a bold lead-in. */
  | { kind: "lead"; lead: string; text: string };

export type Card = {
  eyebrow: string;
  title: string;
  /** Small mono note under the title (feedback cards). */
  note?: string;
  body?: string;
  footLabel: string;
  foot: string;
};

export type Stat = { value: string; label: string };

export type Section = {
  id: string;
  /** Short name for the section rail. */
  nav: string;
  eyebrow: string;
  title: string;
  blocks: Block[];
  cards?: Card[];
  stats?: Stat[];
  statsNote?: string;
  visuals?: Visual[];
};

const phone = (
  file: string,
  alt: string,
  width: number,
  height: number,
  extra: Partial<Shot> = {},
): Shot => ({ src: BASE + file, alt, width, height, radius: 12, ...extra });

export const cwitoCaseStudy = {
  slug: "cwito",
  crumb: "Case study  /  Cwito  /  Reward Center",
  title: "Cwito Reward Center: giving people a reason to trade again",
  intro:
    "How I designed rewards for a crypto app as its only designer, and why I simplified them before launch.",
  meta: [
    { label: "Role", value: "Sole product designer. Led the Reward Center." },
    { label: "Team", value: "PM, mobile, web and backend engineers, support, and me" },
    { label: "Timeline", value: "2 weeks" },
  ],
  hero: {
    layout: "row",
    gap: 40,
    height: 800,
    shots: [
      phone("hero-prompt.webp", "Launch prompt over the Cwito home screen: “You can now earn rewards on Cwito”", 326, 706),
      phone("hero-center.webp", "Reward Center with cashback and points balances, three ways to earn, and tasks", 326, 706),
      phone("hero-spin.webp", "Spin and win wheel with cashback and points prizes", 332, 718),
    ],
  } satisfies Visual,
  tldr: {
    body: "Cwito lets people buy and sell crypto and get paid straight to their bank. To grow and keep users, I designed a Reward Center: cashback for trading, and points for referrals, streaks and spin. Version one felt overly designed, so I simplified it before launch.",
    resultLead: "The result:",
    result:
      "over 2,000 new users joined in the first few months after launch to earn rewards and trade.",
  },
  sections: [
    {
      id: "context",
      nav: "Context",
      eyebrow: "01 / Context",
      title: "A small team moving fast",
      blocks: [
        { kind: "p", text: "I joined in February 2025. Cwito had over 5,000 users and close to ₦1 billion in transactions. There was a design system but no process and no PRDs: the PM picked the feature, shared competitors, and we built, fast." },
        { kind: "p", text: "Cwito doesn't hold crypto. It converts what you receive straight to your bank account, so there's no in-app balance for a reward to live in." },
      ],
    },
    {
      id: "problem",
      nav: "The problem",
      eyebrow: "02 / The problem",
      title: "Nothing brought people back between trades",
      blocks: [
        { kind: "p", text: "Paying straight to the bank is Cwito's strength, but it made growth hard. Once a trade is done, there's nothing to come back for." },
        { kind: "p", text: "Meanwhile, Opay and Palmpay, apps our users open every day, had made cashback and points normal. Next to them, Cwito was a tool, not a habit." },
        { kind: "p", text: "The business needed one feature to do three jobs: more trades, more referrals, and a reason to choose Cwito." },
        { kind: "question", text: "How do you reward loyalty in an app people leave as soon as they're paid?" },
      ],
    },
    {
      id: "research",
      nav: "Research",
      eyebrow: "03 / Research",
      title: "What Opay and Palmpay taught me about rewards",
      blocks: [
        { kind: "p", text: "The PM pointed me to Opay, Palmpay, Deex and others. For each, I asked: what earns a reward, what is it worth, and where can you use it? Three patterns stood out." },
      ],
      cards: [
        {
          eyebrow: "Finding 01",
          title: "Most rewards stay locked inside the app",
          body: "Opay pays cashback as vouchers for airtime or data. Palmpay's points are spent back in the app.",
          footLabel: "What I did for Cwito",
          foot: "Cwito holds no balance, so vouchers had nowhere to go. I made points worth naira (10 points = ₦100) and withdrawable.",
        },
        {
          eyebrow: "Finding 02",
          title: "The reward follows the main action",
          body: "Opay and Palmpay reward bills, airtime and transfers: what users already do daily.",
          footLabel: "What I did for Cwito",
          foot: "Trading is what Cwito needs, so cashback rewards trading volume. Points cover referrals, streaks and spin.",
        },
        {
          eyebrow: "What I left out",
          title: "Too many kinds of reward",
          body: "Palmpay mixes PalmPoints, coupons, cashback and Trial Cash, each with its own rules.",
          footLabel: "What I did instead",
          foot: "Two balances, cashback and points, side by side, so people always know what they've earned.",
        },
      ],
    },
    {
      id: "two-rewards",
      nav: "Cashback and points",
      eyebrow: "04 / Decision 1",
      title: "Two kinds of reward: cashback and points",
      blocks: [
        { kind: "p", text: "I split rewards into two balances. Cashback rewards trading: trade up to ₦5 million, earn ₦5,000. Points reward everything else: referrals, daily streaks, and spin and win." },
      ],
      visuals: [
        {
          layout: "crop",
          gap: 0,
          visible: 597,
          top: 43,
          shots: [phone("d1-center.webp", "Reward Center: cashback and points balances, Refer Friends, Streaks and Spin and win, then cashback and points tasks with progress", 383, 829)],
          caption: "Cashback and points up top, three ways to earn, and tasks with progress below.",
        },
      ],
    },
    {
      id: "real-money",
      nav: "Points worth money",
      eyebrow: "05 / Decision 2",
      title: "Make points worth real money",
      blocks: [
        { kind: "p", text: "Points aren't just a score: 10 points = ₦100. Once users reach the minimum, they can withdraw their points to their wallet as cash." },
      ],
      visuals: [
        {
          layout: "row",
          gap: 18,
          dashed: true,
          shots: [
            phone("d2-points.webp", "Points screen with balance, Redeem Now and points history", 271, 599, { radius: 0 }),
            phone("d2-redeem.webp", "Redeem Points sheet: enter an amount or choose 100, 500 or 300 points", 271, 599, { radius: 0 }),
            phone("d2-success.webp", "Withdrawal Successful: the amount has been credited to your Cwito naira account", 271, 599, { radius: 0 }),
          ],
        },
      ],
    },
    {
      id: "simplify",
      nav: "Simplify after feedback",
      eyebrow: "06 / Decision 3",
      title: "Simplify after feedback",
      blocks: [
        { kind: "p", text: "I had a clear structure in mind, so I moved fast on version one. My PM's feedback was direct, and I went back to the drawing board. After a second round of feedback, it was ready." },
      ],
      cards: [
        {
          eyebrow: "01",
          title: "“Contrast is low, improve on this.”",
          note: "PM feedback on version one",
          footLabel: "What changed",
          foot: "Removed the faded grey cards and pale labels. Balances now sit on solid tiles in the dark header, and task titles are dark teal on white.",
        },
        {
          eyebrow: "02",
          title: "“It feels overly designed, make it simpler and easy for our users to understand.”",
          note: "PM feedback on version one",
          footLabel: "What changed",
          foot: "Cut the treasure chest and the day-by-day streak tracker. The screen now opens on two balances and three shortcuts.",
        },
        {
          eyebrow: "03",
          title: "“We don't do deposit.”",
          note: "PM feedback on version one",
          footLabel: "What changed",
          foot: "Removed the USDT deposit task and USDT rewards. Every task now comes from trading and pays in naira or points.",
        },
      ],
      visuals: [
        {
          layout: "crop",
          gap: 166,
          dashed: true,
          visible: 611,
          top: 51,
          shots: [
            phone("d3-before.webp", "Version one: a treasure chest, total points, a weekly streak tracker and USDT tasks", 381, 903, { label: "Before" }),
            phone("d3-after.webp", "Shipped version: cashback and points tiles, three shortcuts and naira tasks", 383, 829, { label: "After" }),
          ],
        },
      ],
    },
    {
      id: "announce",
      nav: "Announce once",
      eyebrow: "07 / Decision 4",
      title: "Announce once, then keep rewards on home",
      blocks: [
        { kind: "p", text: "Most people open Cwito to trade and leave, so a feature in a menu would go unseen. At launch, a one-time prompt told everyone they could now earn, with one next step, Get started, and an easy way out, Later." },
        { kind: "p", text: "Showing it every time would turn good news into a nag. After that first view, a banner on home, above Buy Crypto, shows the next reward right before people trade." },
      ],
      visuals: [
        {
          layout: "row",
          gap: 64,
          shots: [
            phone("d4-prompt.webp", "One-time launch prompt: “You can now earn rewards on Cwito” with Get started and Later", 326, 706),
            phone("d4-home.webp", "Home after launch: a “50 Cwito points awaits” banner above Buy Crypto", 326, 706),
          ],
          caption: "Left: the one-time launch prompt. Right: after launch, the next reward stays visible at the top of home.",
        },
        {
          layout: "row",
          gap: 12,
          dashed: true,
          shots: [
            phone("d4-rules.webp", "Streak rules sheet explaining how daily streaks earn vouchers", 282, 605, { radius: 14 }),
            phone("d4-streak.webp", "Streaks screen: a two-day streak with the weekly tracker and its task", 282, 605, { radius: 14 }),
            phone("d4-ended.webp", "Streak ended prompt: “Your streak of 2 days has ended” with Start again", 282, 605, { radius: 14 }),
          ],
        },
      ],
    },
    {
      id: "result",
      nav: "Result",
      eyebrow: "08 / Result",
      title: "Over 2,000 new users after launch",
      blocks: [
        { kind: "p", text: "After two rounds of feedback and QA, the Reward Center went live. In the first few months, over 2,000 new users joined to earn rewards and trade." },
        { kind: "p", text: "What shipped: cashback for trading, points for referrals, streaks and spin, points you can withdraw as naira, a launch prompt and a home banner." },
      ],
      stats: [
        { value: "5,000+", label: "users when I joined" },
        { value: "10,000+", label: "active users by December 2025" },
        { value: "₦2.5B", label: "processed by December 2025" },
      ],
      statsNote: "Platform context: many things drove this growth, not the Reward Center alone.",
    },
    {
      id: "reflection",
      nav: "Reflection",
      eyebrow: "09 / Reflection",
      title: "What I'd do differently",
      blocks: [
        { kind: "lead", lead: "Show the rough version sooner.", text: "I polished version one before anyone saw it. The PM's three comments would have been cheaper to hear on a rough layout. Next time, I'll share the structure first and polish after." },
        { kind: "lead", lead: "Agree on success before designing.", text: "With no PRD, we never set a target for the Reward Center. Next time, I'll agree one metric with the PM up front, like weekly trades per user, and check it a month after launch." },
        { kind: "lead", lead: "What I'd keep:", text: "start from how competitors do it, then ask how it fits a product that never holds your money. That question made points worth real naira." },
      ],
    },
  ] satisfies Section[],
  next: { name: "Gambit", href: undefined as string | undefined },
};
