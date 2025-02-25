import { DeleteUserIcon } from "@/shared/assets/icons/deleteUserIcon";
import UserIcon from "@/shared/assets/icons/UserIcon";
import * as I from "@/shared/types";
import { Button } from "@heroui/button";
const ContactData = ({
  contact,
  deleteContactData,
}: {
  contact: I.Contact;
  deleteContactData: () => void;
}) => {
  return (
    <div
      className="flex gap-3 items-center text-color justify-between p-2 rounded-md hover:bg-primary hover:text-white"
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
      <Button isIconOnly onPress={deleteContactData}>
        <DeleteUserIcon />
      </Button>
    </div>
  );
};

export default ContactData;
