import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

function CustomChatBot(props) {
    const config = {
        width: "300px",
        height: "400px",
        floatingStyle: { bottom: '100px' },
        floating: true
    };

    const theme = {
        background: "white",
        fontFamily: "Arial, Helvetica, sans-serif",
        headerBgColor: "#00B2B2",
        headerFontColor: "#fff",
        headerFontSize: "25px",
        botBubbleColor: "#00B2B2",
        botFontColor: "#fff",
        userBubbleColor: "#fff",
        userFontColor: "#4c4c4c",
       };

    const steps = [
        {
            id: "Greet",
            message: "Hi, Welcome to Tourist App!",
            trigger: "Ask Questions"
        },
        {
            id: "Ask Questions",
            message: "What can i help you today?",
            trigger: "User Input"
        },
        {
            id: "User Input",
            user: true,
            trigger: "Help Options Msg"
        },
        {
            id: "Help Options Msg",
            message: "You can redirect to any page below by clicking on the button.",
            trigger: "Help Options"
        },
        {
            id: "Help Options",
            options: [ 
                {
                    value: "Home",
                    label: "Home",
                    trigger: () => {
                        props.eventHandler("home");
                        return "Done";
                    }
                },
                {
                    value: "Account",
                    label: "Account",
                    trigger: () => {
                        props.eventHandler("account");
                        return "Done";
                    }
                },
                {
                    value: "Bookmark",
                    label: "Bookmark",
                    trigger: () => {
                        props.eventHandler("bookmark");
                        return "Done";
                    }
                }
            ]
        },
        {
            id: "Done",
            message: "You have been redirected to {previousValue}",
            trigger: "Ask Questions"
        }   
    ];
    
    return (
        <ThemeProvider theme={theme}>
            <ChatBot steps={steps} {...config} />
        </ThemeProvider>
        
    );
}

export default CustomChatBot;