"use client";
import { Component } from 'react';
import React, { useEffect, useRef } from "react";
import { useChat, Message } from "ai/react";
import { title, subtitle, title2, title3 } from "@/components/primitives";
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';



export default function ChatSection() {
  const { input, handleInputChange, handleSubmit, isLoading, messages } = useChat();

  const scrollableChatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollableChatContainerRef.current) {
      scrollableChatContainerRef.current.scrollTop = scrollableChatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  return (

    <section className="flex flex-col items-center justify-center max-h-screen h-full ">
      <div className="inline-block max-w-1lg flex-col text-center justify-center w-full content-center items-center">
        <h1 className={title2({ size: "lg" })}>Your Personal&nbsp;</h1>
        <h1 className={title3({ color: "green", size: "lg" })}>Medical Bot &nbsp;</h1>
        <br />
        <h2 className={subtitle({ size: "sm" })}>Power of Medical Diagnosis&nbsp;</h2>
        <h2 className={subtitle({ size: "sm", color: "blue" })}>in a very fast and modern way.&nbsp;</h2>
      </div>
      <br />
      <div className="flex flex-col max-h-screen h-full text-center justify-center w-full content-center items-center">
        <Card
          isBlurred
          radius="lg"
          shadow="lg"
          className='Border-none bg-background/60 dark:bg-default-100/50 content-center justify-center w-full max-w-5xl rounded-xl shadow-xl flex flex-col items-center max-h-screen h-full'
        >
          <CardHeader className='content-center justify-center w-full max-w-5xl rounded-xl'>
            <h4 className={title({ size: "sm" })}>Chat</h4>
          </CardHeader>
          <div className="space-y-4 max-w-5xl w-full flex flex-col items-center">
            <CardBody>
              <div className="flex flex-col gap-5 divide-y h-[50vh] overflow-auto" ref={scrollableChatContainerRef}>
                {messages.map((m: Message) => (
                  <ChatItem key={m.id} {...m} />
                ))}
              </div>
            </CardBody>
            <CardFooter>
              <form
                onSubmit={handleSubmit}
                className="flex items-start justify-between w-full max-w-5xl p-3 rounded-xl shadow-xl"
              >
                <input
                  autoFocus
                  name="message"
                  placeholder="Type a message"
                  className="w-full p-4 rounded-xl shadow-inner flex-1"
                  value={input}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  className={`p-4 rounded-xl shadow-xl bg-gradient-to-r from-sky-400 to-violet-400 `}
                >
                  Send message
                </button>
              </form>
            </CardFooter>
          </div>
        </Card>
      </div>
    </section>

  );
}

function ChatItem(message: Message) {
  return (
    <div className="flex items-start gap-4 pt-5">
      <ChatAvatar {...message} />
      <p className="break-words">{message.content}</p>
    </div>
  );
}

function ChatAvatar(message: Message) {
  if (message.role === "user") {
    return (
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow bg-background">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z"></path>
        </svg>
      </div>
    );
  }

  return (
    <div className=" select-none items-center justify-center rounded-md  ">
      <div className=" select-none items-center justify-center rounded-md  ">
        <img
          className="rounded-md"
          src="/BOT1.gif"
          alt="Bot"
          height={40}
          width={40}

        />

      </div>
    </div>
  );
}
