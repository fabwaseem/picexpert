import { Button, Divider, Link } from "@nextui-org/react";
import React from "react";
import { GithubIcon } from "./icons";

const Footer = () => {
  return (
    <footer >
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <Divider />
        <div className="flex justify-between items-center py-10">
          <p className="font-light">
            Made by{" "}
            <Link
              isExternal
              href="https://waseemanjum.com"
              className="font-medium"
            >
              Waseem Anjum
            </Link>{" "}
            with ❤️
          </p>
          <Link href="https://github.com/fabwaseem" isExternal>
            <Button isIconOnly variant="light">
              <GithubIcon size={24} />
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
