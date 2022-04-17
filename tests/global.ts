export const mochaGlobalSetup = async () => {
    console.log("Start of tests...");
}

export async function mochaGlobalTeardown() {
    console.log("End of tests, start of anger. Or not?");
}