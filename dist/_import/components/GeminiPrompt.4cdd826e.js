import { jsx, jsxs } from "../../_npm/react@19.2.0/jsx-runtime.e1dfbba0.js";
import { generateText } from "../lib/llm.c7e79593.js";
export const GeminiPrompt = () => {
  const handleSendPrompt = async () => {
    const prompt = document.getElementById("promptInput").value;
    if (!prompt) {
      alert("Please enter a prompt.");
      return;
    }
    const response = await generateText(prompt);
    document.getElementById("responseOutput").innerText = "Response: " + response;
  };
  return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "10px", width: "100%" }, children: [
    /* @__PURE__ */ jsx("h1", { children: "LLM Input" }),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        id: "promptInput",
        placeholder: "Enter prompt here",
        rows: 10,
        style: { width: "70%", resize: "vertical" }
      }
    ),
    /* @__PURE__ */ jsx("button", { onClick: handleSendPrompt, style: { alignSelf: "flex-start" }, children: "Send Prompt" }),
    /* @__PURE__ */ jsx("div", { id: "responseOutput" })
  ] });
};
