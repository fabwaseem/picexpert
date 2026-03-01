"use client";
import { socialMediaRatios } from "@/config/socialRatios";
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
import { useAppDispatch, useAppSelector } from "@/store";
import { addFiles } from "@/store/slices/FilesSlice";
import { updateSetting } from "@/store/slices/settingsSlice";
import { DetailedFile, Scalling, SettingsProps } from "@/types";
import { setupWorker } from "@/workers/setup";
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
  FeedbackIcon,
  ImageIcon,
  Logo,
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
                <Logo />
                <h4 className="text-lg font-semibold">picExpert</h4>
              </div>
              <div className="flex items-center">
                {files.length > 0 && (
                  <>
                    <input {...getAddFilesInputProps()} />
                    <Tooltip
                      content="Add more images"
                      delay={1000}
                      showArrow
                      radius="sm"
                    >
                      <Button
                        isIconOnly
                        color="default"
                        aria-label="Add more images"
                        size="sm"
                        variant="light"
                        onPress={openAddFiles}
                      >
                        <PlusRoundIcon size={20} />
                      </Button>
                    </Tooltip>
                  </>
                )}
                <Tooltip
                  content="Send Feedback"
                  delay={1000}
                  showArrow
                  radius="sm"
                >
                  <Button
                    isIconOnly
                    color="default"
                    aria-label="Send Feedback"
                    size="sm"
                    variant="light"
                    onPress={onOpenFeedbackModal}
                  >
                    <FeedbackIcon size={20} />
                  </Button>
                </Tooltip>
                <Tooltip content="App Menu" delay={1000} showArrow radius="sm">
                  <Button
                    isIconOnly
                    color="default"
                    aria-label="Send Feedback"
                    size="sm"
                    variant="light"
                    onPress={onOpenSettingsModal}
                  >
                    <AppMenuIcon size={20} />
                  </Button>
                </Tooltip>
                <Tooltip content="Settings" delay={1000} showArrow radius="sm">
                  <Button
                    isIconOnly
                    color="default"
                    aria-label="Send Feedback"
                    size="sm"
                    variant="light"
                    onPress={() => setSidebarActiveMobile(!sidebarActiveMobile)}
                    className="md:hidden"
                    ref={sidebarMenuBtnRef}
                  >
                    <SettingIcon size={28} />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card
          className={cn(
            "flex-1 max-md:fixed  max-md:bottom-1  max-md:left-1  max-md:w-[calc(100%-8px)] transition-transform max-md:z-20",
            sidebarActiveMobile ? "translate-y-0" : "max-md:translate-y-full",
          )}
          ref={sidebarMenuRef}
        >
          <CardBody className="p-2 flex flex-col gap-1">
            <Tabs
              aria-label="Resize Method"
              defaultSelectedKey={settings.mode}
              onSelectionChange={(key) => {
                if (key !== settings.mode) {
                  dispatch(
                    updateSetting({
                      mode: key as "expand" | "crop",
                    }),
                  );
                }
              }}
              fullWidth
              radius="sm"
              variant="light"
              classNames={{
                tabList: "px-0 ",
              }}
              size="lg"
            >
              <Tab
                key="expand"
                title={
                  <div className="flex items-center space-x-2">
                    <ExpandIcon size={20} />
                    <span className=" font-semibold">Expand</span>
                  </div>
                }
              ></Tab>
              <Tab
                key="crop"
                title={
                  <div className="flex items-center space-x-2">
                    <CropIcon size={20} />
                    <span className=" font-semibold">Crop</span>
                  </div>
                }
              ></Tab>
            </Tabs>

            <Dropdown
              // backdrop="blur"
              onOpenChange={(open) => setIsOpenSocialSizeDropdown(open)}
              isOpen={isOpenSocialSizeDropdown}
            >
              <DropdownTrigger>
                <Button
                  variant="flat"
                  className="justify-between text-left h-[50px]"
                  radius="sm"
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
                          src={"/images/preview.jpg"}
                          alt={selectedRatio?.label + ""}
                          fill
                          sizes="200px"
                          className="object-cover rounded-sm"
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
                    size={14}
                    className={cn(
                      "opacity-50 transition-transform ",
                      isOpenSocialSizeDropdown ? "transform rotate-180" : "",
                    )}
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
                          id="width"
                          type="number"
                          aria-label="images width"
                          value={
                            customDimentions?.width === 0
                              ? ""
                              : customDimentions?.width + ""
                          }
                          placeholder={selectedRatio?.width + ""}
                          onValueChange={(e) => {
                            let value = parseInt(e);
                            if (value < 0 || isNaN(value)) {
                              value = 0;
                            }
                            let height = settings.height;
                            let aspectRatio = settings.aspectRatio;
                            if (settings.lockRatio) {
                              height = Math.round(value / aspectRatio);
                            } else {
                              aspectRatio = calculateAspectRatio(value, height);
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
                          startContent={
                            <span className="text-default-400 text-sm font-medium ">
                              W
                            </span>
                          }
                          endContent={
                            <span className="text-default-400 text-xs">px</span>
                          }
                          radius="sm"
                          size="lg"
                          className="!text-right ml-auto"
                        />
                      </div>
                      <div>
                        <Input
                          id="height"
                          type="number"
                          aria-label="images height"
                          value={
                            customDimentions?.height === 0
                              ? ""
                              : customDimentions?.height + ""
                          }
                          placeholder={selectedRatio?.height + ""}
                          onValueChange={(e) => {
                            let value = parseInt(e);
                            if (value < 0 || isNaN(value)) {
                              value = 0;
                            }
                            let width = settings.width;
                            let aspectRatio = settings.aspectRatio;
                            if (settings.lockRatio) {
                              width = Math.round(value * aspectRatio);
                            } else {
                              aspectRatio = calculateAspectRatio(width, value);
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
                          startContent={
                            <span className="text-default-400 text-sm font-medium ">
                              H
                            </span>
                          }
                          endContent={
                            <span className="text-default-400 text-xs">px</span>
                          }
                          radius="sm"
                          size="lg"
                          className="!text-right ml-auto"
                        />
                      </div>
                      <Button
                        variant="bordered"
                        size="lg"
                        isIconOnly
                        type="submit"
                      >
                        Set
                      </Button>
                    </form>
                  )}
                  <h6 className="font-semibold text-2xs uppercase opacity-50 tracking-wider mt-4">
                    Social media
                  </h6>
                  <Tabs
                    aria-label="Resize Method"
                    defaultSelectedKey={selectSocialRatioTab}
                    onSelectionChange={(key) =>
                      setSelectSocialRatioTab(key as string)
                    }
                    radius="sm"
                    variant="light"
                    items={socialMediaRatios}
                    className="md:max-w-xl "
                    classNames={{
                      tabList: "overflow-auto ",
                    }}
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
                      ></Tab>
                    )}
                  </Tabs>
                  <Divider className="my-2" />
                  <ScrollShadow hideScrollBar>
                    <div className="h-[calc(50vh-160px)] md:h-[calc(70vh-160px)] grid grid-cols-1 md:grid-cols-2  gap-3 p-3 ">
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
                                  src={"/images/preview.jpg"}
                                  alt={ratio.label}
                                  fill
                                  sizes="500px"
                                  className="object-cover rounded"
                                />
                              </div>
                            </div>
                          </button>
                        ))}
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
                      isSelected={settings.customCrop}
                      onValueChange={(value) =>
                        dispatch(
                          updateSetting({
                            customCrop: value,
                          }),
                        )
                      }
                      className="mt-1"
                      classNames={{
                        label: "text-sm opacity-60",
                      }}
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
                              src={
                                settings.background.image.image?.previewUrl + ""
                              }
                              alt={
                                settings.background.image.image?.baseName + ""
                              }
                              fill
                              sizes="200px"
                              className="object-cover rounded"
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
                          maxValue={100}
                          minValue={0}
                          showTooltip={true}
                          size="sm"
                          aria-label="blur strength"
                          defaultValue={settings.background.blurStrength}
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
                          startContent={
                            <div className="w-6 h-6 flex items-center justify-center">
                              <CircleIcon size={16} />
                            </div>
                          }
                          endContent={
                            <div className="w-6 h-6 flex items-center justify-center">
                              <BlurIcon size={20} />
                            </div>
                          }
                        />
                      </div>
                    )}

                    {settings.background.type === "color" && (
                      <div className="mt-4 p-1 space-y-4">
                        <Tabs
                          aria-label="Color Mode"
                          fullWidth
                          size="sm"
                          selectedKey={settings.background.color.mode}
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
                              value={currentBgColor}
                              label="Color"
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
                                startColor={gradientStart}
                                endColor={gradientEnd}
                                onStartChange={setGradientStart}
                                onEndChange={setGradientEnd}
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
                                label="Direction"
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
                                      src={image.previewUrl}
                                      alt="history"
                                      fill
                                      className="object-cover"
                                      sizes="48px"
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
                        aria-label="Watermark Pattern"
                        fullWidth
                        size="sm"
                        selectedKey={settings.watermark.pattern || "single"}
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
                        label="Rotation"
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
                                            src={
                                              settings.watermark.image.image
                                                .previewUrl
                                            }
                                            alt={
                                              settings.watermark.image.image
                                                .baseName
                                            }
                                            fill
                                            className="object-contain"
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
                          id="watermarkText"
                          type="text"
                          aria-label="watermark text"
                          value={settings.watermark.text.text}
                          placeholder="Watermark Text"
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
                          radius="sm"
                          label="Text"
                        />
                        <ColorPicker
                          inputId="watermarkTextColor"
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
                          label="Text Color"
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
                          maxValue={1}
                          step={0.1}
                          minValue={0.1}
                          tooltipValueFormatOptions={{
                            style: "percent",
                          }}
                          showTooltip={true}
                          size="sm"
                          aria-label="watermark opacity"
                          defaultValue={settings.watermark.opacity}
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
                          startContent={
                            <div className="w-6 h-6 flex items-center justify-center">
                              <OpacityLowIcon
                                className="opacity-50"
                                size={20}
                              />
                            </div>
                          }
                          endContent={
                            <div className="w-6 h-6 flex items-center justify-center">
                              <OpacityHighIcon
                                className="opacity-50"
                                size={20}
                              />
                            </div>
                          }
                        />
                      </div>
                      <div className="mt-4">
                        <p className="font-semibold text-2xs uppercase opacity-50 tracking-wider mb-2">
                          Size
                        </p>
                        <Slider
                          maxValue={100}
                          minValue={5}
                          showTooltip={true}
                          size="sm"
                          aria-label="watermark size"
                          defaultValue={settings.watermark.size}
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
                          startContent={
                            <div className="w-6 h-6 flex items-center justify-center">
                              <SizeSmallIcon className="opacity-50" size={20} />
                            </div>
                          }
                          endContent={
                            <div className="w-6 h-6 flex items-center justify-center">
                              <SizeLargeIcon className="opacity-50" size={20} />
                            </div>
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
                      maxValue={100}
                      minValue={0}
                      showTooltip={true}
                      size="sm"
                      getValue={(v) => `${v}%`}
                      aria-label="border radius"
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
                      startContent={
                        <SharpIcon size={18} className="opacity-50" />
                      }
                      endContent={
                        <RoundIcon size={18} className="opacity-50" />
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
                size="lg"
                className="w-full"
                variant="faded"
                onPress={callDownload}
                disabled={files.length === 0}
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
                    color="default"
                    aria-label="Export Settings"
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
                        aria-label="Image format"
                        defaultSelectedKey={settings.download.quality}
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
                        fullWidth
                        radius="sm"
                        variant="solid"
                        size="lg"
                      >
                        <Tab
                          key="jpg"
                          title={
                            <span className="text-sm font-semibold">JPG</span>
                          }
                        ></Tab>
                        <Tab
                          key="png"
                          title={
                            <span className="text-sm font-semibold">PNG</span>
                          }
                        ></Tab>
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
          ></div>
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
