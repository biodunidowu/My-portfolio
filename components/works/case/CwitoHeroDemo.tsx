"use client";
/* eslint-disable @next/next/no-img-element -- small decorative crops drawn inside a scaled stage */

import { Work_Sans } from "next/font/google";
import { Stage } from "@/components/stageshow/kit/stage";
import { Phone } from "@/components/stageshow/kit/phone";
import { Roll } from "@/components/stageshow/kit/motion/Roll";
import type { Act } from "@/components/stageshow/kit/act";
import "./CwitoHeroDemo.css";

// Cwito's own typeface. Only this page uses it, so it isn't preloaded
// (Next would also preload it on every page that links here).
const workSans = Work_Sans({
  subsets: ["latin"],
  weight: "variable",
  preload: false,
  variable: "--font-cw",
});

/**
 * The case study's hero: the design's row of three screens, with the middle
 * one live. Story, once in view: the Reward Center, tap Points, Redeem Now,
 * choose 100pts and watch it become ₦1,000, Redeem, and the payout lands.
 * It makes the case study's point (points are worth real naira) in the app's
 * own screens.
 *
 * Real strings: Reward Center and its two balances, Points 150, Redeem Now,
 * the sheet (Amount, 100pts, You will receive ₦1,000, Redeem), and the
 * success screen. Lists that aren't the story are quiet.
 */

type Screen = "center" | "points" | "success";
type S = { screen: Screen; sheet: boolean; amount: number };

const START: S = { screen: "center", sheet: false, amount: 0 };
// The frame that tells the story on its own: 100 points become ₦1,000
const POSTER: S = { screen: "points", sheet: true, amount: 100 };

const IMG = "/images/works/cwito-case/";
const POINTS = 150;
// 10 points = ₦100
const naira = (pts: number) => pts * 10;
const ngn = (n: number) => n.toLocaleString("en-NG");

const script = async (a: Act<S>) => {
  await a.wait(1400);
  a.mark("points");
  await a.click({ at: "points-tile", x: 0.78, y: 0.7 });
  a.put({ screen: "points" });
  await a.wait(1500);
  a.mark("redeem-now");
  await a.click({ at: "redeem-now", x: 0.8, y: 0.65 });
  a.put({ sheet: true });
  await a.wait(1500);
  a.mark("amount");
  await a.click({ at: "chip-100", x: 0.75, y: 0.7 });
  a.put({ amount: 100 });
  await a.wait(1900);
  a.mark("redeem");
  await a.click({ at: "redeem", x: 0.7, y: 0.6 });
  a.put({ sheet: false, screen: "success" });
  await a.wait(2400);
};

function Back() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden className="cw-icon">
      <path d="M20 12H4m0 0 6.5-6.5M4 12l6.5 6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Help() {
  return (
    <span className="cw-help" aria-hidden>
      <svg viewBox="0 0 24 24" width="20" height="20">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9.6 9.4a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.2-2.4 3.7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="17" r="1.1" fill="currentColor" />
      </svg>
    </span>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden className="cw-icon">
      <path d="m9 6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Close() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden className="cw-icon">
      <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** The dark header both reward screens share: back, title, help. */
function Header({ title }: { title: string }) {
  return (
    <div className="cw-nav">
      <Back />
      <span className="cw-nav__title">{title}</span>
      <Help />
    </div>
  );
}

function RewardCenter() {
  return (
    <div className="cw-page cw-center">
      <div className="cw-head">
        <Header title="Reward Center" />
        <div className="cw-balances">
          <div className="cw-tile">
            <span className="cw-tile__label">Cashback</span>
            <span className="cw-tile__value">
              <img src={`${IMG}demo/coin.webp`} alt="" width={26} height={26} className="cw-coin" />
              ₦0
            </span>
            <Chevron />
          </div>
          <div className="cw-tile" data-target="points-tile">
            <span className="cw-tile__label">Points</span>
            <span className="cw-tile__value">
              <img src={`${IMG}demo/ticket.webp`} alt="" width={30} height={23} />
              {POINTS}
            </span>
            <Chevron />
          </div>
        </div>
      </div>
      {/* Refer Friends, Streaks, Spin and win: the product's own art */}
      <img src={`${IMG}demo/shortcuts.webp`} alt="" className="cw-shortcuts" width={402} height={124} />
      <div className="cw-tasks">
        <div className="cw-task">
          <span className="cw-task__kind">
            <img src={`${IMG}demo/coin.webp`} alt="" width={20} height={20} className="cw-coin" />
            Cashback
          </span>
          <div className="cw-task__card">
            <span className="cw-task__title">Trade above ₦1,000,000 and Earn ₦5,000 Cashback</span>
            <span className="cw-task__row">
              <span>Reward:</span>
              <span className="cw-task__value">₦5,000</span>
            </span>
          </div>
        </div>
        <div className="cw-task">
          <span className="cw-task__kind">
            <img src={`${IMG}demo/ticket.webp`} alt="" width={24} height={18} />
            Points
          </span>
          <div className="cw-task__card">
            <span className="cw-task__title">Complete 7-day Login Streak and Earn 10 Points</span>
            <span className="cw-task__row">
              <span>Progress:</span>
              <span className="cw-task__value">6/7 Days</span>
            </span>
            <span className="cw-task__track">
              <span style={{ width: "86%" }} />
            </span>
          </div>
        </div>
        <div className="cw-task">
          <span className="cw-task__kind">
            <img src={`${IMG}demo/ticket.webp`} alt="" width={24} height={18} />
            Points
          </span>
          <div className="cw-task__card">
            <span className="cw-task__title">Refer a friend and earn 20 points.</span>
            <span className="cw-task__row">
              <span>Progress:</span>
              <span className="cw-task__value">0/1</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const HISTORY = [
  { title: "Daily Login Streak", status: "Claimed", pts: "+10pts" },
  { title: "Referral Bonus", status: "Claimed", pts: "+20pts" },
  { title: "Micro Trade", status: "Pending", pts: "+10pts" },
  { title: "Referral Bonus", status: "Claimed", pts: "+20pts" },
  { title: "Daily Login Streak", status: "Claimed", pts: "+10pts" },
  { title: "Micro Trade", status: "Claimed", pts: "+10pts" },
];

function PointsScreen({ s }: { s: S }) {
  return (
    <div className="cw-page cw-points">
      <div className="cw-head cw-head--short">
        <Header title="Points" />
        <div className="cw-tile cw-tile--wide">
          <span className="cw-tile__stack">
            <span className="cw-tile__label">Points</span>
            <span className="cw-tile__value">
              <img src={`${IMG}demo/ticket.webp`} alt="" width={30} height={23} />
              {POINTS}
            </span>
            <span className="cw-tile__worth">~₦{ngn(naira(POINTS))}</span>
          </span>
          <span className="cw-pill" data-target="redeem-now" data-on={s.sheet || undefined}>
            Redeem Now
          </span>
        </div>
      </div>
      <div className="cw-history">
        <div className="cw-history__head">
          <span>Points History</span>
          <span className="cw-history__all">View all</span>
        </div>
        {HISTORY.map((r, i) => (
          <div key={i} className="cw-history__row">
            <img src={`${IMG}demo/row-ticket.webp`} alt="" width={34} height={34} className="cw-history__icon" />
            <span className="cw-history__text">
              <span className="cw-history__title">{r.title}</span>
              <span className="cw-history__status" data-status={r.status}>
                {r.status}
              </span>
            </span>
            <span className="cw-history__pts">{r.pts}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sheet({ s }: { s: S }) {
  const chips = [50, 100, 150];
  return (
    <>
      <div className="cw-scrim" data-on={s.sheet || undefined} />
      <div className="cw-sheet" data-on={s.sheet || undefined}>
        <div className="cw-sheet__head">
          <span className="cw-sheet__title">Redeem Points</span>
          <Close />
        </div>
        <div className="cw-sheet__label">
          <span>Amount</span>
          <span className="cw-sheet__balance">Balance: {POINTS}pts</span>
        </div>
        <div className="cw-field" data-filled={s.amount > 0 || undefined}>
          <span className="cw-field__placeholder">Enter Amount</span>
          <span className="cw-field__value">{s.amount || ""}</span>
        </div>
        <span className="cw-sheet__hint">Choose an amount</span>
        <div className="cw-chips">
          {chips.map((c) => (
            <span key={c} className="cw-chip" data-target={`chip-${c}`} data-on={s.amount === c || undefined}>
              {c}pts
            </span>
          ))}
        </div>
        <span className="cw-sheet__label">You will receive</span>
        <div className="cw-field cw-field--receive">
          {/* Rolls only what changed: 0 becomes 1,000 */}
          <Roll>{`₦${ngn(naira(s.amount))}`}</Roll>
        </div>
        <span className="cw-button" data-target="redeem">
          Redeem
        </span>
      </div>
    </>
  );
}

function Success({ s }: { s: S }) {
  return (
    <div className="cw-page cw-success">
      <span className="cw-success__back">
        <Back />
      </span>
      <img src={`${IMG}demo/badge.webp`} alt="" width={76} height={76} className="cw-success__badge" data-on={s.screen === "success" || undefined} />
      <span className="cw-success__title">Withdrawal Successful!</span>
      <span className="cw-success__body">₦{ngn(naira(100))} has been credited to your Cwito naira account instantly.</span>
      <span className="cw-button cw-button--raised">Back Home</span>
    </div>
  );
}

const ORDER: Screen[] = ["center", "points", "success"];
/** A pushed screen sits on the right until it arrives; the one it covers moves left a third. */
const place = (screen: Screen, current: Screen) => {
  const d = ORDER.indexOf(screen) - ORDER.indexOf(current);
  return d === 0 ? "here" : d > 0 ? "ahead" : "behind";
};

function LivePhone({ s, width }: { s: S; width: number }) {
  return (
    <Phone width={width} frame="bare" status dark={s.screen !== "success"} className="cw-phone cw-phone--live">
      <div className="cw-screens">
        <div className="cw-layer" data-place={place("center", s.screen)}>
          <RewardCenter />
        </div>
        <div className="cw-layer" data-place={place("points", s.screen)}>
          <PointsScreen s={s} />
          <Sheet s={s} />
        </div>
        <div className="cw-layer" data-place={place("success", s.screen)}>
          <Success s={s} />
        </div>
      </div>
    </Phone>
  );
}

function StillPhone({ src, width, style }: { src: string; width: number; style?: React.CSSProperties }) {
  return (
    <Phone
      width={width}
      frame="bare"
      className="cw-phone"
      wallpaper={`url(${src}) center / cover no-repeat`}
      style={style}
      aria-hidden
    />
  );
}

export default function CwitoHeroDemo() {
  return (
    <figure className={`${workSans.variable} cw-demo`}>
      <Stage<S>
        width={1128}
        height={800}
        compact={{ below: 700, width: 358, height: 722 }}
        initial={START}
        poster={POSTER}
        script={script}
        play="once"
        cursor={{ at: { wide: { x: 700, y: 700 }, compact: { x: 300, y: 650 } }, style: "touch" }}
        className="cw-stage"
      >
        {(s, _rect, layout) =>
          layout === "compact" ? (
            <div className="cw-solo">
              <LivePhone s={s} width={310} />
            </div>
          ) : (
            <div className="cw-row">
              <StillPhone src={`${IMG}hero-prompt.webp`} width={326} />
              <LivePhone s={s} width={326} />
              <StillPhone src={`${IMG}hero-spin.webp`} width={326} />
            </div>
          )
        }
      </Stage>
      <figcaption className="sr-only">
        The Cwito Reward Center. Tapping Points opens the points screen; redeeming 100 points shows you will receive ₦1,000, and
        the withdrawal is confirmed as credited to your Cwito naira account. Beside it, the launch prompt and the spin and win
        wheel.
      </figcaption>
    </figure>
  );
}
