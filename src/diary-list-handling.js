export let diaries = [];

class Diary {
  constructor(name) {
    this.name = name;
  }
}

export default Diary;

export function pushToDiariesArray(name) {
  const diary = new Diary(name);
  diaries.push(diary);
}
