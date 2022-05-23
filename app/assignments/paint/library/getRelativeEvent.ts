import { MouseEvent } from "react";

export interface IRelativeEvent {
  eventX:number;
  eventY:number;
}

export const getRelativeEvent = (event:MouseEvent):IRelativeEvent => ({
  eventX: event.nativeEvent.offsetX,
  eventY: event.nativeEvent.offsetY,
});

export const convertRelativeEventToClient = (event:MouseEvent):{clientX:number, clientY:number} => {
  const {eventX, eventY} = getRelativeEvent(event);
  return {clientX: eventX, clientY: eventY};
};
