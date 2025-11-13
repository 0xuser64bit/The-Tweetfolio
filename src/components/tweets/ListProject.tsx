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
      className="relative group rounded-xl overflow-hidden bg-black"
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

      {/* Custom Controls Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress Bar */}
          <div
            className="relative w-full h-1 bg-gray-600/40 rounded cursor-pointer mb-4 group/progress"
            onClick={handleSeek}
          >
            <div
              className="absolute h-full bg-blue-500 rounded"
              style={{ width: `${progress * 100}%` }}
            />
            <div
              className="absolute h-3 w-3 bg-blue-500 rounded-full -top-1 opacity-0 group-hover/progress:opacity-100 transition-opacity duration-200"
              style={{ left: `${progress * 100}%`, transform: 'translateX(-50%)' }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePlayPause}
                className="hover:text-blue-400 transition-colors p-1 rounded-full hover:bg-white/10"
              >
                {isEnded ? (
                  <MdOutlineReplay className="w-8 h-8" />
                ) : isPlaying ? (
                  <BsPauseFill className="w-8 h-8" />
                ) : (
                  <BsPlayFill className="w-8 h-8" />
                )}
              </button>
              <button
                onClick={handleMuteToggle}
                className="hover:text-blue-400 transition-colors p-1 rounded-full hover:bg-white/10"
              >
                {isMuted ? (
                  <HiSpeakerXMark className="w-6 h-6" />
                ) : (
                  <HiSpeakerWave className="w-6 h-6" />
                )}
              </button>
              <span className="text-sm font-medium">
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
              className="hover:text-blue-400 transition-colors p-1 rounded-full hover:bg-white/10"
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
    <div className="">
      <h3 className="text-2xl pb-4 flex justify-center items-center gap-x-3">
        <a
          href={githubLink}
          target="_blank"
          rel="noreferrer"
          className="hover:opacity-80"
        >
          <FaGithub />
        </a>
        {project}
        <a
          href={liveProject}
          target="_blank"
          rel="noreferrer"
          className="hover:opacity-80"
        >
          <FiExternalLink />
        </a>
      </h3>
      {purpose && (
        <div className="pb-4">
          <h4 className="font-bold">Purpose:</h4>
          <p className="ps-8">{purpose}</p>
        </div>
      )}
      {listitems && (
        <div className="pb-4">
          <h4 className="font-bold">Key Highlights:</h4>
          <ul className="list-disc ps-8">
            {listitems?.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {techstack && (
        <div className="pb-4">
          <h4 className="font-bold">Tech Stack:</h4>
          <h4 className="ps-8 font-light text-gray-400">{techstack}</h4>
        </div>
      )}
      {demoVideo && (
        <div className="pb-4">
          <h4 className="font-bold mb-2">Demo Video:</h4>
          <div className="aspect-video rounded-xl overflow-hidden">
            <CustomVideoPlayer url={demoVideo} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListProject;
