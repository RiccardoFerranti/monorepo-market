import { logGroup } from "./log-group";

describe("logGroup", () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    jest.spyOn(console, "groupCollapsed").mockImplementation(() => {});
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "groupEnd").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    process.env.NODE_ENV = originalEnv;
  });

  it("should not log anything when not in development", () => {
    process.env.NODE_ENV = "production";

    logGroup({ title: "Test" });

    expect(console.groupCollapsed).not.toHaveBeenCalled();
    expect(console.log).not.toHaveBeenCalled();
    expect(console.groupEnd).not.toHaveBeenCalled();
  });

  it("should log group when in development", () => {
    process.env.NODE_ENV = "development";

    logGroup({ title: "My Group" });

    expect(console.groupCollapsed).toHaveBeenCalledWith(
      "%cMy Group",
      "color:#22c55e;font-weight:600;",
    );
    expect(console.groupEnd).toHaveBeenCalled();
  });

  it("should log data entries when provided", () => {
    process.env.NODE_ENV = "development";

    logGroup({
      title: "Data Group",
      data: { a: 1, b: "two" },
    });

    expect(console.log).toHaveBeenCalledWith("a:", 1);
    expect(console.log).toHaveBeenCalledWith("b:", "two");
  });

  it("should use custom color when provided", () => {
    process.env.NODE_ENV = "development";

    logGroup({
      title: "Colored",
      color: "red",
    });

    expect(console.groupCollapsed).toHaveBeenCalledWith(
      "%cColored",
      "color:red;font-weight:600;",
    );
  });
});
