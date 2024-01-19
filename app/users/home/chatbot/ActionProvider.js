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
        const message = this.createChatBotMessage("Nos encontramos en San Ramón y Ciudad Quesada");
        this.setChatbotMessage(message);
        };
    PastoresHandler = () => {
        const message = this.createChatBotMessage("Nuestro numero de contacto es el +506 60940516");
        this.setChatbotMessage(message);
        }
    HorariosHandler = () => {
        const message = this.createChatBotMessage("Todos los sábados a las 7:00p.m.");
        this.setChatbotMessage(message);
        }
    UbicacionHandler = () => {
        const message = this.createChatBotMessage("https://goo.su/9q95eU");
        this.setChatbotMessage(message);
        }
    DefaultHandler = () => {
        const message = this.createChatBotMessage("No te entiendo, ¿Podrías repetirlo?");
        this.setChatbotMessage(message);
        }
        
 }
 
 export default ActionProvider;