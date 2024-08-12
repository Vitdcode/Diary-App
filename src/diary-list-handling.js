export let diaries = [];

class Diary {
  constructor(name, id, description, timestamp) {
    this.name = name;
    this.id = id;
    this.description = description;
    this.timestamp = timestamp;
  }
}

export default Diary;

export function pushToDiariesArray(name, id, description, timestamp) {
  const diary = new Diary(name, id, description, timestamp);
  diaries.push(diary);
}
