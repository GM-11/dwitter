import React, { useState } from "react";
import { dwitter_backend } from "../../../declarations/dwitter_backend";

function addDweetModal({ closeModal, id }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitTopic() {
    setLoading(true);
    if (title === "") return;


    const principal = await dwitter_backend.whoami();

    const dweets = await dwitter_backend.get_dweets_of_topic(id);

    const timestamp = Date.now();
    await dwitter_backend.add_dweet_to_topic(
      id,
      title,
      timestamp.toString(),
      principal.toString()
    );

    setTitle("");
    setLoading(false);
    closeModal();
  }


  return (
    <div className="modal">
      <div className="cross" onClick={loading ? null : closeModal}>
        X
      </div>
      <input
        type="text"
        name="input"
        placeholder={"Add dweet"}
        onChange={function (e) {
          setTitle(e.target.value);
        }}
      />
      <button onClick={submitTopic}>Submit</button>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default addDweetModal;
