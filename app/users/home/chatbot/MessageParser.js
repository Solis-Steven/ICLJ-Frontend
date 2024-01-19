class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      console.log(message);
      const lowerCase = message.toLowerCase();
      if (lowerCase.includes("sede")) {
        this.actionProvider.SedesHandler();
        return
      }
      if (lowerCase.includes("horario")) {
        this.actionProvider.HorariosHandler();
        return;
      }
      if (lowerCase.includes("contacto")) {
        this.actionProvider.PastoresHandler();
        return;
      }
      if (lowerCase.includes("ubicacion")) {
        this.actionProvider.UbicacionHandler();
        return;
      }
      else {
        this.actionProvider.DefaultHandler();
      }
    }
  }
  
  export default MessageParser;