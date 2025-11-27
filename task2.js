function retrieveInfo() {
    console.log("Fetching Data...");
    return Promise.resolve("Data 1");
}

function handleInfo(info) {
    console.log(`Processing: ${info}`);
    return Promise.resolve(info + " processed");
}

async function runTask() {
    const raw = await retrieveInfo();
    const output = await handleInfo(raw);
    console.log("Result:", output);
}

runTask();