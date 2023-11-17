import Messages from "../data/messages.json" assert { type: "json" };

class MessageTypewriter {
  static DEFAULT_PERIOD = 1000;
  static DEFAULT_TYPING_DELAY = 150;

  constructor(element, period = MessageTypewriter.DEFAULT_PERIOD) {
    this.isDeleting = false;
    this.textArray = Messages;
    this.element = element;
    this.period = period;
    this.textString = "";
    this.text = "";
    this.iterationIndex = 0;
    this.tickIndex = 0;
    this.typingDelay = period;
    this.write();
  }

  async write() {
    // Iteration number modulo array length will ensure that the index(i here) will never exceed the array size and
    // will always come to the start of the array everytime it reaches the end.
    this.tickIndex = this.iterationIndex % this.textArray.length;

    this.textString = this.textArray[this.tickIndex]; // Get current text to display from the array

    this.typingDelay = 150 - Math.random() * 100; // Make the typing more erratic and natural

    if (this.isDeleting) {
      // Decrease one character from the text if deleting
      this.text = this.textString.substring(0, this.text.length - 1);
      this.typingDelay /= 2; // Make "deleting" faster than "typing"
    } else {
      this.text = this.textString.substring(0, this.text.length + 1); // Else increase it in also 1 character
    }

    this.element.innerHTML = `<span class="wrap">${this.text}</span>`;

    if (!this.isDeleting && this.text === this.textString) {
      this.typingDelay = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.text === "") {
      this.isDeleting = false;
      this.iterationIndex++;
      this.typingDelay = 500;
    }

    await new Promise((resolve) => setTimeout(resolve, this.typingDelay));
    await this.write();
  }
}

export default MessageTypewriter;
