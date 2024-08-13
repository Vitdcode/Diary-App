export let diaries = [];

class Diary {
  constructor(name, id, description, timestamp, entries = []) {
    this.name = name;
    this.id = id;
    this.description = description;
    this.timestamp = timestamp;
    this.entries = entries;
  }
}

export default Diary;

export function pushToDiariesArray(name, id, description, timestamp, entries) {
  const diary = new Diary(name, id, description, timestamp, entries);
  diaries.push(diary);
}
