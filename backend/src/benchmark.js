import autocannon from "autocannon";
import { createClient } from "redis";

const TARGET_URL = "http://localhost:5000/api/v0/1s";

const COUNTER_KEY = "click:1s"; // adjust if using click:a namespace

const redis = createClient();

async function runBenchmark() {


await redis.connect();

console.log("\nPreparing benchmark environment...\n");

// reset redis counter
await redis.set(COUNTER_KEY, 0);

console.log("Counter reset complete.\n");

const instance = autocannon({
    url: TARGET_URL,
    connections: 100,
    duration: 20,
    pipelining: 1
});

let blockedRequests = 0;

instance.on("response", (client, statusCode) => {

    if (statusCode === 429) {
        blockedRequests++;
    }
});

autocannon.track(instance);

instance.on("done", async (result) => {

    const redisCount = parseInt(
        await redis.get(COUNTER_KEY),
        10
    ) || 0;

    const totalRequests = result.requests.total;

    const successfulRequests =
        totalRequests - blockedRequests;

    console.log("\n================ SYSTEM BENCHMARK ================\n");

    console.log("Target URL:", TARGET_URL);

    console.log("\n🚀 THROUGHPUT");
    console.log(
        "Requests/sec (avg):",
        result.requests.average
    );

    console.log("\n⚡ LATENCY");
    console.log(
        "Average latency:",
        result.latency.average,
        "ms"
    );

    console.log(
        "Median latency:",
        result.latency.p50,
        "ms"
    );

    console.log(
        "P99 latency:",
        result.latency.p99,
        "ms"
    );

    console.log("\n📊 REQUEST STATS");

    console.log(
        "Total requests:",
        totalRequests
    );

    console.log(
        "Blocked requests (429):",
        blockedRequests
    );

    console.log(
        "Successful requests:",
        successfulRequests
    );

    console.log("\n🧮 REDIS COUNTER");

    console.log(
        "Redis click counter:",
        redisCount
    );

    const accuracy =
        successfulRequests > 0
            ? (redisCount / successfulRequests) * 100
            : 0;

    console.log(
        "Counter accuracy:",
        accuracy.toFixed(2) + "%"
    );

    if (
        Math.abs(redisCount - successfulRequests) <= 5
    ) {
        console.log(
            "Result: ✅ COUNTER SYSTEM HEALTHY"
        );
    } else {
        console.log(
            "Result: ⚠️ COUNTER MISMATCH DETECTED"
        );
    }

    console.log("\n🛡 RATE LIMITER");

    if (blockedRequests > 0) {
        console.log(
            "Rate limiter is ACTIVE"
        );
    } else {
        console.log(
            "Rate limiter did not trigger"
        );
    }

    console.log("\n==================================================\n");

    await redis.quit();
});


}

runBenchmark();
