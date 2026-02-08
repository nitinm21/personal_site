import styles from './page.module.css';

export default function BehindTheScenesPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>BTS</h1>
        <p className={styles.description}>Short videos on how I build stuff with AI</p>
        <div className={styles.videoCard}>
          <div className={styles.videoEmbed}>
            <iframe
              loading="lazy"
              src="https://www.canva.com/design/DAHArooHll4/kasH8Mc7UmAAj-8kKMM2xQ/watch?embed"
              title="Building a /blog page for my site"
              allowFullScreen
              allow="fullscreen"
            />
          </div>
          <p className={styles.videoMeta}>
            <a
              href="https://www.canva.com/design/DAHArooHll4/kasH8Mc7UmAAj-8kKMM2xQ/watch?utm_content=DAHArooHll4&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Building a /blog page for my site
            </a>{' '}
            by Nitin Murali
          </p>
        </div>
      </div>
    </div>
  );
}
