import { dwitter_backend } from "../../../declarations/dwitter_backend";
import React, { useState } from "react";

function addDweetModal({ closeModal, id }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [imageBas64, setImageBas64] = useState(null);

  async function submitTopic() {
    setLoading(true);
    if (title === "") return;

    const principal = await dwitter_backend.whoami();

    const dweets = await dwitter_backend.get_dweets_of_topic(BigInt(id));

    const timestamp = Date.now();
    await dwitter_backend.add_dweet_to_topic(
      BigInt(dweets.length + 1),
      title,
      timestamp.toString(),
      principal.toString(),
    );
    setTitle("");
    setLoading(false);
  }

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     // You can use this file to display or upload the image as needed.
  //     setSelectedImage(URL.createObjectURL(file));
  //     // convert file to base64 string
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = function () {
  //       setImageBas64(reader.result);
  //     };

  //     setImageBas64(reader.result);

  //     console.log(imageBas64);
  //   }
  // };

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
