"use client";

import type React from "react";
import { useState, useRef} from "react";
import ReactPlayer from "react-player";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Maximize2,
  Volume1,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
// import { Slider } from "@/app/components/ui/slider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

interface VideoPlayerProps {
  url?: string;
  miniPlayer?: boolean;
  showControls?: boolean;
  height?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url = "/video/myvideo.mp4",
  miniPlayer = false,
  showControls = false,
  height = "100%",
}) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  // const [played, setPlayed] = useState(0);

  const [duration, setDuration] = useState(0);

  const playerRef = useRef<ReactPlayer>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Format time in MM:SS format
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;

    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };
  // const handleVolumeChange = (value: number[]) => {
  //   setVolume(value[0])
  //   setMuted(value[0] === 0)
  // }


  const toggleMute = () => {
    setMuted(!muted);
    setVolume(muted ? 0.8 : 0);
  };

  // Handle play/pause
  const togglePlay = () => {
    setPlaying(!playing);
  };

  if (miniPlayer) {
    return (
      <div className="relative w-full h-full rounded overflow-hidden">
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          muted={muted}
          onDuration={setDuration}
          style={{ position: "absolute", top: 0, left: 0 }}
        />

        {!playing && (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/30"
          >
            <div className="bg-black/70 p-2 rounded-full">
              <Play className="h-5 w-5 text-white" />
            </div>
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      ref={playerContainerRef}
      className="relative w-full overflow-hidden rounded-lg"
      style={{ height }}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        volume={volume}
        muted={muted}
        onDuration={setDuration}
        className="!absolute !top-0 !left-0 !w-full !h-full object-cover"
        config={{
          file: {
            attributes: {
              className: "object-cover w-full h-full", // Tailwind on <video>
            },
          },
        }}
      />

      {!playing && !showControls && (
        <button
          onClick={() => setPlaying(true)}
          className="absolute inset-0 flex items-center justify-center bg-black/30"
        >
          <div className="bg-black/70 p-2 rounded-full">
            <Play className="h-5 w-5 text-white" />
          </div>
        </button>
      )}

      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 text-white">
          {/* Progress bar */}
          {/* <div
            className="h-1.5 bg-gray-700 cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const percent = (e.clientX - rect.left) / rect.width
              setPlayed(percent)
              playerRef.current?.seekTo(percent)
            }}
          >
            <div className="bg-teal-400 h-full" style={{ width: `${played * 100}%` }} />
          </div> */}

          {/* Controls */}
          <div className="p-3 flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={togglePlay}
            >
              {playing ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>

            {/* <div className="text-xs">{formatTime(played * duration)}</div> */}

            {/* <div className="flex-1 relative">
              <Slider
                value={[played]}
                min={0}
                max={1}
                step={0.001}
                onValueChange={handleSeekChange}
                onValueCommit={handleSeekMouseUp}
                className="[&>span:first-child]:h-1.5 [&>span:first-child]:bg-gray-700 [&_[role=slider]]:bg-teal-400 [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-teal-400"
              />
            </div> */}

            <div className="text-xs">{formatTime(duration)}</div>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-white"
                onClick={toggleMute}
              >
                {muted || volume === 0 ? (
                  <VolumeX className="h-5 w-5" />
                ) : volume < 0.5 ? (
                  <Volume1 className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>

              {/* {showVolumeSlider && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-gray-800 rounded-md w-24">
                  <Slider
                    value={[muted ? 0 : volume]}
                    min={0}
                    max={1}
                    step={0.01}
                    onValueChange={handleVolumeChange}
                    className="[&>span:first-child]:h-1.5 [&>span:first-child]:bg-gray-700 [&_[role=slider]]:bg-teal-400 [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-teal-400"
                  />
                </div>
              )} */}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>Playback Speed</DropdownMenuItem>
                <DropdownMenuItem>Quality</DropdownMenuItem>
                <DropdownMenuItem>Captions</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={toggleFullscreen}
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
