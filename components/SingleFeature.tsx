import { Feature } from "@/types";
import { Card, CardBody, Divider } from "@nextui-org/react";
import { MagicCard } from "./ui/magic-card";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, description } = feature;
  return (
    <MagicCard
      className="flex w-full flex-col overflow-hidden bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),#ffaa40_0,#9c40ff_50%,transparent_100%)] p-6 shadow-2xl"
    >
      <div className="flex w-16 aspect-square   items-center justify-center rounded-md border">
        <feature.icon />
      </div>
      <h3 className="mb-2 text-xl font-semibold  sm:text-2xl lg:text-xl xl:text-2xl mt-4">
        {title}
      </h3>
      <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">
        {description}
      </p>
    </MagicCard>
  );
};

export default SingleFeature;
