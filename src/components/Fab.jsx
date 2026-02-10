import React from "react";
import add from "../assets/add.png";

export default function Fab({ onClick }) {
  return (
    <div>
      <img
        src={add}
        alt="Add"
        title="Add"
        onClick={onClick}
        className="
        fixed bottom-6 right-6
        w-14 h-14
        flex items-center justify-center
        cursor-pointer
        transition-transform duration-200
        hover:scale-110
        active:scale-95
        z-50"
      />
    </div>
  );
}
