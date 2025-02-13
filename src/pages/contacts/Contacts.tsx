import { useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import UserIcon from "@/assets/icons/UserIcon";
import { Input } from "@heroui/input";
import useSWR from "swr";
import { Avatar } from "@heroui/avatar";
import { AddContact } from "@/shared/assets/icons/addContact";
import { tokenInstance } from "@/utils/helpers/token/tokenInstance";
type User = {
  id: number;
  fullname: string;
  username: string;
};
type UserResp = {
  data: User[];
};

export default function Contacts() {
  const [searchValue, setSearchValue] = useState("");
  const { data: users } = useSWR<UserResp>(
    searchValue
      ? `http://5.253.62.94:8084/user/search?username=${searchValue}`
      : null
  );
  const { data: contacts } = useSWR("/contact");

  console.log("contacts", contacts);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isAddContact, setIsAddContact] = useState(false);
  const [contactId, setContactId] = useState<number | string>("");

  const addContact = async (body: { contact_id: number | string }) => {
    const res = await fetch("http://5.253.62.94:8084/contact", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenInstance.getToken()}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  };

  const userParser = useMemo(() => {
    if (!users?.data?.length)
      return <div className="text-center text-white">No recent searches</div>;
    return users?.data?.map((user) => {
      return (
        <div
          className="flex gap-3 items-center text-white justify-between p-2 rounded-md hover:bg-primary-200"
          key={user?.id}
        >
          <div className="flex gap-2 items-center">
            <Avatar />
            <div className="flex flex-col gap-1">
              <div>{user?.username}</div>
              <div>{user?.fullname}</div>
            </div>
          </div>
          <Button
            isIconOnly
            onPress={() => {
              setIsAddContact(true);
              setContactId(user.id);
            }}
          >
            <AddContact />
          </Button>
        </div>
      );
    });
  }, [users]);

  return (
    <div className="flex flex-col gap-2 p-3">
      <Button onPress={onOpen} fullWidth className="flex justify-start">
        <UserIcon />
        Search...
      </Button>
      <Modal
        className="bg-slate-900"
        isOpen={isOpen}
        scrollBehavior={"inside"}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 mt-4">
                <Input
                  startContent={<UserIcon />}
                  isClearable
                  onClear={() => setSearchValue("")}
                  value={searchValue}
                  placeholder="Search for users"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </ModalHeader>
              <ModalBody>{userParser}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        className="bg-slate-900 text-white"
        isOpen={isAddContact}
        onOpenChange={setIsAddContact}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 mt-4">
                Add to contacts
              </ModalHeader>
              <ModalBody className="text-[1.1rem]">
                Are you sure, you want to add this user to you
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    addContact({ contact_id: contactId });
                    onClose();
                  }}
                >
                  Ok
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
