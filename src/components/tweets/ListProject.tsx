import React, { useEffect, useState, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { BiFullscreen } from "react-icons/bi";
import { MdOutlineReplay } from "react-icons/md";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import ReactPlayer from "react-player";

interface CustomVideoPlayerProps {
  url: string;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);

  const handleProgress = (state: { played: number }) => {
    setProgress(state.played);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isEnded) {
      setIsEnded(false);
      if (playerRef.current) {
        playerRef.current.seekTo(0);
      }
    }
  };

  const handleEnded = () => {
    setIsEnded(true);
    setIsPlaying(false);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const width = bounds.width;
    const percent = x / width;
    setProgress(percent);
    if (playerRef.current) {
      playerRef.current.seekTo(percent);
    }
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  return (
    <div
      className="relative group rounded-2xl overflow-hidden bg-x-primary"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        playing={isPlaying}
        muted={isMuted}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onEnded={handleEnded}
      />

      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div
            className="relative w-full h-1 bg-x-border rounded cursor-pointer mb-4 group/progress"
            onClick={handleSeek}
          >
            <div
              className="absolute h-full bg-x-accent rounded"
              style={{ width: `${progress * 100}%` }}
            />
            <div
              className="absolute h-3 w-3 bg-x-accent rounded-full -top-1 opacity-0 group-hover/progress:opacity-100 transition-opacity duration-200"
              style={{ left: `${progress * 100}%`, transform: 'translateX(-50%)' }}
            />
          </div>

          <div className="flex items-center justify-between text-x-text-primary">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={handlePlayPause}
                className="hover:text-x-accent transition-colors p-1 rounded-full hover:bg-white/10"
              >
                {isEnded ? (
                  <MdOutlineReplay className="w-6 h-6 sm:w-8 sm:h-8" />
                ) : isPlaying ? (
                  <BsPauseFill className="w-6 h-6 sm:w-8 sm:h-8" />
                ) : (
                  <BsPlayFill className="w-6 h-6 sm:w-8 sm:h-8" />
                )}
              </button>
              <button
                onClick={handleMuteToggle}
                className="hover:text-x-accent transition-colors p-1 rounded-full hover:bg-white/10"
              >
                {isMuted ? (
                  <HiSpeakerXMark className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <HiSpeakerWave className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
              <span className="text-xs sm:text-sm font-medium">
                {formatTime(duration * progress)} / {formatTime(duration)}
              </span>
            </div>
            <button
              onClick={() => {
                const video = document.querySelector('video');
                if (video) {
                  if (video.requestFullscreen) {
                    video.requestFullscreen();
                    // @ts-ignore
                  } else if (video.webkitRequestFullscreen) {
                    // @ts-ignore
                    video.webkitRequestFullscreen();
                  }
                }
              }}
              className="hover:text-x-accent transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <BiFullscreen className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ListProjectProps {
  project: string;
  purpose?: string;
  githubLink: string;
  liveProject: string;
  listitems?: string[];
  techstack?: string;
  demoVideo?: string;
}

const ListProject: React.FC<ListProjectProps> = ({
  project,
  purpose,
  githubLink,
  liveProject,
  listitems,
  techstack,
  demoVideo,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* Project name as tweet opening */}
      <p className="text-lg font-bold mb-2">{project}</p>

      {/* Purpose / description as tweet body text */}
      {purpose && (
        <p className="text-[15px] text-x-text-primary mb-3">{purpose}</p>
      )}
      {listitems && listitems.length > 0 && (
        <p className="text-[15px] text-x-text-primary mb-3 leading-relaxed">
          {listitems.join(" ")}
        </p>
      )}

      {/* Tech stack as hashtags */}
      {techstack && (
        <p className="text-[15px] mb-3">
          {techstack.split(",").map((tech) => (
            <span key={tech.trim()} className="text-x-accent mr-2 inline-block">
              #{tech.trim().replace(/\s+/g, "")}
            </span>
          ))}
        </p>
      )}

      {/* Link cards — X-style embedded previews */}
      <div className="flex flex-wrap gap-2 mb-3">
        {githubLink && githubLink !== "#" && (
          <a
            href={githubLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 border border-x-border rounded-2xl px-4 py-2.5 hover:bg-x-tertiary transition-colors text-[15px]"
          >
            <FaGithub className="text-lg" />
            <span className="text-x-text-secondary">Source Code</span>
          </a>
        )}
        {liveProject && liveProject !== "#" && (
          <a
            href={liveProject}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 border border-x-border rounded-2xl px-4 py-2.5 hover:bg-x-tertiary transition-colors text-[15px]"
          >
            <FiExternalLink className="text-lg" />
            <span className="text-x-text-secondary">Live Demo</span>
          </a>
        )}
      </div>

      {/* Demo video */}
      {demoVideo && (
        <div className="aspect-video rounded-2xl overflow-hidden">
          <CustomVideoPlayer url={demoVideo} />
        </div>
      )}
    </div>
  );
};

export default ListProject;
