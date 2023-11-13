import React, { useState } from "react";
import { dwitter_backend } from "../../../declarations/dwitter_backend";

function addTopicModal({ closeModal }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitTopic() {
    setLoading(true);
    if (title === "") return;

    await dwitter_backend.add_topic(title);
    setTitle("");
    setLoading(false);
  }
  return (
    <div className="modal">
      <div className="cross" onClick={loading ? null : closeModal}>
        X
      </div>
      <input
        type="text"
        name="input"
        placeholder="Add topic"
        onChange={function (e) {
          setTitle(e.target.value);
        }}
      />
      <button onClick={submitTopic}>Submit</button>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default addTopicModal;
