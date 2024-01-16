class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      console.log(message);
      const lowerCase = message.toLowerCase();
      if (lowerCase.includes("sedes")) {
        this.actionProvider.SedesHandler();
      }
      if (lowerCase.includes("horario")) {
        this.actionProvider.HorariosHandler();
      }
      if (lowerCase.includes("pastor")) {
        this.actionProvider.PastoresHandler();
      }
      if (lowerCase.includes("ubicacion")) {
        this.actionProvider.UbicacionHandler();
      }
      else {
        this.actionProvider.DefaultHandler();
      }
    }
  }
  
  export default MessageParser;