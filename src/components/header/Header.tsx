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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { tokenInstance } from "@/utils/helpers/token/tokenInstance";
import useSWR from "swr";
import { Button } from "@heroui/button";

const menuItems = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Contacts",
    path: "/contacts",
  },
];

export const profileFetcher = async (
  url: string,
  options: RequestInit = {}
) => {
  const { getToken } = tokenInstance;
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };
  const response = await fetch(import.meta.env.VITE_BASE_URL + url, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (response.status === 401) {
    window.location.href = "/signin";
  }

  if (!response.ok) {
    const errorResp = await response.json();
    throw new Error(`${errorResp.error || response.statusText}`);
  }
  const data = await response.blob();
  const img = URL.createObjectURL(data);
  return img;
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useSWR("/user/me");
  const { data: avatar } = useSWR("/user/get-avatar", profileFetcher);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        {menuItems?.map((item) => (
          <NavbarItem>
            <Link
              className={`${item.path === location.pathname ? "text-primary-500" : ""}`}
              to={item.path}
            >
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            {avatar ? (
              <Button size="sm" className="bg-transparent rounded-md">
                <img
                  width={50}
                  height={50}
                  src={avatar}
                  className="w-full h-full rounded-[50%]"
                  alt=""
                />
              </Button>
            ) : (
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
              />
            )}
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
            <Link className="w-full text-white" to={item.path}>
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
