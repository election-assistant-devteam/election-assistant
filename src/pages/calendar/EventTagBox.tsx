import React from "react";

interface Props {
  eventName: string[];
}

const EventTagBox = ({ eventName }: Props) => {
  return (
    <div className="eventTagBox">
      {eventName.map((item, index) => (
        <div key={index} className="eventTag">
          {item}
        </div>
      ))}
    </div>
  );
};

export default EventTagBox;
