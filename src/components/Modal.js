import React from "react";
import Layout from "./Layout";
import { FaTimes, FaCheck } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import cx from "classnames";

export const Modal = ({ title, isOpen, onClose, children }) => {
  const props = useSpring({
    to: { opacity: isOpen ? 1 : 0 },
  });
  const props2 = useSpring({
    to: {
      transform: `translateY(${isOpen ? 0 : 100}%)`,
    },
    delay: 300,
  });

  return (
    <animated.div
      style={props}
      className={`z-10 flex items-end top-0 bottom-0 left-0 w-full fixed h-full bg-black bg-opacity-50 ${
        isOpen ? `` : `pointer-events-none`
      }`}
    >
      <animated.div
        style={props2}
        className={`h-64 pt-5 flex flex-col shadow-lg rounded-t-lg w-full bg-white`}
      >
        <div className="flex items-center px-5">
          <Layout.Title className="flex-auto">{title}</Layout.Title>
          <span
            onClick={onClose}
            className="bg-gray-200 text-gray-600 p-2 rounded-full flex-none"
          >
            <FaTimes />
          </span>
        </div>
        {children}
      </animated.div>
    </animated.div>
  );
};

export const Content = ({ children }) => {
  return <div className="p-4">{children} </div>;
};

export const List = ({ children }) => {
  return <div className="flex-auto overflow-y-auto divide-y mt-4 text-lg divide-gray-200">{children}</div>;
};

export const ListItem = ({ onClick, selected, children }) => {
  return (
    <div
      className={cx("relative px-5 py-4", {"text-indigo-400 bg-indigo-100": selected})}
      onClick={onClick}>
      {children}
      {selected && <div className="absolute right-0 top-0 mr-5 mt-5"><FaCheck /></div>}
    </div>);
};

export default {
  Modal: Modal,
  Content: Content,
  List: List,
  ListItem: ListItem
};
