import SingleFeature from "@/components/SingleFeature";
import { CheckCircleIcon, ChevronDownIcon } from "@/components/icons";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import GridPattern from "@/components/ui/animated-grid-pattern";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard, MagicContainer } from "@/components/ui/magic-card";
import { featuresData } from "@/config/features";
import { plans } from "@/config/plans";
import { cn } from "@/lib/utils";
import { Button, Chip, Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

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
                  `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                )}
              >
                pixExpert 2.0 is here!
              </span>
              <ChevronDownIcon size={12} className="ml-1  -rotate-90" />
            </AnimatedGradientText>
            <h1 className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]">
              <span className="from-[#9e3bf5]  to-[#1548f0]  bg-gradient-to-r bg-clip-text text-transparent">
                Bulk Image Resizing{" "}
              </span>
              Made Simple and Efficient
            </h1>
            <p className="max-w-2xl mx-auto text-foreground/80">
              Resize, crop, and enhance multiple images with ease.
            </p>
            <div className="items-center justify-center gap-3  flex ">
              <Button variant="faded" size="lg" as={Link} href="/app">
                Get Started
              </Button>
              <Button
                color="primary"
                variant="solid"
                size="lg"
                as={Link}
                href="/app"
              >
                Sign up Now
              </Button>
            </div>
          </div>
          <GridPattern
            numSquares={30}
            maxOpacity={0.5}
            duration={2}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
              "md:[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
              "inset-x-0 -top-2/3  md:-top-1/2  h-[250%] skew-y-12 "
            )}
          />
        </div>

        <div className="relative rounded-lg overflow-hidden">
          <Image
            src={"/images/preview-dark.png"}
            alt="picexpert preview"
            width={1440}
            height={720}
            priority
            className="z-10 relative hidden dark:block"
          />
          <Image
            src={"/images/preview-light.png"}
            alt="picexpert preview"
            width={1440}
            height={720}
            priority
            className="z-10 relative  dark:hidden"
          />
          <BorderBeam size={250} duration={12} delay={9} />
        </div>
      </section>
      <section id="features" className="py-16 md:py-20 lg:py-28 relative">
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
          numSquares={30}
          maxOpacity={0.5}
          duration={2}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
            "md:[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 -top-[35%]  md:-top-[60%] h-full md:h-[200%]"
          )}
        />
      </section>

      <section
        id="pricing"
        className="py-16 md:py-20 lg:py-28 gap-12  relative"
      >
        <div className={` w-full mb-20 text-center z-10 relative`}>
          <span className="py-1 px-8 text-sm bg-white dark:bg-background rounded-full border mb-5 block w-max mx-auto border-yellow-500 text-yellow-500 dark:text-yellow-500">
            Pricing
          </span>
          <h2 className="mb-4 max-w-3xl mx-auto text-3xl font-semibold  text-black dark:text-white sm:text-4xl md:text-[45px] lg:leading-[55px]">
            Empower Your Creativity:{" "}
            <span className="from-[#9e3bf5]  to-[#1548f0]  bg-gradient-to-r bg-clip-text text-transparent">
              Affordable Pricing Plans
            </span>
          </h2>
          <p className="md:text-lg max-w-lg mx-auto">
            Unlock the full potential of PicExpert with flexible pricing options
            designed for everyone.
          </p>
        </div>
        <MagicContainer
          className={"grid w-full gap-7 lg:gap-14 lg:grid-cols-3 z-10 relative"}
        >
          {plans.map((item, idx) => (
            <MagicCard
              key={idx}
              className={cn(
                "flex w-full flex-col overflow-hidden bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),#ffaa40_0,#9c40ff_50%,transparent_100%)] px-6 py-12 shadow-2xl",
                item.isMostPop && "lg:scale-[1.2] z-10 relative"
              )}
            >
              {/* popular badge */}
              {item.isMostPop && (
                <Chip
                  variant="shadow"
                  color="primary"
                  className="absolute top-2 right-2 text-xs"
                >
                  Most Popular
                </Chip>
              )}
              <p>{item.name}</p>
              <div className="flex items-end mt-6">
                <h2 className="text-4xl">${item.price}.00 </h2>
                <span className="opacity-50"> /month</span>
              </div>
              <p className="mt-4 opacity-80">{item.desc}</p>
              <Button
                variant="faded"
                className={cn(
                  "mt-5 ",
                  item.isMostPop &&
                    "from-[#9e3bf5]  to-[#1548f0]  bg-gradient-to-r text-white"
                )}
                size="lg"
              >
                Get started
              </Button>
              <div className="relative flex my-6 gap-5 items-center">
                <span className="w-0.5 h-0.5 rounded-full bg-content4 dark:bg-white/50 shrink-0"></span>
                <Divider className="w-full flex-1" />
                <span className=" opacity-50 text-xs">Features</span>
                <Divider className="w-full flex-1" />
                <span className="w-0.5 h-0.5 rounded-full bg-content4 dark:bg-white/50 shrink-0"></span>
              </div>
              <ul className="flex flex-col gap-2">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex gap-2 items-center">
                    <CheckCircleIcon size={20} />
                    {feature}
                  </li>
                ))}
              </ul>
            </MagicCard>
          ))}
        </MagicContainer>

        <GridPattern
          numSquares={30}
          maxOpacity={0.5}
          duration={2}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
            "md:[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 -top-[35%]  md:-top-[60%] h-full md:h-[200%]"
          )}
        />
      </section>
    </>
  );
}
