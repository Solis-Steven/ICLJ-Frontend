// ActionProvider starter code
class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
    setChatbotMessage = (message) => {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, message],
      }));
    }
    SedesHandler = () => {
        const message = this.createChatBotMessage("Estas son nuestras sedes");
        this.setChatbotMessage(message);
        };
    PastoresHandler = () => {
        const message = this.createChatBotMessage("Estos son nuestros pastores");
        this.setChatbotMessage(message);
        }
    HorariosHandler = () => {
        const message = this.createChatBotMessage("Estos son nuestros horarios");
        this.setChatbotMessage(message);
        }
    UbicacionHandler = () => {
        const message = this.createChatBotMessage("Estas son nuestras ubicaciones");
        this.setChatbotMessage(message);
        }
    DefaultHandler = () => {
        const message = this.createChatBotMessage("No te entiendo, ¿Podrías repetirlo?");
        this.setChatbotMessage(message);
        }
        
 }
 
 export default ActionProvider;