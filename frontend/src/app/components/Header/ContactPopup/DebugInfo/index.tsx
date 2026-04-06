"use client"

import { useEffect, useState } from "react"

// Extend the Navigator interface to include the connection property
interface NavigatorConnection {
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
}

interface ExtendedNavigator extends Navigator {
  connection?: NavigatorConnection;
  mozConnection?: NavigatorConnection;
  webkitConnection?: NavigatorConnection;
}

declare const navigator: ExtendedNavigator;

interface DebugInfoProps {
  includeDebug: boolean
  setIncludeDebug: (value: boolean) => void
}

export default function DebugInfo({ includeDebug, setIncludeDebug }: DebugInfoProps) {
  const [debugData, setDebugData] = useState({
    screenRes: "",
    deviceType: "",
    browserInfo: "",
    osInfo: "",
    languageInfo: "",
    timezoneInfo: "",
    connectionInfo: "",
  })

  useEffect(() => {
    if (includeDebug) {
      const updateDebugInfo = () => {
        // Use innerWidth and innerHeight for more accurate viewport size
        const screenRes = ` ${window.screen.width}x${window.screen.height}`
        // const screenRes = `${window.innerWidth}x${window.innerHeight} (display: ${window.screen.width}x${window.screen.height})`
        const deviceType = /Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? "Mobile" : "Desktop"
        const browserInfo = getBrowserInfo()
        const osInfo = getOSInfo()
        const language = navigator.language || "en-US"
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        
        // Handle different browser implementations of the Network Information API
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
        const connectionInfo = connection?.effectiveType || "Unknown"

        setDebugData({
          screenRes,
          deviceType,
          browserInfo,
          osInfo,
          languageInfo: language,
          timezoneInfo: timezone,
          connectionInfo,
        })
      }

      updateDebugInfo()
      
      // Add event listeners to update on resize
      window.addEventListener('resize', updateDebugInfo)
      
      // Cleanup event listeners
      return () => {
        window.removeEventListener('resize', updateDebugInfo)
      }
    }
  }, [includeDebug])

  const getBrowserInfo = () => {
    const ua = navigator.userAgent
    let browser = "Unknown"
    let version = ""

    if (ua.includes("Firefox")) {
      browser = "Firefox"
      version = ua.match(/Firefox\/([\d.]+)/)?.[1] || ""
    } else if (ua.includes("Edg")) {
      browser = "Edge"
      version = ua.match(/Edg\/([\d.]+)/)?.[1] || ""
    } else if (ua.includes("Chrome")) {
      browser = "Chrome"
      version = ua.match(/Chrome\/([\d.]+)/)?.[1] || ""
    } else if (ua.includes("Safari") && !ua.includes("Chrome")) {
      browser = "Safari"
      version = ua.match(/Version\/([\d.]+)/)?.[1] || ""
    }

    return version ? `${browser} ${version}` : browser
  }

  const getOSInfo = () => {
    const ua = navigator.userAgent

    if (ua.includes("Windows")) {
      return "Windows"
    } else if (ua.includes("Mac OS")) {
      return "macOS"
    } else if (ua.includes("Linux")) {
      return "Linux"
    } else if (/iPhone|iPad|iPod/.test(ua)) {
      return "iOS"
    } else if (ua.includes("Android")) {
      return "Android"
    }

    return navigator.platform || "Unknown"
  }

  return (
    <div className="mb-4 overflow-hidden rounded-sm border border-[#E0E0E0] transition-all">
      <div className="bg-white p-2.5 hover:bg-gray-50">
        <label className="flex cursor-pointer items-center gap-2 text-sm ">
          <input
            type="checkbox"
            checked={includeDebug}
            onChange={(e) => setIncludeDebug(e.target.checked)}
            className="size-3 cursor-pointer"
          />
          Send debug information together with my message.
        </label>
      </div>

      {includeDebug && (
        <div className="border-t border-[#E0E0E0] p-4">
          <div className="rounded-sm bg-[#F2F2F2]">
            <div className="border-b border-[#E5E5E5] p-2 space-x-6">
              <span className="inline-block w-40 font-semibold text-[#4F4F4F]">Using Beta:</span>
              <span className="text-[#4F4F4F] opacity-80">No</span>
            </div>
            <div className="border-b border-[#E5E5E5] p-2 space-x-6">
              <span className="inline-block w-40 font-semibold text-[#4F4F4F]">Screen Resolution:</span>
              <span className="text-[#4F4F4F] opacity-80">{debugData.screenRes}</span>
            </div>
            <div className="border-b border-[#E5E5E5] p-2 space-x-6">
              <span className="inline-block w-40 font-semibold text-[#4F4F4F]">Detected device type:</span>
              <span className="text-[#4F4F4F] opacity-80">{debugData.deviceType}</span>
            </div>
            <div className="border-b border-[#E5E5E5] p-2 space-x-6">
              <span className="inline-block w-40 font-semibold text-[#4F4F4F]">Browser:</span>
              <span className="text-[#4F4F4F] opacity-80">{debugData.browserInfo}</span>
            </div>
            <div className="border-b border-[#E5E5E5] p-2 space-x-6">
              <span className="inline-block w-40 font-semibold text-[#4F4F4F]">Operating System:</span>
              <span className="text-[#4F4F4F] opacity-80">{debugData.osInfo}</span>
            </div>
            <div className="border-b border-[#E5E5E5] p-2 space-x-6">
              <span className="inline-block w-40 font-semibold text-[#4F4F4F]">Language:</span>
              <span className="text-[#4F4F4F] opacity-80">{debugData.languageInfo}</span>
            </div>
            <div className="border-b border-[#E5E5E5] p-2 space-x-6">
              <span className="inline-block w-40 font-semibold text-[#4F4F4F]">Time Zone:</span>
              <span className="text-[#4F4F4F] opacity-80">{debugData.timezoneInfo}</span>
            </div>
            <div className="p-2 space-x-6">
              <span className="inline-block w-40 font-semibold text-[#4F4F4F]">Connection Type:</span>
              <span className="text-[#4F4F4F] opacity-80">{debugData.connectionInfo}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}