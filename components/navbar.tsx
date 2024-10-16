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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { ThemeSwitch } from "./theme-switch";
import { ChevronDownIcon, Logo } from "./icons";
import Link from "next/link";

export default function CustomNavbar() {
  return (
    <Navbar isBlurred maxWidth="xl">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Logo />
          <span className="font-bold text-inherit text-lg">picExpert</span>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-2" justify="center">
        <NavbarBrand>
          <Logo />
          <span className="text-xl flex gap-3 justify-center items-center mr-5">
            picExpert
          </span>
        </NavbarBrand>
        <NavbarItem>
          <Button as={Link} variant="light" href="#features">
            Features
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} variant="light" href="#pricing">
            pricing
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Button
            as={Link}
            color="primary"
            href="#"
            variant="solid"
            className="hidden sm:flex"
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
          <Link className="w-full" href="#features">
            Features
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="w-full" href="#pricing">
            Pricing
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
