import Image from "next/image"
import { ExportButton } from "../components/ExportButton"
import ChipHeart from "../assets/chip-heart.png"

const HomePage = () => {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-xl px-4 md:px-6 pb-6 pt-12 sm:pt-16 md:pt-20 lg:pt-24">
        <div className="w-auto mx-auto relative h-60 sm:h-72 md:h-80 lg:h-[350px]">
          <Image
            src={ChipHeart}
            alt="chip heart"
            draggable={false}
            fill
            className="object-center object-contain"
            sizes="350px"
            priority
          />
        </div>
        <div className="flex flex-col gap-y-2 text-white pt-7 text-left sm:text-center">
          <h1 className="text-3xl sm:text-[2.5rem] sm:leading-snug md:text-5xl font-display">Prerich has shut down</h1>
          <h2 className="font-semibold text-xs sm:text-sm">We officially went offline on September 15, 2025.</h2>
          <p className="pt-3 sm:pt-4 lg:pt-5 text-white/85 text-sm sm:text-base">
            After much consideration, we made the difficult decision to shut down our services. Your wallet remains accessible for
            export.
          </p>
          <p className="text-white/85 pt-2 sm:pt-3 text-sm sm:text-base">
            We&lsquo;re incredibly grateful to everyone who joined us on this journey. Your support and enthusiasm meant the world
            to us. From all of us at Prerich, thank you for being part of our story.
          </p>
          <div className="pt-4">
            <ExportButton />
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomePage
