use candid::types::number::Nat;
use candid::CandidType;
use std::cell::RefCell;

#[derive(Clone, CandidType)]
pub struct Dweet {
    content: String,
    timestamp: Nat,
    principal_text: String,
    // image: String
}

#[derive(Clone, CandidType)]
pub struct Topic {
    pub title: String,
    pub dweets: Vec<Dweet>,
    pub id: Nat,
}

thread_local! {
    static TOPICS: RefCell<Vec<Topic>> = RefCell::new(Vec::new());
}

#[ic_cdk::update]
fn add_topic(title: String) {
    let size: usize = TOPICS.with(|topics| topics.borrow_mut().len());
    let id: Nat = Nat::from(size);

    let topic = Topic {
        title,
        dweets: Vec::new(),
        id,
    };

    TOPICS.with(|topics| {
        topics.borrow_mut().push(topic);
    })
}

#[ic_cdk::update]
fn add_dweet_to_topic(id: Nat, content: String, timestamp: String, principal_text: String) {
    TOPICS.with(|topics| {
        let mut topics_ref = topics.borrow_mut();
        for topic in topics_ref.iter_mut() {
            if topic.id == id {
                let timestamp = timestamp.parse::<Nat>().unwrap();
                topic.dweets.push(Dweet {
                    content,
                    timestamp,
                    principal_text,
                    // image: image_base64
                });
                break;
            }
        }
    });
}

#[ic_cdk::query]
fn get_all_topics() -> Vec<Topic> {
    let topics: Vec<Topic> = TOPICS.with(|topics| topics.borrow().clone());
    topics
}

#[ic_cdk::query]
fn get_dweets_of_topic(id: Nat) -> Vec<Dweet> {
    let mut dweets: Vec<Dweet> = Vec::new();
    TOPICS.with(|topics| {
        let topics_ref = topics.borrow().clone();
        for topic in topics_ref.iter() {
            if topic.id == id {
                dweets = topic.dweets.clone();
                break;
            }
        }
    });

    dweets
}

#[ic_cdk::update]
fn whoami() -> ic_cdk::export::Principal {
    let caller = ic_cdk::caller();
    caller
}
