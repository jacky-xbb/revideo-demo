"use client";

import dynamic from "next/dynamic";
import { makeScenes } from "../revideo/scenes";

const Player = dynamic(
  () => import("@revideo/player-react").then((mod) => mod.Player),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Storyboard Video</h1>
      <div className="w-full max-w-[56.25vh] aspect-[9/16]">
        <Player project={makeScenes()} width={576} height={1024} />
      </div>
    </main>
  );
}
