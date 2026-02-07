import styles from './page.module.css';

export default function WorkflowsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Workflows</h1>
        <p className={styles.description}>Short videos on how I build stuff with AI</p>
      </div>
    </div>
  );
}
