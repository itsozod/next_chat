import ChatContainer from "@/features/chat/ui/chatContainer/ChatContainer";
import ChatHeader from "@/features/chat/ui/chatHeader/ChatHeader";
import MessageInput from "@/features/chat/ui/messageInput/MessageInput";
import Messages from "@/features/chat/ui/messages/Messages";
import TopLoader from "@/pages/home/ui/TopLoader";
import { CloseIcon } from "@/shared/assets/icons/closeIcon";
import useMessages from "@/shared/hooks/useMessages";
import useScrollBottom from "@/shared/hooks/useScrollBottom";
import useWebSockets from "@/shared/hooks/useWebSockets";
import { Button } from "@heroui/button";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@heroui/drawer";
import { Dispatch, SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";

const MobileRooms = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data } = useSWR("/user/me");
  const { isValidating } = useMessages();
  const { ref } = useScrollBottom();
  const [searchParams] = useSearchParams();

  useWebSockets();

  if (!searchParams.get("room_id")) return;

  return (
    <Drawer
      hideCloseButton
      shouldBlockScroll={false}
      backdrop={"blur"}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      size="full"
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="m-0 p-0">
              <Button
                size="lg"
                isIconOnly
                className="h-[56px] rounded-none"
                onPress={() => {
                  onClose();
                }}
              >
                <CloseIcon />
              </Button>
              <ChatHeader />
            </DrawerHeader>
            <DrawerBody>
              <ChatContainer>
                <TopLoader isValidating={isValidating} />
                <Messages id={data?.data?.id} />
                <div ref={ref}></div>
              </ChatContainer>
            </DrawerBody>
            <MessageInput />
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default MobileRooms;
