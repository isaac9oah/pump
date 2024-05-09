import React, { useEffect, useState } from "react";

import { GambaTransaction } from "gamba-core-v2";
import { GambaUi } from "gamba-react-ui-v2";
import { PLATFORM_CREATOR_ADDRESS } from "../../../../config";
import { RecentPlay } from "@/utils/RecentPlay";
import { ShareModal } from "./ShareModal";
import { TimeDiff } from "@/utils/TimeDiff";
import { useRecentPlays } from "../../../hooks/useRecentPlays";

export default function RecentPlays() {
  const events = useRecentPlays(true);
  const [selectedGame, setSelectedGame] =
    useState<GambaTransaction<"GameSettled"> | null>(null);
  const PLATFORM_EXPLORER_URL = `https://explorer.gamba.so/platform/${PLATFORM_CREATOR_ADDRESS.toString()}`;

  return (
    <div className="w-full relative flex flex-col gap-2.5">
      {selectedGame && (
        <ShareModal
          event={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}
      {events.length > 0
        ? events.map((tx, index) => (
            <button
              key={tx.signature + "-" + index}
              onClick={() => setSelectedGame(tx)}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0f121b] hover:bg-[#131724] justify-between"
            >
              <div className="flex items-center gap-2">
                <RecentPlay event={tx} />
              </div>
              <TimeDiff time={tx.time} />
            </button>
          ))
        : Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="h-10 w-full rounded-lg animate-Skeleton bg-gray-300"
            ></div>
          ))}

      <GambaUi.Button main onClick={() => window.open(PLATFORM_EXPLORER_URL)}>
        🚀 Platform Explorer
      </GambaUi.Button>
    </div>
  );
}
