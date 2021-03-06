import { Request, Response } from "express";
import AppBridge from "hollywood-js/src/Framework/AppBridge";
import health from "./monitor/health";
import get from "./transaction/get";
import create from "./transaction/post";

type Context = (app: AppBridge) => IRoute;

export interface IRoute {
    path: string;
    method: string;
    action: (req: Request, res: Response) => Promise<void>;
}

export const routes: Context[] = [
    get,
    create,
    health,
];
