import {
  ExportSettingIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/icons";

export const socialMediaRatios = [
  {
    label: "Facebook",
    id: "facebook",
    icon: FacebookIcon,
    ratios: [
      { label: "Facebook Post", ratio: 0.8, width: 1080, height: 1350 },
      { label: "Facebook Cover", ratio: 2.7, width: 820, height: 312 },
      { label: "Facebook Profile", ratio: 1, width: 180, height: 180 },
      { label: "Facebook Event", ratio: 1.91, width: 1920, height: 1080 },
      { label: "Facebook Group Cover", ratio: 2.7, width: 1640, height: 856 },
      { label: "Facebook Page Cover", ratio: 2.7, width: 820, height: 312 },
      { label: "Facebook Carousel", ratio: 1.91, width: 1080, height: 1080 },
      { label: "Facebook Story", ratio: 9 / 16, width: 1080, height: 1920 },
      { label: "Facebook Ad", ratio: 1.91, width: 1200, height: 628 },
    ],
  },
  {
    label: "Instagram",
    id: "instagram",
    icon: InstagramIcon,
    ratios: [
      { label: "Instagram Post Square", ratio: 1, width: 1080, height: 1080 },
      {
        label: "Instagram Post Landscape",
        ratio: 1.91,
        width: 1080,
        height: 608,
      },
      {
        label: "Instagram Post Portrait",
        ratio: 4 / 5,
        width: 1080,
        height: 1350,
      },
      { label: "Instagram Story", ratio: 9 / 16, width: 1080, height: 1920 },
      { label: "Instagram Profile", ratio: 1, width: 180, height: 180 },
      { label: "Instagram IGTV Cover", ratio: 1.91, width: 420, height: 654 },
      { label: "Instagram Reel", ratio: 9 / 16, width: 1080, height: 1920 },
      { label: "Instagram Ad", ratio: 1.91, width: 1080, height: 566 },
    ],
  },
  {
    label: "Twitter",
    id: "twitter",
    icon: TwitterIcon,
    ratios: [
      { label: "Twitter Post", ratio: 1.91, width: 1024, height: 512 },
      { label: "Twitter Header", ratio: 2.7, width: 1500, height: 500 },
      { label: "Twitter Profile", ratio: 1, width: 400, height: 400 },
      { label: "Twitter Card", ratio: 1.91, width: 1200, height: 628 },
    ],
  },
  {
    label: "LinkedIn",
    id: "linkedin",
    icon: LinkedinIcon,
    ratios: [
      { label: "Linkedin Profile", ratio: 1, width: 400, height: 400 },
      { label: "Linkedin Cover", ratio: 4.5, width: 1584, height: 396 },
      { label: "Linkedin Post", ratio: 1.91, width: 1200, height: 627 },
      { label: "Linkedin Ad", ratio: 1.91, width: 1200, height: 627 },
      {
        label: "Linkedin Company Cover",
        ratio: 4.5,
        width: 1536,
        height: 768,
      },
    ],
  },
  {
    label: "YouTube",
    id: "youtube",
    icon: YoutubeIcon,
    ratios: [
      { label: "Youtube Thumbnail", ratio: 1.91, width: 1280, height: 720 },
      {
        label: "Youtube Channel Cover",
        ratio: 4.5,
        width: 2560,
        height: 1440,
      },
      { label: "Youtube Profile", ratio: 1, width: 800, height: 800 },
      { label: "Youtube Display Ad", ratio: 1.91, width: 300, height: 250 },
      { label: "Youtube Overlay Ad", ratio: 1.91, width: 480, height: 70 },
      { label: "Youtube Skippable Ad", ratio: 1.91, width: 480, height: 70 },
      { label: "Youtube Bumper Ad", ratio: 1.91, width: 480, height: 70 },
      {
        label: "Youtube Sponsored Card",
        ratio: 1.91,
        width: 300,
        height: 250,
      },
    ],
  },
  {
    label: "Custom",
    id: "custom",
    icon: ExportSettingIcon,

    ratios: [
      {
        label: "Square - 1:1",
        ratio: 1,
        width: 512,
        height: 512,
      },
      {
        label: "Portrait - 9:16",
        ratio: 0.5625,
        width: 512,
        height: 910,
      },
      {
        label: "Landscape - 16:9",
        ratio: 1.78,
        width: 512,
        height: 288,
      },
      {
        label: "Standard - 4:3",
        ratio: 1.34,
        width: 512,
        height: 384,
      },
    ],
  },
];
