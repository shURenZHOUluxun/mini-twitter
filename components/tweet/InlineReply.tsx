"use client";
import { useState } from "react";

export default function InlineReply({
  parentId,
  onSubmit,
}: {
  parentId: string;
  onSubmit: (parentId: string, text: string) => void;
}) {
  const [text, setText] = useState("");

  return (
    <div style={{ marginLeft: "3em", marginBottom: "1em" }}>
      <textarea
        placeholder="Write a reply..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", resize: "none" }}
      />
      <button
        onClick={() => {
          if (!text.trim()) return;
          onSubmit(parentId, text);
          setText("");
        }}
      >
        Reply
      </button>
    </div>
  );
}