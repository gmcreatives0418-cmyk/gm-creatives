import styles from './Hero.module.css';

const MARQUEE_ITEMS = [
  'Brand Identity', 'Web Design', 'Motion Design',
  'Google Ads', 'UI / UX', 'Digital Marketing',
  'Graphic Design', 'Web Development', 'Meta Ads',
];

export default function Ticker() {
  return (
    <div className={styles.ticker} aria-hidden="true">
      <div className={styles.tickerTrack}>
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span key={i} className={styles.tickerItem}>
            {item} <span className={styles.tickerDot}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
