import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import { useState } from "react";

export function usePopper() {
  const [isOpen, setOpen] = useState(false);

  const floating = useFloating({
    open: isOpen,
    onOpenChange: setOpen,
    strategy: "fixed",
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(6),
      flip(),
      shift({
        padding: 6,
      }),
    ],
  });

  const transitions = useTransitionStyles(floating.context, {
    duration: {
      open: 100,
      close: 50,
    },
  });

  const click = useClick(floating.context);
  const dismiss = useDismiss(floating.context);
  const interactions = useInteractions([click, dismiss]);

  return {
    isOpen,
    setOpen,

    ...floating,
    ...transitions,
    ...interactions,
  };
}
