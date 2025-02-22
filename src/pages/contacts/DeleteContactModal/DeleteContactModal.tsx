import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Dispatch, SetStateAction } from "react";

const DeleteContactModal = ({
  isDeleteContact,
  setIsDeleteContact,
  isDeleteContactMutating,
  onPress,
}: {
  isDeleteContact: boolean;
  setIsDeleteContact: Dispatch<SetStateAction<boolean>>;
  isDeleteContactMutating: boolean;
  onPress: () => void;
}) => {
  return (
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
                className="text-white"
                isLoading={isDeleteContactMutating}
                onPress={() => {
                  onPress();
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
  );
};

export default DeleteContactModal;
