'use client';

import { motion } from 'framer-motion';
import styles from './page.module.css';

interface ExperienceItem {
  title: string;
  company: string;
  companyUrl?: string;
  years: string;
  description?: string;
}

interface EducationItem {
  degree: string;
  school: string;
  years: string;
}

const experience: ExperienceItem[] = [
  {
    title: 'AI Product Manager',
    company: 'Patent Response',
    years: '2023 - Present',
    description: 'Building document processing pipelines that reduced patent rejection rates by 45%.',
  },
  {
    title: 'Product Manager',
    company: 'SurveySparrow',
    companyUrl: 'https://surveysparrow.com/',
    years: '2020 - 2023',
    description: 'Led Core and API teams. Revamped monetization with consumption-based pricing (16% NRR increase) and shipped the first AI-survey generator (40% faster creation).',
  },
  {
    title: 'Software Engineer',
    company: 'Your Company',
    years: '2018 - 2020',
    description: 'Started as an engineer. Shipped code to production, so I know what I\'m asking for when I write a spec.',
  },
];

const education: EducationItem[] = [
  {
    degree: 'Master of Science in Artificial Intelligence',
    school: 'Illinois Institute of Technology',
    years: '2023 - 2025',
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Work() {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section className={styles.section} variants={itemVariants}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.list}>
            {experience.map((item, index) => (
              <motion.div
                key={index}
                className={styles.item}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.itemHeader}>
                  <div className={styles.role}>
                    <span className={styles.title}>{item.title}</span>
                    <span className={styles.separator}>,</span>
                    {item.companyUrl ? (
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.companyLink}
                      >
                        {item.company}
                      </a>
                    ) : (
                      <span className={styles.company}>{item.company}</span>
                    )}
                  </div>
                  <span className={styles.years}>{item.years}</span>
                </div>
                {item.description && (
                  <p className={styles.description}>{item.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className={styles.section} variants={itemVariants}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <div className={styles.list}>
            {education.map((item, index) => (
              <motion.div
                key={index}
                className={styles.item}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.itemHeader}>
                  <div className={styles.role}>
                    <span className={styles.title}>{item.degree}</span>
                  </div>
                  <span className={styles.years}>{item.years}</span>
                </div>
                <p className={styles.school}>{item.school}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
