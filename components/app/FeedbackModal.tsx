import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

interface FeedbackModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const reactionEmojis = ["🤬", "😐", "😏", "😎", "😍"];

const FeedbackModal = ({ isOpen, onOpenChange }: FeedbackModalProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      placement="center"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Send feedback
              <div className="text-sm text-default-400">
                We&apos;d love to hear from you
              </div>
            </ModalHeader>

            <ModalBody>
              <div className="flex gap-6 my-4">
                {reactionEmojis.map((emoji, index) => (
                  <button
                    key={index}
                    className={cn(
                      "flex-1 aspect-square bg-content2 rounded-full text-4xl",
                      selectedEmoji === index ? "bg-white" : "",
                    )}
                    onClick={() => setSelectedEmoji(index)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <Textarea
                label="Feedback"
                placeholder="How we can improve your experience?"
                size="lg"
                variant="faded"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default FeedbackModal;
