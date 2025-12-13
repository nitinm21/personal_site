'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';

type ViewMode = 'list' | 'coverflow';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  image: string;
  imageAlt: string;
}

export default function CodingExplorations() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [activeIndex, setActiveIndex] = useState(1);
  const coverflowStageRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const projects: Project[] = [
    {
      id: 'kalshi-wrapped',
      title: 'Kalshi Wrapped',
      subtitle: 'A cinematic, mobile-first year-in-review experience for Kalshi traders, inspired by Spotify Wrapped.',
      url: 'https://nitinm21.github.io/kalshi-wrapped/',
      image: '/kalshi-wrapped-preview.png',
      imageAlt: 'Kalshi Wrapped Preview',
    },
    {
      id: 'exa-serpapi',
      title: 'Exa v/s SerpAPI',
      subtitle: "Interactive playground to compare Exa's APIs and traditional search APIs",
      url: 'https://exa-lime.vercel.app/',
      image: '/exa-serpapi-preview.png',
      imageAlt: 'Exa v/s SerpAPI Preview',
    },
    {
      id: 'langchain',
      title: 'Talk to the OGs with LangChain',
      subtitle: 'Talk to Steve Jobs, Kobe Bryant and Marcus Aurelius — at once.',
      url: 'https://github.com/nitinm21/langchain1',
      image: '/langchain_project.png',
      imageAlt: 'Talk to the OGs with LangChain Preview',
    },
  ];

  // Handle wheel event to navigate between items
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!coverflowStageRef.current || viewMode !== 'coverflow' || isDraggingRef.current) return;

      e.preventDefault();

      const delta = e.deltaY || e.deltaX;
      if (Math.abs(delta) > 10) {
        if (delta > 0 && activeIndex < projects.length - 1) {
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
  }, [viewMode, activeIndex, projects.length]);

  const handleCoverClick = (index: number) => {
    if (index === activeIndex) {
      window.open(projects[index].url, '_blank', 'noopener,noreferrer');
    } else {
      setActiveIndex(index);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (viewMode !== 'coverflow') return;

    if (e.key === 'ArrowLeft') {
      setActiveIndex((prev) => Math.max(0, prev - 1));
    } else if (e.key === 'ArrowRight') {
      setActiveIndex((prev) => Math.min(projects.length - 1, prev + 1));
    } else if (e.key === 'Enter') {
      window.open(projects[activeIndex].url, '_blank', 'noopener,noreferrer');
    }
  };

  // Handle scrollbar dragging
  const handleScrollbarMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!scrollbarRef.current) return;

    isDraggingRef.current = true;

    const updatePosition = (clientX: number) => {
      if (!scrollbarRef.current) return;

      const rect = scrollbarRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const newIndex = Math.round(percentage * (projects.length - 1));
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

    // Update position immediately on click
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

  return (
    <div className={styles.container} onKeyDown={handleKeyDown} tabIndex={0}>
      {/* View Toggle */}
      <div className={styles.viewToggle}>
        <button
          className={`${styles.viewButton} ${viewMode === 'list' ? styles.viewButtonActive : ''}`}
          onClick={() => setViewMode('list')}
          aria-label="List view"
          title="List view"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          className={`${styles.viewButton} ${viewMode === 'coverflow' ? styles.viewButtonActive : ''}`}
          onClick={() => setViewMode('coverflow')}
          aria-label="Cover Flow view"
          title="Cover Flow view"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="6" width="6" height="12" rx="1" stroke="currentColor" strokeWidth="2" transform="skewY(-10)" />
            <rect x="9" y="4" width="6" height="14" rx="1" stroke="currentColor" strokeWidth="2" />
            <rect x="16" y="6" width="6" height="12" rx="1" stroke="currentColor" strokeWidth="2" transform="skewY(10)" />
          </svg>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'list' ? (
          <motion.div
            key="list"
            className={styles.content}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className={styles.projectSection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className={styles.header}>
                  <div className={styles.titleContainer}>
                    <h2 className={styles.title}>{project.title}</h2>
                    <p className={styles.subtitle}>{project.subtitle}</p>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.openButton}
                    aria-label={`Open ${project.title} in new tab`}
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
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.imageLink}
                    aria-label={`View ${project.title}`}
                  >
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      className={styles.image}
                    />
                  </a>
                </motion.div>
              </motion.div>
            ))}
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
                {projects.map((project, index) => {
                  const transformStyle = getTransformStyle(index);
                  return (
                    <motion.div
                      key={project.id}
                      className={`${styles.coverItem} ${index === activeIndex ? styles.coverItemActive : ''}`}
                      style={transformStyle}
                      onClick={() => handleCoverClick(index)}
                      initial={false}
                      animate={transformStyle}
                      transition={{
                        duration: 0.5,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      <div className={styles.coverImageWrapper}>
                        <img
                          src={project.image}
                          alt={project.imageAlt}
                          className={styles.coverImage}
                          draggable={false}
                        />
                      </div>
                      <div className={styles.coverReflection}>
                        <img
                          src={project.image}
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

            {/* Project Info Below */}
            <motion.div
              className={styles.coverflowInfo}
              key={projects[activeIndex].id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className={styles.coverflowTitle}>{projects[activeIndex].title}</h2>
              <p className={styles.coverflowSubtitle}>{projects[activeIndex].subtitle}</p>
              <span className={styles.coverflowHint}>Scroll or drag to navigate</span>
            </motion.div>

            {/* Custom Scrollbar */}
            <div
              className={styles.customScrollbar}
              ref={scrollbarRef}
              onMouseDown={handleScrollbarMouseDown}
            >
              <motion.div
                className={styles.scrollbarThumb}
                animate={{
                  width: `${100 / projects.length}%`,
                  left: `${(activeIndex / (projects.length - 1)) * (100 - 100 / projects.length)}%`
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
