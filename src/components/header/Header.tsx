import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { tokenInstance } from "@/utils/helpers/token/tokenInstance";
import useSWR from "swr";

const menuItems = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Chats",
    path: "/chat",
  },
];

const Header = () => {
  const { data } = useSWR("http://5.253.62.94:8084/user/me");
  const { data: avatar } = useSWR("http://5.253.62.94:8084/user/avatar");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(avatar);

  return (
    <Navbar
      className="bg-[#124559] text-white"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={(state) => setIsMenuOpen(state)}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p
            style={{
              fontFamily: "Playwrite IE, cursive",
              fontOpticalSizing: "auto",
              fontWeight: "bolder",
              fontStyle: "normal",
            }}
            className="font-bold text-inherit text-2xl"
          >
            next chat
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" to={"/"}>
            Home
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" to={"/chat"}>
            Chats
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              size="sm"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-10 gap-2">
              <p className="font-semibold">
                Signed in as {data?.data?.username}
              </p>
            </DropdownItem>
            <DropdownItem
              key="profile"
              className="h-10 gap-2"
              onPress={() => navigate("/profile")}
            >
              <p className="font-semibold">Profile</p>
            </DropdownItem>
            <DropdownItem
              onPress={() => {
                tokenInstance.clearToken(), navigate("/signin");
              }}
              key="logout"
              color="danger"
              className="h-10"
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem
            key={item.path}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Link className="w-full" to={item.path}>
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
