import { CreateRoomIcon } from "@/shared/assets/icons/createRoomIcon";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@heroui/theme";
import useSWR, { useSWRConfig } from "swr";
import { Contact } from "@/pages/contacts/Contacts";
import { Input } from "@heroui/input";
import { GroupIcon } from "@/shared/assets/icons/group";
import useSWRMutation from "swr/mutation";
import { createRoom } from "@/shared/api/room/createRoom";
import toast from "react-hot-toast";

const CreateRoomModal = () => {
  const { mutate } = useSWRConfig();
  const { data: contacts } = useSWR("/contact");
  const { data: me } = useSWR("/user/me");
  const isMediumDevice = useMediaQuery("only screen and (max-width: 1023px)");
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [isSelected, setIsSelected] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");
  const {
    data,
    isMutating,
    trigger: create,
  } = useSWRMutation("/room", createRoom);

  const contactsParser = useMemo(() => {
    return contacts?.data?.map((contact: Contact) => {
      return (
        <Checkbox
          aria-label={contact.fullname}
          value={contact.id.toString()}
          classNames={{
            base: cn(
              "inline-flex w-full max-w-md bg-content1",
              "hover:bg-content2 items-center justify-start",
              "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
              "data-[selected=true]:border-primary"
            ),
            label: "w-full",
          }}
          onChange={(e) => console.log(e.target.value)}
        >
          <div className="w-full flex justify-between gap-2">
            <div className="flex flex-col items-end gap-1">
              <span className="text-tiny text-default-500">
                {contact.fullname}
              </span>
            </div>
          </div>
        </Checkbox>
      );
    });
  }, [contacts]);

  const handleCreateRoom = async () => {
    if (
      (isSelected.length >= 2 && groupName.trim() === "") ||
      !isSelected?.length
    ) {
      toast.error("Enter group name and add users before creating a room");
      return;
    }
    const convertedUserIds = isSelected?.map((selectedIds) =>
      Number(selectedIds)
    );
    const userIds = [...convertedUserIds, me?.data?.id];
    const obj = {
      name: groupName,
      admin_id: me?.data?.id,
      user_ids: userIds,
      is_group: userIds?.length > 2,
    };

    await create(obj);
    await mutate("/user/my-rooms");
    onClose();
  };

  useEffect(() => {
    if (data) {
      toast.success("Room is created successfully!");
    }
  }, [data]);

  return (
    <>
      <div className="flex justify-center p-3">
        <Button
          onPress={onOpen}
          className="text-white" 
          color="primary"
          fullWidth
          isIconOnly={isMediumDevice}
          size="lg"
        >
          {!isMediumDevice && "Create room"}
          <CreateRoomIcon />
        </Button>
      </div>
      <Modal
        className="bg-slate-900 text-white"
        scrollBehavior={"inside"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 mt-4">
                Create room
              </ModalHeader>
              <ModalBody>
                <Input
                  startContent={<GroupIcon />}
                  isClearable
                  color="secondary"
                  onClear={() => setGroupName("")}
                  value={groupName}
                  placeholder="Room's name"
                  onChange={(e) => setGroupName(e.target.value)}
                />
                <h1>Select users</h1>
                <div className="flex flex-col gap-3 max-h-[230px] overflow-auto">
                  <CheckboxGroup value={isSelected} onChange={setIsSelected}>
                    <div className="flex flex-col gap-2">{contactsParser}</div>
                  </CheckboxGroup>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                className="text-white"
                  color="primary"
                  isLoading={isMutating}
                  onPress={handleCreateRoom}
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateRoomModal;
