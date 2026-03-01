import type { Metadata } from "next";

import { Button, Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

import SingleFeature from "@/components/SingleFeature";
import { CheckCircleIcon, ChevronDownIcon } from "@/components/icons";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import GridPattern from "@/components/ui/animated-grid-pattern";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard, MagicContainer } from "@/components/ui/magic-card";
import { featuresData } from "@/config/features";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "PicExpert - Free Bulk Image Resize and Crop Tool Online",
  description:
    "PicExpert is a free online tool that simplifies bulk image resizing and cropping. Effortlessly resize and crop multiple images at once, saving you time and effort. With PicExpert, you can optimize your pictures for various purposes, such as social media posts, websites, or online galleries. Our user-friendly interface makes it easy to resize and crop your images without any technical expertise. Experience the convenience of bulk image manipulation with PicExpert today.",
  openGraph: {
    title: "PicExpert - Free Bulk Image Resize and Crop Tool Online",
    description:
      "PicExpert is a free online tool that simplifies bulk image resizing and cropping. Effortlessly resize and crop multiple images at once, saving you time and effort. With PicExpert, you can optimize your pictures for various purposes, such as social media posts, websites, or online galleries. Our user-friendly interface makes it easy to resize and crop your images without any technical expertise. Experience the convenience of bulk image manipulation with PicExpert today.",
    type: "website",
    url: "https://picexpert.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "PicExpert - Free Bulk Image Resize and Crop Tool Online",
    description:
      "PicExpert is a free online tool that simplifies bulk image resizing and cropping. Effortlessly resize and crop multiple images at once, saving you time and effort. With PicExpert, you can optimize your pictures for various purposes, such as social media posts, websites, or online galleries. Our user-friendly interface makes it easy to resize and crop your images without any technical expertise. Experience the convenience of bulk image manipulation with PicExpert today.",
  },
};

export default function Home() {
  return (
    <>
      <section className="relative justify-center items-center">
        <div className=" relative max-w-screen-xl mx-auto px-4 pt-10 md:pt-28 pb-10 gap-12 md:px-8 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center space-y-5 max-w-4xl mx-auto text-center z-10">
            <AnimatedGradientText>
              🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
              <span
                className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                )}
              >
                picExpert 2.0 is here!
              </span>
              <ChevronDownIcon className="ml-1  -rotate-90" size={12} />
            </AnimatedGradientText>
            <h1 className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]">
              <span className="from-[#9e3bf5]  to-[#1548f0]  bg-gradient-to-r bg-clip-text text-transparent">
                Bulk Image Resizing{" "}
              </span>
              in Seconds — Private & Fast
            </h1>
            <p className="max-w-2xl mx-auto text-foreground/80">
              Resize, crop, add solid/gradient/image backgrounds, watermark, and
              export — all in your browser. 100% client‑side. No uploads.
              Perfect for batches.
            </p>
            <div className="items-center justify-center gap-3  flex ">
              <Button
                as={Link}
                color="primary"
                href="/app"
                size="lg"
                variant="solid"
              >
                Open picExpert
              </Button>
            </div>
          </div>
          <GridPattern
            className={cn(
              "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
              "md:[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
              "inset-x-0 -top-2/3  md:-top-1/2  h-[250%] skew-y-12 ",
            )}
            duration={2}
            maxOpacity={0.5}
            numSquares={30}
            repeatDelay={1}
          />
        </div>

        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3 py-4 text-2xs uppercase tracking-wider text-foreground/70">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="text-primary" size={16} />
              <span>100% client‑side</span>
            </div>
            <Divider className="h-4 hidden md:block" orientation="vertical" />
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="text-primary" size={16} />
              <span>Bulk processing</span>
            </div>
            <Divider className="h-4 hidden md:block" orientation="vertical" />
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="text-primary" size={16} />
              <span>Watermarking</span>
            </div>
            <Divider className="h-4 hidden md:block" orientation="vertical" />
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="text-primary" size={16} />
              <span>Different Backgrounds</span>
            </div>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden">
          <Image
            priority
            alt="picexpert preview"
            className="z-10 relative hidden dark:block"
            height={720}
            src={"/images/preview-dark.png"}
            width={1440}
          />
          <Image
            priority
            alt="picexpert preview"
            className="z-10 relative  dark:hidden"
            height={720}
            src={"/images/preview-light.png"}
            width={1440}
          />
          <BorderBeam delay={9} duration={12} size={250} />
        </div>
      </section>

      {/* Problem section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-semibold mb-4">
              Stop batch‑editing images by hand
            </h2>
            <p className="text-foreground/80">
              No more juggling Photoshop actions, inconsistent edges, or wonky
              backgrounds. picExpert handles rounding, fills, and exports — at
              scale.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-28 relative" id="features">
        <div className={` w-full mb-14 text-center z-10 relative`}>
          <span className="py-1 px-8 text-sm bg-white dark:bg-background rounded-full border mb-5 block w-max mx-auto border-yellow-500 text-yellow-500 dark:text-yellow-500">
            Features
          </span>
          <h2 className="mb-4 max-w-3xl mx-auto text-3xl font-semibold  text-black dark:text-white sm:text-4xl md:text-[45px] lg:leading-[55px]">
            Unleash the Power: Features That{" "}
            <span className="from-[#9e3bf5]  to-[#1548f0]  bg-gradient-to-r bg-clip-text text-transparent">
              Transcend the Oridinary
            </span>
          </h2>
          <p className="md:text-lg max-w-lg mx-auto">
            Our first priority is your privacy and experience including that
            these are some feature of picexpert.
          </p>
        </div>

        <MagicContainer className="grid grid-cols-1 gap-8  md:grid-cols-2 lg:grid-cols-3 z-10 relative">
          {featuresData.map((feature) => (
            <SingleFeature key={feature.id} feature={feature} />
          ))}
        </MagicContainer>
        <GridPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
            "md:[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 -top-[35%]  md:-top-[60%] h-full md:h-[200%]",
          )}
          duration={2}
          maxOpacity={0.5}
          numSquares={30}
          repeatDelay={1}
        />
      </section>

      {/* How it works */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl md:text-4xl font-semibold mb-3">
              How it works
            </h2>
            <p className="text-foreground/80">
              Three quick steps from upload to export.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MagicCard className="p-6">
              <p className="text-3xs uppercase tracking-wider opacity-60 mb-2">
                Step 1
              </p>
              <h3 className="text-lg font-semibold mb-2">Upload images</h3>
              <p className="text-foreground/80">
                Drop one or hundreds. Everything stays on your device.
              </p>
            </MagicCard>
            <MagicCard className="p-6">
              <p className="text-3xs uppercase tracking-wider opacity-60 mb-2">
                Step 2
              </p>
              <h3 className="text-lg font-semibold mb-2">Choose your look</h3>
              <p className="text-foreground/80">
                Set size, corners, and background. Preview instantly.
              </p>
            </MagicCard>
            <MagicCard className="p-6">
              <p className="text-3xs uppercase tracking-wider opacity-60 mb-2">
                Step 3
              </p>
              <h3 className="text-lg font-semibold mb-2">Export at 1x/2x/4x</h3>
              <p className="text-foreground/80">
                Download single images or a ZIP — named with your quality.
              </p>
            </MagicCard>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl md:text-4xl font-semibold">
              Frequently asked questions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MagicCard className="p-6">
              <h3 className="font-semibold mb-2">Is picExpert free?</h3>
              <p className="text-foreground/80">
                Yes. The free plan includes unlimited processing. We may add pro
                perks later.
              </p>
            </MagicCard>
            <MagicCard className="p-6">
              <h3 className="font-semibold mb-2">Are my images uploaded?</h3>
              <p className="text-foreground/80">
                No. All processing happens in your browser using client‑side
                technology.
              </p>
            </MagicCard>
            <MagicCard className="p-6">
              <h3 className="font-semibold mb-2">
                PNG or JPG — which should I choose?
              </h3>
              <p className="text-foreground/80">
                PNG for transparency and crisp edges, JPG for smaller file sizes
                and photos.
              </p>
            </MagicCard>
            <MagicCard className="p-6">
              <h3 className="font-semibold mb-2">Does it support bulk?</h3>
              <p className="text-foreground/80">
                Yes. Upload multiple images and export them all at once in a
                ZIP.
              </p>
            </MagicCard>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-semibold mb-4">
            Make every image look professional — at scale
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto mb-6">
            Try picExpert free. No sign‑up, no uploads, just fast batch editing
            in your browser.
          </p>
          <Button
            as={Link}
            color="primary"
            href="/app"
            size="lg"
            variant="solid"
          >
            Open picExpert
          </Button>
        </div>
      </section>

      {/* FAQ JSON-LD for SEO */}
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is picExpert free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. The free plan includes unlimited processing. We may add pro perks later.",
                },
              },
              {
                "@type": "Question",
                name: "Are my images uploaded?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. All processing happens in your browser using client-side technology.",
                },
              },
              {
                "@type": "Question",
                name: "PNG or JPG — which should I choose?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "PNG for transparency and crisp edges, JPG for smaller file sizes and photos.",
                },
              },
              {
                "@type": "Question",
                name: "Does it support bulk?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Upload multiple images and export them all at once in a ZIP.",
                },
              },
            ],
          }),
        }}
        type="application/ld+json"
      />
    </>
  );
}
