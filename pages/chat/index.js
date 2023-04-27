import React, { useState } from "react";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

const ChatPage = () => {
  const [prompt, setPrompt] = useState("");
  const [storedValues, setStoredValues] = useState([]);

  const configuration = new Configuration({
    apiKey: process.env.API_KEY,
  });
  delete configuration.baseOptions.headers["User-Agent"];
  const openai = new OpenAIApi(configuration);

  // submit method
  const handleGenerateResponse = async () => {
    let options = {
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      // stop: ["/"],
    };

    let completeOptions = {
      ...options,
      prompt: prompt,
    };

    const response = await openai.createCompletion(completeOptions);

    if (response.data.choices) {
      setStoredValues([
        {
          question: prompt,
          answer: response.data.choices[0].text,
        },
        ...storedValues,
      ]);
      setPrompt("");
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="sidebar-header">
          <button className="sidebar-header-btn">
            <span>+</span> New chat
          </button>
        </div>

        <div className="sidebar-main">
          {Array.apply(null, Array(5)).map((item, index) => (
            <div key={index} className="sidebar-main-item">
              <i style={{ marginLeft: "-1rem" }} className="fa fa-message" />
              <p style={{ marginLeft: "-2.5rem" }}>How are you?</p>
              <i
                className="fa fa-edit"
                style={{
                  marginRight: "-3rem",
                }}
              />
              <i
                className="fa fa-trash"
                style={{
                  marginRight: "-1.2rem",
                }}
              />
            </div>
          ))}
        </div>
        <div className="sidebar-footer">
          <div className="sidebar-footer-item">
            <i style={{ marginLeft: "-1rem" }} className="fa fa-user" />
            <p style={{ marginLeft: "-2.5rem" }}>Upgrade to Plus</p>
            <button className="sidebar-footer-btn">New</button>
          </div>
          <div className="sidebar-footer-item">
            <i style={{ marginLeft: "-1.8rem" }} className="fa fa-user" />
            <p style={{ marginLeft: "-4.5rem" }}>Divyesh Mavadiya</p>
            <i
              style={{ marginLeft: "-1rem" }}
              className="fa fa-ellipsis-vertical"
            />
          </div>
        </div>
      </div>

      <div className="searchbar">
        <div className="searchbar-main">
          <input
            className="searchbar-input"
            type="text"
            placeholder="Send a Message..."
            name="search"
          />
          <button className="searchbar-btn" type="submit">
            <i class="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>

      <div className="main">Main Container</div>
    </div>
  );
};

export default ChatPage;