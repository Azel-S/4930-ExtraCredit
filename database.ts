class InMemoryDB {
    database: Map<string, number>;
    transaction: Map<string, number>;
    active: boolean;

    constructor() {
        this.database = new Map<string, number>();
        this.transaction = new Map<string, number>();
        this.active = false;
    }

    begin_transaction() {
        if (!this.active) {
            this.active = true;
            this.transaction = new Map<string, number>();
        }
    }

    put(key: string, value: number) {
        if (!this.active) {
            throw new Error("Transaction is not active.");
        } else {
            this.transaction.set(key, value);
        }
    }

    get(key: string) {
        if (this.database.has(key)) {
            return this.database.get(key);
        } else {
            return null;
        }
    }

    commit() {
        if (this.active) {
            this.transaction.forEach((value: number, key: string) => {
                this.database.set(key, value);
            });
            this.active = false;
        } else {
            throw new Error("Transaction is not active.");
        }
    }

    rollback() {
        if (this.active) {
            this.active = false;
            this.transaction = new Map<string, number>();
        } else {
            throw new Error("Transaction is not active.");
        }
    }
}

console.log("Initiating DB...")
let inmemoryDB = new InMemoryDB();

console.log("Getting A: ", inmemoryDB.get("A"));

console.log("Putting A...")
try {
    inmemoryDB.put("A", 5);
} catch {
    console.log("Error was caught");
}

console.log("Starting transaction...")
inmemoryDB.begin_transaction();

console.log("Putting A...");
inmemoryDB.put("A", 5)
console.log("Getting A: ", inmemoryDB.get("A"));

console.log("Updating A...");
inmemoryDB.put("A", 5)

console.log("Commiting...");
inmemoryDB.commit();

console.log("Getting A: ", inmemoryDB.get("A"));

console.log("Commiting...");
try {
    inmemoryDB.commit();
} catch {
    console.log("Error was caught");
}

console.log("Rolling back...");
try {
    inmemoryDB.rollback();
} catch {
    console.log("Error was caught");
}

console.log("Getting B: ", inmemoryDB.get("B"));

console.log("Starting transaction...")
inmemoryDB.begin_transaction();

console.log("Putting A...")
try {
    inmemoryDB.put("B", 10);
} catch {
    console.log("Error was caught");
}

console.log("Rolling back...");
try {
    inmemoryDB.rollback();
} catch {
    console.log("Error was caught");
}

console.log("Getting B: ", inmemoryDB.get("B"));
