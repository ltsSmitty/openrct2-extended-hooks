import { GuestAction } from "src/actions/actionTypes";
import { TCallback } from "src/utilities/TCallback";

const onGuestGenerated = (callback: TCallback) => {
  return context.subscribe("guest.generation", (data) => {
    const args = {
      action: "guest.generated",
      args: data,
    } as GameActionEventArgs<object>;
    callback(args);
  });
};

const onPeepPickup = (callback: TCallback) => {
  return context.subscribe<PeepPickupArgs>("action.execute", (data) => {
    if (data.action === "peeppickup" && data.args.type === 0) {
      callback(data);
    }
  });
};

const onPeepSetDown = (callback: TCallback) => {
  return context.subscribe<PeepPickupArgs>("action.execute", (d) => {
    const data = { ...d };
    if (data.action === "peeppickup" && data.args.type === 1) {
      data.action = "peepsetdown";
      callback(data);
    }
  });
};

export const onGuestEvent = <T extends GuestAction>(guestAction: T, callback: TCallback) => {
  switch (guestAction) {
    case "peeppickup":
      return onPeepPickup(callback);
    case "peepsetdown":
      return onPeepSetDown(callback);
    case "guest.generated":
      return onGuestGenerated(callback);
    default:
      return context.subscribe("action.execute", (data) => {
        if (data.action === guestAction) {
          callback(data);
        }
      });
  }
};
