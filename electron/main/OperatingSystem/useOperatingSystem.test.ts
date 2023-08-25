import { describe, expect, it } from "vitest";
import { useOperatingSystem } from "./useOperatingSystem";

describe(useOperatingSystem, () => {
    it("should return 'Windows' when platform is 'win32'", () => {
        const { operatingSystem } = useOperatingSystem("win32");
        expect(operatingSystem).toBe("Windows");
    });

    it("should return 'macOS' when platform is 'darwin'", () => {
        const { operatingSystem } = useOperatingSystem("darwin");
        expect(operatingSystem).toBe("macOS");
    });

    it("should throw an error when platform is not 'win32' or 'darwin'", () => {
        const unexpectedPlatforms: string[] = [
            "   ",
            "",
            "Darwin",
            "debian",
            "linux",
            "mac",
            "macos",
            "ubuntu",
            "WIN",
            "WIN32",
            "window",
            "Windows",
        ];

        for (const unexpectedPlatform of unexpectedPlatforms) {
            expect(() => useOperatingSystem(unexpectedPlatform)).toThrow(`Unexpected platform: ${unexpectedPlatform}`);
        }
    });
});