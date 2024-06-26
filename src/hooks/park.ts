import { ParkAction } from "src/actions/actionTypes";
import { TCallback } from "src/utilities/TCallback";

export const onParkAction = <T extends ParkAction>(parkAction: T, callback: TCallback) => {
  return context.subscribe("action.execute", (data: GameActionEventArgs<object>) => {
    if (data.action === parkAction && (data.args as any).flags <= 0) {
      callback(data);
    }
  });
};
