import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

type ModalProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  description?: string;
  actionTrigger?: React.ReactNode;
};

const Modal = ({
  title,
  description,
  children,
  trigger,
  actionTrigger,
}: ModalProps) => {
  // const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div>{trigger}</div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/20 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mb-5 mt-[10px] text-[15px] leading-normal">
            {description}
          </Dialog.Description>
          {children}
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <div>
                {actionTrigger}
              </div>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              X
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
