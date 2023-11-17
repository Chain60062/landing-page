import Commands from "../data/commands.json" assert { type: "json" };
import Responses from "../data/responses.json" assert { type: "json" };
class TerminalTypewriter {
  static DEFAULT_TYPING_DELAY = 150;
  constructor(
    element,
    delayBetweenCommands = 2000,
    delayBetweenResponseAndCommand = 5000,
    typingDelay = TerminalTypewriter.DEFAULT_TYPING_DELAY
  ) {
    this.commands = Commands;
    this.responses = Responses;
    this.delayBetweenCommands = delayBetweenCommands;
    this.delayBetweenResponseAndCommand = delayBetweenResponseAndCommand;
    this.element = element;
    this.typingDelay = typingDelay;
    this.write();
  }

  async typeCommand(command) {
    for (let i = 0; i < command.length; i++) {
      this.element.innerHTML += command.charAt(i);
      this.typingDelay = 150 - Math.random() * 100;
      await this.sleep(this.typingDelay); // Adjust typing speed as needed
    }
    this.element.innerHTML += "<br>";
    await this.sleep(this.delayBetweenCommands);
  }

  async typeResponse(response) {
    this.element.innerHTML += response + "<br><br>";
    await this.sleep(this.delayBetweenResponseAndCommand);
  }

  async write() {
    for (let i = 0; i < this.commands.length; i++) {
      await this.typeCommand(this.commands[i]);
      await this.typeResponse(this.responses[i]);
    }
    // Clear terminal and restart
    this.element.innerHTML = "";
    this.write();
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
export default TerminalTypewriter;
