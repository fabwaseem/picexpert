import React from "react";
import { Button, Chip, Divider } from "@nextui-org/react";

import GridPattern from "../ui/animated-grid-pattern";
import { CheckCircleIcon } from "../icons";
import { MagicCard, MagicContainer } from "../ui/magic-card";

import { plans } from "@/config/plans";
import { cn } from "@/lib/utils";

const PricingSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28 gap-12  relative" id="pricing">
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
              item.isMostPop && "lg:scale-[1.2] z-10 relative",
            )}
          >
            {/* popular badge */}
            {item.isMostPop && (
              <Chip
                className="absolute top-2 right-2 text-xs"
                color="primary"
                variant="shadow"
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
              className={cn(
                "mt-5 ",
                item.isMostPop &&
                  "from-[#9e3bf5]  to-[#1548f0]  bg-gradient-to-r text-white",
              )}
              size="lg"
              variant="faded"
            >
              Get started
            </Button>
            <div className="relative flex my-6 gap-5 items-center">
              <span className="w-0.5 h-0.5 rounded-full bg-content4 dark:bg-white/50 shrink-0" />
              <Divider className="w-full flex-1" />
              <span className=" opacity-50 text-xs">Features</span>
              <Divider className="w-full flex-1" />
              <span className="w-0.5 h-0.5 rounded-full bg-content4 dark:bg-white/50 shrink-0" />
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
  );
};

export default PricingSection;
