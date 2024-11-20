interface IStorage {
  get<T extends {}>(key: string): Promise<T>;
  save<T extends {}>(key: string, value: T): Promise<boolean>;
}

class LocalStorage implements IStorage {
  get(key: string) {
    try {
      const value = localStorage.getItem(key);
      if (!value) return null;
      const parsed = JSON.parse(value);
      return parsed;
    } catch (err) {
      return null;
    }
  }

  save<T extends {}>(key: string, value: T) {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
    return Promise.resolve(true);
  }
}

export const storage = new LocalStorage();