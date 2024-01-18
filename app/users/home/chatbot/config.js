import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./components/Options";
const config = {
  initialMessages: [createChatBotMessage(`Bienvenido a Casa de Luz Jireh, ¿En qué podemos ayudarte?`, {widget: "options"})],
  botName: "Casa de Luz Jireh",
  lang: "no",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#BEBEBE",
    },
    chatButton: {
      backgroundColor: "#F44F4F",
    },
  },
  customComponents: {
    header: () => <div className="rounded bg-primary font-arial flex items-center text-sm text-terciary p-3 font-bold">Bot Casa de Luz Jireh</div>,
  },
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
  ],
  
}

export default config