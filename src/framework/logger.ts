import { getStackTrace, now } from "./util.js";

type Status = "running" | "pass" | "warn" | "fail";
interface ITestLog {
  path: string;
  cases: IResult[];
}
export interface IResult {
  name: string;
  params?: object;
  status: Status;
  logs?: string[];
  timems: number;
}

export class Logger {
  public readonly results: ITestLog[] = [];

  constructor() {
  }

  public record(path: string): [ITestLog, GroupRecorder] {
    const cases: IResult[] = [];
    const test: ITestLog = { path, cases };
    this.results.push(test);
    return [test, new GroupRecorder(test)];
  }
}

export class GroupRecorder {
  private test: ITestLog;

  constructor(test: ITestLog) {
    this.test = test;
  }

  public record(name: string, params?: object): [IResult, CaseRecorder] {
    const result: IResult = { name, status: "running", timems: -1 };
    if (params) {
      result.params = params;
    }
    this.test.cases.push(result);
    return [result, new CaseRecorder(result)];
  }
}

export class CaseRecorder {
  private result: IResult;
  private failed: boolean = false;
  private warned: boolean = false;
  private startTime: number = -1;
  private logs: string[] = [];

  constructor(result: IResult) {
    this.result = result;
  }

  public start() {
    this.startTime = now();
    this.logs = [];
    this.failed = false;
    this.warned = false;
  }

  public finish() {
    if (this.startTime < 0) {
      throw new Error("finish() before start()");
    }
    const endTime = now();
    this.result.timems = endTime - this.startTime;
    this.result.status = this.failed ? "fail" :
        this.warned ? "warn" : "pass";

    this.result.logs = this.logs;
  }

  public log(msg: string) {
    this.logs.push(msg);
  }

  public warn(msg?: string) {
    this.warned = true;
    let m = "WARN";
    if (msg) {
      m += ": " + msg;
    }
    m += " " + getStackTrace(new Error());
    this.log(m);
  }

  public fail(msg?: string) {
    this.failed = true;
    let m = "FAIL";
    if (msg) {
      m += ": " + msg;
    }
    m += " " + getStackTrace(new Error());
    this.log(m);
  }

  public threw(e: Error) {
    this.failed = true;
    let m = "EXCEPTION";
    m += " " + getStackTrace(e);
    this.log(m);
  }
}
