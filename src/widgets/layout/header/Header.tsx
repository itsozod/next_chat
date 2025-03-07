import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@heroui/drawer";
import { Switch } from "@heroui/switch";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { tokenInstance } from "@/shared/utils/token/tokenInstance";
import useSWR, { mutate } from "swr";
import { Button } from "@heroui/button";
import { SunIcon } from "@/shared/assets/icons/sunIcon";
import { MoonIcon } from "@/shared/assets/icons/moonIcon";
import { profileFetcher } from "@/app/providers/swr/profileFetcher";
import { useTheme } from "@/shared/hooks/useTheme";

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
const mobileMenuItems = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Contacts",
    path: "/contacts",
  },
  {
    title: "Profile",
    path: "/profile",
  },
];

const Header = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useSWR("/user/me");
  const { data: avatar } = useSWR("/user/get-avatar", profileFetcher);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const clearCache = () => mutate(() => true, undefined, { revalidate: false });

  return (
    <Navbar
      className="w-full dark:bg-[#231942] shadow-lg"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={(state) => setIsMenuOpen(state)}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onChange={(e) => setIsMenuOpen(e)}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="fancy-text font-bold text-color text-2xl">next chat</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems?.map((item) => (
          <NavbarItem>
            <Link
              className={`${item.path === location.pathname ? "text-primary" : "text-color"}`}
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
                  className="w-[30px] h-full rounded-[50%]"
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
                tokenInstance.clearToken();
                navigate("/signin");
                clearCache();
              }}
              key="logout"
              color="danger"
              className="h-10"
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Switch
          defaultSelected
          isSelected={theme === "light"}
          color="secondary"
          size="lg"
          onValueChange={(e) => (e ? setTheme("light") : setTheme("dark"))}
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <SunIcon className={className} />
            ) : (
              <MoonIcon className={className} />
            )
          }
        ></Switch>
      </NavbarContent>
      <Drawer
        backdrop={"blur"}
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
      >
        <DrawerContent>
          <DrawerHeader>
            <p className="fancy-text font-bold text-color text-2xl">
              next chat
            </p>
          </DrawerHeader>
          <DrawerBody>
            {mobileMenuItems.map((item) => (
              <NavbarMenuItem
                key={item.path}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="list-none"
              >
                <Link
                  className={`w-full list-none ${item.path === location.pathname ? "text-primary" : "text-color"}`}
                  to={item.path}
                >
                  {item.title}
                </Link>
              </NavbarMenuItem>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Navbar>
  );
};

export default Header;
