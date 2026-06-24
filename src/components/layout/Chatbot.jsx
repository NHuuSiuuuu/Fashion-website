import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const queryClient = useQueryClient();
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;
    const handleScroll = () => {
      /**
       * Công thức:
       * Khoảng cách tới đáy = tổng chiều cao - px đã scroll xuống - chièu cao khung
       *  distanceToBottom = scrollHeight - scrollTop - clientHeight;
       */
      const threshold = 50;

      // true: ở cuối chat - false: kéo lên đọc tin nhắn cũ
      const isBottom =
        chatContainer.scrollHeight -
          chatContainer.scrollTop -
          chatContainer.clientHeight <
        threshold;

      console.log("isBottom", isBottom);
      setIsAtBottom(isBottom);
    };
    chatContainer.addEventListener("scroll", handleScroll);
    return () => chatContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Xin chào! Tôi là trợ lý bán hàng của NHuu Boutique. Tôi có thể giúp gì cho bạn?",
    },
  ]);
  useEffect(() => {
    // Nếu đang ở cuối chat
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (message) => {
      return await axios.post(`http://localhost:3001/api/search`, message);
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries();
      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại" },
      ]);
    },
  });

  const handleChatBot = () => {
    if (!inputMessage.trim()) return;
    const userMsg = { from: "user", text: inputMessage };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");

    mutate({ messages: [...messages, userMsg] });
    console.log("{ messages: [...messages, userMsg] }", {
      messages: [...messages, userMsg],
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // console.log("inputMessage", isAtBottom);
  return (
    <div className="">
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[999999999] group cursor-pointer transition-all duration-300 ${
          isOpen
            ? "opacity-0 pointer-events-none scale-0"
            : "opacity-100 scale-100"
        } bg-[#987461] text-white p-4 rounded-full shadow-2xl  transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300`}
      >
        {/* Icon */}
        <MessageCircle size={24} className="relative z-10 drop-shadow-sm" />

        {/* Tooltip */}
        <div className="absolute right-0 mb-3 transition-all duration-300 transform translate-y-2 opacity-0 pointer-events-none bottom-full group-hover:opacity-100 group-hover:translate-y-0">
          <div className="relative px-4 py-2 text-sm text-white bg-gray-900 shadow-xl rounded-xl whitespace-nowrap">
            <span className="font-medium">Cần hỗ trợ? Chat ngay!</span>
            <div className="absolute w-0 h-0 border-l-4 border-r-4 border-transparent top-full right-6 border-t-6 border-t-gray-900"></div>
          </div>
        </div>
      </button>

      <div
        className={`fixed bottom-4 right-4 w-[calc(100vw-3rem)] max-md:h-[50vh] h-[70vh] max-w-[280px] sm:w-80 sm:h-[420px] sm:max-w-none transition-all duration-300 bg-[#ffffff] rounded-[12px] shadow-2xl flex
            flex-col overflow-hidden z-50  ${
              isOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-0 pointer-events-none"
            } `}
      >
        <div
          className={`bg-[#987461] text-white py-[15px] px-[20px] border-b-[1px] border-solid flex justify-between items-center
            
            
            `}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center justify-center rounded-full w-7 h-7 bg-white/20">
              <MessageCircle size={16} />
            </div>
            <p className={`text-sm font-semibold text-white`}>
              Hỗ trợ khác hàng
            </p>
          </div>
          <button
            className={`bg-none border-none text-white cursor-pointer text-[20px] p-[5px] flex items-center justify-center transition-transform duration-300 ease-in-out
            hover:scale-[1.1]`}
            onClick={() => setIsOpen(false)}
            aria-label="Đóng chat"
          >
            <FontAwesomeIcon icon={faTimes} className="text-[16px]" />
          </button>
        </div>

        <div
          ref={chatContainerRef}
          className={`flex flex-1 p-[20px] overflow-y-auto item- flex-col gap-[10px] bg-[#f5f5f5]`}
        >
          {messages?.map((item, index) => (
            <div
              key={index}
              className={`max-w-[80%] py-[10px] px-[15px] rounded-[15px]  mx-[5px] wrap-break-word 
                   ${item.from === "bot" ? "self-start bg-white text-[#333]  rounded-bl-[3px] shadow-xl" : "self-end bg-[#987461] text-white  rounded-br-[5px] shadow-2xl"}                  `}
            >
              <div className={`text-sm `}>{item.text}</div>
              <div className={`text-sm `}>
                {new Date().toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))}
          {!isAtBottom && (
            <button
              onClick={scrollToBottom}
              className="absolute bottom-[80px] right-[20px] bg-[#987461] text-white p-2 rounded-full shadow-lg hover:scale-105 transition-all"
            >
              <ChevronDown size={16} />
            </button>
          )}
          <div ref={messagesEndRef} />

          {/* Dang loading */}
          {/* Dang loading */}
          {isPending && (
            <div className="flex justify-start message-slide">
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-gray-600 bg-gray-200 rounded-full">
                  <MessageCircle size={16} />
                </div>
                <div className="px-4 py-3 bg-white border border-gray-200 rounded-bl-sm shadow-sm rounded-2xl">
                  <div class="loader"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form điền */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleChatBot();
          }}
          className={`flex p-[15px] bg-white gap-[10px]`}
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Nhập tin nhắn của bạn..."
            className={`flex-1 py-[10px] px-[15px] border-solid border-[1px] border-[#e0e0e0] rounded-[20px] outline-none text-sm 
                focus:border-[#987461] disabled:bg-[#f5f5f5] disabled:cursor-not-allowed`}
            disabled={isPending}
          />
          <button
            onClick={handleChatBot}
            disabled={!inputMessage.trim() || isPending}
            className={`bg-[#987461] text-white border-none rounded-[20px] py-[10px] px-[20px] cursor-pointer font-medium transition-all duration-300 ease-in-out
            disabled:hover:bg-[#1976d2] disabled:active:scale-[0.98] disabled:bg-[#ccc] disabled:cursor-not-allowed`}
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
