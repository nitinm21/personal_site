'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import styles from './page.module.css';

interface BTSVideo {
  id: string;
  title: string;
  description: string;
  youtubeVideoId?: string;
  youtubeUrl?: string;
  thumbnail?: string;
  duration?: string;
  publishedAt?: string;
}

const videos: BTSVideo[] = [
  {
    id: 'building-blog-page',
    title: 'Building a /blog page for my site',
    description:
      'A behind-the-scenes walkthrough of how I designed and shipped the new blog page.',
    youtubeVideoId: 'vRhAXLO_D0A',
  },
];

const containerEase = [0.22, 0.61, 0.36, 1] as const;

const extractYouTubeVideoId = (youtubeUrl: string): string | null => {
  try {
    const parsedUrl = new URL(youtubeUrl);

    if (parsedUrl.hostname.includes('youtu.be')) {
      return parsedUrl.pathname.replace('/', '') || null;
    }

    if (parsedUrl.hostname.includes('youtube.com')) {
      const watchId = parsedUrl.searchParams.get('v');
      if (watchId) {
        return watchId;
      }

      const segments = parsedUrl.pathname.split('/').filter(Boolean);
      if (segments[0] === 'embed' && segments[1]) {
        return segments[1];
      }
      if (segments[0] === 'shorts' && segments[1]) {
        return segments[1];
      }
    }
  } catch {
    return null;
  }

  return null;
};

const getVideoId = (video: BTSVideo): string | null => {
  if (video.youtubeVideoId) {
    return video.youtubeVideoId;
  }
  if (video.youtubeUrl) {
    return extractYouTubeVideoId(video.youtubeUrl);
  }
  return null;
};

const getVideoThumbnail = (video: BTSVideo): string => {
  if (video.thumbnail) {
    return video.thumbnail;
  }

  const videoId = getVideoId(video);
  if (videoId) {
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  }

  return '/background_image.jpg';
};

const getAutoplayEmbedUrl = (video: BTSVideo): string => {
  const videoId = getVideoId(video);
  const baseUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}`
    : (video.youtubeUrl ?? '');

  if (!baseUrl) {
    return '';
  }

  const queryParams = new URLSearchParams({
    autoplay: '1',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });

  return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${queryParams.toString()}`;
};

export default function BehindTheScenesPage() {
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState('');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const filteredVideos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return videos;
    }

    return videos.filter((video) => video.title.toLowerCase().includes(normalizedQuery));
  }, [query]);

  const activeVideo = useMemo(
    () => videos.find((video) => video.id === activeVideoId) ?? null,
    [activeVideoId]
  );

  useEffect(() => {
    if (!activeVideo) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setActiveVideoId(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeVideo]);

  useEffect(() => {
    if (!activeVideo) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [activeVideo]);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: containerEase }}
      >
        <header className={styles.header}>
          <p className={styles.eyebrow}>Behind the Scenes</p>
          <h1 className={styles.title}>BTS</h1>
          <p className={styles.subtitle}>
            Short videos on how I build stuff with AI. More drops soon.
          </p>
        </header>

        <section className={styles.toolbar} aria-label="Video search">
          <label className={styles.searchLabel} htmlFor="bts-search">
            Search videos by title
          </label>
          <div className={styles.searchField}>
            <svg
              className={styles.searchIcon}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L16.65 16.65"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              id="bts-search"
              name="bts-search"
              className={styles.searchInput}
              type="search"
              placeholder="Search videos"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </section>

        <motion.ul
          className={styles.videoList}
          aria-label="BTS videos"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reduceMotion ? 0 : 0.06,
                delayChildren: reduceMotion ? 0 : 0.08,
              },
            },
          }}
        >
          {filteredVideos.map((video) => (
            <motion.li
              key={video.id}
              className={styles.videoListItem}
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: reduceMotion ? 0.2 : 0.35, ease: containerEase }}
            >
              <motion.button
                type="button"
                className={styles.videoCard}
                onClick={() => setActiveVideoId(video.id)}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                whileTap={reduceMotion ? undefined : { scale: 0.998 }}
              >
                <div className={styles.videoCopy}>
                  <h2 className={styles.videoTitle}>
                    <span className={styles.videoTitleText}>{video.title}</span>
                  </h2>
                  <p className={styles.videoDescription}>{video.description}</p>
                </div>

                <div className={styles.videoMedia}>
                  <img
                    src={getVideoThumbnail(video)}
                    alt=""
                    className={styles.videoThumbnail}
                    loading="lazy"
                    aria-hidden="true"
                  />
                  <div className={styles.previewShade} />
                  <span className={styles.playBadge} aria-hidden="true">
                    ▶
                  </span>
                </div>
              </motion.button>
            </motion.li>
          ))}
        </motion.ul>

        <AnimatePresence>
          {filteredVideos.length === 0 && (
            <motion.p
              className={styles.emptyState}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
              transition={{ duration: 0.25 }}
            >
              No videos found for that title search. Try a different keyword.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className={styles.modalOverlay}
            onClick={() => setActiveVideoId(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.25 }}
          >
            <motion.div
              className={styles.modalDialog}
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.98 }}
              transition={{ duration: reduceMotion ? 0.18 : 0.3, ease: containerEase }}
            >
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>{activeVideo.title}</h2>
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={() => setActiveVideoId(null)}
                  aria-label="Close video modal"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className={styles.modalShell}>
                <div className={styles.videoEmbed}>
                  <iframe
                    key={activeVideo.id}
                    loading="eager"
                    src={getAutoplayEmbedUrl(activeVideo)}
                    title={activeVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
