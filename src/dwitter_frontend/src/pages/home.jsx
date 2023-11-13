import React from "react";
import { dwitter_backend } from "../../../declarations/dwitter_backend/index";
import { Link } from "react-router-dom";
import Modal from "../components/addTopicModal";

const CANISTER_ID = process.env.CANISTER_ID_DWITTER_FRONTEND;

function Home() {
  const [open, modalOpen] = React.useState(false);
  const [topics, settopics] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const bottomRef = React.useRef();

  function openModal() {
    modalOpen(true);
  }

  async function func(title, slug) {
    await dwitter_backend.add_topic(title);
    modalOpen(false);
    const topics = await dwitter_backend.get_all_topics();
    settopics(topics);

  }

  async function closeModal() {
    modalOpen(false);
    const topics = await dwitter_backend.get_all_topics();
    settopics(topics);
  }

  React.useEffect(() => {
    async function loadTopics() {
      const topics = await dwitter_backend.get_all_topics();
      settopics(topics);
      setLoading(false);
    }

    loadTopics();
  }, []);
  return (
    <>
      {open && <Modal closeModal={closeModal} />}
      <button onClick={openModal} className="fab">
        +
      </button>
      <div className="main">
        <br />
        <h1>Hot Topics</h1>
        <br />
        <div className="container">
          {loading && <div>Loading...</div>}

          {topics.map((val) => {
            return (
              <Link
                to={`/dweets/${val.title}/${val.id}/?canisterId=${CANISTER_ID}`}
                key={val.id}
                className="topic"
              >
                <h2>{val.title}</h2>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
