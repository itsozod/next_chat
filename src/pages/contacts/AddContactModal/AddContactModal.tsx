import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Dispatch, SetStateAction } from "react";

const AddContactModal = ({
  isAddContact,
  isAddContactMutating,
  setIsAddContact,
  onPress,
}: {
  isAddContact: boolean;
  isAddContactMutating: boolean;
  setIsAddContact: Dispatch<SetStateAction<boolean>>;
  onPress: () => void;
}) => {
  return (
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
                className="text-white"
                isLoading={isAddContactMutating}
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

export default AddContactModal;
