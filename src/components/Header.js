import React, { useRef, useState } from "react";
import { HEADER_DISPLAY_NAME, BLOG_URL, GITHUB_USERNAME } from "../config";
import { LuSend } from "react-icons/lu";
import { RxGithubLogo } from "react-icons/rx";
import { IoIosLink } from "react-icons/io";
import emailjs from "@emailjs/browser";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        {
          publicKey: process.env.REACT_APP_PUBLIC_KEY,
        },
      )
      .then(
        () => {
          alert("Message Send Successfully");
        },
        (error) => {
          alert("Something Fucked up");
        },
      );
    setEmail("");
    setMessage("");
    setName("");
    setIsOpen(false);
  };
  return (
    <>
      <div>
        {isOpen && (
          <div className="fixed z-[101] inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-black bg-opacity-85 text-white rounded-lg shadow-lg px-10 py-6 max-w-sm mx-auto w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Send 👋 to Us
                </h2>
                <form onSubmit={handleSubmit} ref={form}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block font-bold mb-2">
                      Name/Nick Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-400 p-2 rounded text-black"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block font-bold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-400 p-2 rounded text-black"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="block font-bold mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full border border-gray-400 p-2 rounded text-black"
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-start">
                    <button
                      type="submit"
                      className="bg-black border hover:bg-white hover:text-black transition-all ease-in-out text-white font-bold py-2 px-4 rounded"
                    >
                      Send
                    </button>
                    <button
                      className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className={`text-white sticky top-0 p-4 font-bold rounded-md z-[100] bg-black bg-opacity-80 border-[#2b3c47] border-l border-r`}
      >
        <div className="flex justify-between">
          <h1>{HEADER_DISPLAY_NAME}</h1>
          <div className="">
            <button className="me-2">
              <a
                href={`https://github.com/${GITHUB_USERNAME}/The-Tweetfolio`}
                target="_blank"
              >
                <RxGithubLogo className="text-xl" />
              </a>
            </button>
            <button onClick={() => setIsOpen(true)} className="me-2">
              <LuSend className="text-xl" />
            </button>
            <button className="me-2">
              <a href={BLOG_URL} target="_blank">
                <IoIosLink className="text-xl" />
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
