import MessageTypeWriter from "./classes/messageTypewriter.js";
import TerminalTypewriter from "./classes/terminalTypewriter.js";

function initTypeWriters() {
  const messagesElement = document.querySelector("#typewriter");
  const terminalElement = document.querySelector("#typewriter-terminal");

  const messageTypeWriter = new MessageTypeWriter(messagesElement);
  const fakeTerminal = new TerminalTypewriter(terminalElement);//
}

document.addEventListener("DOMContentLoaded", initTypeWriters);
