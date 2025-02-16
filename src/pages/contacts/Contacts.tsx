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
import Loader from "@/shared/ui/loader/Loader";
import { DeleteUserIcon } from "@/shared/assets/icons/deleteUserIcon";
import useSWRMutation from "swr/mutation";
import { addContact, deleteContact } from "@/shared/api/contact/contact";

type User = {
  id: number;
  fullname: string;
  username: string;
};
type UserResp = {
  data: User[];
};
export type Contact = {
  id: number;
  username: string;
  fullname: string;
};

export default function Contacts() {
  const [searchValue, setSearchValue] = useState("");
  const { data: users } = useSWR<UserResp>(
    searchValue ? `/user/search?username=${searchValue}` : null
  );
  const { data: contacts, isLoading } = useSWR("/contact");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isAddContact, setIsAddContact] = useState(false);
  const [isDeleteContact, setIsDeleteContact] = useState(false);
  const [contactId, setContactId] = useState<number | string>("");
  const { isMutating: isAddContactMutating, trigger: addToContacts } =
    useSWRMutation("/contact", addContact);
  const { isMutating: isDeleteContactMutating, trigger: deleteFromContacts } =
    useSWRMutation("/contact", deleteContact);

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

  const contactsParser = useMemo(() => {
    return contacts?.data?.map((contact: Contact) => {
      return (
        <div
          className="flex gap-3 items-center text-white justify-between p-2 rounded-md hover:bg-primary-200"
          key={contact?.id}
        >
          <div className="flex gap-5 items-center">
            <Button isIconOnly className="rounded-[50%]">
              <UserIcon />
            </Button>
            <div className="flex flex-col gap-1">
              <div>{contact?.username}</div>
              <div>{contact?.fullname}</div>
            </div>
          </div>
          <Button
            isIconOnly
            onPress={() => {
              setIsDeleteContact(true);
              setContactId(contact.id);
            }}
          >
            <DeleteUserIcon />
          </Button>
        </div>
      );
    });
  }, [contacts]);

  return (
    <div className="w-full flex flex-col gap-2 p-3">
      <Button onPress={onOpen} fullWidth className="flex justify-start">
        <UserIcon />
        Search...
      </Button>
      <div className="flex flex-col gap-3 max-h-[500px] overflow-auto">
        <h1 className="text-[1.5rem]">Contacts</h1>
        {isLoading ? <Loader /> : contactsParser}
      </div>
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
                Are you sure, you want to add this user to your contacts?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  isLoading={isAddContactMutating}
                  onPress={async () => {
                    await addToContacts({ contact_id: contactId });
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
      <Modal
        className="bg-slate-900 text-white"
        isOpen={isDeleteContact}
        onOpenChange={setIsDeleteContact}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 mt-4">
                Delete from contacts
              </ModalHeader>
              <ModalBody className="text-[1.1rem]">
                Are you sure, you want to delete this user from your contacts?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  isLoading={isDeleteContactMutating}
                  onPress={async () => {
                    await deleteFromContacts({ contact_id: contactId });
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
