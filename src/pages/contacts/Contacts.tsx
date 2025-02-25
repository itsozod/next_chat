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
import UserIcon from "@/shared/assets/icons/UserIcon";
import { Input } from "@heroui/input";
import useSWR from "swr";
import Loader from "@/shared/ui/loader/Loader";
import useSWRMutation from "swr/mutation";
import { addContact, deleteContact } from "@/shared/api/contact/contact";
import AddContactModal from "./ui/AddContactModal";
import DeleteContactModal from "./ui/DeleteContactModal";
import * as I from "@/shared/types";
import ContactData from "@/pages/contacts/ui/ContactData";
import UserData from "@/pages/contacts/ui/UserData";

export default function Contacts() {
  const [searchValue, setSearchValue] = useState("");
  const { data: contacts, isLoading } = useSWR<I.ContactResp>("/contact");
  const { data: users } = useSWR<I.UserResp>(
    searchValue ? `/user/search?username=${searchValue}` : null
  );
  const { isMutating: isAddContactMutating, trigger: addToContacts } =
    useSWRMutation("/contact", addContact);
  const { isMutating: isDeleteContactMutating, trigger: deleteFromContacts } =
    useSWRMutation("/contact", deleteContact);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isAddContact, setIsAddContact] = useState(false);
  const [isDeleteContact, setIsDeleteContact] = useState(false);
  const [contactId, setContactId] = useState<number | string>("");

  const deleteContactData = (id: number) => {
    setIsDeleteContact(true);
    setContactId(id);
  };
  const addContactData = (id: number) => {
    setIsAddContact(true);
    setContactId(id);
  };

  const userParser = useMemo(() => {
    if (!users?.data?.length)
      return <div className="text-center text-white">No recent searches</div>;
    return users?.data?.map((user) => {
      return (
        <UserData user={user} addContactData={() => addContactData(user.id)} />
      );
    });
  }, [users]);

  const contactsParser = useMemo(() => {
    return contacts?.data?.map((contact) => {
      return (
        <ContactData
          contact={contact}
          deleteContactData={() => deleteContactData(contact.id)}
        />
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
      <AddContactModal
        isAddContact={isAddContact}
        setIsAddContact={setIsAddContact}
        isAddContactMutating={isAddContactMutating}
        onPress={async () => {
          await addToContacts({ contact_id: contactId });
        }}
      />
      <DeleteContactModal
        isDeleteContact={isDeleteContact}
        setIsDeleteContact={setIsDeleteContact}
        isDeleteContactMutating={isDeleteContactMutating}
        onPress={async () => {
          await deleteFromContacts({ contact_id: contactId });
        }}
      />
    </div>
  );
}
