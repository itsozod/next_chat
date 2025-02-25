import { AddContact } from "@/shared/assets/icons/addContact";
import * as I from "@/shared/types";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
const UserData = ({
  user,
  addContactData,
}: {
  user: I.User;
  addContactData: () => void;
}) => {
  return (
    <div
      className="flex gap-3 items-center text-white justify-between p-2 rounded-md hover:bg-primary hover:text-white"
      key={user?.id}
    >
      <div className="flex gap-2 items-center">
        <Avatar />
        <div className="flex flex-col gap-1">
          <div>{user?.username}</div>
          <div>{user?.fullname}</div>
        </div>
      </div>
      <Button isIconOnly onPress={addContactData}>
        <AddContact />
      </Button>
    </div>
  );
};

export default UserData;
