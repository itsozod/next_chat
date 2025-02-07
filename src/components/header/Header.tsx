import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { useToken } from "../../pages/login/store";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logOut } = useToken();
  const navigate = useNavigate();

  return (
    <Navbar className="bg-[#D71E1E] text-white">
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

      <NavbarContent as="div" justify="end">
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
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{}</p>
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                logOut(), navigate("/signin");
              }}
              key="logout"
              color="danger"
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
