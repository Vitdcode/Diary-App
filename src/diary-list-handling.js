export let diaries = [];

class Diary {
  constructor(
    name,
    id,
    description,
    timestamp,
    entries = [],
    pinnedEntries = [],
    entriesColor = 'rgba(37, 139, 153, 0.7)'
  ) {
    this.name = name;
    this.id = id;
    this.description = description;
    this.timestamp = timestamp;
    this.entries = entries;
    this.pinnedEntries = pinnedEntries;
    this.entriesColor = entriesColor;
  }
}

export default Diary;

export function pushToDiariesArray(name, id, description, timestamp, entries, pinnedEntries, entriesColor) {
  const diary = new Diary(name, id, description, timestamp, entries, pinnedEntries, entriesColor);
  diaries.push(diary);
}
