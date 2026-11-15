"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "../Button";
import { trackEvent } from "@/lib/analytics";

export default function CaseStudyVideo({ project }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [isHoverPreviewing, setIsHoverPreviewing] = useState(false);

  const videoRef = useRef(null);
  const hoverTimerRef = useRef(null);
  const progressReportedRef = useRef({ 25: false, 50: false, 75: false });

  // Handle single video playing at a time across the page
  useEffect(() => {
    const handleOtherVideoPlay = (e) => {
      if (e.detail?.id !== project.id && videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener("plumbnexo_video_play", handleOtherVideoPlay);
    return () => {
      window.removeEventListener("plumbnexo_video_play", handleOtherVideoPlay);
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, [project.id]);

  const startPlaying = (seekTime = 0) => {
    setHasStarted(true);
    setIsEnded(false);
    setIsHoverPreviewing(false);

    window.dispatchEvent(
      new CustomEvent("plumbnexo_video_play", { detail: { id: project.id } })
    );

    trackEvent("video_play", { project: project.id });

    if (videoRef.current) {
      const v = videoRef.current;
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;

      // Handle seeking safely whether metadata is loaded or not
      if (seekTime > 0) {
        if (v.readyState >= 1) {
          v.currentTime = seekTime;
        } else {
          const onLoaded = () => {
            v.currentTime = seekTime;
            v.removeEventListener("loadedmetadata", onLoaded);
          };
          v.addEventListener("loadedmetadata", onLoaded);
        }
      }

      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn("Video play error (retrying muted):", err);
            v.muted = true;
            v.play()
              .then(() => setIsPlaying(true))
              .catch((e) => console.error("Final play error:", e));
          });
      }
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 45;
    const percent = (current / duration) * 100;

    // Track 25, 50, 75% milestones
    [25, 50, 75].forEach((p) => {
      if (percent >= p && !progressReportedRef.current[p]) {
        progressReportedRef.current[p] = true;
        trackEvent("video_progress", { project: project.id, percent: p });
      }
    });

    // Update active chapter chip
    let currentChapter = 0;
    for (let i = project.chapters.length - 1; i >= 0; i--) {
      if (current >= project.chapters[i].time) {
        currentChapter = i;
        break;
      }
    }
    setActiveChapter(currentChapter);
  };

  const handleEnded = () => {
    setIsEnded(true);
    setIsPlaying(false);
    trackEvent("video_complete", { project: project.id });
  };

  const seekToChapter = (chapter, index) => {
    trackEvent("chapter_click", { project: project.id, chapter: chapter.label });
    setActiveChapter(index);

    if (!hasStarted) {
      startPlaying(chapter.time);
    } else if (videoRef.current) {
      setIsEnded(false);
      videoRef.current.currentTime = chapter.time;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleReplay = () => {
    setIsEnded(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  // Optional hover preview (desktop only): >600ms plays muted from 0:09, resets on leave
  const handleMouseEnter = () => {
    if (hasStarted || isPlaying) return;
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // @ts-ignore
      const saveData = navigator.connection?.saveData;
      if (prefersReduced || saveData) return;
    }

    hoverTimerRef.current = setTimeout(() => {
      if (!hasStarted && videoRef.current) {
        setIsHoverPreviewing(true);
        const v = videoRef.current;
        v.muted = true;
        v.defaultMuted = true;
        if (v.readyState >= 1) {
          v.currentTime = 9;
        }
        v.play().catch(() => {});
      }
    }, 600);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }

    if (isHoverPreviewing && !hasStarted && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsHoverPreviewing(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Video Frame */}
      <div
        className="relative w-full aspect-[16/9] rounded-[16px] bg-[#0C1F1E] shadow-soft overflow-hidden group select-none cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          if (!hasStarted) {
            startPlaying(0);
          }
        }}
      >
        {/* Video Element (preload none per README 5.4) */}
        <video
          ref={videoRef}
          src={project.videoSrc}
          poster={project.posterSrc}
          preload="none"
          playsInline
          muted
          controls={hasStarted && !isEnded}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className={`w-full h-full object-cover transition-opacity duration-300 relative z-0 ${
            hasStarted || isHoverPreviewing ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          aria-label={`${project.title} case study walkthrough video`}
        >
          <source src={project.videoSrc} type="video/mp4" />
        </video>

        {/* Poster Image overlay when not started & not previewing */}
        {!hasStarted && !isHoverPreviewing && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            <Image
              src={project.posterSrc}
              alt={`${project.title} video poster thumbnail`}
              fill
              sizes="(max-width: 1024px) 100vw, 680px"
              className="object-cover"
              priority={project.id === "pathmaker"}
            />
          </div>
        )}

        {/* Top-Right Duration Chip (per README 5.4) */}
        {!hasStarted && (
          <div
            className="absolute top-3.5 right-3.5 z-20 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[12px] font-bold tracking-wider pointer-events-none"
            aria-hidden="true"
          >
            {project.duration}
          </div>
        )}

        {/* Mint Play Pill: anchored at top-left at left 50%, top 70% (per README 5.4) */}
        {!hasStarted && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              startPlaying(0);
            }}
            className="absolute z-30 flex items-center gap-2 sm:gap-3 bg-[#B8F36B] text-[#122B2A] pl-1.5 sm:pl-2 pr-3.5 sm:pr-5 py-1.5 sm:py-2 rounded-full cursor-pointer transition-all duration-200 group/pill shadow-[0_0_0_4px_rgba(184,243,107,0.22)] sm:shadow-[0_0_0_6px_rgba(184,243,107,0.22)] hover:shadow-[0_0_0_8px_rgba(184,243,107,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8F36B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#122B2A] -translate-x-1/2 sm:translate-x-0 max-w-[90%]"
            style={{
              left: "50%",
              top: "70%",
            }}
            aria-label={`Play ${project.title} case study video, 45 seconds`}
          >
            <span className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] rounded-full bg-[#122B2A] flex items-center justify-center shrink-0">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B8F36B] translate-x-[1px] transition-transform duration-200 group-hover/pill:translate-x-[3px]"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="font-extrabold text-[13px] sm:text-[16px] tracking-tight whitespace-nowrap">
              Watch 45-sec case study
            </span>
          </button>
        )}

        {/* End Card Overlay (per README 5.4) */}
        {isEnded && (
          <div
            className="absolute inset-0 z-40 bg-[#0C1F1E]/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[14px] uppercase font-bold tracking-wider text-[#B8F36B] mb-2">
              Walkthrough Complete
            </p>
            <h3 className="text-[24px] sm:text-[28px] font-extrabold text-white mb-6">
              Want a site like this?
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button variant="primary" location="video_end">
                Get free demo page
              </Button>
              <button
                type="button"
                onClick={handleReplay}
                className="text-white/80 hover:text-white font-semibold text-[15px] px-3 py-2 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8F36B] rounded cursor-pointer"
              >
                ↻ Replay
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Chapter Chips (per README 5.4: 0 Brief, 9 Above the fold, 17 Walkthrough, 33 Mobile, 39 Skills) */}
      <div
        className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-3 pb-1"
        aria-label={`${project.title} video chapters`}
      >
        <span className="text-[12px] font-bold text-[#52635F] uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
          Chapters:
        </span>
        {project.chapters.map((ch, idx) => {
          const isActive = activeChapter === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => seekToChapter(ch, idx)}
              className={`text-[12px] sm:text-[13px] font-bold px-3 py-1.5 rounded-full transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8F36B] ${
                isActive
                  ? "bg-[#B8F36B]/25 text-[#122B2A] border border-[#B8F36B]/50"
                  : "bg-white text-[#52635F] hover:text-[#122B2A] border border-[#122B2A]/10"
              }`}
            >
              {ch.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
