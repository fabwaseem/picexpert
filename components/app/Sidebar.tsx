"use client";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollShadow,
  Slider,
  Tab,
  Tabs,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import validateColor from "validate-color";
import { useTheme } from "next-themes";

import AngleSelector from "../AngleSelector";
import DraggableWatermarkSelector from "../DraggableWatermarkSelector";
import {
  AppMenuIcon,
  BanIcon,
  BlurIcon,
  ChevronDownIcon,
  CircleIcon,
  ColorIcon,
  CropIcon,
  CurvedIcon,
  DownloadIcon,
  ExpandIcon,
  ExportSettingIcon,
  ImageIcon,
  Logo,
  LogoDark,
  OpacityHighIcon,
  OpacityLowIcon,
  PlusRoundIcon,
  RoundIcon,
  SettingIcon,
  SharpIcon,
  SizeLargeIcon,
  SizeSmallIcon,
  TextIcon,
} from "../icons";

import ColorPicker from "./ColorPicker";
import FeedbackModal from "./FeedbackModal";
import { GradientPicker } from "./GradientPicker";
import SettingsModal from "./SettingsModal";

import { setupWorker } from "@/workers/setup";
import { DetailedFile, Scalling, SettingsProps } from "@/types";
import { updateSetting } from "@/store/slices/settingsSlice";
import { addFiles } from "@/store/slices/FilesSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  calculateAspectRatio,
  calculateDimensions,
  cn,
  convertToDetailedFile,
  downloadSingleImage,
  downloadZip,
  getAspectRatio,
  isSupported,
} from "@/lib/utils";
import { socialMediaRatios } from "@/config/socialRatios";

const Sidebar = () => {
  const settings = useAppSelector((state) => state.settings);
  const files = useAppSelector((state) => state.files);
  const dispatch = useAppDispatch();
  const sidebarMenuRef = useRef<HTMLDivElement | null>(null);
  const sidebarMenuBtnRef = useRef<HTMLButtonElement | null>(null);
  const [customDimentions, setCustomDimentions] = useState<{
    width: number;
    height: number;
    ratio: number;
  }>({ width: 0, height: 0, ratio: 0 });

  const [isOpenSocialSizeDropdown, setIsOpenSocialSizeDropdown] =
    useState<boolean>(false);
  const [selectSocialRatioTab, setSelectSocialRatioTab] =
    useState<string>("custom");
  const [selectedRatio, setSelectedRatio] = useState(
    socialMediaRatios.find((item) => item.id === selectSocialRatioTab)
      ?.ratios[0],
  );
  const [recentCustomSizes, setRecentCustomSizes] = useState<
    { label: string; ratio: number; width: number; height: number }[]
  >([]);
  const [sidebarActiveMobile, setSidebarActiveMobile] =
    useState<boolean>(false);
  const {
    isOpen: isOpenFeedbackModal,
    onOpen: onOpenFeedbackModal,
    onOpenChange: onOpenChangeFeedbackModal,
  } = useDisclosure();
  const {
    isOpen: isOpenSettingsModal,
    onOpen: onOpenSettingsModal,
    onOpenChange: onOpenChangeSettingsModal,
  } = useDisclosure();

  const [currentBgColor, setCurrentBgColor] = useState(
    settings.background.color.solid,
  );
  const [gradientStart, setGradientStart] = useState(
    settings.background.color.gradient.start,
  );
  const [gradientEnd, setGradientEnd] = useState(
    settings.background.color.gradient.end,
  );
  const [currentRoundness, setCurrentRoundness] = useState(
    settings.border.radius,
  );

  const workerRef = useRef<Worker>(null);
  const skipEffect = useRef(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const settingsRef = useRef<SettingsProps>(settings);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  const onDropFiles = useCallback(
    async (acceptedFiles: File[]) => {
      const filesToAdd: DetailedFile[] = [];

      for (let i = 0; i < acceptedFiles.length; i++) {
        if (isSupported(acceptedFiles[i])) {
          let file = await convertToDetailedFile(acceptedFiles[i]);

          if (file) {
            filesToAdd.push(file);
          }
        }
      }
      if (filesToAdd.length) {
        dispatch(addFiles(filesToAdd));
      }
    },
    [dispatch],
  );

  const { getInputProps: getAddFilesInputProps, open: openAddFiles } =
    useDropzone({
      onDrop: onDropFiles,
      noClick: true,
      noKeyboard: true,
      multiple: true,
      accept: {
        "image/*": [".png", ".gif", ".jpeg", ".jpg", ".webp"],
      },
    });

  useEffect(
    () => setupWorker(handleDownload, setIsLoading, skipEffect, workerRef),
    [],
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem("picexpert.customSizes");

      if (raw) {
        const parsed = JSON.parse(raw) as {
          label: string;
          ratio: number;
          width: number;
          height: number;
        }[];

        setRecentCustomSizes(parsed.slice(0, 5));
      }
    } catch {
      /* ignore */
    }
  }, []);

  const saveRecentCustomSize = (width: number, height: number) => {
    try {
      const ratio = calculateAspectRatio(width, height);
      const label = `Custom - ${getAspectRatio(width, height)}`;
      const raw = localStorage.getItem("picexpert.customSizes");
      const existing: {
        label: string;
        ratio: number;
        width: number;
        height: number;
      }[] = raw ? JSON.parse(raw) : [];
      const deduped = [
        { label, ratio, width, height },
        ...existing.filter((r) => !(r.width === width && r.height === height)),
      ].slice(0, 5);

      localStorage.setItem("picexpert.customSizes", JSON.stringify(deduped));
      setRecentCustomSizes(deduped);
    } catch {
      /* ignore */
    }
  };

  const handleDownload = async (files: DetailedFile[]) => {
    if (files.length === 1) {
      await downloadSingleImage(files[0], settingsRef.current);
    } else {
      await downloadZip(files, settingsRef.current);
    }
  };

  const callDownload = () => {
    setIsLoading(true);
    if (settings.mode === "expand") {
      workerRef.current?.postMessage({
        files,
        settings,
        isPreview: false,
        crop: false,
      });
    } else {
      workerRef.current?.postMessage({
        files,
        settings,
        isPreview: false,
        crop: true,
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      updateSetting({
        width: customDimentions.width,
        height: customDimentions.height,
        aspectRatio: selectedRatio?.ratio,
      }),
    );
    saveRecentCustomSize(customDimentions.width, customDimentions.height);
    setIsOpenSocialSizeDropdown(false);
    setSelectedRatio({
      label: `Custom - ${getAspectRatio(
        customDimentions.width,
        customDimentions.height,
      )}`,
      width: customDimentions.width,
      height: customDimentions.height,
      ratio: customDimentions.ratio,
    });
  };

  return (
    <>
      <div className="flex flex-col md:w-72 md:min-w-72  gap-1 z-10 max-md:fixed max-md:w-[calc(100%-8px)] max-md:top-1 max-md:left-1">
        <Card>
          <CardBody className="p-2 ">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 relative">
                {resolvedTheme === "dark" ? (
                  <Logo size={24} />
                ) : (
                  <LogoDark size={24} />
                )}
                <h4 className="text-lg font-semibold">picExpert</h4>
              </div>
              <div className="flex items-center">
                {files.length > 0 && (
                  <>
                    <input {...getAddFilesInputProps()} />
                    <Tooltip
                      showArrow
                      content="Add more images"
                      delay={1000}
                      radius="sm"
                    >
                      <Button
                        isIconOnly
                        aria-label="Add more images"
                        color="default"
                        size="sm"
                        variant="light"
                        onPress={openAddFiles}
                      >
                        <PlusRoundIcon size={20} />
                      </Button>
                    </Tooltip>
                  </>
                )}
                {/* <Tooltip
                  showArrow
                  content="Send Feedback"
                  delay={1000}
                  radius="sm"
                >
                  <Button
                    isIconOnly
                    aria-label="Send Feedback"
                    color="default"
                    size="sm"
                    variant="light"
                    onPress={onOpenFeedbackModal}
                  >
                    <FeedbackIcon size={20} />
                  </Button>
                </Tooltip> */}
                <Tooltip showArrow content="App Menu" delay={1000} radius="sm">
                  <Button
                    isIconOnly
                    aria-label="App Menu"
                    color="default"
                    size="sm"
                    variant="light"
                    onPress={onOpenSettingsModal}
                  >
                    <AppMenuIcon size={20} />
                  </Button>
                </Tooltip>
                <Tooltip showArrow content="Settings" delay={1000} radius="sm">
                  <Button
                    ref={sidebarMenuBtnRef}
                    isIconOnly
                    aria-label="Send Feedback"
                    className="md:hidden"
                    color="default"
                    size="sm"
                    variant="light"
                    onPress={() => setSidebarActiveMobile(!sidebarActiveMobile)}
                  >
                    <SettingIcon size={28} />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card
          ref={sidebarMenuRef}
          className={cn(
            "flex-1 max-md:fixed  max-md:bottom-1  max-md:left-1  max-md:w-[calc(100%-8px)] transition-transform max-md:z-20",
            sidebarActiveMobile ? "translate-y-0" : "max-md:translate-y-full",
          )}
        >
          <CardBody className="p-2 flex flex-col gap-1">
            <Tabs
              fullWidth
              aria-label="Resize Method"
              classNames={{
                tabList: "px-0 ",
              }}
              defaultSelectedKey={settings.mode}
              radius="sm"
              size="lg"
              variant="light"
              onSelectionChange={(key) => {
                if (key !== settings.mode) {
                  dispatch(
                    updateSetting({
                      mode: key as "expand" | "crop",
                    }),
                  );
                }
              }}
            >
              <Tab
                key="expand"
                title={
                  <div className="flex items-center space-x-2">
                    <ExpandIcon size={20} />
                    <span className=" font-semibold">Expand</span>
                  </div>
                }
              />
              <Tab
                key="crop"
                title={
                  <div className="flex items-center space-x-2">
                    <CropIcon size={20} />
                    <span className=" font-semibold">Crop</span>
                  </div>
                }
              />
            </Tabs>

            <Dropdown
              // backdrop="blur"
              isOpen={isOpenSocialSizeDropdown}
              onOpenChange={(open) => setIsOpenSocialSizeDropdown(open)}
            >
              <DropdownTrigger>
                <Button
                  className="justify-between text-left h-[50px]"
                  radius="sm"
                  variant="flat"
                >
                  <div className="flex items-center gap-2 justify-start ">
                    <div className="py-1 w-10 flex items-center justify-center">
                      <div
                        className="relative w-10 "
                        style={{
                          width: `${selectedRatio && calculateDimensions(selectedRatio).width / 5}px`,
                          height: `${selectedRatio && calculateDimensions(selectedRatio).height / 5}px`,
                        }}
                      >
                        <Image
                          fill
                          alt={selectedRatio?.label + ""}
                          className="object-cover rounded-sm"
                          sizes="200px"
                          src={"/images/preview.jpg"}
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold">{selectedRatio?.label}</h4>
                      <p className="text-2xs opacity-50">
                        {selectedRatio?.width} x {selectedRatio?.height}
                      </p>
                    </div>
                  </div>
                  <ChevronDownIcon
                    className={cn(
                      "opacity-50 transition-transform ",
                      isOpenSocialSizeDropdown ? "transform rotate-180" : "",
                    )}
                    size={14}
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Select Ratio"
                className="h-[50vh] max-h-[50vh] md:h-[70vh] md:max-h-[70vh] overflow-hidden"
              >
                <DropdownItem key="new" isReadOnly>
                  {(!settings.customCrop || settings.mode === "expand") && (
                    <form className="flex gap-2" onSubmit={handleSubmit}>
                      <div>
                        <Input
                          aria-label="images width"
                          className="!text-right ml-auto"
                          endContent={
                            <span className="text-default-400 text-xs">px</span>
                          }
                          id="width"
                          placeholder={selectedRatio?.width + ""}
                          radius="sm"
                          size="lg"
                          startContent={
                            <span className="text-default-400 text-sm font-medium ">
                              W
                            </span>
                          }
                          type="number"
                          value={
                            customDimentions?.width === 0
                              ? ""
                              : customDimentions?.width + ""
                          }
                          onValueChange={(e) => {
                            let value = parseInt(e);

                            if (value < 0 || isNaN(value)) {
                              value = 0;
                            }
                            let baseHeight =
                              customDimentions.height > 0
                                ? customDimentions.height
                                : settings.height;
                            let aspectRatio = settings.aspectRatio;
                            let height = baseHeight;

                            if (settings.lockRatio) {
                              height = Math.max(
                                0,
                                Math.round(value / aspectRatio),
                              );
                            } else {
                              aspectRatio = calculateAspectRatio(
                                value,
                                baseHeight,
                              );
                            }
                            setCustomDimentions({
                              width: value,
                              height,
                              ratio: aspectRatio,
                            });
                            setSelectedRatio({
                              label: `Custom - ${getAspectRatio(value, height)}`,
                              width: value,
                              height,
                              ratio: aspectRatio,
                            });
                          }}
                        />
                      </div>
                      <div>
                        <Input
                          aria-label="images height"
                          className="!text-right ml-auto"
                          endContent={
                            <span className="text-default-400 text-xs">px</span>
                          }
                          id="height"
                          placeholder={selectedRatio?.height + ""}
                          radius="sm"
                          size="lg"
                          startContent={
                            <span className="text-default-400 text-sm font-medium ">
                              H
                            </span>
                          }
                          type="number"
                          value={
                            customDimentions?.height === 0
                              ? ""
                              : customDimentions?.height + ""
                          }
                          onValueChange={(e) => {
                            let value = parseInt(e);

                            if (value < 0 || isNaN(value)) {
                              value = 0;
                            }
                            let baseWidth =
                              customDimentions.width > 0
                                ? customDimentions.width
                                : settings.width;
                            let aspectRatio = settings.aspectRatio;
                            let width = baseWidth;

                            if (settings.lockRatio) {
                              width = Math.max(
                                0,
                                Math.round(value * aspectRatio),
                              );
                            } else {
                              aspectRatio = calculateAspectRatio(
                                baseWidth,
                                value,
                              );
                            }
                            setCustomDimentions({
                              height: value,
                              width,
                              ratio: aspectRatio,
                            });
                            setSelectedRatio({
                              label: `Custom - ${getAspectRatio(width, value)}`,
                              width,
                              height: value,
                              ratio: aspectRatio,
                            });
                          }}
                        />
                      </div>
                      <Button
                        isIconOnly
                        size="lg"
                        type="submit"
                        variant="bordered"
                      >
                        Set
                      </Button>
                    </form>
                  )}

                  <Tabs
                    aria-label="Resize Method"
                    className="md:max-w-xl "
                    classNames={{
                      tabList: "overflow-auto ",
                    }}
                    defaultSelectedKey={selectSocialRatioTab}
                    items={socialMediaRatios}
                    radius="sm"
                    variant="light"
                    onSelectionChange={(key) =>
                      setSelectSocialRatioTab(key as string)
                    }
                  >
                    {(item) => (
                      <Tab
                        key={item.id}
                        title={
                          <>
                            <span className="hidden md:block">
                              {item.label}
                            </span>{" "}
                            <item.icon className="md:hidden" />
                          </>
                        }
                      />
                    )}
                  </Tabs>
                  <Divider className="my-2" />
                  <ScrollShadow hideScrollBar>
                    <div className="h-[calc(50vh-160px)] md:h-[calc(70vh-160px)] p-3 space-y-4">
                      {selectSocialRatioTab === "custom" &&
                        recentCustomSizes.length > 0 && (
                          <div>
                            <h6 className="font-semibold text-2xs uppercase opacity-50 tracking-wider mb-2">
                              Recent
                            </h6>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {recentCustomSizes.map((ratio, index) => (
                                <button
                                  key={`recent-${index}`}
                                  className={cn(
                                    "flex flex-col items-stretch p-3 rounded-xl  bg-content2/50 hover:bg-content2/75 transition-colors ",
                                  )}
                                  onClick={() => {
                                    setSelectedRatio(ratio);
                                    setIsOpenSocialSizeDropdown(false);
                                    dispatch(
                                      updateSetting({
                                        width: ratio.width,
                                        height: ratio.height,
                                        aspectRatio: ratio.ratio,
                                      }),
                                    );
                                  }}
                                >
                                  <div className="p-1.5 text-left">
                                    <h6 className="font-semibold">
                                      {ratio.label}
                                    </h6>
                                    <p className=" opacity-50">
                                      {ratio.width}x{ratio.height} (
                                      {ratio.ratio})
                                    </p>
                                  </div>
                                  <div className="relative flex-1 min-h-20 flex items-center justify-center">
                                    <div
                                      className="relative"
                                      style={{
                                        width: `${calculateDimensions(ratio).width}px`,
                                        height: `${calculateDimensions(ratio).height}px`,
                                      }}
                                    >
                                      <Image
                                        fill
                                        alt={ratio.label}
                                        className="object-cover rounded"
                                        sizes="500px"
                                        src={"/images/preview.jpg"}
                                      />
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {socialMediaRatios
                          .find((item) => item.id === selectSocialRatioTab)
                          ?.ratios.map((ratio, index) => (
                            <button
                              key={index}
                              className={cn(
                                "flex flex-col items-stretch p-3 rounded-xl  bg-content2/50 hover:bg-content2/75 transition-colors ",
                                selectedRatio?.label === ratio.label
                                  ? "bg-content2/100 outline outline-1 outline-offset-3"
                                  : "",
                              )}
                              onClick={() => {
                                setSelectedRatio(ratio);
                                setIsOpenSocialSizeDropdown(false);
                                dispatch(
                                  updateSetting({
                                    width: ratio.width,
                                    height: ratio.height,
                                    aspectRatio: ratio.ratio,
                                  }),
                                );
                              }}
                            >
                              <div className="p-1.5 text-left">
                                <h6 className="font-semibold">{ratio.label}</h6>
                                <p className=" opacity-50">
                                  {ratio.width}x{ratio.height} ({ratio.ratio})
                                </p>
                              </div>
                              <div className="relative flex-1 min-h-20 flex items-center justify-center">
                                <div
                                  className="relative"
                                  style={{
                                    width: `${calculateDimensions(ratio).width}px`,
                                    height: `${calculateDimensions(ratio).height}px`,
                                  }}
                                >
                                  <Image
                                    fill
                                    alt={ratio.label}
                                    className="object-cover rounded"
                                    sizes="500px"
                                    src={"/images/preview.jpg"}
                                  />
                                </div>
                              </div>
                            </button>
                          ))}
                      </div>
                    </div>
                  </ScrollShadow>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <ScrollShadow hideScrollBar className="flex-1 max-md:max-h-[50vh] ">
              <div className="space-y-8 pt-4">
                {settings.mode === "crop" && (
                  <div>
                    <Checkbox
                      className="mt-1"
                      classNames={{
                        label: "text-sm opacity-60",
                      }}
                      isSelected={settings.customCrop}
                      onValueChange={(value) =>
                        dispatch(
                          updateSetting({
                            customCrop: value,
                          }),
                        )
                      }
                    >
                      Crop images individually
                    </Checkbox>
                  </div>
                )}

                {settings.mode === "expand" && (
                  <div>
                    <h6 className="font-semibold text-2xs uppercase opacity-50 tracking-wider">
                      background
                    </h6>
                    <div className="grid grid-cols-3 gap-1.5 mt-2 p-1">
                      <button
                        className={cn(
                          "tracking-[-.6px] text-2xs rounded-lg flex flex-col gap-1.5  items-center justify-center dark:bg-background bg-content2 outline outline-1 outline-white/0 transition-all aspect-[4/3]  p-2 cursor-pointer",
                          settings.background.type === "blur" &&
                            "outline-white/100 outline-offset-3",
                        )}
                        onClick={() =>
                          dispatch(
                            updateSetting({
                              background: {
                                ...settings.background,
                                type: "blur",
                              },
                            }),
                          )
                        }
                      >
                        <div className=" flex items-center justify-center rounded-full">
                          <BlurIcon />
                        </div>
                        Blur
                      </button>

                      <button
                        className={cn(
                          "tracking-[-.6px] text-2xs rounded-lg flex flex-col gap-1.5  items-center justify-center dark:bg-background bg-content2 outline outline-1 outline-white/0 transition-all aspect-[4/3]  p-2 cursor-pointer ",
                          settings.background.type === "color" &&
                            "outline-white/100 outline-offset-3",
                        )}
                        onClick={() =>
                          dispatch(
                            updateSetting({
                              background: {
                                ...settings.background,
                                type: "color",
                              },
                            }),
                          )
                        }
                      >
                        <div className="flex items-center justify-center rounded-full">
                          <ColorIcon />
                        </div>
                        Color
                      </button>

                      <button
                        className={cn(
                          "tracking-[-.6px] text-2xs rounded-lg flex flex-col gap-1.5  items-center justify-center dark:bg-background bg-content2 outline outline-1 outline-white/0 transition-all aspect-[4/3]  p-2 cursor-pointer ",
                          settings.background.type === "image" &&
                            "outline-white/100 outline-offset-3",
                        )}
                        onClick={() =>
                          dispatch(
                            updateSetting({
                              background: {
                                ...settings.background,
                                type: "image",
                              },
                            }),
                          )
                        }
                      >
                        <div className="w-6 h-6 relative flex items-center justify-center">
                          {settings.background.image.image ? (
                            <Image
                              fill
                              alt={
                                settings.background.image.image?.baseName + ""
                              }
                              className="object-cover rounded"
                              sizes="200px"
                              src={
                                settings.background.image.image?.previewUrl + ""
                              }
                            />
                          ) : (
                            <ImageIcon />
                          )}
                        </div>
                        Image
                      </button>
                    </div>

                    {settings.background.type === "blur" && (
                      <div className="mt-4 p-1">
                        <h6 className="font-semibold text-2xs uppercase opacity-50 tracking-wider mb-2">
                          blur strength
                        </h6>
                        <Slider
                          aria-label="blur strength"
                          defaultValue={settings.background.blurStrength}
                          endContent={
                            <div className="w-6 h-6 flex items-center justify-center">
                              <BlurIcon size={20} />
                            </div>
                          }
                          maxValue={100}
                          minValue={0}
                          showTooltip={true}
                          size="sm"
                          startContent={
                            <div className="w-6 h-6 flex items-center justify-center">
                              <CircleIcon size={16} />
                            </div>
                          }
                          onChangeEnd={(value) =>
                            dispatch(
                              updateSetting({
                                background: {
                                  ...settings.background,
                                  blurStrength: value as number,
                                  type: "blur",
                                },
                              }),
                            )
                          }
                        />
                      </div>
                    )}

                    {settings.background.type === "color" && (
                      <div className="mt-4 p-1 space-y-4">
                        <Tabs
                          fullWidth
                          aria-label="Color Mode"
                          selectedKey={settings.background.color.mode}
                          size="sm"
                          onSelectionChange={(key) =>
                            dispatch(
                              updateSetting({
                                background: {
                                  ...settings.background,
                                  color: {
                                    ...settings.background.color,
                                    mode: key as "solid" | "gradient",
                                  },
                                },
                              }),
                            )
                          }
                        >
                          <Tab key="solid" title="Solid" />
                          <Tab key="gradient" title="Gradient" />
                        </Tabs>

                        {settings.background.color.mode === "solid" && (
                          <div>
                            <h6 className="font-semibold text-2xs uppercase opacity-50 tracking-wider mb-2">
                              Color
                            </h6>
                            <ColorPicker
                              inputId="bg-color"
                              label="Color"
                              value={currentBgColor}
                              onChange={(value) => {
                                setCurrentBgColor(value);
                              }}
                              onChangeEnd={(value) => {
                                const validColor = validateColor(value);

                                validColor &&
                                  dispatch(
                                    updateSetting({
                                      background: {
                                        ...settings.background,
                                        color: {
                                          ...settings.background.color,
                                          solid: value,
                                        },
                                      },
                                    }),
                                  );
                              }}
                            />
                          </div>
                        )}

                        {settings.background.color.mode === "gradient" && (
                          <div className="space-y-4">
                            <div>
                              <h6 className="font-semibold text-2xs uppercase opacity-50 tracking-wider mb-2">
                                Gradient
                              </h6>
                              <GradientPicker
                                endColor={gradientEnd}
                                startColor={gradientStart}
                                onEndChange={setGradientEnd}
                                onEndChangeEnd={(value) => {
                                  const validColor = validateColor(value);

                                  validColor &&
                                    dispatch(
                                      updateSetting({
                                        background: {
                                          ...settings.background,
                                          color: {
                                            ...settings.background.color,
                                            gradient: {
                                              ...settings.background.color
                                                .gradient,
                                              end: value,
                                            },
                                          },
                                        },
                                      }),
                                    );
                                }}
                                onStartChange={setGradientStart}
                                onStartChangeEnd={(value) => {
                                  const validColor = validateColor(value);

                                  validColor &&
                                    dispatch(
                                      updateSetting({
                                        background: {
                                          ...settings.background,
                                          color: {
                                            ...settings.background.color,
                                            gradient: {
                                              ...settings.background.color
                                                .gradient,
                                              start: value,
                                            },
                                          },
                                        },
                                      }),
                                    );
                                }}
                              />
                            </div>
                            <div>
                              <h6 className="font-semibold text-2xs uppercase opacity-50 tracking-wider mb-2">
                                Direction
                              </h6>
                              <AngleSelector
                                angle={
                                  settings.background.color.gradient.direction
                                }
                                label="Direction"
                                setAngle={(angle) =>
                                  dispatch(
                                    updateSetting({
                                      background: {
                                        ...settings.background,
                                        color: {
                                          ...settings.background.color,
                                          gradient: {
                                            ...settings.background.color
                                              .gradient,
                                            direction: angle,
                                          },
                                        },
                                      },
                                    }),
                                  )
                                }
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {settings.background.type === "image" && (
                      <div className="mt-4 p-1 space-y-4">
                        <Dropzone
                          onDrop={async (acceptedFiles) => {
                            const image = await convertToDetailedFile(
                              acceptedFiles[0],
                            );

                            image &&
                              dispatch(
                                updateSetting({
                                  background: {
                                    ...settings.background,
                                    image: {
                                      ...settings.background.image,
                                      image,
                                      history: [
                                        image,
                                        ...settings.background.image.history,
                                      ].slice(0, 4),
                                    },
                                    type: "image",
                                  },
                                }),
                              );
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <section>
                              <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className="h-full w-full flex justify-center items-center">
                                  <Card className="w-full aspect-[4/3] group cursor-pointer bg-content2 border-dashed border-2 border-default-300">
                                    <CardBody className="flex flex-col items-center justify-center p-4">
                                      <ImageIcon className="w-8 h-8 opacity-50 mb-2" />
                                      <h3 className="text-sm font-semibold text-center">
                                        Choose Image
                                      </h3>
                                      <p className="text-xs opacity-50 text-center mt-1">
                                        or drag it here
                                      </p>
                                    </CardBody>
                                  </Card>
                                </div>
                              </div>
                            </section>
                          )}
                        </Dropzone>

                        <div className="flex gap-2 bg-content2 p-1 rounded-lg">
                          {(["fit", "fill", "stretch", "repeat"] as const).map(
                            (fit, index) => (
                              <button
                                key={index}
                                className={cn(
                                  "flex-1 rounded-md text-xs py-1.5 transition-all capitalize",
                                  settings.background.image.fit === fit
                                    ? "bg-background shadow-sm font-semibold"
                                    : "opacity-60 hover:opacity-100",
                                )}
                                onClick={() =>
                                  dispatch(
                                    updateSetting({
                                      background: {
                                        ...settings.background,
                                        image: {
                                          ...settings.background.image,
                                          fit: fit as Scalling,
                                        },
                                        type: "image",
                                      },
                                    }),
                                  )
                                }
                              >
                                {fit}
                              </button>
                            ),
                          )}
                        </div>

                        <div>
                          <h6 className="font-semibold text-2xs uppercase opacity-50 tracking-wider mb-2">
                            Recent
                          </h6>
                          {settings.background.image.history.length > 0 ? (
                            <div className="grid grid-cols-4 gap-2">
                              {settings.background.image.history.map(
                                (image, index) => (
                                  <button
                                    key={index}
                                    className="relative aspect-square w-full rounded-md overflow-hidden border border-default-200"
                                    onClick={() =>
                                      dispatch(
                                        updateSetting({
                                          background: {
                                            ...settings.background,
                                            image: {
                                              ...settings.background.image,
                                              image: image,
                                            },
                                            type: "image",
                                          },
                                        }),
                                      )
                                    }
                                  >
                                    <Image
                                      fill
                                      alt="history"
                                      className="object-cover"
                                      sizes="48px"
                                      src={image.previewUrl}
                                    />
                                  </button>
                                ),
                              )}
                            </div>
                          ) : (
                            <p className="opacity-50 text-xs">
                              No recent images
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div>
                  <h6 className="font-semibold text-2xs uppercase opacity-50 tracking-wider">
                    Watermark
                  </h6>

                  <div className="dark:bg-background bg-content2 p-1 grid grid-cols-3 rounded-lg mt-2 gap-1">
                    <div
                      className={cn(
                        "flex items-center justify-center max-md:h-20 md:max-md:h-20 md:aspect-[4/3]  rounded-md flex-col gap-2 cursor-pointer",
                        settings.watermark.enabled &&
                          settings.watermark.type === "text"
                          ? "bg-content1"
                          : "hover:bg-content1/50",
                      )}
                      onClick={() =>
                        dispatch(
                          updateSetting({
                            watermark: {
                              ...settings.watermark,
                              enabled: true,
                              type: "text",
                            },
                          }),
                        )
                      }
                    >
                      <TextIcon size={28} />
                      <p
                        className={cn(
                          "text-3xs uppercase tracking-wider",
                          settings.watermark.enabled &&
                            settings.watermark.type === "text"
                            ? "opacity-100"
                            : "opacity-50",
                        )}
                      >
                        Text
                      </p>
                    </div>
                    <div
                      className={cn(
                        "flex items-center justify-center max-md:h-20 md:max-md:h-20 md:aspect-[4/3]  rounded-md flex-col gap-2 cursor-pointer",
                        settings.watermark.enabled &&
                          settings.watermark.type === "image"
                          ? "bg-content1"
                          : "hover:bg-content1/50",
                      )}
                      onClick={() =>
                        dispatch(
                          updateSetting({
                            watermark: {
                              ...settings.watermark,
                              enabled: true,
                              type: "image",
                            },
                          }),
                        )
                      }
                    >
                      <ImageIcon size={28} />
                      <p
                        className={cn(
                          "text-3xs uppercase tracking-wider",
                          settings.watermark.enabled &&
                            settings.watermark.type === "image"
                            ? "opacity-100"
                            : "opacity-50",
                        )}
                      >
                        Image
                      </p>
                    </div>
                    <div
                      className={cn(
                        "flex items-center justify-center max-md:h-20 md:max-md:h-20 md:aspect-[4/3]  rounded-md flex-col gap-2 cursor-pointer",
                        !settings.watermark.enabled
                          ? "bg-content1"
                          : "hover:bg-content1/50",
                      )}
                      onClick={() =>
                        dispatch(
                          updateSetting({
                            watermark: {
                              ...settings.watermark,
                              enabled: false,
                            },
                          }),
                        )
                      }
                    >
                      <BanIcon size={28} />
                      <p
                        className={cn(
                          "text-3xs uppercase tracking-wider",
                          !settings.watermark.enabled
                            ? "opacity-100"
                            : "opacity-50",
                        )}
                      >
                        None
                      </p>
                    </div>
                  </div>

                  {settings.watermark.enabled && (
                    <div className="mt-4 mb-2">
                      <Tabs
                        fullWidth
                        aria-label="Watermark Pattern"
                        selectedKey={settings.watermark.pattern || "single"}
                        size="sm"
                        onSelectionChange={(key) =>
                          dispatch(
                            updateSetting({
                              watermark: {
                                ...settings.watermark,
                                pattern: key as "single" | "repeat",
                              },
                            }),
                          )
                        }
                      >
                        <Tab key="single" title="Single" />
                        <Tab key="repeat" title="Repeat" />
                      </Tabs>
                    </div>
                  )}

                  {settings.watermark.enabled &&
                    settings.watermark.pattern === "repeat" && (
                      <AngleSelector
                        angle={settings.watermark.direction}
                        label="Rotation"
                        setAngle={(angle) =>
                          dispatch(
                            updateSetting({
                              watermark: {
                                ...settings.watermark,
                                direction: angle,
                              },
                            }),
                          )
                        }
                      />
                    )}

                  {settings.watermark.enabled &&
                    settings.watermark.type === "image" && (
                      <div className="mt-4 p-1 space-y-4">
                        <Dropzone
                          onDrop={async (acceptedFiles) => {
                            const image = await convertToDetailedFile(
                              acceptedFiles[0],
                            );

                            image &&
                              dispatch(
                                updateSetting({
                                  watermark: {
                                    ...settings.watermark,
                                    image: {
                                      ...settings.watermark.image,
                                      image: image,
                                    },
                                  },
                                }),
                              );
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <section>
                              <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className="h-full w-full flex justify-center items-center">
                                  <Card className="w-full aspect-[4/3] group cursor-pointer bg-content2 border-dashed border-2 border-default-300">
                                    <CardBody className="flex flex-col items-center justify-center p-4 overflow-hidden">
                                      {settings.watermark.image.image ? (
                                        <div className="relative w-full h-full flex items-center justify-center">
                                          <Image
                                            fill
                                            alt={
                                              settings.watermark.image.image
                                                .baseName
                                            }
                                            className="object-contain"
                                            src={
                                              settings.watermark.image.image
                                                .previewUrl
                                            }
                                          />
                                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold z-10">
                                            Change Image
                                          </div>
                                        </div>
                                      ) : (
                                        <>
                                          <ImageIcon className="w-8 h-8 opacity-50 mb-2" />
                                          <h3 className="text-sm font-semibold text-center">
                                            Choose Image
                                          </h3>
                                          <p className="text-xs opacity-50 text-center mt-1">
                                            or drag it here
                                          </p>
                                        </>
                                      )}
                                    </CardBody>
                                  </Card>
                                </div>
                              </div>
                            </section>
                          )}
                        </Dropzone>
                      </div>
                    )}
                  {settings.watermark.enabled &&
                    settings.watermark.type === "text" && (
                      <div className="mt-2 space-y-2">
                        <Input
                          aria-label="watermark text"
                          id="watermarkText"
                          label="Text"
                          placeholder="Watermark Text"
                          radius="sm"
                          type="text"
                          value={settings.watermark.text.text}
                          onValueChange={(value) =>
                            dispatch(
                              updateSetting({
                                watermark: {
                                  ...settings.watermark,
                                  text: {
                                    ...settings.watermark.text,
                                    text: value,
                                  },
                                },
                              }),
                            )
                          }
                        />
                        <ColorPicker
                          inputId="watermarkTextColor"
                          label="Text Color"
                          value={settings.watermark.text.color}
                          onChange={(value) =>
                            dispatch(
                              updateSetting({
                                watermark: {
                                  ...settings.watermark,
                                  text: {
                                    ...settings.watermark.text,
                                    color: value,
                                  },
                                },
                              }),
                            )
                          }
                        />
                      </div>
                    )}

                  {settings.watermark.enabled && (
                    <>
                      <div className="mt-2">
                        <p className="font-semibold text-2xs uppercase opacity-50 tracking-wider mb-2">
                          Opacity
                        </p>
                        <Slider
                          aria-label="watermark opacity"
                          defaultValue={settings.watermark.opacity}
                          endContent={
                            <div className="w-6 h-6 flex items-center justify-center">
                              <OpacityHighIcon
                                className="opacity-50"
                                size={20}
                              />
                            </div>
                          }
                          maxValue={1}
                          minValue={0.1}
                          showTooltip={true}
                          size="sm"
                          startContent={
                            <div className="w-6 h-6 flex items-center justify-center">
                              <OpacityLowIcon
                                className="opacity-50"
                                size={20}
                              />
                            </div>
                          }
                          step={0.1}
                          tooltipValueFormatOptions={{
                            style: "percent",
                          }}
                          onChangeEnd={(value) =>
                            dispatch(
                              updateSetting({
                                watermark: {
                                  ...settings.watermark,
                                  opacity: value as number,
                                },
                              }),
                            )
                          }
                        />
                      </div>
                      <div className="mt-4">
                        <p className="font-semibold text-2xs uppercase opacity-50 tracking-wider mb-2">
                          Size
                        </p>
                        <Slider
                          aria-label="watermark size"
                          defaultValue={settings.watermark.size}
                          endContent={
                            <div className="w-6 h-6 flex items-center justify-center">
                              <SizeLargeIcon className="opacity-50" size={20} />
                            </div>
                          }
                          maxValue={100}
                          minValue={5}
                          showTooltip={true}
                          size="sm"
                          startContent={
                            <div className="w-6 h-6 flex items-center justify-center">
                              <SizeSmallIcon className="opacity-50" size={20} />
                            </div>
                          }
                          onChangeEnd={(value) =>
                            dispatch(
                              updateSetting({
                                watermark: {
                                  ...settings.watermark,
                                  size: value as number,
                                },
                              }),
                            )
                          }
                        />
                      </div>
                      {settings.watermark.pattern !== "repeat" && (
                        <DraggableWatermarkSelector />
                      )}
                    </>
                  )}
                </div>

                <div>
                  <h6 className="font-semibold text-2xs uppercase opacity-50 tracking-wider">
                    roundness
                  </h6>
                  <div className="mt-2">
                    <Slider
                      aria-label="border radius"
                      endContent={
                        <RoundIcon className="opacity-50" size={18} />
                      }
                      getValue={(v) => `${v}%`}
                      maxValue={100}
                      minValue={0}
                      showTooltip={true}
                      size="sm"
                      startContent={
                        <SharpIcon className="opacity-50" size={18} />
                      }
                      value={currentRoundness}
                      onChange={(value) => setCurrentRoundness(value as number)}
                      onChangeEnd={(value) =>
                        dispatch(
                          updateSetting({
                            border: {
                              ...settings.border,
                              radius: value as number,
                            },
                          }),
                        )
                      }
                    />
                  </div>
                  <div className="dark:bg-background bg-content2 p-1 grid grid-cols-3 rounded-lg mt-4 gap-1">
                    {[
                      {
                        label: "Sharp",
                        value: 0,
                        icon: <SharpIcon size={28} />,
                      },
                      {
                        label: "Curved",
                        value: 30,
                        icon: <CurvedIcon size={28} />,
                      },
                      {
                        label: "Round",
                        value: 100,
                        icon: <RoundIcon size={28} />,
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex items-center justify-center max-md:h-20 md:aspect-[4/3]  rounded-md flex-col gap-2 cursor-pointer",
                          settings.border.radius === item.value
                            ? "bg-content1"
                            : "hover:bg-content1/50",
                        )}
                        onClick={() => {
                          setCurrentRoundness(item.value);
                          dispatch(
                            updateSetting({
                              border: {
                                ...settings.border,
                                radius: item.value,
                              },
                            }),
                          );
                        }}
                      >
                        {item.icon}
                        <p
                          className={cn(
                            "text-3xs uppercase  tracking-wider",
                            settings.border.radius === item.value
                              ? "opacity-100"
                              : "opacity-50",
                          )}
                        >
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollShadow>
            <div className="flex gap-2">
              <Button
                className="w-full"
                disabled={files.length === 0}
                size="lg"
                variant="faded"
                onPress={callDownload}
              >
                {isLoading ? (
                  <>
                    <DownloadIcon />
                    <span>Exporting...</span>
                  </>
                ) : (
                  <>
                    <DownloadIcon />
                    <div className="flex flex-col text-left leading-4">
                      <span>Download</span>
                      <span className="text-2xs ">
                        {settings.download.quality}x as{" "}
                        {settings.download.format}
                      </span>
                    </div>
                  </>
                )}
              </Button>

              <Popover placement="top-end">
                <PopoverTrigger>
                  <Button
                    isIconOnly
                    aria-label="Export Settings"
                    color="default"
                    size="lg"
                    variant="faded"
                  >
                    <ExportSettingIcon size={20} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="py-2 w-[282px] ">
                    <h3 className="text-lg">Export Settings</h3>
                    <div>
                      <h6 className="font-semibold text-2xs uppercase opacity-50 tracking-wider">
                        image format
                      </h6>
                      <Tabs
                        fullWidth
                        aria-label="Image format"
                        defaultSelectedKey={settings.download.quality}
                        radius="sm"
                        size="lg"
                        variant="solid"
                        onSelectionChange={(key) => {
                          if (key !== settings.download.quality) {
                            dispatch(
                              updateSetting({
                                download: {
                                  ...settings.download,
                                  format: key as "jpg" | "png",
                                },
                              }),
                            );
                          }
                        }}
                      >
                        <Tab
                          key="jpg"
                          title={
                            <span className="text-sm font-semibold">JPG</span>
                          }
                        />
                        <Tab
                          key="png"
                          title={
                            <span className="text-sm font-semibold">PNG</span>
                          }
                        />
                      </Tabs>
                    </div>
                    <div className="mt-2">
                      <h6 className="font-semibold text-2xs uppercase opacity-50 tracking-wider ">
                        image quality
                      </h6>
                      <div className="dark:bg-background bg-content2 p-1 grid grid-cols-3 rounded-lg mt-2 gap-1">
                        {[1, 2, 4].map((item, index) => (
                          <div
                            key={index}
                            className={cn(
                              "flex items-center justify-center max-md:h-20 md:aspect-[4/3]  rounded-md flex-col gap-2 cursor-pointer",
                              settings.download.quality === item
                                ? "bg-content1"
                                : "hover:bg-content1/50",
                            )}
                            onClick={() =>
                              dispatch(
                                updateSetting({
                                  download: {
                                    ...settings.download,
                                    quality: item,
                                  },
                                }),
                              )
                            }
                          >
                            <div className="icon flex items-center justify-center w-8 h-8">
                              {item}x
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-2 bg-content2 p-2 rounded-lg text-xs flex items-center justify-between">
                      <p className="opacity-50">Output resolution</p>
                      <p>
                        {settings.width * settings.download.quality} x{" "}
                        {settings.height * settings.download.quality}
                      </p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardBody>
        </Card>
        {sidebarActiveMobile && (
          <div
            className="flex w-screen h-[100dvh] fixed inset-0 z-10 opacity-40 bg-background md:hidden"
            onClick={() => setSidebarActiveMobile(false)}
          />
        )}
      </div>

      <FeedbackModal
        isOpen={isOpenFeedbackModal}
        onOpenChange={onOpenChangeFeedbackModal}
      />
      <SettingsModal
        isOpen={isOpenSettingsModal}
        onOpenChange={onOpenChangeSettingsModal}
      />
    </>
  );
};

export default Sidebar;
