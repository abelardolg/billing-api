import InMemoryMiddlewareCache from 'application/middlewares/InMemoryMiddlewareCache';
import CreateCommand from 'application/useCase/transaction/create/command';
import { v4 } from 'uuid';

describe("Cache middleware test", () => {

    const middelware = new InMemoryMiddlewareCache();

    beforeEach(() => middelware.flush());

    test("Cache Miss", async () => {
        let hit = false;

        const exec = async () => {
            return await middelware.execute(
                new CreateCommand(
                    v4(),
                    "2",
                    {
                        amount: 1,
                        currency: "EUR",
                    },
                ),
                ( ) => {
                    hit = true;
                    return "test";
                },
            );
        };

        expect(await exec()).toBe("test");
        expect(hit).toBe(true);
    });

    test("Cache Hit", async () => {
        let hit = false;

        const txuuid = v4();
        await middelware.execute(new CreateCommand(txuuid, "2", { amount: 1, currency: "EUR"}), ( ) => ("test"));

        const exec = async () => {
            return await middelware.execute(new CreateCommand(txuuid, "2", { amount: 1, currency: "EUR"}), ( ) => {
                hit = true
                return "Nope!";
            });
        };

        expect(await exec()).toBe("test");
        expect(hit).toBe(false);
    });
});