import ChatContainer from "@/features/chat/ui/chatContainer/ChatContainer";
import ChatHeader from "@/features/chat/ui/chatHeader/ChatHeader";
import MessageInput from "@/features/chat/ui/messageInput/MessageInput";
import Messages from "@/features/chat/ui/messages/Messages";
import TopLoader from "@/pages/home/ui/TopLoader";
import useMessages from "@/shared/hooks/useMessages";
import useScrollBottom from "@/shared/hooks/useScrollBottom";
import useWebSockets from "@/shared/hooks/useWebSockets";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@heroui/drawer";
import { Dispatch, SetStateAction } from "react";
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

  useWebSockets();

  return (
    <Drawer
      backdrop={"blur"}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      size="full"
    >
      <DrawerContent>
        <DrawerHeader className="mt-10 p-0">
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
      </DrawerContent>
    </Drawer>
  );
};

export default MobileRooms;
