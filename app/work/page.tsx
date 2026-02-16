'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useSpotlightReveal } from '@/utils/useSpotlightReveal';
import styles from './page.module.css';

interface ExperienceItem {
  title: string;
  company: string;
  companyUrl?: string;
  years: string;
  description?: string;
  highlights?: string[];
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
    years: '2025 - Present',
    highlights: [
      'Building products for IP Attorneys to help them file patents faster and more efficiently.',
    ],
  },
  {
    title: 'Product Manager',
    company: 'SurveySparrow',
    companyUrl: 'https://surveysparrow.com/',
    years: '2021 - 2023',
    highlights: [
      'Built an AI-powered survey generator leveraging LLMs to translate user goals into ready-to-send surveys, driving a 40% reduction in survey creation time and a 5% increase in free-to-paid conversion rate.',
      'Revamped the monetization model with Consumption-Based Pricing, resulting in a 16% increase in Net Retention Rate and 18% growth in Expansion Revenue within 4 months of implementation.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Institute of Product Leadership',
    companyUrl: 'https://www.productleadership.com/',
    years: '2020 - 2021',
    highlights: [
      'Successfully reduced web application load times by 40%, with asynchronous loading of non-critical resources, caching strategies, and image optimization.',
      'Designed and developed 40+ web pages with programmatic SEO using React and a custom CMS, resulting in a 45% increase in organic registrations.',
    ],
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
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);

  useSpotlightReveal(containerRef);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.revealLayer} aria-hidden="true" />
      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section className={styles.section} variants={itemVariants}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <motion.div className={styles.list} variants={listVariants}>
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
                    <span className={styles.title}>{item.title},</span>{' '}
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
                {item.highlights && item.highlights.length > 0 && (
                  <ul className={styles.highlights}>
                    {item.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className={styles.highlight}>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section className={styles.section} variants={itemVariants}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <motion.div className={styles.list} variants={listVariants}>
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
          </motion.div>
        </motion.section>
      </motion.div>
    </div>
  );
}
