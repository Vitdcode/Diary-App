export let diaries = [];

class Diary {
  constructor(name, id, description) {
    this.name = name;
    this.id = id;
    this.description = description;
  }
}

export default Diary;

export function pushToDiariesArray(name, id, description) {
  const diary = new Diary(name, id, description);
  diaries.push(diary);
}
