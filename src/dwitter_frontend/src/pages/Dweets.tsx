import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dwitter_backend } from "../../../declarations/dwitter_backend/index";
import Modal from "../components/addDweetModal";
function Dweets() {
  const { title, id } = useParams();
  const [dweets, setDweets] = useState([]);
  const [open, modalOpen] = useState(false);

  useEffect(() => {
    async function loadDweets() {
      const dweets = await dwitter_backend.get_dweets_of_topic(BigInt(parseInt(id)));
      setDweets(dweets);
    }

    loadDweets();
  }, []);

  function openModal() {
    modalOpen(true);
  }

  async function closeModal() {
    const dweets = await dwitter_backend.get_dweets_of_topic(BigInt(parseInt(id)));
    setDweets(dweets);
    modalOpen(false);
  }

  return (
    <>
      {open && <Modal closeModal={closeModal} id={parseInt(id)} />}
      <button onClick={openModal} className="fab">
        +
      </button>

      <div className="main">
        <br />
        <h1>{title}</h1>
        <br />

        <div className="container">
          {dweets.map((val) => {
            return (
              <div key={val.timestamp} className="topic">
                <h2>{val.content}</h2>
                <p>{`${val.principal_text}`}</p>
                {/* <img src={`data:image/jpeg;bas64,${val.imageBas64}`} alt="" /> */}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Dweets;
