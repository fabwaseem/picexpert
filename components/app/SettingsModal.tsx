import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader
} from "@nextui-org/react";
import { useTheme } from "next-themes";

import {
  Logo,
  MoonFilledIcon,
  SunFilledIcon,
  SystemIcon,
  TwitterIcon,
} from "../icons";

import { cn } from "@/lib/utils";

interface FeedbackModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const SettingsModal = ({ isOpen, onOpenChange }: FeedbackModalProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <Modal
      backdrop="blur"
      className="bg-default-100"
      isOpen={isOpen}
      placement="center"
      size="lg"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex gap-1">
                <MoonFilledIcon />
                Theme
              </div>
              <div className="text-sm text-default-400">
                Select your preferred theme
              </div>
            </ModalHeader>

            <ModalBody>
              <div className="flex gap-3">
                <div
                  className="flex-1 text-center cursor-pointer group"
                  onClick={() => setTheme("system")}
                >
                  <div
                    className={cn(
                      "aspect-square mb-3 rounded-lg flex items-center justify-center bg-content2 group-hover:bg-content3 transition-colors",
                      theme === "system"
                        ? "outline outline-2 outline-primary outline-offset-2"
                        : "",
                    )}
                  >
                    <SystemIcon className="text-default-600" size={40} />
                  </div>
                  <p className="text-xs font-bold uppercase">system</p>
                </div>
                <div
                  className="flex-1 text-center cursor-pointer group"
                  onClick={() => setTheme("light")}
                >
                  <div
                    className={cn(
                      "aspect-square mb-3 rounded-lg flex items-center justify-center bg-content2 group-hover:bg-content3 transition-colors",
                      theme === "light"
                        ? "outline outline-2 outline-primary outline-offset-2"
                        : "",
                    )}
                  >
                    <SunFilledIcon className="text-default-600" size={40} />
                  </div>
                  <p className="text-xs font-bold uppercase">light</p>
                </div>
                <div
                  className="flex-1 text-center cursor-pointer group"
                  onClick={() => setTheme("dark")}
                >
                  <div
                    className={cn(
                      "aspect-square mb-3 rounded-lg flex items-center justify-center bg-content2 group-hover:bg-content3 transition-colors",
                      theme === "dark"
                        ? "outline outline-2 outline-primary outline-offset-2"
                        : "",
                    )}
                  >
                    <MoonFilledIcon className="text-default-600" size={40} />
                  </div>
                  <p className="text-xs font-bold uppercase">dark</p>
                </div>
              </div>

              {/* <Divider className="my-3" />
              <div className="grid grid-cols-2 gap-3">
                <Card
                  className="cursor-pointer bg-default-100 hover:bg-default-50"
                  radius="lg"
                >
                  <CardBody className="flex flex-col gap-1">
                    <FeedbackIcon size={28} className="mb-4" />
                    <h4 className="text-xl font-bold">Send feedback</h4>
                    <p className="text-xs text-content4">
                      Shape your experience
                    </p>
                  </CardBody>
                </Card>
                <Card
                  className="cursor-pointer bg-default-100 hover:bg-default-50"
                  radius="lg"
                >
                  <CardBody className="flex flex-col gap-1">
                    <StarIcon size={28} className="mb-4" />
                    <h4 className="text-xl font-bold">What's new</h4>
                    <p className="text-xs text-content4">
                      Learn about the latest updates
                    </p>
                  </CardBody>
                </Card>
                <Card
                  className="cursor-pointer bg-default-100 hover:bg-default-50"
                  radius="lg"
                >
                  <CardBody className="flex flex-col gap-1">
                    <TwitterIcon size={28} className="mb-4" />
                    <h4 className="text-xl font-bold">Follow Twitter</h4>
                    <p className="text-xs text-content4">
                      Stay tuned about picExpert
                    </p>
                  </CardBody>
                </Card>
                <Card
                  className="cursor-pointer bg-default-100 hover:bg-default-50"
                  radius="lg"
                >
                  <CardBody className="flex flex-col gap-1">
                    <DiscordIcon size={28} className="mb-4" />
                    <h4 className="text-xl font-bold">Visit community</h4>
                    <p className="text-xs text-content4">
                      Join the conversation
                    </p>
                  </CardBody>
                </Card>
              </div> */}
              <Divider className="my-3" />
              <div className="flex justify-between items-center pb-4">
                <div className="flex gap-2 items-center">
                  <Logo />
                  <h4 className="text-lg font-semibold opacity-50 transition-opacity">
                    picExpert
                  </h4>

                </div>
                <a
                  className="relative font-cursive group text-4xl"
                  href="https://twitter.com/fabwaseeem"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="opacity-25 group-hover:opacity-50 transition-opacity">
                    Waseem
                    <br />
                    Anjum
                  </span>
                  <TwitterIcon
                    className="text-[#45a1ee] absolute inset-0 m-auto drop-shadow-lg opacity-0 group-hover:opacity-100 transition-all scale-0 group-hover:scale-100"
                    size={30}
                  />
                </a>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
