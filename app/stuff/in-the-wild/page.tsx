'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useViewMode } from '@/contexts/ViewModeContext';
import styles from './page.module.css';

interface WildItem {
  id: string;
  title: string;
  subtitle?: string;
  videoUrl?: string;
  linkedInUrl: string;
  image: string;
  imageAlt: string;
  category: 'speaking' | 'fireside';
}

export default function InTheWild() {
  const { viewMode } = useViewMode();
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<'speaking' | 'fireside'>('speaking');
  const coverflowStageRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const speakingSectionRef = useRef<HTMLElement>(null);
  const firesideSectionRef = useRef<HTMLElement>(null);

  const items: WildItem[] = [
    {
      id: 'hawkbot',
      title: 'HawkBot Presentation - Techqueria 2024',
      subtitle: 'Demoed and presented the story of building the HawkBot for my university (Illinois Institute of Technology).',
      videoUrl: 'https://youtu.be/UWDaI6g_cp8',
      linkedInUrl: 'https://www.linkedin.com/posts/activity-7251626565594173444-kSYt',
      image: '/hawkbot-presentation.jpg',
      imageAlt: 'HawkBot Presentation at Techqueria 2024',
      category: 'speaking',
    },
    {
      id: 'elastic',
      title: 'Phone call with Steve Jobs at the Elastic User Group',
      subtitle: 'Demoed an AI-powered phone call with Steve Jobs using Elasticsearch at the Chicago Elastic User Group.',
      videoUrl: 'https://youtu.be/wmOfrbRLl-k',
      linkedInUrl: 'https://www.linkedin.com/posts/activity-7308580318423261186-cgaR',
      image: '/elastic-talk.jpeg',
      imageAlt: 'Phone call with Steve Jobs at the Elastic User Group',
      category: 'speaking',
    },
    {
      id: 'david-giard',
      title: 'AI Masterclass with David Giard',
      subtitle: 'Partner Solution Architect, Microsoft',
      linkedInUrl: 'https://www.linkedin.com/posts/activity-7182502375469801472-4cW7',
      image: '/david-giard.jpeg',
      imageAlt: 'AI Masterclass with David Giard, Partner Solution Architect, Microsoft',
      category: 'fireside',
    },
    {
      id: 'lance-fortnow',
      title: 'Future of AI and CS with Dr. Lance Fortnow',
      subtitle: 'Dean, Illinois Institute of Technology',
      videoUrl: 'https://youtu.be/g5mt8R6-v4E',
      linkedInUrl: 'https://www.linkedin.com/posts/activity-7242289458736218112-bAZ5',
      image: '/lance_event.jpeg',
      imageAlt: 'Future of AI and CS with Dr. Lance Fortnow, Dean, Illinois Institute of Technology',
      category: 'fireside',
    },
    {
      id: 'avinash-ravi',
      title: 'WTF is Product Management with Avinash Ravi',
      subtitle: 'Lead Product Manager, AT&T',
      videoUrl: 'https://youtu.be/3GvX8vYWGrM',
      linkedInUrl: 'https://www.linkedin.com/posts/activity-7244116588604391424-CLXp',
      image: '/avinash_ravi.jpeg',
      imageAlt: 'WTF is Product Management with Avinash Ravi, Lead Product Manager, AT&T',
      category: 'fireside',
    },
    {
      id: 'grabackis',
      title: 'Fundamentals of Product Management with the Grabackis',
      subtitle: 'Tim & Silvia, Ex-Directors, Motorola Solutions',
      videoUrl: 'https://youtu.be/QEdhMC7K-Ak',
      linkedInUrl: 'https://www.linkedin.com/posts/activity-7295477709860655104-krFr',
      image: '/tim_event.jpeg',
      imageAlt: 'Fundamentals of Product Management with the Grabackis (Tim and Silvia), Ex-Directors, Motorola Solutions',
      category: 'fireside',
    },
  ];

  const speakingItems = items.filter(item => item.category === 'speaking');
  const firesideItems = items.filter(item => item.category === 'fireside');

  // Prevent page scroll when in coverflow mode
  useEffect(() => {
    if (viewMode === 'coverflow') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [viewMode]);

  // Track which section is in view
  useEffect(() => {
    if (viewMode !== 'list') return;

    const observerOptions = {
      root: null,
      rootMargin: '-120px 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === speakingSectionRef.current) {
            setActiveSection('speaking');
          } else if (entry.target === firesideSectionRef.current) {
            setActiveSection('fireside');
          }
        }
      });
    }, observerOptions);

    if (speakingSectionRef.current) {
      observer.observe(speakingSectionRef.current);
    }
    if (firesideSectionRef.current) {
      observer.observe(firesideSectionRef.current);
    }

    return () => observer.disconnect();
  }, [viewMode]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!coverflowStageRef.current || viewMode !== 'coverflow' || isDraggingRef.current) return;

      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY || e.deltaX;
      if (Math.abs(delta) > 10) {
        if (delta > 0 && activeIndex < items.length - 1) {
          setActiveIndex(prev => prev + 1);
        } else if (delta < 0 && activeIndex > 0) {
          setActiveIndex(prev => prev - 1);
        }
      }
    };

    const stage = coverflowStageRef.current;
    if (stage) {
      stage.addEventListener('wheel', handleWheel, { passive: false });
      return () => stage.removeEventListener('wheel', handleWheel);
    }
  }, [viewMode, activeIndex, items.length]);

  const handleCoverClick = (index: number) => {
    if (index === activeIndex) {
      window.open(items[index].linkedInUrl, '_blank', 'noopener,noreferrer');
    } else {
      setActiveIndex(index);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (viewMode !== 'coverflow') return;

    if (e.key === 'ArrowLeft') {
      setActiveIndex((prev) => Math.max(0, prev - 1));
    } else if (e.key === 'ArrowRight') {
      setActiveIndex((prev) => Math.min(items.length - 1, prev + 1));
    } else if (e.key === 'Enter') {
      window.open(items[activeIndex].linkedInUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleScrollbarMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!scrollbarRef.current) return;

    isDraggingRef.current = true;

    const updatePosition = (clientX: number) => {
      if (!scrollbarRef.current) return;

      const rect = scrollbarRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const newIndex = Math.round(percentage * (items.length - 1));
      setActiveIndex(newIndex);
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      updatePosition(moveEvent.clientX);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    updatePosition(e.clientX);
  };

  const getTransformStyle = (index: number) => {
    const diff = index - activeIndex;
    const absOff = Math.abs(diff);

    if (diff === 0) {
      return {
        transform: 'translateX(-50%) translateZ(0) rotateY(0deg) scale(1)',
        zIndex: 100,
        opacity: 1,
      };
    }

    const direction = diff > 0 ? 1 : -1;
    const rotation = direction * -45;
    const translateX = direction * (234 + absOff * 78);
    const translateZ = -150 - absOff * 50;
    const scale = 0.7 - absOff * 0.05;

    return {
      transform: `translateX(calc(-50% + ${translateX}px)) translateZ(${translateZ}px) rotateY(${rotation}deg) scale(${scale})`,
      zIndex: 50 - absOff,
      opacity: 1,
    };
  };

  const renderListItem = (item: WildItem, index: number, delayBase: number) => (
    <motion.div
      key={item.id}
      className={styles.item}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delayBase + index * 0.1 }}
    >
      <div className={styles.itemHeader}>
        <div className={styles.titleContainer}>
          <h3 className={styles.itemTitle}>
            {item.title}
            {item.videoUrl && (
              <>
                {' | '}
                <a
                  href={item.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.videoLink}
                >
                  Video
                </a>
              </>
            )}
          </h3>
          {item.subtitle && (
            <p className={styles.itemSubtitle}>{item.subtitle}</p>
          )}
        </div>
        <a
          href={item.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.openButton}
          aria-label="Open LinkedIn post in new tab"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      <motion.div
        className={styles.imageContainer}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delayBase + 0.1 + index * 0.1, duration: 0.5 }}
      >
        <a
          href={item.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.imageLink}
          aria-label="View on LinkedIn"
        >
          <img
            src={item.image}
            alt={item.imageAlt}
            className={styles.image}
          />
        </a>
      </motion.div>
    </motion.div>
  );

  return (
    <div className={styles.container} onKeyDown={handleKeyDown} tabIndex={0}>
      <AnimatePresence mode="wait">
        {viewMode === 'list' ? (
          <motion.div
            key="list"
            className={styles.content}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <section className={styles.section} ref={speakingSectionRef}>
              {speakingItems.map((item, index) => renderListItem(item, index, 0.2))}
            </section>

            <div className={styles.divider} />

            <section className={styles.section} ref={firesideSectionRef}>
              {firesideItems.map((item, index) => renderListItem(item, index, 0.4))}
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="coverflow"
            className={styles.coverflowWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.coverflowStage} ref={coverflowStageRef}>
              <div className={styles.coverflowContainer}>
                {items.map((item, index) => {
                  const transformStyle = getTransformStyle(index);
                  return (
                    <motion.div
                      key={item.id}
                      className={`${styles.coverItem} ${index === activeIndex ? styles.coverItemActive : ''}`}
                      style={transformStyle}
                      onClick={() => handleCoverClick(index)}
                      data-cursor="interactive"
                      initial={false}
                      animate={transformStyle}
                      transition={{
                        duration: 0.5,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      <div className={styles.coverImageWrapper}>
                        <img
                          src={item.image}
                          alt={item.imageAlt}
                          className={styles.coverImage}
                          draggable={false}
                        />
                      </div>
                      <div className={styles.coverReflection}>
                        <img
                          src={item.image}
                          alt=""
                          className={styles.coverReflectionImage}
                          draggable={false}
                          aria-hidden="true"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <motion.div
              className={styles.coverflowInfo}
              key={items[activeIndex].id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className={styles.coverflowTitle}>
                {items[activeIndex].title}
                {items[activeIndex].videoUrl && (
                  <>
                    {' | '}
                    <a
                      href={items[activeIndex].videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.videoLink}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Video
                    </a>
                  </>
                )}
              </h2>
              {items[activeIndex].subtitle && (
                <p className={styles.coverflowSubtitle}>{items[activeIndex].subtitle}</p>
              )}
              <span className={styles.coverflowHint}>Scroll or drag to navigate</span>
            </motion.div>

            <div
              className={styles.customScrollbar}
              ref={scrollbarRef}
              onMouseDown={handleScrollbarMouseDown}
              data-cursor="interactive"
            >
              <motion.div
                className={styles.scrollbarThumb}
                animate={{
                  width: `${100 / items.length}%`,
                  left: `${(activeIndex / (items.length - 1)) * (100 - 100 / items.length)}%`
                }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
