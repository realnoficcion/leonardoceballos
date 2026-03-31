import { Hero } from "@/components/sections/Hero";
import { VideoWork } from "@/components/sections/VideoWork";
import { SoundWork } from "@/components/sections/SoundWork";
import { Autoral } from "@/components/sections/Autoral";
import { DevWork } from "@/components/sections/DevWork";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { BinarySeparator } from "@/components/ui/BinarySeparator";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BinarySeparator strings={["Short", "Form", "Horizontal"]} inverted />
      <VideoWork />
      <BinarySeparator strings={["Sound", "Design", "Mix", "Track"]} inverted />
      <SoundWork />
      <BinarySeparator strings={["Original", "Music"]} inverted />
      <Autoral />
      <BinarySeparator strings={["Apps", "Tools", "Code"]} inverted />
      <DevWork />
      <BinarySeparator strings={["About", "Me"]} inverted />
      <About />
      <BinarySeparator strings={["Get", "In", "Touch"]} inverted />
      <Contact />
    </>
  );
}
