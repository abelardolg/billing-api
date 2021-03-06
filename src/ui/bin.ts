#! /usr/bin/env -S node -r tsconfig-paths/register

import { program } from "commander";
import AsyncEventBus from "./consumers/asyncEventBus/asyncEventBus";
import http from "./http/index";

program
  .version("1.0.0")
;

program
    .command("queue:consume")
    .description("Consume queues")
    .option("-q, --queue [Queue Name]", "Name of the queue to consume")
    .option("-p, --pattern [Topic pattern]", "Topic filter")
    .option("-m, --monitor [Moitor]", "Moitoring server")
    .action(async (options) => {
        const bus = new AsyncEventBus(
            options.queue || "events",
            options.pattern || "#",
            options.monitor || false,
        );
        await bus.consume();
    })
;

program
    .command("http")
    .description("Start http server")
    .option("-d, --debug [Debug mode]", "Enable debug mode")
    .action(async (options) => {
        await http(options.debug || false);
    })
;

program.parse(process.argv);

