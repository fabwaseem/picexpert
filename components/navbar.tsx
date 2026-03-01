"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";

import { ThemeSwitch } from "./theme-switch";
import { Logo, LogoDark } from "./icons";

export default function CustomNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  return (
    <Navbar
      isBlurred
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          {resolvedTheme === "dark" ? <Logo /> : <LogoDark />}
          <span className="font-bold text-inherit text-lg">picExpert</span>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-2" justify="center">
        <NavbarBrand>
          {resolvedTheme === "dark" ? <Logo /> : <LogoDark />}
          <span className="text-xl flex gap-3 justify-center items-center mr-5">
            picExpert
          </span>
        </NavbarBrand>
        <NavbarItem>
          <Button as={Link} href="#features" variant="light">
            Features
          </Button>
        </NavbarItem>
        <NavbarItem>
          {/* <Button as={Link} href="#pricing" variant="light">
            pricing
          </Button> */}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Button
            as={Link}
            className="hidden sm:flex"
            color="primary"
            href="/app"
            variant="solid"
          >
            Get Started
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            className="w-full"
            href="#features"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
        </NavbarMenuItem>
        {/* <NavbarMenuItem>
          <Link
            className="w-full"
            href="#pricing"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
        </NavbarMenuItem> */}
      </NavbarMenu>
    </Navbar>
  );
}
